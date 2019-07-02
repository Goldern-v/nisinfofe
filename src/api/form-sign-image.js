
// 表单 签名图片查看

//
import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'


// 签名图片查看  /file/signImage/{empNo}        empNo String 必须参数 员工号
// export function signImage(empNo,apptoken='51e827c9-d80e-40a1-a95a-1edc257596e7') {
//   let authtoken = window.app.$getCookie('NURSING_USER').split('##')[1]
//   console.log("签名图片查看",empNo,apptoken,authtoken)
//   return axios.get(`${apiPath}file/signImage/${empNo}?App-Token-Nursing=${apptoken}&Auth-Token-Nursing=${authtoken}`)
// }

// 签名图片查看  /file/signImage/{empNo}        empNo String 必须参数 员工号
export function signImage(empNo) {
  // let authtoken = window.app.$getCookie('NURSING_USER').split('##')[1]
  // console.log("签名图片查看",empNo,apptoken,authtoken)
  return axios.get(`${apiPath}file/signImage/${empNo}`)
}

/*
App-Token-Nursing: 51e827c9-d80e-40a1-a95a-1edc257596e7
Auth-Token-Nursing: 94ba845b-a831-499b-adca-6a6860c3df09
*/
