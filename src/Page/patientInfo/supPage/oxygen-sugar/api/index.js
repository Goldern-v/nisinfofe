// 登录模块api
import axios from "@/api/axios";
import {
  apiPath
} from "@/api/apiConfig";
import qs from "qs";

// 旧多行表单新建接口
/**新建和保存表单 */
export const save = (params, formType, formCode) => {
  return axios.post(`${apiPath}${formType}/${formCode}/save`, params)
}
/**获取患者存在表单id */
export const getPatientForm = (patientId, visitId) => {
  if (process.env.HOSPITAL_ID == 'whfk') {
    return axios.get(`${apiPath}eval/sugar_oxygen/getPatientForm/${patientId}/${visitId}`)
  } else {
    return axios.get(`${apiPath}others/sugar_oxygen/getPatientForm/${patientId}/${visitId}`)
  }
}

//批量删除单条记录
export const deleteRecord = (params, formType, formCode) => {
  return axios.post(`${apiPath}${formType}/${formCode}/deleteRecord`, params);
}

/**删除表单 */
export const deleteForm = (params = {
  id: '',
  empNo: '',
  password: '',
}, formType, formCode) => {
  return axios.post(`${apiPath}${formType}/${formCode}/delete`, params)
}

/**行数据签名 */
export const rowSign = (params, formType, formCode) => {
  return axios.post(`${apiPath}${formType}/${formCode}/sign`, params)
}

/**行数据取消签名 */
export const cancelRowSign = (params, formType, formCode) => {
  return axios.post(`${apiPath}${formType}/${formCode}/cancelSign`, params)
}

/**公共表单接口 -- 签名 */
export const sign = (
  params = {
    id: '',
    empNo: '',
    password: '',
  }
) => {
  return axios.post(`${apiPath}form/common/sign`, params)
}

/**公共表单接口 -- 取消签名 */
export const cancelSign = (
  params = {
    id: '',
    empNo: '',
    password: '',
  }
) => {
  return axios.post(`${apiPath}form/common/cancelSign`, params)
}

/**公共表单接口 -- 其他签名 */
export const signMap = (
  params = {
    id: '',
    empNo: '',
    password: '',
    signerType: '',
    // washNurse 洗手护士
    // supplyNurse 巡回护士
  }
) => {
  return axios.post(`${apiPath}form/common/signMap`, params)
}

/**公共表单接口 -- 取消其他签名 */
export const cancelSignMap = (
  params = {
    id: '',
    empNo: '',
    password: '',
    signerType: '',
  }
) => {
  return axios.post(`${apiPath}form/common/cancelSignMap`, params)
}

/**获取表单数据 */
export const getForm = (id, formType, formCode) => {
  return axios.get(`${apiPath}${formType}/${formCode}/get/${id}`)
}

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