import axios from "@/api/axios";
import {
  apiPath
} from "@/api/apiConfig";
import qs from "qs";

// 查询病区科室
export function listDepartment(parentCode) {
  return axios.get(`${apiPath}wardDaily/getDeptWithWardcode/${parentCode}`);
}

//根据科室和日期查找对应得交班志列表（左侧）
export function listShiftRecord(deptCode, startDate, endDate) {
  return axios.get(
    `${apiPath}changeShiftLcTime/list/${deptCode}/${startDate}/${endDate}`
  );
}

// 按ID查找对应得交班详情
export function getShiftRecord(id) {
  return axios.get(`${apiPath}changeShiftLcTime/getById/${id}`);
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

// 创建交班志
export function createShiftRecord(
  deptCode,
  changeShiftDate,
  copyChangeShift = false
) {
  return axios.post(`${apiPath}changeShiftLcTime/save`, {
    deptCode,
    changeShiftDate
  });
}



// 更新交班志
export function updateShiftRecord(data) {
  return axios.post(`${apiPath}changeShiftLcPatientList/saveOrUpdate`, data);
}

// 删除交班志行
export function removeShiftRecordRow(rowId) {
  return axios.get(`${apiPath}changeShiftLcPatientList/delete/${rowId}`);
}

// 删除交班志
export function removeShiftRecord(id, empNo, password) {
  return axios.post(
    `${apiPath}changeShiftLcTime/delById`, {
      id,
      empNo,
      password
    }
  );
}

// 更新交班签名 autographNameType 类型 A\N\check
export function signShiftRecord(id, autographNameType, empNo, password) {
  return axios.post(
    `${apiPath}changeShiftLcTime/updateAutographName`, {
      id,
      autographNameType,
      empNo,
      password
    }
  );
}

// 取消交班签名 sign 类型 A\N\check
export function delSignShiftRecord(id, empNo, password, sign, sourceEmpNo) {
  return axios.post(
    `${apiPath}changeShiftLcTime/deleteAutographName
    `, {
      id,
      empNo,
      password,
      sign,
      sourceEmpNo
    }
  );
}

// 根据床号和科室编码和交班日期查找对应得患者信息
export function getPatient(deptCode, bedLabel, date) {
  return axios.get(
    `${apiPath}changeShiftLcPatientList/findByBedLabel/${deptCode}/${bedLabel}/${date}`
  );
}

// 获取患者列表
export function listPatients(deptCode, date, id) {
  return axios.get(
    `${apiPath}changeShiftPatientList/getShiftPatientALL/${deptCode}/${date}/${id}`
  );
}
