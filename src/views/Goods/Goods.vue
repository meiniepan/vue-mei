<template>
    <div class="inner">
        <div class="add-search">
            <el-button class="release-btn" @click="releaseGoods">发布服务</el-button>
            <el-input placeholder="请输入名称"
                      suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table
                ref="multipleTable"
                :data="goodsData"
                tooltip-effect="dark"
                style="width: 100%"
                :default-sort = "{prop: 'createTime', order: 'descending'}"
                @selection-change="batchSelectionGoods">
            <el-table-column
                    type="selection"
                    label="全选"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="">
                <template slot-scope="scope">
                    <p style="line-height: 20px">{{ scope.row.title }}</p>
                    <p style="margin-top: 10px">{{ scope.row.price }}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="stock"
                    label="库存">
            </el-table-column>
            <el-table-column
                    prop="sales"
                    label="销量">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="classify"
                    label="服务分类">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="服务状态"
                    :filters="stateArr"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.state === '1' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.state}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="deleteGoods(scope.row.serviceId, 1)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="editGoods(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="goods-btn">
            <div>
                <el-button @click="goodsShelves">下架</el-button>
                <el-button @click="deleteGoods(0,2)">删除</el-button>
            </div>
            <div>
                <el-button @click="lastPage">上一页</el-button>
                <el-button @click="nextPage">下一页</el-button>
                每页10条
            </div>
        </div>
    </div>
</template>

<script>
    import { timestampToString } from '../../http/common'
    export default {
        name: "Goods",
        data () {
            return {
                goodsData: [],
                batchGoods: [],
                stateList: [],
                stateArr: [],
            }
        },
        mounted() {
            this.getGoodsData(1);
        },
        methods: {
            filterTag(value, row) {
                return row.state === value;
            },
            lastPage() {
                this.getGoodsData(0);
            },
            nextPage() { //下一页
                this.getGoodsData(1);
            },
            batchSelectionGoods(val) {
                this.batchGoods = [];
                for(let serviceId in val){
                    this.batchGoods.push(val[serviceId].serviceId);
                }
            },
            releaseGoods() {
                this.$router.push('/goodsAdd');
            },
            /*编辑服务*/
            editGoods(row) { //发布或者编辑
                this.$router.push({
                    name: 'GoodsAdd',
                    path: '/goodsAdd',
                    params: {
                        serviceId: row.serviceId
                    }
                })
            },
            /*删除服务*/
            deleteGoods(row,index) { //删除
                let data = {};
                this.$confirm('确定要删除商品?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    if(index === 1){
                        data = {serviceIdList: [row]};
                    }else{
                        data = {serviceIdList: this.batchGoods}
                    }
                    this.$http.goodsDelete(data)
                        .then(() => {
                            this.goodsData = [];
                            this.getGoodsData(1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*下架服务*/
            goodsShelves() {
                this.$confirm('确定要批量下架商品吗?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    let shelvesData = {
                        shopId: this.$store.state.shopId,
                        serviceId: this.batchGoods
                    };
                    this.$http.goodsShelves(shelvesData).then(() => {
                        this.$message({
                            type: 'success',
                            message: '下架成功!'
                        });
                        this.goodsData = [];
                        this.getGoodsData(1);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架'
                    });
                });
            },
            /*获取所有服务*/
            getGoodsData(direction) {
                let baseData = '111';
                if(this.goodsData.length !== 0){
                    if(direction === 1){
                        baseData = this.goodsData[this.goodsData.length-1].serviceId;
                    }else{
                        baseData = this.goodsData[0].serviceId;
                    }
                }
                let shopData = {
                    "shopId": this.$store.state.shopId,
                    "baseObjectId": baseData,
                    "direction": direction,
                    "statusList": [5,6,7,8,9],
                };
                this.$http.getGoods(shopData).then((res) => {
                    if(res.length === 0){
                        this.$message.error('没有更多数据');
                        return;
                    }else {
                        this.goodsData = [];
                        for(let item in res){
                            let val = res[item];
                            let obj = {};
                            let stateTag = [];
                            let data = { statusValue : val.status };
                            this.$http.getStatus(data)
                                .then((res) => {
                                    this.stateList.push({
                                        text: res,
                                        value: res
                                    });
                                    this.goodsData.push({
                                        title: val.name,
                                        price: '¥'+ val.price,
                                        stock: val.inventory,
                                        sales: val.sales,
                                        createTime: timestampToString(val.createTime),
                                        classify: val.tagName,
                                        state: res,
                                        serviceId: val.serviceId,
                                    });
                                    for(let i = 0; i < this.stateList.length; i++){
                                        if(!obj[this.stateList[i].value]){
                                            stateTag.push(this.stateList[i]);
                                            obj[this.stateList[i].value] = true;
                                        }
                                    }
                                });
                            this.stateArr = stateTag;
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";
    .add-search{
        display: flex;
        justify-content: space-between;
        .release-btn{
            text-align: left;
            @extend .br-bg;
        }
        .el-input{
            width: 300px;
        }
    }
    .el-table{
        margin-top: 30px;
    }
    .goods-btn{
        @include m-top(50);
        display: flex;
        justify-content: space-between;
    }
</style>