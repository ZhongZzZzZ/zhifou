import request from '@/utils/request'

export default {
  // 登录
  login (data) {
    return request({
      url: '/users/login',
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
  getLauchedArticleInfo (data) {
    return request({
      url: '/article/queryArticleByMyself',
      method: 'post',
      data
    })
  },
  getCollectionArticleInfo (data) {
    return request({
      url: '/article/queryCollectionByUserId',
      method: 'post',
      data
    })
  },
  uploadPhoto(data){
    return request({
      url:'/article/uploadPhoto',
      headers: {
        'Content-Type': 'multipart/form-data' //设置post文件的请求头
      },
      method:'post',
      data
    })
  },
  // getIndexInfo(){
  //   return request({
  //     url:'/article/test',
  //     method:'get'
  //   })
  // }
}
