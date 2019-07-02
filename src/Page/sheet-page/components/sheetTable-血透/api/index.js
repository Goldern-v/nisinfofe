import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import sheetInfo from "../components/config/sheetInfo";
import qs from "qs";

// 分类合计
export const putGroupCount = (patientId, visitId, startTime, endTime) => {
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/putGroupCount`, {
    startTime,
    endTime,
    blockId: sheetInfo.selectBlock.id
  });
};
