import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 设备清单-设备类别
// 获取列表 分页
export function getList(data) {
  return axios.post(`${apiPath}deviceType/getPage`, data);
}
// 查询全部 设备类别
export function getAllDeviceType() {
  return axios.get(`${apiPath}deviceType/getAll`);
}
// 添加
export function add(data) {
  return axios.post(`${apiPath}deviceType/saveOne`, data);
}
// 修改
export function update(data) {
  return axios.post(`${apiPath}deviceType/updateOne`, data);
}
// 删除
export function deleteOne(data) {
  return axios.post(`${apiPath}deviceType/deleteOne`, data);
}

// 导出
export function deviceTypeExport(data) {
  return axios.post(`${apiPath}deviceType/export`, data, { responseType: 'blob' });
}

// 下载模板 
export function downloadTemplate_Type() {
  return axios.get(`${apiPath}deviceType/downloadTemplate`, { responseType: 'blob' });
}


