import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

export function getDataById(formCode, id, formType) {
  return axios.get(`${apiPath}${formType}/${formCode}/get/${id}`);
}
/**保存打印记录 */
export function savePrint(params, formType, formCode) {
  return axios.post(`${apiPath}form/common/savePrint`, params)
}
/**获取打印记录 */
export function getPrintRecord(params, formType, formCode) {
  return axios.post(`${apiPath}form/common/getPrintRecord`, params)
}