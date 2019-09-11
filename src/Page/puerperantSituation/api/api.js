import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

export function getNurseList (query){
    return axios.post(`${apiPath}auditeNurseList/getByFormCodePC`,qs.stringify(query));
}
//获取记录单
export function getList (query){
    return axios.post(`${apiPath}obstetricBirthFormControl/getFrom`,query);
}

//获取 051102
export function getPatientList (deptCode){
    return axios.get(`${apiPath}bed/patList/${deptCode||'051102'}`);
}

//修改或增加登记表
export function changeOrSaveForm (params){
    return axios.post(`${apiPath}obstetricBirthFormControl/changeOrSaveForm`,params);
}

//删除产科分娩登记表
export function deleteForm (params){
    return axios.post(`${apiPath}obstetricBirthFormControl/deleteForm`,params);
}

//获取产妇其他基本资料
export function getCommonInfo (params){
    return axios.post(`${apiPath}obstetricBirthFormControl/getCommonInfoByPVList`,params);
}