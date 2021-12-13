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
export function listNurseAdtHd(data,HOSPITAL_ID) {
  if(HOSPITAL_ID && HOSPITAL_ID=='fuyou'){//江门妇幼
    return axios.post(`${apiPath}nurseAdtLog/listNurseAdtJm`,data);
  }else {
    return axios.post(`${apiPath}nurseAdtLog/listNurseAdtHd`,data);
  }
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}

// 获取江门妇幼
export function listNurseAdtFuYou(data) {
  return axios.post(`${apiPath}nurseAdtLog/listNurseAdtJm`,data);
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}


