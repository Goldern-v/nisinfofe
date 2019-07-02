// 登录模块api
import axios from './axios'
import { apiPath } from './apiConfig'
import qs from 'qs'
// 列表
export const list = (deptCode, startDeliverDate, endDeliverDate) =>
  axios.post(
    `${apiPath}changeShift/list`,
    qs.stringify({ deptCode, startDeliverDate, endDeliverDate })
  )
// 添加
export const existsRange = (deptCode, deliverDate, range) =>
  axios.get(
    `${apiPath}changeShift/existsRange/${deptCode}/${deliverDate}/${range}`
  )
// 操作
export const operate = data =>
  axios.post(`${apiPath}changeShift/operate`, qs.stringify(data))
// 操作
export const get = id => axios.get(`${apiPath}changeShift/get/${id}`)
export const del = id => axios.get(`${apiPath}changeShift/delete/${id}`)
// 科室实时数据
export const realTimeData = (deptCode, range, dateStr) =>
  axios.get(
    `${apiPath}changeShift/realTimeData/${deptCode}?range=${range}&dateStr=${dateStr}`
  )
