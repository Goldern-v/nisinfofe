import { apiPath } from "@/api/apiConfig";
import axios from "@/api/axios";
import qs from "qs"

/**获取对应患者流转单列表 */
export function getPatientFlowList(params) {
  return axios.get(`${apiPath}patientFlow/group?${qs.stringify(params)}`)
}
