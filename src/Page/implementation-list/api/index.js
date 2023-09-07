import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

let HOSPITAL_ID = process.env.HOSPITAL_ID,
  hospitalExecute;
switch (HOSPITAL_ID) {
  case "lingcheng":
    hospitalExecute = "hisLingChengExecute";
    break;
  case "liaocheng":
  case "925":
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
  case "beihairenyi":
    hospitalExecute = "hisBeiHaiExecute";
    break;
    case "whsl":
    hospitalExecute = "hisWeiHaiShiLiExecute";
    break;
}
// 获取执行单
export function getExecuteWithWardcode(obj) {
  if (HOSPITAL_ID == "zhongshanqi") {
    return axios.post(`${apiPath}${hospitalExecute}/getWardExeacute`, obj);
  } else if (
    [
      "fsxt",
      "wujing",
      "foshanrenyi",
      "hengli",
      "sdlj",
      'gdtj',
      'zjhj',
    ].includes(HOSPITAL_ID)
  ) {
    // 新版执行单（武警）
    return axios.post(`${apiPath}procedure/webExecute/webGetWardExecute`, obj);
  } else if (["whfk", "ytll"].includes(HOSPITAL_ID)) {
    //查询执行单
    return axios.post(
      `${apiPath}procedure/webExecute/webGetWardExecuteWithTime`,
      obj
    );
  } else if (
    HOSPITAL_ID == "liaocheng" ||
    HOSPITAL_ID == "guizhou" ||
    HOSPITAL_ID == "qhwy"
  ) {
    // 聊城新版执行单通过执行时间段获取（）
    return axios.post(
      `${apiPath}hisLiaoChengExecute/getOrdersExecuteWithWardCodeNew`,
      obj
    );
  } else if (HOSPITAL_ID == "fuyou") {
    return axios.post(
      `${apiPath}hisJiangMenFyExecute/getOrdersExecuteWithWardCode`,
      obj
    );
  } else if (HOSPITAL_ID == "nanfangzhongxiyi") {
    return axios.post(
      `${apiPath}hisNanFangZhongXiYiExecute/getWardExecute`,
      obj
    );
  }
  // hospitalExecute为空 其他默认医院是用厚街的
  if (HOSPITAL_ID == "hj" || !hospitalExecute) {
    return axios.post(`${apiPath}execute/getWardExecute`, obj);
  }
  return axios.post(
    `${apiPath}${hospitalExecute}/getOrdersExecuteWithWardCode`,
    obj
  );
}
// 获取执行单 by临邑
export function getExecuteWithWardCodeLyxrm(obj) {
  if (
    HOSPITAL_ID === 'beihairenyi'
  ) {
    return axios.post(`${apiPath}/${hospitalExecute}/getOrdersExecuteWithWardCodeNew`, obj)
  }
  // 通过执行时间段获取
  return axios.post(
    `${apiPath}procedure/webExecute/getOrdersExecuteWithWardCodeNew`,
    obj
  );
}

// 补录（陵城）
export function addRecord(obj) {
  if (HOSPITAL_ID == "lingcheng" || HOSPITAL_ID == "foshanrenyi") {
    return axios.post(`${apiPath}procedure/his`, obj);
  } else if (
    ["whfk", "lyxrm", "ytll", "whhk", "925", "zhzxy", 'stmz','nfyksdyy'].includes(HOSPITAL_ID)
  ) {
    return axios.post(
      `${apiPath}procedure/webExecute/getOrderExecuteSupplementary`,
      obj
    );
  } else {
    return axios.post(`${apiPath}${hospitalExecute}/orderExecute`, obj);
  }
}
/** 新版补执行 by临邑 */
export function updateOrderExecutePc(obj) {
  return axios.post(`${apiPath}procedure/webExecute/updateOrderExecutePc`, obj);
}

export function orderExecute(obj) {
  return axios.post(`${apiPath}/hisSdryExecute/orderExecute`, obj);
}

export function syncExecuteByWardCode(obj) {
  return axios.post(`${apiPath}procedure/webExecute/syncExecuteByWardCode`, obj);
}

