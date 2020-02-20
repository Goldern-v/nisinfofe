import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 根据患者id获取血糖记录
export function getListByParam(obj) {
    return axios.post(
        `${apiPath}follow/getListByParam`,
        obj
    );
}

//根据患者ID获取健康宣教内容
export function getDataById(id) {
    return axios.get(`${apiPath}form/design/get/${id}`);
}




