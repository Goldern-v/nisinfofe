import axios from "@/api/axios";
import { apiPath  } from "@/api/apiConfig";
import qs from "qs";

export const flag = {
/**手术统计 */
  statisticalOperation: {
    query: 'getOperationStatistical',
  },
/**脉搏统计 */
  statisticalPulseHeartRate: {
    query: 'getPulseStats',
  },
/**心率统计 */
  statisticalHeartRate: {
    query: 'getHrStats',
  },
  /**压力性损伤统计 */
  statisticalPressure: {
    query: 'getPressureInjuryStats',
  },
/**血压统计 */
  statisticalBloodPressure: {
    query: 'getBpStats',
  },
  statisticalTemperature: {
/**体温统计 */
    query: 'getTempStats',
  },
/**护理级别统计 */
  statisticalNursingLv: {
    query: 'getNursingClassStats',
  },
  statisticalWorkload: {
    query: '',
  },
/**呼吸统计 */
  statisticalBreath: {
    query: 'getBreatheStats',
  },
/**入院出院统计 */
  statisticalExitAdmission: {
    query: 'getAdmAndDisStats',
  },
/**VTE统计 */
  statisticalVTE: {
    query: 'getVteStats',
  },
}
/**获取统计 */
export function query(params, key = 'statisticalOperation') {
  return axios.post(`${apiPath}statisticalQuery/${flag[key].query}`, params)
}

export function exportExc(params) {
  return axios.post(
    `${apiPath}statisticalQuery/export`,
    params,
    {
      responseType: "blob"
    }
  )
}
