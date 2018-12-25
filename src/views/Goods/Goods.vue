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
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    label="全选"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="titlePrice"
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
                    label="商品状态">
            </el-table-column>
            <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="deleteGoods(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="releaseGoods(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="goods-btn">
            <div>
                <el-button>下架</el-button>
                <el-button>删除</el-button>
            </div>
            <div>
                <el-button>上一页</el-button>
                <el-button>下一页</el-button>
                每页20条
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Goods",
        data () {
            return {
                goodsData: [{
                    title: '服务（商品）主标题，最长50字，一行显示不完全，折行显示',
                    price: '¥350',
                    stock: 100,
                    sales: 99,
                    createTime: '2016-05-03 15:00:00',
                    classify: '王小虎',
                    state: '销售中'
                },{
                    title: '服务（商品）主标题，最长50字',
                    price: '¥350',
                    stock: 100,
                    sales: 99,
                    createTime: '2016-05-03 15:00:00',
                    classify: '王小虎',
                    state: '销售中'
                }],
                multipleSelection: []
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            releaseGoods(row) { //发布或者编辑
                this.$router.push('/goodsAdd')
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