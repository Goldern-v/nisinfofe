// 登录模块api
import axios from "@/api/axios";
import {
  apiPath
} from "@/api/apiConfig";
import qs from "qs";

// 根据患者id获取血糖记录
export function getSugarListWithPatientId(patientId, visitId) {
  return axios.post(
    `${apiPath}threeTest/getSugarListWithPatientId`,
    qs.stringify({
      patientId,
      visitId
    })
  );
}

// 批量创建或修改血糖(json格式)，如果是修改血糖需要传回oldRecordDay
export function saveSugarList(list) {
  return axios.post(`${apiPath}threeTest/saveBatchSugar`, {
    list
  });
}

// 根据详细信息删除血糖记录
export function removeSugar(item) {
  return axios.post(`${apiPath}threeTest/deleteSugar`, qs.stringify(item));
}

// 获取用户信息
export function getUser(password, empNo) {
  return axios.post(`${apiPath}user/getUser`, {
    password,
    empNo
  });
}

// 获取起始页码
export function getPvHomePage(patientId, visitId) {
  return axios.post(`${apiPath}form/pvHomePage/get`, {
    patientId,
    visitId,
    formType: "sugar",
    formCode: "procedure"
  });
}
// 保存起始页码
export function savePvHomePage(patientId, visitId, indexNo) {
  return axios.post(`${apiPath}form/pvHomePage/save`, {
    patientId,
    visitId,
    indexNo,
    formType: "sugar",
    formCode: "procedure"
  });
}

// 血糖字典项
export function getTypeList(wardCode) {
  return axios.get(`${apiPath}threeTest/type/${wardCode}`);
}
// 获取血糖字典项(花都)
export const getDictItems = (code) => {
  return axios.post(`${apiPath}dept/dictInfo`, qs.stringify({ code }))
}
//  保存血糖字典项(花都)
export function saveDictItems(data) {
  return axios.post(`${apiPath}dept/saveDictInfo`, data);
}
// 血糖字典项(陵城)
export function getSugarItemDict() {
  return axios.get(`${apiPath}sugar/getSugarItemDict`);
}
// 修改患者年龄
export function getEditAge(patientId, visitId, itemMap) {
  return axios.post(`${apiPath}form/modifyFormHead`, {
    patientId,
    visitId,
    formCode: "sugar",
    itemMap,
  });
}
// export function getEditAge(data) {
//   return axios.post(`${apiPath}form/modifyFormHead`, {
//     data
//   });
// }
// 获取年龄
export function getFormHeadData(patientId, visitId) {
  return axios.get(`${apiPath}form/getFormHeadData/${patientId}/${visitId}/sugar`);
}

/**获取打印记录 */
export function getPrintRecord(params, formType, formCode) {
  return axios.post(`${apiPath}form/common/getPrintRecord`, params)
}