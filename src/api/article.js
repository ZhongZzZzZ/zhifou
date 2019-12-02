import request from '@/utils/request'

export default {
    // 获取首页文章列表
    getIndexInfo(data){
        return request({
            url:'/article/queryArticle',
            method:'post',
            data
        })
    },
    // 获取文章详情页信息
    getDetailInfo(data) {
        return request({
            url:'/article/queryArticleDetailed',
            method:'post',
            data
        })
    },
    // 获取文章所有评论信息
    getCommentInfo(data) {
        return request({
            url:'/comment/queryComment',
            method:'post',
            data
        })
    }
}