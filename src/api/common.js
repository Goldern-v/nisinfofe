// 登录模块api
import axios from "./axios";
import { apiPath } from "./apiConfig";
import qs from "qs";

//  设置头像
export function profilePicture(imageId) {
  return axios.get(`${apiPath}user/profilePicture/${imageId}`);
}
//  设置签名
export function signaturePicture(imageId) {
  return axios.get(`${apiPath}user/signaturePicture/${imageId}`);
}
//  获取本科室所有护士列表
export function userDictInfo(deptCode) {
  return axios.get(`${apiPath}user/userDictInfo/${deptCode}`);
}

// 获取字典项
export const listItem = (code, recordCode) => {
  return axios.post(
    `${apiPath}dept/dictInfo`,
    qs.stringify({ code, recordCode })
  );
};
// 通过列表获取字典列表
export const multiDictInfo = (list, recordCode) => {
  return axios.post(`${apiPath}dept/multiDictInfo`, list);
};
/** 搭配multiDictInfo使用 */
export function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item);
  }
}

/** 新增自定义标题
 * "dictCode":"自定义标题",
 * "dictName":"自定义标题",
 * "itemCode":"疼痛评分",
 * "itemName":"疼痛评分",
 * "recordCode":"jointnew",
 * "wardCode":"4002"
 */
export function dictSave(data) {
  return axios.post(`${apiPath}/dict/save`, data);
}
export function dictUpdate(data) {
  return axios.post(`${apiPath}/dict/update`, data);
}
/**
 * "dictCode":"自定义标题",
 * "itemCode":"疼痛评分",
 * "recordCode":"jointnew",
 * "wardCode":"4002"
 */
export function dictDelete(data) {
  return axios.post(`${apiPath}/dict/delete`, data);
}

//病人信息
export const getPatientInfo = (patientId, visitId) => {
  return axios.get(`${apiPath}patient/info/${patientId}/${visitId}`);
};

// 'getLastDetail form_childbirth',
//获最新一张某种评估单信息
export function getLastDetail(formCode, patientId, visitId) {
  return axios.post(`${apiPath}form/getLastDetail`, {
    formCode,
    patientId,
    visitId,
  });
}
