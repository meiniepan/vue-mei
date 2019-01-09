<template>
    <section class="order-list">
        <el-form :model="filterForm" ref="filterForm" class="filter-form" label-width="120px">
            <el-form-item label="订单编号：" prop="orderNumber">
                <el-input class="order-input" v-model="filterForm.orderNumber" placeholder="请输入订单编号"></el-input>
            </el-form-item>

            <el-form-item label="下单时间：" prop="orderFilterTime" >
                <el-date-picker
                        v-model="filterForm.orderFilterTime"
                        type="datetimerange"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="付款方式：" prop="payMethod">
                <el-select v-model="filterForm.payMethod" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="收货人：" prop="receiver">
                <el-input class="order-input" v-model="filterForm.receiver" placeholder="请输入收货人"></el-input>
            </el-form-item>

            <el-form-item label="收货人手机号：" prop="receiverMobile">
                <el-input class="order-input" v-model="filterForm.receiverMobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <div>
                <el-button type="primary" @click="doFilter">筛选</el-button>
                <el-button @click="resetForm('filterForm')">清空</el-button>
            </div>
        </el-form>

        <el-radio-group v-model="orderStatus">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="待付款"></el-radio-button>
            <el-radio-button label="待分单"></el-radio-button>
            <el-radio-button label="未开始"></el-radio-button>
            <el-radio-button label="进行中"></el-radio-button>
            <el-radio-button label="待评价"></el-radio-button>
            <el-radio-button label="已完成"></el-radio-button>
            <el-radio-button label="已关闭"></el-radio-button>
        </el-radio-group>

        <el-table
                ref="orderListTable"
                :data="tableData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="服务方式">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="买家地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="下单时间" :formatter="formatterTime">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="订单ID"
                    width="180"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品名称"
                    width="180"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="单价/数量"
                    width="180"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="订单状态"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="实付金额"
                    :formatter="formatterPrice"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <router-link :to="{path:'orderDetail', query:{orderId:scope.row.id}}">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="navigateDetail(scope.row.id)">详情
                        </el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    export default {
        name: 'OrderList',
        props: {
            msg: String
        },

        data() {
            return {
                filterForm: {
                    orderFilterTime: [],
                    orderNumber: '',
                    payMethod: '',
                    receiver: '',
                    receiverMobile: '',
                },
                orderStatus: '全部',

                options: [
                    '微信小程序',
                    '微信扫码付',
                    '微信app支付',
                    '支付宝扫码付',
                    '支付宝app支付',
                ],
                tableData: [],
            }
        },

        mounted() {
            this.getOrderList();
        },


        updated() {


        },

        methods: {
            doFilter() {
                alert(this.orderFilterTime[0]);
                alert(this.orderFilterTime[1])
            },

            formatterPrice(row) {
                return row.address;
            },

            formatterTime(row) {
                return row.address;
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async getOrderList() {
                this.tableData.push({
                    id: '1111111111111',
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '不知道是啥',
                    tag: '家'
                }, {
                    id: '22222222222',
                    date: '2016-05-04',
                    name: '王1',
                    address: '不知道是啥',
                    tag: '公司'
                }, {
                    id: '3333333333',
                    date: '2016-05-01',
                    name: '王2',
                    address: '不知道是啥',
                    tag: '家'
                }, {
                    id: '444444444444',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '不知道是啥',
                    tag: '公司'
                });
            },
            navigateDetail(orderId) {
                // this.$router.push({path: `/orderDetail/${orderId}`});
            }
        },

    }
</script>

<style scoped>
    .filter-form {
        padding: 20px 0 20px 20px;
        background: rgba(255, 255, 255, 1);
        margin-bottom: 30px;
        width: 800px;
    }

    .order-list {
        width: 80%;
        margin: 40px 10%;
    }

    .order-input {
        margin: 0 20px;
        width: 400px;
    }

    .demo-table-expand {
        margin-left: 40px;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
