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
// 补录
export function addRecord(obj) {
  return axios.post(`${apiPath}procedure/his`, obj);
}
