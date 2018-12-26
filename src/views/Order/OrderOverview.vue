<template>

    <div >
        <h3>订单概况</h3>
        <div class="order-overview">
            <div class="order-overview-head">
                <span class="order-overview-head-data">{{weekCounts}}</span><span class="order-overview-head-data">{{waitPayCounts}}</span>
                <span class="order-overview-head-data">{{waitOperateCounts}}</span><span class="order-overview-head-amount">¥{{weekSaleAmount}}</span>
            </div>
            <div class="order-overview-head">
                <span class="order-overview-head-desc">7天下单笔数</span><span class="order-overview-head-desc">待付款</span>
                <span class="order-overview-head-desc">待处理</span><span class="order-overview-head-amount-desc">7天销售额</span>
            </div>
        </div>

        <v-chart class="line-chart"  :options="option"/>
    </div>
</template>

<script>
    import ECharts from 'vue-echarts/components/ECharts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/tooltip'
    export default {
        name: "Display",
        components: {
            'v-chart': ECharts
        },
        data () {
            return {
                weekCounts:2,
                waitPayCounts:20,
                waitOperateCounts:31,
                weekSaleAmount:120.11,

                option : {
                    title: {
                        text: '近7天 订单统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2018年12月19日','2018年12月20日','2018年12月21日','2018年12月22日','2018年12月23日','2018年12月24日','2018年12月25日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'下单笔数',
                            type:'line',
                            data:[150, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'付款订单',
                            type:'line',
                            data:[50, 62, 41, 64, 40, 40, 100]
                        }
                    ]
                }
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    .line-chart{
        width: 80%;
        margin: 50px 10%;
    }

    .order-overview{
        border: 1px solid gray;
        width: 80%;
        padding: 20px;
        margin: 30px 15%;
    }
    .order-overview-head{
        display: flex;
        align-items: center;
    }
    .order-overview-head-data{
        font-size: 28px;
        font-weight:bold;
        color: #3285FF;
        flex:1
    }

    .order-overview-head-amount{
        font-size: 28px;
        font-weight:bold;
        color: #3285FF;
        flex:3
    }
    .order-overview-head-desc{
        flex:1
    }
    .order-overview-head-amount-desc{
        flex:3
    }
</style>
