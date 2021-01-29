import { request } from "@/utils/request";

// 获取用户信息
export function getUserProfile() {
  return request({
    url: "/app/v1_0/user/profile",
    method: "get"
  });
}
// 获取用户信息
export function getUserDataList() {
  return request({
    url: "/app/v1_0/user",
    method: "get"
  });
}
/**
 * 获取当前用户收藏文章列表
 */
export function getUserCollectArticles() {
  return request({
    method: "GET",
    url: "/app/v1_0/article/collections"
  });
}

/**
 * 获取当前用户阅读历史文章列表
 */
export function getUserHistoryArticles() {
  return request({
    method: "GET",
    url: "/app/v1_0/user/histories"
  });
}
/**
 * 获取当前用户阅读历史文章列表
 */
export function updatePhoto(data) {
  return request({
    method: "PATCH",
    url: "/app/v1_0/user/photo",
    data
  });
}
