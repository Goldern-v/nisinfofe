import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取数据
export function getListNurseBedExchange(obj) {
    return axios.post(
        `${apiPath}nurseBedExchange/listNurseBedExchange`,
        obj
    );
}


