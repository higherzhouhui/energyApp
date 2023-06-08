//在config/index.js
// 请求的基本路径
const baseURL = process.env.NODE_ENV === "development" ?
"https://www.zhengtaixinnengyuan.com/energy"://测试环境(请求接口的代理路径)
"https://www.zhengtaixinnengyuan.com/energy";//上线环境
 
export {baseURL}