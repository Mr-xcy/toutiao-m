
/**
 * 用户相关
 */

 import request from "@/utils/request"

 /**
  * 登录
  */
  export const login = data =>{
      return request({
          method:'POST',
          url: '/app/v1_0/authorizations',
          data
      })
  }