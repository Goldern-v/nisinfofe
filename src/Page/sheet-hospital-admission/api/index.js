import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

// formDesign - 新表单：保存
// /form/design/save
// POST JSON/APPLICATION
/**
 *
 *
 {
   "id": 2, // 50376
   "patientId": "71025238",
   "visitId": "8",
   "formType": "eval",
   "formCode": "E0003",
   "evalDate": "2019-04-16 12:00",
   "evalScore": "9",
   "sign": true,
   "empNo": "admin",
   "password": "123456",
   "M003001": "1",
   "M003002": "2",
   "M003003": "3",
   "M003004": "4",
 }
 *
 *
*/
export function save(postData) {
  return axios.post(`${apiPath}form/design/save`, postData);
}

// formDesign - 新表单：创建表单
/**
{
    "patientId": "71025238",
    "visitId": "8",
    "formType": "eval",
    "formCode": "E0003"
}
*/
export function createForm(postData) {
  return axios.post(`${apiPath}form/design/createForm`, postData);
}

// formDesign - 新表单：删除表单
/**
{
  "id": 4,
  "empNo": "0519",
  "password": "123456"
}
*/

export function del(postData) {
  return axios.post(`${apiPath}form/design/delete`, postData);
}

export function cancelSignOrAduit(postData) {
  return axios.post(`${apiPath}form/design/cancelSignOrAduit `, postData);
}

// formDesign - 新表单：获取数据
/**
{
  "id": 4,
  "empNo": "0519",
  "password": "123456"
}
*/
export function get(id) {
  return axios.get(`${apiPath}form/design/get/${id}`);
}

// formDesign - 新表单：获取模板
/**
{
  "deptCode": "4003",
  "templateType": "eval"
}
*/
export function templates(postData) {
  return axios.post(`${apiPath}form/design/templates`, postData);
}

// http://{{url}}/api/form/design/list
// {
// 	"patientId":"71325620",
// 	"visitId":"1",
// 	"formCode":"E0003"
// }
export function list(postData) {
  return axios.post(`${apiPath}form/design/list`, postData);
}

/** 评估单同步到三测单 */
export function syncVitalSign(id) {
  return axios.get(`${apiPath}form/design/syncVitalSign/${id}`);
}

/** 评估单同步到护记 */
export function syncToRecord(id) {
  return axios.get(`${apiPath}form/design/syncToRecord/${id}`);
}

/** 获取到时未完成的任务 */
export function getReEvaTask(obj) {
  return axios.post(`${apiPath}form/design/getReEvaTask`, obj);
}

// 保存护理诊断
export function nursingDiagsSaveList(objList) {
  return axios.post(`${apiPath}nursingDiags/saveList`, objList);
}


//  入院病人资料
export function loadPatient(patientId,visitId) {
  return axios.get(`${apiPath}commonData/loadPatient/${patientId}/${visitId}`)
}

// FORM.2.07、根据科室获取新版入院对应旧版入院表
export function getOldFormCodeByWardCode(newFormCode,wardCode) {
  return axios.get(`${apiPath}form/design/getOldFormCodeByWardCode/${newFormCode}/${wardCode}`)
}


// FORM.2.06、获取患者评估体征信息
export function getEvalInfo(patientId,visitId) {
  return axios.get(`${apiPath}form/design/getEvalInfo/${patientId}/${visitId}`)
}
