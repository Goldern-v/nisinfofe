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

// 护理记录单标题
export const showTitle = () => {
    return axios.get(`${apiPath}record/setting/list/${sheetInfo.selectBlock.id}`)
}

// 获取标记集合
export const markList = () => {
    return axios.get(`${apiPath}record/${sheetInfo.sheetType}/sign/list/${sheetInfo.selectBlock.id}`)
}

// 获取起始页
export const getHomePage = () => {
    return axios.get(`${apiPath}record/homePage/${sheetInfo.selectBlock.id}/get`)
}
// 获取block信息
export const getBlock = (id) => {
    return axios.get(`${apiPath}record/block/get/${id}`)
}