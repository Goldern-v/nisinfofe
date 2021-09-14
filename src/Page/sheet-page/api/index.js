import axios from "@/api/axios";
import {
  apiPath
} from "@/api/apiConfig";
import sheetInfo from "../components/config/sheetInfo";
import qs from "qs";

// 患者：转科转床记录---花都
export const getNurseExchangeInfo = (patientId, visitId) => {
  return axios.get(`${apiPath}nurseLog/getNurseExchangeInfo/${patientId}/${visitId}`);
};

// 患者：按时间获取转科转床记录---花都
export const getNurseExchangeInfoByTime = (data) => {
  return axios.post(`${apiPath}nurseLog/getNurseExchangeInfo`, data);
};

// 护记体征信息同步到体温单
export const saveBatch = (data) => {
  return axios.post(`${apiPath}threeTest/saveBatch`, data);
};

// 通过护理单元获取体征字典表
export const getmultiDict = (wardcode) => {
  return axios.get(`${apiPath}threeTest/type/${wardcode}`);
};

// 分类合计
export const putGroupCount = (patientId, visitId, startTime, endTime) => {
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/putGroupCount`, {
    startTime,
    endTime,
    blockId: sheetInfo.selectBlock.id
  });
};

// 保存起始页
export const saveHomePage = (patientId, visitId, indexNo) => {
  return axios.post(`${apiPath}record/homePage/save`, {
    blockId: sheetInfo.selectBlock.id,
    indexNo
  });
};

// 获取起始页
export const getHomePage = (patientId, visitId) => {
  return axios.get(`${apiPath}record/homePage/${sheetInfo.selectBlock.id}/get`);
};

// 获取标注合集
export const markList = (patientId, visitId) => {
  return axios.get(
    `${apiPath}record/${sheetInfo.sheetType}/sign/list/${patientId}/${visitId}`
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
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/save`, {
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
  });
};

// 处理标注
export const handlepz = (password, empNo, id) => {
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/handle`, {
    password,
    empNo,
    id
  });
};
// 审核标注
export const auditpz = (password, empNo, id, reject = false, content) => {
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/audit`, {
    password,
    empNo,
    id,
    reject,
    content
  });
};
// 删除标注
export const delpz = (password, empNo, id) => {
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/delete`, {
    password,
    empNo,
    id
  });
};

// 护记块；查询
export const blockList = (patientId, visitId, deptCode) => {
  return axios.post(`${apiPath}record/block/list`, {
    patientId,
    visitId,
    deptCode
  });
};

// 护记块；创建
export const blockSave = (patientId, visitId, deptCode, recordCode) => {
  return axios.post(`${apiPath}record/block/save`, {
    patientId,
    visitId,
    deptCode,
    recordCode
  });
};

// 主护记和补充护记相互切换
export const switchAdditionalBlock = (prevBlockId) => {
  return axios.get(`${apiPath}record/block/switchAdditionalBlock/${prevBlockId}`);
};


// 护记块；删除
export const blockDelete = id => {
  return axios.get(`${apiPath}record/block/delete/${id}`);
};

// 获取字典列表
export const multiDictInfo = (list, recordCode) => {
  return axios.post(
    `${apiPath}dept/multiDictInfo?recordCode=${recordCode}`,
    list
  );
};

// 获取二级字典全部
export const getSecondDictSheet = (type) => {
  return axios.get(`${apiPath}/dictTable/getSecondDict/${type}`);
};

// pdf 打印
export const toPdfPrint = (blockId, isFefresh) => {
  return axios.get(`${apiPath}print/record/${blockId}?refresh=${isFefresh}`);
};

//护记块 多签名
export const signBlockD = (password, empNo, signIndex) => {
  return axios.post(`${apiPath}record/block/sign`, {
    id: sheetInfo.selectBlock.id,
    empNo,
    password,
    signIndex
  });
};

// 护记块 多取消签名
export const cancelSignD = (password, empNo, signIndex) => {
  return axios.post(`${apiPath}record/block/cancelSign`, {
    id: sheetInfo.selectBlock.id,
    empNo,
    password,
    signIndex
  });
};

// 护记块签名
export const signBlock = (password, empNo) => {
  return axios.post(`${apiPath}record/block/sign`, {
    id: sheetInfo.selectBlock.id,
    empNo,
    password
  });
};
// 护记块签名
export const setBlockCreateTime = createTime => {
  return axios.post(
    `${apiPath}record/block/update`,
    qs.stringify({
      id: sheetInfo.selectBlock.id,
      createTime
    })
  );
};
// 护记块取消签名
export const cancelSign = (password, empNo) => {
  return axios.post(`${apiPath}record/block/cancelSign`, {
    id: sheetInfo.selectBlock.id,
    empNo,
    password
  });
};

// 修改抬头字段
export const updateSheetHeadInfo = (obj = {}) => {
  obj.id = sheetInfo.selectBlock.id;
  return axios.post(`${apiPath}record/block/updateInfo`, obj);
};

// 获取his患者体征
export const getVitalSign = (patientId, visitId, recordDate,id,hospitalId) => {
  if(hospitalId=="wujing"){
    return axios.post(
      `${apiPath}record/block/nurseExecute/list/${id}`,{
        patientId,
        visitId,
        executeDateTime: recordDate
    }
    );
  }
  return axios.get(
    `${apiPath}record/${
    sheetInfo.sheetType
    }/vitalSign/get/${patientId}/${visitId}/${recordDate}`
  );
};

// 保存his患者体征
export const saveVitalSign = (data,hospitalId) => {
  if(hospitalId=='wujing'){
    return axios.post(
      `${apiPath}record/block/ordersExecute/save`,
      data
    );
    
  }
  let d = {
    blockId: sheetInfo.selectBlock.id,
    list: data
  };
  return axios.post(
    `${apiPath}record/${sheetInfo.sheetType}/vitalSign/save`,
    d
  );
};
// 获取用户信息
export function getUser(password, empNo) {
  return axios.post(`${apiPath}user/getUser`, {
    password,
    empNo
  });
}
