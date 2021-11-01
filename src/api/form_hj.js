
// 厚街医院 表单新增 API 接口

// 登录模块api
import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'


// 评估详情
export function evalDetail(id,type) {
  if (id){
    if(type){
      return axios.get(`${apiPath}${type}/health_education_hl/get/${id}`)
    }else{
      return axios.get(`${apiPath}eval/detail/${id}`)
    }
  }
  return null
}

// 查找表单的全部记录
export function findAllRecord(formCode,deptCode) {
  return axios.get(`${apiPath}formSetting/findAllRecord/${formCode}/${deptCode}`)
}

/*
* @api {get} /form/printPage/{code}/{patientId}/{visitId}/{listPrint} 表单打印数据列表(根据传进来的是否分页的标识判断是否分页打印)
*/
export function formPrintPage(pageDataArgs) {
  return axios.get(`${apiPath}form/printPage/${pageDataArgs.id}/${pageDataArgs.formCode}/${pageDataArgs.patientId}/${pageDataArgs.visitId}/${pageDataArgs.listPrint}`)
}

/*
@api {get} /form/inputPrint/{code}/{patientId}/{visitId}/{name}/{sex}/{age}/{deptCode}/{bedLabel}/{inpNo}/{wardCode} 获取要打印的表单页面
*/
export function formInputPrint(printPageArgs) {
  return axios.get(`${apiPath}form/inputPrint/${printPageArgs.formCode}/${printPageArgs.patientId}/${printPageArgs.visitId}/${printPageArgs.name}/${printPageArgs.sex}/${printPageArgs.age}/${printPageArgs.deptCode}/${printPageArgs.bedLabel}/${printPageArgs.inpNo}/${printPageArgs.wardCode}`)
}

//Barden压疮风险评估单
// 获取表单json
// export function get_form_pressure_risk(id) {
//     return axios.get(`/crNursing/api/pdaform/getByFormCode/form_pressure_risk/0341037/3`);
// }
// 评估详情
export function evalDetail_form(id) {
         if (id) {
           return axios.get(`${apiPath}eval/detail/${id}`);
         }
         return null;
       }

// 查找表单的全部记录(获取表单json)
// export function findAllRecord_form(formCode, patientId, visitId) {
//          return axios.get(`/crNursing/api/pdaform/getByFormCode/${formCode}/${patientId}/${visitId}`);
//        }

       // 查找表单的全部记录(获取表单json)
export function findAllRecord_form(formCode, patientId, visitId) {
  let postData = {
    formCode:formCode,
    patientId:patientId,
    visitId:visitId
  }

  return axios.post(`/crNursing/api/pdaform/getByFormCode`,qs.stringify(postData));
}

/*
* @api {get} /form/printPage/{code}/{patientId}/{visitId}/{listPrint} 表单打印数据列表(根据传进来的是否分页的标识判断是否分页打印)
*/
export function formPrintPage_form(pageDataArgs) {
         return axios.get(`${apiPath}form/printPage/${pageDataArgs.id}/${pageDataArgs.formCode}/${pageDataArgs.patientId}/${pageDataArgs.visitId}/${pageDataArgs.listPrint}`);
       }

/*
@api {get} /form/inputPrint/{code}/{patientId}/{visitId}/{name}/{sex}/{age}/{deptCode}/{bedLabel}/{inpNo}/{wardCode} 获取要打印的表单页面
*/
export function formInputPrint_form(printPageArgs) {
         return axios.get(`${apiPath}form/inputPrint/${printPageArgs.formCode}/${printPageArgs.patientId}/${printPageArgs.visitId}/${printPageArgs.name}/${printPageArgs.sex}/${printPageArgs.age}/${printPageArgs.deptCode}/${printPageArgs.bedLabel}/${printPageArgs.inpNo}/${printPageArgs.wardCode}`);
       }


//保存表格
export const Formsave = (data) => {
        //  return axios.post(`${apiPath}form/save`, data);
         return axios.post(`${apiPath}form/save`, qs.stringify(data));
 };
//保存表格
export const Formsave_VTE = (data) => {
         return axios.post(`${apiPath}form/saveByJson`, data);
        //  return axios.post(`${apiPath}form/save`, qs.stringify(data));
 };

export const getData = (id) => {
         return axios.get(`${apiPath}eval/detail/${id}`);
 };
