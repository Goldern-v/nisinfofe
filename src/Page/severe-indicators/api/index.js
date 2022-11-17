import axios from '@/api/axios'
import { apiPath } from '@/api/apiConfig'
import qs from 'qs'

// 获取汇总表列表
export const getIcuQcSummaryList = (params) => {
  return axios.get(`${apiPath}icu/qc/summary/list`, { params: params })
}

/**
 * 汇总表指标列表查询
 * @param {*} summaryCode 示例：001-2022-11
 * @returns
 */
export const getIcuQcSummaryItem = (summaryCode) => {
  return axios.get(`${apiPath}icu/qc/summary/items`, { params: { summaryCode } })
}

// 保存
export const icuQcSummarySave = () => {

}
/**
 * 同步数据
 * @param {*} summaryCode 示例：001-2022-11
 * @returns
 */
export const icuQcSummarySync = (summaryCode) => {
  return axios.get(`${apiPath}icu/qc/summary/sync`, { params: { summaryCode } })
}
/**
 * 创建汇总表
 */
export const icuQcSummaryCreate = (params) => {
  return axios.post(`${apiPath}icu/qc/summary/create`, params)
}
