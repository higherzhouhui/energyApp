<template>
	<view class="container">
		<view class="topContent">
			<view class="userInfo">
				<view class="left">
					<image :src="$store.state.userInfo.avatar || '../../static/wode/avatar.png'" class="avatar"></image>
					<view class="info">
						<view class="name">{{ $store.state.userInfo.name || '未实名' }}</view>
						<view class="ziliao" @tap="handleRouteTo('userInfo')">个人资料</view>
					</view>
				</view>
				<view class="right">
					<image src="../../static/my/jinbi.png" class="jinbiImg"></image>
					<text class="signText" @tap="signToday()">签到</text>
				</view>
			</view>
			<view class="moneyContainer">
				<view class="list" @tap="withdrawal('bonus', wallet.bonus, '分红')">
					<view class="title">分红钱包（元）</view>
					<view class="bot">
						<view class="jine">{{ wallet.bonus }}</view>
						<view class="tixian">提现</view>
					</view>
				</view>
				<view class="list" @tap="withdrawal('extend', wallet.extend, '推广')">
					<view class="title">推广钱包（元）</view>
					<view class="bot">
						<view class="jine">{{ wallet.extend }}</view>
						<view class="tixian">提现</view>
					</view>
				</view>
				<view class="list" @tap="withdrawal('earnings', wallet.earnings, '收益')">
					<view class="title">收益钱包（元）</view>
					<view class="bot">
						<view class="jine">{{ wallet.earnings }}</view>
						<view class="tixian">提现</view>
					</view>
				</view>
				<view class="list" @tap="withdrawal('chnt', wallet.chnt, '正泰补贴')">
					<view class="title">正泰补贴金（元）</view>
					<view class="bot">
						<view class="jine">{{ wallet.chnt }}</view>
						<view class="tixian">提现</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mainContent">
			<view class="invite" @tap="handleToInvitePage">
				<image src="../../static/my/yaoqing.png" class="yaoqingImg"></image>
			</view>
			<view class="routeList">
				<view class="listWrapper" v-if="!item.hidden" v-for="item in navList" :key="item.link" @tap="handleRouteTo(item.link)">
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
import { mapActions } from "vuex"
import {getUserWallet, insert, personalInfoRequest} from '@/api/user'
import {getMyProjectList} from '@/api/project'
import appUpdate from 'common/util/appUpdate.js'
	export default {
		data() {
			return {
				navList: [
					{title: '我的团队', logo: 'tuandui', link: 'myteam'},
					{title: '我的项目', logo: 'xiangmu', link: 'xiangmu'},
					{title: '交易', logo: 'jiaoyi', link: 'transaction'},
					{title: '银行卡', logo: 'yhk', link: 'bankcardbind'},
					{title: '实名认证', logo: 'smrz', link: 'authentication'},
					{title: '检查更新', logo: 'update', link: 'update', hidden: document ? true : false},
					{title: '下载APP', logo: 'download', link: 'download' },
				],
				wallet: {
					bonus: 0, // 分红钱包
					extend: 0, // 推广钱包
					earnings: 0, // 收益钱包
					chnt: 0 //正泰补贴金
				},
				avatarUrlError: false,
				isBugProjectFlag: false,
			}
		},
		onLoad() {
			this.getWallet()
		},
		onPullDownRefresh() {
			// 执行刷新操作
			this.freshCurrentPage()
		},
		onShow() {
		},
		methods: {
			...mapActions(["Logout"]),
			async freshCurrentPage() {
				Promise.all([personalInfoRequest(), getUserWallet(), getMyProjectList({pageNum: 1, pageSize: 5})]).then(res => {
					uni.stopPullDownRefresh()
					if (res[0].code === 200) {
						this.$store.commit('SET_USERINFO', res[0].data)
					} else {
						uni.showToast({
							title: res[0].message,
							icon: 'none'
						})
					}
					if (res[1].code === 200) {
						this.wallet = res[1].data
					} else {
						uni.showToast({
							title: res[1].message,
							icon: 'none'
						})
					}
					if (res[2].code === 200) {
						this.isBugProjectFlag = res[2].data.list.length > 0 ? true : false
					} else {
						uni.showToast({
							title: res[2].message || res[2].msg,
							icon: 'none'
						})
					}
				}).catch((error) => {
					uni.showToast({
						title: error,
						icon: 'none'
					})
					uni.stopPullDownRefresh()
				})
			},
			getWallet() {
				getUserWallet().then(rt=>{
					this.wallet = rt.data
					if (rt.data.earnings) {
						this.isBugProjectFlag = true
					}
				})
			},
			handleWithDraw(type) {
				switch(type) {
					case 'fenhong': break;
				}
			},
			handleRouteTo(link) {
				if (link === 'update') {
					appUpdate(true)
					return
				}
				if (link === 'download') {
					uni.navigateTo({
						url:`/pages/download/download?useH5=1`
					})
					return
				}
				uni.navigateTo({
					url:`/pages/wode/child/${link}`
				})
			},
			handleToInvitePage(link) {
				uni.navigateTo({
					url:'/pages/index/invite/invite'
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
				uni.showLoading({
					title: '签到中'
				})
				insert().then(rt=>{
					uni.hideLoading()
					if(rt.code == 200) {
						uni.showToast({title: '签到成功！'})
					}else{
						uni.showToast({title: rt.message || '签到失败！', icon: 'none'})
					}
				}).catch(() => {
					uni.hideLoading()
				})
			},
			withdrawal(type, amount, title) {
				// 分红钱包
				if (type === 'bonus') {
					uni.showToast({
						title: '即将上市，敬请期待',
						icon: 'none'
					})
					return
				}
				// 如果没有购买产品，推广用户所得也不能提现
				if ((type === 'extend' || type === 'chnt') && !this.isBugProjectFlag) {
					uni.showModal({ 
						title: '提示',
						content: '需要认购产品激活此钱包',
						confirmText: '去认购',
						success: (res) => {
							if (res.confirm) {
								this.$Router.replaceAll({name: 'xiangmu'})
							} else {
								console.log("取消")
							}
						},
					})
					return
				}
				uni.navigateTo({
					url:`/pages/wode/child/withdrawal?type=${type}&amount=${amount}&title=${title}`
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
				align-items: center;
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
