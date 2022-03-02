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