<template>
    <div style="z-index: 99;position: sticky;top: 0">
          <div class="nav">
             <div class="com">
                    <div class="nav_logo" @click="$router.push('/')"><img src="../../assets/logo.jpg" class="nav_logo_pic"></div>
                    <div class="nav_menu">
                        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
                            <el-menu-item index="/" >首页</el-menu-item>
                            <el-menu-item index="/classification" >兴趣</el-menu-item>
                            <el-input class="search"
                                      v-model="state"
                                      prefix-icon="el-icon-search"
                                      placeholder="请输入内容"
                                      @select="handleSelect"
                                      @focus="focus"
                                      @blur="blur"
                                      @keyup.enter.native="search"></el-input>
                            <el-button type="primary" class="searchBtn" @click="search">搜索</el-button>
                            <div class="nav_user">
                                <el-dropdown>
                                    <img class="user_avatar" :src="user_url">
                                    <el-dropdown-menu slot="dropdown">
                                        <router-link to="/userinfo"><el-dropdown-item>个人主页</el-dropdown-item></router-link>
                                        <router-link to="/login" @click.native="clearStorage"><el-dropdown-item>退出</el-dropdown-item></router-link>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div class="nav_message">
                                <router-link to="/message"><i class="el-icon-chat-dot-round"></i></router-link>
                            </div>
                        </el-menu>
                        <transition name="fade">
                            <div class="searchContainer" v-show="isSearch">
                                <p class="popular">热词搜索</p>
                                <p class="popular_item" v-for="(item,index) in popularWord" :key="index" @click="goSearch(item.keyword)">{{item.keyword}} <span class="iconfont iconhuo" style="color:#ff3204 "></span></p>
                                <p class="popular">搜索记录 <span class="el-icon-delete-solid deleteHis" @click="deleteAllHis">清空</span></p>
                                <p class="popular_item" v-for="(item,index) in historyWord" :key="index" @click="goSearch(item.word)">{{item.word}} <span class="el-icon-close deleteOneHis" @click.stop="deleteOneHis(index,item.word)"></span></p>
                            </div>
                        </transition>
                    </div>

                </div>
        </div>

    </div>
</template>

<script>
    import {getLocalStorage} from "../../utils/auth";
    import api from '../../api/article'
    import search from "../../api/search";
    export default {
        name: "nav",
        data(){
            return{
                activeIndex: '/',
                // userData: null,
                isActived:true,
                user_url: getLocalStorage('user_url'),
                state: '',
                popular:[],
                isSearch:false,
                popularWord: [],
                historyWord:[]
            }
        },
        created(){

        },
        methods:{
            clearStorage(){
                localStorage.clear()
            },
            handleSelect(item) {
                console.log(item);
            },

            focus(){
                api.popularSearch({token:getLocalStorage('token')}).then(res => {
                    this.isSearch = true
                    console.log(res)
                    this.popularWord = res.search
                    this.historyWord = res.history
                })
            },
            blur(){
                this.isSearch = false
            },
            search(){
              var route = this.$router.resolve({
                  path:'/searchResult',
                  query:{
                      q:this.state
                  }
              })
                window.open(route.href,'_blank')
            },
            goSearch(word){
                var route = this.$router.resolve({
                    path:'/searchResult',
                    query:{
                        q:word
                    }
                })
                window.open(route.href,'_blank')
            },
            deleteAllHis(){
                console.log('deleteAll')
                search.deleteAllHis({token:getLocalStorage('token')}).then(res =>{
                    console.log(res)
                    this.historyWord = []
                }).catch(err =>{
                    this.$message.error('服务器错误')
                })
            },
            deleteOneHis(index,word){
                search.deleteOneHis({
                    token:getLocalStorage('token'),
                    word:word
                }).then(res =>{
                    console.log(res)
                    this.historyWord.splice(index,1)
                }).catch(err =>{
                    this.$message.error('服务器错误')
                })

            }
        }
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .searchContainer{
        width: 296px;
        min-height: 200px;
        background-color: #fff;
        z-index: 99999;
        position: absolute;
        left:24.9%;
        border-radius: 5px;
        box-shadow: 0 0 5px #bcbcbc;
        .popular{
            border-bottom: 1px solid #cbd7ec;
            height: 40px;
            line-height: 40px;
            color: #8590a6;
            font-weight: normal;
            padding: 0 15px ;
            position: relative;
            .deleteHis{
               float: right;
               margin-top: 15px;
               cursor: pointer;
            }
        }
        .popular_item{
            color:#1a1a1a;
            font-size: 15px;
            font-weight: normal;
            height: 35px;
            line-height: 35px;
            cursor: pointer;
            padding: 0 15px ;
            &:hover{
                background-color: #eee;
            }
            .deleteOneHis{
                display: inline-block;
                float: right;
                margin-top: 10px;
                cursor: pointer;
            }
        }
    }
    .nav {
        position: sticky;
        top: 0;
        box-sizing: border-box;
        z-index: 999;
        min-width: 1032px;
        height: 63px;
        background-color: #fff;
        border-bottom: 1px solid #e6e6e6;
        .searchBtn{
            margin:0px 10px;
            position: relative;
            top:12px;
        }
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
            height: 60px;
            font-weight: 600;
            .search{
                margin: 0px 0 0 10px;
                width: 300px;
                position: relative;
                left: 0px;
                top:12px;
            }
        }
        .nav_message {
            float: right;
            margin: 11px 10px 11px 249px;
            font-size: 35px;
            color: #8DAFFC;
        }
        .nav_user{
            float: right;
            margin: 11px 10px;
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
