<template>
    <div class="inner">
        <div v-if="staffState === 0">
            <el-table
                    :data="staffData"
                    border
                    :default-sort = "{prop: 'createTime'}"
                    style="width: 100%">
                <el-table-column
                        prop="number"
                        label="序号"
                        width="100px">
                </el-table-column>
                <el-table-column
                        prop="account"
                        label="账号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="昵称">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="authority"
                        label="账号权限">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150px">
                    <template slot-scope="scope">
                        <el-button @click="deleteAdmin(scope.row)" type="text" size="small">删除</el-button>
                        <el-button type="text" size="small" @click="editStaff">编辑</el-button>
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
                staffPage: 1,
                staffState: 0
            }
        },
        created() {
            this.getListData(this.staffPage);
        },
        methods: {
            getListData(page) {
                this.staffData = [];
                let data = {
                    "shopId": "5c27753e8ffaedc2a6bc4b71",
                    "page": page,
                };
                this.$http.getAdminList(data).then((res) => {
                    for(let listId in res){
                        this.staffData.push({
                            number: Number(listId) + 1,
                            id: res[listId].id,
                            account: res[listId].mobile,
                            name: res[listId].name,
                            createTime: timestampToString(res[listId].createTime),
                            authority: res[listId].permissionList.join('、'),
                        });
                    }
                });
            },
            deleteAdmin(row) {
                //console.log(row);
                this.$confirm('确定要删除管理员?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
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
            lastPage() {
                this.staffPage-=1;
                this.getListData(this.staffPage);
            },
            nextPage() { //下一页
                this.staffPage+=1;
                this.getListData(this.staffPage);
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