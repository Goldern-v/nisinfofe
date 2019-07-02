// 登录模块api
import axios from './axios'
import { apiPath } from './apiConfig'

// 护理单元
function nursingUnit() {
  return axios.get(`${apiPath}user/nursingUnit`)
}
// 护理单元
function typeList() {
  return axios.get(`${apiPath}record/setting/typeList`)
}
// 一览卡
function patients(deptCode, config) {
  if (config) {
    return axios.post(`${apiPath}bed/patList/config/${deptCode}`, config)
  } else {
    return axios.get(`${apiPath}bed/patList/${deptCode}`)
  }
}
// 关注床位
function follow(deptCode, bedLabel, bedNo) {
  return axios.get(`${apiPath}bed/followBed/${bedLabel}/${deptCode}/${bedNo}`)
}
// 取消关注
function unfollow(bedLabel) {
  return axios.get(`${apiPath}bed/unfollowBed/${bedLabel}`)
}

export { nursingUnit, patients, follow, unfollow, typeList }
