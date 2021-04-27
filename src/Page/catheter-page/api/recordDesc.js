import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import sheetInfo from "../components/config/sheetInfo";
import qs from "qs";
import { MODULE_TYPE } from "./config";

// 获取字典项
export const listItem = (code, recordCode) => {
  return axios.post(
    `${apiPath}dept/dictInfo`,
    qs.stringify({ code, recordCode })
  );
};

//  保存常用短语
export function saveOrUpdate(groupName, title, content, id) {
  let recordCode = sheetInfo.sheetType;
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

//  列表
export function list(groupName) {
  let recordCode = sheetInfo.sheetType;
  return axios.post(`${apiPath}record/desc/list`, { recordCode, groupName });
}

// 分类列表
export function typeList() {
  let recordCode = sheetInfo.sheetType;
  return axios.get(`${apiPath}record/desc/typeList/${recordCode}`);
}

// 护士列表
export function userDictInfo(deptCode) {
  return axios.get(`${apiPath}user/userDictInfo/${deptCode} `);
}

// 获取用户信息
export function getUser(password, empNo) {
  return axios.post(`${apiPath}user/getUser`, { password, empNo });
}
