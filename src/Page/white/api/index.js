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

// 获取病人分组
export function viewListByDeptCodeLC(deptCode) {
  return axios.get(
    `${apiPath}whiteboard/patientGroup/viewListByDeptCodeLC/${deptCode}`
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

// 更新病人分组
export function updateByDeptCodeAndGroupCodeLC(data) {
  delete data.updateTime;
  delete data.createTime;
  delete data.id;
  return axios.post(
    `${apiPath}whiteboardManage/patientGroup/updateByDeptCodeAndGroupCodeLC`,
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
// 获取北海检查预约
export function getExamAppointWithWardcode(deptCode) {
  return axios.get(`${apiPath}whiteboard/getExamAppointWithWardcode/${deptCode}`);
}
// 获取全部检查预约
export function GetAllExamAppoint(deptCode) {
  return axios.get(`${apiPath}whiteboardManage/GetAllExamAppoint/${deptCode}`);
}
// 保存预约
export function saveExamAppointList(data) {
  return axios.post(`${apiPath}whiteboardManage/saveExamAppointList`, data);
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
// //p班护士，p全班，N班护士
export const getDeptSetting = deptCode => {
  return axios.get(`${apiPath}whiteboard/deptSetting/${deptCode}`);
};

// 聊城二院
// 查询安全指标
export const getWhiteLogIndicators = deptCode => {
  return axios.get(`${apiPath}whiteboard/getWhiteLogIndicators/${deptCode}`);
};
// 新增和修改安全指标
// {
// 	"deptCode":"",
// 	"ylxssDate":"院内压力性损伤日期",
// 	"ddzcDate":"跌倒坠床日期",
// 	"glhtDate":"管理滑脱日期",
// 	"aqyyDate":"安全用药日期",
//  "totalDate":"总天数日期"
// }
export const saveWhiteLogIndicators = (data) => {
  return axios.post(`${apiPath}whiteboardManage/whiteLogIndicators/saveOrUpdate`,data);
};

// hengli - 病人分组 - 获取分组数量
export const getPatientGroup = (deptCode) => {
  return axios.get(`${apiPath}whiteboardManage/getCustomGroupByDeptCode/${deptCode}`);
};

// hengli - 病人分组 - 新建分组
export const saveOrUpdateHL = (data) => {
  return axios.post(`${apiPath}whiteboardManage/saveOrUpdateHL`, data);
};

export const deletePatientGroupById = (id) => {
  return axios.get(`${apiPath}whiteboardManage/deletePatientGroupById/${id}`);
};
/**获取同步排班 by佛山杏坛 */
export const getTodayNurse = (deptCode) => {
  return axios.get(`${apiPath}whiteboardManage/deptSetting/getTodayNurse?deptCode=${deptCode}`)
}

/* 根据组号查询当日班次值班护士，每天只同步一次！ */
export const getviewListByDeptCodeZhzxy = (deptCode,data) => {
  return axios.post(`${apiPath}/whiteboard/patientGroup/viewListByDeptCodeZhzxy/${deptCode}`,data)
}
