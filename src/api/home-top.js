import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'



// 护理文书
// export const getNote = (patientId, visitId) => {
//     return axios.get(`${apiPath}job/patientForm/${patientId}/${visitId}`)
// }

// 护理文书
export const getNote = (patientId, visitId) => {
    return axios.get(`${apiPath}eval/nursing/${patientId}/${visitId}/sign`)
}

// 病人相关诊断

export const patient = (patientId, visitId, pageIndex, pageSize) => {
    return axios.post(`${apiPath}nursingDiags/patient`, qs.stringify({patientId, visitId, pageIndex, pageSize}))
}

// 病人相关诊断
export const classJob = (nursingClass) => {
    return axios.post(`${apiPath}bed/classJob`, qs.stringify({nursingClass}))
}

// 病人相关诊断搜索
export const search = (keyword, pageIndex, pageSize) => {
    return axios.get(`${apiPath}nursingDiags/search/${keyword}/${pageIndex}/${pageSize}`)
}

// nursing - 保存护理诊断
export const save = (data) => {
    return axios.post(`${apiPath}nursingDiags/save`, data)
}

// nursing - 查看护理诊断详情
export const view = (id) => {
    return axios.get(`${apiPath}nursingDiags/view/${id}`)
}

// nursing - 更新护理诊断详情
export const update = (creator, id, measures, element) => {
    return axios.post(`${apiPath}nursingDiags/update`, {creator, id, measures, element})
}

// nursing - 停止护理诊断
export const stop = (operator, id, evalType	, evalContent) => {
    return axios.post(`${apiPath}nursingDiags/stop`, {operator, id, evalType, evalContent})
}

// nursing - 病人诊断任务列表
export const patientDiag = (diagId) => {
    return axios.get(`${apiPath}job/patientDiag/${diagId}`)
}


