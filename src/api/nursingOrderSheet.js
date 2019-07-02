import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'
import sheetInfo from '@/Page/sheet-nursing-order/components/config/sheetInfo/'
export const saveBody = (patientId, visitId, data) => {
    data.patientId = patientId
    data.visitId = visitId
    data.id = sheetInfo.selectBlock.id
    data.formTitle = sheetInfo.formTitle
    console.log("POST护嘱：保存或修改，接口POST数据：", data, sheetInfo);
    // return axios.post(`${apiPath}record/${sheetInfo.sheetType}/saveAll`, data)
    return axios.post(`${apiPath}orders/public/save`, data);
}
// export const showBody = (patientId, visitId) => {
//     let data = {}
//     data.patientId = patientId
//     data.visitId = visitId
//     data.blockId = sheetInfo.selectBlock.id
//     return axios.post(`${apiPath}record/${sheetInfo.sheetType}/list`, data)
// }

export function showBody(id) {
    return axios.get(`${apiPath}orders/public/get/${id}`)
}


export const saveTitle = (data) => {
    data.blockId = sheetInfo.selectBlock.id
    return axios.post(`${apiPath}record/setting/save`, qs.stringify(data))
}
// 护嘱记录单标题
export const showTitle = (patientId, visitId) => {
    return axios.get(`${apiPath}record/setting/list/${sheetInfo.selectBlock.id}`)
}
// 护嘱记录单签名
export const sign = (patientId, visitId, data) => {
    data.patientId = patientId
    data.visitId = visitId
    data.id = sheetInfo.selectBlock.id
    data.formTitle = sheetInfo.formTitle
    // return axios.post(`${apiPath}record/${sheetInfo.sheetType}/signAll`, data)
    return axios.post(`${apiPath}orders/public/sign`, data);
}
// 护嘱记录单签名
export const cancelSign = (data) => {
    // http://127.0.0.1:8080/crNursing/api/orders/public/cancelSign
    /**
     * 
{
    "id": 29,
    "empNo":"admin",
    "password":"",
    "signType": 1,
    "list": [
        {
            "id": 4,
        }
    ]
}
     * 
     * 
    */
    // data.id = sheetInfo.selectBlock.id;

    return axios.post(`${apiPath}orders/public/cancelSign`, data);
    // return axios.post(`${apiPath}record/${sheetInfo.sheetType}/cancelSign`, qs.stringify(data))
}
// 删除页数
export const delPage = (id,empNo,password) => {
/*
{
    "id": 10,   sheetInfo.selectBlock.id
    "empNo":"admin",
    "password":"123",
}
*/
    let data = { 
        id: id, 
        empNo: empNo, 
        password: password 
    };
    return axios.post(`${apiPath}orders/public/delete`, data);
    // http://127.0.0.1:8080/crNursing/api/orders/public/delete
    // return axios.get(`${apiPath}record/${sheetInfo.sheetType}/delete/${patientId}/${visitId}/${index}`)
}
// 删除护嘱记录
export const delRow = (data) => {
    // http://127.0.0.1:8080/crNursing/api/orders/public/deleteRecord
/**
 * 
 * 
{
    "empNo":"admin",
    "password":"",
    "list": [
        {
            "id": 4,
        }
    ]
}
 * 
*/
    return axios.post(`${apiPath}orders/public/deleteRecord`, data)
    // return axios.post(`${apiPath}record/${sheetInfo.sheetType}/delete`, qs.stringify({id,password, empNo}))
}
// 设置标记
export const markSave = (data) => {
    data.recordCode = sheetInfo.sheetType
    return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/save`, qs.stringify(data))
}
// 删除标记
export const markDelete = (data) => {
    data.recordCode = sheetInfo.sheetType
    return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/delete`, qs.stringify(data))
}
// 获取标记集合
export const markList = (patientId,visitId) => {
    return axios.get(`${apiPath}record/${sheetInfo.sheetType}/sign/list/${sheetInfo.selectBlock.id}`)
}