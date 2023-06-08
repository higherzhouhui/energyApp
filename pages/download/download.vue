<template>
	<view class="main">
		<image src="https://ossimg.fbs55.com/common/common_1686194816000_49273.png" alt="logo" class="logo"/>
		<view class="bottom">
		  <a download="正泰新能源.apk " :href="versionInfo.downUrl" class="download">立即下载</a>
		  <view class="version">{{versionInfo.version}}</view>
		</view>
	</view>
</template>

<script>
	import {getVersionRequest} from "@/api/user.js"
	export default {
		data() {
			return {
				versionInfo: {}
			}
		},
		onLoad() {
			this.int()
			this.getVersion()
		},
		methods: {
			int(){
				// #ifdef H5
				var a = document.getElementsByClassName('uni-page-head-hd')
				if (a.length) {
					a[0].style.display = 'none';
				}
				// #endif
			},
			getVersion() {
				getVersionRequest({ deviceType:1 }).then(res => {
					if (res.code === 200) {
						this.versionInfo = res.data
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
  .main {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-image: url('https://ossimg.fbs55.com/common/common_1686194780000_44957.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 80px 0 120px 0;
    box-sizing: border-box;
  }
  .logo {
    width: 200px;
    height: 165px;
  } 
  .bottom {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
  }
  .download {
    width: 256px;
    height: 50px;
    background: linear-gradient(90deg, #FFC42E 0%, #FF822E 100%);
    border-radius: 28px 28px 28px 28px;
    opacity: 1;
    text-decoration: none;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
  }
  .version {
    font-size: 13px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
	margin-top: 12px;
  }
</style>