// 更新实际执行时间/结束输液时间（陵城）
export function updateExecuteTime(obj) {
  switch (HOSPITAL_ID) {
    case "quzhou":
      return axios.post(
        `${apiPath}hisLiaoChengExecute/getorderexecuteUpdate`,
        obj
      );
    case "whfk":
    case "ytll":
      return axios.post(
        `${apiPath}procedure/webExecute/getOrderExecuteUpdate`,
        obj
      );
    default:
      return axios.post(
        `${apiPath}${hospitalExecute}/getorderexecuteUpdate`,
        obj
      );
  }
}

// 新版执行单（武警）
// 网页端：医嘱查询，执行单打印用
export function getPrintExecuteWithWardcode(obj) {
  // getPatientOrdersWithWardCode
  switch(HOSPITAL_ID){
    case "gdtj":
      return axios.post(
        `${apiPath}procedure/webExecute/webGetOrdersExecutePrintForTongJiang`,
        obj
      );
    default:
      return axios.post(
        `${apiPath}procedure/webExecute/webGetOrdersExecutePrint`,
        obj
      );
  }
  // return axios.post(
  //     `${apiPath}procedure/webExecute/webGetOrdersPrint`,
  //     obj
  // );
}
/*威海市力*/
export function webGetOrdersExecutePrintOld(obj) {
  // getPatientOrdersWithWardCode
  return axios.post(
      `${apiPath}procedure/webExecute/webGetOrdersExecutePrintOld`,
      obj
  );
  // return axios.post(
  //     `${apiPath}procedure/webExecute/webGetOrdersPrint`,
  //     obj
  // );
}
// 武汉肺科同步医嘱
export function getPatientOrder(obj) {
  return axios.get(
    `${apiPath}WuHanFeiKeData/getPatientOrdersWithWardCode/${obj.wardCode}`
  );
}
// 顺德龙江同步医嘱
export function getSDLJPatientOrder(obj) {
  return axios.get(
    `${apiPath}procedure/webExecute/syncNurseOrders/${obj.wardCode}`
  );
}
// 临邑,烟台同步医嘱
export function syncNurseOrdersByWardCode(obj) {
  return axios.get(
    `${apiPath}procedure/webExecute/syncNurseOrdersByWardCode/${obj.wardCode}`
  );
}
// 执行执行单（批量）
export function handleWebExecuteBatch(arr) {
  return axios.post(`${apiPath}/procedure/webExecute/webExecuteBatch`, arr);
}
// 网页端：打印结果查询（前端用于查看是否打印成功）
export function handleWebGetPrintResult(uuid) {
  return axios.post(`${apiPath}procedure/webExecute/webGetPrintResult`, {
    uuid
  });
}

export function webExecutePrint(body) {
  return axios.post(`${apiPath}procedure/webExecute/webExecutePrint`, body);
}

// 取消执行单(聊城)
export function cancelOrderExecuteApi(body) {
  return axios.post(`${apiPath}hisLiaoChengExecute/cancelOrderExecute`, body);
}

export function getPrintListContent(body) {
  return axios.post(
    `${apiPath}procedure/webExecute/webGetExecuteWithBarcodeList`,
    body
  );
}

export function webSplitOrder(obj) {
  return axios.post(`${apiPath}procedure/webExecute/webSplitOrder`, obj);
}
/**获取瓶签打印参数 by顺德龙江 顺德龙江 */
export function getPrintListContent2(body) {
  return axios.post(
    `${apiPath}procedure/webExecute/webGetExecuteWithBarcodeList2`,
    body
  );
}

/**根据科室id获取当前住院患者 */
export function getBedLabelByWardCode(wardCode) {
  return axios.get(
    `${apiPath}procedure/webExecute/getBedLabelByWardCode/${wardCode}`
  );
}
/**
 * 导出执行单
 * @param {*} params
 * @returns
 */
export function exportWardExecuteList(params) {
  return axios.post(
    `${apiPath}procedure/webExecute/exportWardExecuteList`, params, { responseType: "blob" }
  )
}
/**
 * 获取医嘱分类
 * @returns
 */
export function getPdaExecuteTypeApi() {
  return axios.post(
    `${apiPath}procedure/pdaExecute/type`)
}
/**
 * 批量补执行
 * @returns
 */
export function batchUpdateOrderExecutePcApi(data) {
  return axios.post(
    `${apiPath}procedure/webExecute/batchUpdateOrderExecutePc`, data)
}
/**
 * 批量备注
 * @returns
 */
export function batchOrderRemarkApi(data) {
  return axios.post(
    `${apiPath}procedure/webExecute/batchOrderExecuteSupplementary`, data)
}
