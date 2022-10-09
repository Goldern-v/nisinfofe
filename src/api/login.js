// 登录模块api
import axios from './axios'
import qs from 'qs'
import { apiPath } from './apiConfig'
function login(loginOBJ) {
  console.log("...loginOBJ",loginOBJ)
  return axios.post(`${apiPath}login`, qs.stringify({ ...loginOBJ }))
}
function hisLogin(loginOBJ) {
  return axios.post(`${apiPath}login/dgxg`, qs.stringify({...loginOBJ}))
}

function logout(authToken) {
  localStorage.clear();
  sessionStorage.clear();
  return axios.get(`${apiPath}logout`, {
    params: {
      authToken
    }
  })
}
function ipAddress(authToken) {
  return axios.get(`${apiPath}ipAddress`)
}

// // 重新登录
// function autoLogin(userId, authToken) {
//   return axios.get(`${apiPath}autoLogin`, { params: { userId, authToken } })
// }

// 重新登录
function autoLogin(payload) {
  let params = {}
  if (Object.prototype.toString.call(payload) === "[object String]") {
    params.token = payload
  } else {
    params = { ...payload }
  }

  return axios.post(`${apiPath}ssoLogin`, params)
}

// 检查用户名密码
function checkUser(empNo, password) {
  return axios.post(`${apiPath}form/checkUser`, { "empNo": empNo, "password": password })
}

// his登录 by谢岗
// function hisLogin(params) {
//   return axios.post(`http://10.45.0.24:8066/service1.asmx/账户校验`,params, {'Content-Type': 'application/x-www-form-urlencoded'})
// }

export { login, logout, autoLogin, checkUser,hisLogin,ipAddress}
