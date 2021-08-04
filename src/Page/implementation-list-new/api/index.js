import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 通过科室获取执行单，批量执行
export function getExecuteWithWardcode(obj) {
    return axios.post(
        `${apiPath}procedure/webExecute/webGetWardExecute`,
        obj
    );
}
// 网页端：医嘱查询，执行单打印用
export function getPrintExecuteWithWardcode(obj) {
    return axios.post(
        `${apiPath}procedure/webExecute/webGetOrdersPrint`,
        obj
    );
}
// 执行执行单（批量）
export function handleWebExecuteBatch(arr) {
    return axios.post(
        `${apiPath}/procedure/webExecute/webExecuteBatch`,
        arr
    );
}
// 网页端：打印结果查询（前端用于查看是否打印成功）
export function handleWebGetPrintResult(uuid) {
    return axios.post(
        `${apiPath}procedure/webExecute/webGetPrintResult`,{uuid}
    );
}


