<template>
    <div>
        <div class="article_list" >
            <img :src="item.user_url" alt="" class="article_avatar">
            <div class="article_time_name">
                <span class="article_name">{{item.user_name}}</span>
                <p class="article_time">{{item.create_time}}</p>
            </div>
            <p class="article_title">
                <span @click="goArticle(item.article_id)">{{item.title}}</span>
                <el-tag style="float: right" v-if="item.type_name">{{item.type_name}}</el-tag>
            </p>
            <!--缩略文章-->
            <div class="picture_content" v-show="!showAticle">
                <div class="article_picture" @click="goArticle(item.article_id)" v-show="item.photo_url != null">
                    <span class="iconfont iconbofang video_play" v-if="item.photo_flag == 3"></span>
                    <img :src="item.photo_url" alt="" style="width: 250px" >
                </div>
                <p class="article_content" ><span @click="goArticle(item.article_id)">{{item.simple_content | articleFilter}}</span>
                    <span class="readMore" @click="readMore(item.article_id)">阅读全文 <span class="iconfont iconjiantouyou"></span></span>
                </p>
            </div >
            <!--完整文章-->
            <div v-if="showAticle">
                <div class="full_article" >
                    <p v-html="FullArticle">
                    </p>
                    <span class="readMore" @click="hideFullArticle(index)">收起 <span class="iconfont iconjiantoushang"></span></span>
                </div>
            </div>
            <!--展示评论-->
            <span class="iconfont iconpinglun common" @click="openComment(item.article_id)">{{!showComment ? item.comment_count + '条': '收起'}}评论</span>
            <span class="iconfont iconxingxing common">收藏</span>
            <span class="iconfont  icondianzan" :class="[item.point_flag > 0 ? 'islike_active':'common']" @click="addLikes()">{{item.point_count}}个点赞</span>
            <span class="common page_view" >{{item.page_view}}阅读数</span>
            <div v-if="showComment" class="showComment">
                <comment :article_id="article_id"></comment>
            </div>
            <el-divider></el-divider>
        </div>
    </div>
</template>

<script>
    import api from '../../api/article'
    import comment from "../../components/comment/comment";
    export default {
        name: "articleList",
        props:["item"],
        data(){
            return{
                showAticle:false,
                showComment:false,
                FullArticle:'',
                article_id:''
            }
        },
        methods:{
            readMore(id) {
                api.getFullArticle({article_id:id,token:'123456'}).then(res => this.FullArticle = res.content)
                this.showAticle = !this.showAticle
            },
            goArticle(id){
                let routeUrl = this.$router.resolve({
                    path:'/articleDetail',
                    query:{id:id}
                })
                window.open(routeUrl.href,"_blank")
            },
            openComment(id){
                this.article_id = id
                console.log(this.article_id)
                this.showComment = ! this.showComment
            },
            addLikes(){
                this.item.point_flag = !this.item.point_flag
                console.log('点赞成功')
            },
            hideFullArticle(){
                this.showAticle = !this.showAticle
            }
        },
        computed:{

        },
        filters:{
            articleFilter(content){
                return content + '...'
            }
        },
        components:{
            comment
        }
    }
</script>

<style lang="scss" scoped>
    .article_list{
        width:100%;
    .article_avatar{
        width: 60px;
        height: 60px;
        margin-left: 15px;
    }
    .article_time_name{
        display: inline-block;
        height: 60px;
        position: relative;
        top:18px;
        margin-left: 15px;
    .article_name{
        font-size: 18px;
    }
    .article_time{
        color: #6d6d6d;
        font-size: 12px;
    }
    }
    .article_title{
        font-size: 18px;
        font-weight: 600;
        margin: 15px;
        cursor: pointer;
    span{
    &:hover{
         color:#75a7d6;
         cursor: pointer;
     }
    }
    .el-tag {
        margin-left: 5px;
        font-weight: 400;
    }
    }
    .picture_content{
        display: flex;
        justify-content: center;
        padding: 0 15px;
        .readMore{
            color:#175199;
            font-weight: 600;
        }
    .article_picture{
        width: 190px;
        height: 105px;
        border-radius: 8px;
        margin: 0 15px 15px 0;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        img{
            position: absolute;
            z-index: 0;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            user-select: none
        }
        .video_play{
            font-size: 40px;
            border-radius:50%;
            position:absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            z-index: 1;
        }
    }
    .article_content{
        margin-bottom: 25px;
        font-size: 15px;
        display: inline-block;
        margin-top: 0px;
        width: 600px;
        flex: 1;
        >span:hover{
            color:#175199;
            cursor: pointer;
        }
    }
    }
     .full_article{
         padding: 0px 15px 8px 15px;
         position: relative;
         .readMore{
             color:#8590a6;
             font-size: 16px;
             font-weight:600;
             cursor: pointer;
             position: absolute;
             right: 27px;
             bottom: 0px;
         }
     }
    .common{
        color:#8590a6;
        margin: 0 15px;
        cursor: pointer;
        font-size: 14px;
        user-select: none;
    }
    .islike_active{
        color: #ff6535;
        margin: 0 15px;
        cursor: pointer;
        font-size: 14px;
        user-select: none;
    }
    .page_view{
        float: right;
        margin-right: 25px;
        cursor: auto;
    }
     .showComment{
         padding:15px;
         margin-bottom: 25px ;
     }
    }
</style>
