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

export function del_foshanshiyi(id) {
  return axios.get(`${apiPath}textTemplate/delete/${id}`);
}

//  获取
export function get(id) {
  return axios.get(`${apiPath}record/desc/get/${id}`);
}

// 获取组名
export function getGroupName(wardCode) {
  return axios.post(`${apiPath}textTemplate/getGroup`, { wardCode });
}

// 获取以组名为条件的模块内容
export function getlist(wardCode, groupName, moduleCode) {
  return axios.post(`${apiPath}textTemplate/getList`, {wardCode, groupName, moduleCode});
}

//  获取表单模块
export function getModuleCode() {
  return axios.get(`${apiPath}formTemplate/getModuleCode`);
}

// 新增
export function add(groupName, title, content, wardCode, moduleCode) {
  return axios.post(`${apiPath}textTemplate/add`, {
    groupName,
    title,
    content,
    wardCode,
    moduleCode
  });
}

// 更新
export function update(groupName, title, content, wardCode, moduleCode, groupId, contentId) {
  return axios.post(`${apiPath}textTemplate/update`, {
    groupName,
    title,
    content,
    wardCode,
    moduleCode,
    groupId,
    contentId
  });
}


