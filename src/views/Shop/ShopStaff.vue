<template>
    <div class="inner">
        <div v-if="staffState === 0">
            <el-table
                    :data="staffData"
                    border
                    highlight-current-row
                    @current-change="getStaffId"
                    style="width: 100%">
                <el-table-column
                        prop="number"
                        label="序号"
                        width="100px">
                </el-table-column>
                <el-table-column
                        prop="account"
                        label="账号">
                    <template slot-scope="scope">
                        <el-input v-model.number="scope.row.account" @change="modifyAccount(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="昵称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" @change="modifyName(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="authority"
                        label="账号权限">
                    <template slot-scope="scope">
                        <el-select
                                v-model="scope.row.authority"
                                clearable automatic-dropdown multiple
                                @focus="clearList(scope.row)"
                                @change="modifyAuthority(scope.row)">
                            <el-option
                                    v-for="val in checkboxList"
                                    :key="val.id"
                                    :label="val.name"
                                    :value="val.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150px">
                    <template slot-scope="scope">
                        <el-button @click="deleteAdmin(scope.row)" type="text" size="small">删除</el-button>
                        <el-button type="text" size="small" @click="confirmModify(scope.row)">确定</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--<el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="staffPage"
                    :page-sizes="[10, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>-->
            <div class="page-btn">
                <div>
                    <el-button @click="lastPage">上一页</el-button>
                    <el-button @click="nextPage">下一页</el-button>
                    每页10条
                </div>
            </div>
            <el-button type="primary" @click="editStaff">添加管理员</el-button>
        </div>
        <staff-component v-else></staff-component>
    </div>
</template>

<script>
    import { timestampToString } from '../../http/common'
    import StaffComponent from '@/components/ShopStaff/StaffModify'
    export default {
        name: "ShopStaff",
        components: { StaffComponent },
        data () {
            return {
                staffData: [],
                staffState: 0,
                checkboxList: [],
                modifyStaff: {},
                staffId: '',
            }
        },
        created() {
            this.$http.getAdminAuthority().then((res) => {
                this.checkboxList = res;
            });
            this.getListData(1);
        },
        methods: {
            deleteAdmin(row) {
                this.$confirm('确定要删除管理员?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    let data = {
                        shopId: '5c3835383b775072a06a5329',
                        staffIdList: [row.id]
                    };
                    console.log(data);
                    this.$http.deleteStaff(data).then((res) => {
                        this.staffData = [];
                        this.getListData(1);
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editStaff() {
                this.staffState = 1;
            },
            lastPage() { //上一页
                this.getListData(0);
            },
            nextPage() { //下一页
                this.getListData(1);
            },
            getStaffId(currentRow) {
                this.modifyStaff = {};
                this.staffId = currentRow.id;
            },
            modifyAccount(row) {
                this.changeModify(row.id, 'mobile', row.account);
            },
            modifyName(row) {
                this.changeModify(row.id, 'name', row.name);
            },
            clearList(row) {
                row.authority= [];
            },
            modifyAuthority(row) {
                this.changeModify(row.id, 'permissionList', row.authority);
            },
            confirmModify(row) {
                if(this.modifyStaff.name !== undefined || this.modifyStaff.mobile !== undefined || this.modifyStaff.permissionList !== undefined){
                    if(this.staffId === row.id){
                        this.$set(this.modifyStaff, 'shopId', '5c3835383b775072a06a5329');
                        this.$set(this.modifyStaff, 'staffId', row.id);
                        console.log(this.modifyStaff);
                        this.$http.modifyStaff(this.modifyMechanic)
                            .then((res) => {
                                this.getListData(1);
                            })
                    }
                }else{
                    console.log('失败');
                }
            },
            changeModify(staffId,fieldName, fieldval) {
                if(this.staffId === staffId){
                    this.$set(this.modifyStaff, fieldName, fieldval);
                }else{
                    this.modifyStaff = {};
                }
            },
            getListData(direction) {
                let baseData = '111';
                if(this.staffData.length !== 0){
                    if(direction === 1){
                        baseData = this.staffData[this.staffData.length-1].id;
                    }else{
                        baseData = this.staffData[0].id;
                    }
                };
                let data = {
                    "shopId": "5c3835383b775072a06a5329",
                    "baseObjectId": baseData,
                    "direction": direction
                };
                this.$http.getAdminList(data).then((res) => {
                    if(res.length === 0){
                        this.$alert('没有更多数据', '', {
                            cancelButtonText: '确定'
                        });
                        return;
                    }else{
                        this.staffData = [];
                        for(let listId in res){
                            this.staffData.push({
                                number: Number(listId) + 1,
                                id: res[listId].id,
                                account: res[listId].mobile,
                                name: res[listId].name,
                                createTime: timestampToString(res[listId].createTime),
                                authority: res[listId].permissionList,
                            });
                        }
                    }
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .el-pagination{
        margin-top: 20px;
    }
    .el-button{
        margin-top: 20px;
    }
    .page-btn{
        margin-right: 50px;
        display: flex;
        justify-content: flex-end;
    }
</style>