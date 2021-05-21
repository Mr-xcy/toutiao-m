import request from '@/utils/request'

/**
 * 获取搜索结果
 */
 export function getSearchResult(params) {
  return request({
    method: "GET",
    url: "/app/v1_0/search",
    params
  })
}

/**
 * 获取联想建议（自动补全）
 */
 export function getSearchSuggestions(q) {
  return request({
    method: "GET",
    url: "/app/v1_0/suggestion",
    params:{
      q
    }
  })
}