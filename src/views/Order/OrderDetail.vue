<template>
    <div class="order-detail-bg">

        <el-steps :active="status" align-center>
            <el-step title="1" description="买家下单"></el-step>
            <el-step title="2" description="买家付款"></el-step>
            <el-step title="3" description="商家分单"></el-step>
            <el-step title="4" description="技工出发"></el-step>
            <el-step title="5" description="技工确认完成"></el-step>
            <el-step title="6" description="用户确认"></el-step>
            <el-step title="7" description="用户评价"></el-step>
            <el-step title="8" description="订单完成"></el-step>
        </el-steps>

        <div class="order-detail-serve">
            <el-table
                    ref="orderDetailTable"
                    :data="orderDetailTable"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="price"
                        label="服务（商品）名称"
                        width="250px">
                    <template slot-scope="scope">
                        <img style="float: left;margin-right: 10px" alt="" width="80" height="80"
                             :src="$imgUrl + scope.row.images"/>
                        <div>
                            <p class="order-detail-serve-name">{{ scope.row.name }}</p>
                            <p style="margin-top: 30px">{{ scope.row.tag }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="数量"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="小计（元）"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="underline"
                        label="上门费（元）"
                        align="center">
                </el-table-column>

            </el-table>

        </div>

        <div class="order-detail-info">
            <div class="order-detail-title">订单信息</div>
            <div class="order-item">订单编号：<span>{{orderDetail.serial}}</span></div>
            <div class="order-item">服务方式：<span>站点服务</span></div>
            <div class="order-item">收货人：<span>{{orderDetail.contact}}</span></div>
            <div class="order-item">收货电话：<span>{{orderDetail.mobile}}</span></div>
            <div class="order-item">收货地址： <span>{{orderDetail.address}}</span></div>
            <div class="order-item">买家留言： <span>无</span></div>
        </div>

        <div class="order-detail-info" v-if="paid">
            <div class="order-detail-title">支付信息</div>
            <div class="order-item">支付流水：<span>2016060232113121313121313131313131</span></div>
            <div class="order-item">费用类型：<span>首次支付</span></div>
            <div class="order-item">支付方式： <span>{{orderDetail.payType}}</span></div>
            <div class="order-item">支付时间： <span>2018-11-17 16:00-18:00</span></div>
        </div>

        <el-button @click="goBack">返回</el-button>
        <el-button>分单</el-button>
    </div>

</template>

<script>
    export default {
        name: "OrderDetail",

        data() {
            return {
                status: 2,
                paid: true,
                orderImplId:'',
                orderDetailTable: [],
                orderDetail: {}
            }
        },

        created(){
            this.orderImplId = this.$route.params.id;
            //console.log(this.orderId);
            this.getOrderDetail();
        },

        methods: {
            getOrderDetail() {
                let data = {
                    "shopId": this.$store.state.shopId,
                    "orderImplId": this.orderImplId
                };
                this.$http.getOrderDetail(data).then((res) => {
                    this.orderDetailTable.push({
                        images: res.orderImplInfo.images,
                        amount: res.orderImplInfo.amount,
                        name: res.orderImplInfo.name,
                        price: res.orderImplInfo.price,
                        status: res.orderImplInfo.status,
                        underline: res.orderImplInfo.underline,
                    });
                    this.orderDetail = {
                        address: res.orderInfo.address,
                        contact: res.orderInfo.contact,
                        mobile: res.orderInfo.mobile,
                        payType: res.orderInfo.payType,
                        serial: res.orderInfo.serial
                    }
                })
            },
            goBack() {
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped>
    .order-detail-serve {
        text-align: start;
        border: 1px solid gray;
        border-radius: 4px;
        width: 70%;
        margin: 40px 10%;
    }

    .order-detail-info {
        text-align: start;
        border: 1px solid gray;
        border-radius: 4px;
        width: 70%;
        margin: 40px 10%;
    }

    .order-detail-title {
        height: 30px;
        background: azure;
        text-align: start;
        line-height: 30px;

    }

    .order-item {
        height: 25px;
        line-height: 25px;
        padding: 10px;
    }
    .order-detail-serve-name{
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        line-height: 80px;
    }
</style>
