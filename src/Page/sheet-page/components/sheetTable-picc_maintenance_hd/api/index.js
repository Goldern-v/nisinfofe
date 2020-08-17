import axios from "@/api/axios";
import {
  apiPath
} from "@/api/apiConfig";

// 获取最新一次评估单信息
export const getLastDetail = data => {
  return axios.post(`${apiPath}form/getLastDetail`, data);
};
