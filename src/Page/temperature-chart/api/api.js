import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";
import moment from "moment";

//体温单批量录入 -- 获取科室患者信息
export function getPatientsInfo(query) {
  return axios.post(`${apiPath}bed/getPatientsInfo`, query);
}

//保存体温单
export function saveOverAllTemperture(params) {
  return axios.post(`${apiPath}record/body_temperature_Hd/saveOverAll`, params);
}
