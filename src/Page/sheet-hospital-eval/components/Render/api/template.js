import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
let recordCode = "neurology";
//  列表
export function list(groupName) {
  return axios.post(`${apiPath}record/desc/list`, { recordCode, groupName });
}

// 分类列表
export function typeList() {
  return axios.get(`${apiPath}record/desc/typeList/${recordCode}`);
}

//  保存常用短语
export function saveOrUpdate(groupName, title, content, id) {
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
//  获取
export function get(id) {
  return axios.get(`${apiPath}record/desc/get/${id}`);
}
