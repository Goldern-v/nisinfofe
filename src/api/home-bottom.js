import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'


// 取消或完成任务
export const updateStatus = (password, id, status, remark) => {
    return axios.post(`${apiPath}job/updateStatus`, qs.stringify({password, id, status, remark}))
}


