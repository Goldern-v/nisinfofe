import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 根据患者id获取血糖记录
export function getExecuteWithWardcode(obj) {
    return axios.post(
        `${apiPath}execute/getWardExecute`,
        obj
    );
}


