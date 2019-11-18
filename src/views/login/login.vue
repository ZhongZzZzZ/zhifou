<template>
    <div class="login_page">
        <div class="login_container">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login_input">
                    <el-form-item label="邮箱" prop="email"  :rules="[
                      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                         ]">
                        <el-input v-model.number="ruleForm.email" prefix-icon="el-icon-message"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" prefix-icon="el-icon-link"></el-input>
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
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    email: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' ,required: true}
                    ],
                    email: ''
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

        }
    }
</script>

<style lang="scss" scoped>
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
        top:250px;
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
            /*position: absolute;*/
        }
        .login_input{
            width: 350px;
            margin-left: -50px;
            /*position: absolute;*/
            /*left: 17%;*/
            /*top:10%;*/
        }
    }


}
</style>
