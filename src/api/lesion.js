// 登录模块api
import axios from './axios'
import {
  apiPath
} from './apiConfig'
const HOSPITAL_ID = process.env.HOSPITAL_ID
// 护理单元
function nursingUnit() {
  return axios.get(`${apiPath}user/nursingUnit`)
}
/**武汉汉口--关闭自动签 */
function endAutoSign(obj) {
  return axios.post(`${apiPath}manufactor/whhk/endAutoSign`,obj,{headers: {'Auth-Token-Nursing':window.app.authToken}})
}
// 护理单元
function typeList() {
  return axios.get(`${apiPath}record/setting/typeList`)
}
/*临床路径*/
function getLink(patientId,visitId,empNo,wardCode){
  return axios.post(`${apiPath}form/common/showNurseCppLevel`,{
    patientId,
    visitId,
    empNo,
    wardCode
  })
}
// 一览卡
function patients(deptCode, config, HisName = process.env.HOSPITAL_NAME) {
  let hisList = {
    // 威县人民医院: `patListWithNewForm/${deptCode}`,
    东莞市厚街医院: `patList/${deptCode}`,
    // 德州市陵城区人民医院: `patListWithNewForm/${deptCode}`,
    // 广州市花都区人民医院: `patListWithNewForm/${deptCode}`,
    // 江门市妇幼保健院: `patListWithNewForm/${deptCode}`,
    // 中山大学附属第七医院: `patListWithNewForm/${deptCode}`,
    // 东莞市横沥医院: `patListWithNewForm/${deptCode}`,
    // 贵州省人民医院: `patListWithNewForm/${deptCode}`,
    // 聊城市第二人民医院: `patListWithNewForm/${deptCode}`,
  };
  let url = hisList[HisName] || `patListWithNewForm/${deptCode}`

  if (config) {
    return axios.post(`${apiPath}bed/patList/config/${deptCode}`, config)
  } else {
    return axios.get(`${apiPath}bed/${url}`)
    // return axios.get(`${apiPath}bed/patList/${deptCode}`)
  }
}
//后端查询床位信息很慢 所以把查询信息分出来
const getPatLevelAndStatus = (data)=>{
  return  axios.post(`${apiPath}bed/getPatLevelAndStatus`,data)
}
// 关注床位
function follow(deptCode, bedLabel, bedNo) {
  return axios.get(`${apiPath}bed/followBed/${bedLabel}/${deptCode}/${bedNo}`)
}
// 取消关注
// function unfollow(bedLabel) {
//   return axios.get(`${apiPath}bed/unfollowBed/${bedLabel}`)
// }
// 取消关注
function unfollow(deptCode, bedNo) {
  return axios.get(`${apiPath}bed/unfollowBed/${deptCode}/${bedNo}`)
}

// 陵城 --更新床位一览卡信息
function syncGetNurseBedRecLc(deptCode) {
  return axios.get(`${apiPath}hisLingChengExecute/syncGetNurseBedRec/${deptCode}`)
}
// 威县 --更新床位一览卡信息
function syncGetNurseBedRec(deptCode) {
  return axios.get(`${apiPath}hisDispenseExecute/syncGetNurseBedRec/${deptCode}`)
}
// 聊城 --更新床位一览卡信息
function syncGetNurseBedRecLiaocheng(deptCode) {
  return axios.get(`${apiPath}hisLiaoChengExecute/syncGetNurseBedRec/${deptCode}`)
}
// 山南 --更新床位一览卡信息
function syncGetNurseBedRecShannan(deptCode) {
  return axios.get(`${apiPath}hisShanNanExecute/syncGetNurseBedRec/${deptCode}`)
}
// 曲周 --更新床位一览卡信息
function syncGetNurseBedRecQuzhou(deptCode) {
  return axios.get(`${apiPath}hisQuZhouXianExecute/syncGetNurseBedRec/${deptCode}`)
}
//横沥 --更新床位一览卡信息
function syncGetNurseBedRecHengli(deptCode){
  return axios.get(`${apiPath}HisHengLiBedRec/syncGetNurseBedRec/${deptCode}`)
}
//江门妇幼 --更新床位一览卡信息
function syncGetNurseBedRecJiangMenFY(deptCode){
  return axios.get(`${apiPath}HisJiangMenFYBedRec/syncGetNurseBedRec/${deptCode}`)
}
//佛山市一 --更新床位一览卡信息
function syncGetNurseBedRecJiangMenFSSY(deptCode){
  return axios.get(`${apiPath}HisFoSanShiYiBedRec/syncGetNurseBedRec/${deptCode}`)
}
//北海 --更新床位一览卡信息
function syncGetNurseBedRecBeiHaiExecute(deptCode){
  return axios.get(`${apiPath}hisBeiHaiExecute/syncGetNurseBedRec/${deptCode}`)
}
//顺德龙江 --更新床位一览卡信息
function syncGetNurseBedRecSDLJExecute(deptCode){
  return axios.get(`${apiPath}HisLinYiBedRec/syncGetNurseBedRec/${deptCode}`)
}

//东莞谢岗 --更新床位一览卡信息
function syncGetNurseBedRecDGXGExecute(deptCode){
  return axios.get(`${apiPath}HisLinYiBedRec/syncGetNurseBedRec/${deptCode}`)
}
//武汉汉口 --更新床位一览卡信息
function syncGetNurseBedRecWHHKExecute(deptCode){
  return axios.get(`${apiPath}hisDispenseExecute/syncGetNurseBedRec/${deptCode}`)
}

// 威县 --同步医嘱
function syncGetMedicalAdvice(deptCode) {
  return axios.get(`${apiPath}hisDispenseExecute/syncGetPatientOrdersWithWardCode/${deptCode}`)
}
// 中山七 --医嘱提醒
function getPatientOrdersWithWardCode(deptCode) {
  return axios.get(`${apiPath}hisZhongShanQiYuanExecute/getPatientOrdersWithWardCode/${deptCode}`)
}
// 武汉肺科 --更新患者数据
function syncGetNursePatientWHFKRecData(deptCode) {
  return axios.get(`${apiPath}bed/syncPatInHospital/${deptCode}`)
}
//根据科室床位同步患者
function synchronizationPatientByBedNo(deptCode,bedNo) {
  return axios.get(`${apiPath}/bed/syncBedPatInHospital/${deptCode}/${bedNo}`)
}



export {
  nursingUnit,
  patients,
  getPatLevelAndStatus,
  follow,
  unfollow,
  getLink,
  // unfollowHd,
  typeList,
  syncGetNurseBedRec,
  syncGetMedicalAdvice,
  syncGetNurseBedRecLc,
  syncGetNurseBedRecLiaocheng,
  getPatientOrdersWithWardCode,
  syncGetNurseBedRecShannan,
  syncGetNurseBedRecQuzhou,
  syncGetNurseBedRecHengli,
  syncGetNurseBedRecJiangMenFY,
  syncGetNurseBedRecJiangMenFSSY,
  syncGetNurseBedRecSDLJExecute,
  syncGetNurseBedRecDGXGExecute,
  syncGetNurseBedRecBeiHaiExecute,
  syncGetNursePatientWHFKRecData,
  syncGetNurseBedRecWHHKExecute,
  synchronizationPatientByBedNo,
  endAutoSign
}
