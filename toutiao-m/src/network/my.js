import { request } from "utils/request";
/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/user/profile"
  });
};

/**
 * 修改用户个人资料
 */
export const updateUserProfile = data => {
  return request({
    method: "PATCH",
    url: "/app/v1_0/user/profile",
    data
  });
};

/**
 * 修改用户照片资料
 */
export const updateUserPhoto = data => {
  return request({
    method: "PATCH",
    url: "/app/v1_0/user/photo",
    data
  });
};
