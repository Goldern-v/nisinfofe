
// 模拟后端mock工具 API 接口

import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'

export const mockGetUnitlist = () => {
    return axios.get(`${apiPath}getUnitlist`);
 };
