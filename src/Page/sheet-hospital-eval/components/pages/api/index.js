import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";


// getJSON - 新表单：获取JSON数据
/** */
export async function getJSON(url) {
  return axios.get(`${url}`);
}
