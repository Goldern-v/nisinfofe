import axios from './axios'
import {
  apiPath
} from './apiConfig'
import qs from 'qs'

//获取useKey用户名和UkeyID
function GetUserList() {
  return axios.post(`/crNursing/caSign/GetUserList`)
}
//获取用户useKey用户名和ID对象集合
function GetAllUkeyList() {
  return axios.post(`/crNursing/caSign/AllUkeyList`)
}
/**
 * 
 * UkeyID可通过GetUserList获取
 * @returns 
 */
function SOF_ExportUserCert(UkeyID) {
  return axios.post(`/crNursing/caSign/SOF_ExportUserCert`, UkeyID)
}
/**
 * genRandome接口获取到random,serverCert,signedValue
 * @param {服务器证书} strServerCert 
 * @param {随机数} strRandom 
 * @param {签名值} strServerSignRan 
 * @returns 
 */
function SOF_VerifySignedData(strServerCert, strRandom, strServerSignRan) {
  return axios.post(`/crNursing/caSign/SOF_VerifySignedData`, {
    strServerCert,
    strRandom,
    strServerSignRan
  })
}
/**
 * 验证ca登录ID和密码
 * @param {*} strCertId 
 * @param {*} strPassword 
 * @returns 
 */
function SOF_Login(strCertId, strPassword) {
  return axios.post(`/crNursing/caSign/SOF_Login`, {
    strCertId,
    strPassword
  })
}
// SOF_SignData
function SOF_SignData(strCertId, strSignData) {
  return axios.post(`/crNursing/caSign/SOF_SignData`, {
    strCertId,
    strSignData
  })
}
//获取签名证书，随机数，签名值
function genRandom() {
  return axios.get(`${apiPath}dsvsFssyNew/genRandom`)
}
//最后登录验证
function verifyUser(loginOBJ){
  return axios.post(`${apiPath}dsvsFssyNew/verifyUser`, qs.stringify({...loginOBJ}))
}

function caLoginBefore() {
  return new Promise((resolve, reject) => {
    genRandom().then(genRes=>{
      console.log("genRes",Object.prototype.toString.call(genRes.data))
      if(Object.prototype.toString.call(genRes.data)==="[object Object]"){
        const {random:strRandom,serverCert:strServerCert,signedValue:strServerSignRan} = genRes.data.data
        //SOF_VerifySignedData通过后切换成ca登录操作
        SOF_VerifySignedData(strServerCert,strRandom,strServerSignRan).then(SignedDatares=>{
          //如果通过情况下 
          if(SignedDatares.data=="True"){
            resolve(strRandom)
          }else{
            reject("验证服务器签名失败！")
          }
        }).catch(err=>{
            reject("验证服务器接口失效！")
          })
      }else {
        reject(genRes.desc)
      }
    }).catch(err=>{
        reject("获取证书接口失败，请查看服务器")
    })
  })
}
function caLoginLater(strCertId,strPassword,strRandom){
  return new Promise((resolve, reject) => {
    SOF_Login(strCertId,strPassword).then(SOF_LoginRes=>{
      if(SOF_LoginRes.data=="True"){
        SOF_SignData(strCertId,strRandom).then(SOF_SignDataRes=>{
          // console.log("SOF_SignData",SOF_SignDataRes)
          if(SOF_SignDataRes.data){
            SOF_ExportUserCert(strCertId).then(SOF_ExportUserCertRes=>{
              console.log("SOF_ExportUserCertRes",SOF_ExportUserCertRes)
              if(SOF_ExportUserCertRes.data){
                resolve({userCert:SOF_ExportUserCertRes.data,signedValue:SOF_SignDataRes.data})
              }
            })
          }
        })
      }else{
        reject("证书密码错误!")
      }
      // console.log(SOF_LoginRes ,"SOF_LoginRes")
    })
  })
}
export {
  caLoginBefore,
  caLoginLater,
  SOF_VerifySignedData,
  SOF_SignData,
  SOF_Login,
  GetUserList,
  SOF_ExportUserCert,
  genRandom,
  GetAllUkeyList,
  verifyUser
}
