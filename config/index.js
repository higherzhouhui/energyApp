//在config/index.js
// 请求的基本路径
const URL = 'http://api.zhtxny.com'
const baseURL = process.env.NODE_ENV === "development" ?
(window ? '/api' : "http://api.zhtxny.com")://测试环境(请求接口的代理路径)
"http://api.zhtxny.com";//上线环境
 
export {baseURL}