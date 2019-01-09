import axios from "axios/index";
import {BASE_URL} from "./index";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = BASE_URL;

const interfaceData = {
    /*获取服务分类*/
    getClassify(classify) {
        return axios.post('/servicecategory/get',classify)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data.cateList;
                }
            })
    },
    /*添加商品*/
    addGoods(paramsdata) {
        return axios.post('/service/create', paramsdata)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data;
                }
            });

    },
    /*获取所有商品列表*/
    getGoods(shopData) {
        return axios.post('/service/get',shopData)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data.serviceList;
                }
            })
    },
    /*商品下架*/
    goodsShelves(GoodsData) {
        return axios.post('/service/off',GoodsData)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data.status;
                }
            })
    },
    /*获取所有技工列表*/
    getMechanic(mechanicList) {
        return axios.post('/mechanic/get',mechanicList)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data.mechanicSet;
                }
            })
    },
    /*获取技工信息*/
    getMechanicOrder(orderId) {
        return axios.post('/mechanic/order/get',orderId)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data.orderList;
                }
            })
    },
    /*新增技工*/
    addMechanic(mechanicData) {
        return axios.post('/mechanic/create', mechanicData)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data;
                }
            });
    },
    /*资产总销售额*/
    getTotalSales(salesData) {
        return axios.post('/shop/revenue/history', salesData)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data.revenue;
                }
        })
    },
    /*获取权限列表接口*/
    getAdminAuthority () {
        return axios.get('/permission/get')
            .then((res) => {
                if(res.data.status === 200) {
                    return res.data.permissionList
                }
            })
    },
    /*新增店铺管理员*/
    addShopAdmin(adminData) {
        return axios.post('/staff/add', adminData)
            .then((res) => {
                if(res.data.status === 200){
                    return res.data.status;
                }
            })
    },
    /*获取所有管理员信息*/
    getAdminList(shopId) {
        return axios.post('/shop/staff/get', shopId)
            .then((res) => {
                if(res.data.status === 200) {
                    return res.data.rvalList
                }
            })
    }
};
export default interfaceData;

