import axios from '@/api/axios'
import {
  apiPath
} from '@/api/apiConfig'
import qs from "qs"

//获取医生病历
export function getTest(patientId, visitId) {

}

// 获取患者360视图链接
export function getPatient360View(patientId, visitId) {
  if (process.env.HOSPITAL_ID === 'whhk') {
    return axios.get(`${apiPath}patient/getPatient360ViewBase`, { params: { patientId, visitId } });
  } else {
    return axios.get(`${apiPath}patient/getPatient360View/${patientId}`);
  }
}
