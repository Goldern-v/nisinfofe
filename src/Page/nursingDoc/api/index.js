import axios from "axios";
import {
    apiPath
} from '@/api/apiConfig'

// 登录
export function checkLogin(data) {
    return axios.post(`${apiPath}identityCheck`, data)
}
export default {
    checkLogin
}
