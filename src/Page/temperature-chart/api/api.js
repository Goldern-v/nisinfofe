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

const recordCodeList = {
  huadu: 'body_temperature_Hd',
  liaocheng: 'body_temperature_lcey',
  wujing: 'body_temperature_wj',
  zhongshanqi: 'body_temperature_zsqy'
}
recordCodeList[process.env.HOSPITAL_ID]
//新的体温单批量录入 （加上不同医院体温单code值）-- 获取科室患者信息
export function getPatientsInfo(query) {
  return axios.post(`${apiPath}record/${recordCodeList[process.env.HOSPITAL_ID]}/getPatientsInfo
`, query);
}

//保存体温单
export function saveOverAllTemperture(params) {
  return axios.post(`${apiPath}record/${recordCodeList[process.env.HOSPITAL_ID]}/saveOverAll`, params);
}

//聊城二院出入院同步
export function autoVitalSigns(data) {
  return axios.post(`${apiPath}vitalSign/autoVitalSigns`, data);
}

//聊城二院体温单列表
export function getVitalSignList(data) {
  return axios.post(`${apiPath}vitalSign/list`, data);
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

// // 聊城二院体温单录入
// export const saveAll = (data) => {
//   return axios.post(`${apiPath}vitalSign/saveAll`, data);
// };

// 聊城二院体温单删除记录
export const deleteRecord = (data) => {
  return axios.post(`${apiPath}vitalSign/delete`, data);
};

// 聊城二院体温单录入2
export const saveAll = (data) => {
  return axios.post(`${apiPath}vitalSign/saveAll`, data);
};

// 聊城二院获取最新10条体征信息
export const getLastList = (patientId, visitId) => {
  return axios.get(`${apiPath}vitalSign/lastList/${patientId}/${visitId}`);
};

// 聊城二院获取患者某个时间点的体征信息
export const getViSigsByReDate = (data) => {
  return axios.post(`${apiPath}vitalSign/getByRecordDate`, data);
};
