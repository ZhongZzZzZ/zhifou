<template>
<div>
    <Nav style="position:sticky;"></Nav>
    <div class="main">
        <!-- 标题 -->
        <div class="title_main">
            <div class="title">{{ article.title }}</div>
            <div class="tags"><el-tag>{{article.type_name}}</el-tag></div>
            <!-- 收藏功能未完成 -->
            <el-button type="primary" icon="el-icon-star-on" @click="store">收藏</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="jump">写评论</el-button>
            <i class="el-icon-chat-line-square article_icon">{{ comment_count }}条评论</i>
            <div class="hot_info">
                <div class="star_account">
                    <div class="hot_title">被收藏</div>
                    <strong>{{ article.collection_count }}</strong>
                </div>
                <div class="comment_account">
                    <div class="hot_title">被浏览</div>
                    <strong>{{ article.page_view }}</strong>
                </div>
            </div>
        </div>

        <!-- 正文 -->
        <div class="article_main">
            <div class="article_content" v-html="article.content"></div>
            <!-- {{ article.content }} -->
            <div class="article_time">{{ article.create_time }}</div>
            <i class="el-icon-chat-line-square article_icon">{{ comment_count }}条评论</i>
             <!-- 收藏点赞功能未完成 -->
            <el-button type="primary" icon="el-icon-star-on" @click="store">收藏</el-button>
            <el-button type="primary" class="like_btn" icon="el-icon-thumb" @click="point">点赞 {{article.point_count}}</el-button>
        </div>

        <!-- 作者 -->
        <div class="user_main">
            <div class="user_title">关于作者</div>
            <div class="user_info">
                <img :src="article.user_url" class="user_avatar" @click="userinfo">
                <div class="user_name" @click="userinfo">{{ article.user_name }}</div>
                <div class="user_like">
                    <div class="article">
                        <div class="hot_title">文章</div>
                        <strong>{{ article.write_count }}</strong>
                    </div>
                    <div class="collection">
                        <div class="hot_title">收藏</div>
                        <strong>{{ article.star_count }}</strong>
                    </div>
                </div>
                <el-button type="primary" class="chat_btn" icon="el-icon-chat-dot-round" @click="chat">私信</el-button>
            </div>
        </div>

        <!-- 评论 -->
        <div class="comment_main" id="comment">
            <comment></comment>
        </div>
    </div>
</div>
</template>

<script>
    import Nav from '../../components/navBar/nav'
    import comment from '../../components/comment/comment'
    import articleApi from '../../api/article'
    export default {
        name: "articleDetail",
        data(){
            return {
                user: {},
                article: {},
                comment_count: 0,
            }
        },
        methods: {
            jump() { // 跳转到写评论
                let ele = document.querySelector("#comment");
                ele.scrollIntoView(true); // true 是默认的
            },
            store() { // 收藏

            },
            point() { // 点赞

            },
            chat() { // 私信
                this.$router.push('/message')
            },
            userinfo() {
                this.$router.push('/userinfo')
            },
        },
        created(){
            articleApi.getDetailInfo({
                article_id: 10001,
                token:'123456'}
            ).then(res => {
                this.article = res.article;
                this.user = res.user;
                // console.log(this.article);               
                // console.log(this.user);       
            })
        },
        components: {
            Nav,
            comment
        }
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
                cursor: pointer;
                width: 60px;
                height: 60px;
            }
            .user_name {
                cursor: pointer;
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
        padding: 50px 30px 40px 30px;
    }
</style>
