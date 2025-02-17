// 登录模块api
import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

//  获取病区动态
export function getNewPatList(deptCode) {
  return axios.get(`${apiPath}bed/getNewPatList/${deptCode}`);
}
//  今日护士排班
export function deptSetting(deptCode) {
  return axios.get(`${apiPath}whiteboardManage/deptSetting/${deptCode}`);
}
//  白板病区动态日志
export function getWardLog(deptCode) {
  return axios.get(`${apiPath}whiteboardManage/getWardLog/${deptCode}`);
}

//  三测单任务
export function vitalTask(deptCode, dateStr) {
  deptCode = 4003;
  dateStr = "2018-07-17";
  return axios.post(
    `${apiPath}task/vitalTask`,
    qs.stringify({ deptCode, dateStr })
  );
}
//  评估任务
export function evaluateTask(deptCode, dateStr) {
  deptCode = 4003;
  dateStr = "2018-07-17";
  return axios.post(
    `${apiPath}task/evaluateTask`,
    qs.stringify({ deptCode, dateStr })
  );
}
//  科室信息
export function queryByDeptCode(deptCode) {
  return axios.get(`${apiPath}whiteboard/deptInfo/queryByDeptCode/${deptCode}`);
}
// 获取病人分组
export function viewListByDeptCode(deptCode) {
  return axios.get(
    `${apiPath}whiteboard/patientGroup/viewListByDeptCode/${deptCode}`
  );
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

// 更新病人分组
export function updateByDeptCodeAndGroupCode(data) {
  delete data.updateTime;
  delete data.createTime;
  delete data.id;
  return axios.post(
    `${apiPath}whiteboardManage/patientGroup/updateByDeptCodeAndGroupCode`,
    data
  );
}

// 保存病区动态配置项
export function saveBoardConfigure(data) {
  delete data.createTime;
  delete data.id;
  return axios.post(`${apiPath}whiteboardManage/saveBoardConfigure`, data);
}
// 更新病区动态自定义数据
export function updateBoardConfigure(data) {
  return axios.post(`${apiPath}whiteboardManage/updateBoardConfigure`, data);
}

// 获取检查预约
export function GetExamAppoint(deptCode) {
  return axios.get(`${apiPath}whiteboardManage/GetExamAppoint/${deptCode}`);
}
// 获取全部检查预约
export function GetAllExamAppoint(deptCode) {
  return axios.get(`${apiPath}whiteboardManage/GetAllExamAppoint/${deptCode}`);
}
// 保存预约
export function saveExamAppointList(data) {
  return axios.post(`${apiPath}whiteboardManage/saveExamAppointList`, data);
}
// 未做化验
export function getHistGetTestWithWardcode(deptCode) {
  return axios.get(`/crNursing/api/whiteboard/getHistGetTestWithWardcode/${deptCode}`);
}

// 获取病人详情
export function patList(deptCode, patientId, visitId) {
  return axios.get(
    `${apiPath}whiteboardManage/patList/${deptCode}/${patientId}/${visitId}`
  );
}

// 更新护士今日排班
export function updateRangeToday(data) {
  return axios.post(`${apiPath}whiteboardManage/updateRangeToday`, data);
}

// 删除病区动态自定义项
export function deleteBoardConfigure(id) {
  return axios.get(`${apiPath}whiteboardManage/deleteBoardConfigure/${id}`);
}

// 获取导管块列表
export const getCatheterBlock = (
  patientId,
  visitId,
  orderNo,
  orderSubNo,
  startDate,
  id
) => {
  return axios.post(`${apiPath}catheter/block/old/get`, {
    patientId,
    visitId,
    orderNo,
    orderSubNo,
    startDate,
    id
  });
};
// 更新导管块列表
export const updateBlock = block => {
  return axios.post(`${apiPath}catheter/block/old/update`, block);
};
