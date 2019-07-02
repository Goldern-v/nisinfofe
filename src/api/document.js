// 登录模块api
import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'

//  病人列表(文书) json传参
export function patEmrList(data) {
  return axios.post(`${apiPath}patient/patEmrList`, data)
}


