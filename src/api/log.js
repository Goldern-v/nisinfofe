import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'

// 病区动态日志
export const getWardLog = (wardCode, Date) => {
    return axios.get(`${apiPath}patient/getWardLog/${wardCode}/${Date}`)
}

// 病区等床病人
export const getWaitingPat = (wardCode) => {
    return axios.get(`${apiPath}patient/getWaitingPat/${wardCode}`)
}

