<template>
<div class="main">
    <div class="title_main">
        <div class="title">{{ article.title }}</div>
        <div class="tags"><el-tag v-for="item in article.tags">{{item}}</el-tag></div>
        <el-button type="primary" icon="el-icon-star-on" @click="detail(item.id)">收藏</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="detail(item.id)">写评论</el-button>
        <i class="el-icon-chat-line-square article_icon">{{ article.comment_num }}条评论</i>
        <div class="hot_info">
            <div class="star_account">
                <div class="hot_title">被收藏</div>
                <strong>{{ article.star_accout }}</strong>
            </div>
            <div class="comment_account">
                <div class="hot_title">被浏览</div>
                <strong>{{ article.article_views }}</strong>
            </div>
        </div>
    </div>
    <div class="article_main">
        {{ article.content }}
        <div class="article_time">{{ article.create_time }}</div>
        <i class="el-icon-chat-line-square article_icon">{{ article.comment_num }}条评论</i>
        <el-button type="primary" icon="el-icon-star-on" @click="detail(item.id)">收藏</el-button>
        <el-button type="primary" class="like_btn" icon="el-icon-thumb" @click="detail(item.id)">点赞 {{article.like_account}}</el-button>
    </div>
    <div class="user_main">
        <div class="user_title">关于作者</div>
        <div class="user_info">
            <img src="article.user_avatar" class="user_avatar">
            <div class="user_name">{{ article.user_name }}</div>
            <div class="user_like">
                <div class="article">
                    <div class="hot_title">文章</div>
                    <strong>{{ article.user_article }}</strong>
                </div>
                <div class="collection">
                    <div class="hot_title">收藏</div>
                    <strong>{{ article.user_collection }}</strong>
                </div>
            </div>
            <el-button type="primary" class="chat_btn" icon="el-icon-chat-dot-round" @click="detail(item.id)">私信</el-button>
        </div>
    </div>
    <div class="comment_main">
        评论
    </div>
</div>
</template>

<script>
    export default {
        name: "articleDetail",
        data(){
            return {
                article: { 
                    id: 1, 
                    title: 'Vue.js新手入门指南', 
                    tags: ['js','vue','前端','技术','IT'],
                    content:'最近在逛各大网站，论坛，以及像SegmentFault等编程问答社区，发现Vue.js异常火爆，重复性的提问和内容也很多，楼主自己也趁着这个大前端的热潮，着手学习了一段时间的Vue.js，目前用它正在做自己的结业项目。',
                    create_time: '2019年11月21日 15:31:32',
                    img_url: 'https://pic1.zhimg.com/50/v2-3b25801a03a296c8c663e82eee8f9544_hd.jpg',
                    comment_num: 1000,
                    article_views: 1000000,
                    star_accout: 5200,
                    like_account: 520,
                    user_name: 'Linh',
                    user_avatar: '',
                    user_article: 5,
                    user_collection: 23
                },
            }
        },
        methods: {
            del(id) {
                var item = this.articles.find(item => item.id == id);
                this.articles.splice(this.articles.indexOf(item), 1);
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

        },
    }
</script>

<style lang="scss" scoped>
    .main{
        width: 1000px;
        height: 1000px;
        margin: 10px auto;
    }
    .el-button {
        padding: 10px 20px;
    }
    .article_icon {
        font-size: 15px;
        color: #909399;
        vertical-align: middle;
        margin-left: 10px;
    }
    .title_main {
        width: 940px;
        margin: 10px auto;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 20px 30px;
        position: relative;
        .title {
            font-size: 22px;
            font-weight: 600;
        }
        .tags {
            margin: 10px 0px 20px 0px;
            .el-tag {
                margin-right: 5px;
            }
        }
        .hot_info {
            position: absolute;
            top: 20px;
            right: 30px;
            width: 200px;
            .hot_title {
                font-size: 14px;
                color: #8590a6;
                margin-bottom: 5px;
            }
            strong {
                font-size: 18px;
                font-weight: 600;
            }
            .star_account {
                display: inline-block;
                border-right: 1px solid #ebebeb;
                padding-right: 10px;
                text-align:center;
            }
            .comment_account {
                display: inline-block;
                padding-left: 10px;
                text-align:center;
            }
        }
    }
    .article_main{
        display: inline-block;
        width: 670px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 50px 30px;
        font-size: 15px;
        line-height: 1.5;
        word-break: break-word;
        .article_time {
            margin: 10px;
            color:#909399;
        }
        .article_icon {
            margin-right: 10px;
        }
        .like_btn {
            float: right;
        }
    }
    .user_main{
        float: right;
        width: 260px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        .user_title {
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 15px;
            font-weight: 600;
        }
        .user_info {
            border-top: 1px solid #ebebeb;
            padding: 15px;
            .user_avatar {
                width: 60px;
                height: 60px;
            }
            .user_name {
                display: inline-block;
                font-size: 15px;
                font-weight: 600;
                margin-left: 10px;
            }
            .user_like {
                border-top: 1px solid #ebebeb;
                margin-top: 15px;
                padding-top: 15px;
                text-align: center;
                .hot_title {
                    font-size: 14px;
                    color: #8590a6;
                    margin-bottom: 5px;
                }
                strong {
                    font-size: 18px;
                    font-weight: 600;
                }
                .article {
                    display: inline-block;
                    border-right: 1px solid #ebebeb;
                    padding-right: 30px;
                    text-align:center;
                }
                .collection {
                    display: inline-block;
                    padding-left: 30px;
                    text-align:center;
                }
            }
            .chat_btn {
                margin-top: 15px;
                width: 230px;
            }
        }
    }
    .comment_main {
        width: 670px;
        margin-top: 10px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 50px 30px;
    }
</style>
