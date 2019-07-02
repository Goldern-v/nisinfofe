import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取血透病人列表
export const getHDPatientList = () => {
  return axios.get(`${apiPath}hemodialysis/getHDPatientList`);
};

// 获取颜色字典
export const getColorDict = () => {
  return axios.get(`${apiPath}hemodialysis/getColorDict`);
};

// 获取透析方式字典
export const getHDWayDict = () => {
  return axios.get(`${apiPath}hemodialysis/getHDWayDict`);
};

// 更新患者血透信息
export const savePatientHDInfo = obj => {
  return axios.post(`${apiPath}hemodialysis/savePatientHDInfo`, obj);
};

// 查询患者排班记录
export const getPatientArrange = (startDate, endDate) => {
  return axios.post(
    `${apiPath}hemodialysis/getPatientArrange`,
    qs.stringify({
      startDate,
      endDate
    })
  );
};

// 自动排班
export const generalPatientArrange = (startDate, endDate) => {
  return axios.post(`${apiPath}hemodialysis/generalPatientArrange`, {
    startDate,
    endDate
  });
};

// 获取血透设备区域列表
export const getAreaDict = () => {
  return axios.get(`${apiPath}hemodialysis/getAreaDict`);
};
// 获取血透设备列表
export const getEquiDict = () => {
  return axios.get(`${apiPath}hemodialysis/getEquiDict`);
};

// 保存血透位置信息
export const savePatientArrange = obj => {
  return axios.post(`${apiPath}hemodialysis/savePatientArrange`, obj);
};
// 保存门诊病人位置信息
export const saveTempArrange = obj => {
  return axios.post(`${apiPath}hemodialysis/saveTempArrange`, obj);
};

// 删除血透设备位置信息
export const deletePatientArrange = obj => {
  return axios.post(`${apiPath}hemodialysis/deletePatientArrange`, obj);
};
// 删除血透设备位置信息
export const searchPatient = search => {
  return axios.post(`${apiPath}hemodialysis/searchPatient`, { search });
};
// 批量保存患者血透排班内容
export const saveBatchHDArrange = list => {
  return axios.post(`${apiPath}hemodialysis/saveBatchHDArrange`, { list });
};
