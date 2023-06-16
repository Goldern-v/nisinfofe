import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'

// 输液
export const getExecute = (wardCode,hospitalId) => {
    switch(hospitalId){
        case 'whsl':
        case 'hengli':
            // return axios.get(`${apiPath}board/getExecute/${wardCode}`)
        case 'wujing':
            return axios.post(`${apiPath}procedure/pdaExecute/pdaGetSYStatusWithWardcode`, {wardCode});
        default :
            return axios.get(`${apiPath}board/getExecute/${wardCode}`)

    }
}

// 输液详情
export const detail = (barCode) => {
    return axios.get(`${apiPath}execute/detail/${barCode}`);
}

// 输液详情-横沥
export const detailHl = (params,hospitalId) => {
    switch(hospitalId){
        case "hengli":
        case "wujing":
        case "nfyksdyy":
            return axios.post(`${apiPath}procedure/pdaExecute/detail`,params)
        default:
            return axios.post(`${apiPath}execute/detail`,params)
    }
}

// 保存警戒值日志
export const saveWarningLog = obj => {
return axios.post(`${apiPath}warningLog/save`, obj);
};

// 处理警戒值
export const dealWarningLog = (obj) => {
return axios.post(`${apiPath}warningLog/deal`, obj);
};
// 批量删除警戒值
export const deleteWarningLog = ids => {
return axios.post(`${apiPath}warningLog/delete`, {
    ids
});
};
// 保存或修改警戒值
export const saveOrupdateWarning = (wardCode, value) => {
return axios.post(`${apiPath}warningValue/saveOrupdate`, {
    wardCode,
    value
});
};
// 获取报警日志列表
export const getWarningLogList = obj => {
return axios.post(`${apiPath}warningLog/getListByParam`, obj);
};

// 根据科室获取警戒值
export const getWarningValue = (wardCode) => {
    return axios.post(`${apiPath}warningValue/getByWardCode`, {wardCode});
};

export const pdaGetSYStatusCountWithWardcodeAndTimeApi = (body) => {
    return axios.post(`${apiPath}procedure/pdaExecute/pdaGetSYStatusCountWithWardcodeAndTime`, body);
}
