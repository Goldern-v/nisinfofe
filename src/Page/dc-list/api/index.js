import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";


export function getListByParam(obj) {
    return axios.post(
        `${apiPath}personCheck/info/getPage`,
        obj
    );
}
export function exportExcel(obj) {
    return axios.post(
        `${apiPath}personCheck/info/export`,
        obj, {
        responseType: "blob"
    }
    );
}



