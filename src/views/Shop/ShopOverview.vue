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
        <div></div>
    </div>
</template>

<script>
    export default {
        name: "ShopOverview"
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
</style>