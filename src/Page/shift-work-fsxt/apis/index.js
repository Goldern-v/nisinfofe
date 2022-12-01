import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

// 查询病区科室
export function listDepartment(parentCode) {
  return axios.get(`${apiPath}wardDaily/getDeptWithWardcode/${parentCode}`);
}

//根据科室和日期查找对应得交班志列表（左侧）
export function listShiftRecord(deptCode, startDate, endDate,shiftType=1) {
  return axios.get(
    `${apiPath}changeShiftMaster/list/${deptCode}/${startDate}/${endDate}/${shiftType}`
  );
}

// 按ID查找对应得交班详情
export function getShiftRecord(id,shiftTypeId = 1) {
  return axios.get(`${apiPath}changeShiftMaster/getById/${id}/${shiftTypeId}`);
}
// 按ID解除交班锁定
export function unLockShiftRecord(id,shiftTypeId = 1) {
  return axios.get(`${apiPath}changeShiftMaster/unlock/${id}/${shiftTypeId}`);
}

// 获取后台配置的解锁时间
export function unLockTime(){
  return axios.get(`${apiPath}dict/common/getDictItem?dictCode=propertiesConfig&itemCode=his_form_data_lock_timeout`);
}
// "changeShiftTime": {
//   "id": 24834,
//   "deptCode": "051101", --科室编码
//   "changeShiftDate": "2020-05-15", --交班日期
//   "creator": "admin", --创建人
//   "createTime": "2020-05-15 17:54:34", --创建时间
//   "patientOutA": 0, --A班病区出院人数统计
//   "patientTransferOutA": 0, --A班病区转出人数统计
//   "patientDeathA": 0, --A班病区死亡人数统计
//   "patientNewA": 0, --A班病区新入人数统计
//   "patientTransferInA": 0, --A班病区转入人数统计
//   "patientBzA": 94, --A班病区病重人数统计
//   "patientBwA": 0, --A班病区病危人数统计
//   "patientOprationA": 1, --A班病区手术人数统计
//   "patientRemarkA": 0, --A班病区备述人数统计
//   "patientSpecialA": 0, --A班病区特护人数统计
//   "patientFirstA": 0, --A班病区一级人数统计
//   "patientTotalA": 0,     --A班病区总数人数统计
//   "patientOutN": 0, --N班病区出院人数统计
//   "patientTransferOutN": 0, --N班病区转出人数统计
//   "patientDeathN": 0, --N班病区死亡人数统计
//   "patientNewN": null, --N班病区新入人数统计
//   "patientTransferInN": 0, --N班病区转入人数统计
//   "patientBzN": 0, --N班病区病重人数统计
//   "patientBwN": 0, --N班病区病危人数统计
//   "patientOprationN": null, --N班病区手术人数统计
//   "patientRemarkN": "", --N班病区备述人数统计
//   "patientSpecialN":"" --N班病区特护人数统计
//   "patientFirstN":"" --N班病区一级人数统计
//   "patientTotalN":"" --N班病区总数人数统计
//   "autographNameA": "", --A班签名护士
//   "autographEmpNoA": "", --A班签名护士工号
//   "checkNurseName": "", --护士长签名姓名
//   "checkNurseNo": "", --护士长签名账号
//   "autographNameN": "", --N班签名护士
//   "autographEmpNoN": "", --N班签名护士工号
//   "copyChangeShift": false
//   },
//   "changeShiftPatients": [{
//   "id": 469372,
//   "changeShiftTimeId": 125082, --对应的交班ID
//   "bedLabel": "715", --床号
//   "name": "段小芳", --姓名
//   "patientStatus": "新", --状态
//   "diagnosis": "1 阴道流血查因：异位妊娠？", --诊断
//   "remark1": "备注1", --备注1
//   "remark2": "备注2", --备注2
//   "creator": "0402",
//   "createTime": "2020-05-15 21:21:14",
//   "sortValue": 2,
//   "patientId": "7655476",
//   "visitId": "1",
//   "dataHash": "64c7528944a5e62f26ee128d217d84ad"
//   }]


