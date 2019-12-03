<template>        
    <div>
        <div class="comment-title">
            <span class="maintitle">评论</span>
            <span>共有{{ comment_count }}条评论</span>
        </div>

        <!-- 发表评论 -->
        <div class="my-comment" > 
            <img :src="user.user_url">
            <textarea v-model="mycomment"></textarea>
            <div class="corr">
                <em class="arrline">◆</em>
                <span class="arrclr">◆</span>
            </div>
            <el-button class="comment-btn" type="primary" @click="comment" :disabled="isNull">评论</el-button>
        </div>

        <!-- 用户评论 -->
        <div class="user-comments">
            <div class="comment-title">
                <span>用户评论</span>
            </div>
            <div class="comment-item" v-for="item in comments" :key="item">
                <img :src="item.user_url" >
                <div class="comment-content">
                    <span class="content-username">{{ item.user_name }}：</span>
                    <span>{{ item.comment_content }}</span>
                </div>
                <div class="comment-time">{{ item.create_time }}</div>

                <!-- 查看回复icon -->
                <i class="el-icon-s-comment" @click="reply(item.comment_id)" v-if="responseShow != item.comment_id">查看回复</i>
                <i class="el-icon-s-comment" @click="responseShow=0" v-else>收起回复</i>
                
                <!-- 对评论的回复 -->
                <i class="el-icon-chat-round" @click="replyComment(item.comment_id)">回复</i>
                <div class="my_response" v-if="myresponseShow == item.comment_id">
                    <img :src="user.user_url">
                    <el-input  class="myresponse_input" type="textarea" placeholder="请输入内容" v-model="myresponse" maxlength="100" show-word-limit></el-input>
                    <el-button class="comment-btn" type="primary">发送</el-button>
                    <i class="el-icon-arrow-up" @click="myresponseShow=0">收起</i>
                </div>

                <!-- 回复信息列表 -->
                <div class="response" v-if="responseShow == item.comment_id">
                    <div class="comment-item" v-for="res in response" :key="res">
                        <img :src="res.to_user_url" >
                        <div class="comment-content">
                            <span class="content-username">{{ res.to_user_name }} <span class="huifu">回复</span> {{ res.from_user_name }}：</span>
                            <span>{{ res.reply_content }}</span>
                        </div>
                        <div class="comment-time">{{ res.create_time }}</div>
                        <i class="el-icon-chat-round" @click="myreplyShow = res.rely_id">回复</i>
                        
                        <!-- 对回复的回复 -->
                        <div class="my_response" v-if="myreplyShow == res.rely_id">
                            <img :src="user.user_url">
                            <el-input  class="myresponse_input" type="textarea" placeholder="请输入内容" v-model="myresponse" maxlength="100" show-word-limit></el-input>
                            <el-button class="comment-btn" type="primary">发送</el-button>
                            <i class="el-icon-arrow-up" @click="myreplyShow=0">收起</i>
                        </div>
                    </div>
                    <el-pagination small layout="prev, pager, next" page-size="10" :total="reply_count" @current-change="currentChange(id)" > </el-pagination>
                </div>
            </div>
            <pagination :total="comment_count" @getNewList="getNewList"></pagination>
            <!-- <el-pagination small layout="prev, pager, next" :total="50"></el-pagination> -->
        </div>    
    </div>

</template>

<script>
    import articleApi from '../../api/article'
    import pagination from '../../components/pagination/pagination'
    import commentApi from '../../api/comment'
    export default {
        name: "comment",
        data(){
            return {
                responseShow: 0,
                myresponseShow: 0,
                myreplyShow: 0, 
                isNull: true,
                myresponse:'',
                user: {},
                comments: [],
                comment_count: 0,
                reply_count: 0,
                response: [],
                mycomment:''
            }
        },
        methods: {
            getNewList(val){ //评论的分页
                articleApi.getCommentInfo({  // 获取评论列表
                    article_id: 10001,
                    token:'123456',
                    page: val
                }).then(res => {
                    this.comments = res.comment;
                    this.comment_count = res.comment_count;
                })
            },
            currentChange(val,id) { // 回复的分页
                commentApi.getReplyInfo({
                    comment_id: id,
                    token:'123456',
                    page: val
                }).then(res => {
                    // console.log(res);
                    this.response = res.reply;
                    this.reply_count = res.reply_count;
                })
            },
            comment() { // 发表评论
                commentApi.addComment({
                    article_id: 10001,
                    token:'123456',
                    comment_content: this.mycomment
                }).then(res => {
                    // console.log(res);
                    this.comments.unshift(res.comment[0]);
                    this.comment_count++;
                    this.mycomment = '';
                })
            },
            reply(id) { // 获取回复列表信息
                this.responseShow = id;
                commentApi.getReplyInfo({
                    comment_id: id,
                    token:'123456',
                    page: 1
                }).then(res => {
                    // console.log(res);
                    this.response = res.reply;
                    this.reply_count = res.reply_count;
                })
            },
            replyComment(id) { // 对评论的回复
                this.myresponseShow = id;
                // commentApi.addComment({
                //     article_id: 10001,
                //     token:'123456',
                //     comment_content: this.mycomment
                // }).then(res => {
                //     // console.log(res);
                //     this.comments.unshift(res.comment[0]);
                //     this.comment_count++;
                //     this.mycomment = '';
                // })
            }
        },
        watch: {
            mycomment() {
                if(this.mycomment == '') this.isNull = true;
                return this.isNull = false;
            }
        },
        created(){
            articleApi.getCommentInfo({  // 获取评论列表
                article_id: 10001,
                token:'123456',
                page:1
            }).then(res => {
                console.log(res.comment);
                this.comments = res.comment;
                this.comment_count = res.comment_count;
            })
        },
        components: {
            pagination
        }
    }
</script>

<style lang="scss" scoped>
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
        margin: 40px 0px 20px 0px;
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
            .huifu {
                color: #000000;
            }
        }
        .content-username {
            color: #8DAFFC;
            text-decoration: none;
        }
        .pagination {
            margin: 10px -10px 0px 0px;
            float: right;
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
        margin: 0px 0px 24px 31px;
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
        .el-pagination {
            margin: 10px -10px 0px 0px;
            float: right;
        }
    }
    
</style>
