import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
// 同步麦迪斯顿
export const syncMedical = () => {
  return axios.get(`${apiPath}temperature/syncMedicalSystem`)
}
