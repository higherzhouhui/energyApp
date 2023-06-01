<template>
	<view>
		<image src="../../static/login/loginBg.png" class="loginBg"></image>
		<view class="main">
			<view class="title">Hi，欢迎来到正泰！</view>
			<form class="formStyle" @submit="formSubmit">
				<view class="label"><image src="../../static/login/phone.png" class="phoneImg"></image>手机号</view>
				<input name="phone" type="number" maxlength="13" v-model="phone" class="inputStyle" placeholder="请输入手机号"/>
				<view class="label"><image src="../../static/login/password.png" class="phoneImg"></image>密码</view>
				<input name="password" password maxlength="16" v-model="password" class="inputStyle" placeholder="请输入密码"/>
				<view class="forget" @click="handleToForget">忘记密码？</view>
				<button class="submit" form-type="submit">登录</button>
			</form>
			<view class="nophone">
				<text>没有账号？</text>
				<text class="link" @click="handleToRegister">立即注册？</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapActions } from "vuex"

	export default {
		data() {
			return {
				phone:'',
				password: ''
			}
		},
		onShow() {
			this.int()
		},
		methods: {
      ...mapActions([ "PhoneLogin"]),

			int(){
				var a = document.getElementsByClassName('uni-page-head-hd')
				if (a.length) {
					a[0].style.display = 'none';
				}
			},
			formSubmit(data) {
				const { phone, password } = data?.detail?.value
				if (!phone) {
					uni.showToast({
					    title: '账号不能为空',
					    icon: 'error',
					    duration: 2000
					})
					return
				}
				if (!password) {
					uni.showToast({
					    title: '密码不能为空',
					    icon: 'error',
					    duration: 2000
					})
					return
				}
				uni.showToast({
          title: '',
          icon: 'loading',
					duration: 9000
        })
        this.PhoneLogin({phone: phone, password: password}).then((res) => {
				if (res.data.success) {
					this.$tip.success('登录成功!')
					this.$Router.replaceAll({ name: 'index' })
					// #endif
				} else {
					this.$tip.alert(res.data.message);
				}
        }).catch((err) => {
          let msg = err.data.message || "请求出现错误，请稍后再试"
          this.$tip.alert(msg);
        }).finally(() => {
        })
			},
			handleToRegister() {
				// uni.navigateTo({url: "/pages/register/register"});
        this.$Router.replaceAll({ name: 'register' })
			},
			handleToForget() {
				// uni.navigateTo({url: "/pages/register/register"});
        this.$Router.replaceAll({ name: 'forget' })
			},
		}
	}
</script>

<style scoped lang="scss">
.loginBg {
	width: 100%;
	object-fit: cover;
}
.main {
	margin-top: -150px;
	padding: 0 28px;
	position: relative;
	z-index: 9;
}
.label {
	display: flex;
	align-items: center;
	margin: 25px 0 17px 0;
}
.label:first-child {
	margin-top: 0;
}
.title {
	font-size: 22px;
	font-family: PingFang SC-Heavy, PingFang SC;
	font-weight: 800;
	color: #17191A;
	margin-bottom: 40px;
}
.phoneImg {
	width: 22px;
	height: 22px;
	margin-right: 4px;
}
.inputStyle {
	border-bottom: 1px solid #EBECED;
	font-size: 15px;
	line-height: 21px;
	padding-bottom: 7px;
	&::placeholder {
		font-size: 15px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #C5C6C7;
		line-height: 21px;
		-webkit-text-fill-color: transparent;
	}
}
.forget {
	font-size: 13px;
	font-family: PingFang SC-Regular, PingFang SC;
	font-weight: 400;
	color: #4F5459;
	line-height: 17px;
	margin-top: 8px;
}

.submit {
	width: 300px;
	height: 40px;
	background: #2E96FF;
	border-radius: 22px;
	margin: 32px auto 0 auto;
	font-size: 15px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	text-align: center;
	line-height: 40px;
}
.nophone {
	margin-top: 26px;
	text-align: center;
	font-size: 15px;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 600;
	color: #17191A;
	.link {
		color: #17191A;
		text-decoration: underline;
	}
}
</style>
