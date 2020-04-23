import axios from "@/api/axios";
import qs from "qs";
import {
    apiPath
} from "@/api/apiConfig";
import moment from 'moment';

//获取记录单
export function getList(query) {
    return axios.post(`${apiPath}birthMedicalCertifi/getListByPatInfo`, query);
}
//删除出生医学证明记录
export function deleteForm(id) {
    return axios.get(`${apiPath}birthMedicalCertifi/delete/${id}`);
}
//获取出生医学证明表单内容
export function getBirthCertInfo(params) {
    return axios.post(`${apiPath}obstetricBirthFormControl/getByPVList`, params);
}
// 签名
export function getUser(password, empNo) {
    return axios.post(`${apiPath}user/getUser`, {
        password,
        empNo
    });
}
// 保存出生医学证明表单
export function saveBirthCertInfo(data) {
    return axios.post(`${apiPath}birthMedicalCertifi/saveOrUpdate`, data);
}
//获取孕妇信息
export function getPuerperaInfo(query) {
    return axios.post(`${apiPath}obstetricBirthFormControl/getFrom`, query);
}

//获取产妇列表
export function getPatientListNew() {
    let endDate = moment().format('YYYY-MM-DD')
    // let startDate = new Date(endDate.replace(/-/g, '/'))
    // startDate = startDate.getTime() - 6 * 30 * 86400000
    var dt = new Date();
    dt.setMonth(dt.getMonth() - 6);
    let startDate = moment(dt).format('YYYY-MM-DD')

    // startDate = moment(new Date(startDate)).format('YYYY-MM-DD')

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
