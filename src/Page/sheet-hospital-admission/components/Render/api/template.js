import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
// let recordCode = "neurology";
//  列表
export function list(groupName, recordCode = "neurology") {
  return axios.post(`${apiPath}record/desc/list`, { recordCode, groupName });
}

// 分类列表
export function typeList(recordCode = "neurology") {
  return axios.get(`${apiPath}record/desc/typeList/${recordCode}`);
}

export function typeList_foshanshiyi() {
  return axios.get(`${apiPath}eval/desc/getGroupDivision`)
}

export function list_foshanshiyi(groupName, wardCode = "") {
  return axios.post(`${apiPath}eval/desc/getList`, { groupName, wardCode });
}

export function saveOrUpdate_foshanshiyi(groupName, title, content, id, empNo, wardCode, currentEmpNo) {
  return axios.post(`${apiPath}eval/desc/saveOrUpdateByAuth/${currentEmpNo}`, {
    groupName,
    title,
    content,
    id,
    empNo,
    wardCode
  });
}


//  保存常用短语
export function saveOrUpdate(groupName, title, content, id, recordCode = "neurology") {
  return axios.post(`${apiPath}record/desc/saveOrUpdate`, {
    recordCode,
    groupName,
    title,
    content,
    id
  });
}

//  删除
export function del(id) {
  return axios.get(`${apiPath}record/desc/delete/${id}`);
}

export function del_foshanshiyi(id, empNo) {
  return axios.get(`${apiPath}eval/desc/deleteByAuth/${id}/${empNo}`);
}

//  获取
export function get(id) {
  return axios.get(`${apiPath}record/desc/get/${id}`);
}
