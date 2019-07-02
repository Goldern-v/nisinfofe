import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'

// 输液
export const getExecute = (wardCode) => {
    return axios.get(`${apiPath}board/getExecute/${wardCode}`)
}

// 输液详情
export const detail = (barCode) => {
    return axios.get(`${apiPath}execute/detail/${barCode}`)
}


