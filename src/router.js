import Vue from 'vue'
import Router from 'vue-router'

/*登陆*/
import Login from './views/Login/Login'
import ForgetPassword from './views/Login/ForgetPassword'

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

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/password',
      component: ForgetPassword
    },
    {
      path: '/overview',
      name: 'header',
      component: Header,
      children: [
          {
            path: '/overview',
            component: ShopOverview
          },
          {
              path: '/content',
              component: ShopContent
          },
          {
              path: '/info',
              component: InterpriseInfo
          },
          {
              path: '/staff',
              component: ShopStaff
          },
          {
              path: '/goods',
              component: Goods,
          },
          {
              path: '/goodsAdd',
              name: 'GoodsAdd',
              component: GoodsAdd
          },
          {
              path: '/goodsModify',
              component: GoodsModify
          },
          {
              path: '/asset',
              component: IncomeOverview
          },
          {
              path: '/order',
              component: OrderAccount
          },
          {
              path:'/orderList',
              component:OrderList
          },
          {
              path:'/orderOverview',
              component:OrderOverview
          },
          {
              path:'/orderDetail',
              name: 'OrderList',
              component:OrderDetail
          },
          {
              path: '/customer',
              component: Customer
          },
          {
              path: '/workers',
              component: Workers
          },
          {
              path: '/addWorker',
              component: AddWorker
          },
          {
              path: '/editWorker',
              component: EditWorker
          },
          {
              path: '/configuration',
              component: Configuration
          }
      ]
    },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
    }*/
  ]
})
