import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取疫苗列表-分页查询
export function getPageList(query) {
    return axios.post(`${apiPath}vaccineStock/getPageList`, query);
}
// 添加疫苗
export function saveVaccine(query) {
    return axios.post(`${apiPath}vaccineStock/saveVaccine`, query);
}
// 修改疫苗
export function updateVaccine(query) {
    return axios.post(`${apiPath}vaccineStock/updateVaccine`, query);
}
// 删除疫苗
export function deleteVaccine(id) {
    return axios.post(`${apiPath}vaccineStock/deleteVaccine`, qs.stringify({ id }));
}