import axios from "axios";
import jsonBig from "json-bigint";
import store from "store";
import { Toast } from "vant";
import { removeItem } from "utils/storage";
export const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/",
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data);
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        };
      }
    }
  ]
});
// 请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state;
    // 如果用户已登录，统一给接口设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    // 测试接口用
    console.log(`url:${config.url} method:${config.method}`);
    console.log("请求参数:", config.params || config.data);

    // 拦截后需要将拦截下来的请求数据返回发送
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截器
request.interceptors.response.use(
  res => {
    // 拦截后需要将拦截下来处理成的结果返回
    console.log("相应结果:", res.data);
    console.log("--------------------");

    return res.data;
  },
  error => {
    const { status } = error.response;

    if (status === 401) {
      // 清除vux和本地的token 让路由守卫来判断是否有token，直接去/Login
      removeItem("toutiao-user");
      store.commit("setUser", "");
    } else if (status === 400) {
      Toast.fail({
        message: "服务器故障，请重试",
        forbidClick: true
      });
      // 没有权限
    } else if (status === 404) {
      // 资源不存在
      Toast.fail({
        message: "请求资源不存在",
        forbidClick: true
      });
    } else if (status >= 500) {
      // 服务端异常
      Toast.fail({
        message: "服务端异常，请稍后重试",
        forbidClick: true
      });
    }

    return Promise.reject(error);
  }
);
// function redirectLogin() {
//   router.push({
//     path: "/login",
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   });
// }
export default request;
