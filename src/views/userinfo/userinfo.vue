<template>
    <div class="main">
        <div class="info_show"  v-if="!editshow">
            <div class="pic_box"><img class="pic" src="../../assets/avatar.jpg"></div>
            <div class="info">
                <div class="info_title">
                    <span>LinhZ</span>
                    <i v-if="sex == 1" class="icon-sex el-icon-female"></i>
                    <i v-else class="icon-sex el-icon-male"></i>
                </div>
                <div class="info_detail">
                    <div>工号：<span>S0000</span></div>
                    <div>电话：<span>158</span></div>
                    <div>邮箱：<span>qq.com</span></div>
                    <el-button class="edit_btn" icon="el-icon-edit" @click="editshow=true" plain>编辑个人信息</el-button>
                </div>
            </div>
        </div>
       
        <div class="info_edit" v-else>
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form  class="userinfo-form" ref="form" :model="form" label-width="50px">
                <el-form-item label="昵称">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                    </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                    <el-button @click="editshow=false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="article_list"> 
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="已发帖子" name="first">
                    内容
                </el-tab-pane>
                <el-tab-pane label="关注帖子" name="second">
                    内容
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userinfo",
        data(){
            return {
                 sex: 1,
                 editshow: false,
                 form: {
                    id: 'S0000',
                    username: 'LinhZ',
                    phone: '158',
                    email: 'qq.com',
                    sex: '女',
                    picture: {
                        id: 1,
                        resourcePath: '../../assets/avatar.jpg'
                    },
                },
                imageUrl: '',
                activeName: 'first',
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                var resourcePath = '/picture/' + file.name;
                this.form.picture.id = -1;
                this.form.picture.resourcePath = resourcePath;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
                color: #8DAFFC;
                border-color: #8DAFFC;
            }
            .edit_btn:hover {
                background-color: #f4f7ff;
            }
        }
    }
    .avatar-uploader{
        margin-bottom: 10px;
        .el-upload {
            border: 1px dashed #8c939d;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #8DAFFC;
        }
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .article_list {
        margin-top: 30px;
    }
</style>
