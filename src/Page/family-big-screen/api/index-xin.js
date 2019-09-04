// 智慧护理首页api  森
import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

//评估任务
function nurseTast(deptCode, dateStr) {
  return axios.post(
    `${apiPath}task/evaluateTask`,
    qs.stringify({ deptCode, dateStr })
  );
}

//体症任务
function bodyTast(deptCode, dateStr) {
  return axios.post(
    `${apiPath}task/vitalTask`,
    qs.stringify({ deptCode, dateStr })
  );
}
//体症任务
function recordJob(deptCode) {
  // return axios.get(`${apiPath}record/setting/recordJob`)
  return axios.get(`${apiPath}record/setting/recordJob?deptCode=${deptCode}`);
}

// 获取病人详情
export function patList(deptCode, patientId, visitId) {
  return axios.get(
    `${apiPath}whiteboardManage/patList/${deptCode}/${patientId}/${visitId}`
  );
}
// 获取病人信息
export function info(patientId, visitId) {
  return axios.get(`${apiPath}patient/info/${patientId}/${visitId}`);
}

//  科室信息
export function queryByDeptCode(deptCode) {
  return axios.get(`${apiPath}whiteboard/deptInfo/queryByDeptCode/${deptCode}`);
}

// 更新留言等
export function updateByDeptCode(data) {
  delete data.createTime;
  delete data.updateTime;
  return axios.post(
    `${apiPath}whiteboardManage/deptInfo/updateByDeptCode`,
    qs.stringify(data)
  );
}

// 获取扁平管理列表
export function getList(query) {
  return axios.post(`${apiPath}flatManageInstance/getPageList`, query);
}

// 获取扁平管理类型
export function getTypeByDeptCode(query) {
  return axios.post(`${apiPath}flatManageInstance/getMangeTypeList`, qs.stringify(query));
}

export { nurseTast, bodyTast, recordJob };
