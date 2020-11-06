import axios from "@/api/axios";
import {
  apiPath
} from "@/api/apiConfig";

// 获取用户信息
export function getUser(password, empNo) {
  return axios.post(`${apiPath}user/getUser`, {
    password,
    empNo
  });
}
