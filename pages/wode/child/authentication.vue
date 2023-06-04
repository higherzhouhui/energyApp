<template>
	<view class="container">
		<view class="top-title">请填写您本人的身份信息</view>
		<form @submit="formSubmit" @reset="formRest">
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">真实姓名</view>
					<input class="uni-input" placeholder="请输入您的真实姓名" />
				</view>
			</view>
			<view class="form-box">
				<view class="uni-form-item uni-column">
					<view class="title">身份证号</view>
					<input class="uni-input" placeholder="请输入您的身份证号"/>
				</view>
			</view>
		</form>
		<view class="sure-btn">立即认证</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
	.top-title{
		padding: 13px;
		font-size: 13px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #969899;
	}
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