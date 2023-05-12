import axios from "@/api/axios";
import { apiPath  } from "@/api/apiConfig";
import qs from "qs";

/**获取统计 */
export function query(params) {
  return axios.post(`${apiPath}statisticalQuery/getPage`, params)
}

export function exportExc(params) {
  return axios.post(
    `${apiPath}statisticalQuery/export`,
    params,
    {
      responseType: "blob"
    }
  )
}
// 会诊统计
export const queryConsultation = (params) => {
  return axios.post(`${apiPath}statisticalQuery/getPage`, params)
}
