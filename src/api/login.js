// 登录模块api
import axios from './axios'
import qs from 'qs'
import {apiPath} from './apiConfig'
function login(empNo, password) {
  return axios.post(`${apiPath}login`, qs.stringify({empNo, password}))
}
function logout(authToken) {
  localStorage.clear();
  sessionStorage.clear();
  return axios.get(`${apiPath}logout`, {params: {
    authToken
  }})
}

// // 重新登录
// function autoLogin(userId, authToken) {
//   return axios.get(`${apiPath}autoLogin`, { params: { userId, authToken } })
// }

// 重新登录
function autoLogin(token) {
  return axios.post(`${apiPath}ssoLogin`, { token })
}

// 检查用户名密码
function checkUser(empNo, password) {
  return axios.post(`${apiPath}form/checkUser`,{"empNo":empNo,"password":password} )
}

export {login, logout, autoLogin,checkUser}
