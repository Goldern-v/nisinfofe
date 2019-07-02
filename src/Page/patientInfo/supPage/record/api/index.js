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
