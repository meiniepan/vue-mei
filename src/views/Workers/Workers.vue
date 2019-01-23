<template>
    <div>
        <el-button type="primary" @click="addWorker">添加技工</el-button>
        <el-table
                :data="mechanicData"
                border
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
                    prop="orders"
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
                    <el-button @click="deleteModify(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="page-btn">
            <div>
                <el-button @click="lastPage">上一页</el-button>
                <el-button @click="nextPage">下一页</el-button>
                每页10条
            </div>
        </div>
    </div>
</template>

<script>
    import ElContainer from "../../../node_modules/element-ui/packages/container/src/main.vue";
    import { timestampToString } from '../../http/common'
    export default {
        components: {ElContainer},
        data() {
            return {
                mechanicData: [],
                modifyMechanic: {},
                mechanicId: '',
            }
        },
        created() {
            this.getMechanicList(1);
        },
        methods: {
            getMechanicId(currentRow) { //获取技工id
                this.modifyMechanic = {};
                this.mechanicId = currentRow.mechanicId;
            },
            phoneModify(row) {
                let pattern = /^1[345678]\d{9}$/;
                if(!pattern.test(row.phone)){
                    this.$message.error('请填写正确的手机号');
                }else{
                    this.changeModify(row.mechanicId, 'mobile', row.phone);
                }
            },
            nameModify(row) {
                this.changeModify(row.mechanicId, 'name', row.name);
            },
            statusModify(row) {
                this.changeModify(row.mechanicId, 'status', Number(row.status));
            },
            /*保存编辑*/
            saveModify (row) {
                if(this.modifyMechanic.name !== undefined || this.modifyMechanic.mobile !== undefined || this.modifyMechanic.status !== undefined){
                    if(this.mechanicId === row.mechanicId){
                        this.$set(this.modifyMechanic, 'mechanicId', row.mechanicId);
                        this.$http.modifyMechanic(this.modifyMechanic)
                            .then((res) => {
                                if(res === 200) this.getMechanicList(1);
                            })
                    }
                }
            },
            deleteModify(list) {
                this.$confirm('确定要删除技工吗?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    let deleteData = {
                        shopId: this.$store.state.shopId,
                        mechanicId: list.mechanicId
                    };
                    this.$http.deleteMechanic(deleteData)
                        .then((res) => {
                            if(res === 200) this.mechanicData = []; this.getMechanicList(1);
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
            lastPage() {
                this.getMechanicList(0);
            },
            nextPage() {
                this.getMechanicList(1);
            },
            changeModify(mechanicId,fieldName, fieldval) {
                if(this.mechanicId === mechanicId){
                    this.$set(this.modifyMechanic, fieldName, fieldval);
                }else{
                    this.modifyMechanic = {};
                }
            },
            getMechanicList (direction) {
                let baseData = '111';
                if(this.mechanicData.length !== 0){
                    if(direction === 1){
                        baseData = this.mechanicData[this.mechanicData.length-1].mechanicId;
                    }else{
                        baseData = this.mechanicData[0].mechanicId;
                    }
                }
                let listData = {
                    shopId: this.$store.state.shopId,
                    "direction": direction,
                    "baseObjectId": baseData,
                    "statusList": [0,1],
                };
                this.$http.getMechanic(listData).then((res) => {
                    if(res.length === 0){
                        this.$message.error('没有更多数据');
                        return;
                    }else {
                        this.mechanicData = [];
                        for(let mechanic in res) {
                            let val = res[mechanic];
                            let time = val.createTime.split('.')[0];
                            this.mechanicData.push({
                                mechanicId: val.id,
                                num: Number(mechanic) + 1,
                                date: timestampToString(time),
                                phone: val.mobile,
                                name: val.name,
                                orders: val.orders,
                                money: val.ordersAmount,
                                status: val.status === 1 ? '正常' : '停用'
                            })
                        }
                    }
                });
            },
        },
    }
</script>
<style scoped lang="scss">
    .page-btn{
        margin-right: 50px;
        display: flex;
        justify-content: flex-end;
    }
</style>