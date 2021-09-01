import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取工作量统计列表
export function getList(query) {
    return axios.post(`${apiPath}workAccount/listWorkAccount`, query);
}

// 获取工作量统计列表（中山七）
export function getListZSQ(query) {
    return axios.post(`${apiPath}hisZhongShanQiYuanExecute/getNursingwork`, query);
}

// 获取工作量统计列表（江门妇幼）
export function getListJMFY(query) {
    return axios.post(`${apiPath}workAccount/listWorkAccountJm`, query);
}

