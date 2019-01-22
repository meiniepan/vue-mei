<template>
    <div class="login-bg">
        <div class="login-pos">
            <img src="~@/assets/ld-bg.png" alt="">
            <div class="login-msg">
                <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="100px">
                    <el-form-item label="用户名：" prop="name">
                        <el-input v-model="loginForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" v-model="loginForm.password"></el-input>
                    </el-form-item>

                    <Verify :barSize="{width: '478px',height: '58px'}" @success="verifyData(1)" @error="verifyData(0)" :type="3" :showButton="false"></Verify>

                    <b @click="forgetPasseord" class="register">忘记密码</b>
                    <el-button @click="login('loginForm')">登录</el-button>
                    <el-button class="forget" @click="register">注册</el-button>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import Verify from 'vue2-verify'
    export default {
        name: "Login",
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if(this.codeStatus === 1){
                                let data = {
                                    "name": this.loginForm.name,
                                    "password": this.loginForm.password
                                };
                                this.$http.login(data).then((res) => {
                                    if(res.code === 200){
                                        this.$message.success(res.message);
                                        this.$store.commit('SET_SHOP_ID', res.data.shopIdList[0].id);
                                        this.$store.commit('SET_NAME', res.data.shopIdList[0].name);
                                        this.$store.commit('SET_MOBILE', res.data.merchantMobile);
                                        this.$router.push('/overview');
                                    }else if(res.code === 203){
                                        this.$router.push({
                                            path: '/createShop',
                                            name: 'CreateShop',
                                            params: {
                                                id: res.data.merchantId
                                            }
                                        });
                                    }else {
                                        this.$message.error(res.message);
                                    }
                                });
                            }else{
                                this.$message.error('验证失败')
                            }
                        }
                });
            },
            forgetPasseord() {
                this.$router.push('/password');
            },
            register() {
                this.$router.push('/register');
            },
            verifyData(data) {
                data !== 0 ? this.codeStatus = 1 : this.$message.error('验证失败');
            }
        },
        components: {Verify},
        data () {
            let validatePass = (rule, value, callback) => {
                let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(!pattern.test(value)){
                    callback(new Error('请输入6-20位字母和数字组合密码'));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    phone: '',
                    name: '',
                    password: '',
                    code: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请填写用户名', trigger: 'blur'},
                    ],
                    password: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                },
                codeStatus: 0, //0: 失败 1: 成功
            }
        },
    }
</script>

<style scoped lang="scss">
    .register{
        text-align: right;
        display: block;
        text-decoration: underline;
        margin-right: 65px;
        margin-bottom: 40px;
        cursor: pointer;
    }
</style>
