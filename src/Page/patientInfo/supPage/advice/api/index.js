import axios from '@/api/axios'
import qs from 'qs'
import { apiPath } from '@/api/apiConfig'

// 威县 -- 同步医嘱
export const syncGetPatientOrders = (patientId, visitId) => {
    return axios.get(`${apiPath}hisDispenseExecute/syncGetPatientOrders/${patientId}/${visitId}`)
}

// 南方医科大学顺德医院 -- 同步医嘱
export const getOrdersWithSync = (patientId, visitId) => {
    return axios.get(`${apiPath}patient/getOrdersWithSync/${patientId}/${visitId}`)
}

/**
 * 医嘱状态字典
 */
export const getNurseOrderStatusDict = () => {
    return axios.get(`${apiPath}OrderStatusDict/getNurseOrderStatusDict`)
}
