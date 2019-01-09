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
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="price"
                        label="服务（商品）名称"
                        width="250px">
                    <template slot-scope="scope">
                        <img style="float: left;margin-right: 10px" alt="" width="80" height="80"
                             :src="scope.row.picture"/>
                        <div>
                            <p class="order-detail-serve-name">{{ scope.row.name }}</p>
                            <p style="margin-top: 30px">{{ scope.row.tag }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="数量"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="小计（元）"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="状态"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="上门费（元）"
                        :formatter="formatterPrice"
                        align="center">
                </el-table-column>

            </el-table>

        </div>

        <div class="order-detail-info">
            <div class="order-detail-title">订单信息</div>
            <div class="order-item">订单编号：<span>{{orderId}}</span></div>
            <div class="order-item">服务方式：<span>站点服务</span></div>
            <div class="order-item">服务站点： <span>新科祥园来到社区家综服务中心</span></div>
            <div class="order-item">买家留言： <span>无</span></div>
        </div>

        <div class="order-detail-info" v-if="paid">
            <div class="order-detail-title">支付信息</div>
            <div class="order-item">支付流水：<span>2016060232113121313121313131313131</span></div>
            <div class="order-item">费用类型：<span>首次支付</span></div>
            <div class="order-item">支付方式： <span>支付宝扫码付</span></div>
            <div class="order-item">支付时间： <span>2018-11-17 16:00-18:00</span></div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "OrderDetail",

        data() {
            return {
                status: '2',
                paid: true,
                orderId:'',
                tableData: [{
                    id: '1231232132131',
                    date: '2016-05-02',
                    picture: 'http://img1.gtimg.com/cd/pics/hv1/180/129/2246/146079225.jpg',
                    name: '通下水道家属楼打卡机打算看来大家看了神界大陆可视对讲卡拉时间段来看',
                    address: '不知道是啥',
                    price: '12.01',
                    tag: '红色'
                }, {
                    id: '1231232132131',
                    date: '2016-05-04',
                    picture: 'http://img.zcool.cn/community/01e57756fdee9d6ac7257948a00cf9.jpg@1280w_1l_2o_100sh.jpg',
                    name: '水管',
                    address: '不知道是啥',
                    price: '12.01',
                    tag: '红色'
                }, {
                    id: '1231232132131',
                    date: '2016-05-01',
                    picture: 'https://img.alicdn.com/tfs/TB1H95ddBfH8KJjy1XbXXbLdXXa-350-350.jpg',
                    name: '暖气片',
                    address: '不知道是啥',
                    price: '12.01',
                    tag: '绿色'
                }]
            }
        },

        mounted(){
            this.orderId = this.$route.query.orderId;
            this.getOrderDetail();

        },

        methods: {
            getOrderDetail() {

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
        width:120px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        line-height: 20px;
        height: 40px;
    }
</style>
