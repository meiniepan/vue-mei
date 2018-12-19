<template>
    <div class="inner">
        <div class="shop-overview">
            <div class="merchant-overview">
                <img src="~@/assets/logo.png" alt="">
                <div>
                    <h2>商家店铺名称</h2>
                    <span>创建店铺时间</span>
                </div>
            </div>
            <div>
                <el-button>发布商品</el-button>
                <el-button>下载App</el-button>
            </div>
        </div>
        <ul class="order-quantity">
            <li>总订单数量<p>88</p></li>
            <li>已付款订单数量<p>88</p></li>
            <li>销售总额<p>88888</p></li>
            <li>服务（商品）数量<p>88</p></li>
        </ul>
        <display-component></display-component>
        <div class="sales-statistics">
            <h3>服务（商品） 销售前10统计</h3>
            <el-table
                    :data="statisticsTable"
                    height="250"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="number"
                        label="序号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="merchantImage"
                        label="服务（商品）主图"
                        width="180">
                    <template slot-scope="scope">
                        <img  :src="scope.row.merchantImage" alt="" width="40" height="40" class="picture-msg" />
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="服务（商品）名称/价格">
                    <template slot-scope="scope">
                        <p style="line-height: 20px">{{ scope.row.priceTitle }}</p>
                        <p style="margin-top: 10px">{{ scope.row.price }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="salesVolume"
                        label="销量">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import DisplayComponent from './ShopOverview/Display'
    export default {
        name: "ShopOverview",
        components: { DisplayComponent },
        data() {
            return {
                statisticsTable: [
                    {
                        number: '1',
                        merchantImage: 'https://i.loli.net/2017/11/09/5a046546a2a1f.jpg',
                        priceTitle: '服务名称2，50字长度，一行显示不完全就两行',
                        price: '¥35',
                        salesVolume: '1518'
                    },
                    {
                        number: '2',
                        merchantImage: 'https://i.loli.net/2017/11/09/5a046546a2a1f.jpg',
                        priceTitle: '服务名称2，50字长度，一行显示不完全就两行',
                        price: '¥88',
                        salesVolume: '1888'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";
    .shop-overview{
        display: flex;
        justify-content: space-between;
        .merchant-overview{
            display: flex;
            img{
                @include wh(100,100);
                @include m-right(20);
            }
            h2{
                line-height: 50px;
            }
        }
    }
    .order-quantity{
        display: flex;
        justify-content: space-around;
        @include m-top(50);
        li{
            @include wh(200,180);
            border: 1px solid #000;
            line-height: 100px;
        }
    }
    .sales-statistics{
        @include m-top(50);
        h3{
            text-align: left;
            @include m-bottom(20);
        }
        .picture-msg{
            width: 40px;
            height: 40px;
            display: inline-block;
            margin: 0 5px;
        }
    }
</style>