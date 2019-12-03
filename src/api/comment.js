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
    getReplyInfo(data) {
        return request({
            url:'/comment/queryReply',
            method:'post',
            data
        })
    }
}