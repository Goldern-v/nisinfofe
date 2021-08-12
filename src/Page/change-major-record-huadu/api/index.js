import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取数据
export function getListNurseAdt(obj) {
    return axios.post(
        `${apiPath}nurseAdtLog/listNurseAdt`,
        obj
    );
}


