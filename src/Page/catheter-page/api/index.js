import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import sheetInfo from "../components/config/sheetInfo";
import qs from "qs";
import { MODULE_TYPE } from "./config";

// 分类合计
export const putGroupCount = (patientId, visitId, startTime, endTime) => {
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/putGroupCount`,
    { startTime, endTime, blockId: sheetInfo.selectBlock.id }
  );
};

// 保存起始页
export const saveHomePage = (patientId, visitId, indexNo) => {
  return axios.post(`${apiPath}${MODULE_TYPE}/homePage/save`, {
    blockId: sheetInfo.selectBlock.id,
    indexNo
  });
};

// 获取起始页
export const getHomePage = (patientId, visitId) => {
  return axios.get(
    `${apiPath}${MODULE_TYPE}/homePage/${sheetInfo.selectBlock.id}/get`
  );
};

// 获取标注合集
export const markList = (patientId, visitId) => {
  return axios.get(
    `${apiPath}${MODULE_TYPE}/${
      sheetInfo.sheetType
    }/sign/list/${patientId}/${visitId}`
  );
};

// 保存批注
export const saveMark = (
  recordId,
  fieldEn,
  signType,
  content,
  qualityIndex,
  creatorNo,
  creatorName,
  handlerNo,
  handlerName
) => {
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/sign/save`,
    {
      recordCode: sheetInfo.sheetType,
      recordId,
      fieldEn,
      signType,
      content,
      qualityIndex,
      creatorNo,
      creatorName,
      handlerNo,
      handlerName,
      blockId: sheetInfo.selectBlock.id
    }
  );
};

// 处理标注
export const handlepz = (password, empNo, id) => {
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/sign/handle`,
    {
      password,
      empNo,
      id
    }
  );
};
// 审核标注
export const auditpz = (password, empNo, id, reject = false, content) => {
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/sign/audit`,
    {
      password,
      empNo,
      id,
      reject,
      content
    }
  );
};
// 删除标注
export const delpz = (password, empNo, id) => {
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/sign/delete`,
    {
      password,
      empNo,
      id
    }
  );
};

// 护记块；查询
export const blockList = (patientId, visitId, wardCode) => {
  return axios.post(`${apiPath}formType/${MODULE_TYPE}/list`, {
    patientId,
    visitId,
    wardCode
  });
};

// 护记块；创建
export const blockSave = (patientId, visitId, deptCode, code, type) => {
  return axios.post(`${apiPath}formType/${MODULE_TYPE}/save`, {
    patientId,
    visitId,
    deptCode,
    code,
    type
  });
};
// 护记块；删除
export const blockDelete = id => {
  return axios.get(`${apiPath}formType/${MODULE_TYPE}/delete/${id}`);
};

// 获取字典列表
export const multiDictInfo = (list, sheetType = "") => {
  let wardCode = sheetInfo.selectBlock.wardCode;
  return axios.post(
    `${apiPath}dept/multiDictInfo?code=${sheetType}&type=${MODULE_TYPE}&wardCode=${wardCode}`,
    list
  );
};

// 修改护记诊断
export const updateBlock = data => {
  return axios.post(
    `${apiPath}${MODULE_TYPE}/block/update`,
    qs.stringify(data)
  );
};
// 记录列表
export const listRecord = deptCode =>
  axios.get(`${apiPath}form/common/templates/${MODULE_TYPE}?deptCode=${deptCode}
  `);
