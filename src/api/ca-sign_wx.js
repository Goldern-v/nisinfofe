// 登录模块api
import axios from "./axios";
import { apiPath } from "./apiConfig";
import qs from "qs";

//  获取服务器证书和随机数签名
export function getCertAndRandomSign() {
  return axios.post(`${apiPath}dsvs/getCertAndRandomSign`);
}
