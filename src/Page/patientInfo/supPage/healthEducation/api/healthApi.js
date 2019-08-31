import axios from "@/api/axios";
import {apiPath} from '@/api/apiConfig'
import qs from 'qs'

// 获取病人全部宣教实例和页面参数
export function getAllByPatientInfo(patientId, visitId) {
  return axios.post(`${apiPath}missionInstance/getAllByPatientInfo`, qs.stringify({patientId, visitId}))
}

// 推送健康宣教
export function pushMission(params) {
  return axios.post(`${apiPath}missionInstance/pushMission`, params)
}

// 根据id查找健康宣教页面参数
export function getMissionPageParamById(id) {
  return axios.get(`${apiPath}missionInstance/getMissionPageParamById/${id}`)
}

// 保存健康宣教（旧版）
export function saveMission(data) {
  return axios.post(`${apiPath}missionInstance/saveMission`, data)
}

// 删除健康宣教（事件id）
export function deleteMission(id) {
  return axios.get(`${apiPath}missionInstance/deleteMission/${id}`)
}

// 根据科室获取宣教内容模板列表
export const getEduFormTemplate = params => {
  return axios.post(`${apiPath}/briefMission/getBriefMission`,params)
};
