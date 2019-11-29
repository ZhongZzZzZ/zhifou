<template>
    <div>
        <div class="article_box" v-for="item in articles" :key="item">
            <div class="article_title">
                {{ item.title }}
                <span class="article_time">{{ item.create_time }}</span>
                <el-button class="del_btn" icon="el-icon-minus" @click="del(item.id)" plain></el-button>
            </div>
            <img class="article_img" :src="item.img_url" v-if="item.img_url">
            <div class="article_content">
                <span>{{ item.content }}</span>
            </div>
            <div class="article_footer">
                <i class="el-icon-chat-line-square article_icon">{{ item.comment_num }}条评论</i>
                <i class="el-icon-view article_icon">浏览量{{ item.article_views }}</i>
                <i class="el-icon-thumb article_icon">点赞{{ item.article_views }}</i>
                <el-button type="primary" icon="el-icon-zoom-in" @click="detail(item.id)">查看全文</el-button>
            </div>
        </div> 
    </div>  
</template>

<script>
    export default {
        name: "myarticle",
        data(){
            return {
                articles: [
                    { id: 1, 
                    title: 'Vue.js新手入门指南', 
                    content:'最近在逛各大网站，论坛，以及像SegmentFault等编程问答社区，发现Vue.js异常火爆，重复性的提问和内容也很多，楼主自己也趁着这个大前端的热潮，着手学习了一段时间的Vue.js，目前用它正在做自己的结业项目。',
                    create_time: '2019年11月21日 15:31:32',
                    img_url: 'https://pic1.zhimg.com/50/v2-3b25801a03a296c8c663e82eee8f9544_hd.jpg',
                    comment_num: 1000,
                    article_views: 1000000},
                    { id: 2, title: 'Vue.js新手入门指南', 
                    content:'最近在逛各大网站，论坛，以及像SegmentFault等编程问答社区，发现Vue.js异常火爆，重复性的提问和内容也很多，楼主自己也趁着这个大前端的热潮，着手学习了一段时间的Vue.js，目前用它正在做自己的结业项目。',
                    create_time: '2019年11月21日 15:31:32',
                    comment_num: 1000,
                    article_views: 1000000},
                    { id: 3, title: 'Vue.js新手入门指南', 
                    content:'最近在逛各大网站，论坛，以及像SegmentFault等编程问答社区，发现Vue.js异常火爆，重复性的提问和内容也很多，楼主自己也趁着这个大前端的热潮，着手学习了一段时间的Vue.js，目前用它正在做自己的结业项目。' + 
                    '在做的过程中也对Vue.js的官方文档以及其各种特性有了许多认识。作为一个之前以PHP+模版引擎为主的开发，从一个从未接触过除HTML+CSS+JavaScript+JQuery以外的前端技术的人到现在可以独立使用Vue.js以及各种附属的UI库来开发项目，我总结了一些知识和经验想与大家分享。',
                    create_time: '2019年11月21日 15:31:32',
                    img_url: 'https://pic1.zhimg.com/50/v2-3b25801a03a296c8c663e82eee8f9544_hd.jpg',
                    comment_num: 1000,
                    article_views: 1000000}
                ]
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
    .article_box {
        height: 185px;
        padding: 20px 20px;
        position: relative;
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
        }
        .del_btn {
            float: right;
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
