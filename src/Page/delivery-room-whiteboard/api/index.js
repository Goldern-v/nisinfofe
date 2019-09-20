// 智慧护理首页api  森
import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取产科产房得特殊情况
export function getListDescription(wardCode = "051102_01") {
  return axios.post(`${apiPath}nursePatsInHospitalBornManage/listDescription`, { wardCode });
}
// 获取产科产房得留言板
export function getListMessage(wardCode = "051102_01") {
  return axios.post(`${apiPath}nursePatsInHospitalBorn/listMessage`, { wardCode });
}
// 保存产科产房得特殊情况
export function saveOrUpdateDescription(data) {
  return axios.post(`${apiPath}nursePatsInHospitalBornManage/saveOrUpdateDescription`, data);
}
// 保存产科产房留言板
export function saveOrUpdateMessage(data) {
  return axios.post(`${apiPath}nursePatsInHospitalBornManage/saveOrUpdateMessage`, data);
}

