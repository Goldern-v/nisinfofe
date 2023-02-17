import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

export function getList(query) {
    return axios.post(`${apiPath}nursingInstitution/getListWithJurisdiction`, query);
}

export function getFileContent(query) {
    return axios.post(`${apiPath}nursingInstitution/getFileContent`, qs.stringify(query), { responseType: 'blob' });
}

export function getFileTypes() {
    return axios.get(`${apiPath}nursingInstitution/getTypeDict`);
}

export function getCatalogByType(type) {
    return axios.post(`${apiPath}/nursingInstitution/getCatalogByType`, qs.stringify({ type }))
}
