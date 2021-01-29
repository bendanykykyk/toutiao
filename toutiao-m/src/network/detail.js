import { request } from "utils/request";
// 获取新文章详情
export function getArticleDetail(articleId) {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: "get"
  });
}

/**
 * 获取评论列表
 */
export const getComments = params => {
  return request({
    method: "GET",
    url: "/app/v1_0/comments",
    params
  });
};
/**
 * 关注用户
 */
export const addFollow = userId => {
  return request({
    method: "POST",
    url: "/app/v1_0/user/followings",
    data: {
      target: userId
    }
  });
};

/**
 * 取消关注用户
 */
export const deleteFollow = userId => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/user/followings/${userId}`
  });
};
/**
 * 收藏文章
 */
export const collectArticle = target => {
  return request({
    method: "POST",
    url: "/app/v1_0/article/collections",
    data: {
      target
    }
  });
};
/**
 * 取消收藏文章
 */
export const cancelCollectArticle = target => {
  return request({
    method: "DELETE",
    url: `/app/v1_0/article/collections/${target}`,
    data: {
      target
    }
  });
};
/**
 * 取消对评论点赞
 */
export const likingComment = target => {
  return request({
    method: "POST",
    url: "/app/v1_0/comment/likings",
    data: {
      target
    }
  });
};
/**
 * 对文章评论
 */
export const commentArticle = data => {
  return request({
    method: "POST",
    url: "/app/v1_0/comments",
    data
  });
};
