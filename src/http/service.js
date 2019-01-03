import axios from "axios/index";
import {BASE_URL} from "./index";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = BASE_URL;

const interfaceData = {
    /*服务分类*/
    getClassify(classify) {
        return axios.get('/servicecategory/get',classify)
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
                return res.data;
            });

    },
};
export default interfaceData;

