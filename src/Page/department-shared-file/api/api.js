import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取科室共享文件列表
export function getList(query) {
    return axios.post(`${apiPath}deptShareFile/getList`, query);
}

// 预览科室共享文件
export function getFileContent(query) {
    return axios.post(`${apiPath}deptShareFile/getFileContent`, qs.stringify(query), { responseType: 'blob' });
}
// 获取目录列表
export function getCatalogByParam(data) {
    return axios.post(`${apiPath}deptShareFile/getCatalogByParam`, data);
}

export function getFileTypes() {
    return axios.get(`${apiPath}nursingInstitution/getTypeDict`);
}