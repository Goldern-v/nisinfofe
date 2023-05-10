import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

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
export function uploadFileArchive(patientId, visitId) {
  return axios.get(
    `${apiPath}print/archive/upload/${patientId}/${visitId}`);
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
