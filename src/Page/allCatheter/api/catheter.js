import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

export const getCatheterList = (params) => {
    return axios.post(
      `${apiPath}fillType/catheter/catheterList`,
      params
    );
};
export const getCatheterTable = (params,formCode) => {
  return axios.post(
    `${apiPath}catheter/catheter/${formCode}/list`,
    params
  );
};
export const getCatheterTemplate = (params) => {
  return axios.get(
    `${apiPath}form/common/templates/catheter`,{params}
  );
};
export const createCathter = (params)=>{
  return axios.post(
    `${apiPath}catheter/${params.type}/${params.code}/createForm`,
    params
  );
}
export const getConfig = (formCode)=>{
  return axios.get(
    `${apiPath}form/design/itemDict/${formCode}`,
  );
}
export const saveCatheter = (params,formCode)=>{
  return axios.post(
    `${apiPath}catheter/catheter/${formCode}/save`,
    params
  );
}
export const getCatheterValueDict = (formCode)=>{
  return axios.get(
    `${apiPath}form/design/valueDict/${formCode}`
  );
}

