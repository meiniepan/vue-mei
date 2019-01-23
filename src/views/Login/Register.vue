<template>
    <div class="login-bg">
        <div class="login-pos">
            <img src="~@/assets/ld-bg.png" alt="">
            <div class="login-msg">
                <el-form ref="registerForm" status-icon :model="registerForm" :rules="rules" label-width="100px">

                    <el-form-item label="用户名：" prop="name">
                        <el-input v-model="registerForm.name" placeholder="请填写用户名"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号码：" prop="mobile">
                        <el-input v-model="registerForm.mobile"  placeholder="请填写手机号" @change="modifyMobile('registerForm')"></el-input>
                    </el-form-item>

                    <el-form-item label="验证码：" class="get-code">
                        <el-col :span="18">
                            <el-input v-model="registerForm.code" placeholder="请填写手机短信验证码"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button @click="getIdentifyCode('registerForm')">获取验证码</el-button>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="设置密码：" prop="pass">
                        <el-input type="password" v-model="registerForm.pass" placeholder="请填写6～20位数字和字母组合密码"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码：" prop="password">
                        <el-input type="password" v-model="registerForm.password" placeholder="请再次填写新密码"></el-input>
                    </el-form-item>

                    <el-button type="primary" @click="register('registerForm')">确定注册</el-button>
                    <el-button @click="login" class="forget">登录>></el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        methods: {
            modifyMobile(formName) {
                this.registerForm.code = '';
                this.$refs[formName].clearValidate('code')
            },
            /*获取验证码*/
            getIdentifyCode(formName) {
                this.$refs[formName].validateField('mobile', (valid) => {
                    if (!valid) {
                        let data = {
                            value: this.registerForm.mobile
                        };
                        this.$http.getCode(data);
                    }
                });
            },
            /*提交注册*/
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let codeData = {
                            "mobile": this.registerForm.mobile,
                            "captcha": this.registerForm.code
                        };
                        this.$http.checkCode(codeData).then((res) => {
                            if(res === 200){
                                let data = {
                                    "name": this.registerForm.name,
                                    "mobile": this.registerForm.mobile,
                                    "password": this.registerForm.password
                                };
                                this.$http.merchantCreate(data).then((res) => {
                                    if(res.code !== 200){
                                        this.$message.error(res.message);
                                    }else{
                                        this.$message.success(res.message);
                                        this.$router.push('/');
                                    }
                                });
                            }
                        });
                    }
                });
            },
            login() {
                this.$router.push('/');
            }
        },
        data() {
            let validateMobile = (rule, value, callback) => {
                let pattern = /^1[345678]\d{9}$/;
                if (value === '') {
                    callback(new Error('请填写手机号'));
                } else if(!pattern.test(value)){
                    callback(new Error('请填写正确的手机号'));
                }else{
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                let pattern = /^[a-zA-Z0-9]{6,20}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(!pattern.test(value)){
                    callback(new Error('请输入6-20位字母和数字组合密码'));
                } else {
                    if (this.registerForm.password !== '') {
                        this.$refs.registerForm.validateField('password');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次填写密码'));
                } else if (value !== this.registerForm.pass) {
                    callback(new Error('两次填写密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    name: '',
                    mobile: '',
                    code: '',
                    pass: '',
                    password: ''
                },
                rules: {
                    name: [{required: true, message: '请填写用户名', trigger: 'blur'}],
                    mobile: [{required: true, validator: validateMobile, trigger: 'blur'}],
                    pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
                    password: [{ required: true, validator: validatePass2, trigger: 'blur' }],
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .get-code{
        .el-form-item__content{
            display: flex;
        }
    }
</style>