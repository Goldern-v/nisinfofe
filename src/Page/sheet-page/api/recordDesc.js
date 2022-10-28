import axios from '@/api/axios'
import {apiPath} from '@/api/apiConfig'
import sheetInfo from '@/Page/sheet-page/components/config/sheetInfo'
import qs from 'qs'
// 获取字典项
export const listItem = (code, recordCode, deptCode) => {
  return axios.post(`${apiPath}dept/dictInfo`, qs.stringify({code, recordCode, deptCode }))
}

//  保存常用短语
export function saveOrUpdate(groupName, title, content, id ,wardCode) {
 let recordCode = sheetInfo.sheetType
//  if(hospitalId=="huadu"){
  return axios.post(`${apiPath}record/desc/saveOrUpdate`, {recordCode, groupName, title, content, id, wardCode})
  // }
//  return axios.post(`${apiPath}record/desc/saveOrUpdate`, {recordCode, groupName, title, content, id})
}

//保存常用短语(需要验证权限)
export function saveOrUpdateByEmpNo(groupName, title, content, id ,wardCode,empNo,changeEmpNo) {
   let recordCode = sheetInfo.sheetType
   return axios.post(`${apiPath}record/desc/saveOrUpdateByDept/${empNo}`, {recordCode, groupName, title, content, id, wardCode,'empNo':changeEmpNo})
 }

//  删除
export function del(id) {
return axios.get(`${apiPath}record/desc/delete/${id}`,)
}

// 删除（需要验证权限）
export function delByEmpNo(id,empNo) {
  return axios.post(`${apiPath}record/desc/deletetByDept`,{id,empNo})
}

//  获取
export function get(id) {
return axios.get(`${apiPath}record/desc/get/${id}`)
}

//  列表
export function list(groupName,wardCode,sheetType) {
  //不传值就默认选择当前的护记类型 sheetInfo.sheetType
  let recordCode = sheetType ? sheetType : sheetInfo.sheetType;
  // if(hospitalId=="huadu"){
    return axios.post(`${apiPath}record/desc/list`, {recordCode, groupName ,wardCode})
  // }
  // return axios.post(`${apiPath}record/desc/list`, {recordCode, groupName})
 }

 // 分类列表
export function typeList(wardCode,hospitalId) {
  let recordCode = sheetInfo.sheetType
  // if(hospitalId=="huadu"){
    return axios.get(`${apiPath}record/desc/typeList/${recordCode}?wardCode=${wardCode}`)
  // }else{
  //   return axios.get(`${apiPath}record/desc/typeList/${recordCode}`)
  // }
 }

 //特殊情况记录模板(按科室分类) 分类列表
 export function typeListByDept(wardCode,hospitalId) {
  let recordCode = sheetInfo.sheetType
  return axios.get(`${apiPath}record/desc/typeListByDept/${recordCode}?wardCode=${wardCode}`)
}

 // 护士列表
export function userDictInfo(deptCode) {
  return axios.get(`${apiPath}user/userDictInfo/${deptCode}`)
}

// 横沥获取护士列表
export function hengliUserDictInfo(deptCode) {
  return axios.get(`${apiPath}user/userDictInfo/${deptCode}?getAllRelUser=true`)
}

 // 获取用户信息
export function getUser(password, empNo) {
  return axios.post(`${apiPath}user/getUser`, {password, empNo})
 }

// 删除一级标题
 export function delByType(groupName,wardCode,empNo) {
  let recordCode = sheetInfo.sheetType
  return axios.post(`${apiPath}record/desc/deleteListByType`, {recordCode,groupName,wardCode,empNo})
 }

 //护记获取编码
 export const listRecord = deptCode =>
  axios.get(`${apiPath}record/setting/listRecord/${deptCode}`);
