import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取陵城执行单
export function getExecuteWithWardcodeLc(obj) {
  return axios.post(
    `${apiPath}hisLingChengExecute/getOrdersExecuteWithWardCode`,
    obj
  );
}
// 获取聊城执行单
export function getExecuteWithWardcodeLiaoC(obj) {
  return axios.post(
    `${apiPath}hisLiaoChengExecute/getOrdersExecuteWithWardCode`,
    obj
  );
}
// 补录（陵城）
export function addRecord(obj) {
  return axios.post(`${apiPath}procedure/his`, obj);
}
// 补录（聊城）
export function addRecordLiaoc(obj) {
  return axios.post(`${apiPath}hisLiaoChengExecute/orderExecute`, obj);
}
// 更新实际执行时间/结束输液时间
export function updateExecuteTime(obj) {
  return axios.post(`${apiPath}hisLingChengExecute/getorderexecuteUpdate`, obj);
}
