import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'


// 检查结果
export const list = (patientId, visitId) => {
    return axios.get(`${apiPath}nursingRecord/list/${patientId}/${visitId}`)
}

// 保存护理记录
export const save = (form) => {
    return axios.post(`${apiPath}nursingRecord/save`, qs.stringify(form))
}

// 时间获取护理记录
export const getDataByDate = (patientId, visitId, recordDate) => {
    return axios.get(`${apiPath}nursingRecord/get/${patientId}/${visitId}/${recordDate}`)
}

// 删除护理记录
export const deleteRecord = (id) => {
    return axios.get(`${apiPath}nursingRecord/delete/${id}`)
}

// 签名护理记录
export const sign = (id, status, password) => {
    return axios.post(`${apiPath}nursingRecord/sign`, qs.stringify({id, status, password}))
}