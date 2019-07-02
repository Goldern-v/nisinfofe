import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'

// 收件箱
export const inbox = (pageIndex, pageSize) => {
    return axios.get(`${apiPath}mail/inbox`, {params:{pageIndex, pageSize}})
}
// 删除
export const del = (id) => {
    return axios.get(`${apiPath}mail/delete/${id}`)
}
// 已读
export const read = (id) => {
    return axios.get(`${apiPath}mail/read/${id}`)
}
// 获取未读数
export const unread = () => {
    return axios.get(`${apiPath}mail/unread`)
}

// 详情
export const detail = (id) => {
    return axios.get(`${apiPath}mail/detail/${id}`)
}


