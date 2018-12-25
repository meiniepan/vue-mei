<template>
    <div>
        <el-button type="primary" @click="addWorker">添加技工</el-button>
        <el-table
                :data="tableData"
                border
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
                    label="注册时间"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="技工手机号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="quantity"
                    label="已服务订单数量"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="订单金额"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="300">
            </el-table-column>
            <el-table-column

                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="saveName(tableData[scope.$index].name)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import ElContainer from "../../../node_modules/element-ui/packages/container/src/main.vue";
    export default {
        components: {ElContainer},
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
                tableData: [{
                    num: '1',
                    date: '2016-05-03',
                    phone: '13312345678',
                    name: '王小虎',
                    quantity: '123',
                    money: '2000',
                    status: '正常',
                }, {
                    num: '2',
                    date: '2016-05-03',
                    phone: '13312345678',
                    name: '李白',
                    quantity: '123',
                    money: '2000',
                    status: '正常',
                }, {
                    num: '2',
                    date: '2016-05-03',
                    phone: '13312345678',
                    name: '李白1',
                    quantity: '123',
                    money: '2000',
                    status: '正常',
                }, {
                    num: '2',
                    date: '2016-05-03',
                    phone: '13312345678',
                    name: '李白2',
                    quantity: '123',
                    money: '2000',
                    status: '正常',
                }]
            }
        }
    }
</script>