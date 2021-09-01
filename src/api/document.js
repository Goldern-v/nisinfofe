// 登录模块api
import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'

//  病人列表(文书) json传参
export function patEmrList(data) {
  return axios.post(`${apiPath}patient/patEmrList`, data)
}
//  病人列表(文书) json传参(中山七)
export function patEmrListZSQ(data) {
  return axios.post(`${apiPath}patient/getPatientsByDiagnosis`, data)
}
//  病人列表(文书) json传参
export function patEmrListWithPatInfo(data) {
  return axios.post(`${apiPath}patient/patEmrListWithPatInfo`, data)
}

// 获取转科数据
export function listNurseAdtHd(data) {
  return axios.post(`${apiPath}nurseAdtLog/listNurseAdtHd`,data);
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}


