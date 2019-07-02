import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'

// 全科排班
export const deptSetting = (wardCode) => {
    return axios.get(`${apiPath}board/deptSetting/${wardCode}`)
}

// 留言板
export const getMsg = (wardCode) => {
    return axios.get(`${apiPath}board/getMsg/${wardCode}`)
}

// 病人日志
export const wardPatient = (wardCode) => {
    return axios.get(`${apiPath}board/wardPatient/${wardCode}`)
}

// 通知消息
export const getNotice = (wardCode) => {
    return axios.get(`${apiPath}board/getNotice/${wardCode}`)
}

// 科室基础与文书任务
export const deptJob = (wardCode) => {
    return axios.post(`${apiPath}board/deptJob`, qs.stringify({wardCode}))
}

// 巡视任务
export const deptVMJob = (wardCode) => {
    return axios.post(`${apiPath}board/deptVMJob`, qs.stringify({wardCode}))
}

