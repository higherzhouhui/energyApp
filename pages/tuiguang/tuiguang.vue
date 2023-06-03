<template>
	<view class="container">
		<img class="bg" src="../../static/tuiguang/bg.png" alt="">
		<view class="box">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="top-info">
					<view class="avatar-box">
						<img class="avatar" src="../../static/tuiguang/icon.png" alt="">
						<view class="avatar-info">
							<view class="name">{{item.name}}</view>
							<view class="num">
								已邀请实名会员：{{item.num}}人</view>
							<view class="txt">邀请 <view class="numed">{{item.numed}}人</view>实名认证即可领取</view>
						</view>
					</view>
					<view class="button">
						立即领取
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					id: 1,
					name: '商品1',
					num: '3000',
					numed: 20
					
				},{
					id: 2,
					name: '商品2',
					num: '3000',
					numed: 30
					
				}]
			}
		},
		onShow() {
		},
		methods: {
<<<<<<< HEAD
			
=======
>>>>>>> ce72e408c4ad77cb28a7328c2c5551221716c5bf
		}
	}
</script>

<style scoped lang="scss">
	.container{
		.bg{
			width: 100%;
		}
		.box{
			position: relative;
			z-index: 1;
			margin-top: -40px;
			padding: 12px;
		}
		.item{
			margin-bottom: 12px;
			padding: 12px;
			box-sizing: border-box;
			border-radius: 8px;
			background-color: #fff;
			.top-info{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.avatar-box{
					display: flex;
					align-items: top;
					.avatar{
						margin-right: 8px;
						width: 43px;
						height: 43px;
						border-radius: 8px;
					}
					.avatar-info{
						.name{
							color: #17191A;
							font-size: 15px;
						}
						.num{
							padding: 1px 4px;
							border-radius: 4px;
							margin-top: 5px;
							font-size: 12px;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #F2A63A;
							background-color: #FDF2D4;
							
						}
						.txt{
							font-size: 12px;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #969899;
							.numed{
								margin-top: 3px;
								display: inline-block;
								color: #17191A;
								font-family: PingFang SC-Regular;
								font-weight: Regular;
							}
						}
					}
				}
				.button{
					padding: 6px 12px;
					background: linear-gradient(90deg, #FF6C5E 0%, #FF4F6D 100%);;
					font-size: 13px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					border-radius: 16px;
				}
			}
		}
	}
</style>
