
<template>
    <view>
        <!-- 动态绑定需要跳转的网址 -->
        <web-view ref="url" @onPostMessage="handleMessage" :src="url"></web-view>
    </view>
</template>
 
<script>
export default {
    data() {
        return {
            url: ''
        };
    },
    onLoad(item) {//接收上个界面传递来的参数
        this.url = item.url
        // '/#/pages/xiangmu/xiangmu?status=1'

    },
    methods: {
        handleMessage() {
            uni.navigateTo({ url: "/pages/xiangmu/xiangmu?status=1" })
        }
    }
}
</script>
 
