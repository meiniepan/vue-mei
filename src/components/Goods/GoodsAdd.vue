<template>
    <div class="inner">
        <el-form ref="goodsForm" :rules="rules" :model="goodsForm" label-width="120px" class="data-form">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">基本信息</div></el-col>
                <el-col :span="20">
                    <el-form-item label="服务名称：">
                        <el-input v-model="goodsForm.serviceName"></el-input>
                    </el-form-item>
                    <el-form-item label="服务图片：">
                        <el-upload style="text-align: left"
                                   :action="$imgUrl"
                                   accept="image/jpeg,image/gif,image/png"
                                   list-type="picture-card"
                                   :file-list="goodsForm.serviceImg"
                                   :on-success="uploadSuccess"
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
                        <el-input v-model="goodsForm.advert" :disabled="advertType"></el-input>
                        <el-checkbox v-model="advertType" label="勾选不显示" name="advertType"></el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">服务分类</div></el-col>
                <el-col :span="20">
                    <el-form-item label="选择分类：">
                        <el-select v-model="goodsForm.classify" placeholder="请选择分类">
                            <el-option v-for="(classify,key) in classifyList" :key="key" :label="classify.name" :value="classify.id"></el-option>
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
        watch: {
            'goodsForm.serviceName': function (newData, oldData) { //服务名字
                if(oldData){this.$set(this.modifyData, 'name', newData);}
            },
            'goodsForm.serviceImg': function (newData, oldData) {
                if(newData.length !==  oldData.length){
                    this.$set(this.modifyData, 'images', newData);
                }
            },
            'goodsForm.price': function (newData, oldData) { //市场价格
                if(oldData){this.$set(this.modifyData, 'price', newData);}
            },
            'advertType': function (newData) { //广告语是否显示 0：不显示 1：显示
                if(newData === undefined){
                    //console.log(this.modifyData);
                }else{
                    this.goodsForm.advert = '';
                    this.$set(this.modifyData, 'adWordStatus', newData === true ? 0 : 1);
                }
            },
            'goodsForm.advert': function (newData) { //广告语
                if(this.advertType === false){
                    this.$set(this.modifyData, 'adWord', newData);
                }
            },
            'goodsForm.classify': function (newData, oldData) { //服务分类
                if(oldData){this.$set(this.modifyData, 'tag', newData);}
            },
            'goodsForm.totalInventory': function (newData, oldData) { //库存
                if(oldData){this.$set(this.modifyData, 'inventory', newData);}
            },
            'goodsForm.orderForm': function (newData) { //服务方式
                this.$set(this.modifyData, 'type', Number(newData));
            },
            'goodsForm.orderCost': function(newData, oldData) { //上门费
                if(oldData){this.$set(this.modifyData, 'underline', newData);}
            },
            'goodsForm.tinymceHtml': function (newData, oldData) { //富文本
                if(oldData){this.$set(this.modifyData, 'content', newData)}
            },
        },
        created() {
            let classify = {
                "status": 1
            };
            this.$http.getClassify(classify).then((res) => {
                this.classifyList = res;
            });
            if(this.$route.params.serviceId){ //编辑
                this.serviceId = this.$route.params.serviceId;
                let detailData = {
                    serviceId: this.serviceId
                };
                this.$http.getGoodsDetail(detailData)
                    .then((res) => {
                        for(let imgUrl in res.images){
                            this.goodsForm.serviceImg.push({
                                response:{data:{fileHash: res.images[imgUrl]}},
                                url: 'http://192.168.1.186:8081/ipfs/' + res.images[imgUrl]
                            });
                        }
                        let specArr = [];
                        for(let item in res.specification){
                            specArr.push(JSON.parse(res.specification[item]));
                        }
                        this.goodsForm = {
                            serviceName: res.name,
                            serviceImg: this.goodsForm.serviceImg,
                            price: res.price,
                            advert: res.price,
                            classify: res.tag,
                            addSpec: specArr,
                            spec: res.specification.length > 0 ? '1' : '0',
                            totalInventory: res.inventory,
                            orderForm: res.type.toString(),
                            orderCost: res.underline,
                            tinymceHtml: res.content
                        };
                        this.advertType = res.advertType;
                    });
            }
        },
        mounted () {
            tinymce.init({});
        },
        methods: {
            uploadSuccess(response, file, fileList) {
                //if(){}
                this.goodsForm.serviceImg = [];
                if(response.code === 200){
                    for(let file in fileList){
                        this.goodsForm.serviceImg.push(fileList[file].response.data.fileHash)
                    }
                }
            },
            handleRemove(file, fileList) {
                this.goodsForm.serviceImg = [];
                for(let file in fileList){
                    this.goodsForm.serviceImg.push(fileList[file].response.data.fileHash)
                }

            },
            handlePictureCardPreview(file) {
                this.goodsForm.dialogImageUrl = file.url;
                this.goodsForm.dialogVisible = true;
            },
            deleteRow(index) {
                if(this.goodsForm.addSpec.length <= 1){
                    return;
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
            submitAudit() { //编辑
                let specArr = [];
                for(let item in this.goodsForm.addSpec){
                    specArr.push(JSON.stringify(this.goodsForm.addSpec[item]));
                }
                if(this.serviceId !== ''){
                    this.$set(this.modifyData, 'specification', specArr);
                    this.$http.modifyGoods(this.modifyData).then(() => {
                        this.$router.push('/goods');
                    })
                }else{ //新建
                    /*广告语*/
                    let data = {
                        "shopId": this.$store.state.shopId,
                        "name": this.goodsForm.serviceName, //服务名称
                        "images": this.goodsForm.serviceImg, //服务图片
                        "price": this.goodsForm.price, //市场价,
                        //"adWord": this.goodsForm.advert, //广告语
                        "adWordStatus": this.advertType === true ? 0 : 1,
                        "tagId": this.goodsForm.classify, //服务分类
                        "specification": specArr, //服务规格
                        "inventory": this.goodsForm.totalInventory, //库存
                        "type": Number(this.goodsForm.orderForm), //服务方式
                        "underline": this.goodsForm.orderCost, //上门费用
                        "content": this.goodsForm.tinymceHtml, //详情
                    };
                    if(this.advertType === false) this.$set(data, 'adWord', this.goodsForm.advert);
                    this.$http.addGoods(data).then((res) => {
                        if(res === 200){
                            this.$router.push('/goods');
                        }
                    });
                }
            }
        },
        data() {
            return {
                goodsForm: {
                    serviceName: '', //服务名称
                    dialogImageUrl: '',
                    dialogVisible: false,
                    serviceImg: [], //服务图片
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
                    orderForm: '0', //服务方式 0：上门 1：站点
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
                    images_upload_handler: (blobInfo, success) => {
                        const img = 'data:image/jpeg;base64,' + blobInfo.base64();
                        success(img)
                    }
                },
                serviceId: '',
                imgArr: [],
                modifyData: {
                    "serviceId": this.$route.params.serviceId,
                }, //修改后的数据
                rules: {

                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .spec-table{

    }
    .submit-audit{
        margin-top: 50px;
    }
</style>