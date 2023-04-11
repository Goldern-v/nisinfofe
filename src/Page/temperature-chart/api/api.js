import axios from "@/api/axios";
import qs from "qs";
import {
  apiPath
} from "@/api/apiConfig";
import moment from "moment";

// //体温单批量录入 -- 获取科室患者信息
// export function getPatientsInfo(query) {
//   return axios.post(`${apiPath}bed/getPatientsInfo`, query);
// }

const getRecordType = (HOSPITAL_ID) => {
  switch (HOSPITAL_ID) {
    case 'huadu':
      return 'body_temperature_hd'
    case 'wujing':
      return 'body_temperature_wj'
    case 'zhongshanqi':
      return 'body_temperature_zsqy'
    // case 'liaocheng':
    //   return 'body_temperature_lcey'
    case 'guizhou':
      return 'body_temperature_gzry'
    // case 'fuyou':
    //   return 'body_temperature_jm'
    case 'hengli':
      return 'body_temperature_hl'
    case 'quzhou':
      return 'body_temperature_qz'
    case 'beihairenyi':
      return 'bodyTemperatureLocal'
    case 'nanfangzhongxiyi':
      return 'body_temperature_nfzxy'
    default:
      return 'bodyTemperatureLocal'
  }
}

//新的体温单批量录入 （加上不同医院体温单code值）-- 获取科室患者信息
export function getPatientsInfo(query) {
  return axios.post(`${apiPath}record/${getRecordType(process.env.HOSPITAL_ID)}/getPatientsInfo
`, query);
}

//保存体温单
export function saveOverAllTemperture(params) {

  return axios.post(`${apiPath}record/${getRecordType(process.env.HOSPITAL_ID)}/saveOverAll`, params);
}
//获取当天的录入记录
export const getNowDateTimeList = (data) => {
  return axios.post(`${apiPath}vitalSign/list`, data);
};

//聊城二院出入院同步
export function autoVitalSigns(data) {
  return axios.post(`${apiPath}vitalSign/autoVitalSigns`, data);
}

//聊城二院体温单列表
export function getVitalSignList(data) {
  return axios.post(`${apiPath}vitalSign/list`, data);
}

/**
 * 1.9 聊城二院获取最新10条体征信息
 * @param {*} data.patientId 患者id
 * @param {*} data.visitId 入院次数
 */
export function getVitalSignListBy10(data) {
  return axios.get(`${apiPath}vitalSign/lastList/${data.patientId}/${data.visitId}`);
}

// 通过护理单元获取体征字典表
export const getmultiDict = (wardcode) => {
  return axios.get(`${apiPath}threeTest/type/${wardcode}`);
};

// 聊城二院获取体温单自定义标题
export const getfieldList = (data) => {
  return axios.post(`${apiPath}vitalSign/fieldSetting/list`, data);
};

// 聊城二院保存体温单自定义标题
export const savefieldTitle = (data) => {
  return axios.post(`${apiPath}vitalSign/fieldSetting/save`, data);
};
//花都七天自定义标题
export const savefieldTitleNew = (data) => {
  return axios.post(`${apiPath}record/${getRecordType(process.env.HOSPITAL_ID)}/fieldSetting/save`, data);
};

// 聊城二院体温单删除记录
export const deleteRecord = (data) => {
  return axios.post(`${apiPath}record/${getRecordType(process.env.HOSPITAL_ID)}/delete`, data);
};

// 聊城二院体温单录入2
export const saveAll = (data) => {
  return axios.post(`${apiPath}record/${getRecordType(process.env.HOSPITAL_ID)}/saveAll`, data);
};

/** 获取指定日期最近10天的录入数据数据 */
export const getVitalSignListByDate = (query = {
  patientId: '',
  visitId: '',
  wardCode: '',
  recordDate: ''
}) => {
  return axios.post(`${apiPath}vitalSign/list`, query);
};

//佛山市一保存上周的自定义项目
export const copySetting = (query = {
  patientId: '',
  visitId: '',
  wardCode: '',
  recordDate: ''
}) => {
  return axios.post(`${apiPath}vitalSign/fieldSetting/copySetting`, query);
};

/** 获取最新10条体征信息 */
export const getLastList = (patientId, visitId) => {
  return axios.get(`${apiPath}vitalSign/lastList/${patientId}/${visitId}`);
};
// 聊城二院获取患者某个时间点的体征信息
export const getViSigsByReDate = (data) => {
  return axios.post(`${apiPath}vitalSign/getByRecordDate`, data);
};
