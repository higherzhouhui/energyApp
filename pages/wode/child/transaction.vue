<template>
	<view>
		<view class="container">
			<scroll-view  :scroll-top="settingOptions.scrollTop" scroll-y="true" class="scroll-box" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll">
				<view v-for="(item, index) in list" :key="index"  class="scroll-view-item item">
					<view class="left-info">
						<view class="name">
							{{item.name}}
						</view>
						<view class="time">
							{{item.time}}
						</view>
					</view>
					<view class="price">
						+{{item.price.toFixed(2)}}
					</view>
					
				</view>
				
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
import {getWalletFlowList} from '@/api/bank'
	export default {
		data() {
			return {
				settingOptions: {
					scrollTop: 0,
					old: {
						scrollTop: 0
					}
				},
				list: [
					{name: '李四', price: 50000, time: '2023-06-02'},
					{name: '李四李', price: 50000, time: '2023-06-02'},
					{name: '李四李四',price: 50000, time: '2023-06-02'},
					{name: '李四李四',price: 50000, time: '2023-06-02'}
				]
			}
		},
		onShow() {
			getWalletFlowList({pageNum: 1, pageSize: 10, type: 'earnings'})
		},
		methods: {
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
	}
</style>