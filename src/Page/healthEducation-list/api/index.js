import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 根据患者id获取血糖记录
export function getListByParam(obj) {
  return axios.post(`${apiPath}follow/getListByParam`, obj);
}

//根据患者ID获取健康宣教内容
export function getDataById(id) {
  return axios.get(`${apiPath}form/design/get/${id}`);
}

// 获取科室
export function nursingUnit() {
  return axios.get(`${apiPath}user/nursingUnit`);
}

// 手动推送
export function push(obj) {
  return axios.post(`${apiPath}follow/push`, obj);
}

//根据可是获取患者
export function getByDeptCode(wardCode, formCode) {
  return axios.post(`${apiPath}follow/getPatByWardCode`, {
    wardCode,
    formCode
  });
}
