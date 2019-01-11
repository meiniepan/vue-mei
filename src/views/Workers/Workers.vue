<template>
    <div>
        <el-button type="primary" @click="addWorker">添加技工</el-button>
        <el-table
                :data="mechanicData"
                border
                :default-sort = "{prop: 'num', order: 'descending'}"
                highlight-current-row
                @current-change="getMechanicId"
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
                <template slot-scope="scope">
                    <el-input v-model="scope.row.phone" @change="phoneModify(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name" @change="nameModify(scope.row)"></el-input>
                </template>
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
                <template slot-scope="scope">
                    <el-select v-model="scope.row.status" @change="statusModify(scope.row)">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="停用" value="0"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="saveModify(scope.row)" type="text" size="small">确定</el-button>
                    <el-button @click="deleteModify(scope.$index, mechanicData,scope.row)" type="text" size="small">删除</el-button>
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
            this.getMechanicList();
        },
        methods: {
            getMechanicId(currentRow) { //获取技工id
                this.modifyMechanic = {};
                this.mechanicId = currentRow.mechanicId;
            },
            phoneModify(row) {
                this.changeModify(row.mechanicId, 'mobile', row.phone);
            },
            nameModify(row) {
                this.changeModify(row.mechanicId, 'name', row.name);
            },
            statusModify(row) {
                this.changeModify(row.mechanicId, 'status', Number(row.status));
            },
            saveModify (row) {
                if(this.modifyMechanic.name !== undefined || this.modifyMechanic.mobile !== undefined || this.modifyMechanic.status !== undefined){
                    if(this.mechanicId === row.mechanicId){
                        this.$set(this.modifyMechanic, 'mechanicId', row.mechanicId);
                        this.$http.modifyMechanic(this.modifyMechanic)
                            .then((res) => {
                                console.log(res);
                                this.getMechanicList();
                            })
                    }
                }else{
                    console.log('失败');
                }
            },
            deleteModify(index, rows, list) {
                console.log(list);
                this.$confirm('确定要删除技工吗?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    let deleteData = {
                        shopId: '5c36bb413b7750468fd79a03',
                        mechanicId: list.mechanicId
                    };
                    this.$http.deleteMechanic(deleteData)
                        .then((res) => {
                            console.log(res);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            rows.splice(index, 1);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addWorker() {
                this.$router.push('/addWorker');
            },
            changeModify(mechanicId,fieldName, fieldval) {
                if(this.mechanicId === mechanicId){
                    this.$set(this.modifyMechanic, fieldName, fieldval);
                }else{
                    this.modifyMechanic = {};
                }
            },
            getMechanicList () {
                this.mechanicData = [];
                let listData = {
                    shopId: '5c36bb413b7750468fd79a03',
                };
                this.$http.getMechanic(listData).then((res) => {
                    for(let mechanic in res) {
                        let time = res[mechanic].createTime.split('.')[0];
                        let orderId = {
                            "mechanicId": res[mechanic].id
                        };
                        this.$http.getMechanicOrder(orderId).then((resp) => {
                            this.mechanicData.push({
                                mechanicId: res[mechanic].id,
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
        },

        data() {
            return {
                mechanicData: [],
                modifyMechanic: {},
                mechanicId: '',
            }
        }
    }
</script>