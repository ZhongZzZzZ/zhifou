<template>
    <div>
        <div class="article_box" v-for="item in articles" :key="item">
            <div class="article_title">
                {{ item.title }}
                <el-tag>{{item.type_name}}</el-tag>
                <span class="article_time">{{ item.create_time }}</span>
                <el-button class="del_btn" icon="el-icon-star-on" @click="del(item.article_id)" plain v-if="curuser_id === own.id">取消点赞</el-button>
            </div>
            <img class="article_img" :src="item.photo_photo_url" v-if="item.photo">
            <div class="article_content">
                <span>{{ item.simple_content | articleFilter }}</span>
            </div>
            <div class="article_footer">
                <i class="el-icon-chat-line-square article_icon">{{ item.comment_count }}条评论</i>
                <i class="el-icon-view article_icon">浏览量{{ item.page_view }}</i>
                <i class="el-icon-thumb article_icon">点赞{{ item.point_count }}</i>
                <el-button type="primary" icon="el-icon-zoom-in" @click="detail(item.article_id)">查看全文</el-button>
            </div>
        </div>
        <pagination :total="article_count" @getNewList="getNewList" v-if="article_count"></pagination>
    </div>
</template>

<script>
    import api from '../../api/article'
    import {getLocalStorage} from "../../utils/auth";
    import pagination from '../../components/pagination/pagination'

    export default {
        name: "pointarticle",
        data(){
            return {
                articles: [],
                own: {
                    id: getLocalStorage('user_id'),
                    token: getLocalStorage('token'),
                },
                article_count: 0,
            }
        },
        props:['curuser_id'],
        methods: {
            del(id) {
                api.pointArticle({
                    token: this.own.token,
                    article_id: id
                }).then(res => {
                    let item = this.articles.find(item => item.id == id);
                    this.articles.splice(this.articles.indexOf(item), 1);
                    this.article_count--;
                })
            },
            detail(id) {
                let routeUrl = this.$router.resolve({
                    path:'/articleDetail',
                    query:{id:id}
                })
                window.open(routeUrl.href,"_blank")
            },
            getNewList(val) {
                api.getPointArticleInfo({
                    token: this.own.token,
                    page: val,
                    user_id: this.curuser_id,
                }).then(res => {
                    this.articles = res.article;
                })
            } 
        },
        created(){
            api.getPointArticleInfo({
                user_id: this.curuser_id,
                token: this.own.token,
                page:1
            }).then(res => {
                //console.log(res);
                this.articles = res.article;
                this.article_count = res.article_count;
            })
        },
        filters:{
            articleFilter(content){
                return content + '...'
            }
        },
        components: {
            pagination
        }
    }
</script>

<style lang="scss" scoped>
    .article_box {
        height: 185px;
        padding: 20px 20px;
        position: relative;
        margin-bottom: 10px;
        .article_title {
            height: 30px;
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 10px;
        }
        .article_time {
            font-weight: 400;
            font-size: 14px;
            color: #909399;
            vertical-align: bottom;
            margin-left: 5px;
        }
        .del_btn {
            float: right;
            color: #909399;
        }
        .del_btn:hover {
            color: #fff;
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
        .article_icon {
            font-size: 15px;
            color: #909399;
            vertical-align: middle;
            margin-left: 10px;
        }
        .el-button {
            margin-left: 10px;
            padding: 10px 10px;
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
