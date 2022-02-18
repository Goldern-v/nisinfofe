import axios from '@/api/axios'
import {
  apiPath
} from '@/api/apiConfig'
import qs from "qs"

//获取医生病历
export function getTest(patientId, visitId) {
  
}

// 获取患者360视图链接
export function getPatient360View(patientId) {
  return axios.get(`${apiPath}getPatient360View/${patientId}`);
}
