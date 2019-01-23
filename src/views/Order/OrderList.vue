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

       <!-- <el-radio-group v-model="orderStatus">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="待付款"></el-radio-button>
            <el-radio-button label="待分单"></el-radio-button>
            <el-radio-button label="未开始"></el-radio-button>
            <el-radio-button label="进行中"></el-radio-button>
            <el-radio-button label="待评价"></el-radio-button>
            <el-radio-button label="已完成"></el-radio-button>
            <el-radio-button label="已关闭"></el-radio-button>
        </el-radio-group>-->

        <el-table
                :data="orderData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="服务方式">
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="下单时间">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="买家地址">
                            <span>{{ props.row.contact + ' ' +props.row.mobile + ' ' +props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="">
                            <span></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    prop="orderSerial"
                    label="订单ID"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="serviceName"
                    label="服务名称"
                    align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.imageMain" style="display:inline-block;line-height: 20px" />
                    <p style="display:inline-block;margin-top: 10px">{{ scope.row.serviceName }}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价/数量"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="订单状态"
                    :filters="[{ text: '0', value: '0' }, { text: '1', value: '1' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
                    align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            <el-table-column
                        prop="amount"
                    label="实付金额"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="navigateDetail(scope.row.orderImplId)">详情
                    </el-button>
                    <el-button
                            size="mini"
                            plain>完成
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    import { timestampToString } from '../../http/common'
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
                orderData: [],
                //statusList: [],
            }
        },

        mounted() {
            this.getOrderList(1);
        },


        updated() {


        },

        methods: {
            doFilter() {
                alert(this.orderFilterTime[0]);
                alert(this.orderFilterTime[1])
            },
            filterTag(value, row) {
                return row.status === value;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async getOrderList(direction) {

                let data = {
                    "shopId": this.$store.state.shopId,
                    "direction": direction,
                    "baseObjectId": "1",
                    "statusList": [1]
                };
                this.$http.getOrderList(data)
                    .then((res) => {
                       for(let orderId in res) {
                           let val = res[orderId];
                           this.orderData.push({
                               "serviceId": val.serviceId,
                               "orderImplId": val.orderImplId,
                               "address": val.address,
                               "amount": val.amount,
                               "contact": val.contact,
                               "createTime": timestampToString(val.createTime),
                               "imageMain": val.imageMain,
                               "mobile": val.mobile,
                               "orderSerial": val.orderSerial,
                               "price": val.price,
                               "serviceName": val.serviceName,
                               "status": val.status.toString(),
                               "type": val.type
                           })
                       }
                    });
            },
            navigateDetail(orderImplId) {
                this.$router.push({
                    path: '/orderDetail',
                    name: 'OrderDetail',
                    params: {
                        id: orderImplId
                    }
                });
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
