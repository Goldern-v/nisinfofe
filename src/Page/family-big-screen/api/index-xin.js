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
  return axios.post(
    `${apiPath}flatManageInstance/getMangeTypeList`,
    qs.stringify(query)
  );
}

// 视频播放列表
export function getPageList(query) {
  return axios.post(`${apiPath}familyScreen/getPageList`, query);
}
// 视频播放列表
export function joinPlayList(id, operateType) {
  return axios.get(
    `${apiPath}familyScreen/joinPlayList`,
    qs.stringify({ id, operateType })
  );
}
// 上传视频
export function saveVideo(obj) {
  return axios.post(`${apiPath}familyScreen/saveVideo`, obj);
}
// 上传视频
export function updateVideo(obj) {
  return axios.post(`${apiPath}familyScreen/updateVideo`, obj);
}
// 删除视频
export function deleteVideo(id) {
  return axios.post(`${apiPath}familyScreen/deleteVideo`, qs.stringify({ id }));
}
// 获取播放列表
export function getPlayList() {
  return axios.get(`${apiPath}familyScreen/getPlayList`);
}
// 家属大屏-播放|停止|暂停
export function startAndStopVideo(id, actionType) {
  return axios.post(`${apiPath}familyScreen/startAndStop`, qs.stringify({ id, actionType }));
}
// 家属大屏-上移
export function moveUpVideo(id) {
  return axios.post(`${apiPath}familyScreen/moveUp`, qs.stringify({ id }));
}
// 家属大屏-下移
export function moveDownVideo(id) {
  return axios.post(`${apiPath}familyScreen/moveDown`, qs.stringify({ id }));
}
// 保存温馨提示信息
export function saveWarmTips(content) {
  return axios.post(`${apiPath}familyScreen/saveWarmTips`, qs.stringify({ content }));
}
// 家属大屏-获取温馨提示信息
export function getWarmTips() {
  return axios.get(`${apiPath}familyScreen/getWarmTips`);
}


export { nurseTast, bodyTast, recordJob };
