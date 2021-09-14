import axios from "@/api/axios";
import qs from "qs";
import { apiPath } from "@/api/apiConfig";

export const getCatheterList = (patientId, visitId, startTime, endTime) => {
    return axios.post(
      `${apiPath}${MODULE_TYPE}/${sheetInfo.sheetType}/putGroupCount`,
      { startTime, endTime, blockId: sheetInfo.selectBlock.id }
    );
  };