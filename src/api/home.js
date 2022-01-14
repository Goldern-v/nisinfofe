import axios from './axios'
import qs from 'qs'
import {apiPath} from './apiConfig'

// 护理文书
export const getNote = (patientId, visitId, HisName = process.env.HOSPITAL_NAME) => {
  let hisList = {
    威县人民医院: `eval/nursingWithNewForm/${patientId}/${visitId}/all`,
    德州市陵城区人民医院: `eval/nursingWithNewForm/${patientId}/${visitId}/all`,
    东莞市厚街医院: `eval/nursingWithNewForm/${patientId}/${visitId}/all`,
    东莞市横沥医院: `eval/nursingWithNewForm/${patientId}/${visitId}/all`,
    北海市人民医院: `eval/nursingWithNewForm/${patientId}/${visitId}/all`,
    东莞市谢岗医院: `eval/nursingWithNewForm/${patientId}/${visitId}/all`,
  };
  let url = hisList[HisName] || `eval/nursing/${patientId}/${visitId}/all`
  return axios.get(`${apiPath}${url}`)
}

// 病人相关诊断
export const patient = (patientId, visitId, pageIndex, pageSize, status) => {
  return axios.post(`${apiPath}nursingDiags/patient`, qs.stringify({patientId, visitId, pageIndex, pageSize, status}))
}

// nursing - 查看护理诊断详情
export const view = (id) => {
  return axios.get(`${apiPath}nursingDiags/view/${id}`)
}

// nursing - 病人诊断任务列表
export const patientDiag = (diagId) => {
  return axios.get(`${apiPath}job/patientDiag/${diagId}`)
}

// 病人相关诊断搜索
export const search = (patientId, visitId, keyword, pageIndex, pageSize) => {
  return axios.get(`${apiPath}nursingDiags/search/${patientId}/${visitId}/${keyword}/${pageIndex}/${pageSize}`)
}

// nursing - 保存护理诊断
export const save = (data) => {
  return axios.post(`${apiPath}nursingDiags/save`, data)
}

// nursing - 更新护理诊断详情
export const update = (data) => {
  return axios.post(`${apiPath}nursingDiags/update`, data)
}

// nursing - 停止护理诊断
export const stop = (empNo, operator, id, evalType, evalContent) => {
  return axios.post(`${apiPath}nursingDiags/stop`, {empNo, operator, id, evalType, evalContent})
}

// 补充信息接口
export const savePatientInfo = (params) => {
  return axios.post(`${apiPath}procedure/nursing/savePatientInfo`, params)
}

export const getPatientList = (params) => {
  return axios.post(`${apiPath}procedure/nursing/getListPatientInfo`, params)
}

export const getListHisAreaDict = () => {
  return axios.get(`${apiPath}procedure/nursing/getListHisAreaDict`)
}

// 护理文书完成率
export const getNursingDocStatistics = (patientId,visitId) => {
  return axios.get(`${apiPath}nursingDocStatistics/completeRate/${patientId}/${visitId}`)
}
