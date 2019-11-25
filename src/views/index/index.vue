<template>
    <div class="main1">
        <el-menu default-active="/hotPoint"  class="el-menu-demo" mode="horizontal"  router>
            <el-menu-item index="/hotPoint" class="index_nav"  >热榜</el-menu-item>
            <el-menu-item index="/follow" class="index_nav">关注</el-menu-item>
            <el-menu-item @click="goEditBlog" class="editBlog"><el-button class="el-icon-plus">写博客</el-button></el-menu-item>
        </el-menu>
        <el-divider></el-divider>
<!--        <router-link to="/hotPoint" class="index_nav">热榜</router-link>-->
<!--        <router-link to="/follow" class="index_nav">关注</router-link>-->
<!--        <el-button class="el-icon-plus editBlog" @click="goEditBlog" >写博客</el-button>-->
<!--        <el-divider></el-divider>-->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                activeName: 'first',
                isActived:false
            }
        },
        created(){

        },
        methods: {
            goEditBlog(){
                let routeUrl = this.$router.resolve({
                    path:'/editBlog',
                    query:{id:1}
                })
                window.open(routeUrl.href,'_blank')
            },

            goToHotPoint(){
                console.log('goToHotPoint')
            },
        }

    }
</script>

<style lang="scss" scoped>
    .main1{
        position: relative;
        width: 850px;
        margin: 10px auto;
        background-color: #ffffff;
        box-shadow: 0 0px 15px rgba(26,26,26,.1);
        border-radius: 5px;
        .editBlog{
            float: right;
        }
        .index_nav{
           margin-left: 15px;
        }
    }

</style>
