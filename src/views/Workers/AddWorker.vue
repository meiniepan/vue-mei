<template>
    <el-form ref="mechanicForm" :model="mechanicForm" label-width="120px" class="data-form">
        <el-form-item label="技工姓名">
            <el-input v-model="mechanicForm.name" placeholder="请填写技工姓名"></el-input>
        </el-form-item>
        <el-form-item label="技工手机号">
            <el-input v-model="mechanicForm.mobile" placeholder="请填写技工手机号"></el-input>
        </el-form-item>
        <el-form-item label="技工状态">
            <el-select v-model.number="mechanicForm.status" placeholder="请选择技工状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="技工标签">
            <el-input v-model="mechanicForm.tag" placeholder="请填写标签，6个字以内"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addMechanic">保存</el-button>
            <el-button @click="cancelMechanic">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                mechanicForm: {
                    name: '',
                    mobile: '',
                    status: '',
                    tag: '',
                    shopId: '001'
                }
            }
        },
        methods: {
            addMechanic() {
                this.$http.addMechanic(this.mechanicForm).then(() => {
                    this.$router.push('/workers');
                });
            },
            cancelMechanic() {
                this.$router.back();
            },
        }
    }
</script>