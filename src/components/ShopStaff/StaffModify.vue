<template>
    <div class="inner">
        <el-form :model="staffForm" :rules="rules" ref="staffForm" label-width="150px" class="data-form">

            <el-form-item label="管理员账号：" prop="account">
                <el-input v-model="staffForm.account"></el-input>
            </el-form-item>

            <el-form-item label="管理员昵称：" prop="name">
                <el-input v-model="staffForm.name"></el-input>
            </el-form-item>

            <el-form-item label="设置密码：" prop="pass">
                <el-input type="password" v-model="staffForm.pass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="再次确认密码：" prop="checkPass">
                <el-input type="password" v-model="staffForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="权限（多选）：" prop="type">
                <el-checkbox-group  v-model="staffForm.type">
                    <el-checkbox v-for="type in checkbox" :label="type.id" name="type" :key="type.id">{{type.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-table
                    class="staff-type"
                    :data="staffType"
                    border
                    style="width: 750px">
                <el-table-column
                        prop="type"
                        label="管理员类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="authority"
                        label="权限">
                </el-table-column>
            </el-table>

            <el-form-item  class="preserve-btn">
                <el-button type="primary" @click="keepAdmin('staffForm')">保存</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "StaffModify",
        created() {
            this.$http.getAdminAuthority().then((res) => {
                this.checkbox = res;
            })
        },
        methods: {
            keepAdmin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let adminData = {
                            "name": this.staffForm.name,
                            "shopId": this.$store.state.shopId,
                            "mobile": this.staffForm.account,
                            "password": this.staffForm.checkPass,
                            "permissionList": this.staffForm.type
                        };
                        this.$http.addShopAdmin(adminData);
                        this.$emit('staffBack', 0);
                    }
                })
            }
        },
        data () {
            let validateAccount  = (rule, value, callback) => {
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
                    callback(new Error('请设置密码'));
                }else if(!pattern.test(value)){
                    callback(new Error('请设置6-20位字母和数字组合密码'));
                } else {
                    if (this.staffForm.checkPass !== '') {
                        this.$refs.staffForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.staffForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                staffForm: {
                    account: '',
                    name: '',
                    pass: '',
                    checkPass: '',
                    type: []
                },
                rules: {
                    account: [
                        { required: true, validator: validateAccount, trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请填写管理员昵称', trigger: 'blur' },
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur', required: true }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur', required: true }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
                    ],
                },
                checkbox: [],
                staffType: [
                    {
                        type: '商品管理',
                        authority: '商品编辑、上下架、分类（组）、库存增减、运费设置，价格修改等'
                    },{
                        type: '店铺管理',
                        authority: '店铺资料完善、认证、管理员增加或删除及管理员权限设置等'
                    },{
                        type: '资产管理',
                        authority: '订单结算、收入状况等查看等'
                    },{
                        type: '用户管理',
                        authority: '用户信息查看等'
                    },{
                        type: '订单管理',
                        authority: '查看订单、处理订单状态等'
                    },{
                        type: '技工管理',
                        authority: '技工人员管理、修改等权限'
                    }
                ]
            }
        },
    }
</script>

<style scoped lang="scss">
    .el-checkbox-group{
        text-align: left;
    }
    .staff-type{
        width: 600px;
    }
    .preserve-btn{
        margin-top: 50px;
        width: 600px;
    }
</style>