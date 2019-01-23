<template>
    <div class="login-bg">
        <div class="login-pos">
            <img src="~@/assets/ld-bg.png" alt="">
            <div class="login-msg">
                <el-form ref="forgetForm"
                         status-icon
                         :rules="forgetRules"
                         :model="forgetForm" v-if="getStatus === 0">

                    <el-form-item label="" prop="merchantAccount">
                        <el-input v-model="forgetForm.merchantAccount" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <Verify :barSize="{width: '478px',height: '58px'}" @success="verifyData(1)" @error="verifyData(0)" :type="3" :showButton="false"></Verify>

                    <el-button @click="verificationCode('forgetForm')">接收短信验证码</el-button>
                </el-form>

                <el-form ref="newPassword" :rules="newPasswordRules" :model="newPassword" v-else>

                    <el-form-item label="" prop="name">
                        <el-input v-model="newPassword.name" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <el-input v-model="newPassword.code" placeholder="请输入手机验证码"></el-input>
                    </el-form-item>

                    <el-form-item label="" prop="pass">
                        <el-input type="password" v-model="newPassword.pass" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="newPassword.password"  placeholder="请再次输入密码"></el-input>
                    </el-form-item>

                    <el-button @click="confirmModifyPass('newPassword')">接收短信验证码</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import Verify from 'vue2-verify'
    export default {
        name: "ForgetPassword",
        methods: {
            /*获取验证码*/
            verificationCode(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.codeStatus === 1){
                            let data = {
                                merchantName: this.forgetForm.merchantAccount
                            }
                            this.$http.getMerchantDetail(data)
                                .then((res) => {
                                    if(res.code === 200){
                                        this.getStatus = 1;
                                        let data = {
                                            value: res.data.mobile
                                        };
                                        this.$http.getCode(data); //发送验证码
                                        this.$refs[formName].clearValidate();
                                        this.newPassword.name = this.forgetForm.merchantAccount;
                                        this.mobile = res.data.mobile;
                                    }else{
                                        this.$message.error(res.message);
                                    }
                                })
                        }else{
                            this.$message.error('验证失败')
                        }
                    }
                });
            },
            /*提交修改密码*/
            confirmModifyPass(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let codeData = {
                            "mobile": this.forgetForm.mobile,
                            "captcha": this.newPassword.code
                        };
                        this.$http.checkCode(codeData).then((res) => {
                            if(res === 200){
                                let data = {
                                    "name": this.newPassword.name,
                                    "newPassword": this.newPassword.password
                                };
                                this.$http.forgetPassword(data);
                                this.$router.push('/');
                            }
                        });

                    }
                });
            },
            verifyData(data) {
                data !== 0 ? this.codeStatus = 1 : this.$message.error('验证失败');
            }
        },
        components: {Verify},
        data () {
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
                let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(!pattern.test(value)){
                    callback(new Error('请输入6-20位数字和字母组合密码'));
                } else {
                    if (this.newPassword.password !== '') {
                        this.$refs.newPassword.validateField('password');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入填写密码'));
                } else if (value !== this.newPassword.pass) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                forgetForm: {
                    merchantAccount: '',
                    mobile: '',
                },
                forgetRules: {
                    merchantAccount: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    mobile: [{required: true, validator: validateMobile, trigger: 'blur'}],
                },
                newPassword: {
                    name: '',
                    code: '',
                    pass: '',
                    password: ''
                },
                newPasswordRules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    pass: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                },
                mobile: '',
                getStatus: 0,
                codeStatus: 0, //0: 失败 1: 成功
            }
        }
    }
</script>

<style>
    .verify-bar-area .verify-left-bar{
        background: none!important;
    }
    .icon-check:before{
        background-size: cover;
    }
</style>
