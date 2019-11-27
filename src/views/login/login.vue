<template>
    <div class="login_page">
        <div class="login_container">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login_input">
                    <el-form-item label="邮箱" prop="email"  :rules="[
                      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                         ]">
                        <el-input v-model="ruleForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱..."></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="on"  prefix-icon="el-icon-link" show-password placeholder="请输入密码...">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="" prop="verCode">
                        <el-input v-model.trim="ruleForm.verCode" autocomplete="on" class="login_verCode" placeholder="验证码"></el-input>
                        <img class="login_verPic" @click="changeVerPic" :src="imgsrc" alt="验证码">
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="submitForm('ruleForm')" class="login_btn">提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(value.length < 6 ){
                    callback(new Error('密码不能低于6位数'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    email: '',
                    verCode:'',

                },
                imgsrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574228585126&di=246bf36c52977463b101e7ff3856a08d&imgtype=0&src=http%3A%2F%2Fimg11.360buyimg.com%2Fwanxiang%2Fs340x340_jfs%2Ft17110%2F34%2F144592244%2F13762%2Fe86d2dfe%2F5a5f6cffN1a8b9b01.jpg',
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' ,required: true}
                    ],
                    email: '',
                    verCode:[
                        { validator: validatePass1, trigger: 'blur' ,required: true}
                    ]
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        // eslint-disable-next-line no-console
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            changeVerPic(){
                console.log("changeWaiting...")
            }
        }
    }
</script>

<style lang="scss" >
.el-input__clear{
    float: right!important;
 }

.login_page{
    position: relative;
    background-color: #eee;
    width: 100%;
    height:100%;
    .login_container{
        background-color: #fff;
        width: 600px;
        height: 300px;
        position: absolute;
        top:200px;
        left: 50%;
        transform: translate(-50%,0);
        box-shadow: 0 0 10px 10px #f3f3f3;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .login_btn{
            width: 300px;
        }
        .login_input{
            width: 350px;
            margin-left: -50px;
            .login_verCode{
                width: 140px;
            }
            .login_verPic{
                width:110px;
                height:60px;
                cursor: pointer;
            }
            .iconPos{
                float: right;
            }
        }
    }


}
</style>
