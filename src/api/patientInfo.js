// 登录模块api
import axios from "./axios";
import { apiPath } from "./apiConfig";
import qs from "qs";

// 病人基本信息
function info(patientId, visitId) {
  return axios.get(`${apiPath}patient/info/${patientId}/${visitId}`);
}
// 医嘱列表
function orders(patientId, visitId) {
  if (!patientId && !visitId) {
    return new Promise.reject()
  }
  return axios.get(`${apiPath}patient/orders/${patientId}/${visitId}`);
}

// 带条件查询患者医嘱
function ordersByCondition(data) {
  return  axios.post(`${apiPath}patient/getPatientOrders`, data);
}

// 手术模块 手术列表
function operationList(patientId, visitId) {
  return axios.get(`${apiPath}operation/getOperationWithPatientId/${patientId}/${visitId}`);
}

// 手术模块 手术患者信息
function operationResult(params) {
  return axios.post(`${apiPath}operation/getOperationList`, params);
}


// 是否有查询功能医嘱列表（北海）
function newOrders(patientId, visitId, orderText) {
  // return axios.get(`${apiPath}patient/orders/${patientId}/${visitId}/${orderText}`)
  return axios.post(`${apiPath}patient/orders`, {
    patientId,
    visitId,
    orderText
  });
}
// 检查申请列表
function examList(patientId, visitId) {
  return axios.get(`${apiPath}patient/examList/${patientId}/${visitId}`);
}
// 检查结果
function examResult(examNo) {
  return axios.get(`${apiPath}patient/examResult/${examNo}`);
}
// 威海市立-检查结果
function examResultWhsl(examNo) {
  return axios.post(`${apiPath}patient/examResultNew`, {examNo});
}
// 检查图片
function pic(examNo, userName) {
  return axios.get(`${apiPath}patient/pic/${examNo}/${userName}`);
}
// 检查图片数量
function picNum(examNo, userName) {
  return axios.get(`${apiPath}patient/picNum/${examNo}/${userName}`);
}

// 检验申请列表
function testList(patientId, visitId) {
  return axios.get(`${apiPath}patient/testList/${patientId}/${visitId}`);
}
// 检验结果
function testItems(testNo) {
  return axios.get(`${apiPath}patient/testItems/${testNo}`);
}
//威海市立- 检验结果
function testItemsWhsl(testNo) {
  return axios.post(`${apiPath}patient/testItemsNew`,{testNo});
}

// 检验结果图表
function testResultsForChart(testNo, reportItemName) {
  return axios.post(
    `${apiPath}patient/testResultsForChart/${testNo}`,
    qs.stringify({ testNo, reportItemName })
  );
}

// 病历一级列表
function inpRecordResults(patientId) {
  return axios.get(`${apiPath}patient/inpRecordResults/${patientId}`);
}
// 病历二级列表
function emrList(patientId, visitId) {
  return axios.get(`${apiPath}patient/emrList/${patientId}/${visitId}`);
}
// 表单模版
function templates(deptCode) {
  return axios.get(`${apiPath}form/templates?deptCode=${deptCode}`);
}
// 据科室代码和宣教类型获取健康宣教
function briefMission(deptCode) {
  return axios.get(`${apiPath}form/getEduFormTemplateByDeptCode/${deptCode}`);
}
// 据科室代码和宣教类型获取健康宣教
function getContentByMissionIds(ids) {
  return axios.post(`${apiPath}briefMission/getContentByMissionIds?ids=${ids}`);
}

// 费用饼图
function getFeePercent(wardCode, patientId, visitId) {
  return axios.get(
    `${apiPath}patient/getFeePercent/${wardCode}/${patientId}/${visitId}`
  );
}
// 费用折线图
function getFeeByDay(patientId, visitId) {
  return axios.get(`${apiPath}patient/getFeeByDay/${patientId}/${visitId}`);
}
// 费用情况
function getFeeDetail(wardCode, patientId, visitId) {
  return axios.get(
    `${apiPath}patient/getFeeDetail/${wardCode}/${patientId}/${visitId}`
  );
}
// 药费比
function getDrugFeePercent(wardCode, patientId, visitId) {
  return axios.get(
    `${apiPath}patient/getDrugFeePercent/${wardCode}/${patientId}/${visitId}`
  );
}
function patientNursing(
  patientId,
  visitId,
  date,
  type,
  pageIndex,
  pageSize,
  status
) {
  return axios.post(
    `${apiPath}job/patientNursing`,
    qs.stringify({
      patientId,
      visitId,
      date,
      type,
      pageIndex,
      pageSize,
      status
    })
  );
}

