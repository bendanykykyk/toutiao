import { request } from "@/utils/request";

// 获取用户信息
export function getUserChannel() {
  return request({
    url: "/app/v1_0/user/channels",
    method: "get"
  });
}

// 获取频道新闻推荐
export function getChannelRecommend(paramsObject) {
  return request({
    url: "/app/v1_1/articles",
    method: "get",
    params: {
      channel_id: paramsObject.channel_id,
      timestamp: paramsObject.timestamp,
      with_top: paramsObject.with_top
    }
  });
}
// 获取频道新闻推荐
export function getAllChannel() {
  return request({
    url: "/app/v1_0/channels",
    method: "get"
  });
}
// 批量修改用户频道列表（部分覆盖）
export function editChannelsByPatch(data) {
  return request({
    url: "/app/v1_0/user/channels",
    method: "PATCH",
    data
  });
}
