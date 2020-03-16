import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

// 获取病人全部宣教实例和页面参数
export function getAllByPatientInfo(blockId) {
  return axios.post(
    `${apiPath}missionInstance/getAllByPatientInfo`,
    qs.stringify({ blockId })
  );
}

// 推送健康宣教
export function pushMission(params) {
  return axios.post(`${apiPath}missionInstance/pushMission`, params);
}

// 根据id查找健康宣教页面参数
export function getMissionPageParamById(id) {
  return axios.get(`${apiPath}missionInstance/getMissionPageParamById/${id}`);
}

// 保存健康宣教（旧版）
export function saveMission(data) {
  return axios.post(`${apiPath}missionInstance/saveMission`, data);
}

// 删除健康宣教（事件id）
export function deleteMission(id) {
  return axios.get(`${apiPath}missionInstance/deleteMission/${id}`);
}

// 宣教内容下拉列表
export const getEduFormTemplate = params => {
  return axios.post(`${apiPath}briefMission/getBriefMission`, params);
};

// 健康教育的下拉列表
export const getEduFormList = params => {
  return axios.get(
    `${apiPath}missionBlock/getBlockByPV/${params.patientId}/${params.visitId}`
  );
};

// 保存健康教育块
export const saveEducation = params => {
  return axios.post(`${apiPath}missionBlock/saveBlock`, params);
};

// 健康教育内容弹窗
export function getContentByMissionId(ids) {
  return axios.post(
    `${apiPath}/briefMission/getContentByMissionIds`,
    qs.stringify({ ids })
  );
}

//删除整张教育单
export function deleteBlock(id) {
  return axios.get(`${apiPath}/missionBlock/deleteBlock/${id}`);
}

// 获取用户信息
export function getUser(password, empNo) {
  return axios.post(`${apiPath}user/getUser`, { password, empNo });
}
