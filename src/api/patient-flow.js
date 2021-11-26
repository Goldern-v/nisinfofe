import axios from './axios'
import {apiPath} from './apiConfig'

/**查询患者流转列表 */
export const patientFlowList = (params) => {
  return axios.post(`${apiPath}patientFlow/getFlowListByPc`, params)
}

/**查询患者流转详情 */
export const getPatientFlowDetail = (id) => {
  return axios.get(`${apiPath}patientFlow/getById/${id}`)
}
