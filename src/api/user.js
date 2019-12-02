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
  getIndexInfo(data){
    return request({
      url:'/article/queryArticle',
      method:'post',
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
