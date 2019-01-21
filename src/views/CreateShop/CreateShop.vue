<template>
    <div>
        <el-steps :active="active" align-center>
            <el-step title="准备资料"></el-step>
            <el-step title="店铺信息"></el-step>
            <el-step title="企业信息"></el-step>
            <el-step title="提交审核"></el-step>
        </el-steps>

        <div v-if="active === 0">
            商家入驻说明
        </div>

        <div v-else-if="active === 1">
            <el-form :model="shopForm" ref="shopForm" label-width="110px" class="data-form">

                <el-form-item label="店铺名称：" prop="shopName">
                    <el-input v-model="shopForm.shopName"></el-input>
                </el-form-item>

                <el-form-item label="所在地址：" prop="address">
                    <el-input type="textarea" v-model="shopForm.address"></el-input>
                </el-form-item>

                <el-form-item label="店铺logo：" prop="logoUrl">
                    <el-upload
                            class="avatar-uploader"
                            action="http://adminexample.com/files/add"
                            accept="image/jpeg,image/gif,image/png,image/jpg"
                            :show-file-list="false"
                            :on-success="logoSuccess">
                        <img v-if="imgUrl" :src="imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="tips">建议尺寸120x120像素</span>
                </el-form-item>

            </el-form>
        </div>

        <div v-else-if="active === 3">
            您提交的资料正在审核中，请耐心等待审核结果。如有问题，可联系来到平台客服，电话：400-1116160
        </div>

        <el-button style="margin-top: 12px;" @click="next(active)">{{activeBtn}}</el-button>

    </div>
</template>

<script>
    export default {
        name: "CreateShop",
        mounted() {
            this.merchantId = this.$route.params.id;
        },
        methods: {
            logoSuccess(response, file) {
                this.imgUrl = URL.createObjectURL(file.raw);
                if(response.code === 200){
                    this.shopForm.logoUrl = response.data.fileHash;
                }
            },
            next(val) {
                this.activeBtn = '提交';
                if(val === 1){
                    let data = {
                        name: this.shopForm.shopName,
                        logo: this.shopForm.logoUrl,
                        ownerId: this.merchantId
                    };
                    console.log(data);
                    this.$http.addShop(data).then((res) => {
                        if(res.code === 200){
                            this.$alert('恭喜您已提交，工作人员会尽快审核，稍后会和您联系，请保持电话畅通，谢谢～', '', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.active = 3;
                                }
                            });
                            this.activeBtn = '刷新';
                        }else{
                            this.$message.error(res.data.message);
                        }
                    });
                }else{
                    if (this.active++ > 3) return;
                }
            },
        },
        data() {
            return {
                active: 0,
                activeBtn: '下一步',
                shopForm: {
                    shopName: '',
                    address: '',
                    logoUrl: '',
                },
                imgUrl: '',
                merchantId: '',
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
</style>