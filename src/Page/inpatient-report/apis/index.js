import axios from '@/api/axios'
import { apiPath } from '@/api/apiConfig'
import qs from 'qs'

// 查询病区科室
export function listDepartment (parentCode) {
  return axios.get(`${apiPath}wardDaily/getDeptWithWardcode/${parentCode}`)
}
// export function listDepartment(parentCode) {
//   return axios.get(`${apiPath}user/nursingUnit`);
// }


// 查询病区工作日报
export function listWardReport (deptCode, date) {
  return axios.get(`${apiPath}wardDaily/getWardLog/${deptCode}/${date}`)
}

//住院病人登记表信息(根据科室和时间段获取)
export function listInpatientReport (wardCode, startDateTime='',endDateTime='') {
  return axios.post(`${apiPath}form/inHisPatInfo`,
    qs.stringify(Object.assign({},{
          wardCode: wardCode,
          startDateTime: startDateTime,
          endDateTime: endDateTime
    })
    )
  )
}
