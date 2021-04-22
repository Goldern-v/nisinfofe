import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取聊城执行单
export function getOrdersExecuteWithPatinetId(obj) {
  return axios.post(
    `${apiPath}hisLiaoChengExecute/getOrdersExecuteWithPatinetId`,
    obj
  );
}
