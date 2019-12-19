import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";
import moment from 'moment';

export function getNurseList(query) {
    return axios.post(`${apiPath}auditeNurseList/getByFormCodePC`, qs.stringify(query));
}
//获取记录单
export function getList(query) {
    return axios.post(`${apiPath}obstetricBirthFormControl/getFrom`, query);
}

//获取 051102
export function getPatientList(deptCode) {
    return axios.get(`${apiPath}bed/patList/${deptCode || '051102'}`);
}

//修改或增加登记表
export function changeOrSaveForm(params) {
    return axios.post(`${apiPath}obstetricBirthFormControl/changeOrSaveForm`, params);
}

//删除产科分娩登记表
export function deleteForm(params) {
    return axios.post(`${apiPath}obstetricBirthFormControl/deleteForm`, params);
}

//获取产妇其他基本资料
export function getCommonInfo(params) {
    return axios.post(`${apiPath}obstetricBirthFormControl/getCommonInfoByPVList`, params);
}

//获取产妇列表
export function getPatientListNew() {
    let endDate = moment().format('YYYY-MM-DD')
    let startDate = new Date(endDate.replace(/-/g, '/'))
    startDate = startDate.getTime() - 90 * 86400000
    startDate = moment(new Date(startDate)).format('YYYY-MM-DD')

    return axios.post(`${apiPath}bed/patListCK`, {
        wardCode: '051102',
        admissionDateEnd: '',
        admissionDateBegin: '',
        dischargeDateBegin: startDate,
        dischargeDateEnd: endDate,
        pageNum: 2000,
        pageIndex: 1,
    });
}

//获取分娩记录单信息
export function getFormChildbirth(query) {
    return axios.post(`${apiPath}form/getLastDetail`, {
        formCode: 'form_childbirth',
        patientId: query.patientId || '',
        visitId: query.visitId || '1'
    });
}
