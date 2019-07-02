import axios from '@/api/axios'
import {apiPath} from '@/api/apiConfig'
import sheetInfo from '../components/config/sheetInfo'
import qs from 'qs'






// 保存护嘱单 POST http://127.0.0.1:8080/crNursing/api/orders/saveOrders
// commonField 常规参数
// list 护嘱单数据


// NursingOrders - 删除护嘱单 http://127.0.0.1:8080/crNursing/api/orders/deleteOrders/{id}


// NursingOrders - 查找护嘱单	By patientId http://127.0.0.1:8080/crNursing/api/orders/findOrdersByPatientId/{patientId}



//////////////////////////////////////////

// 分类合计
export const putGroupCount = (patientId, visitId, startTime, endTime) => {
  // return axios.post(`${apiPath}record/${sheetInfo.sheetType}/putGroupCount`,{startTime, endTime, blockId:sheetInfo.selectBlock.id})
}

// 保存起始页
export const saveHomePage = (patientId, visitId, indexNo) => {
  // return axios.post(`${apiPath}record/homePage/save`, {
  //   blockId: sheetInfo.selectBlock.id,
  //   indexNo
  // })
}

// 获取起始页
// export const getHomePage = (patientId, visitId) => {
//   return axios.get(`${apiPath}record/homePage/${sheetInfo.selectBlock.id}/get`)
// }
export function getHomePage(patientId, visitId) {
  return axios.post(`${apiPath}orders/public/whole/list`, { patientId, visitId })
}


// 获取标注合集
export const markList = (patientId, visitId) => {
  // return axios.get(`${apiPath}record/${sheetInfo.sheetType}/sign/list/${patientId}/${visitId}`)
}

// 保存批注
export const saveMark = (recordId, fieldEn, signType, content, qualityIndex) => {
  // return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/save`, {
  //   recordCode: sheetInfo.sheetType,
  //   recordId,
  //   fieldEn,
  //   signType,
  //   content,
  //   qualityIndex
  // })
}

// 处理标注
export const handlepz = (password, empNo, id) => {
  // return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/handle`, {
  //   password, empNo, id
  // })
}
// 删除标注
export const delpz = (id) => {
  // return axios.post(`${apiPath}record/${sheetInfo.sheetType}/sign/delete`, {
  //   id
  // })
}

// 护记块；查询
export const blockList = (patientId, visitId, deptCode) => {
  return axios.post(`${apiPath}orders/public/whole/list`, { patientId, visitId })
  // return axios.post(`${apiPath}record/block/list`, {
  //   patientId, visitId, deptCode
  // })
}

// 护记块；创建
export const blockSave = (patientId, visitId, deptCode, recordCode) => {
  // orders/public/save
  // return axios.post(`${apiPath}record/block/save`, {
  //   patientId, visitId, deptCode, recordCode
  // })
}

// 护记块；删除
export const blockDelete = (data) => {
  // orders/public/delete
  // http://127.0.0.1:8080/crNursing/api/orders/public/delete
  return axios.post(`${apiPath}orders/public/delete`,data);
  // return axios.get(`${apiPath}record/block/delete/${id}`)
}

