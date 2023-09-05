import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取数据
export function getNursingVisitLc(obj) {
  return axios.post(`${apiPath}nursingVisitLc/listLingChenPc`, obj);
}
export function exportExcel(obj) {
  return axios.post(
      `${apiPath}nursingVisitLc/exportNursingVisitList`,
      obj, {
      responseType: "blob"
  }
  );
}


// 删除
export function deleteOperateDateLingChen(obj) {
  return axios.post(`${apiPath}nursingVisitLc/deleteOperateDateLingChen`, obj);
}

// 修改保存
export function updateOperateDateLingChen(obj) {
  return axios.post(`${apiPath}nursingVisitLc/updateOperateDateLingChen`, obj);
}
//pc巡视录入
export function addNursingVisitPda(obj) {
  return axios.post(`${apiPath}nursingVisit/addNursingVisitPda`, obj);
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
