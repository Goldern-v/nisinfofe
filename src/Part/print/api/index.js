import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

export function getDataById(formCode, id, formType) {
  return axios.get(`${apiPath}${formType}/${formCode}/get/${id}`);
}
