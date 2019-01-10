<template>
    <div class="inner">
        <div class="add-search">
            <el-button class="release-btn" @click="releaseGoods">发布商品</el-button>
            <el-input placeholder="请输入名称"
                      suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table
                ref="multipleTable"
                :data="goodsData"
                tooltip-effect="dark"
                style="width: 100%"
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
                    label="商品状态"
                    :filters="[{ text: 0, value: 0 }, { text: 1, value: 1 }]"
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
                    <el-button @click="deleteGoods(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="editGoods(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="goods-btn">
            <div>
                <el-button @click="goodsShelves">下架</el-button>
                <el-button>删除</el-button>
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
                page: 1,
            }
        },
        created() {
            this.getGoodsData(this.page);
        },
        methods: {
            filterTag(value, row) {
                return row.state === value;
            },
            lastPage() {
                this.page-=1;
                this.getGoodsData(this.page);
            },
            nextPage() { //下一页
                this.page+=1;
                this.getGoodsData(this.page);
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
            editGoods(row) { //发布或者编辑
                //console.log(row.serviceId);
                this.$router.push({
                    name: 'GoodsAdd',
                    path: '/goodsAdd',
                    params: {
                        serviceId: row.serviceId
                    }
                })
            },
            deleteGoods(row) { //删除
                console.log(row);
                this.$confirm('确定要删除商品?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*商品下架*/
            goodsShelves() {
                this.$confirm('确定要批量下架商品吗?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    let shelvesData = {
                        shopId: 12,
                        serviceId: this.batchGoods
                    };
                    this.$http.goodsShelves(shelvesData).then(() => {
                        this.$message({
                            type: 'success',
                            message: '下架成功!'
                        });
                        this.getGoodsData(1);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架'
                    });
                });
            },
            /*获取所有商品*/
            getGoodsData(page) {
                this.goodsData = [];
                let shopData = {
                    "shopId": '5c36bb413b7750468fd79a03',
                    "page": page
                };
                this.$http.getGoods(shopData).then((res) => {
                    for(let item in res){
                        this.goodsData.push({
                            title: res[item].name,
                            price: '¥'+res[item].price,
                            stock: res[item].inventory,
                            sales: res[item].sales,
                            createTime: timestampToString(res[item].createTime),
                            classify: res[item].tag,
                            state: res[item].status,
                            serviceId: res[item].serviceId
                        });
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