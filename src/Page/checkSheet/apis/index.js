import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";

// 查询病区科室
export function listDepartment(parentCode) {
    return axios.get(`${apiPath}wardDaily/getDeptWithWardcode/${parentCode}`);
  }
// 创建查对表
export function createShiftRecord(
  deptCode,
  startData,
  endData
) {
  return axios.post(`${apiPath}ordercheckmaster/createOrderCheck`, {
    deptCode,
    startData,
    endData
  });
}

export function listShiftRecord(
  deptCode,startDate,endDate
) {
  return axios.get(`${apiPath}ordercheckmaster/list/${deptCode}/${startDate}/${endDate}`);
}
// 获取table的内容
export function getOrderCheckByData(
  orderCheckId
) {
  return axios.get(`${apiPath}ordercheckmaster/getOrderCheckByData/${orderCheckId}`);
}

// 保存table的内容
export function saveOrderCheck(data) {
  return axios.post(`${apiPath}ordercheckmaster/saveOrderCheck`,data);
}
