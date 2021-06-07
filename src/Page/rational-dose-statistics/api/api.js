import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取合理用药统计列表（中山七）
export function getListZSQ(query) {
    return axios.post(`${apiPath}hisZhongShanQiYuanExecute/rationalDoseStatistics`, query);
}
