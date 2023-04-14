import axios from "@/api/axios";
import {
  apiPath
} from "@/api/apiConfig";
import qs from "qs";

// 获取医嘱信息
export const getOrdersExecuteWithPatinetId = (params) => {
  return axios.post(`${apiPath}hisShengGuiYiExecute/getOrdersExecuteWithPatinetId`,params);
};

// 保存医嘱信息
export const saveAllWithRecordDate = (params) => {
    // return axios.post(`${apiPath}record/access_gzry/saveAllWithRecordDate`,params);
    return axios.post(`${apiPath}record/access_gzry/saveAll`,params);
};

export const getExamTestByPV = (patientId,visitId) => {
  return axios.get(`${apiPath}record/block/getExamTestByPV/${patientId}/${visitId}`);
}

export const getExamTestResult = (testNo)=>{
  return axios.get(`${apiPath}record/block/getExamTestResult/${testNo}`)
}

// 南方中西医 护理记录单 获取医嘱信息
export const getDoctorAdvice = (params) => {
  return axios.post(`${apiPath}record/block/getDoctorAdvice`, params);
}


//佛山市一  护记自定义标题获取数据
export const titleTemplateList = (postlist)=>{
  return axios.post(`${apiPath}record/titleTempalate/list`,postlist)
}
//佛山市一  护记自定义标题保存或新增
export const titleTemplateSaveOrUpdate = (obj)=>{
  return axios.post(`${apiPath}record/titleTempalate/saveOrUpdate`,obj)
}
//佛山市一   护记自定义标题删除标题
export const deleteId = (id)=>{
  return axios.get(`${apiPath}/record/titleTempalate/delete/${id}`)
}
//佛山市一   护记自定义标题删除组
export const deleteGroup = (obj)=>{
  return axios.post(`${apiPath}record/titleTempalate/deleteGroup`,obj)
}

// 获取入量列表 by中西医
// /getWardExecuteZXY/{patientId}/{visitId}/{beginDate}/{endDate}/{administration}
export const getWardExecuteZXY = ( params ) => {
  return axios.post(
    `${apiPath}execute/getWardExecuteZXY`, params);
};
// 护记PC体征同步
export const weihaiVitalSignPost = ( params ) => {
  return axios.post(
    `${apiPath}/record/internal_eval_weihai/vitalSignPost`,qs.stringify({...params}) );
};

/* 获取转科  /form/common/adtExchangeModifyLog/{patientId}/{visitId}/{formId}*/
export function adtExchange(params){
  return axios.get(`${apiPath}form/common/adtExchangeModifyLog/${params.patientId}/${params.visitId}/${params.formId}`)
}
/* 获取转病区  /form/common/listNurseAdtHD/{patientId}/{visitId}/{formId}*/
export function wardExchange(params){
  return axios.get(`${apiPath}form/common/listNurseAdtHD/${params.patientId}/${params.visitId}/${params.formId}`)
}
/* 获取转床号 /form/common/bedExchangeModifyLog/{patientId}/{visitId}/{formId}*/
export function bedExchange(params){
  return axios.get(`${apiPath}form/common/bedExchangeModifyLog/${params.patientId}/${params.visitId}/${params.formId}`)
}
/**
 * 保存转床号/form/common/updateInfo
 * @param {*} params
 * @returns
 */
export const updateCommonInfo = (data)=> {
  return axios.post(`${apiPath}form/common/updateInfo` , data)
}
