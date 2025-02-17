import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'

/**查询患者流转列表 */
export const patientFlowList = (params) => {
  return axios.post(`${apiPath}patientFlow/getFlowListByPc`, params)
}

/**查询患者流转详情 + 流转单数据 */
export const getPatientFlowDetail = (id) => {
  return axios.get(`${apiPath}patientFlow/getPCById/${id}`)
}
/**获取流转单格式 */
export const getFlowForm = (params) => {
  return axios.post(`${apiPath}pdaform/getByFormCode`, qs.stringify(params))
}
/**获取流转单 */
export const getFormList = (params) => {
  return axios.post(`${apiPath}form/design/list`, params)
}

/**获取统计科室 */
export const getDeptList = (params) => {
  return axios.get(`${apiPath}patientFlow/getDeptWithWardcode`)
}

/**统计折线图数据 */
export const getLineData = (params) => {
  return axios.post(`${apiPath}patientFlow/getTransferNum`, params)
}
/**统计柱形图数据 */
export const getBarData = (params) => {
  return axios.post(`${apiPath}patientFlow//getTransferByDept`, params)
}
/**统计饼图数据 */
export const getPieData = (params) => {
  return axios.post(`${apiPath}patientFlow/getProportion`, params)
}
