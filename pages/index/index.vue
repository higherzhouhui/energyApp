<template>
<view class="container">
    <swiper circular indicator-dots autoplay interval="3000" duration="1000">
        <swiper-item v-for="(item, index) in bannersList" :key="index">
            <image class="bannerImg" :src="item.image"></image>
        </swiper-item>
    </swiper>
    <view class="content">
        <view class="gongnengList">
            <view class="list" @tap="handleTap('caozuo')">
                <image class="lImg" src="../../static/home/jiaocheng.png"></image>
                <view class="text">操作教程</view>
            </view>
            <view class="list" @tap="handleTap('zxkf')">
                <image class="lImg" src="../../static/home/kefu.png"></image>
                <view class="text">在线客服</view>
            </view>
            <view class="list" @tap="handleTap('gfql')">
                <image class="lImg" src="../../static/home/liaotian.png"></image>
                <view class="text">官方群聊</view>
            </view>
            <view class="list" @tap="handleTap('yqhy')">
                <image class="lImg" src="../../static/home/yaoqing.png"></image>
                <view class="text">邀请好友</view>
            </view>
        </view>
        <view class="gonggao" @tap="toggle(true)">
            <image class="ggImg" src="../../static/home/gonggao.png"></image>
        	<TextRoll :text="removeHtmlTag(notice.content)"></TextRoll>
        	<!--   <view id="scroll_div" class="fl" ref="scrollDiv">
                <view id="scroll_begin" ref="scrollBegin" @tap="toggle(true)">
                    {{notice.content}}
                </view>
                <view id="scroll_end" ref="scrollEnd"></view>
            </view> -->
        </view>
       <view class="bg-video">
            <image @tap="vplay" src="../../static/home/cover.png" v-show="!played || ruleVisible || isShowProgress" class="video"></image>
            <video id="myVideo" v-show="played && !ruleVisible && !isShowProgress"  class="video" ref="video" :src="videoUrl" loop controls :show-mute-bt="true" play-btn-position="middle" mobilenet-hint-type="1" :enable-play-gesture="true" poster="../../static/home/cover.png"></video>
        </view>
        <view class="newsContainer">
            <text class="title">新闻动态</text>
            <newProduct v-for="(item, index) in newsList" :product="item" :key="index"></newProduct>
        </view>
    </view>
    <view class="mask" v-if="ruleVisible" @tap="toggle(false)">
        <view class="rule-box">
            <view class="box-title">
                <view class="txt">
                    公告信息
                </view>
            </view>
            <view class="box-content" v-html="notice.content"></view>
            <image class="close" src="../../static/tuiguang/close.png"></image>
        </view>
    </view>
</view>
</template>

