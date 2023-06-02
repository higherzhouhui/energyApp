<template>
	<view class="container">
		<view class="item" v-for="item in list" :key="item.id">
			<view class="top-info">
				<view class="avatar-box">
					<img class="avatar" :src="item.avatar" alt="">
					<view class="avatar-info">
						<view class="name">{{item.name}}</view>
						<view class="num">
							<view class="fh">￥</view>{{item.price}}</view>
					</view>
				</view>
				<view class="button">
					立即购买
				</view>
			</view>
			<view class="botton-info">
				<view class="in-item">
					<view class="value">{{item.v1}}</view>
					<view class="txt">正泰补贴(元)</view>
				</view>
				<view class="in-item">
					<view class="value2 value">{{item.v2}}</view>
					<view class="txt">每日收益</view>
				</view>
				<view class="in-item">
					<view class="value">{{item.v3}}</view>
					<view class="txt">周期(天)</view>
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
					avatar: 'https://alipic.lanhuapp.com/web475b3b1e-96fa-4a25-be45-7c2868ddce63',
					price: '3000',
					v1:3000,
					v2: 30,
					v3: 30
					
				},{
					id: 2,
					name: '商品2',
					avatar: 'https://alipic.lanhuapp.com/web475b3b1e-96fa-4a25-be45-7c2868ddce63',
					price: '3000',
					v1:3000,
					v2: 30,
					v3: 30
					
				}]
			}
		},
		onShow() {
			this.int()
		},
		methods: {
			int(){
				// #ifdef H5
				var a = document.getElementsByClassName('uni-page-head')
				if (a.length) {
					a[0].style.backgroundColor = '#D4E8FC'
				}
				// #endif
			},
		}
	}
</script>

<style scoped lang="scss">
.container{
	padding: 12px;
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
					width: 53px;
					height: 53px;
					border-radius: 8px;
				}
				.avatar-info{
					.name{
						color: #17191A;
						font-size: 15px;
					}
					.num{
						margin-top: 5px;
						font-size: 20px;
						font-family: DIN-Bold, DIN;
						font-weight: bold;
						color: #FF4B4B;
						.fh{
							display: inline-block;
							font-size: 14px;
							font-family: PingFang SC-Semibold, PingFang SC;
							font-weight: 600;
						}
					}
				}
			}
			.button{
				padding: 5px 16px;
				background-color: #2E96FF;
				font-size: 13px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				border-radius: 16px;
			}
		}
		.botton-info{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 12px;
			padding: 9px 19px 5px 19px;
			background-color: #F6FAFF;
			border-radius: 4px;
			.in-item{
				text-align: center;
				.value{
					font-size: 16px;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					color: #17191A;
					&.value2{
						color: #2EC18F;
					}
				}
				.txt{
					margin-top: 3px;
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #4F5459;
				}
			}
		}
	}
}

</style>
