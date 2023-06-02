<template>
	<scroll-view class="container">
		<swiper circular indicator-dots autoplay interval="3000" duration="1000">
			<swiper-item>
				<image class="bannerImg" src="../../static/home/banner1.png"></image>
			</swiper-item>
			<swiper-item>
				<image class="bannerImg" src="../../static/home/banner1.png"></image>
			</swiper-item>
			<swiper-item>
				<image class="bannerImg" src="../../static/home/banner1.png"></image>
			</swiper-item>
			<swiper-item>
				<image class="bannerImg" src="../../static/home/banner1.png"></image>
			</swiper-item>
		</swiper>
		<view class="content">
			<view class="gongnengList">
				<view class="list" @tap="handleTap('caozuo')">
					<image class="lImg" src="../../static/home/jiaocheng.png"></image>
					<view class="text">操作教程</view>
				</view>
				<view class="list" @tap="handleTap('caozuo')">
					<image class="lImg" src="../../static/home/kefu.png"></image>
					<view class="text">在线客服</view>
				</view>
				<view class="list" @tap="handleTap('caozuo')">
					<image class="lImg" src="../../static/home/liaotian.png"></image>
					<view class="text">官方群聊</view>
				</view>
				<view class="list" @tap="handleTap('caozuo')">
					<image class="lImg" src="../../static/home/yaoqing.png"></image>
					<view class="text">邀请好友</view>
				</view>
			</view>
			<view class="gonggao">
				<image class="ggImg" src="../../static/home/gonggao.png"></image>
				  <view id="scroll_div" class="fl">
				    <view id="scroll_begin">
						{{gonggao}}
					</view>
				    <view id="scroll_end"></view>
				  </view>
			</view>
			<view class="bg-video">
				<video class="myVideo" src="../../static/home/gf.mp4" autoplay loop controls></video>
			</view>
			<view class="newsContainer">
				<text class="title">新闻动态</text>
				<newProduct v-for="(item, index) in newsList" :product="item" :key="index"></newProduct>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import newProduct from '@/components/newProduct.vue'
	import loadList from '@/components/loadList.vue'
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				gonggao: '为全面推进能源革命,全力建设新能源全产业链,大力发展煤基新材料产业,聚集全球专家智库和产业精英,共同交流技术创新、产业创新、政策创新、商业模式创新的成功经验与发展趋势',
				newsList: [],
				loading: false
			}
		},
		mounted() {
			this.ScrollImgLeft();
			this.getNewsList()
		},
		components: {
			newProduct,
			loadList
		},
		methods: {
			getNewsList() {
				this.loading = true
				setTimeout(() => {
					this.loading = false
					const list = [
						{src: 'https://ossimg.fbs55.com/common/common_1685704442000_53864.png', title: '塔克拉玛干沙漠腹地一光伏电站正式并网发电', time: '2023-06-01 18:00:00'},
						{src: 'https://ossimg.fbs55.com/common/common_1685704514000_77437.png', title: '总投资约16.3亿元 会理市33万千瓦光伏发电项目开工建设', time: '2023-06-02 11:30:11'},
						{src: 'https://ossimg.fbs55.com/common/common_1685704529000_87162.png', title: '2022年12月28日，三峡集团在川两个新能源项目：凉山州会理市33万千瓦光伏发电项目、甘孜州道孚县亚日50万千瓦光伏发电项目开工建设。项目总投资42.3亿元，总装机83万千瓦', time: '2023-05-01 18:00:00'},
					]
					const temp = this.newsList.concat(list)
					this.newsList = temp
				}, 1000)
			},
			handleTap(type) {
				switch(type) {
					case 'caozuo': break;
					default: break;
				}
			},
			ScrollImgLeft() {
			  let speed = 30;
			  let MyMar = null;
			  let scroll_begin = document.getElementById("scroll_begin");
			  let scroll_end = document.getElementById("scroll_end");
			  let scroll_div = document.getElementById("scroll_div");
			  scroll_end.innerHTML = scroll_begin.innerHTML;
			  const Marquee = () => {
			    if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
			      scroll_div.scrollLeft -= scroll_begin.offsetWidth;
			    else {
			      scroll_div.scrollLeft++;
			    }
			  }
			  MyMar = setInterval(Marquee, speed);
			  scroll_div.onmouseover = function () {
			    clearInterval(MyMar);
			  }
			  scroll_div.onmouseout = function () {
			    MyMar = setInterval(Marquee, speed);
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
		}
	}
</script>

<style scoped lang="scss">
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
		height: auto!important;
	}
	/deep/.uni-swiper-wrapper {  // 使用/deep/对组件内样式修改
	  height: 0;
	  padding-bottom: 50%;
	}
	/deep/.uni-swiper-dot {
		background-color: #fff;
	}
	/deep/.uni-swiper-dot-active {
		background-color: #2E96FF;
	}
	/deep/.uni-swiper-dots-horizontal {
		bottom: 0;
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
		background: #FFFFFF;
		border-radius: 8px;
		padding: 12px;
		position: relative;
		margin-top: 12px;
		.ggImg {
			width: 34px;
			height: 20px;
			min-width: 34px;
			min-height: 20px;
			object-fit: fill;
			margin-top: 3px;
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
		overflow: hidden;
		padding-bottom: 42%;
		height: 0;
		position: relative;
		.myVideo {
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: fill;
			top: 0;
			left: 0;
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
</style>
