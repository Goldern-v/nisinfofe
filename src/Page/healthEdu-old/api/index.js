import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import qs from "qs";

// 获取表单列表
export const groupList = (patientId, visitId) => {
  return axios.post(
    `${apiPath}missionInstance/getInstanceByPatientInfo`,
    qs.stringify({
      patientId,
      visitId
    })
  );
};

// 获取模板列表
export const getEduFormTemplateByDeptCode = deptCode => {
  return axios.get(`${apiPath}form/getEduFormTemplateByDeptCode/${deptCode}`);
};
// 获取模板列表
export const deleteMission = id => {
  return axios.get(`${apiPath}missionInstance/deleteMission/${id}`);
};
