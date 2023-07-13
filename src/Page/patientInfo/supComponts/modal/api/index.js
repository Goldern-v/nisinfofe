// 登录模块api
import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

// 保存床头卡信息
export function saveOrUpdate(data) {
  return axios.post(`${apiPath}patient/PatientBedLabel/saveOrUpdate`, data);
}

// 保存床头卡各项信息
export function saveBed(data) {
  return axios.post(`${apiPath}patient/PatientBedLabel/save`, data);
}

export function getLCPStatus(data) {
  return axios.post(`${apiPath}indexInfo/getLCPStatus`, data);
}

// 根据patientId和visitId查询病人床头标签
export function getEntity(patientId, visitId) {
  return axios.get(
    `${apiPath}patient/PatientBedLabel/getEntity/${patientId}/${visitId}`
  );
}

// 根据姓名、或者拼音首字母、或者空白查找主管医生姓名
export function findByKeyword(keyword) {
  return axios.get(
    `${apiPath}patient/MainDoctorDict/findByKeyword?keyword=${keyword}`
  );
}
// 根据姓名、或者拼音首字母、或者空白查找责任护士姓名
export function findByKeywordNur(keyword) {
  return axios.get(
    `${apiPath}patient/DutyNurseDict/findByKeyword?keyword=${keyword}`
  );
}

// 归档打印列表
export function printArchive(patientId, visitId) {
  return axios.get(`${apiPath}print/archive/${patientId}/${visitId}`);
}

// 归档状态设置
export function updatePrintStatus(obj) {
  return axios.post(`${apiPath}print/updatePrintStatus`, obj);
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
