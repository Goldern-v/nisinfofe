// 登录模块api
import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'

//  表单护理字段
export function formField(code,patientId,visitId) {
  return axios.get(`${apiPath}nursingDiags/form/${code}/${patientId}/${visitId}`)
}
// 病人相关诊断
export function patient(patientId, visitId) {
  return axios.get(`${apiPath}diagnosis/patient/${patientId}/${visitId}`)
}

// 诊断护理措施
export function measure(code) {
  return axios.get(`${apiPath}nursingDiags/measure/${code}`)
}

