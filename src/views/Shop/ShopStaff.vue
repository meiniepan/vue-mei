<template>
    <div class="inner">
        <div v-if="staffState === 0">
            <el-table
                    :data="staffData"
                    border
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
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="staffPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
            <el-button type="primary" @click="editStaff">添加管理员</el-button>
        </div>
        <staff-component v-else></staff-component>
    </div>
</template>

<script>
    import StaffComponent from '@/components/ShopStaff/StaffModify'
    export default {
        name: "ShopStaff",
        components: { StaffComponent },
        data () {
            return {
                staffData: [
                    {
                        number: 1,
                        account: '15101157662',
                        name: '超级管理员',
                        createTime: '2017/6/12',
                        authority: '全部权限',
                    },{
                        number: 2,
                        account: '15101157662',
                        name: '隔壁老王',
                        createTime: '2017/6/12',
                        authority: '店铺管理、订单管理、资产管理、技工管理',
                    }
                ],
                staffPage: 4,
                staffState: 0
            }
        },
        methods: {
            deleteAdmin(row) {
                console.log(row);
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
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
</style>