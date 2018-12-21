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

/*设置*/
import Configuration from '@/views/Configuration/Configuration'

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
              component: Goods
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
