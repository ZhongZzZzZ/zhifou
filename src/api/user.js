import request from '@/utils/request'

export default {
  // 登录
  login (data) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  },
  // 获取用户信息
  getUserInfo () {
    return request({
      url: '/userinfo',
      method: 'get'
    })
  },
  // 获取用户已发文章列表
  getLauchedArticleInfo () {
    return request({
      url: '/article/queryArticleByMyself',
      method: 'post'
    })
  },
  // getIndexInfo(){
  //   return request({
  //     url:'/article/test',
  //     method:'get'
  //   })
  // }
}
