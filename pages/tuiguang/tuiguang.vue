<template>
	<view class="container">
		<view class="mask" v-if="ruleVisible">
			<view class="rule-box">
				<view class="box-title">
					<view class="txt">
						奖励规则
					</view>
				</view>
				<view v-for="(item, index) in rules" :key="index">
					<view class="title">{{item.title}}</view>
					<view class="section">
						<view class="line" v-for="(value, iindex) in item.list" :key="iindex">
							{{value}}
						</view>
					</view>
				</view>
				<image @click="ruleVisible = false" class="close" src="../../static/tuiguang/close.png"></image>
			</view>
			
		</view>
		
		<view class="bg-box">
			<image class="bg" src="../../static/tuiguang/bg.png" alt=""/>
		</view>
		<view class="rule" @click="ruleShow">规则</view>
		<view class="box">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="top-info">
					<view class="avatar-box">
						<image class="avatar" src="../../static/tuiguang/icon.png" alt="12"/>
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
				rules: [
					{title: '一、活动规则', list: ['实名认证后获得888元正泰补贴金，每天、签到送28元，直到888元全部释放为止',
							'邀请收益：',
							'一级13%、二级6%、三级2%',
							'当天结算的团队分红50% 可以随时提现，另外50%冻结 7天，7天后释放，可以随时提现']},
					{title: '二、推荐人数', list: ['推荐5人，赠送推广金额500',
					'推荐30人，赠送推广金额3000',
					'推荐50人，赠送推广金额5000',
					'推荐100人，赠送推广金额10000',
					'推荐500人，赠送推广金额80000']}
				],
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
					
				}],
				ruleVisible: false
			}
		},
		methods: {
			ruleShow() {
				this.ruleVisible = true
			}
		},
		onShow() {
		},
}
</script>

<style scoped lang="scss">
	.container{
		.bg-box{
			width: 100%;
			position: relative;
			padding-bottom: 56%;
			.bg{
				position: absolute;
				width: 100%;
				height: 100%;
			}
		}
		.mask{
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999999;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .6);
		}
		.rule-box{
			padding: 44px 16px 16px;
			position: absolute;
			top: 50%;
			left: 50%;
			width: 77.3%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			border-radius: 14px;
			border: 5px solid rgba(46, 150, 255, 1);
			.box-title{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: -10px;
				width: 56.55%;
				height: 0;
				padding-bottom: 12.2%;
				background: url('../../static/tuiguang/title.png');
				background-size: 100% 100%;
				text-align: center;
				.txt{
					position: absolute;
					width: 100%;
					top: 50%;
					transform: translateY(-50%);
					text-align: center;
					font-size: 16px;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
				}
				
			}
			.close{
				position: absolute;
				left: 50%;
				bottom: -60px;
				transform: translateX(-50%);
				width: 30px;
				height: 30px;
				
			}
			.title{
				margin-bottom: 7px;
				font-size: 15px;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #17191A;
			}
			.section{
				margin-bottom: 10px;
				.line{
					margin-bottom: 4px;
					font-size: 13px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #4F5459;
				}
			}
			
		}
		.rule{
			position: absolute;
			right: 0;
			top: 13%;
			padding: 2px 8px;
			font-size: 12px;
			border-radius: 10px 0 0 10px;
			background-color: rgba(34, 34, 34, .2);
			color: #fff;
		}
		.box{
			position: relative;
			z-index: 1;
			margin-top: -25px;
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
						width: 48px;
						height: 48px;
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
