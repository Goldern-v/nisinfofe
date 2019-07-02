import axios from '@/api/axios'
import { apiPath } from '@/api/apiConfig'

// 查询病区科室
export function listDepartment (parentCode) {
  return axios.get(`${apiPath}wardDaily/getDeptWithWardcode/${parentCode}`)
}

// 查询病区工作日报
export function listWardReport (deptCode, date) {
  return axios.get(`${apiPath}wardDaily/getWardLog/${deptCode}/${date}`)
}
