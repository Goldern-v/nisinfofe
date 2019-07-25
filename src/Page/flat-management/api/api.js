import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取扁平管理列表
export function getList(query) {
    return axios.post(`${apiPath}flatManageInstance/getListByParams`, query);
}

export function getFileContent(query) {
    return axios.post(`${apiPath}nursingInstitution/getFileContent`, qs.stringify(query), { responseType: 'blob' });
}

// 获取扁平管理类型
export function getTypeByDeptCode(query) {
    return axios.post(`${apiPath}flatManageInstance/getTypeByDeptCode`, qs.stringify(query));
}

export function getCatalogByType(type) {
    return axios.post(`${apiPath}/nursingInstitution/getCatalogByType`, qs.stringify({ type }))
}