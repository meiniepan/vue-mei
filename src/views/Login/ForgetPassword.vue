<template>
    <div class="login-bg">
        <div class="login-pos">
            <img src="~@/assets/ld-bg.png" alt="">
            <div class="login-msg">
                <el-form ref="forgetForm" :model="forgetForm" label-width="100px">

                    <el-form-item label="商家账号：">
                        <el-input v-model="forgetForm.merchantAccount"></el-input>
                    </el-form-item>

                    <el-form-item label="验证码：">
                        <el-input v-model="forgetForm.code"></el-input>
                    </el-form-item>

                    <el-button @click="verificationCode">接收短信验证码</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ForgetPassword",
        data () {
            return {
                forgetForm: {
                    merchantAccount: '',
                    code: ''
                }
            }
        },
        methods: {
            verificationCode() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>
