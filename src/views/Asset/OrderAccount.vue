<template>
    <div class="inner">
        <el-form :inline="true" :model="orderQuery" class="demo-form-inline">
            <el-form-item label="订单编号">
                <el-input v-model="orderData.orderNumber" placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="结算时间">
                <el-date-picker
                        v-model="orderData.settlement"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="下单时间">
                <el-date-picker
                        v-model="orderData.orderTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryBtn">查询</el-button>
                <el-button type="primary">导出</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="orderData"
                border
                style="width: 100%">
            <el-table-column
                    prop="number"
                    label="序号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="orderTime"
                    label="下单时间">
            </el-table-column>
            <el-table-column
                    prop="orderNumber"
                    width="180px"
                    label="订单编号">
            </el-table-column>
            <el-table-column
                    prop="serviceName"
                    width="180px"
                    label="服务名称">
            </el-table-column>
            <el-table-column
                    prop="payment"
                    label="支付方式">
            </el-table-column>
            <el-table-column
                    prop="firstAmount"
                    label="首次支付金额">
            </el-table-column>
            <el-table-column
                    prop="twoAmount"
                    label="二次支付金额">
            </el-table-column>
            <el-table-column
                    prop="totalSum"
                    label="订单总金额">
            </el-table-column>
            <el-table-column
                    prop="serviceCharge"
                    label="平台手续费">
            </el-table-column>
            <el-table-column
                    prop="income"
                    label="实际销售收入（元）">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="日期"
                    column-key="date"
                    :filters="[{text: '待完结', value: '待完结'}, {text: '待结算', value: '待结算'}, {text: '已结算', value: '已结算'}]"
                    :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
                    prop="settlementTime"
                    label="结算时间">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, orderData)"
                            type="text"
                            size="small">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="staffPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "OrderAccount",
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                orderQuery: {
                    orderNumber: '',
                    settlement: '',
                    orderTime: ''
                },
                orderData: [
                    {
                        number: 1,
                        orderTime: '2018-12-25 12:00:00',
                        orderNumber: 'E146614212056274894',
                        serviceName: '蒸土豆红薯紫薯玉米烤鸡胸肉配菜沙拉',
                        payment: '微信小程序',
                        firstAmount: '+1000.00',
                        twoAmount: '+10.00',
                        totalSum: '1010.00',
                        serviceCharge: '-101.00元 10%',
                        income: '909.00',
                        state: '待结算',
                        settlementTime: '2018-12-25 12:00:00'
                    }
                ],
                staffPage: 4,
            }
        },
        methods: {
            queryBtn() {

            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            deleteRow(index, rows) {    //详情
                console.log(index);
                //rows.splice(index, 1);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-pagination{
        margin-top: 20px;
    }
</style>