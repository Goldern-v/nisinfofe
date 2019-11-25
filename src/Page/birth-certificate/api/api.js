import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";
//获取记录单
export function getList(query) {
    return axios.post(`${apiPath}birthMedicalCertifi/getListByPatInfo`, query);
}
//删除出生医学证明记录
export function deleteForm(id) {
    return axios.get(`${apiPath}birthMedicalCertifi/delete/${id}`);
}
//获取出生医学证明表单内容
export function getBirthCertInfo(params) {
    return axios.post(`${apiPath}obstetricBirthFormControl/getByPVList`, params);
}
// 签名
export function getUser(password, empNo) {
    return axios.post(`${apiPath}user/getUser`, { password, empNo });
}
// 保存出生医学证明表单
export function saveBirthCertInfo(data) {
    return axios.post(`${apiPath}birthMedicalCertifi/saveOrUpdate`, data);
}
//获取孕妇信息
export function getPuerperaInfo(query) {
    return axios.post(`${apiPath}obstetricBirthFormControl/getFrom`, query);
}
