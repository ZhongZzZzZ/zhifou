<template>
<div>
    <Nav style="position:sticky;"></Nav>
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
                <img :src="article.user_avatar" class="user_avatar">
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
        <div class="comment_main" id="comment">
            <div class="comment-title">
                <span class="maintitle">评论</span>
                <span>共有{{ article.comment_num }}条评论</span>
            </div>
            <div class="my-comment" >
                <img :src="user.user_avatar">
                <textarea></textarea>
                <div class="corr">
                    <em class="arrline">◆</em>
                    <span class="arrclr">◆</span>
                </div>
                <el-button class="comment-btn" type="primary">评论</el-button>
            </div>
            <div class="user-comments">
                <div class="comment-title">
                    <span>用户评论</span>
                </div>
                <div class="comment-item" v-for="(item,index)in article.comments" :key="index">
                    <img :src="item.user_avatar" >
                    <div class="comment-content">
                        <span class="content-username">{{ item.user_name }}：</span>
                        <span>{{ item.content }}</span>
                    </div>
                    <div class="comment-time">{{ item.time }}</div>
                    <i class="el-icon-s-comment" @click="responseShow=item.id" v-if="responseShow != item.id">查看回复</i>
                    <i class="el-icon-s-comment" @click="responseShow=0" v-else>收起回复</i>
                    <i class="el-icon-chat-round" @click="myresponseShow=item.id">回复</i>
                    <div class="my_response" v-if="myresponseShow == item.id">
                        <img :src="user.user_avatar">
                        <el-input  class="myresponse_input" type="textarea" placeholder="请输入内容" v-model="myresponse" maxlength="100" show-word-limit></el-input>
                        <el-button class="comment-btn" type="primary">发送</el-button>
                        <i class="el-icon-arrow-up" @click="myresponseShow=0">收起</i>
                    </div>
                    <div class="response" v-if="responseShow == item.id">
                        <div class="comment-item" v-for="(res , index)in response" :key="index">
                            <img :src="res.user_avatar" >
                            <div class="comment-content">
                                <span class="content-username">{{ res.user_name }} 回复 {{ res.returned_name }}：</span>
                                <span>{{ res.content }}</span>
                            </div>
                            <div class="comment-time">{{ res.time }}</div>
                            <i class="el-icon-chat-round" @click="myreplyShow = res.id">回复</i>
                            <div class="my_response" v-if="myreplyShow == res.id">
                                <img :src="user.user_avatar">
                                <el-input  class="myresponse_input" type="textarea" placeholder="请输入内容" v-model="myresponse" maxlength="100" show-word-limit></el-input>
                                <el-button class="comment-btn" type="primary">发送</el-button>
                                <i class="el-icon-arrow-up" @click="myreplyShow=0">收起</i>
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination small layout="prev, pager, next" :total="50"></el-pagination>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import my_url from '../../assets/avatar.jpg'
    import author_url from '../../assets/ray.jpg'
    import Nav from '../../components/navBar/nav'
    export default {
        name: "articleDetail",
        data(){
            return {
                responseShow: 0,
                myresponseShow: 0,
                myreplyShow: 0,
                myresponse:'',
                user: {
                    user_avatar: my_url,
                    user_name: 'isMe'
                },
                article: {
                    id: 1,
                    title: 'Vue.js新手入门指南',
                    tags: ['其他','前端'],
                    content:'最近在逛各大网站，论坛，以及像SegmentFault等编程问答社区，发现Vue.js异常火爆，重复性的提问和内容也很多，楼主自己也趁着这个大前端的热潮，着手学习了一段时间的Vue.js，目前用它正在做自己的结业项目。',
                    create_time: '2019年11月21日 15:31:32',
                    img_url: 'https://pic1.zhimg.com/50/v2-3b25801a03a296c8c663e82eee8f9544_hd.jpg',
                    comment_num: 1000,
                    article_views: 1000000,
                    star_accout: 5200,
                    like_account: 520,
                    user_name: 'author',
                    user_avatar: author_url,
                    user_article: 5,
                    user_collection: 23,
                    comments: [
                        { id: 1, user_avatar: '', user_name: 'other', content:'嗯嗯好好行行对对没错是的有理有据无法反驳会说话你就多说点宁太厉害了简直膜拜真情实感。嗯嗯好好行行对对没错是的有理有据无法反驳会说话你就多说点宁太厉害了简直膜拜真情实感。', time:'2016-05-25 11:36:00' },
                        { id: 2, user_avatar: '', user_name: 'other', content:'嗯嗯好好行行对对没错是的有理有据无法反驳会说话你就多说点宁太厉害了简直膜拜真情实感。', time:'2016-05-25 11:36:00' }
                    ]
                },
                response: [
                    { id: 1, user_avatar: '', user_name: 'otherother',  returned_name: 'other' , content:'闭麦', time:'2016-05-25 11:40:00' },
                    { id: 2, user_avatar: '', user_name: 'another',  returned_name: 'other' , content:'一天天的', time:'2016-05-25 11:41:00' }
                ],
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
        components: {
            Nav
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
        padding: 50px 30px 40px 30px;
        .comment-title {
            padding-bottom: 10px;
            border-bottom: 2px solid #8DAFFC;
            color: #333;
            font-size: 12px;
        }
        .maintitle {
            color: black;
            font-size: 20px;
            display: inline-block;
            margin-right: 5px;
        }
        .my-comment {
            position: relative;
            margin:20px 0px;
            img {
                float: left;
                width: 60px;
                height: 60px;
                border: 1px solid #99999940;
                border-radius: 2px;
            }
            textarea {
                height: 75px;
                width: 566px;
                display: block;
                margin-left: 90px;
                padding: 5px 6px 6px;
                border: 1px solid #cdcdcd;
                border-radius: 2px;
                line-height: 19px;
                resize: none;
                overflow: auto;
                outline: none;
            }
            .corr {
                position: absolute;
                left: 82px;
                top: 23px;
                width: 13px;
                height: 14px;
                overflow: hidden;
            }
            .arrline {
                color: #cdcdcd;
                display: block;
                font-family: "SimSun";
                font-size: 15px;
                font-style: normal;
                font-weight: normal;
                height: 10px;
                line-height: normal;
                text-align: left;
            }
            .arrclr {
                margin: -10px 0 0 1px;
                color: #fff;
                display: block;
                font-family: "SimSun";
                font-size: 15px;
                font-style: normal;
                font-weight: normal;
                height: 10px;
                line-height: normal;
            }
            .comment-btn {
                float: right;
                right: 0px;
                margin-top: 10px;
            }
        }
        .user-comments {
            margin-top: 40px;
            .comment-title {
                border-bottom: 1px solid #cfcfcf;
                padding-bottom: 5px;
                font-weight: bold;
            }
            .comment-item {
                margin-top: 20px;
                border-bottom: 1px solid #f6f6f6;
                padding-bottom: 10px;
                position: relative;
                img {
                    float: left;
                    width: 24px;
                    height: 24px;
                    border: 1px solid #99999940;
                    border-radius: 2px;
                }
                i {
                    font-size: 13px;
                    color: #8590a6;
                    margin-left: 31px;
                    cursor: pointer;
                }
                i:hover {
                    color: #76839b;
                }
                .comment-time {
                    color: #999;
                    position: absolute;
                    right: 0px;
                }
            }
            .comment-content {
                position: relative;
                font-size: 14px;
                width: 633px;
                display: block;
                margin-left: 25px;
                padding: 5px 6px 6px;
            }
            .content-username {
                color: #8DAFFC;
                text-decoration: none;
            }
        }
        .my_response {
            margin: 10px 0px 0px 31px;
            border-top: 1px solid #f6f6f6;
            padding-top: 10px;
            height: 80px;
            .myresponse_input {
                display: inline-block;
                margin-left: 10px;
                width: 600px;
            }
            .comment-btn {
                float: right;
                padding: 5px 10px;
                font-size: 12px;
                margin-top: 10px;
            }
            i {
                float: right;
                margin-top: 16px;
                margin-right: 10px;
            }
        }
        .response {
            margin-left: 31px;
            .comment-item {
                border-bottom: 0;
                border-top: 1px solid #f6f6f6;
                margin-top: 10px;
                padding-top: 10px;
            }
            .comment-content {
                width: 602px;
            }
            .myresponse_input {
                width: 572px;
            }
        }
        .el-pagination {
            margin-top: 10px;
            float: right;
        }
    }
</style>
