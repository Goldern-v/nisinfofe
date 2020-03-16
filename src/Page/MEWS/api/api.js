import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

// 获取评分曲线
export const getMewsItemScoreList = (patientId, visitId) => {
  return axios.get(
    `${apiPath}mews/getMewsItemScoreList/${patientId}/${visitId}`
  );
};
