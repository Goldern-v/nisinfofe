import axios from "@/api/axios";
import { apiPath  } from "@/api/apiConfig";
import qs from "qs";

/**获取统计 */
export function query(params) {
  return axios.post(`${apiPath}statisticalQuery/getPage`, params)
}

export function getWorkItems(type) {
  return axios.get(`${apiPath}statisticalQuery/getWorkItems/${type}`)
}

export function updateWorkItems(params) {
  return axios.post(`${apiPath}statisticalQuery/updateWorkItems`,params)
}

export const isEnableToEdit = () => {
  return axios.get(`${apiPath}inputItem/isEnableToEdit`);
};

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
