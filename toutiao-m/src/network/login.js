import { request } from "@/utils/request";

// 登录接口
export function login(data) {
  return request({
    url: "/app/v1_0/authorizations",
    method: "post",
    data: data
  });
}

// 验证码接口
export function getCode(mobile) {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: "get"
  });
}
