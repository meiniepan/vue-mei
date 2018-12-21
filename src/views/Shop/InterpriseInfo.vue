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
                <el-upload style="text-align: left"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="infoForm.dialogVisible">
                    <img width="100%" :src="infoForm.dialogImageUrl" alt="">
                </el-dialog>
                <span class="tips">格式要求：原件照片、扫描件或者加盖公章的复印件。</span>
            </el-form-item>

            <h2>开户信息</h2>
            <el-form-item label="开户名称：" prop="accountName">
                <el-input v-model="infoForm.accountName"></el-input>
            </el-form-item>
            <el-form-item label="开户行省/市：" class="open-address">
                <el-select v-model="infoForm.province" placeholder="请选择开会省">
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
                </el-select>
            </el-form-item>
            <el-form-item label="银行账号：" prop="bankAccount">
                <el-input v-model="infoForm.bankAccount" placeholder="请填写开户账号"></el-input>
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
                           action="https://jsonplaceholder.typicode.com/posts/"
                           list-type="picture-card"
                           :on-preview="handlePictureCardPreview"
                           :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="infoForm.dialogVisible">
                    <img width="100%" :src="infoForm.dialogImageUrl" alt="">
                </el-dialog>
                <span class="tips">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。</span>
            </el-form-item>

            <el-form-item class="preserve-btn">
                <el-button type="primary">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "InterpriseInfo",
        data() {
            return {
                infoForm: {
                    interpriseName: '',
                    creditCode: '',
                    representName: '',
                    dialogImageUrl: '',
                    dialogVisible: false,
                    accountName: '', //开会名称
                    province: '', //省
                    city: '', //市
                    area: '', //区
                    bankAccount: '', //银行账号
                    bindPhone: '', //绑定手机号
                    code: '', //验证码
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
                        { required: true, message: '请填写开户账号', trigger: 'blur' }
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.infoForm.dialogImageUrl = file.url;
                this.infoForm.dialogVisible = true;
            }
        }
    }
</script>

<style scoped lang="scss">
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