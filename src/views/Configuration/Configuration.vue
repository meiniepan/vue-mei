<template>
    <el-form :model="configForm" status-icon :rules="rules" ref="configForm" label-width="100px" class="">
        <el-form-item label="商家账号：" prop="merchantAccount">
            <el-input type="merchantAccount" v-model="configForm.merchantAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
            <el-input type="code" v-model="configForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="msgCode">
            <el-input v-model.number="configForm.msgCode"></el-input>
        </el-form-item>
        <el-form-item label="设置新登录密码" prop="password">
            <el-input v-model="configForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确定新登录密码" prop="ensurePassword">
            <el-input v-model="configForm.ensurePassword"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('configForm')">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            var validateAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('商家账号不能为空'));
                }
                const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                if(!reg.test(value)){
                    return callback(new Error('请填写正确格式的手机号码'))
                }else {
                    callback();
                }
            };
            var validateCheckCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                callback();
            };
            var msgCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('短信验证码不能为空'));
                }
                callback();
            };
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
                callback();
            };
            var checkEnsurePassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请再次输入密码'));
                } else if (value !== this.configForm.password) {
                    return callback(new Error('两次输入密码不一致!'));
                }

                callback();
            };
            return {
                configForm: {
                    merchantAccount: '',
                    code: '',
                    msgCode: '',
                    password: '',
                    ensurePassword: ''
                },
                rules: {
                    merchantAccount: [
                        { validator: validateAccount, trigger: 'blur', required :true}
                    ],
                    checkPass: [
                        { validator: validateCheckCode, trigger: 'blur' }
                    ],
                    code: [
                        { validator: msgCode, trigger: 'blur', required :true}
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur', required :true}
                    ],
                    ensurePassword: [
                        { validator: checkEnsurePassword, trigger: 'blur', required :true}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            }

        }
    }
</script>

<style scoped>

</style>
