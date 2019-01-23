<template>
    <div class="inner">
        <el-form :model="shopForm" :rules="rules" ref="shopForm" label-width="110px" class="data-form">

            <el-form-item label="店铺名称：" prop="name">
                <el-input v-model="shopForm.name" @change="modifyName"></el-input>
            </el-form-item>

            <el-form-item label="绑定手机号：">
                <el-input v-model="shopForm.bindPhone"></el-input>
            </el-form-item>

            <el-form-item label="商铺类别：">
                <el-select v-model="shopForm.category" placeholder="请选择商铺类别">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所在地址：">
                <el-input type="textarea" v-model="shopForm.address"></el-input>
            </el-form-item>

            <el-form-item label="店铺logo：" prop="logo">
                <el-upload
                        class="avatar-uploader"
                        :action="$imgUrl"
                        accept="image/jpeg,image/gif,image/png,image/jpg"
                        :show-file-list="false"
                        :on-success="logoSuccess">
                    <img v-if="imgUrl" :src="imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="tips">建议尺寸120x120像素</span>
            </el-form-item>

            <el-form-item label="店铺状态：">
                <el-select v-model="shopForm.shopState" placeholder="请选择店铺状态">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="注册时间：">
                <el-input v-model="shopForm.createTime" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item class="preserve-btn">
                <el-button type="primary" @click="shopMsg('shopForm')">编辑/保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { timestampToString } from '../../http/common'
    export default {
        name: "ShopContent",
        data () {
            return {
                disable: true,
                shopForm: {
                    name: '',
                    bindPhone: '',
                    category: '',
                    address: '',
                    logo: '',
                    shopState: '',
                    createTime: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入店铺名称', trigger: 'blur' },
                    ],
                },
                imgUrl: '',
                modifyData: {}
            };
        },
        mounted() {
            this.getShopMsg();
        },
        methods: {
            modifyName(row) {
                this.$set(this.modifyData, 'name', row);
            },
            logoSuccess(response, file) {
                this.imgUrl = URL.createObjectURL(file.raw);
                //console.log(response);
                if(response.code === 200){
                    this.shopForm.logo = response.data.fileHash;
                    this.$set(this.modifyData, 'logo', this.shopForm.logo);
                }
            },
            shopMsg(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.modifyData.name !== undefined || this.modifyData.logo !== undefined){
                            this.$set(this.modifyData, 'shopId', this.$store.state.shopId);
                            this.$http.ModifyShopMsg(this.modifyData);
                            this.getShopMsg();
                        }
                    }
                });
            },
            getShopMsg() {
                let data = {
                    "shopId": this.$store.state.shopId
                };
                this.$http.getShopMsg(data).then((res) => {
                    this.shopForm = {
                        name: res.name,
                        createTime: timestampToString(res.createTime)
                    };
                    this.imgUrl = this.$ipfsUrl + res.logo;
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