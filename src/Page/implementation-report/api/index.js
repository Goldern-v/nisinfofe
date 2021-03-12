import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 执行单的查询
export function getExecuteList(obj) {
    return axios.post(
        `${apiPath}executeWeiXian/listPc`,
        obj
    );
}
// 执行单的批量审核
export function auditExecuteList(obj) {
    return axios.post(
        `${apiPath}executeWeiXian/executeList`,
        obj
    );
}


