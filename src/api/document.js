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
  } else if(HOSPITAL_ID && HOSPITAL_ID == 'nanfangzhongxiyi') {
    return axios.post(`${apiPath}nurseAdtLog/listNurseAdtNFZXY`,data);
  } else if(HOSPITAL_ID && HOSPITAL_ID == 'beihairenyi') {
    return axios.post(`${apiPath}nurseAdtLog/listNurseAdtBh`,data);
  } else {
    return axios.post(`${apiPath}nurseAdtLog/listNurseAdtHd`,data);
  }
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}

//横沥同步出院患者
export function synchronizeHengLi() {
  return axios.get(`${apiPath}HisHengLiDischarge/syncDischargePat`);
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}
//武汉肺科同步出院患者
export function synchronizeWHFK() {
  let url = 'syncOutHospital';
  switch (process.env.HOSPITAL_ID) {
    case "whfk":
      url = 'syncOutHospital'
      break;
    case "xiegang":
      url = "syncOutHospitalXg";
      break;
    default:
      url = 'syncOutHospital'
      break;
  }
  return axios.get(`${apiPath}patient/${url}`);
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}
// 北海-转科同步患者
export function syncMajorBH(wardCode) {
  return axios.get(`${apiPath}HisBeiHaiExecute/syncPatientTransfer/${wardCode}`);
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}

// 谢岗同步患者出院
export function syncOutHospitalXg() {
  return axios.get(`${apiPath}patient/syncOutHospitalXg`);
}

export function synchronizeFuyou() {
  return axios.get(`${apiPath}FuYouDischarge/syncDischargePat`);
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}

// 获取江门妇幼
export function listNurseAdtFuYou(data) {
  return axios.post(`${apiPath}nurseAdtLog/listNurseAdtJm`,data);
  //return axios.post(`${apiPath}nurseAdtLog/listNurseAdt`,data);
}

/**
 * 武警导出
 * @param {} params
 * @returns
 */
export function handleExport(params) {
  return axios.post(
    `${apiPath}patient/exportPatList`,
    params,
    {
      responseType: "blob"
    })
}
