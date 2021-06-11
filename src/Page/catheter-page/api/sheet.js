import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";
import sheetInfo from "../components/config/sheetInfo";
import { MODULE_TYPE } from "./config";

export const saveBody = (patientId, visitId, data) => {
  data.patientId = patientId;
  data.visitId = visitId;
  data.id = sheetInfo.selectBlock.id;
  // data.relObj = sheetInfo.relObj;
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/saveAll`,
    data
  );
};
export const saveRelObj = (formId, relObjs) => {
  let data = {
    formId:formId,
    relObjs:relObjs
  }
  return axios.post(`${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/saveRelObj`, data);
};
export const showBody = (patientId, visitId) => {
  let data = {};
  data.patientId = patientId;
  data.visitId = visitId;
  data.id = sheetInfo.selectBlock.id;
  data.multiRel = true;
  return axios.post(`${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/list`, data);
};
export const saveTitle = data => {
  data.blockId = sheetInfo.selectBlock.id;
  return axios.post(
    `${apiPath}${MODULE_TYPE}/setting/save`,
    qs.stringify(data)
  );
};
// 护理记录单标题
export const showTitle = (patientId, visitId) => {
  return axios.get(
    `${apiPath}${MODULE_TYPE}/setting/list/${sheetInfo.selectBlock.id}`
  );
};
// 护理记录单签名
export const sign = (patientId, visitId, data) => {
  data.patientId = patientId;
  data.visitId = visitId;
  data.id = sheetInfo.selectBlock.id;
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/signAll`,
    data
  );
};
// 护理记录单签名
export const cancelSign = data => {
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/cancelSign`,
    qs.stringify(data)
  );
};
// 删除页数
export const delPage = (patientId, visitId, index) => {
  return axios.get(
    `${apiPath}${MODULE_TYPE}/${
      sheetInfo.sheetType
    }/delete/${patientId}/${visitId}/${index}`
  );
};
// 删除护理记录
export const delRow = (id, password, empNo) => {
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/delete`,
    qs.stringify({ id, password, empNo })
  );
};
// 设置标记
export const markSave = data => {
  data.recordCode = sheetInfo.sheetType;
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/sign/save`,
    qs.stringify(data)
  );
};
// 删除标记
export const markDelete = data => {
  data.recordCode = sheetInfo.sheetType;
  return axios.post(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/sign/delete`,
    qs.stringify(data)
  );
};
// 获取标记集合
export const markList = (patientId, visitId) => {
  return axios.get(
    `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/sign/list/${
      sheetInfo.selectBlock.id
    }`
  );
};
