
// 模拟后端mock工具 API 接口

import axios from '@/api/axios'
import { apiPath } from '@/api/apiConfig'
import qs from 'qs'

// 模拟获取可是列表
export const mockGetUnitlist = () => {
    return axios.get(`/getUnitlist`);
 };
