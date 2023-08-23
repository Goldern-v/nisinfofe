import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from 'qs';

// 科室患者归档列表
export function getArchiveList(data) {
  return axios.post(
    `${apiPath}print/archive/list`, data
  );
}
export function uploadBatch(data) {
  return axios.post(
    `${apiPath}print/archive/uploadBatch`, data
  );
}
export function genDocBatch(data) {
  return axios.post(
    `${apiPath}print/archive/genDocBatch`, data
  );
}
// 获取pdf详情信息
export function pdfInfoList(data) {
  return axios.post(`${apiPath}print/archive/info/list`, data)
}
// 单个表单重转pdf
export function generateArchiveNewSingle(data) {
  return axios.post(`${apiPath}print/archive/genDocSingle`, data);
}
//  生成归档文件-新版
export function generateArchiveNew(patientId, visitId) {
  return axios.get(
    `${apiPath}print/archive/genDocNew/${patientId}/${visitId}`);
}
//  生成归档文件
export function generateArchive(patientId, visitId) {
  return axios.get(
    `${apiPath}print/archive/genDoc/${patientId}/${visitId}`);
}
// 预览归档文件
export function previewArchive(patientId, visitId) {
  return axios.get(
    `${apiPath}print/archive/detail/${patientId}/${visitId}`);
}
// 文件归档上传
export function uploadFileArchive(patientId, visitId, dutyNurse, qcNurse) {
  if(process.env.HOSPITAL_ID == 'nfyksdyy'){
    return axios.get(
      `${apiPath}print/archive/upload/${patientId}/${visitId}?dutyNurse=${dutyNurse}&qcNurse=${qcNurse}`,);
  }else{
    return axios.get(
      `${apiPath}print/archive/upload/${patientId}/${visitId}`);
  }
}
// 获取用户配置
export function getConfig() {
  return axios.get(
    `${apiPath}config/getConfig`);
}
// 归档：取消归档
export function canCancelArchive(patientId, visitId) {
  return axios.get(
    `${apiPath}print/archive/cancel/${patientId}/${visitId}`);
}

// 是否开启自动归档
export function getAchivePrintConfig() {
  return axios.get(
    `${apiPath}dict/dictInfo/archivePrintConfig`);
}

/**
 * 申请召回
 * @returns
 */
export function recallApply(params) {
  return axios.post(`${apiPath}print/archive/recallApply`, params)
}
/**
 * 撤销
 * @returns
 */
export function recallCancel(params) {
  return axios.post(`${apiPath}print/archive/recallCancel`, params)
}
/**
 * 审批
 * @returns
 */
export function recallAudit(params) {
  return axios.post(`${apiPath}print/archive/recallAudit`, params)
}

/**
 * /api/print/archive/uploadBatchSelect
 * 批量选择归档
 */
export function uploadBatchSelect(params) {
  return axios.post(`${apiPath}print/archive/uploadBatchSelect`, params)
}
/**
 * /api/print/archive/genDocBatchSelect
 * 批量选择转pdf
 */
export function genDocBatchSelect(params) {
  return axios.post(`${apiPath}print/archive/genDocBatchSelect`, params)
}

//获取护士列表
export const getAllNurseNamePinyin = (list) => {
  return axios.post(`${apiPath}user/getAllNurseNamePinyin`,
  {deptCodeMultiple:list});
};
