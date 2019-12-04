import request from '@/utils/request'

export default {
    // 发表评论
    addComment(data){
        return request({
            url:'/comment/addComment',
            method:'post',
            data
        })
    },
    // 获取回复列表
    getReplyInfo(data) {
        return request({
            url:'/comment/queryReply',
            method:'post',
            data
        })
    },
    // 对评论的回复
    addReplyToComment(data) {
        return request({
            url:'/comment/addReplyToComment',
            method:'post',
            data
        })
    },
    // 对回复的回复
    addReplyToReply(data) {
        return request({
            url:'/comment/addReplyToReply',
            method:'post',
            data
        })
    }
}