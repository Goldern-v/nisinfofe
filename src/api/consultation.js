import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'

// 保存会诊记录
export const save = (data) => {
    return axios.post(`${apiPath}consultation/save`, data)
}

// 获取病人会诊列表
export const getPatientList = (patientId, visitId) => {
    return axios.post(`${apiPath}consultation/getPatientList`, qs.stringify({patientId, visitId}))
}

// 获取会诊科室
export const getAllDept = (beDeptCode) => {
    return axios.get(`${apiPath}dept/nursingUnit`)
}

// 获取会诊详情
export const detail = (conId) => {
    return axios.get(`${apiPath}consultation/detail/${conId}`)
}

// 获取护理部会诊列表
export const nurseList = (isManySubject, status, pageIndex, pageSize) => {
    return axios.post(`${apiPath}consultation/nurse/nurseList`, qs.stringify({isManySubject, status, pageIndex, pageSize}))
}

// 获取科室员工
export const users = (code) => {
    return axios.get(`${apiPath}dept/users/${code}`)
}
// 删除申请
export const delCon = (id) => {
    return axios.post(`${apiPath}consultation/delete`, qs.stringify({id}))
}

// 获取病人历史诊断
export const patDiag = (wardCode, patientId, visitId) => {
    return axios.post(`${apiPath}consultation/patDiag`, qs.stringify({wardCode, patientId, visitId}))
}

// 获取科室人员列表
export const getDeptUserList = (code) => {
    return axios.post(`${apiPath}consultation/getDeptUserList`, {code})
}

// 分配会诊人
export const answer = (postData) => {
    return axios.post(`${apiPath}consultation/answer`, postData)
}

// 填写会诊意见
export const sug = (postData) => {
    return axios.post(`${apiPath}consultation/sug`, postData)
}

// 会诊列表（科室）
export const deptList = (type, status, pageIndex, pageSize) => {
    return axios.post(`${apiPath}/consultation/dept/deptList`, qs.stringify({type, status, pageIndex, pageSize}))
}

