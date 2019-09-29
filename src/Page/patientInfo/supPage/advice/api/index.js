import axios from '@/api/axios'
import qs from 'qs'
import { apiPath } from '@/api/apiConfig'

// 威县 -- 同步医嘱
export const syncGetPatientOrders = (patientId, visitId) => {
    return axios.get(`${apiPath}hisDispenseExecute/syncGetPatientOrders/${patientId}/${visitId}`)
}