// 入参：
// {
// "deptCode":"1A010999",
// "changeShiftDate":"2021-04-14",
// "shiftTypeId":"1"        --模板类型，这个有接口返回的
// }
// 创建交班志
export function createShiftRecord(
  deptCode,
  changeShiftDate,
  shiftTypeId = 1
) {
  return axios.post(`${apiPath}changeShiftMaster/save`, {
    deptCode,
    changeShiftDate,
    shiftTypeId
  });
}

// 更新交班志
export function updateShiftRecord(data) {
  return axios.post(`${apiPath}changeShiftMaster/saveContent`, data);
}

// 删除交班志行
export function removeShiftRecordRow(changeShiftTimeId,sortValue) {
  return axios.get(`${apiPath}changeShiftMaster/deleteContent/${changeShiftTimeId}/${sortValue}`);
}

// 删除交班志
export function removeShiftRecord(id, empNo, password) {
  return axios.post(`${apiPath}changeShiftMaster/delById`, {
    id,
    empNo,
    password
  });
}

// 更新交班签名 autographNameType 类型 A\N\check
export function signShiftRecord(id, autographNameType, empNo, password) {
  return axios.post(`${apiPath}changeShiftMaster/updateAutographName`, {
    id,
    autographNameType,
    empNo,
    password
  });
}

// 取消交班签名 sign 类型 A\N\check
export function delSignShiftRecord(id, empNo, password, sign, sourceEmpNo) {
  return axios.post(
    `${apiPath}changeShiftMaster/updateAutographNamePost
    `,
    {
      id,
      empNo,
      password,
      sign,
      sourceEmpNo
    }
  );
}

// 根据床号和科室编码和交班日期查找对应得患者信息
export function getPatient(deptCode, bedLabel, date,shiftTypeId = 1) {
  return axios.get(
    `${apiPath}changeShiftMaster/findByBedLabel/${deptCode}/${bedLabel}/${date}/${shiftTypeId}`
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
export function listPatients(deptCode, date, id,shiftTypeId = 1) {
  return axios.get(
    `${apiPath}changeShiftMaster/getShiftPatientALL/${deptCode}/${date}/${id}/${shiftTypeId}`
  );
}

// *******内科重症监护护理单元*******
// 删除交班志
export function removeShiftRecordICU(id, empNo, password) {
  return axios.post(`${apiPath}changeShiftMaster/delById`, {
    id,
    empNo,
    password
  });
}

// 取消交班签名 sign 类型 A\N\check
export function delSignShiftRecordICU(id, empNo, password, sign, sourceEmpNo) {
  return axios.post(
    `${apiPath}changeShiftMaster/deleteAutographName
    `,
    {
      id,
      empNo,
      password,
      sign,
      sourceEmpNo
    }
  );
}

// 更新交班签名 autographNameType 类型 A\N\check
export function signShiftRecordICU(id, autographNameType, empNo, password) {
  return axios.post(`${apiPath}changeShiftMaster/updateAutographName`, {
    id,
    autographNameType,
    empNo,
    password
  });
}

// 创建交班志
export function createShiftRecordICU(
  deptCode,
  changeShiftDate,
  copyChangeShift = false
) {
  return axios.post(`${apiPath}changeShiftMaster/save`, {
    deptCode,
    changeShiftDate
  });
}

// 按ID查找对应得交班详情
export function getShiftRecordICU(id) {
  return axios.get(`${apiPath}changeShiftMaster/getById/${id}`);
}

// 打印，按时间范围查找对应的交接班
export function getMulShiftRecordICU(deptCode, startDate, endDate) {
  return axios.get(
    `${apiPath}changeShiftMaster/list/${deptCode}/${startDate}/${endDate}`
  );
}

// 更新交班志
export function updateShiftRecordICU(data) {
  return axios.post(`${apiPath}changeShiftMaster/update`, data);
}
