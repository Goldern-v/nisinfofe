import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

export function getList(query) {
    return axios.get(`${apiPath}patientRoom/getPage?${qs.stringify(query)}`);
}
export function getBedNo(query) {
    return axios.get(`${apiPath}patientRoom/getBedNo/${query.deptCode}`);
}

export function deletePatientRoom(query) {
    return axios.post(`${apiPath}patientRoom/delete`, query);
}
export function addPatientRoom(query) {
    return axios.post(`${apiPath}patientRoom/save`,query);
}

export function updatePatientRoom(query) {
    return axios.post(`${apiPath}patientRoom/update`, query);
}
