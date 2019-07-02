import axios from "axios";
import { apiPath } from "./apiConfig";
// import { queryInfo } from "@/common/tool.js";
import qs from 'qs'
// 保存新表单
export function save(
  formCode,
  data,
  formType = "monitor"
) {
  return axios.post(`${apiPath}${formType}/${formCode}/save`, data);
}
// 根据id获取数据
export function getDataById(
  formCode,
  id,
  formType = "monitor"
) {
  return axios.get(`${apiPath}${formType}/${formCode}/get/${id}`);
}
// 签名
export function sign(
  formCode,
  data,
  formType = "monitor"
) {
  return axios.post(`${apiPath}${formType}/${formCode}/sign`, data);
}
// 取消签名
export function cancelSign(
  formCode,
  data,
  formType = "monitor"
) {
  return axios.post(`${apiPath}${formType}/${formCode}/cancelSign`, data);
}
// 删除记录
export function del(
  formCode,
  data,
  formType = "monitor"
) {
  return axios.post(`${apiPath}${formType}/${formCode}/deleteRecord`, data);
}

// 删除
/**
 * @param  {} formCode
 * @param  {} data
 * @param  {} formType [monitor, report]
 */
export function delForm(
  formCode,
  data,
  formType = "monitor"
) {
  return axios.post(`${apiPath}${formType}/${formCode}/delete`, data);
}

// export function listForm(formType = "monitor") {
//   let data = {
//     patientId: queryInfo.patientId,
//     visitId: queryInfo.visitId
//   };
//   return axios.post(
//     `${apiPath}${formType}/${queryInfo.formCode}/whole/list`,
//     data
//   );
// }

// 获取字典项
export const getDictItems = (code) => {
  return axios.post(`${apiPath}dept/dictInfo`, qs.stringify({ code }))
}

// getByPV
// 根据id获取数据
export function getDataByPV(
  formCode,
  patientId,
  visitId,
  formType = "monitor"
) {
  return axios.get(`${apiPath}${formType}/${formCode}/getByPV/${patientId}/${visitId}`);
}
