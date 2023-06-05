<template>
	<view>
		<view class="item no-border avatar-item">
			<view class="key">
				头像
			</view>
			<image class="avatar value" src="../../../static/wode/logo.png" v-if="onerror"></image>
			<img class="avatar value" :src="info.avatar" v-else :onerror="onerror = true" alt="" />
		</view>
		<view class="item" @tap="linkTo('authentication', info.authenticated)">
			<view class="key">
				姓名
			</view>
			<view class="value">
				{{ info.authenticated  ? info.name : '未实名' }}
			</view>
		</view>
		<view class="item">
			<view class="key">
				手机号
			</view>
			<view class="value">
				{{ info.mobilePhone }}
			</view>
		</view>
		<view class="item">
			<view class="key">
				邀请码
			</view>
			<view class="value" @click="copy">
				{{ info.inviteCode }}
				<image class="copy-icon" src="../../../static/wode/copy-icon.png" mode=""></image>
			</view>
		</view>
		<view class="item no-border" @click="linkTo()">
			<view class="key">
				修改密码
			</view>
			<view class="value">
				<image class="right-icon" src="../../../static/wode/right-icon.png" mode=""></image>
			</view>
		</view>
		<view class="item center no-border" @tap="logOut">
			退出登录
		</view>
	</view>
</template>

<script>
import { ACCESS_TOKEN } from "@/common/util/constants"
import { personalInfo } from '@/api/user'
export default {
	data() {
		return {
			onerror: false,
			info: {
			}
		}
	},
	onShow() {
		this.getUserInfo()
	},
	methods: {
		copy() {
			uni.showToast({ title: '复制成功' })
			uni.setClipboardData({
				data: this.info.inviteCode
			});
		},
		linkTo(path = 'repassword', bol = false) {
			if(bol) return 
			uni.navigateTo({ url: "/pages/wode/child/" + path });
		},
		logOut() {
			uni.removeStorageSync(ACCESS_TOKEN)
			this.$Router.replaceAll({ name: 'index' })
		},
		getUserInfo() {
			personalInfo().then(rt=>{
				this.info = rt.data
			})
		}

	}
}
</script>

<style scoped lang="scss">
.item {
	padding: 22px 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	ont-size: 15px;
	font-family: PingFang SC-Regular, PingFang SC;
	font-weight: 400;
	border-bottom: 1px solid #EBECED;
	background-color: #fff;

	&.no-border {
		border: unset;
	}

	&.avatar-item {
		padding: 5px 16px;
	}

	&.center {
		margin-top: 12px;
		justify-content: center;
		font-size: 15px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #4F5459;
	}

	.key {
		color: #4F5459;
	}

	.value {
		color: #17191A;

		&.avatar {
			width: 55px;
			height: 55px;
			border-radius: 50%;
		}

		.copy-icon {
			margin-left: 16px;
			width: 20px;
			height: 20px;
			vertical-align: middle;
		}

		.right-icon {
			width: 12px;
			height: 12px;
		}
	}
}</style>