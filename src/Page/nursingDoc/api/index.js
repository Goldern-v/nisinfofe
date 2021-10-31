import axios from "axios";
import {
    apiPath
} from '@/api/apiConfig'

// 登录
export function checkLogin(data) {
    return axios.post(`${apiPath}identityCheck`, data)
}
//通过床位获取患者信息
export function  getPatient(expand1) {
    return axios.post(`${apiPath}hisDataAnalysis/getPatient`, {expand1})
}
export default {
    checkLogin,
    getPatient,
}
