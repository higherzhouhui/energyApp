<template>
	<view class="zai-box">
		<scroll-view scroll-y class="page">
			<view class="text-center" :style="[{ animation: 'show ' + 0.4 + 's 1' }]">
				<image src="https://static.jeecg.com/upload/test/login4_1595818039175.png" mode='aspectFit' class="zai-logo ">
				</image>
				<view class="zai-title text-shadow ">JEECG BOOT </view>
			</view>
			<view class="box padding-lr-xl login-paddingtop" :style="[{ animation: 'show ' + 0.6 + 's 1' }]">
				<block>
					<view class="cu-form-group margin-top  shadow-warp" :class="[shape == 'round' ? 'round' : '']">
						<view class="title"><text class="cuIcon-people margin-right-xs"></text>手机号码:</view>
						<input placeholder="请输入账号" name="input" v-model="phone" />
					</view>
					<view class="cu-form-group margin-top shadow-warp" :class="[shape == 'round' ? 'round' : '']">
						<view class="title"><text class="cuIcon-lock margin-right-xs"></text>密码:</view>
						<input class="uni-input" placeholder="请输入密码" :password="!showPassword" v-model="password" />
						<view class="action text-lg">
							<text :class="[showPassword ? 'cuIcon-attention' : 'cuIcon-attentionforbid']"
								@click="changePassword"></text>
						</view>
					</view>
					<view class="padding text-center margin-top">
						<button class="cu-btn bg-blue lg margin-right shadow" :loading="loading" :class="[shape == 'round' ? 'round' : '']"
							@tap="onLogin"><text space="emsp">{{ loading ? "登录中..." : " 登录 " }}</text>
						</button>
					</view>
				</block>
			</view>
		</scroll-view>
		<!-- 登录加载弹窗 -->
		<view class="cu-load load-modal" v-if="loading">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="https://static.jeecg.com/upload/test/login4_1595818039175.png" mode="aspectFit" class="round"></image>
			<view class="gray-text">登录中...</view>
		</view>
	</view>
</template>

<script>
import { mapActions } from "vuex"

export default {
	data() {
		return {
			phone: 'admin',
			password: '123456',
		
		};
	},
	methods: {
		...mapActions([ "PhoneLogin"]),
		onLogin: function () {
			if (!this.phone || this.phone.length == 0) {
				this.$tip.toast('请填写手机号！');
				return;
			}
			if (!this.password || this.password.length == 0) {
				this.$tip.toast('请填写密码！');
				return;
			}
			let loginParams = {
				phone: this.phone,
				password: this.password
			}
			this.loading = true;
			this.PhoneLogin(loginParams).then((res) => {
				this.loading = false;
				if (res.data.success) {
					this.$tip.success('登录成功!')
					this.$Router.replaceAll({ name: 'index' })
					// #endif
				} else {
					this.$tip.alert(res.data.message);
				}
			}).catch((err) => {
				let msg = err.data.message || "请求出现错误，请稍后再试"
				this.loading = false;
				this.$tip.alert(msg);
			}).finally(() => {
				this.loading = false;
			})
		},
		changePassword() {
			this.showPassword = !this.showPassword;
		},
		requestFailed(err) {
			this.$message.warning("登录失败")
		},
	},
}
</script>

<style>
.login-paddingtop {
	padding-top: 100upx;
}

.zai-box {
	padding: 0 20upx;
	padding-top: 100upx;
	position: relative;
}

.zai-logo {
	width: 200upx;
	height: 150px;
}

.zai-title {
	font-size: 58upx;
	color: #000000;
	text-align: center;
}

.input-placeholder,
.zai-input {
	color: #94afce;
}

.zai-label {
	padding: 60upx 0;
	text-align: center;
	font-size: 30upx;
	color: #a7b6d0;
}

.zai-btn {
	background: #ff65a3;
	color: #fff;
	border: 0;
	border-radius: 100upx;
	font-size: 36upx;
}

.zai-btn:after {
	border: 0;
}

/*按钮点击效果*/
.zai-btn.button-hover {
	transform: translate(1upx, 1upx);
}
</style>
