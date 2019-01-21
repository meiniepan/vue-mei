import axios from "axios/index";
import { Message } from 'element-ui'
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
                }else{
                    return Message.error(res.data.message);
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
                    return Message.error(res.data.message);
                }
            });
    },
    /*编辑商品*/
    modifyGoods(modifyData) {
        return axios.post('/service/modify', modifyData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*获取商品详情*/
    getGoodsDetail(detailData) {
        return axios.post('/service/detail', detailData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*获取所有商品列表*/
    getGoods(shopData) {
        return axios.post('/service/get',shopData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.serviceList;
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*商品下架*/
    goodsShelves(GoodsData) {
        return axios.post('/service/off',GoodsData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*商品删除*/
    goodsDelete(serviceId) {
        return axios.post('/service/delete', serviceId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*获取所有技工列表*/
    getMechanic(mechanicList) {
        return axios.post('/shop/mechanic/get',mechanicList)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.mechanicSet;
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*新增技工*/
    addMechanic(mechanicData) {
        return axios.post('/mechanic/create', mechanicData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }else{
                    return Message.error(res.data.message);
                }
            });
    },
    /*编辑技工*/
    modifyMechanic(mechanicId) {
        return axios.post('/mechanic/modify', mechanicId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*删除技工*/
    deleteMechanic(mechanicId) {
        return axios.post('/shop/mechanic/remove', mechanicId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*资产总销售额*/
    getTotalSales(salesData) {
        return axios.post('/shop/revenue/history', salesData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.revenue;
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*获取权限列表接口*/
    getAdminAuthority () {
        return axios.get('/permission/get')
            .then((res) => {
                if(res.data.code === 200) {
                    return res.data.data.permissionList
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*新增店铺管理员*/
    addShopAdmin(adminData) {
        return axios.post('/staff/add', adminData)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*获取所有管理员信息*/
    getAdminList(shopId) {
        return axios.post('/shop/staff/get', shopId)
            .then((res) => {
                if(res.data.code === 200) {
                    return res.data.data.rvalList
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*编辑管理员*/
    modifyStaff(staffId) {
        return axios.post('/shop/staff/modify', staffId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*删除管理员*/
    deleteStaff(staffId) {
        return axios.post('/shop/staff/delete', staffId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code
                }else{
                    return Message.error(res.data.message);
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
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*创建店铺*/
    addShop(data) {
        return axios.post('/shop/create', data)
            .then((res) => {
                return res.data;
            })
    },
    /*获取店铺信息*/
    getShopMsg(shopId) {
        return axios.post('/shop/detail', shopId).then((res) => {
            if(res.data.code){
                return res.data.data
            }else{
                return Message.error(res.data.message);
            }
        })
    },
    /*获取店铺服务销量前10*/
    getShopSalesVolume(shopId) {
        return axios.post('/shop/order/get', shopId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.orderList
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*获取客户列表*/
    getCustomerList(requestData) {
        return axios.post('/shop/customer/get', requestData)
            .then((res) => {
                if(res.data.code === 200) {
                    return res.data.data.customerIdList;
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*获取所有订单*/
    getOrderList(shopId) {
        return axios.post('/shop/order/get', shopId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data.orderList
                }else{
                    return Message.error(res.data.message);
                }
            });
    },
    /*获取订单详情*/
    getOrderDetail(orderId) {
        return axios.post('/orderimpl/detail', orderId)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.data
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*登录*/
    login(idData) {
        return axios.post('/merchant/login', idData)
            .then((res) => {
                return res.data;
            })
    },
    /*注册*/
    merchantCreate(data) {
        return axios.post('/merchant/create', data)
            .then((res) => {
                return res.data;
            })
    },
    /*设置*/
    configuration(data) {
        return axios.post('/configure', data)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }else{
                    return Message.error(res.data.message);
                }
            })
    },
    /*忘记密码*/
    forgetPassword(data) {
        httpPost('/password/retrieve', data);
    },
    /*发送验证码*/
    getCode(data) {
        httpPost('/captcha/', data);
    },
    /*验证验证码*/
    checkCode(data) {
        return axios.post('/captcha/check', data)
            .then((res) => {
                if(res.data.code === 200){
                    return res.data.code;
                }else{
                    return Message.error(res.data.message);
                }
            })
    }
};

function httpPost(httpUrl, paramet) {
    return axios.post(httpUrl, paramet)
        .then((res) => {
            console.log(res);
            if(res.data.code === 200){
                if(res.data.data){
                    console.log('数据');
                    return res.data.data;
                }else{
                    console.log('信息');
                    return Message.success(res.data.message);
                }
            }else{
                return Message.error(res.data.message);
            }
        })
}

export default interfaceData;
