<template>
    <div class="login-bg">
        <div class="login-pos">
            <img src="~@/assets/bg.png" alt="">
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
            login() {
                this.$router.push('/overview');
            },
            forgetPasseord() {
                this.$router.push('/password');
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
