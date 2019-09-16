import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";
import { $params } from "../tool/tool";

// 根据患者id获取血糖记录
export function getSugarListWithPatientId(patientId, visitId) {
  return axios.post(
    `${apiPath}threeTest/getSugarListWithPatientId`,
    qs.stringify({ patientId, visitId })
  );
}

// 获取起始页码
export function getPvHomePage(patientId, visitId) {
  return axios.post(`${apiPath}form/pvHomePage/get`, {
    patientId,
    visitId,
    formType: "sugar",
    formCode: "procedure"
  });
}
