<template>
	<view class="container">
		<scroll-view v-if="list.length" scroll-y="true" class="scroll-box">
			<view v-for="(item, index) in list" :key="index" class="item" :class="!item.other && 'other-item'">
				<view v-if="item.other" class="other box">
					<image class="avatar" src="../../static/kefu/kefu-icon.png" alt=""></image>
					<view class="content">{{ item.content }}</view>
				</view>
				<view v-else class="own box">
					<view class="content">{{ item.content }}</view>
					<image class="avatar" src="../../static/kefu/kefu-icon.png" alt=""></image>
				</view>
			</view>
		</scroll-view>
		<view class="bottom-input">
			<input type="text">
			<view class="txt">发送</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				},
				{
					content: '真的吗',
					other: true
				},
				{
					content: '假的',
					other: false
				}
			],
		}
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.container {
	.bottom-input {
		position: fixed;
		bottom: 0px;
		width: 100%;
		display: flex;
		padding: 8px 12px;
		align-items: center;
		background-color: #F0F1F2;
		box-sizing: border-box;

		input {
			padding: 0 12px;
			background-color: #fff;
			height: 32px;
			line-height: 32px;
			border-radius: 4px;
			width: 100%;
		}

		.txt {
			margin-left: 12px;
			padding: 0 12px;
			height: 32px;
			line-height: 32px;
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			background: #2E96FF;
			border-radius: 17px;
			white-space: nowrap;
		}
	}

	.scroll-box {
		padding: 16px 12px 60px;
		box-sizing: border-box;

		.item {

			display: flex;

			.avatar {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}

			.box {
				display: flex;
				align-items: start;

				.content {
					background: #fff;
					padding: 12px;
					border-radius: 8px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #17191A;
				}
			}

			.other {
				.avatar {
					margin-right: 10px;
				}
			}

			.own {
				.avatar {
					margin-left: 10px;
				}

				.content {
					background: #2E96FF;
					color: #fff
				}
			}

			&.other-item {
				flex-direction: row-reverse;
			}
		}

	}
}
</style>
