import axios from '@/api/axios.js'
import {apiPath} from '@/api/apiConfig.js'
// 获取新表单列表
export function templates2(deptCode) {
  return axios.get(`${apiPath}form/templatesTest?deptCode=${deptCode}`)
}
// 保存新表单
export function saveByJson(data) {
  return axios.post(`${apiPath}form/saveByJson`, data)
}

// 获取表单列表
export function templatesAll(type,deptCode) {
  return axios.get(`${apiPath}form/common/templates/${type}?deptCode=${deptCode}`,)
}

// 获取科室健康教育单模板
export function healthEduTemplates(deptCode) {
  return axios.get(`${apiPath}healthEdu/health_education_hl/healthEduTemplates/${deptCode}`)
}

// 创建健康教育单
export function createHealthEduTemplates(params) {
  return axios.post(`${apiPath}healthEdu/health_education_hl/save`,params)
}

// 患者：是否进入过某个护理单元
export function hadTransferToWard(patientId,visitId,wardCode) {
  return axios.get(`${apiPath}patient/hadTransferToWard/${patientId}/${visitId}/${wardCode}`,)
}
