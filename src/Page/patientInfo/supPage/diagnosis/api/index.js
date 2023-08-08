import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import { model } from "../diagnosisViewModel";
import qs from "qs";

//获取评估列表信息
export function nursingDiagsSearch(obj) {
  return axios.post(
    `${apiPath}nursingDiags/search`,
    qs.stringify(obj)
  );
}

// 诊断护理措施
export function measure(code) {
  return axios.post(`${apiPath}nursingDiags/measure`, qs.stringify({ code }));
}

// 保存护理诊断
export function nursingDiagsSave(obj) {
  return axios.post(`${apiPath}nursingDiags/save`, obj);
}

export function editDiagnosis(obj) {
  return axios.post(`${apiPath}diagnosis/editDiagnosis`, obj);
}
export function deleteDiagnosis(obj) {
  return axios.post(`${apiPath}diagnosis/deleteDiagnosis`, qs.stringify(obj));
}
// 更新护理诊断
export function nursingDiagsUpdate(obj) {
  return axios.post(`${apiPath}nursingDiags/update`, obj);
}

// 获取护理诊断
export function nursingDiagsPatient(obj) {
  return axios.post(`${apiPath}nursingDiags/patient`, obj);
}

// 获取诊断数据详情
export function diagsDetails(patientId, visitId, diagCode) {
  return axios.post(
    `${apiPath}nursingDiags/getDiagByPVC`,
    qs.stringify({
      patientId,
      visitId,
      diagCode
    })
  );
}

// 获取护理诊断
export function nursingDiagsView(id) {
  return axios.get(`${apiPath}nursingDiags/view/${id}`);
}

// 删除护理诊断(单行)
export function nursingDiagsDel(creator, empNo, id) {
  return axios.post(`${apiPath}nursingDiags/delete`, { creator, empNo, id });
}
// 删除护理诊断(整单)
export function nursingDiagsDelAll(id) {
  return axios.get(`${apiPath}planForm/deleteByid/${id}`);
}

// 删除护理诊断
export function nursingDiagsStop(operator, empNo, id, evalType, evalContent) {
  return axios.post(`${apiPath}nursingDiags/stop`, {
    operator,
    empNo,
    id,
    evalType,
    evalContent
  });
}

// 获取护理计划单列表
export function getPlanFormListByPV(patientId, visitId) {
  return axios.get(
    `${apiPath}planForm/getPlanFormListByPV/${patientId}/${visitId}`
  );
}
// 新建护理计划单
export function savePlanForm(obj) {
  return axios.post(`${apiPath}/planForm/save`, obj);
}

// 贵州护理诊断签名接口
export const planListGuiZhou = (params,id)=>{
  return axios.get(`${apiPath}nursingDiags/sign/${id}`, {params});
}

// 聊城导入模板接口
export const importExcelApi = (body,wardCode)=>{
  return axios.post(`${apiPath}nursingDiags/importExcel/${wardCode}`, body);
}

// 聊城文本模板删除接口
export const deleteMeasureTargetsApi = (body)=>{
  return axios.post(`${apiPath}nursingDiags/deleteMeasureTargets`, body);
}

// 聊城文本模板下载接口
export const getTemplateApi = ()=>{
  return axios.get(`${apiPath}nursingDiags/getTemplate`,
  {
    responseType: "blob"
  });
}

// 获取对应体征的评估单
export const getMatchVital = (params) => {
  return axios.post(`${apiPath}match/vital`, params)
}

/**
 * 护理诊断计划签名
 * @param {*} params id: 护理诊断计划id, empNo, password, type: 普通签名："1"；评价签名："2"
 * @returns
 */
export const doDiagsSign = (params) => {
  return axios.post(`${apiPath}nursingDiags/sign`, params)
}
