import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'

// 体温单
export const getTemperatue = (patientId, visitId, startDate) => {
    return axios.get(`${apiPath}patient/getTemperatue/${patientId}/${visitId}/${startDate}`)
}

