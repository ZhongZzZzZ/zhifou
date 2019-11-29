<template>
    <div>
        <Nav style="position:sticky;"></Nav>
        <div class="main">
            <div class="info_edit">
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img :src="imageUrl" class="avatar">
                    <i class="el-icon-camera-solid avatar-uploader-icon"><span>修改头像</span></i>
                </el-upload>
                <el-form  class="userinfo-form" ref="form" :model="form" label-width="50px">
                    <el-form-item label="昵称">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>    
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="edit_btn" icon="el-icon-edit" @click="jump" plain>修改密码</el-button>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                        <el-button @click="back">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
    
<script>
    import imgsrc from '../../assets/avatar.jpg'
    import Nav from '../../components/navBar/nav'
    export default {
        name: "editinfo",
        data(){
            return {
                 form: {
                    id: 'S0000',
                    username: 'LinhZ',
                    phone: '158',
                    email: 'qq.com',
                    sex: '女',
                },
                imageUrl: imgsrc,
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = file.url;
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                this.imageUrl = file.url;
              
                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            jump() {
                this.$router.push('/editpsw');
            },
            back() {
                this.$router.back();
            }
        },
        created(){

        },
        components: {
            Nav
        }
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
    .avatar-uploader{
        margin-bottom: 10px;
        .el-upload {
            border: 2px solid #fff;
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
        font-size: 30px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        position: absolute;
        z-index: 999999;
        top: 0px;
        left: 0px;
        background-color: #1a1a1a;
        opacity: .4;
        span {
            position: absolute;
            font-size: 15px;
            top: 26px;
            left: 60px;
        }
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
