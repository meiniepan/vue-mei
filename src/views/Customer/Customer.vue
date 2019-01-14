<template>
    <div>
        <div>
            <el-form :inline="true" :model="formData" class="demo-form-inline">
                <el-form-item label="买家账号">
                    <el-input v-model="formData.account" placeholder="买家账号"></el-input>
                </el-form-item>
                <el-form-item label="订单编号">
                    <el-input v-model="formData.order_num" placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                    <el-select v-model="formData.region" placeholder="地区">
                        <el-option label="西城区" value="xi"></el-option>
                        <el-option label="东城区" value="dong"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true" :model="formData" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="formData.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="付款方式">
                    <el-select v-model="formData.method" placeholder="付款方式">
                        <el-option label="支付宝" value="alipay"></el-option>
                        <el-option label="微信" value="wechat"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">筛选</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%" highlight-current-row>
            <el-table-column prop="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="account" label="买家账号" width="180" align="center">
            </el-table-column>
            <el-table-column prop="name" label="收货人" width="180" align="center">
            </el-table-column>
            <el-table-column prop="address" label="收货人地址" width="300" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="收货人手机号" width="180" align="center">
            </el-table-column>
            <el-table-column prop="order_num" label="订单编号" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleOrderNumClick(scope.row.order_num)">{{ scope.row.order_num }}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="下单时间" width="180" align="center">
            </el-table-column>
            <el-table-column prop="amount" label="订单金额" width="180" align="center">
            </el-table-column>
            <el-table-column prop="method" label="支付方式" width="180" align="center">
            </el-table-column>
        </el-table>
        <div class="page-btn">
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
    name: "Customer",
    data() {
        return {
            tableData: [],
            formData: {
                account: '',
                order_num: '',
                region: '',
                name: '',
                method: ''
            },
            staffPage: 1,
        }
    },
    created() {
        this.getListData(1);
    },
    methods: {
        getListData(direction) {
            let baseId = "0";
            let dataLen = this.tableData.length;

            if (dataLen !== 0) {
                if (direction === 1) {
                    baseId = this.tableData[dataLen - 1].id;
                } else {
                    baseId = this.tableData[0].id;
                }
            }
            // console.log('===>' + baseId);
            let data = {
                "shopId": "5c3835383b775072a06a5329",
                "direction": direction,
                "baseObjectId": baseId
            };
            this.$http.getCustomerList(data).then((res) => {
                if (res == '') {
                    console.log('return');
                } else {
                    this.tableData = [];
                    for(let listId in res){
                        let item = res[listId];
                        // console.log('---->' + item.id);
                        this.tableData.push({
                            index: Number(listId) + 1,
                            account: item.account,
                            name: item.name,
                            address: item.address,
                            phone: item.mobile,
                            order_num: item.serial,
                            date: timestampToString(item.createTime),
                            amount: item.amount,
                            method: (item.payType === 0) ? '微信支付' : '支付宝支付',
                            id: item.id
                        });
                    }
                }
            });
        },
        onSubmit() {
            console.log(this.formData);
        },
        handleOrderNumClick(order_num) {
            console.log(order_num);
            this.$router.push('../Order/OrderDetail');
        },
        lastPage() {
            this.getListData(0);
        },
        nextPage() { //下一页
            this.getListData(1);
        }
    }
}
</script>

<style scoped>
    .el-pagination {
        position: fixed;
        bottom: 100px;
        right: 50px;
    }
    .page-btn{
        margin-right: 50px;
        display: flex;
        justify-content: flex-end;
    }
</style>
