import request from '@/utils/request'

export default {
  // 登录
  login (data) {
    return request({
      url: '/users/logindemo',
      method: 'post',
      data
    })
  },
  register(data){
    return request({
      url:'/users/reg',
      method:'post',
      data
    })
  },
  //未登陆状态下修改密码
  resetPassword(data){
    return request({
      url:'/users/forgetpasswd',
      method:'post',
      data
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
  // 上传图片或者视频接口
  uploadPhoto(data){
    return request({
      url:'/users/uploadfiles',
      // headers: {
      //   'Content-Type': 'multipart/form-data' //设置post文件的请求头
      // },
      method:'post',
      data
    })
  },
  // 修改用户信息
  editUserInfo(data) {
    return request({
      url: '/users/update',
      method: 'post',
      data
    })
  },
  // 发送密码和token接口(未登陆状态下修改密码)
  changepasswd(data) {
    return request({
      url: '/users/changepasswd/token',
      method: 'post',
      data
    })
  },
  resetpasswd(data){
    return request({
      url:'/users/resetpasswd',
      method:'post',
      data
    })
  },
  // 登录生成验证码
  getVercode() {
    return request({
      url:'/users/getcaptcha',
      method:'get'
    })
  },
  // 搜索私信对象
  getUsers(data) {
    return request({
      url:'/users/search?q=' + data,
      method:'get'
    })
  }
  // getIndexInfo(){
  //   return request({
  //     url:'/article/test',
  //     method:'get'
  //   })
  // }
  // // 获取用户信息
  // getUserInfo () {
  //   return request({
  //     url: '/userinfo',
  //     method: 'get'
  //   })
  // },
}
