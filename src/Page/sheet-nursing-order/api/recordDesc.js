import axios from '@/api/axios'
import {apiPath} from '@/api/apiConfig'
import sheetInfo from '@/Page/sheet-nursing-order/components/config/sheetInfo'
import qs from 'qs'

// // 获取字典项
export const listItem = (code, recordCode) => {
  return axios.post(`${apiPath}dept/dictInfo`, qs.stringify({code, recordCode }))
}

// //  保存常用短语
export function saveOrUpdate(groupName, title, content, id,recordCode) {
//  let recordCode = sheetInfo.sheetType
 return axios.post(`${apiPath}record/desc/saveOrUpdate`, {recordCode, groupName, title, content, id})
}

// //  删除
// export function del(id) {
// // return axios.get(`${apiPath}record/desc/delete/${id}`,)
// }
// //  获取
// export function get(id) {
// // return axios.get(`${apiPath}record/desc/get/${id}`)
// }

// //  列表
export function list(groupName,recordCode) {
//   let recordCode = sheetInfo.sheetType
  return axios.post(`${apiPath}record/desc/list`, {recordCode, groupName})
 }

//  // 分类列表
export function typeList(recordCode) {
    console.log('分类列表',recordCode)
//   let recordCode = sheetInfo.sheetType
  return axios.get(`${apiPath}record/desc/typeList/${recordCode}`)
 }



