<template>
    <div>
        <Nav style="position:sticky;"></Nav>
        <div class="index_container">
            <div class="main1">
                <el-menu default-active="/hotPoint"  class="el-menu-demo" mode="horizontal"  router>
                    <el-menu-item index="/hotPoint" class="index_nav"  >热榜</el-menu-item>
                    <el-menu-item index="/follow" class="index_nav">关注</el-menu-item>
                    <el-menu-item @click="goEditBlog" class="editBlog"><el-button class="el-icon-plus">写博客</el-button></el-menu-item>
                </el-menu>
                <el-divider></el-divider>
                <router-view></router-view>
            </div>
            <div style="display: flex;flex-direction: column;">
                <div class="side_bar" style="height: 80px">
                   <div class="slide_bar_item" ><p class="iconfont iconcaogaoxiang icon_draft" ></p>草稿箱</div>
                   <div class="slide_bar_item"><p class="iconfont iconwenzhang1 icon_draft" ></p>写文章</div>
                </div>
                <div class="side_bar" style="top:175px">
                    <div class="slide_bar_item" @click="goToClass('1001')"><p class="iconfont iconWEBqianduan icon_fontend" ></p><span>前端</span></div>
                    <div class="slide_bar_item" @click="goToClass('1002')"><p class="iconfont iconapphoutaiguanli icon_backend"></p>后端</div>
                    <div class="slide_bar_item" @click="goToClass('1003')"><p class="iconfont iconshouji icon_mobile" ></p>移动端</div>
                    <div class="slide_bar_item" @click="goToClass('1004')"><p class="iconfont iconfuwuqi icon_server" ></p>服务器</div>
                    <div class="slide_bar_item" @click="goToClass('1005')"><p class="iconfont iconhuabanfuben icon_operation" ></p>运营</div>
                    <div class="slide_bar_item" @click="goToClass('1006')"><p class="iconfont iconchanpin icon_product" ></p>产品</div>
                    <div class="slide_bar_item" @click="goToClass('1007')"><p class="iconfont iconceshi icon_test" ></p>测试</div>
                    <div class="slide_bar_item" @click="goToClass('1008')"><p class="iconfont iconicon4 icon_design" ></p>设计</div>
                    <div class="slide_bar_item" @click="goToClass('1009')"><p class="iconfont iconicon-test icon_else" ></p>其他</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Nav from '../../components/navBar/nav'
    export default {
        name: "index",
        data(){
            return{
                activeName: 'first',
                isActived:false
            }
        },
        created(){},
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
            goToClass(val){
                let routeUrl = this.$router.resolve({
                    path:'/classification',
                    query:{id:val}
                })
                console.log(this.$route)
                window.open(routeUrl.href,'_blank')
            }
        },
        components:{
            Nav
        }
    }
</script>

<style lang="scss" scoped>
    .index_container {
        display: flex;
        width: 100%;
        justify-content: center;
        position: relative;
        .main1{
            position: relative;
            width: 750px;
            margin: 15px;
            background-color: #ffffff;
            box-shadow: 0 0px 15px rgba(26,26,26,.1);
            border-radius: 5px;
            .editBlog{
                float: right;
            }
            .index_nav{
                margin-left: 15px;
                font-size:15px;
                font-weight: 600;
            }
        }
        .side_bar{
            min-width: 250px;
            max-width: 250px;
            background-color: #ffffff;
            height: 250px;
            margin-top: 15px;
            box-shadow: 0 0px 15px rgba(26,26,26,.1);
            border-radius: 5px;
            position: sticky;
            top: 76px;
            padding: 15px;
            box-sizing: border-box;
            display: flex;
            flex-wrap:wrap;
            justify-content: space-around;
            .slide_bar_item{
                display: inline-block;
                text-align: center;
                color:#444;
                height: 60px;
                width: 60px;
                font-size: 15px;
                font-weight:400;
                cursor: pointer;
            }
            .icon{
                &_draft{
                    font-size: 20px;
                }
                &_fontend{
                    color: #fd992a;
                    font-size: 20px;
                }
                &_backend{
                    color: #42acfd;
                    font-size: 20px;
                }
                &_mobile{
                    color: rgb(255, 207, 0);
                    font-size: 20px;
                    font-weight: 600;
                }
                &_server{
                    color: rgb(67, 212, 128);
                    font-size: 20px;
                }
                &_operation{
                    color: rgb(131, 121, 212);
                    font-size: 20px;
                }
                &_product{
                    color: rgb(0, 201, 212);
                    font-size: 20px;
                }
                &_test{
                    color: rgb(212, 102, 3);
                    font-size: 20px;
                }
                &_design{
                    color: rgb(212, 85, 185);
                    font-size: 20px;
                }
                &_else{
                    color: rgb(166, 61, 20);
                    font-size: 20px;
                }
            }
        }
    }


</style>
