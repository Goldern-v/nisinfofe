import axios from '@/api/axios'
import {apiPath} from '@/api/apiConfig'
import sheetInfo from '@/Page/sheet-page/components/config/sheetInfo'
import qs from 'qs'

// 获取字典项
export const listItem = (code, recordCode) => {
  return axios.post(`${apiPath}dept/dictInfo`, qs.stringify({code, recordCode }))
}

//  保存常用短语
export function saveOrUpdate(groupName, title, content, id ,wardCode,hospitalId) {
 let recordCode = sheetInfo.sheetType
 if(hospitalId=="huadu"){
  return axios.post(`${apiPath}record/desc/saveOrUpdate`, {recordCode, groupName, title, content, id, wardCode})
  }
 return axios.post(`${apiPath}record/desc/saveOrUpdate`, {recordCode, groupName, title, content, id})
}

//  删除
export function del(id) {
return axios.get(`${apiPath}record/desc/delete/${id}`,)
}
//  获取
export function get(id) {
return axios.get(`${apiPath}record/desc/get/${id}`)
}

//  列表
export function list(groupName,wardCode,hospitalId) {
  let recordCode = sheetInfo.sheetType
  if(hospitalId=="huadu"){
    return axios.post(`${apiPath}record/desc/list`, {recordCode, groupName,wardCode})
  }
  return axios.post(`${apiPath}record/desc/list`, {recordCode, groupName})
 }

 // 分类列表
export function typeList(wardCode,hospitalId) {
  let recordCode = sheetInfo.sheetType
  if(hospitalId=="huadu"){
    return axios.get(`${apiPath}record/desc/typeList/${recordCode}?wardCode=${wardCode}`)
  }else{
    return axios.get(`${apiPath}record/desc/typeList/${recordCode}`)
  }
 }

 // 护士列表
export function userDictInfo(deptCode) {
  return axios.get(`${apiPath}user/userDictInfo/${deptCode} `)
 }

 // 获取用户信息
export function getUser(password, empNo) {
  return axios.post(`${apiPath}user/getUser`, {password, empNo})
 }



