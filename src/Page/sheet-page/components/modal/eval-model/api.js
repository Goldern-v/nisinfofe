import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import sheetInfo from "../../config/sheetInfo";
import qs from "qs";

//获取评估列表信息
export function getListAssessment (beginDate,endDate) {
  return axios.get(`${apiPath}record/block/evalList/${sheetInfo.selectBlock.id}?beginDate=${beginDate}&endDate=${endDate}`)
}

//分页获取评估列表信息
export const getListAssessmentByPage = (beginDate, endDate,pageIndex,pageSize) => {
  return axios.post(`${apiPath}record/block/evalListPaging`, {
    id: sheetInfo.selectBlock.id,
    beginDate,
    endDate,
    pageIndex,
    pageSize
  })
}

// 切换变化护记块签名
export const signBlock = (password, empNo) => {
  return axios.post(`${apiPath}user/getUser`, {
    id: sheetInfo.selectBlock.id,
    empNo,
    password
  })
}

// 保存护理评估记录
export const saveEvalDesc = (id,evalDesc,empNo,evalDate) => {
  return axios.post(`${apiPath}record/block/saveEvalDesc`, {
    blockId: sheetInfo.selectBlock.id,
    evalId: id,
    evalDesc: evalDesc,
    empNo:empNo,
    evalDate:evalDate,
  })
}

