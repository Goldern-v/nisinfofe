import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取数据
export function getNursingVisitLc(obj) {
  if (process.env.HOSPITAL_ID === 'nfyksdyy') {
    return axios.post(`${apiPath}nursingVisitLc/listLingChenPcByPatient`, obj);
  }
  return axios.post(`${apiPath}nursingVisitLc/listLingChenPc`, obj);
}

// 删除
export function deleteOperateDateLingChen(obj) {
  return axios.post(`${apiPath}nursingVisitLc/deleteOperateDateLingChen`, obj);
}

// 修改保存
export function updateOperateDateLingChen(obj) {
  return axios.post(`${apiPath}nursingVisitLc/updateOperateDateLingChen`, obj);
}

// 查看科室巡视管理员权限
export function findRoleList(deptCode) {
  let obj = {
    deptCode
  };
  return axios.post(`${apiPath}nursingVisitLc/findRoleList`, obj);
}

// 保存科室巡视管理员权限
export function saveRoleList(obj) {
  return axios.post(`${apiPath}nursingVisitLc/saveRoleList`, obj);
}
