<template>
    <div class="register_page">
        <div class="register_container">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm register_input">
                <el-form-item label="邮箱" prop="email"  :rules="[
                  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                    <el-input v-model="ruleForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" prefix-icon="el-icon-link" show-password placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="el-icon-link" show-password placeholder="再次输入密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="verCode">
                    <el-input v-model.trim="verCode" autocomplete="on" class="register_verCode" placeholder="验证码"></el-input>
                    <el-button class="register_btn" type="primary" @click.native="sendCode" :disabled="sendflag">{{computedTime>0 ? `已发送${computedTime}s` : '发送验证码'}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
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
                }else if (value.length < 6){
                    callback(new Error('密码不能低于6位数'))
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    email: '',
                },
                verCode:'',
                sendflag:false,
                computedTime:0,
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' ,required: true}
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' ,required: true}
                    ],
                    email: '',
                    verCode:[{
                        validator: validatePass3, trigger: 'blur' ,required: true
                    }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            sendCode(){
                this.sendflag = true
                this.computedTime = 30
                console.log('sendEmail')
                var timer = setInterval(() => {
                    this.sendflag = false
                    clearInterval(timer)
                },30000)
                var computedTimer = setInterval(()=>{
                    if(this.computedTime > 0 ){
                        this.computedTime --
                    }else{
                        clearInterval(computedTimer)
                        console.log(this.computedTime)
                    }
                },1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register_page{
        position: relative;
        background-color: #eee;
        width: 100%;
        height:100%;
        .register_container{
            background-color: #fff;
            width: 600px;
            height: 400px;
            position: absolute;
            top:250px;
            left: 50%;
            transform: translate(-50%,0);
            box-shadow: 0 0 10px 10px #f3f3f3;
            border-radius: 8px;
        }
        .register_input{
            width: 350px;
            position: absolute;
            left: 17%;
            top:10%;
            .register_verCode{
                width: 120px;
            }
            .register_btn{
               margin-left: 15px;
            }
        }
    }
</style>
