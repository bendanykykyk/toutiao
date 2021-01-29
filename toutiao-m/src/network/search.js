/**
 * 搜索相关请求模块
 */
import request from "utils/request";

/**
 * 获取搜索联想建议
 */
export const getSearchSuggestions = q => {
  return request({
    method: "GET",
    url: "/app/v1_0/suggestion",
    params: {
      q // 联想建议关键词
    }
  });
};
/**
 * 获取搜索结果
 */
export const getSearchResults = q => {
  return request({
    method: "GET",
    url: "/app/v1_0/search",
    params: {
      q // 搜索关键字，页数等
    }
  });
};
/**
 * 获取用户搜索历史
 */
export const getSearchHistory = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/search/histories"
  });
};
/**
 * 删除用户搜索历史
 */
export const deleteSearchHistory = () => {
  return request({
    method: "DELETE",
    url: "/app/v1_0/search/histories"
  });
};