<script>
import newProduct from '@/components/newProduct.vue'
import TextRoll from '@/components/beyondGod-roll/text-roll.vue'
import {
    HOME_NOTICE
} from '@/common/util/constants.js'
import {
    stitchUrl,
    Local,
	removeHtmlTag
} from '@/utils/common.js'
import {
    getBannerListRequest,
    getNewNoticeRequest,
    getNewsListRequest,
    getHomeBaseRequest
} from '@/api/home.js'
export default {
    data() {
        return {
            played: false,
			newsList: Local('newsList') || [],
            ruleVisible: true,
            notice: {
                content: Local('noticecontent') || '',
                createTime: ''
            },
            pageNum: 1,
            pageSize: 20,
            videoUrl: '',
            gfql: {
                groupName: '',
                groupNum: '',
                groupPhoto: '',
                officialGroup: '',
            },
            bannersList: Local('bannersList') || [],
            total: 0,
            course: '',
            // 视频封面图
            poster: '',
			removeHtmlTag: removeHtmlTag,
        }
    },
    components: {
        newProduct,
		TextRoll
    },
    onReady: function (res) {
        this.videoContext = uni.createVideoContext('myVideo')
    },
    //离开页面时暂停视频播放
    onHide() {
		if (this.videoContext) {
			this.videoContext.pause();
		}
    },

    onLoad() {
        this.getHomeData()
    },
    onPullDownRefresh() {
        // 执行刷新操作
        this.getHomeData()
    },
    methods: {
		vplay() {
		    this.played = true
		    this.videoContext.play()
		},
        toggle(bol) {
            this.ruleVisible = bol;
            if (bol) uni.hideTabBar()
            else uni.showTabBar()
        },
        handleTap(type) {
            switch (type) {
                case 'caozuo':
                    uni.navigateTo({
                        url: `/pages/index/course/course`
                    })
                    break;
                case 'yqhy':
                    uni.navigateTo({
                        url: '/pages/index/invite/invite'
                    })
                    break;
                case 'zxkf':
                    uni.switchTab({
                    	url: '/pages/kefu/kefu'
                    })
                    break;
                case 'gfql':
                    const url = stitchUrl('/pages/index/chat/chat', this.gfql)
                    uni.navigateTo({
                        url: url,
                    })
                    break;
                default:
                    break;
            }
        },
        onPageScroll(e) {
            let scrollHeight = e.scrollHeight
            let scrollTop = e.scrollTop
            let clientHeight = e.clientHeight
            // 实现滚动到底部的功能
            if (scrollHeight - scrollTop - clientHeight === 0) {
                // 获取更多数据
                this.getNewsList()
                // 或者显示已经到达底部的提示信息
                uni.showToast({
                    title: '已经到达底部了',
                    duration: 2000
                })
            }
        },
        getHomeData() {
            Promise.all([getBannerListRequest(), getNewsListRequest({
                pageSize: this.pageSize,
                pageNum: this.pageNum
            }), getHomeBaseRequest(), getNewNoticeRequest()]).then(res => {
                // 停止刷新转动
                uni.stopPullDownRefresh()
                const [banner, newsList, baseInfo, noticeInfo] = res
                if (banner.code === 200) {
                    const data = banner.data
                    this.bannersList = data
					Local('bannersList', data)
                }
                if (newsList.code === 200) {
                    const {
                        list
                    } = newsList.data
                    this.newsList = list
					Local('newsList', list)
                }
                if (baseInfo.code === 200) {
                    const data = baseInfo.data
                    this.videoUrl = data.video
                    this.gfql = {
                        groupName: data.groupName,
                        groupNum: data.groupNum,
                        groupPhoto: data.groupPhoto,
                        officialGroup: data.officialGroup,
                    }
                    this.course = data.course
                }
                if (noticeInfo.code === 200) {
                    // 公告内容不同再看
                    this.notice = noticeInfo.data || '暂无公告'
                    const storageNotice = uni.getStorageSync(HOME_NOTICE)
                    // if (storageNotice !== this.notice.content) {
                    // 	uni.setStorageSync(HOME_NOTICE, noticeInfo.data.content)
					if (!Local('noticecontent')) {
						this.toggle(true)
					}
					Local('noticecontent', noticeInfo.data)
                    // }
                }
            }).catch(() => {
                uni.stopPullDownRefresh()
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    background: #F5F6F7;
}

.bannerImgContainer {
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    position: relative;
}

.bannerImg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: contain;
}

/deep/uni-swiper {
    height: auto !important;
}

/deep/.uni-swiper-wrapper {
    // 使用/deep/对组件内样式修改
    height: 0;
    padding-bottom: 50%;
}

/deep/.uni-swiper-dot {
    background-color: #fff;
}

/deep/.uni-swiper-dot-active {
    background-color: #2E96FF;
}

.content {
    padding: 16px 12px;

    .gongnengList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 10px;

        .list {
            background: #fff;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 16px 0;
        }

        .lImg {
            width: 28px;
            height: 28px;
            object-fit: fill;
        }

        .text {
            margin-top: 8px;
            font-size: 13px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #17191A;
        }
    }
}

.gonggao {
    background: #fff;
    border-radius: 8px;
    position: relative;
    margin-top: 12px;
	display: flex;
	align-content: center;
	overflow: hidden;
    .ggImg {
        width: 34px;
        height: 20px;
        min-width: 34px;
        min-height: 20px;
        object-fit: fill;
		margin-top: 5px;
    }
}

#scroll_div {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 52px;
    transform: translateY(-50%);
    overflow: hidden;
    white-space: nowrap;
    width: calc(100% - 52px);
}

#scroll_begin,
#scroll_end {
    display: inline;
    font-size: 13px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #17191A;
}

.bg-video {
    margin-top: 12px;
    width: 100%;
    border-radius: 8px;
    height: 180px;
    position: relative;

    .video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
    }

    .cover {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-image: url('../../static/home/cover.png');
    }
}

.newsContainer {
    margin-top: 12px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 12px;

    .title {
        font-size: 16px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #17191A;
        display: inline-block;
    }
}

.mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
}

.rule-box {
    padding: 44px 16px 16px;
    position: absolute;
    z-index: 998;
    top: 50%;
    left: 50%;
    width: 77.3%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 14px;
    border: 5px solid rgba(46, 150, 255, 1);

    .box-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -10px;
        width: 56.55%;
        height: 0;
        padding-bottom: 12.2%;
        background: url('../../static/tuiguang/title.png');
        background-size: 100% 100%;
        text-align: center;

        .txt {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            font-size: 16px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;

        }
    }

    .box-content {
        word-break: break-all;
        max-width: 100%;
        max-height: 500px;
        overflow: auto;
        min-height: 100px;
        font-size: 13px;
        line-height: 21px;

        .notice-time {
            color: #2E96FF;
        }
    }

    .close {
        position: absolute;
        left: 50%;
        bottom: -60px;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        z-index: 10;
    }

    .title {
        margin-bottom: 7px;
        font-size: 15px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #17191A;
    }

    .section {
        margin-bottom: 10px;

        .line {
            margin-bottom: 4px;
            font-size: 13px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #4F5459;
        }
    }

}
</style>
