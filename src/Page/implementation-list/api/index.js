import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";


let HOSPITAL_ID = process.env.HOSPITAL_ID,hospitalExecute;
switch(HOSPITAL_ID){
  case "lingcheng":
    hospitalExecute = "hisLingChengExecute";
    break;
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
  default:
    hospitalExecute = "hisShanNanExecute";
    break;
}

// 获取执行单
export function getExecuteWithWardcode(obj) {
  if(HOSPITAL_ID == "zhongshanqi"){
    return axios.post(
      `${apiPath}${hospitalExecute}/getWardExeacute`,
      obj
    );
  }else if(HOSPITAL_ID == "hj"){
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
  return HOSPITAL_ID == "lingcheng" ? axios.post(`${apiPath}procedure/his`, obj) : axios.post(`${apiPath}${hospitalExecute}/orderExecute`, obj);
}

// 更新实际执行时间/结束输液时间（陵城）
export function updateExecuteTime(obj) {
  return axios.post(`${apiPath}${hospitalExecute}/getorderexecuteUpdate`, obj);
}

