import axios from "@/api/axios";
import qs from "qs";
import {
    apiPath
} from "@/api/apiConfig";

// 获取数据
export function getNursingVisitLc(obj) {
    return axios.post(
        `${apiPath}nursingVisitLc/listLingChenPc`,
        obj
    );
}
