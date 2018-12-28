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
                                   action="https://jsonplaceholder.typicode.com/posts/"
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
                        <el-input v-model="goodsForm.price"></el-input>
                        <el-checkbox-group v-model="goodsForm.priceType">
                            <el-checkbox label="勾选不显示" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="促销广告语：" class="flex-style">
                        <el-input v-model="goodsForm.advert"></el-input>
                        <el-checkbox-group v-model="goodsForm.priceType">
                            <el-checkbox label="勾选不显示" name="advertType"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">服务分类</div></el-col>
                <el-col :span="20">
                    <el-form-item label="选择分类：">
                        <el-select v-model="goodsForm.classify" placeholder="请选择分类">
                            <el-option label="区域一" value="111"></el-option>
                            <el-option label="区域二" value="222"></el-option>
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
                        <el-table
                                class="add-spec"
                                v-if='goodsForm.spec === "1"'
                                :data="goodsForm.addSpec"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="specName"
                                    label="规格名称">
                                <template slot-scope="scope">
                                    <el-input ></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="unitPrice"
                                    label="单价（元）">
                                <template slot-scope="scope">
                                    <el-input ></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="stock"
                                    label="库存">
                                <template slot-scope="scope">
                                    <el-input ></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            @click.native.prevent="deleteRow(scope.$index, goodsForm.addSpec)"
                                            type="text"
                                            size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button @click="addSpec" v-if='goodsForm.spec === "1"'>添加规格</el-button>
                    </el-form-item>
                    <el-form-item label="总库存：">
                        <el-input v-model="goodsForm.totalInventory" placeholder="请填写库存"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">服务方式</div></el-col>
                <el-col :span="20">
                    <el-form-item label="订单方式：" style="text-align: left">
                        <el-radio-group v-model="goodsForm.orderForm">
                            <el-radio label="0">上门服务</el-radio>
                            <el-radio label="1">站点服务</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上门费用：" v-if="this.goodsForm.orderForm === '0'">
                        <el-input v-model="goodsForm.orderCost" placeholder="请填写金额（元）"></el-input>
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
        </el-form>
        <el-button type="primary" @click="goodsModify">下一步编辑详情信息</el-button>
    </div>
</template>

<script>
    export default {
        name: "GoodsAdd",
        data() {
            return {
                goodsForm: {
                    serviceName: '',
                    dialogImageUrl: '',
                    dialogVisible: false,
                    unit: '',
                    price: '',
                    priceType: '',
                    advert: '',
                    advertType: '',
                    classify: '',
                    spec: '1',//是否有规格 0：无    1：有
                    addSpec: [{
                        specName: '',
                        unitPrice: '',
                        stock: ''
                    }],
                    totalInventory: '',
                    orderForm: '0', //上门方式 0：上门 1：站点
                    orderCost: '',
                    interval: '请选择',
                    times: [],
                },
                intervalArr: [2,3,4,6],
                timePeriod: [],
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.infoForm.dialogImageUrl = file.url;
                this.infoForm.dialogVisible = true;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
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
            goodsModify() { //跳转富文本
                this.$router.push('/goodsModify')
            }
        }
    }
</script>

<style scoped lang="scss">

</style>