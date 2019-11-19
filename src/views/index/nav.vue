<template>
    <div class="nav">
        <div class="com">
            <div class="nav_logo"><img src="../../assets/logo.png" class="nav_logo_pic"></div>
            <div class="nav_menu"> 
                <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
                    <el-menu-item index="/" class="nav_index" >首页</el-menu-item>
                    <el-menu-item index="/about" class="nav_index">兴趣</el-menu-item>
                    <!-- <el-menu-item index="/register" class="nav_register" >注册</el-menu-item>
                    <el-menu-item index="/login" class="nav_login" >登录</el-menu-item> -->
                </el-menu>
            </div>
            <div class="nav_user">
                <el-dropdown v-if="userData == null">
                    <img class="user_avatar" src="../../assets/unlogin.png">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><router-link to="/login">登录</router-link></el-dropdown-item>
                        <el-dropdown-item><router-link to="/register">注册</router-link></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown v-else>
                    <img class="user_avatar" src="../../assets/avatar.jpg">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><a class="user_link">个人主页</a></el-dropdown-item>
                        <el-dropdown-item><a class="user_link" @click="exit">退出</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
            }
        },
        created(){

        },
        methods:{
            handleSelect(key, keyPath) {
                // eslint-disable-next-line no-console
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav {
        position: relative;
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
            width: 60px;
            margin: 5px 0px;
        }
        .nav_logo_pic{
            height: 50px;
        }
        .nav_menu{
            margin: 0px 10px;
            display: inline-block;
        }
        .nav_user{
            float: right;
            margin: 9px 0px;
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
            width: 40px;
            height: 40px;
            border: 1px solid #99999940;
            border-radius: 50%;
        }
    }
</style>
