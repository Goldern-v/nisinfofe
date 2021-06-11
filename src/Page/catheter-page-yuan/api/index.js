import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

// 获取导管块列表
export const getBlockList = (patientId, visitId) => {
  return axios.post(`${apiPath}catheter/block/list`, { patientId, visitId });
};
// 获取导管块列表
export const getCatheterBlock = (
  patientId,
  visitId,
  orderNo,
  orderSubNo,
  startDate
) => {
  return axios.post(`${apiPath}catheter/block/get`, {
    patientId,
    visitId,
    orderNo,
    orderSubNo,
    startDate
  });
};
// 更新导管块列表
export const updateBlock = block => {
  return axios.post(`${apiPath}catheter/block/update`, block);
};
// 新建导管块列表
export const saveBlock = block => {
  return axios.post(`${apiPath}catheter/block/save`, block);
};
// 删除导管块列表
export const delBlock = block => {
  return axios.post(`${apiPath}catheter/block/delete`, block);
};
// 获取导管记录列表
export const getRecordList = (
  patientId,
  visitId,
  orderNo,
  orderSubNo,
  recordDate,
  startDate
) => {
  return Promise.all([
    axios.post(`${apiPath}catheter/public/list`, {
      patientId,
      visitId,
      orderNo,
      orderSubNo,
      recordDate,
      startDate
    })
    // axios.post(`${apiPath}catheter/public/listFluid`, { patientId, visitId, orderNo, orderSubNo, recordDate })
  ]).then(res => {
    return [...res[0].data.data.list].map(item => {
      if (item.recordSource == "1") {
        if (item.fluidSize) {
          item.type = "2";
        } else {
          item.type = "1";
        }
      } else if (item.recordSource == "5") {
        item.type = "5";
      }
      return item;
    });
  });
};

// 新建更新导管评估
export const getFluidChart = (
  patientId,
  visitId,
  orderNo,
  orderSubNo,
  startDate
) => {
  return axios.post(`${apiPath}catheter/public/listFluid`, {
    patientId,
    visitId,
    orderNo,
    orderSubNo,
    startDate
  });
};
// 新建更新导管评估
export const saveRecord = record => {
  return axios.post(`${apiPath}catheter/public/save`, record);
};
// 删除导管评估
export const delRecord = id => {
  return axios.post(`${apiPath}catheter/public/delete`, { id });
};
// 保存引流量合计
export const fluidSumUp = record => {
  return axios.post(`${apiPath}catheter/public/fluidSumUp`, record);
};
// 拔管
export const endBlock = block => {
  return axios.post(`${apiPath}catheter/block/end`, block);
};
