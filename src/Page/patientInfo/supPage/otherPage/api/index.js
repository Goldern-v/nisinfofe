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
  switch(process.env.HOSPITAL_ID){
    case'lyxrm':
      return axios.get(`${apiPath}patient/nurse_getpatient360view/${patientId}`);
    default:
      return axios.get(`${apiPath}patient/getPatient360View/${patientId}`);
    }
}
