<template>
    <div class="com">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
            <el-menu-item class="nav_logo"><img src="../../assets/logo.png" class="nav_logo"></el-menu-item>
            <el-menu-item index="/" class="nav_index" >主页</el-menu-item>
            <el-menu-item index="/register" class="nav_register" >注册</el-menu-item>
            <el-menu-item index="/login" class="nav_login" >登录</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                activeIndex: '1',
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
    .com{
        position: relative;
        overflow: hidden;
        min-width: 860px;
        .nav_logo{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            height: 50px;
            left: 150px;
        }
        .nav_index {
            left: 450px;
        }
        .nav_login{
            float: right;
            margin-right: 15px;
        }
        .nav_register{
            float: right;
            margin-right: 150px;
        }
    }

</style>
