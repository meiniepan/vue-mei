<template>
    <div class="inner">
        <el-form :model="shopForm" :rules="rules" ref="shopForm" label-width="110px" class="data-form">

            <el-form-item label="店铺名称：" prop="shopName">
                <el-input v-model="shopForm.shopName"></el-input>
            </el-form-item>

            <el-form-item label="绑定手机号：" prop="bindPhone">
                <el-input v-model="shopForm.name"></el-input>
            </el-form-item>

            <el-form-item label="商铺类别：" prop="category">
                <el-select v-model="shopForm.category" placeholder="请选择商铺类别">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所在地址：" prop="address">
                <el-input type="textarea" v-model="shopForm.address"></el-input>
            </el-form-item>

            <el-form-item label="店铺logo：" prop="logoUrl">
                <el-upload
                        class="avatar-uploader"
                        action="http://192.168.1.156:5000/files/add"
                        accept="image/jpeg,image/gif,image/png,image/jpg"
                        :show-file-list="false"
                        :on-success="logoSuccess">
                    <img v-if="imgUrl" :src="imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="tips">建议尺寸120x120像素</span>
            </el-form-item>

            <el-form-item label="店铺状态：" prop="shopState">
                <el-select v-model="shopForm.shopState" placeholder="请选择店铺状态">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="注册时间：" prop="time">
                <el-input v-model="shopForm.time"></el-input>
            </el-form-item>

            <el-form-item class="preserve-btn">
                <el-button type="primary" @click="shopMsg('shopForm')">编辑/保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "ShopContent",
        data () {
            return {
                shopForm: {
                    shopName: '',
                    bindPhone: '',
                    category: '',
                    address: '',
                    logoUrl: '',
                    shopState: '',
                    time: ''
                },
                rules: {
                    shopName: [
                        { required: true, message: '请输入店铺名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    /*bindPhone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: '请选择商铺类别', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '请填写所在地址', trigger: 'blur' }
                    ],*/
                    logoUrl: [
                            { required: true, message: '请上传logo', trigger: 'change' }
                    ],
                    /*shopState: [
                        { required: true, message: '请选择店铺状态', trigger: 'change' }
                    ],
                    time: [
                        { required: true, message: '请填写注册时间', trigger: 'blur' }
                    ]*/
                },
                imgUrl: '',
            };
        },
        methods: {
            logoSuccess(response, file) {
                this.imgUrl = URL.createObjectURL(file.raw);
                if(response.status === 200){
                    this.shopForm.logoUrl = response.fileHash;
                }
            },
            shopMsg(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            name: this.shopForm.shopName,
                            logo: this.shopForm.logoUrl,
                            ownerId: '5c27199e3b7750be20ca44e0'
                        };
                        this.$http.addShop(data).then((res) => {
                            this.$refs[formName].resetFields();
                        })
                    } else {
                        alert('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .avatar-uploader{
        text-align: left;
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            display: block;
            width: 120px;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
            border: 1px dashed #d9d9d9;
        }
        .avatar {
            width: 120px;
            height: 120px;
            display: block;
        }
    }
    .preserve-btn{
        margin-left: 110px;
        width: 490px;
    }
</style>