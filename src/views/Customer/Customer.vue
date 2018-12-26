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
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "Customer",
    data() {
        return {
            tableData: [{
                index: '01',
                account: '13688330098',
                name: '张三',
                address: '上海市普陀区金沙江路 1518 弄',
                phone: '1800135526',
                order_num: 'E1234656789090',
                date: '2016.6.8 15:45:48',
                amount: '89.00',
                method: '微信支付'
            }, {
                index: '02',
                account: '13688330000',
                name: '李四',
                address: '上海市普陀区金沙江路 1520 弄',
                phone: '1800135527',
                order_num: 'E1234656789099',
                date: '2016.6.9 15:45:48',
                amount: '101.00',
                method: '支付宝支付'
            }
            ],
            formData: {
                account: '',
                order_num: '',
                region: '',
                name: '',
                method: ''
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        onSubmit() {
            console.log(this.formData);
        },
        handleOrderNumClick(order_num) {
            console.log(order_num);
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
</style>
