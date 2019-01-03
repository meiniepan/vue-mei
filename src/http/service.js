import axios from "axios/index";
import {BASE_URL} from "./index";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = BASE_URL;

const interfaceData = {
    /*login*/
    addLogin(paramsdata) {
        return axios.post('/service/create', paramsdata)
            .then((res) => {
                return res.data;
            });

    },
    /*获取*/
    getList(paramsdata) {
        return axios.get('/servicecategory/get',paramsdata)
            .then((res) => {
            return res.data;
        })
    }
};
export default interfaceData;

