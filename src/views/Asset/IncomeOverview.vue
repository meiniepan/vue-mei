<template>
    <div class="inner">
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always">
                    <p>1200.00</p>
                    <p>可结算金额</p>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <p>1200.00</p>
                    <p>待完结订单金额</p>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <p>1200.00</p>
                    <p>总销售额（元）</p>
                </el-card>
            </el-col>
        </el-row>
        <sale-display></sale-display>
    </div>
</template>

<script>
    import SaleDisplay from './LncomeOverview/SaleDisplay'
    export default {
        name: "IncomeOverview",
        components: { SaleDisplay },
    }
</script>

<style scoped lang="scss">
    .el-card__body{
        p:nth-child(2){
            margin-top: 10px;
        }
    }
</style>