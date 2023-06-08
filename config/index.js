//在config/index.js
// 请求的基本路径
const baseURL = process.env.NODE_ENV === "development" ?
"http://20.89.128.195:8080/energy"://测试环境(请求接口的代理路径)
"http://20.89.128.195:8080/energy";//上线环境
 
export {baseURL}