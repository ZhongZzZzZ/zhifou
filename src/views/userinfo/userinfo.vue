<template>
    <div class="main">
        <div class="info_show">
            <div class="pic_box"><img class="pic" src="../../assets/avatar.jpg"></div>
            <div class="info">
                <div class="info_title">
                    <span>LinhZ</span>
                    <i v-if="sex == 1" class="icon-sex el-icon-female"></i>
                    <i v-else class="icon-sex el-icon-male"></i>
                    <el-badge value="hot" class="item">
                        <el-tag>1000</el-tag>
                    </el-badge>
                </div>
                <div class="info_detail">
                    <div>工号：S0000</div>
                    <div>电话：158</div>
                    <div>邮箱：qq.com</div>
                    <el-button class="edit_btn" icon="el-icon-edit" @click="goEditInfo" plain>编辑个人信息</el-button>
                </div>
            </div>
        </div>
        <div class="article_list">
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="已发帖子" name="myarticle">
                    <myarticle></myarticle>
                </el-tab-pane>
                <el-tab-pane label="收藏帖子" name="followarticle">
                    <followarticle></followarticle>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import myarticle from '@/components/userinfo/myArticle'
    import followarticle from '@/components/userinfo/followArticle'
    export default {
        name: "userinfo",
        data(){
            return {
                sex: 1,
                activeName: 'myarticle',
            }
        },
        components: {
            'myarticle' : myarticle,
            'followarticle' : followarticle
        },
        methods: {
            goEditInfo() {
                this.$router.push('/editinfo')
            },
        },
        created(){

        },

    }
</script>

<style lang="scss">
    .main{
        width: 940px;
        height: 1000px;
        margin: 10px auto;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 50px 30px;
    }
    .pic_box {
        width: 200px;
        height: 200px;
        border: 1px solid #e6e6e6;
        border-radius: 5%;
        float: left;
    }
    .pic {
        width: 200px;
        height: 200px;
        border-radius: 5%;
    }
    .info {
        margin-left: 240px;
        padding-top: 84px;
        .info_title {
            font-size: 26px;
            font-weight: 600;
            .icon-sex {
                margin: 0px 5px 0px 10px;
            }
            .el-tag {
                background-color: #f4f7ff;
                padding: 0 5px;
                height: 20px;
                line-height: 20px;
                font-size: 6px;
                color: #8DAFFC;
                border: 1px solid #8DAFFC;
            }
            .el-badge__content {
                background-color: #8DAFFC;
                font-size: 6px;
                height: 12px;
                line-height: 12px;
                padding: 0 5px;
                top: 7px;
            }
        }
        .info_detail {
            position: relative;
            font-size: 14px;
            color: #909399;
            div {
                margin-top:10px;
            }
            .edit_btn {
                position: absolute;
                right: 0px;
                bottom: 0px;
            }
        }
    }
    .article_list {
        margin-top: 30px;
    }
</style>
