<template>
    <div>
        <div v-for="(item,index) in articles" :key="index"> 
            <div class="mycomment">{{ my_comment }}
                <span class="article_time">{{ item.create_time }}</span>
            </div>
            <div class="article_box">
                <div class="article_title">
                    {{ item.title }}
                    <el-tag>{{item.type_name}}</el-tag>
                    <span class="article_time">{{ item.create_time }}</span>
                </div>
                <img class="article_img" :src="item.photo_url" v-if="item.photo_url">
                <div class="article_content">
                    <span>{{ item.simple_content }}</span>
                </div>
                <div class="article_footer">
                    <i class="el-icon-chat-line-square article_icon">{{ item.comment_count }}条评论</i>
                    <i class="el-icon-view article_icon">浏览量{{ item.page_view }}</i>
                    <i class="el-icon-thumb article_icon">点赞{{ item.point_count }}</i>
                    <el-button  class="article_btn" icon="el-icon-zoom-in" @click="detail(item.article_id)" plain>查看全文</el-button>
                </div>
            </div>
            <div class="comment_info">
                <el-button class="comment_btn" icon="el-icon-delete" @click="del(item.article_id,index)" plain>删除评论</el-button>
                <el-button icon="el-icon-caret-bottom" @click="reply(item.comment_id)">查看回复</el-button>
                <i class="el-icon-s-comment reply_count">共有5条回复</i>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../api/user'
    import articleApi from '../../api/article'
    import {getLocalStorage} from "../../utils/auth";

    export default {
        name: "myarticle",
        data(){
            return {
                user:{},
                articles: [],
                my_comment: '我的第一条评论'
            }
        },
        methods: {
            del(id,index) {
                articleApi.delArticle({token:getLocalStorage('token'),article_id:id}).then(res => {
                    console.log(res)
                    this.articles.splice(index, 1);
                })

            },
            detail(id) {
                let routeUrl = this.$router.resolve({
                    path:'/articleDetail',
                    query:{id:id}
                })
                window.open(routeUrl.href,"_blank")
            }
        },
        created(){
            api.getLauchedArticleInfo({
                user_id: getLocalStorage('user_id'),
                token:getLocalStorage('token'),
                page:1
            }).then(res => {
                console.log(res);
                this.articles = res.article;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .mycomment {
        // font-weight: 600;
        font-size: 18px;
        margin-bottom: 10px;
        .del_btn {
            float: right;
        }
        .del_btn:hover {
            color: #fff;
        }
    }
    .el-button {
        margin-left: 10px;
        padding: 8px 10px;
    }
    .comment_info {
        font-weight: 400;
        font-size: 14px;
        color: #909399;
        margin: 10px 0px;
        .reply_count {
            margin-left: 5px; 
            vertical-align: bottom;
            font-size: 14px;
        }
        .comment_btn {
            margin-left: 0px;
            color: #8DAFFC;
            border-color: #8DAFFC;
        }
        .comment_btn:hover {
            color: #8DAFFC !important;
            border-color: #8DAFFC !important;
            background-color: #f4f7ff !important;
        }
    }
    .article_time {
        font-weight: 400;
        font-size: 14px;
        color: #909399;
        line-height: 24px;
        margin-left: 5px;
        float: right;
    }
    .article_box {
        height: 185px;
        padding: 20px 20px;
        position: relative;
        border: 1px solid #f7f8fa;
        .article_title {
            height: 30px;
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 10px;
        }
        .article_img {
            width: 200px;
            border-radius: 5px;
            float: left;
            margin-right: 20px;
        }
        .article_content {
            height: 120px;
            vertical-align: top;
            font-size: 15px;
            line-height: 30px;
            span {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }
        }
        .article_footer {
            float: right;
        }
        .article_btn:hover {
            color: #8DAFFC !important;
            border-color: #8DAFFC !important;
            background-color: #fff !important;
        }
        .article_icon {
            font-size: 15px;
            color: #909399;
            vertical-align: middle;
            margin-left: 10px;
        }
    }
    .article_box::after {
        content: "";
        position: absolute;
        right: 20px;
        left: 20px;
        bottom: 0;
        height: 1px;
        background-color: #f7f8fa;
    }
</style>
