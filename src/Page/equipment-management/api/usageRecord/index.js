import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 设备清单-设备类别
// 获取列表 分页
export function getList(data) {
  return axios.post(`${apiPath}deviceUsage/getPage`, data);
}
// 导出
export function deviceUsageExport(data, isRelated) {
  return axios.post(`${apiPath}/deviceUsage/export/${isRelated}`, data, { responseType: 'blob' });
}



