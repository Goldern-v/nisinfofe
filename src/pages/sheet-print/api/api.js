import axios from '@/api/axios'
import qs from 'qs'
import { apiPath } from '@/api/apiConfig'
import { $params } from '../tool/tool'
import sheetInfo from '@/Page/sheet-page/components/config/sheetInfo'
// axios.interceptors.request.use((config) => {
//     config.headers.common['App-Token-Nursing'] = '51e827c9-d80e-40a1-a95a-1edc257596e7'
//     config.headers.common['Auth-Token-Nursing'] = $params.token || ''
//     return config
// })
// axios.interceptors.response.use((res) => {
//     return res
// }, (err) => {
//     console.log(err, 'err')
// })
export const showBody = () => {
    let data = {}
    data.blockId = sheetInfo.selectBlock.id
    data.printSessionId = $params.printSessionId
    return axios.post(`${apiPath}record/${sheetInfo.sheetType}/list`, data)
}
export const showBodyByPage = (patientId, visitId,startPageIndex ,endPageIndex) => {
  let data = {
    patientId,
    visitId,
    blockId: sheetInfo.selectBlock.id,
    pageIndex: startPageIndex,
    endPageIndex: endPageIndex,
  };
  return axios.post(`${apiPath}record/${sheetInfo.sheetType}/listByPage`, data);
};
export const showTitle = (patientId, visitId, startPageIndex, endPageIndex) => {
  if (startPageIndex && endPageIndex) {
    return axios.get(
      `${apiPath}record/setting/list/${sheetInfo.selectBlock.id}?startPageIndex=${startPageIndex}&endPageIndex=${endPageIndex}`
    );
  }
  return axios.get(`${apiPath}record/setting/list/${sheetInfo.selectBlock.id}`);
};


// 获取起始页 有时候sheetInfo没有响应  所以加了判断  预防报错
export const getHomePage = (patientId, visitId) => {
  if(sheetInfo.selectBlock.id)
  return axios.get(`${apiPath}record/homePage/${sheetInfo.selectBlock.id}/get`);
};
// 获取block信息
export const getBlock = (id) => {
    return axios.get(`${apiPath}record/block/get/${id}`)
}

// 住院评估单预览
export const syncToRecord = (id) => {
    return axios.post(`${apiPath}form/design/syncToRecord/${id}`, {
        sign: false,
    })
}
