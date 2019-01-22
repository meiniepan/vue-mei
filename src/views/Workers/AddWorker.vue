<template>
    <el-form ref="mechanicForm" :rules="rules" :model="mechanicForm" label-width="120px" class="data-form">
        <el-form-item label="技工姓名" prop="name">
            <el-input v-model="mechanicForm.name" placeholder="请填写技工姓名"></el-input>
        </el-form-item>
        <el-form-item label="技工手机号" prop="mobile">
            <el-input v-model="mechanicForm.mobile" placeholder="请填写技工手机号"></el-input>
        </el-form-item>
        <el-form-item label="技工状态" prop="status">
            <el-select v-model="mechanicForm.status" placeholder="请选择技工状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="技工标签" prop="tag">
            <el-input v-model="mechanicForm.tag" placeholder="请填写标签，6个字以内"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addMechanic('mechanicForm')">保存</el-button>
            <el-button @click="cancelMechanic">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            let validateMobile = (rule, value, callback) => {
                let pattern = /^1[345678]\d{9}$/;
                if (value === '') {
                    callback(new Error('请填写技工手机号'));
                } else if(!pattern.test(value)){
                    callback(new Error('请填写正确的手机号'));
                }else{
                    callback();
                }
            };
            let validateTag = (rule, value, callback) => {
                let pattern = /^[\u4e00-\u9fa5A-Za-z0-9]{1,6}$/;
                if (value === '') {
                    callback(new Error('请填写标签，6个字以内'));
                } else if(!pattern.test(value)){
                    callback(new Error('请填写正确的标签'));
                }else{
                    callback();
                }
            };

            return {
                mechanicForm: {
                    name: '',
                    mobile: '',
                    status: '',
                    tag: '',
                },
                rules: {
                    name: [{ required: true, message: '请填写技工姓名', trigger: 'blur' }],
                    mobile: [{validator: validateMobile, trigger: 'blur'}],
                    status: [{ required: true, message: '请选择技工状态', trigger: 'change' }],
                    tag: [{ required: true, validator: validateTag, trigger: 'blur' }]
                }
            }
        },
        methods: {
            addMechanic(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            name: this.mechanicForm.name,
                            mobile: this.mechanicForm.mobile,
                            status: Number(this.mechanicForm.status),
                            tag: this.mechanicForm.tag,
                            shopId: this.$store.state.shopId
                        };
                        this.$http.addMechanic(data).then((res) => {
                            if(res === 200) this.$router.push('/workers');
                        });
                    }
                });
            },
            cancelMechanic() {
                this.$router.back();
            },
        }
    }
</script>