import axios from "axios/index";
import {BASE_URL} from "./index";
import BIN from 'bankcardinfo'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = BASE_URL;

const interfaceData = {
    /*获取服务分类*/
    getClassify(classify) {
        return axios.post('/servicecategory/get',classify)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.cateList;
                }
            })
    },
    /*添加商品*/
    addGoods(paramsdata) {
        return axios.post('/service/create', paramsdata)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }else{
                    return res.data.code;
                }
            });
    },
    /*编辑商品*/
    modifyGoods(modifyData) {
        return axios.post('/service/modify', modifyData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }
            })
    },
    /*获取商品详情*/
    getGoodsDetail(detailData) {
        return axios.post('/service/detail', detailData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data
                }else if(res.data.code === 203){
                    return res.data.message
                }
            })
    },
    /*获取所有商品列表*/
    getGoods(shopData) {
        return axios.post('/service/get',shopData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.serviceList;
                }
            })
    },
    /*商品下架*/
    goodsShelves(GoodsData) {
        return axios.post('/service/off',GoodsData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }
            })
    },
    /*商品删除*/
    goodsDelete(serviceId) {
        return axios.post('/service/delete', serviceId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }
            })
    },
    /*获取所有技工列表*/
    getMechanic(mechanicList) {
        return axios.post('/shop/mechanic/get',mechanicList)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.mechanicSet;
                }
            })
    },
    /*新增技工*/
    addMechanic(mechanicData) {
        return axios.post('/mechanic/create', mechanicData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }
            });
    },
    /*编辑技工*/
    modifyMechanic(mechanicId) {
        return axios.post('/mechanic/modify', mechanicId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }
            })
    },
    /*删除技工*/
    deleteMechanic(mechanicId) {
        return axios.post('/shop/mechanic/remove', mechanicId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }
            })
    },
    /*资产总销售额*/
    getTotalSales(salesData) {
        return axios.post('/shop/revenue/history', salesData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.revenue;
                }
            })
    },
    /*获取权限列表接口*/
    getAdminAuthority () {
        return axios.get('/permission/get')
            .then((res) => {
                if(res.data.code === 200) {
                    return res.data.data.permissionList
                }
            })
    },
    /*新增店铺管理员*/
    addShopAdmin(adminData) {
        return axios.post('/staff/add', adminData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }
            })
    },
    /*获取所有管理员信息*/
    getAdminList(shopId) {
        return axios.post('/shop/staff/get', shopId)
            .then((res) => {
                if(res.data.code === 200) {
                    return res.data.data.rvalList
                }
            })
    },
    /*编辑管理员*/
    modifyStaff(staffId) {
        return axios.post('/shop/staff/modify', staffId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }
            })
    },
    /*删除管理员*/
    deleteStaff(staffId) {
        return axios.post('/shop/staff/delete', staffId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }
            })
    },
    /*获取银行开户信息*/
    getBankMsg(bankAccount) {
        return BIN.getBankBin(bankAccount)
            .then(function (data) {
                return data;
            })
            .catch(function (err) {
                return err;
            })
    },
    /*新增企业信息*/
    addCorporation(corporateData) {
        return axios.post('/corporation/add', corporateData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }
            })
    },
    /*创建店铺*/
    addShop(shopMsg) {
        return axios.post('/shop/create', shopMsg)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }
            })
    },
    /*获取店铺信息*/
    getShopMsg(shopId) {
        return axios.post('/shop/detail', shopId).then((res) => {
            if(res.data.code){
                return res.data.data
            }
        })
    },
    /*获取店铺服务销量前10*/
    getShopSalesVolume(shopId) {
        return axios.post('/shop/order/get', shopId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.orderList
                }
            })
    },
    /*获取客户列表*/
    getCustomerList(requestData) {
        return axios.post('/shop/customer/get', requestData)
            .then((res) => {
                if(res.data.code === 200) {
                    return res.data.data.customerIdList;
                }
            })
    }
};
export default interfaceData;
