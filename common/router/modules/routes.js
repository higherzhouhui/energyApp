const routes = [
	{
	 path: "/pages/login/login",
	 name: 'login',
		 meta: {
			 title: '登录',
		 },
	},
	{
	  path: '/pages/login/personal/personal',
	  name: 'personal',
	    meta: {
	        title: '用户协议',
	    },
	},
	{
	  path: '/pages/login/privacy/privacy',
	  name: 'privacy',
	    meta: {
	        title: '隐私协议',
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
	  path: '/pages/index/newsDetail/newsDetail',
	  name: 'newsDetail',
	    meta: {
	        title: '新闻动态',
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
				title: 'wode',
			}
	},
	{
		path: "/pages/wode/child/userInfo",
		name: 'userInfo',
			meta: {
				title: '个人资料',
			}
	},
	{
		path: "/pages/wode/child/repassword",
		name: 'repassword',
			meta: {
				title: '修改密码',
			}
	},
	{
		path: "/pages/wode/child/myteam",
		name: 'myteam',
			meta: {
				title: '我的团队',
			}
	},
	{
		path: "/pages/wode/child/transaction",
		name: 'transaction',
			meta: {
				title: '交易明细',
			}
	},
	
]
export default routes