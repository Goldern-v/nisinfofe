import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";


let HOSPITAL_ID = process.env.HOSPITAL_ID,hospitalExecute;
switch(HOSPITAL_ID){
  case "lingcheng":
    hospitalExecute = "hisLingChengExecute";
    break;
  case "liaocheng":
    hospitalExecute = "hisLiaoChengExecute";
    break;
  case "zhongshanqi":
    hospitalExecute = "hisZhongShanQiYuanExecute";
    break;
  case "huadu":
    hospitalExecute = "HisHuaDuExecute";
    break;
  case "shannan":
    hospitalExecute = "hisShanNanExecute";
    break;
  case "fuyou":
    hospitalExecute = "hisJiangMenFyExecute";
    break;
  case "quzhou":
    hospitalExecute = "hisQuZhouXianExecute";
    break;
}
// 获取执行单
export function getExecuteWithWardcode(obj) {
  if(HOSPITAL_ID == "zhongshanqi"){
    return axios.post(
      `${apiPath}${hospitalExecute}/getWardExeacute`,
      obj
    );
  }else if(["fsxt","wujing","foshanrenyi","hengli","sdlj",'lyxrm', 'gdtj'].includes(HOSPITAL_ID)){
    // 新版执行单（武警）
    return axios.post(
      `${apiPath}procedure/webExecute/webGetWardExecute`,
      obj
    );
  }else if(HOSPITAL_ID == 'whfk'){
    //查询执行单
    return axios.post(
      `${apiPath}procedure/webExecute/webGetWardExecuteWithTime`,
      obj
    );
  }else if(HOSPITAL_ID == "liaocheng"){
    // 聊城新版执行单通过执行时间段获取（）
    return axios.post(
      `${apiPath}hisLiaoChengExecute/getOrdersExecuteWithWardCodeNew`,
      obj
    );
  }else if(HOSPITAL_ID == "fuyou"){
    return axios.post(
      `${apiPath}hisJiangMenFyExecute/getOrdersExecuteWithWardCode`,
      obj
    );
  }
  // hospitalExecute为空 其他默认医院是用厚街的
  if(HOSPITAL_ID == "hj" || !hospitalExecute){
    return axios.post(
        `${apiPath}execute/getWardExecute`,
        obj
    );
  }
  return axios.post(
    `${apiPath}${hospitalExecute}/getOrdersExecuteWithWardCode`,
    obj
  );
}

// 补录（陵城）
export function addRecord(obj) {
  if (HOSPITAL_ID=="lingcheng"){
      return axios.post(`${apiPath}procedure/his`, obj)
  }if(HOSPITAL_ID == 'whfk'){
    return axios.post(`${apiPath}procedure/webExecute/getOrderExecuteSupplementary`,obj)
  }else{
    return axios.post(`${apiPath}${hospitalExecute}/orderExecute`, obj);
  }
}

// 更新实际执行时间/结束输液时间（陵城）
export function updateExecuteTime(obj) {
  switch(HOSPITAL_ID){
    case 'quzhou':
      return axios.post(`${apiPath}hisLiaoChengExecute/getorderexecuteUpdate`, obj);
    case 'whfk':
      return axios.post(`${apiPath}procedure/webExecute/getOrderExecuteUpdate`, obj);
    default :
      return axios.post(`${apiPath}${hospitalExecute}/getorderexecuteUpdate`, obj);
  }
}


// 新版执行单（武警）
// 网页端：医嘱查询，执行单打印用
export function getPrintExecuteWithWardcode(obj) {
  // getPatientOrdersWithWardCode
  switch(HOSPITAL_ID){
    case 'whfk':
      return axios.get(`${apiPath}/WuHanFeiKeData/getPatientOrdersWithWardCode/${obj.wardCode}`)
    default : 
      return axios.post(`${apiPath}procedure/webExecute/webGetOrdersExecutePrint`, obj)
  }
  // return axios.post(
  //     `${apiPath}procedure/webExecute/webGetOrdersPrint`,
  //     obj
  // );
}
// 执行执行单（批量）
export function handleWebExecuteBatch(arr) {
  return axios.post(
      `${apiPath}/procedure/webExecute/webExecuteBatch`,
      arr
  );
}
// 网页端：打印结果查询（前端用于查看是否打印成功）
export function handleWebGetPrintResult(uuid) {
  return axios.post(
      `${apiPath}procedure/webExecute/webGetPrintResult`,{uuid}
  );
}

export function webExecutePrint(body){
  return axios.post(`${apiPath}procedure/webExecute/webExecutePrint`,body)
}

// 取消执行单(聊城)
export function cancelOrderExecuteApi(body){
  return axios.post(`${apiPath}hisLiaoChengExecute/cancelOrderExecute`,body)
}


export function getPrintListContent(body){
  return axios.post(`${apiPath}procedure/webExecute/webGetExecuteWithBarcodeList`,body)
}

export function webSplitOrder(obj) {
  return axios.post(
    `${apiPath}procedure/webExecute/webSplitOrder`,
    obj
    );
  }
/**获取瓶签打印参数 by顺德龙江 */
export function getPrintListContent2(body){
  return axios.post(`${apiPath}procedure/webExecute/webGetExecuteWithBarcodeList2`,body)
}
