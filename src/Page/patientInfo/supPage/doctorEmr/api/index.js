import axios from '@/api/axios'
import {
  apiPath
} from '@/api/apiConfig'

//获取医生病历
export function getDoctorEmr(patientId, visitId) {
  if(patientId&&visitId)
  return axios.get(`${apiPath}patient/doctorEmrs/${patientId}/${visitId}`)
}
//获取医生病历2 医院系统响应慢 有时候会报错
export function getDoctorEmr2(patientId, visitId) {
  if(patientId&&visitId)
  return axios.get(`${apiPath}patient/getDoctorEmrs/${patientId}/${visitId}`)
}
