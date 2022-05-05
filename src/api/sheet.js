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
//花都体温单自定义标题的接口
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
    qs.stringify({
      id,
      password,
      empNo
    })
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

// 新建护理（切割护理记录单）
export const splitRecordBlock = (empNo, password = "", recordDate) => {
  return axios.post(`${apiPath}record/block/splitRecordBlock`, {
    empNo,
    password,
    blockId: sheetInfo.selectBlock.id,
    recordDate
  });
};
// 护记：特殊情况同步到交班志
export const syncToIsbar = (obj) => {
  return axios.post(`${apiPath}record/blood_purification/syncToIsbar`, obj);
};
// 通过患者id和住院次数和时间查询巡视患者的巡视内容
export const syncVisitWithDatePad = (patientId, visitId, startDate, endDate) => {
  return axios.get(`${apiPath}nursingVisit/getNursingVisitWithDatePad/${patientId}/${visitId}/${startDate}/${endDate}`);
};

// 护记批量删除选中行
export const delSelectRow = (params) => {
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/deleteMultiRecord`, params);
}

/**
 * 获取自定义模板 by佛山市一
 * @returns
 */
 export const findListByBlockId = () => {
  return axios.post(`${apiPath}record/titleTempalate/findListByBlockId`, {
    blockId: sheetInfo.selectBlock.id
  })
}

/**
 * 保存自定义标题所选模板内容 by佛山市一
 */
 export const saveTitleOptions = (params) => {
  params.blockId = sheetInfo.selectBlock.id;
  return axios.post(`${apiPath}record/titleTempalate/saveTitleOptions`, params)
}
