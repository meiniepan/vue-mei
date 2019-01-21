<template>
    <div class="login-bg">
        <div class="login-pos">
            <img src="~@/assets/ld-bg.png" alt="">
            <div class="login-msg">
                <el-form ref="loginForm" :model="loginForm" label-width="100px">
                    <el-form-item label="手机号：">
                        <el-input v-model="loginForm.phone"></el-input>
                    </el-form-item>

                    <el-form-item label="密码：">
                        <el-input type="password" v-model="loginForm.password"></el-input>
                    </el-form-item>

                    <el-form-item label="验证码：">
                        <el-input v-model="loginForm.code"></el-input>
                    </el-form-item>

                    <el-button @click="login">登陆</el-button>
                    <el-button class="forget" @click="forgetPasseord">忘记密码？</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                loginForm: {
                    phone: '',
                    password: '',
                    code: ''
                }
            }
        },
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
                                        this.$router.push('/overview');
                                    }else if(res.code === 203){
                                        this.$router.push({
                                            path: '/createShop',
                                            name: 'CreateShop',
                                            params: {
                                                id: res.data.merchantId
                                            }
                                        });
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
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
