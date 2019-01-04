<template>
    <div class="inner">
        <el-form ref="goodsForm" :model="goodsForm" label-width="120px" class="data-form">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">基本信息</div></el-col>
                <el-col :span="20">
                    <el-form-item label="服务名称：">
                        <el-input v-model="goodsForm.serviceName"></el-input>
                    </el-form-item>
                    <el-form-item label="服务图片：">
                        <el-upload style="text-align: left"
                                   action="string"
                                   accept="image/jpeg,image/gif,image/png"
                                   :show-file-list="false"
                                   list-type="picture-card"
                                   :on-preview="handlePictureCardPreview"
                                   :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="goodsForm.dialogVisible">
                            <img width="100%" :src="goodsForm.dialogImageUrl" alt="">
                        </el-dialog>
                        <span class="tips">第一张为默认主图，图片建议尺寸700*750 像素</span>
                    </el-form-item>
                    <el-form-item label="计量单位：">
                        <el-input v-model="goodsForm.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="市场价格：" class="flex-style">
                        <el-input v-model.number="goodsForm.price"></el-input>
                        <el-checkbox v-model="priceType" label="勾选不显示" name="priceType"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="促销广告语：" class="flex-style">
                        <el-input v-model="goodsForm.advert"></el-input>
                        <el-checkbox v-model="advertType" label="勾选不显示" name="advertType"></el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">服务分类</div></el-col>
                <el-col :span="20">
                    <el-form-item label="选择分类：">
                        <el-select v-model="goodsForm.classify" placeholder="请选择分类">
                            <el-option v-for="(classify,key) in classifyList" :key="key" :label="classify" :value="classify"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">服务规格</div></el-col>
                <el-col :span="20">
                    <el-form-item label="规格选择：" style="text-align: left">
                        <el-radio-group v-model="goodsForm.spec">
                            <el-radio label="0">无规格</el-radio>
                            <el-radio label="1">自定义规格</el-radio>
                        </el-radio-group>
                        <div v-if='goodsForm.spec === "1"'>
                            <table class="add-spec" border="1">
                                <thead>
                                    <tr>
                                        <th>规格</th>
                                        <th>单价（元）</th>
                                        <th>库存</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(spec,key) in goodsForm.addSpec" :key="key">
                                        <td>
                                            <el-input v-model.number="spec.specName"></el-input>
                                        </td>
                                        <td>
                                            <el-input v-model.number="spec.unitPrice"></el-input>
                                        </td>
                                        <td>
                                            <el-input v-model.number="spec.stock"></el-input>
                                        </td>
                                        <td>
                                            <el-button @click="deleteRow(key)">删除</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <el-button @click="addSpec">添加规格</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="总库存：">
                        <el-input v-model.number="goodsForm.totalInventory" placeholder="请填写库存"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">服务方式</div></el-col>
                <el-col :span="20">
                    <el-form-item label="服务方式：" style="text-align: left">
                        <el-radio-group v-model="goodsForm.orderForm">
                            <el-radio label="0">上门服务</el-radio>
                            <el-radio label="1">站点服务</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上门费用：" v-if="this.goodsForm.orderForm === '0'">
                        <el-input v-model.number="goodsForm.orderCost" placeholder="请填写金额（元）"></el-input>
                    </el-form-item>
                    <el-form-item label="时间间隔："  v-if="this.goodsForm.orderForm === '0'">
                        <el-select v-model='goodsForm.interval' size='small' @change='intervalChange'>
                            <el-option v-for='item of intervalArr' :key='item' :label='item' :value='item'></el-option>
                        </el-select>
                        <table class='time-table' cellpadding='0' cellspacing='0'>
                            <tr>
                                <th>时间段</th>
                                <td v-for='(item,i) of timePeriod' :key='i'>{{item.time}}</td>
                            </tr>
                            <tr>
                                <th>请选择</th>
                                <td v-for='(item,i) of timePeriod' :key='i' daytype='weekday' @click='addTimePeriod(i, $event)' :id='item.id' class='canchoose' :class="{selecteds:item.weekday==1}">选择</td>
                            </tr>
                        </table>
                    </el-form-item>
                </el-col>
            </el-row>
            <editor id='tinymce' v-model='goodsForm.tinymceHtml' :init='init'></editor>
        </el-form>
        <el-button type="primary" class="submit-audit" @click="submitAudit">提交审核</el-button>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/modern/theme'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    export default {
        name: "GoodsAdd",
        components: {Editor},
        data() {
            return {
                goodsForm: {
                    serviceName: '', //服务名称
                    dialogImageUrl: '', //服务图片
                    dialogVisible: false,
                    unit: '', //计量单位
                    price: '', //市场价
                    advert: '', //广告语
                    classify: '', //服务分类
                    spec: '1',//是否有规格 0：无    1：有
                    addSpec: [{
                        specName: '',
                        unitPrice: '',
                        stock: ''
                    }], //规格数组
                    totalInventory: '', //总库存
                    orderForm: '0', //上门方式 0：上门 1：站点
                    orderCost: '', //上门费用
                    interval: '请选择', //时间间隔
                    times: [], //时间段
                    tinymceHtml: '', //富文本
                },
                priceType: false, //市场价显示否
                advertType: false, //广告语显示否
                intervalArr: [2,3,4,6], //时间间隔数组
                timePeriod: [],
                classifyList: [],   //分类列表
                init: {
                    language_url: '/tinymce/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/lightgray',
                    height: 300,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    toolbar:
                        'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    images_upload_handler: (blobInfo, success, failure) => {
                        const img = 'data:image/jpeg;base64,' + blobInfo.base64();
                        success(img)
                    }
                }
            }
        },
        created() {
            let classify = {
                "status": 1
            };
            this.$http.getClassify(classify).then((res) => {
                this.classifyList = res;
            })
        },
        mounted () {
            tinymce.init({});
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                console.log(file);
                this.infoForm.dialogImageUrl = file.url;
                this.infoForm.dialogVisible = true;
            },
            deleteRow(index) {
                console.log(this.goodsForm.addSpec.length);
                if(this.goodsForm.addSpec.length <= 1){
                    return;
                    console.log(11);
                }else{
                    this.goodsForm.addSpec.splice(index, 1);
                }
            },
            addSpec() {
                this.goodsForm.addSpec.push({
                    specName: '',
                    unitPrice: '',
                    stock: ''
                });
            },
            intervalChange(v) { //选择时间间隔
                this.goodsForm.interval = v;
                this.timePeriod = [];
                this.goodsForm.times = [];
                this.createTable();
            },
            createTable() { //创建时间段table
                let canchoose = document.querySelectorAll('.canchoose');
                if(canchoose.length > 0) {
                    for(let i = 0, l = canchoose.length; i < l; i++) {
                        canchoose[i].classList.remove('selecteds');
                    }
                }
                let inter = this.goodsForm.interval;
                for(let i = 0, l = 24/inter; i < l; i++) {
                    this.timePeriod.push({'id':i+1, 'time':`${i*inter}:00 - ${(i*inter)+inter}:00`, 'stock':0, 'weekday':0, 'holiday':0});
                }
            },
            addTimePeriod(index, e) { //选择时间段
                let currtd = e.target, daytype = currtd.getAttribute('daytype');
                if (currtd.classList.contains('selecteds')) {
                    currtd.classList.remove('selecteds');
                    if(daytype === 'weekday') {
                        this.timePeriod[index].weekday = 0;
                    }
                } else {
                    currtd.classList.add('selecteds');
                    if(daytype === 'weekday') {
                        this.timePeriod[index].weekday = 1;//test
                    }
                }
            },
            submitAudit() {
                let specArr = [];
                for(let item in this.goodsForm.addSpec){
                    specArr.push(JSON.stringify(this.goodsForm.addSpec[item]));
                }
                /*市场价格*/
                this.priceType === true ? this.goodsForm.price = 0 : this.goodsForm.price;
                let data = {
                    "shopId": 12,
                    "name": this.goodsForm.serviceName, //服务名称
                    "images": ["image1", "image2"], //服务图片
                    "price": this.goodsForm.price, //市场价,
                    "tag": this.goodsForm.classify, //服务分类
                    "specification": specArr, //服务规格
                    "inventory": this.goodsForm.totalInventory, //库存
                    "type": Number(this.goodsForm.orderForm), //服务方式
                    "underline": this.goodsForm.orderCost, //上门费用
                    "content": this.goodsForm.tinymceHtml, //详情
                };
                this.$http.addGoods(data).then((res) => {
                    if(res.status === 200){
                        this.$route.push('/goods');
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .spec-table{

    }
    .submit-audit{
        margin-top: 50px;
    }
</style>