import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
const HOSPITAL_ID = process.env.HOSPITAL_ID;

// 查询病区科室
export function listDepartment(parentCode) {
  return axios.get(`${apiPath}wardDaily/getDeptWithWardcode/${parentCode}`);
}

// 查询交班志列表
export function listShiftRecord(deptCode, startDate, endDate) {
  return axios.get(
    `${apiPath}changeShiftTime/list/${deptCode}/${startDate}/${endDate}`
  );
}

// 查询交班志
export function getShiftRecord(id) {
  return axios.get(`${apiPath}changeShiftTime/getById/${id}`);
}

// 创建交班志
export function createShiftRecord(
  deptCode,
  changeShiftDate,
  copyChangeShift = false
) {
  return axios.post(`${apiPath}changeShiftTime/save`, {
    deptCode,
    changeShiftDate,
    copyChangeShift
  });
}

// 更新交班志
// changeShiftDate 交班日期
// patientTotal 病区原有人数统计
// inHospitalTotal 病区新收入数统计
// transInTotal 病区转入人数统计
// outHospitalTotal 病区出院人数统计
// transOutTotal 病区转出人数统计
// nowHospitalTotal 病区现有人数统计
// dangerTotal 病区病危人数统计
// seriousTotal 病区病重人数统计
// specialSituation 特殊情况交接
// operationTotal 病区手术人数统计
// autographNameA A班签名
// autographNameP p班签名
// autographNameN N班签名
// changeShiftTimeId	交班事件表ID
// bedLabel 床号
// name 姓名
// age 年龄
// diagnosis 诊断
// patientStatus 事件
// mainComplaint 主诉及现存主要问题
// background 既往病史、治疗经过、护理评估情况、治疗效果跟踪
// assessmentSituation 交班前最后一次护理评估情况
// proposal 交给下一班需注意
export function updateShiftRecord(data) {
  return axios.post(`${apiPath}changeShiftPatientList/saveOrUpdate`, data);
}

// 删除交班志行
export function removeShiftRecordRow(rowId) {
  return axios.get(`${apiPath}changeShiftPatientList/delete/${rowId}`);
}

// 删除交班志
export function removeShiftRecord(id, empNo, password) {
  if(HOSPITAL_ID==='guizhou'){
    return axios.post(
      `${apiPath}changeShiftTime/delById`, {id, empNo, password}
    );
  }else{
    return axios.get(
      `${apiPath}changeShiftTime/delById/${id}/${empNo}/${password}`
    );
  }
}

// 更新交班签名
export function signShiftRecord(id, autographNameType, empNo, password) {
  if(['xiegang','weixian','hj'].includes(HOSPITAL_ID)){
    return axios.post(
      `${apiPath}changeShiftTime/updateAutographName`,{
        id,
        autographNameType,
        empNo,
        password,
      }
    )
  }else if(HOSPITAL_ID==='guizhou'){
    return axios.post(
      `${apiPath}changeShiftTime/updateAutographName`, {
        id, empNo, password
      }
    );
  }else return axios.get(
    `${apiPath}changeShiftTime/updateAutographName/${id}/${autographNameType}/${empNo}/${password}`
  );
}

// 取消交班签名
export function delSignShiftRecord(id, empNo, password, sign, sourceEmpNo) {
  if(['guizhou','hj'].includes(HOSPITAL_ID)){
    return axios.post(
      `${apiPath}changeShiftTime/updateAutographNamePost/`,{id,empNo,password,sign,sourceEmpNo}
    );
  }else return axios.get(
    `${apiPath}changeShiftTime/updateAutographName/${id}/${empNo}/${password}/${sign}/${sourceEmpNo}
    `
  );
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

// 获取患者列表
export function listPatients(deptCode, date, id) {
  return axios.get(
    `${apiPath}changeShiftPatientList/getShiftPatientALL/${deptCode}/${date}/${id}`
  );
}
