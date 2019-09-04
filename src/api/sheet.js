import axios from "./axios";
import qs from "qs";
import { apiPath } from "./apiConfig";
import sheetInfo from "../Page/sheet-page/components/config/sheetInfo/";
export const saveBody = (patientId, visitId, data) => {
  data.patientId = patientId;
  data.visitId = visitId;
  data.blockId = sheetInfo.selectBlock.id;
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/saveAll`, data);
};
export const showBody = (patientId, visitId) => {
  let data = {};
  data.patientId = patientId;
  data.visitId = visitId;
  data.blockId = sheetInfo.selectBlock.id;
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/list`, data);
};
export const saveTitle = data => {
  data.blockId = sheetInfo.selectBlock.id;
  return axios.post(`${apiPath}record/setting/save`, qs.stringify(data));
};
// 护理记录单标题
export const showTitle = (patientId, visitId) => {
  return axios.get(`${apiPath}record/setting/list/${sheetInfo.selectBlock.id}`);
};
// 护理记录单签名
export const sign = (patientId, visitId, data) => {
  data.patientId = patientId;
  data.visitId = visitId;
  data.blockId = sheetInfo.selectBlock.id;
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/signAll`, data);
};
// 护理记录单签名
export const cancelSign = data => {
  return axios.post(
    `${apiPath}record/${sheetInfo.sheetType}/cancelSign`,
    qs.stringify(data)
  );
};
// 删除页数
export const delPage = (patientId, visitId, index) => {
  return axios.get(
    `${apiPath}record/${sheetInfo.sheetType}/delete/${patientId}/${visitId}/${index}`
  );
};
// 删除护理记录
export const delRow = (id, password, empNo) => {
  return axios.post(
    `${apiPath}record/${sheetInfo.sheetType}/delete`,
    qs.stringify({ id, password, empNo })
  );
};
// 设置标记
export const markSave = data => {
  data.recordCode = sheetInfo.sheetType;
  return axios.post(
    `${apiPath}record/${sheetInfo.sheetType}/sign/save`,
    qs.stringify(data)
  );
};
// 删除标记
export const markDelete = data => {
  data.recordCode = sheetInfo.sheetType;
  return axios.post(
    `${apiPath}record/${sheetInfo.sheetType}/sign/delete`,
    qs.stringify(data)
  );
};
// 获取标记集合
export const markList = (patientId, visitId) => {
  return axios.get(
    `${apiPath}record/${sheetInfo.sheetType}/sign/list/${sheetInfo.selectBlock.id}`
  );
};
