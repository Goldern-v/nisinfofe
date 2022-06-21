import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'
import sheetInfo from '@/Page/sheet-page/components/config/sheetInfo/index.js'
// 护理记录单标题
export const titleList = (patientId, visitId, recordCode) => {
    return axios.get(`${apiPath}record/setting/list/${patientId}/${visitId}/${recordCode}`)
}
// 护理记录单所有内容
export const allList = (patientId, visitId, recordCode, type = '100') => {
    return axios.get(`${apiPath}record/${recordCode}/list/${patientId}/${visitId}?type=${type}`)
}

// 护理记录单标题设置
export const save = (data) => {
    return axios.post(`${apiPath}record/setting/save`, qs.stringify(data))
}

// 护理记录单保存
export const recordSave = (recordCode, data) => {
    return axios.post(`${apiPath}record/${recordCode}/save`, qs.stringify(data))
}
// 护理记录单签名
export const signSave = (recordCode, data) => {
    return axios.post(`${apiPath}record/${recordCode}/sign`, qs.stringify(data))
}
// 通过id 获取详情
export const get = (recordCode, id) => {
    return axios.get(`${apiPath}record/${recordCode}/get/${id}`)
}
// 通过id 删除
export const del = (recordCode, id) => {
    return axios.get(`${apiPath}record/${recordCode}/delete/${id}`)
}
// 通过id 删除
export const delAll = (recordCode, patientId, visitId) => {
    return axios.get(`${apiPath}record/${recordCode}/deleteAll/${patientId}/${visitId}`)
}
// 出入量统计
export const outputSum = (patientId, visitId, recordCode, startTime, endTime, description,type) => {
    return axios.post(`${apiPath}record/${recordCode}/outputSum`, {
        startTime,endTime,description,blockId: sheetInfo.selectBlock.id,type
    })
}
// 出入量统计（花都）
export const outputSumHd = (patientId, visitId, recordCode, startTime, endTime, description,inCheckedList,outCheckedList) => {
    return axios.post(`${apiPath}record/${recordCode}/outputSum`, {
        startTime,endTime,description,blockId: sheetInfo.selectBlock.id,inCheckedList,outCheckedList
    })
}
// 删除评估单
export const evalDel = (id, operator, empNo) => {
    return axios.post(`${apiPath}eval/delete`,{id, operator, empNo})
}

// 根据时间获取评估单
export const getRecordByDate = (recordCode, patientId, visitId, recordDate) => {
    return axios.get(`${apiPath}record/${recordCode}/get/${patientId}/${visitId}/${recordDate}`)
}

// 获取字典项
export const listItem = (code) => {
    return axios.post(`${apiPath}dept/dictInfo`, qs.stringify({code}))
}

