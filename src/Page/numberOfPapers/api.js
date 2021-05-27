import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";

// 获取
const getNumTableData = (params) => {
  return axios.post(`${apiPath}nursingDocStatistics/complete`, params);
};

// 获取
const getTimeTableData = (params) => {
  return axios.post(`${apiPath}nursingDocStatistics/timeConsume`, params);
};

export default {
  getNumTableData,
  getTimeTableData
}
