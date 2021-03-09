import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

// 查询病区科室
export function listDepartment(parentCode) {
  return axios.get(`${apiPath}wardDaily/getDeptWithWardcode/${parentCode}`);
}

// 查询交班志列表
export function listShiftRecord(deptCode, startDate, endDate) {
  return axios.get(
    `${apiPath}changeShiftTimeJm/list/${deptCode}/${startDate}/${endDate}`
  );
}

// 查询交班志
export function getShiftRecord(id) {
  return axios.get(`${apiPath}changeShiftTimeJm/getById/${id}`);
}

// 创建交班志
export function createShiftRecord(
  deptCode,
  changeShiftDate,
  copyChangeShift = false
) {
  return axios.post(`${apiPath}changeShiftTimeJm/save`, {
    deptCode,
    changeShiftDate,
    copyChangeShift
  });
}

// 更新交班志
// 交班志保存入参：
// {
// "changeShiftTime": {
// "id": 24834,
// "deptCode": "051101", --科室编码
// "changeShiftDate": "2020-05-15", --交班日期
// "creator": "admin", --创建人
// "createTime": "2020-05-15 17:54:34", --创建时间
// "AllTotal": 0, --总人数统计
// "goHospitalTotal": 0, --入院入数统计
// "patientDeathA": 0, --出院人数
// "outHospitalTotal": 0, --出院人数
// "inHospitalTotal": 0, --新收人数
// "seriousTotal": 94, --病重人数
// "yiHospitalTotal": 0, --一级人数
// "autographNameA": "", --A班签名护士
// "autographEmpNoA": "", --A班签名护士工号
// "checkNurseName": "", --护士长签名姓名
// "checkNurseNo": "", --护士长签名账号
// "autographNameN": "", --N班签名护士
// "autographEmpNoN": "", --N班签名护士工号
// "copyChangeShift": false
// },
// "changeShiftPatients": [{
// "id": 469372,
// "changeShiftTimeId": 125082, --对应的交班ID
// "bedLabel": "715", --床号
// "name": "段小芳", --姓名
// "patientStatus": "新", --状态
// "diagnosis": "1 阴道流血查因：异位妊娠？", --主要诊断
// "symptom": "症状", --症状
// "background": "既往病史、过敏史、特殊病史", --既往病史、过敏史、特殊病史
// "cure": "治疗、护理", --治疗、护理
// "diet": "饮食", --饮食
// "creator": "0402",
// "createTime": "2020-05-15 21:21:14",
// "sortValue": 2,
// "patientId": "7655476",
// "visitId": "1",
// "dataHash": "64c7528944a5e62f26ee128d217d84ad"
// }],
// }
export function updateShiftRecord(data) {
  return axios.post(`${apiPath}changeShiftPatientListJm/saveOrUpdate`, data);
}

// 删除交班志行
export function removeShiftRecordRow(rowId) {
  return axios.get(`${apiPath}changeShiftPatientListJm/delete/${rowId}`);
}

// 删除交班志
export function removeShiftRecord(id, empNo, password) {
  return axios.post(
    `${apiPath}changeShiftTimeJm/delById`,
    {
      id,
      empNo,
      password,
    }
  );
}

// 更新交班签名
export function signShiftRecord(id, AutographNameType, empNo, password) {
  return axios.post(
    `${apiPath}changeShiftTimeJm/updateAutographName`,{
      id,
      autographNameType:AutographNameType,
      empNo,
      password,
    }
    // ${id}/${AutographNameType}/${empNo}/${password}
  );
}

// 取消交班签名
export function delSignShiftRecord(id, empNo, password, type, sourceEmpNo) {
  return axios.post(
    `${apiPath}changeShiftTimeJm/updateAutographNamePost`,{
      id,
      empNo,
      password,
      sign:type,
      sourceEmpNo,
    }
  );
}

// 查询患者信息
export function getPatient(deptCode, bedLabel, date) {
  return axios.get(
    `${apiPath}changeShiftPatientListJm/findByBedLabel/${deptCode}/${bedLabel}/${date}`
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

// 获取患者列表
export function listPatients(deptCode, date, id) {
  return axios.get(
    `${apiPath}changeShiftPatientListJm/getShiftPatientALL/${deptCode}/${date}/${id}`
  );
}
