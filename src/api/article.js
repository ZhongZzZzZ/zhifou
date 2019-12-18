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
    },
    // 阅读文章全文
    getFullArticle(data){
        return request({
            url:'/article/readFullArticle',
            method:'post',
            data
        })
    },
    //根据分类查询文章接口
    getQueryArticle(data){
        return request({
            url:'/article/queryArticleByTypeId',
            method:'post',
            data
        })
    },
    //进入页面生成文章ID
    createArticleId(data){
        return request({
            url:'/article/createArticleId',
            method:'post',
            data
        })
    },
    //发布文章或者保存到草稿
    saveArticle(data){
        return request({
            url:'/article/saveArticle',
            method:'post',
            data
        })
    },
    //获取草稿箱文章
    getDraftArticle(data){
        return request({
            url:'/article/queryDraftBox',
            method:'post',
            data
        })
    },
    //删除文章接口
    delArticle(data){
        return request({
            url:'/article/delArticleOrDraft',
            method:'post',
            data
        })
    },
    //编辑文章接口
    editArticle(data){
        return request({
            url:'/article/editorDraftBox',
            method:'post',
            data
        })
    },
    //搜索文章接口
    searchArticle(q,page){
        return request({
            url:'/article/search',
            method:'get',
            params:{q:q,page:page}
        })
    },
    //返回热词搜索接口
    popularSearch(data){
        return request({
            url:'/article/rankSearch',
            method:'post',
            data
        })
    }
}
