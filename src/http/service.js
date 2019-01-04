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
    /*获取所有商品*/
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
    }
};
export default interfaceData;

