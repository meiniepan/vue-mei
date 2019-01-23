<template>
    <el-form :model="configForm" status-icon :rules="rules" ref="configForm" label-width="100px" class="">
        <el-form-item label="商家账号：" prop="merchantAccount">
            <el-input type="text" v-model="configForm.merchantAccount" autocomplete="off" placeholder="请输入商家账号"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="msgCode">
            <el-input v-model.number="configForm.msgCode" placeholder="请输入手机短信验证码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="fetchMsgCode()">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="输入旧密码" prop="oriPassword">
            <el-input v-model="configForm.oriPassword" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="设定新登录密码" prop="password">
            <el-input v-model="configForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确定新登录密码" prop="ensurePassword" >
            <el-input v-model="configForm.ensurePassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('configForm')">确认修改</el-button>
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
                callback();
            };
            var checkMsgCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('短信验证码不能为空'));
                }
                callback();
            };
            var checkOriPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('旧密码不能为空'));
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
                    msgCode: '',
                    password: '',
                    ensurePassword: ''
                },
                rules: {
                    merchantAccount: [
                        { validator: validateAccount, trigger: 'blur', required :true}
                    ],
                    msgCode: [
                        { validator: checkMsgCode, trigger: 'blur', required :true}
                    ],
                    oriPassword:[
                        { validator: checkOriPassword, trigger: 'blur', required :true}
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
            /*获取验证码*/
            fetchMsgCode() {
                let data = {
                    value: this.$store.state.mobile
                    // value: '17600672340'
                }
                this.$http.getCode(data); //发送验证码
            },

            submitForm(configForm) {
                this.$refs[configForm].validate((valid) => {
                    if (valid) {
                        let codeData = {
                            "mobile": this.$store.state.mobile,
                            // "mobile": '17600672340',
                            "captcha": this.configForm.msgCode
                        };
                        this.$http.checkCode(codeData).then((res) => {
                            if (res === 200) {
                                let params = {
                                    "name": this.configForm.merchantAccount,
                                    "oriPassword": this.configForm.oriPassword,
                                    "newPassword": this.configForm.password
                                };
                                this.$http.configuration(params).then((res) => {
                                    if (res === 200) {
                                        this.$message.success('设置信息提交成功');
                                    } else {
                                        this.$message.error('设置信息提交失败');
                                    }
                                });
                            }else {
                                this.$message.error(res);
                            }
                        });
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
