import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: window.sessionStorage.getItem('name'),
        shopId: window.sessionStorage.getItem('shopId'),
    },
    actions: {
        changeCity (ctx,city) {
            ctx.commit('changeCity',city)
        }
    },
    mutations: {
        changeCity (state,city) {
            state.city = city
        },
        //设置店铺id
        SET_SHOP_ID (state, data) {
            state.shopId = data;
            window.sessionStorage.setItem('shopId', data);
        },
        //设置店铺名字
        SET_NAME (state, data) {
            state.name = data;
            window.sessionStorage.setItem('name', data);
        },
        //退出登录
        LOGIN_OUT (state) {
            state.shopId = null;
            state.name = null;
            window.sessionStorage.removeItem('shopId');
            window.sessionStorage.removeItem('name');
        }
    }
})
