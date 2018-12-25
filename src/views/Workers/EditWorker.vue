<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="技工姓名">
            <el-input v-model="form.name" placeholder="请填写技工姓名"></el-input>
        </el-form-item>
        <el-form-item label="技工手机号">
            <el-input v-model="form.phone" placeholder="请填写技工手机号"></el-input>
        </el-form-item>
        <el-form-item label="技工状态">
            <el-select v-model="form.status" placeholder="请选择技工状态">
                <el-option label="正常" value="normal"></el-option>
                <el-option label="停用" value="stop"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="技工标签">
            <el-input v-model="form.label" placeholder="请填写标签，6个字以内"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    name: this.$store.state.city,
                    phone: '',
                    status: '',
                    label: '',
                }
            }
        },
        methods: {
            onSubmit() {
                alert("success")
                this.$router.back();
            },
            onCancel() {
                this.$router.back();
            },
        }
    }
</script>