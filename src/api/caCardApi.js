import axios from './axios'
import {
  apiPath,
  caSignHOST
} from './apiConfig'
import qs from 'qs'


//获取useKey用户名和UkeyID
function GetUserList() {
  return axios.post(`${caSignHOST}/GetUserList`)
}
//获取用户useKey用户名和ID对象集合
function GetAllUkeyList() {
  return axios.post(`${caSignHOST}/AllUkeyList`)
}
/**
 * 
 * UkeyID可通过GetUserList获取
 * @returns 
 */
function SOF_ExportUserCert(UkeyID) {
  return axios.post(`${caSignHOST}/SOF_ExportUserCert`, UkeyID)
}
/**
 * genRandome接口获取到random,serverCert,signedValue
 * @param {服务器证书} strServerCert 
 * @param {随机数} strRandom 
 * @param {签名值} strServerSignRan 
 * @returns 
 */
function SOF_VerifySignedData(strServerCert, strRandom, strServerSignRan) {
  return axios.post(`${caSignHOST}/SOF_VerifySignedData`, {
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
  return axios.post(`${caSignHOST}/SOF_Login`, {
    strCertId,
    strPassword
  })
}
// SOF_SignData
function SOF_SignData(signDataObj) {
  return axios.post(`${caSignHOST}/SOF_SignData`, signDataObj)
}
// pic_GetPic_Base64获取图片路径
function pic_GetPic_Base64(UkeyID) {
  return axios.post(`${caSignHOST}/pic_GetPic_Base64`, UkeyID)
}
//获取签名证书，随机数，签名值
function genRandom() {
  return axios.get(`${apiPath}dsvsFssyNew/genRandom`)
}
//最后登录验证
function verifyUser(loginOBJ) {
  return axios.post(`${apiPath}dsvsFssyNew/verifyUser`, qs.stringify({
    ...loginOBJ
  }))
}
//签名传给后台认证
function verifySign(loginOBJ) {
  return axios.post(`${apiPath}dsvsFssyNew/verifySign`, loginOBJ)
}

function caLoginBefore() {
  return new Promise((resolve, reject) => {
    genRandom().then(genRes => {
      console.log("genRes", Object.prototype.toString.call(genRes.data))
      if (Object.prototype.toString.call(genRes.data) === "[object Object]") {
        const {
          random: strRandom,
          serverCert: strServerCert,
          signedValue: strServerSignRan
        } = genRes.data.data
        //SOF_VerifySignedData通过后切换成ca登录操作
        SOF_VerifySignedData(strServerCert, strRandom, strServerSignRan).then(SignedDatares => {
          //如果通过情况下 
          if (SignedDatares.data == "True") {
            resolve(strRandom)
          } else {
            reject("验证服务器签名失败！")
          }
        }).catch(err => {
          reject("验证服务器接口失效！")
        })
      } else {
        reject(genRes.desc)
      }
    }).catch(err => {
      reject("获取证书接口失败，请查看服务器")
    })
  })
}

function caLoginLater(strCertId, strPassword, strRandom) {
  return new Promise((resolve, reject) => {
    SOF_Login(strCertId, strPassword).then(SOF_LoginRes => {
      if (SOF_LoginRes.data == "True") {
        SOF_SignData({
          strCertId,
          strSignData: strRandom
        }).then(SOF_SignDataRes => {
          // console.log("SOF_SignData",SOF_SignDataRes)
          if (SOF_SignDataRes.data) {
            SOF_ExportUserCert(strCertId).then(SOF_ExportUserCertRes => {
              console.log("SOF_ExportUserCertRes", SOF_ExportUserCertRes)
              if (SOF_ExportUserCertRes.data) {
                resolve({
                  userCert: SOF_ExportUserCertRes.data,
                  signedValue: SOF_SignDataRes.data
                })
              }
            })
          }
        })
      } else {
        reject("证书密码错误!")
      }
      // console.log(SOF_LoginRes ,"SOF_LoginRes")
    })
  })
}

function getSOF_ExportUserCert(strCertId) {
  return new Promise((resolve, reject) => {
    SOF_ExportUserCert(strCertId).then(SOF_ExportUserCertRes => {
      if (SOF_ExportUserCertRes.data) resolve(SOF_ExportUserCertRes.data)
      else reject("获取用户证书失败！")
    })
  })
}

function getPic(strCertId) {
  return new Promise((resolve, reject) => {
    pic_GetPic_Base64(strCertId).then(GetPicRes => {
      if (GetPicRes.data) resolve(GetPicRes.data)
      else reject("获取ca图片路径失败!")
    })
  })
}
function verifyNewCaSign(SigndataObj,verifySignObj) {
  return new Promise((resolve, reject) => {
    GetUserList().then(res => {
      if (res.data.length > 0) {
        if(!localStorage.caUser){
          return reject("ca证书还未登录，请先登录！")
        }
      const strCertId = res.data.substring(res.data.indexOf("||") + 2, res.data.length).replace("&&&", "");
      SOF_SignData({...SigndataObj,strCertId}).then((SOF_SignDatares) => {
        console.log("SOF_SignDatares",SOF_SignDatares)
        if(SOF_SignDatares.data){
          let signPic = ""
          Promise.all([getPic(strCertId),getSOF_ExportUserCert(strCertId)]).then(result=>{
            if(!JSON.parse(localStorage.getItem("user")).signPic){
              signPic=result[0]
            } 
            verifySign({...verifySignObj,signPic,userCert:result[1],signedValue:SOF_SignDatares.data}).then(verifySignRes=>{
              localStorage["caUser"]= res.data.split("||")[0]
              resolve(verifySignRes.data.data)
            })
          })
        }
      })
    } else {
      localStorage.removeItem("caUser")
      reject("请用密码验证！")
    }
  })
})
}
export {
  getSOF_ExportUserCert,
  getPic,
  caLoginBefore,
  caLoginLater,
  SOF_VerifySignedData,
  SOF_SignData,
  SOF_Login,
  GetUserList,
  SOF_ExportUserCert,
  genRandom,
  GetAllUkeyList,
  verifyUser,
  verifySign,
  pic_GetPic_Base64,
  verifyNewCaSign
}
