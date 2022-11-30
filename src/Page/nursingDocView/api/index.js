import axios from "axios";
import {
    apiPath
} from '@/api/apiConfig'
const HOSPITAL_ID = process.env.HOSPITAL_ID
// 登录
export function checkLogin(data) {
    return axios.post(`${apiPath}identityCheck`, data)
}
//通过床位获取患者信息
export function getPatient(expand1) {
    if (HOSPITAL_ID == 'nanfangzhongxiyi') {
        return axios.post(`${apiPath}/hisDataAnalysis/getPatientByExpand3`, {expand3:expand1})
    }
    return axios.post(`${apiPath}hisDataAnalysis/getPatient`, {expand1})
}
export default {
    checkLogin,
    getPatient,
}
