import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

/*登录*/
import Login from './views/Login/Login'
import ForgetPassword from './views/Login/ForgetPassword'
import Register from './views/Login/Register'

/*第一次注册店铺*/
import CreateShop from './views/CreateShop/CreateShop'

import Header from './views/Header'

/*店铺*/
import ShopOverview from '@/views/Shop/ShopOverview'
import ShopContent from '@/views/Shop/ShopContent'
import InterpriseInfo from '@/views/Shop/InterpriseInfo'
import ShopStaff from '@/views/Shop/ShopStaff'

/*商品*/
import Goods from '@/views/Goods/Goods'
import GoodsAdd from '@/components/Goods/GoodsAdd'
import GoodsModify from '@/components/Goods/GoodsModify'

/*技工*/
import Workers from '@/views/Workers/Workers'
import AddWorker from '@/views/Workers/AddWorker'
import EditWorker from '@/views/Workers/EditWorker'

/*资产*/
import IncomeOverview from '@/views/Asset/IncomeOverview'
import OrderAccount from '@/views/Asset/OrderAccount'

/*客户*/
import Customer from '@/views/Customer/Customer'

/*设置*/
import Configuration from '@/views/Configuration/Configuration'

// 订单
import OrderList from '@/views/Order/OrderList'
import OrderOverview from '@/views/Order/OrderOverview'
import OrderDetail from '@/views/Order/OrderDetail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/password',
      component: ForgetPassword
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/createShop',
      name: 'CreateShop',
      component: CreateShop,
    },
    {
      path: '/',
      name: 'Header',
      component: Header,
      redirect: '/overview',
      children: [
          {
            path: '/overview',
            name: 'ShopOverview',
            component: ShopOverview,
            meta: {
              requireAuth: true
            },
          },
          {
              path: '/content',
              name: 'ShopContent',
              component: ShopContent,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/info',
              name: 'InterpriseInfo',
              component: InterpriseInfo,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/staff',
              name: 'ShopStaff',
              component: ShopStaff,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/goods',
              name: 'Goods',
              component: Goods,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/goodsAdd',
              name: 'GoodsAdd',
              component: GoodsAdd,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/goodsModify',
              name: 'GoodsModify',
              component: GoodsModify,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/asset',
              name: 'IncomeOverview',
              component: IncomeOverview,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/order',
              name: 'OrderAccount',
              component: OrderAccount,
              meta: {
                  requireAuth: true
              },
          },
          {
              path:'/orderList',
              name: 'OrderList',
              component:OrderList,
              meta: {
                  requireAuth: true
              },
          },
          {
              path:'/orderOverview',
              name: 'OrderOverview',
              component:OrderOverview,
              meta: {
                  requireAuth: true
              },
          },
          {
              path:'/orderDetail',
              name: 'OrderDetail',
              component:OrderDetail,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/customer',
              name: 'Customer',
              component: Customer,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/workers',
              name: 'Workers',
              component: Workers,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/addWorker',
              name: 'AddWorker',
              component: AddWorker,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/editWorker',
              name: 'EditWorker',
              component: EditWorker,
              meta: {
                  requireAuth: true
              },
          },
          {
              path: '/configuration',
              name: 'Configuration',
              component: Configuration,
              meta: {
                  requireAuth: true
              },
          }
      ]
    },
  ]
});

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if (sessionStorage.getItem('shopId')) {// 判断是否登录
            next()
        } else {// 没登录则跳转到登录界面
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next()
    }
});

export default router;
