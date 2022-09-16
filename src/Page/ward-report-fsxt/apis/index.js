import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
const HOSPITAL_ID = process.env.HOSPITAL_ID;

// 查询病区科室
export function listDepartment(parentCode) {
  return axios.get(`${apiPath}wardDaily/getDeptWithWardcode/${parentCode}`);
}

// 查询患者信息
export function getPatient(deptCode, bedLabel, date) {
  return axios.get(
    `${apiPath}changeShiftPatientList/findByBedLabel/${deptCode}/${bedLabel}/${date}`
  );
}

// 查询模板列表
export function listTemplate(deptCode, type, templateType, title) {
  return axios.post(`${apiPath}changeShiftTemplate/list`, {
    deptCode,
    type,
    templateType,
    title
  });
}

// 删除模板
export function removeTemplate(id) {
  return axios.get(`${apiPath}changeShiftTemplate/delById/${id}`);
}

// 新建、编辑模板
// deptCode 部门编号
// type 类型（指入院、出院这些大类型）
// templateType 模板类型（1代表现状，2代表背景，3代表评估，4代表建议）
// title 标题
// content 内容
export function updateTemplate(data) {
  return axios.post(`${apiPath}changeShiftTemplate/saveOrUpdate`, data);
}

// 获取模板类型列表
export function listType(deptCode) {
  return axios.get(`${apiPath}changeShiftTemplate/findtype/${deptCode}`);
}

// 病房日报

export const shiftTypeId = 2
/**
 * 查询列表
 * @param {*} params
 * @returns
 */
export const getWardDailyList = (params) => {
  return axios.get(`${apiPath}wardDailyFsxt/list/${params.deptCode}/${params.startDate}/${params.endDate}/${shiftTypeId}`)
}
/**查询科室患者 */
export const listPatients = (deptCode, date, id) => {
  return axios.get(`${apiPath}wardDailyFsxt/getShiftPatientALL/${deptCode}/${date}/${id}/${shiftTypeId}`)
}
/**
 * 新建
 * @param {*} params
 * @returns
 */
export const createWardDaily = (params) => {
  return axios.post(`${apiPath}wardDailyFsxt/save`, {...params, shiftTypeId})
}
/**
 * id查询
 * @param {*} id
 * @returns
 */
export const getWardDailyById = (id) => {
  return axios.get(`${apiPath}wardDailyFsxt/getById/${id}/${shiftTypeId}`)
}
/**删除 */
export const delWardDaily = (params) => {
  return axios.post(`${apiPath}wardDailyFsxt/delById`, params)
}
/**保存 */
export const saveWardDaily = (params) => {
  return axios.post(`${apiPath}wardDailyFsxt/saveContent`, params)
}
/**删除行 */
export const delWardDailyById = (params) => {
  return axios.get(`${apiPath}wardDailyFsxt/deleteContent/${params.id}/${params.sortValue}`)
}
/**签名 */
export const updateAutographName = (params) => {
  return axios.post(`${apiPath}wardDailyFsxt/updateAutographName`, params)
}
/**取消签名 */
export const delSignShiftRecord = (params) => {
  return axios.post(
    `${apiPath}wardDailyFsxt/updateAutographNamePost`, params
  );
}

