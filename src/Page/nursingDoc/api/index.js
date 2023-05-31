import axios from "axios";
import {
    apiPath
} from '@/api/apiConfig'
const HOSPITAL_ID = process.env.HOSPITAL_ID
// 登录
export function checkLogin(data) {
    /*whsl 跳转逻辑有点问题，暂时把token设置null，每次请求接口重新根据user信息获取token*/
    // if(HOSPITAL_ID === 'whsl'){
    //     return axios.post(`${apiPath}identityCheck`, data,{headers: {
    //             "Auth-Token-Nursing": ""
    //         }})
    // }else
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
