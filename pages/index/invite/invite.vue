<template>
<view class="container">
    <view class="top">
        <image src="../../../static/yaoqing/bg.png" class="inviteImg"></image>
    </view>
    <view class="content">
        <view class="inviteWrapper">
			<view class="rulesWrapper">
				<view class="ruleTitle">活动规则</view>
				<view class="ruleList" v-for="item in rules" :key="item.id">
					<text class="normal">推荐</text><text class="res">{{item.inviteNum}}</text>
					<text class="normal">人，</text><text class="normal">赠送推广金</text><text class="red">{{item.amount}}</text>
					<text class="normal">元</text>
				</view>
			</view>
            <view class="title"></view>
            <view class="ecode-box">
                <canvas ref="ecode" id="qrcode" class="ecode" style="width: 120px;" canvas-id="qrcode"></canvas>
            </view>
			<view class="inviteCode">您的邀请码: {{inviteCode}}</view>
            <view class="btnGroup">
                <view class="btn" @tap="saveBaseImgFile">下载二维码</view>
                <view class="btn" @tap="copyInviteLink()">复制推广链接</view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
import UQrcode from '@/common/util/ecode'
import {
    USER_INFO
} from '@/common/util/constants.js'
import { getExpandList } from '@/api/promotion'

export default {
    data() {
        return {
            qrdImg: '',
            linkUrl: '',
			inviteCode: '',
			rules: [],
        }
    },
    onLoad() {
        const {
            inviteCode
        } = uni.getStorageSync(USER_INFO)
		this.inviteCode = inviteCode
        const url = `http://web.zhtxny.com?inviteCode=${inviteCode}/#/pages/register/register`
        this.linkUrl = url
        this.qrFun(url)
		this.getRules()
    },
    methods: {
		getRules() {
			getExpandList().then(res => {
				if (res.code === 200) {
					this.rules = res.data
				} else {
					uni.showToast({
						title:res.message,
						icon: 'none'
					})
				}
			})
		},
        qrFun(text) {
            let that = this
            UQrcode.make({
                canvasId: 'qrcode', //切记canvasId 里边的内容需要跟canvas里边canvas-id="qrcode"的名字一样
                componentInstance: this,
                text: text, //需要转成二维码的内容是后端传过来的，我这里是onLoad传过来的，根                              据自己的需要
                size: 120,
                margin: 0,
                backgroundColor: '#ffffff',
                foregroundColor: '#000000',
                fileType: 'jpg',
                errorCorrectLevel: UQrcode.errorCorrectLevel.H,
                success: res => {
                    that.qrdImg = res
                }
            })
        },
        saveBaseImgFile() {
            let base64 = this.qrdImg;
            const bitmap = new plus.nativeObj.Bitmap("base64");
            bitmap.loadBase64Data(base64, function () {
                const url = "_doc/" + new Date().getTime() + ".png";
                console.log('saveHeadImgFile', url)
                bitmap.save(url, {
                    overwrite: true, // 是否覆盖
                    // quality: 'quality'  // 图片清晰度
                }, (i) => {
                    uni.saveImageToPhotosAlbum({
                        filePath: url,
                        success: function () {
                            uni.showToast({
                                title: '图片保存成功',
                                icon: 'none'
                            })
                            bitmap.clear()
                        }
                    });
                }, (e) => {
                    uni.showToast({
                        title: '图片保存失败',
                        icon: 'none'
                    })
                    bitmap.clear()
                });
            }, (e) => {
                uni.showToast({
                    title: '图片保存失败',
                    icon: 'none'
                })
                bitmap.clear()
            });
        },
        dataURLtoBlob(dataurl) {
            var arr = this.qrdImg.split(',');
            //注意base64的最后面中括号和引号是不转译的   
            var _arr = arr[1].substring(0, arr[1].length - 2);
            var mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(_arr),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let blob = new Blob([u8arr], {
                type: mime
            });

            // 从blob对象中创建url
            let src_blob1 = URL.createObjectURL(blob);
            this.downloadQrd(src_blob1)
		
        },
        downloadQrd(url) {
            uni.saveImageToPhotosAlbum({
                filePath: url,
                success: function () {
                    uni.showToast({
                        title: '保存成功',
                    });
                },
                fail: function () {
                    uni.showToast({
                        title: '保存失败',
                    });
                }
            });
        },
        copyInviteLink() {
            uni.setClipboardData({
                data: this.linkUrl,
                success: function () {
                    uni.showToast({
                        title: '已复制到剪贴板',
						icon: 'none'
                    });
                },
                fail: function () {
                    uni.showToast({
                        title: '复制失败',
                        icon: 'error',
                    });
                },
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    background: #FEC695;

    .top {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 71%;
    }

    .inviteImg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .content {
        position: absolute;
        bottom: 12px;
        width: calc(100% - 24px);
        left: 12px;

        .inviteWrapper {
            background: #FFFFFF;
            border-radius: 12px 12px 12px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px 0;

            .title {
                font-size: 18px;
                font-family: PingFang SC-Semibold, PingFang SC;
                font-weight: 600;
                line-height: 30px;
                margin-bottom: 22px;
            }

            .qrdImg {
                width: 185px;
                height: 185px;
            }
			.inviteCode {
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 600;
				color: #17191A;
				margin: -10px 0 15px 0;
			}
            .btnGroup {
                display: flex;

                .btn {
                    height: 40px;
                    background: linear-gradient(90deg, #FF6C5E 0%, #FF4F6D 100%);
                    border-radius: 22px 22px 22px 22px;
                    padding: 0 24px;
                    font-size: 15px;
                    font-family: PingFang SC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 40px;
                    margin-right: 12px;
                }

                .btn:last-child {
                    margin-right: 0;
                }
            }
        }
		.rulesWrapper {
			.ruleTitle {
				font-size: 18px;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #17191A;
				line-height: 30px;
				text-align: center;
				margin-bottom: 20px;
			}
			.ruleList {
				line-height: 26px;
				font-size: 16px;
				letter-spacing: 0.1rem;
				font-family: PingFang SC-Semibold, PingFang SC;
			}
			.normal {
				color: #17191A;
			}
			.red {
				color: #FF4B4B;
			}
		}
    }
}
</style>
