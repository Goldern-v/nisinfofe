import axios from '@/api/axios.js'
import {apiPath} from '@/api/apiConfig.js'
// 获取表单列表
export function getFormLists() {
  return axios.get(`${apiPath}formTemplateShow/list`)
}

