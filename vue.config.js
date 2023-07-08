module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://api.zhtxny.com',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}