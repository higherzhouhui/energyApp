<template>
	<view class="container">
		<form @submit="formSubmit" @reset="formRest">
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">验证原密码</view>
					<input class="uni-input" placeholder="请输入原密码" :password="showPassword" />
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">设置新密码</view>
					<input class="uni-input" placeholder="请输入新密码" :password="showPassword" />
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">再次输入新密码</view>
					<input class="uni-input" placeholder="请再次输入新密码" :password="showPassword" />
				</view>
			</view>
		</form>
		<view class="sure-btn">确认修改</view>
	</view>
</template>

<script>
	const toast = uni.requireNativePlugin('Ba-Toast')
	export default {
		data() {
			return {
				showPassword: true,
				form: {
					oldPassword: '',
					newPassword: '',
					reNewPassword: ''
				}
			}
		},
		methods: {
			formSubmit() {
				
			},
			formRest() {
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
.container{
	.form-box{
		padding: 0 16px;
		background-color: #Fff;
		
		.uni-form-item{
			padding: 16px 0 10px;
			border-bottom: 1px solid #EBECED;
			.uni-input{
				margin-top: 16px;
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
			}
			
			.title{
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4F5459;
			}
		}
	}
	.sure-btn{
		padding: 11px 0;
		width: 86.7%;
		margin: 24px auto;
		background-color: rgba(46, 150, 255, 1);
		color: #fff;
		font-size: 15px;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		text-align: center;
		border-radius: 24px;
	}
}
</style>