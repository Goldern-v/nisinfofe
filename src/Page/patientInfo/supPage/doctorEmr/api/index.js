import axios from '@/api/axios'
import {
  apiPath
} from '@/api/apiConfig'

//获取医生病历
export function getDoctorEmr(patientId, visitId) {
  return axios.get(`${apiPath}patient/doctorEmrs/${patientId}/${visitId}`)
}
