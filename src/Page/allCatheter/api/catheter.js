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

export const catheterExport = (params,formCode, type) => {
  return axios.post(
    `${apiPath}catheter/${type}/${formCode}/export`,
    params, { responseType: 'blob' }
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

export const delRowApi = (params,formCode)=>{
  return axios({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: `${apiPath}catheter/catheter/${formCode}/delete`,
    params: params
})
}

export const delAllApi = (params,formCode)=>{
  return axios({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: `${apiPath}catheter/catheter/${formCode}/deleteWhole`,
    params: params
})
}
export const updateInfo = (params,formCode)=>{
  return axios.post(
    `${apiPath}catheter/catheter/${formCode}/updateInfo`,
    params
  )
}
export const extubationApi = (params,formCode)=>{
  return axios.post(
    `${apiPath}/catheter/catheter/${formCode}/extubation`,
    params
  )
}