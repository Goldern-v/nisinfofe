import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'

// 修改表单表头病人信息
export const updateFormHead = (data) => {
    return axios.post(`${apiPath}form/updateFormHead`,data)
}