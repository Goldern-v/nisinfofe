import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取扁平管理列表
export function getList(query) {
    return axios.post(`${apiPath}workAccount/listWorkAccount`, query);
}

// 获取扁平管理类型
export function getTypeByDeptCode(query) {
    return axios.post(`${apiPath}flatManageInstance/getMangeTypeList`, qs.stringify(query));
}