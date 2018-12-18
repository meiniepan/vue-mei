import Vue from 'vue'
import Router from 'vue-router'

import Header from './views/Header'

/*店铺*/
import ShopOverview from '@/views/Shop/ShopOverview'
import ShopContent from '@/views/Shop/ShopContent'
import InterpriseInfo from '@/views/Shop/InterpriseInfo'
import ShopStaff from '@/views/Shop/ShopStaff'

/*商品*/
import Goods from '@/views/Goods/Goods'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
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
