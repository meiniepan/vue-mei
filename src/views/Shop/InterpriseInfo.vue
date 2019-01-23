<template>
    <div class="inner">
        <el-form :model="infoForm" :rules="rules" ref="infoForm" label-width="150px" class="data-form">
            <h2>企业业务资料</h2>
            <el-form-item label="企业全称：" prop="interpriseName">
                <el-input v-model="infoForm.interpriseName"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码：" prop="creditCode">
                <el-input v-model="infoForm.creditCode"></el-input>
            </el-form-item>
            <el-form-item label="法定代表人姓名：" prop="representName">
                <el-input v-model="infoForm.representName"></el-input>
            </el-form-item>
            <el-form-item label="企业工商营业执照：" prop="representName">
                <el-upload
                        class="avatar-uploader"
                        action="http://192.168.1.156:5000/files/add"
                        accept="image/jpeg,image/gif,image/png,image/jpg"
                        :show-file-list="false"
                        :on-success="uploadSuccess">
                    <img v-if="infoForm.imageUrl" :src="infoForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="tips">格式要求：原件照片、扫描件或者加盖公章的复印件。</span>
            </el-form-item>

            <h2>开户信息</h2>
            <el-form-item label="开户名称：" prop="accountName">
                <el-input v-model="infoForm.accountName"></el-input>
            </el-form-item>

            <el-form-item label="开户行省/市：" placeholder="bankAddress" class="open-address">
                <!--<el-select v-model="infoForm.province" placeholder="请选择开会省">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select v-model="infoForm.city" placeholder="请选择开户市">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select v-model="infoForm.area" placeholder="请选择开户区">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>-->
                <area-cascader type='text' v-model="infoForm.bankAddress" :level='1' :data="pcaa"></area-cascader>
            </el-form-item>

            <el-form-item label="银行账号：" prop="bankAccount">
                <el-input v-model="infoForm.bankAccount" placeholder="请填写开户账号"></el-input>
            </el-form-item>

            <el-form-item label="开户银行：" prop="bankOpening">
                <el-input v-model="infoForm.bankOpening" placeholder="请填写开户账号" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="绑定手机号：" prop="bindPhone" class="bind-phone">
                <el-input v-model="infoForm.bindPhone" placeholder="请填写银行绑定手机号"></el-input>
                <el-button>获取验证码</el-button>
            </el-form-item>
            <el-form-item label="短信验证码：" prop="code">
                <el-input v-model="infoForm.code" placeholder="请填写短信验证码"></el-input>
            </el-form-item>
            <el-form-item label="银行开户许可证：" prop="representName">
                <el-upload style="text-align: left"
                           action="http://192.168.1.156:5000/files/add"
                           list-type="picture-card"
                           :on-success="uoloadImgSuccess"
                           :on-preview="handlePictureCardPreview"
                           :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="infoForm.licenceVisible">
                    <img width="100%" :src="infoForm.licenceImageUrl" alt="">
                </el-dialog>
                <span class="tips">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。</span>
            </el-form-item>

            <el-form-item class="preserve-btn">
                <el-button type="primary" @click="bankMsg">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { pca, pcaa } from 'area-data';
    export default {
        name: "InterpriseInfo",
        data() {
            let bankAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写银行账号'));
                } else {
                    this.$http.getBankMsg(this.infoForm.bankAccount)
                        .then((res) => {
                            this.infoForm.bankOpening = res.bankName;
                        });
                    callback();
                }
            };
            return {
                pca: pca,
                pcaa: pcaa,
                infoForm: {
                    interpriseName: '',
                    creditCode: '',
                    representName: '',
                    imageUrl: '',
                    businesslicence: '',
                    accountName: '', //开户名称
                    bankAddress: '',
                    province: '', //省
                    city: '', //市
                    area: '', //区
                    bankAccount: '', //银行账号
                    bankOpening: '',
                    bindPhone: '', //绑定手机号
                    code: '', //验证码
                    licenceVisible: false,
                    licenceImageUrl: ''
                },
                rules: {
                    interpriseName: [
                        { required: true, message: '请填写企业全称', trigger: 'blur' },
                    ],
                    creditCode: [
                        { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                    ],
                    representName: [
                        { required: true, message: '法定代表人姓名', trigger: 'blur' }
                    ],
                    accountName: [
                        { required: true, message: '请填写开户名称', trigger: 'blur' }
                    ],
                    bankAccount: [
                        { required: true, validator: bankAccount, trigger: 'blur' }
                    ],
                    bindPhone: [
                        { required: true, message: '请填写银行绑定手机号', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请填写短信验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            uploadSuccess(response, file) {
                this.infoForm.imageUrl = URL.createObjectURL(file.raw);
                if(response.status === 200){
                    this.infoForm.businesslicence = response.fileHash;
                }
            },
            uoloadImgSuccess(response, file, fileList) {
                this.infoForm.licenceImageUrl = [];
                if(response.status === 200){
                    for(let file in fileList){
                        this.infoForm.licenceImageUrl.push(fileList[file].response.fileHash)
                    }
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.infoForm.dialogImageUrl = file.url;
                this.infoForm.dialogVisible = true;
            },
            bankMsg() {
                let bankAddress = '';
                for(let address in this.infoForm.bankAddress){
                    bankAddress += this.infoForm.bankAddress[address];
                }
                let data = {
                    "name": this.infoForm.interpriseName, //企业全称
                    "creditCode": this.infoForm.creditCode, //信用代码
                    "legalPersionName": this.infoForm.representName, //法人代表
                    "businesslicence": this.infoForm.businesslicence, //营业执照
                    "bankName": this.infoForm.accountName, //开户名称
                    "bankAddress": bankAddress, //开户地址
                    "accountNum": this.infoForm.bankAccount, //银行账号
                    "opening": this.infoForm.bankOpening, //开户银行
                    "bankMobile": this.infoForm.bindPhone, //手机号
                    "verificationCode": this.infoForm.code, //验证码
                    "certificateOfBankAccount": this.infoForm.licenceImageUrl //营业许可证
                };
                this.$http.addCorporation(data)
                    .then((res) => {
                        this.$router.push('/overview');
                    })
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
    .data-form{
        h2{
            text-align: left;
            padding-bottom: 20px;
            border-bottom: 1px solid #999;
            margin-bottom: 20px;
        }
        .preserve-btn{
            margin-left: 110px;
            width: 490px;
        }
    }
</style>