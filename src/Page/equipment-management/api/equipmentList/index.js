import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 设备清单-设备列表
// 获取列表 分页
export function getList(data) {
  return axios.post(`${apiPath}device/getPage`, data);
}
// 查询全部 设备类别
export function getAll() {
  return axios.get(`${apiPath}deviceType/getAll`, { responseType: 'blob' });
}
// 添加
export function add(data) {
  return axios.post(`${apiPath}device/saveOne`, data);
}
// 修改
export function update(data) {
  return axios.post(`${apiPath}device/updateOne`, data);
}
// 删除
export function deleteOne(data) {
  return axios.post(`${apiPath}device/deleteOne`, data);
}

// 导出
export function deviceExport(data) {
  return axios.post(`${apiPath}device/export`, data, { responseType: 'blob' });
}

// 下载模板 
export function downloadTemplate() {
  return axios.get(`${apiPath}device/downloadTemplate`, { responseType: 'blob' });
}

// 获取所有二维码规格
export function getAllQrCodeSize() {
  return axios.get(`${apiPath}device/getAllQrCodeSize`);
}

// 判断是否为护理部
export function getIsNursingMinister() {
  return axios.get(`${apiPath}device/isNursingMinister`);
}