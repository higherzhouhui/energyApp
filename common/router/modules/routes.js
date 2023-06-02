const routes = [
	{
	 path: "/pages/login/login",
	 name: 'login',
		 meta: {
			 title: '登录',
		 },
	},
	{
		path: "/pages/register/register",
		name: 'register',
			meta: {
				title: '注册',
			},
	},
	{
		path: "/pages/forget/forget",
		name: 'forget',
			meta: {
				title: '忘记密码',
			},
	},
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/index/index',
      name: 'index',
        meta: {
	        title: '首页',
	    },
	},
	{
		path: "/pages/tuiguang/tuiguang",
		name: 'tuiguang',
			meta: {
				title: '推广',
			},
	},
	{
		path: "/pages/xiangmu/xiangmu",
		name: 'xiangmu',
			meta: {
				title: '项目',
			},
	},
	{
		path: "/pages/kefu/kefu",
		name: 'kefu',
			meta: {
				title: '客服',
			},
	},
	{
		path: "/pages/wode/wode",
		name: 'wode',
			meta: {
				title: '我的',
			},
	},
]
export default routes