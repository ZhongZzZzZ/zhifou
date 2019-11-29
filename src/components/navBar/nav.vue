<template>
    <div class="nav">
        <div class="com">
            <div class="nav_logo"><img src="../../assets/logo2.jpg" class="nav_logo_pic"></div>
            <div class="nav_menu">
                <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
                    <el-menu-item index="/" >首页</el-menu-item>
                    <el-menu-item index="/classification" >兴趣</el-menu-item>
                </el-menu>
            </div>
            <div class="nav_user">
                <el-dropdown v-if="userData == null">
                    <img class="user_avatar" src="../../assets/unlogin.png">
                    <el-dropdown-menu slot="dropdown">
                        <router-link to="/login"> <el-dropdown-item >登录</el-dropdown-item></router-link>
                        <router-link to="/register"><el-dropdown-item>注册</el-dropdown-item></router-link>
                        <router-link to="/userinfo"><el-dropdown-item>个人主页</el-dropdown-item></router-link>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown v-else>
                    <img class="user_avatar" src="../../assets/avatar.jpg">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><router-link to="/userinfo">个人主页</router-link></el-dropdown-item>
                        <el-dropdown-item><a class="user_link" @click="exit">退出</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="nav_message">
                <router-link to="/message"><i class="el-icon-chat-dot-round"></i></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "nav",
        data(){
            return{
                activeIndex: '/',
                userData: null,
                isActived:true
            }
        },
        created(){

        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    .nav {
        position: sticky;
        top: 0;
        z-index: 999;
        overflow: hidden;
        min-width: 1032px;
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #e6e6e6;
    }
    .com{
        margin: 0 auto;
        position: relative;
        width: 1000px;
        align-items: center;
        .nav_logo{
            float: left;
            margin: 5px 0px;
        }
        .nav_logo_pic{
            height: 50px;
        }
        .nav_menu{
            margin: 0px 10px;
            display: inline-block;
            font-size:15px;
            font-weight: 600;
        }
        .nav_message {
            float: right;
            margin: 11px 20px;
            font-size: 35px;
            color: #8DAFFC;
        }
        .nav_user{
            float: right;
            margin: 11px 0px;
        }
        .nav_login{
            float: right;
            margin-right: 15px;
        }
        .nav_register{
            float: right;
            margin-right: 150px;
        }
        .user_avatar{
            width: 35px;
            height: 35px;
            border: 1px solid #99999940;
            border-radius: 50%;
        }
    }
</style>
