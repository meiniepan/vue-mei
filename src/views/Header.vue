<template>
    <el-container>
        <el-aside width="200px">
            <el-menu :default-openeds="['1', '2','3','4','7']"  :router="true" :default-active="$route.path">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>店铺</template>
                    <el-menu-item-group>
                        <template slot="title">
                            <el-menu-item index="/overview">店铺概况</el-menu-item>
                            <el-menu-item index="/content">店铺资料</el-menu-item>
                            <el-menu-item index="/info">企业信息</el-menu-item>
                            <el-menu-item index="/staff">店铺管理员</el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-message"></i>商品</template>
                    <el-menu-item-group>
                        <template slot="title">
                            <el-menu-item index="/goods">商品管理</el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title"><i class="el-icon-message"></i>订单</template>
                    <el-menu-item-group>
                        <template slot="title">
                            <el-menu-item index="/orderOverview">订单概况</el-menu-item>
                            <el-menu-item index="/orderList">所有订单</el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-message"></i>资产</template>
                    <el-menu-item-group>
                        <template slot="title">
                            <el-menu-item index="/asset">收入概况</el-menu-item>
                            <el-menu-item index="/order">订单结算</el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="4" route="/customer">
                    <template slot="title"><i class="el-icon-message"></i>客户</template>
                </el-menu-item>
                <el-submenu index="5">
                    <template slot="title"><i class="el-icon-message"></i>技工</template>
                    <el-menu-item-group>
                        <template slot="title">
                            <el-menu-item index="/workers">技工</el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title"><i class="el-icon-message"></i>设置</template>
                    <el-menu-item-group>
                        <template slot="title">
                            <el-menu-item index="/configuration">设置</el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/" @click="signOut">
                    <i class="el-icon-setting"></i>
                    <span slot="title">退出</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            signOut() {
                this.$confirm('是否要退出登录?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.$store.commit('LOGIN_OUT');
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    this.$router.push('/login');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        },
    }
</script>

<style scoped>
    .el-container{
        height: 100%;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
