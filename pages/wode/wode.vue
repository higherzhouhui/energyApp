<template>
	<view class="container">
		<view class="topContent">
			<view class="userInfo">
				<view class="left">
					<image src="../../static/home/kefu.png" class="avatar"></image>
					<view class="info">
						<view class="name">未实名</view>
						<view class="ziliao" @tap="handleRouteTo('userInfo')">个人资料</view>
					</view>
				</view>
				<view class="right">
					<image src="../../static/my/jinbi.png" class="jinbiImg"></image>
					<text class="signText" @tap="signToday()">签到</text>
				</view>
			</view>
			<view class="moneyContainer">
				<view class="list" @tap="withdrawal">
					<view class="title">分红钱包（元）</view>
					<view class="bot">
						<view class="jine">5456.23</view>
						<view class="tixian" @tap="handleWithDraw('fenhong')">提现</view>
					</view>
				</view>
				<view class="list">
					<view class="title">推广钱包（元）</view>
					<view class="bot">
						<view class="jine">500.23</view>
						<view class="tixian" @tap="handleWithDraw('tuiguang')">提现</view>
					</view>
				</view>
				<view class="list">
					<view class="title">收益钱包（元）</view>
					<view class="bot">
						<view class="jine">966.00</view>
						<view class="tixian" @tap="handleWithDraw('shouyi')">提现</view>
					</view>
				</view>
				<view class="list">
					<view class="title">正泰补贴金（元）</view>
					<view class="bot">
						<view class="jine">5000.00</view>
						<view class="tixian" @tap="handleWithDraw('zhengtai')">提现</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mainContent">
			<view class="invite">
				<image src="../../static/my/yaoqing.png" class="yaoqingImg"></image>
			</view>
			<view class="routeList">
				<view class="listWrapper" v-for="item in navList" :key="item.link" @tap="handleRouteTo(item.link)">
					<view class="list">
						<view class="left">
							<image :src="`../../static/my/${item.logo}.png`" class="logo"></image>
							<view class="title">{{item.title}}</view>
						</view>
						<image src="../../static/my/jiantou.png" class="rightImg"></image>
					</view>
				</view>
			</view>
			<view class="logOut" @tap="logOut()">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
import { ACCESS_TOKEN } from "@/common/util/constants"
import { mapActions } from "vuex"
	export default {
		data() {
			return {
				navList: [
					{title: '我的团队', logo: 'tuandui', link: 'myteam'},
					{title: '交易', logo: 'jiaoyi', link: 'transaction'},
					{title: '银行卡', logo: 'yhk', link: 'bankcardbind'},
					{title: '实名认证', logo: 'smrz', link: 'authentication'},
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			...mapActions(["Logout"]),
			handleWithDraw(type) {
				switch(type) {
					case 'fenhong': break;
				}
			},
			handleRouteTo(link) {
				uni.navigateTo({
					url:`/pages/wode/child/${link}`
				})
			},
			logOut() {
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确认退出登录？',
					success: function (res) {
						if (res.confirm) {
							_this.Logout().then(res => {
								_this.$Router.replaceAll({ name: 'index' })
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			signToday() {
				uni.showToast({title: '签到成功！'})
			},
			withdrawal() {
				uni.navigateTo({
					url:`/pages/wode/child/withdrawal`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.container {
	padding-bottom: 24px;
}
.topContent {
	background-image: url('../../static/my/bg.png');
	background-size: 100% 250px;
	background-repeat: no-repeat;
	padding: 24px 12px 0 12px;
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;
		.left {
			display: flex;
			align-items: center;
			.avatar {
				width: 55px;
				height: 55px;
				border-radius: 50%;
				overflow: hidden;
				object-fit: fill;
				border: 1px solid #fff;
			}
			.info {
				margin-left: 12px;
				.name {
					font-size: 16px;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #17191A;
					margin-bottom: 6px;
				}
				.ziliao {
					height: 20px;
					background: #F3F8FE;
					border-radius: 10px 10px 10px 10px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #2E96FF;
					line-height: 20px;
					text-align: center;
					padding: 0 10px;
				}
			}
		}
		.right {
			padding: 0 12px 0 8px;
			height: 28px;
			background: linear-gradient(88deg, #FEA501 0%, #FEC880 100%);
			border-radius: 14px 14px 14px 14px;
			display: flex;
			align-items: center;
			.jinbiImg {
				width: 20px;
				height: 20px;
			}
			.signText {
				font-size: 13px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
	.moneyContainer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 12px;
		row-gap: 20px;
		.list {
			background: #FFFFFF;
			border-radius: 8px 8px 8px 8px;
			padding: 12px 8px;
			.title {
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4F5459;
				line-height: 20px;
			}
			.bot {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 12px;
				.jine {
					font-size: 20px;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					color: #17191A;
					line-height: 30px;
				}
				.tixian {
					height: 28px;
					background: #2E96FF;
					border-radius: 17px 17px 17px 17px;
					padding: 0 8px;
					font-size: 13px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 28px;
				}
			}
		}
	}
}
.mainContent {
	padding: 0 12px;
	margin-top: 12px;
	.invite {
		width: 100%;
		position: relative;
		height: 0;
		padding-bottom: 28.5%;
		.yaoqingImg {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
	}
	.routeList {
		background: #fff;
		border-radius: 8px;
		margin-top: 12px;
		.listWrapper {
			padding: 0 12px;
		}
		.list {
			display: flex;
			height: 52px;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #EBECED;
			.left {
				display: flex;
				.logo {
					width: 24px;
					height: 24px;
					margin-right: 12px;
				}
				.title {
					font-size: 15px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
				}
			}
			.rightImg {
				width: 20px;
				height: 20px;
			}
		}
		.listWrapper:last-child {
			.list {
				border: none;
			}
		}
	}
	.logOut {
		margin-top: 12px;
		width: 351px;
		height: 52px;
		background: #FFFFFF;
		border-radius: 8px 8px 8px 8px;
		font-size: 15px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #4F5459;
		width: 100%;
		text-align: center;
		line-height: 52px;
	}
}
</style>
