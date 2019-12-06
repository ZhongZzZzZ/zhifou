import axios from 'axios'
import config from '../config/index' // 路径配置
import Message from "element-ui/packages/message/src/main";
// 创建axios 实例
const service = axios.create({
    baseURL: config.baseURL, // api的base_url
    timeout: 10000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
    config => {
        // 这里可以自定义一些config 配置

        return config
    },
    error => {
        //  这里处理一些请求出错的情况
        Message.error({
            message:'网络错误',
            type:'error'
        })
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 这里处理一些response 正常放回时的逻辑

        return res
    },
    error => {
        // 这里处理一些response 出错时的逻辑
        if(error.response.status === 500){
           Message.error({
                message:'服务器错误',
                type:'error'
            })
        }
    }
)

export default service
