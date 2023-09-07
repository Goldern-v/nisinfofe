import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取聊城执行单
export function getOrdersExecuteWithPatinetId(obj) {
  return axios.post(
    `${apiPath}hisLiaoChengExecute/getOrdersExecuteWithPatinetIdNew`,
    obj
  );
}
// 获取执行单 by临邑
export function getExecuteWithWardCodeLyxrm(obj) {
  // 通过执行时间段获取
  return axios.post(
    `${apiPath}procedure/webExecute/getOrdersExecuteWithWardCodeNew`,
    obj
  );
}

// 获取执行单
export function getOrdersExecuteWithPatinetIdNew(obj) {
  // 通过执行时间段获取
  return axios.post(
    `${apiPath}procedure/webExecute/getOrdersExecuteWithPatinetIdNew`,
    obj
  );
}

// 导出执行单
export function getExportOrdersExecuteByPatien(obj) {
  // 通过执行时间段获取
  return axios.post(
    `${apiPath}procedure/webExecute/exportOrdersExecuteByPatien`,
    obj
  );
}