/**收藏表单 */
function collectAssessmentForm(deptCode, collectionUser,formCode) {
  return axios.post(`${apiPath}form/saveForCollection`,{
    deptCode,
    collectionUser,
    formCode
  }
)}


/* 取消收藏表单 */
function unCollectAssessmentForm(deptCode, collectionUser,formCode) {
  return axios.post(`${apiPath}form/unfollowCollection`,{
    deptCode,
    collectionUser,
    formCode
  }
)}


export const groupList = (patientId, visitId, type, wardCode) => {
  if (type == "healthEdu") {
    return axios.post(`${apiPath}formType/${type}/list`, {
      patientId,
      visitId,
      wardCode
    });
  }
  return axios.get(`${apiPath}form/common/groupList/${patientId}/${visitId}`);
};
export const groupListHuadu = (patientId, visitId) => {
  return axios.get(
    `${apiPath}bloodTransfusion/getBloodListByPv/${patientId}/${visitId}`
  );
};

/**
 * 根据病人信息获取健康宣教列表
 * getInstanceByPatientInfo
 * getInstanceByPatientInfo(patientId, visitId)
 */
export function getInstanceByPatientInfo(patientId, visitId) {
  return axios.post(
    `${apiPath}missionInstance/getInstanceByPatientInfo`,
    qs.stringify({ patientId, visitId })
  );
}

export const list = (patientId, visitId) =>
  axios.get(
    `${apiPath}record/setting/list/${patientId}/${visitId}/${recordCode}`
  );

export const listRecord = deptCode =>
  axios.get(`${apiPath}record/setting/listRecord/${deptCode}`);

export const listNursingOrder = deptCode =>
  axios.get(`${apiPath}record/setting/listNursingOrder/${deptCode}`);

export const listPatientRecord = (patientId, visitId) =>
  axios.get(
    `${apiPath}record/aggregation/listPatientRecord/${patientId}/${visitId}`
  );

export const inform = deptCode =>
  axios.get(`${apiPath}form/common/inform?deptCode=${deptCode}`);

export const healthEdu = deptCode =>
  axios.get(`${apiPath}form/common/healthEdu?deptCode=${deptCode}`);

// 根据病人信息获取记录块列表(输血安全记录单)
export const getBlockByPV = (patientId, visitId) =>
  axios.get(`${apiPath}formBlock/getBlockByPV/${patientId}/${visitId}`);

// 获取检查右侧url（贵州省人民）
export const getExamTestUrl = (patientId, visitId, examNo) =>
  axios.post(`${apiPath}hisPacsLis/getPacsLis`, { patientId, visitId, examNo });

/**检查列表 by贵州 */
export const getExamList = (patientId, visitId) =>
  axios.post(`${apiPath}hisPacsLis/getExamList`, {
    patientId,
    visitId,
  });
/**检验列表 by贵州 */
export const getTestList = (patientId, visitId) =>
  axios.post(`${apiPath}hisPacsLis/getTestList`, {
    patientId,
    visitId
  });

export const getPaperWork = (patientId, visitId) => {
  return axios.get(`${apiPath}patient/getPaperWork/${patientId}/${visitId}`);
}
export function ordersPage(query) {
  return axios.post(`${apiPath}patient/ordersByTimePage`,query)
}
// 获取执行单类型
function getExecuteType() {
  console.log('hjm发请求')
  return axios.post(`${apiPath}procedure/pdaExecute/type`)
}
// 健康教育的下拉列表
export const getEduFormList = params => {
  return axios.get(
    `${apiPath}missionBlock/getBlockByPV/${params.patientId}/${params.visitId}`
  );
};

export {
  info,
  orders,
  examList,
  examResult,
  examResultWhsl,
  testList,
  testItems,
  testItemsWhsl,
  inpRecordResults,
  emrList,
  templates,
  briefMission,
  getContentByMissionIds,
  getFeePercent,
  getFeeByDay,
  getFeeDetail,
  getDrugFeePercent,
  patientNursing,
  testResultsForChart,
  pic,
  picNum,
  newOrders,
  collectAssessmentForm,
  unCollectAssessmentForm,
  ordersByCondition,
  getExecuteType,
  operationList,
  operationResult
};
