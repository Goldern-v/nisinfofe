import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'
import { param } from 'jquery'



// 今日任务

// 留言板
export const getMsg = (deptCode, pageIndex, pageSize) => {
    return axios.get(`${apiPath}msgBoard/${deptCode}/${pageIndex}/${pageSize}`)
}
export const delMsg = (id) => {
    return axios.post(`${apiPath}msgBoard/delete`, qs.stringify({ id }))
}
export const updateMsg = (id, msg) => {
    return axios.post(`${apiPath}msgBoard/update`, qs.stringify({ id, msg }))
}
export const addMsg = (msg, deptCode) => {
    return axios.post(`${apiPath}msgBoard/commit`, qs.stringify({ msg, deptCode }))
}

// 护理评估
export const getMsgss = (deptCode, pageIndex) => {
    return axios.get(`${apiPath}msgBoard/${deptCode}/${pageIndex}`)
}

//科室文书任务
export const deptForm = (wardCode, type, pageIndex, pageSize) => {
    return axios.post(`${apiPath}job/deptForm`, qs.stringify({ wardCode, type, pageIndex, pageSize }))
}

//科室护理任务
export const deptNursing = (wardCode, type) => {
    return axios.post(`${apiPath}job/deptNursing`, qs.stringify({ wardCode, type }))
}
console.log(deptNursing)
//更新留言状态
export const accomplish = (id) => {
    return axios.post(`${apiPath}msgBoard/accomplish`, qs.stringify({ id }))
}

//病人信息
export const info = (patientId, visitId) => {
    return axios.get(`${apiPath}patient/info/${patientId}/${visitId}`)
}


// fsxt执行单保存备注
export const saveMark = (params) => {
    return axios.post(`${apiPath}procedure/webExecute/saveNurseExecute`, qs.stringify(params))
}


// 厚街-增加病历召回和重新归档功能
export const medicalRecall = (params) => {
    return axios.post(`${apiPath}indexInfo/getMedicalRecall`, qs.stringify(params))
}
