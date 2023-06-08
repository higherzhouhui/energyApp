<template>
<view class="container">
    <view class="top">
        <image src="../../../static/yaoqing/bg.png" class="inviteImg"></image>
    </view>
    <view class="content">
        <view class="inviteWrapper">
            <view class="title">我的邀请码</view>
            <view class="ecode-box">
                <canvas ref="ecode" id="qrcode" class="ecode" style="width: 120px;" canvas-id="qrcode"></canvas>
            </view>

            <!-- <image src="../../../static/yaoqing/qrd.png" mode="scaleToFill" show-menu-by-longpress class="qrdImg"> -->
            <!-- </image> -->
            <view class="btnGroup">
                <view class="btn" @tap="dataURLtoBlob">下载二维码</view>
                <view class="btn" @tap="copyInviteLink()">复制推广链接</view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
import UQrcode from '@/common/util/ecode'
import {
    USER_INFO
} from '@/common/util/constants.js'


export default {
    data() {
        return {
            qrdImg: '',
            linkUrl: ''
        }
    },
    onLoad() {
        const {
            inviteCode
        } = uni.getStorageSync(USER_INFO)
        const url = `http://web.zhengtaixinnengyuan.com?inviteCode=${inviteCode}/#/pages/register/register`
        this.linkUrl = url
        this.qrFun(url)
    },
    methods: {
        qrFun(text) {
            let that = this
            UQrcode.make({
                canvasId: 'qrcode', //切记canvasId 里边的内容需要跟canvas里边canvas-id="qrcode"的名字一样
                componentInstance: this,
                text: text, //需要转成二维码的内容是后端传过来的，我这里是onLoad传过来的，根                              据自己的需要
                size: 120,
                margin: 0,
                backgroundColor: '#ffffff',
                foregroundColor: '#000000',
                fileType: 'jpg',
                errorCorrectLevel: UQrcode.errorCorrectLevel.H,
                success: res => {
                    that.qrdImg = res
                }
            })
        },
        dataURLtoBlob(dataurl) {
			let bitmap = new plus.nativeObj.Bitmap("test");
				bitmap.loadBase64Data(this.qrdImg, function() {
					let time = Date.now()
					let url = '_downloads/yflPic' + time + '.png';
					// uni.hideLoading()
					bitmap.save(url, {}, function(i) {
						console.log('保存图片成功：' + JSON.stringify(i));
						// 保存图片到相册
						uni.saveImageToPhotosAlbum({
							filePath: url,
							success: function() {
								uni.showToast({
									title: '图片保存成功',
									icon: 'none'
								})
								// 图片保存成功后，将临时保存的图片删除
								plus.io.resolveLocalFileSystemURL(
									url,
									function(entry) {
										entry.getMetadata(function(metadata) {
											// console.log("fileCount=" + metadata.fileCount);
											entry
												.remove(); //删除单个文件 _downloads/改文件名
 
										});
									},
									function(error) {
										// uni.showToast({ title: "下载文件" });
										console.log("error" + error);
									}
								);
								bitmap.clear()
							}
						});
						bitmap.clear();
					}, function(e) {
						onsole.log('保存图片失败：' + JSON.stringify(e));
						bitmap.clear();
					});
				}, function() {
					console.log('加载Base64图片数据失败：' + JSON.stringify(e));
					bitmap.clear();
				});
        },
        downloadQrd(url) {
            uni.saveImageToPhotosAlbum({
                filePath: 'blob:http://localhost:8080/6c198cbc-86e7-4f99-a5e8-615e4ed7ceb8',
                success: function () {
                    uni.showToast({
                        title: '保存成功',
                    });
                },
                fail: function () {
                    uni.showToast({
                        title: '保存失败',
                    });
                }
            });
        },
        copyInviteLink() {
            uni.setClipboardData({
                data: this.linkUrl,
                success: function () {
                    uni.showToast({
                        title: '已复制到剪贴板',
                    });
                },
                fail: function () {
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
