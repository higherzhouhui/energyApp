//在config/index.js
// 请求的基本路径
const baseURL = process.env.NODE_ENV === "development" ?
"http://fbs-web.testlive.vip/api"://测试环境(请求接口的代理路径)
"http://fbs-web.testlive.vip/api";//上线环境
 
export {baseURL}