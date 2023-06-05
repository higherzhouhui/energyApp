<template>
	<view>
		<view class="container">
			<scroll-view  :scroll-top="settingOptions.scrollTop" scroll-y="true" class="scroll-box" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll">
				<view v-for="(item, index) in list" :key="index"  class="scroll-view-item item">
					<view class="left-info">
						<view class="name">
							{{item.type | title}}
							<view v-if="item.describe">-{{ item.describe }}</view>
						</view>
						<view class="time">
							{{item.createTime}}
						</view>
					</view>
					<view class="price">
						 {{`${item.state == 1 ? '+' : '-'} ${item.amount.toFixed(2)}`}}
					</view>
					
				</view>
				
			</scroll-view>
			<view v-if="!list.length" class="no-data">暂无数据</view>
		</view>
		
	</view>
</template>

<script>
import {getWalletFlowList} from '@/api/bank'
	export default {
		filters: {
			title(type) {
				switch(type) {
					case 'bonus': return '分红钱包';
					case 'extend': return '推广钱包';
					case 'earnings': return '收益钱包';
					case 'chnt': return '正泰补贴金';
				}
			}
		},
		data() {
			return {
				settingOptions: {
					scrollTop: 0,
					old: {
						scrollTop: 0
					}
				},
				list: []
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				getWalletFlowList({pageNum: 1, pageSize: 10}).then(rt=>{
					this.list = rt.data.list
				})
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.settingOptions.old.scrollTop = e.detail.scrollTop
			},
		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding: 0 16px;
		margin-top: 12px;
		background-color: #Fff;
		.item{
			display: flex;
			justify-content: space-between;
			align-items: top;
			padding: 16px 0 ;
			border-bottom: 1px solid #EBECED;
			&:last-child{
				border: unset;
			}
			.name{
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #17191A;
				display: flex;
			}
			.price{
				font-size: 15px;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #2E96FF;
			}
			.time{
				margin-top: 6px;
				font-size: 12px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #969899;
			}
		}
		.no-data{
			padding: 20px 0;
			font-size: 14px;
			color: rgba(23, 25, 26, .5);
			text-align: center;
		}
	}
</style>