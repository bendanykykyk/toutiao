import axios from "axios";

// export function request(config) {
//   const instance = axios.create({
//     // baseURL: "http://123.207.32.32:8000",
//     baseURL: "http://ttapi.research.itcast.cn"
//     // timeout: 5000
//   });

//   // 请求拦截器
//   instance.interceptors.request.use(
//     config => {
//       // 测试接口用
//       console.log(`url:${config.url} method:${config.method}`);
//       console.log("请求参数:", config.params || config.data);
//       // 拦截后需要将拦截下来的请求数据返回发送
//       return config;
//     },
//     err => {
//       return Promise.reject(err);
//     }
//   );

//   // 响应拦截器
//   instance.interceptors.response.use(
//     res => {
//       // 拦截后需要将拦截下来处理成的结果返回
//       console.log("相应结果:", res.data);
//       console.log("--------------------");

//       return res.data;
//     },
//     err => {
//       console.log(err);
//     }
//   );

//   return instance(config);
// }

export const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/"
});

export default request;
