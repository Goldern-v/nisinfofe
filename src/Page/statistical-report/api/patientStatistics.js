// 登录模块api
import axios from '@/api/axios'
import {apiPath} from '@/api/apiConfig'
import qs from 'qs'

//  住院病人认知情况统计表
export function getList(data) {
  return axios.post(`${apiPath}patientCriticallyIll/getList`, data)
}

export function exportExcel(obj) {
  return axios.post(
      `${apiPath}patientStatistics/exportExcel`,
      obj, {
      responseType: "blob"
  }
  );
}
