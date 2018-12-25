<template>
    <div class="line-chart">
        <v-chart :options="option"/>
    </div>
</template>

<script>
    import ECharts from 'vue-echarts/components/ECharts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    export default {
        name: "SaleDisplay",
        components: {
            'v-chart': ECharts
        },
        data () {
            return {
                option : {
                    title: {
                        text: '近7天销售额趋势'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['下单笔数','付款金额']
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
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'付款金额',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                    ]
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .line-chart{
        margin-top: 50px;
    }
</style>