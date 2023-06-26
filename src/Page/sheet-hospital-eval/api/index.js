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



// 校验签名
export function getVerifyUser(params) {
  return axios.post(`${apiPath}user/getUser`, params);
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


// FORM.2.06、获取患者评估体征信息
export function getEvalInfo(patientId, visitId) {
  return axios.get(`${apiPath}form/design/getEvalInfo/${patientId}/${visitId}`)
}


export function vitalsign(postData) {
  return axios.post(`${apiPath}/vitalSign/getVitalSigns`, postData)
}


// 如果两个护士同时操作一张评估单，会导致数据错乱，所以今日是锁定当前评估单，离开后就解锁
/* type 普通:form 旧多行:formCommon  新多行:fill 护记:record */
/* id 打开当前这个单唯一的id */
export function unLock(type,id){
  return axios.get(`${apiPath}form/design/unlock/${type}/${id}`);
}

// 获取后台配置的解锁时间
export function unLockTime(){
  return axios.get(`${apiPath}dict/common/getDictItem?dictCode=propertiesConfig&itemCode=his_form_data_lock_timeout`);
}
