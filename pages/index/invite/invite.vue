<template>
	<view class="container">
		<view class="top">
			<image src="../../../static/yaoqing/bg.png" class="inviteImg"></image>
		</view>
		<view class="content">
			<view class="inviteWrapper">
				<view class="title">我的邀请码</view>
				<image src="../../../static/yaoqing/qrd.png" mode="scaleToFill" show-menu-by-longpress class="qrdImg">
				</image>
				<view class="btnGroup">
					<view class="btn" @tap="downloadQrd()">下载二维码</view>
					<view class="btn" @tap="copyInviteLink()">复制推广链接</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {USER_INFO} from '@/common/util/constants.js'
	export default {
		data() {
			return {
				qrdImg:'',
				linkUrl: ''
			}
		},
		onLoad() {
			const {inviteCode} = uni.getStorageSync(USER_INFO)
			const url = `${location.host}?inviteCode=${inviteCode}/#/pages/register/register`
			this.linkUrl = url
		},
		methods: {
			downloadQrd() {
				uni.downloadFile({
					url: 'https://ossimg.fbs55.com/common/common_1685704529000_87162.png',
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: '保存成功, 请在相册中查看',
								});
							},
							fail: function() {
								uni.showToast({
									title: '保存失败, 请开启存储照片权限',
								});
							}
						});
					},
					fail: function() {
						uni.showToast({
							title: '下载失败，请检查网络后重试',
						});
					}
				});
			},
			copyInviteLink() {
				uni.setClipboardData({
					data: this.linkUrl,
					success: function() {
						uni.showToast({
							title: '已复制到剪贴板',
						});
					},
					fail: function() {
						uni.showToast({
							title: '复制失败',
							icon: 'error',
						});
					},
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background: #FEC695;

		.top {
			position: relative;
			width: 100%;
			height: 0;
			padding-bottom: 116%;
		}

		.inviteImg {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.content {
			position: absolute;
			bottom: 12px;
			width: calc(100% - 24px);
			left: 12px;

			.inviteWrapper {
				background: #FFFFFF;
				border-radius: 12px 12px 12px 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 32px 0;

				.title {
					font-size: 18px;
					font-family: PingFang SC-Semibold, PingFang SC;
					font-weight: 600;
					line-height: 30px;
					margin-bottom: 22px;
				}

				.qrdImg {
					width: 185px;
					height: 185px;
					margin-bottom: 32px;
				}

				.btnGroup {
					display: flex;

					.btn {
						height: 40px;
						background: linear-gradient(90deg, #FF6C5E 0%, #FF4F6D 100%);
						border-radius: 22px 22px 22px 22px;
						padding: 0 24px;
						font-size: 15px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 40px;
						margin-right: 12px;
					}

					.btn:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>