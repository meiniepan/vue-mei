<template>
    <div>
        <el-button type="primary" @click="addWorker">添加技工</el-button>
        <el-table
                :data="mechanicData"
                border
                :default-sort = "{prop: 'num', order: 'descending'}"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="num"
                    label="序号"
                    width="80">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="date"
                    label="注册时间">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="技工手机号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="quantity"
                    label="已服务订单数量">
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="订单金额">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column

                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="saveName(mechanicData[scope.$index].name)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteRow(scope.$index, mechanicData)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import ElContainer from "../../../node_modules/element-ui/packages/container/src/main.vue";
    import { timestampToString } from '../../http/common'
    export default {
        components: {ElContainer},
        created() {
            let listData = {
                shopId: '5c2775a18ffaedc2ba1cf2f6',
            };
            this.$http.getMechanic(listData).then((res) => {
                //console.log(res);
                for(let mechanic in res) {
                    let time = res[mechanic].createTime.split('.')[0];
                    let orderId = {
                        "mechanicId": res[mechanic].id
                    };
                    this.$http.getMechanicOrder(orderId).then((resp) => {
                        this.mechanicData.push({
                            num: Number(mechanic) + 1,
                            date: timestampToString(time),
                            phone: res[mechanic].mobile,
                            name: res[mechanic].name,
                            quantity: resp.length,
                            money: res[mechanic].ordersAmount,
                            status: res[mechanic].status === 1 ? '正常' : '停用'
                        })
                    });
                }
            });
        },
        methods: {
            saveName (city) {
                this.$store.dispatch('changeCity',city)
                this.$router.push('/editWorker');
            },


            deleteRow(index, rows) {
                rows.splice(index, 1);

            },
            addWorker() {
                this.$router.push('/addWorker');
            }
        },

        data() {
            return {
                mechanicData: []
            }
        }
    }
</script>