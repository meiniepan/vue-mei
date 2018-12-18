<template>
    <el-container>
        <el-aside width="200px">
            <el-menu :default-openeds="['1', '2']"  :router="true" :default-active="$route.path">
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
        name: "Header"
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