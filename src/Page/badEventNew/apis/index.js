import axios from '@/api/axios'
import { apiPath } from '@/api/apiConfig'
import qs from 'qs'

// 保存不良事件
export function save (data) {
  return axios.post(`${apiPath}badEvent/save`,data)
}

// 根据事件id删除不良事件
export function del (id) {
  return axios.get(`${apiPath}badEvent/deleteBadEventById/${id}`)
}

// 根据事件id获取不良事件具体数据
export function getEvent (id) {
  return axios.get(`${apiPath}badEvent/findBadEventDetailById/${id}`)
}

// 根据护理单元获取不良事件列表
export function getEventList (data) {
  //return axios.post(`${apiPath}badEvent/findBadEventList`, data)
  return axios.post(`${apiPath}form/badEventMaster/master/getPage`, data)
}

// 根据护理单元获取不良事件模板列表
export function getEventTemplate (wardCode) {
  return axios.get(`${apiPath}badEvent/findBadEventTemplateByWardCode/${wardCode}`)
}

// 获取所有护理单元
export function getAllNursingUnit (data) {
  return axios.post(`${apiPath}badEventDept/getByTypeList`,data)
}

// 不良事件轨迹
export function getStreamByInstanceId (instanceId) {
  return axios.get(`${apiPath}badEvent/getStreamByInstanceId/${instanceId}`)
}

export default { save, del, getEvent, getEventList, getEventTemplate,getAllNursingUnit,getStreamByInstanceId}