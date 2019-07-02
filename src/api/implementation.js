// 登录模块api
import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'
/**
 * 列表
 * @param { Number } wardCode 护理单元code
 * @param { Date } startDate  开始时间，YYYY-MM-DD
 * @param { Date } endDate    结束时间，YYYY-MM-DD
 */
export const list = (wardCode, startDate, endDate, type) => {
  return axios.post(
    `${apiPath}execute/ward`,
    qs.stringify({wardCode:wardCode, startDate:startDate, endDate:endDate, type})
  )
}


