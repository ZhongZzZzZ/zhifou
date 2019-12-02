<template>
    <div>
        <div class="article_list" >
            <img :src="item.user_url" alt="" class="article_avatar">
            <div class="article_time_name">
                <span class="article_name">{{item.user_name}}</span>
                <p class="article_time">{{item.create_time}}</p>
            </div>
            <p class="article_title">
                <span @click="goArticle">{{item.title}}</span>
            </p>
            <!--缩略文章-->
            <div class="picture_content" v-show="!showAticle">
                <div class="article_picture" v-show="item.photo_url != null">
                    <img :src="item.photo_url" alt="" style="width: 250px" >
                </div>
                <p class="article_content" ><span @click="goArticle">{{item.simple_content}}</span>
                    <span class="readMore" @click="readMore(index)">阅读全文></span>
                </p>
            </div >
            <!--完整文章-->
            <div v-show="showAticle">
                <img :src="item.picture" alt="">
                <p class="article_content">{{item.content}}
                <span class="readMore" @click="readMore(index)">收起Λ</span>
                </p>
            </div>
            <!--展示评论-->
            <div v-for="comment in item.comment" v-show="showComment">
                 <p>{{comment}}</p>
            </div>
            <span class="iconfont iconpinglun common" @click="openComment">{{item.comment_count}}条评论</span>
            <span class="iconfont iconxingxing common">收藏</span>
            <span class="iconfont  icondianzan" :class="[item.point_flag > 0 ? 'islike_active':'common']" @click="addLikes">{{item.point_count}}个点赞</span>
            <span class="common page_view" >{{item.page_view}}阅读数</span>
            <el-divider></el-divider>
        </div>
    </div>
</template>

<script>
    export default {
        name: "articleList",
        props:["item"],
        data(){
            return{
                showAticle:false,
                showComment:false
            }
        },
        methods:{
            readMore(index) {
                this.showAticle = !this.showAticle
            },
            goArticle(){
                let routeUrl = this.$router.resolve({
                    path:'/articleDetail',
                    query:{id:123456}
                })
                window.open(routeUrl.href,"_blank")
            },
            openComment(){
                this.showComment = ! this.showComment
            },
            addLikes(index){
                this.item.isLike = !this.item.isLike
                console.log('点赞成功')
            }
        },
        computed:{

        },
        filters:{
            // articleFilter(content){
            //     if(content.length >=500){
            //         return content.substring(0,100) + '...'
            //     }else if(content.length<500 && content.length >=100){
            //         let length = content.length * 0.3
            //         return content.substring(0,length) + '...'
            //     }else{
            //         let length = content.length * 0.6
            //         return content.substring(0,length) + '...'
            //     }
            // }
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
    }
    .article_content{
        margin-bottom: 25px;
        font-size: 15px;
        display: inline-block;
        margin-top: 10px;
        width: 600px;
        flex: 1;
        >span:hover{
            color:#175199;
            cursor: pointer;
        }
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
        color: #ffa81c;
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
    }
</style>
