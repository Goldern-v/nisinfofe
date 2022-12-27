import axios from './axios'
import {
  apiPath,
  caSignHOST
} from './apiConfig'
import {
  getAuthorize,
  getQrCode
} from './ca-sign_fuyou'
import qs from 'qs'
import base from '../utils/base64'
import sheetInfo  from '../Page/sheet-page/components/config/sheetInfo/index'

//佛山人医ca签名有关接口
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
function SOF_GetRetryCount(UkeyID) {
  return axios.post(`${caSignHOST}/SOF_GetRetryCount`, UkeyID)
}
function SOF_ValidateCert_Text(UkeyID) {
  return axios.post(`${caSignHOST}/SOF_ValidateCert_Text`, UkeyID)
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
function SOF_Login(strCertId, strPassword,username) {
  return axios.post(`${caSignHOST}/SOF_Login`, {
    strCertId,
    strPassword,
    username
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
            resolve({strRandom,strServerCert})
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

function caLoginLater(strCertId, strPassword, strRandom,strServerCert,username) {
  return new Promise((resolve, reject) => {
    SOF_Login(strCertId, strPassword,username).then(SOF_LoginRes => {
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
        SOF_GetRetryCount(strCertId).then(SOF_GetRetryCountRes=>{
          if(SOF_GetRetryCountRes.data>0){
            reject("证书密码错误!您还有"+SOF_GetRetryCountRes.data+"次机会")
          }else{
            SOF_ValidateCert_Text(SOF_ValidateCert_Text).then(SOF_ValidateCertRes=>{
              const status = SOF_ValidateCertRes.data.split("|")[0]
              const desc = SOF_ValidateCertRes.data.split("|")[1]
              switch(status){
                case "-6":
                  return reject("密码错误，Ukey已锁，请解锁后再试")
                default:
                  return reject(desc)
              }
              console.log(SOF_ValidateCertRes,"SOF_ValidateCertRes");
            })
            // reject("密码错误，Ukey已锁，请解锁后再试")
          }
        })
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
  //有时候如果传空值 就把护记的当前信息传给CA保存做凭证
  if(!SigndataObj) SigndataObj = {...sheetInfo.se}
  return new Promise((resolve, reject) => {
    GetUserList().then(res => {
      if (res.data.length > 0) {
        if(!localStorage.caUser){
          return reject("ca证书还未登录，请先登录！")
        }
      const strCertId = res.data.split("&&&")[0].substring(res.data.indexOf("||") + 2, res.data.length).replace("&&&", "");
      console.log('Ca接口信息=======>入参',{...SigndataObj,strCertId})
      SOF_SignData({...SigndataObj,strCertId}).then((SOF_SignDatares) => {
        console.log("SOF_SignDatares",SOF_SignDatares)
        if(SOF_SignDatares.data){
          let signPic = ""
          Promise.all([getPic(strCertId),getSOF_ExportUserCert(strCertId)]).then(result=>{
            if(!JSON.parse(localStorage.getItem("user")).signPic){
              signPic=result[0]
            }
            console.log('Ca接口信息=======>出参','result',result,'signPic',signPic)
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

// 南方中西医ca签名相关接口
function getCertificate(userUid) {
  return axios.get(`${apiPath}caSignNfzxy/getCertificate`,{params:{
    userUid
  }})
}
function getAccessToken(params) {
  return axios.post(`${apiPath}caSignNfzxy/getAccessToken`,params)
}
function p7Sign(params) {
  return axios.post(`${apiPath}caSignNfzxy/p7Sign`,params)
}
function nanfanggetQrCode(params) {
  return axios.post(`${apiPath}caSignNfzxy/nanfanggetQrCode`,params)
}

function getRandomQrCode() {
  switch(process.env.HOSPITAL_ID){
    case 'guizhou':{
      return new Promise((resolve, reject) => {
        getAuthorize().then(getAuthorizeRes=>{
          let accessToken = getAuthorizeRes.data.data.data.accessToken
          sessionStorage.setItem('accessToken',accessToken)
          getQrCode(accessToken).then(res=>{
            resolve(res)
          })
        })
      })
      break;
    }
    default:
      return axios.get(`${apiPath}caSignNfzxy/getRandomQrCode`)
  }
}
function getQrCodeStatus(qrCodeIdentity,isLogin,accessToken) {
  switch(process.env.HOSPITAL_ID){
    case 'guizhou':{
      return axios.post(`${apiPath}caSignHoujie/auth/caLogin`,
      {
        accessToken,
        transactionId:qrCodeIdentity
      })
      break;
    }
    default:
      return axios.post(`${apiPath}caSignNfzxy/getQrCodeStatus`,
      {
        qrCodeIdentity,
        isLogin
      })
  }
  
}

function nanfnagCaSign(userUid,password,p7SignObj,userToken,nanFangcaLogin) {
  console.log("djwdjwdjw")
  return new Promise((resolve, reject) => {
    if(nanFangcaLogin && userToken){
      console.log("jinlaila")
      p7Sign({signData:{...p7SignObj},userUid ,userToken}).then(p7Signres=>{
        resolve(p7Signres)
      })
    }else if(nanFangcaLogin && !userToken){
      //南方中西医ca扫码登录但token已过期
      getCertificate(userUid).then(Certificateres=>{
        if(Certificateres.data.data.signCert.length>0){
          const certContent = Certificateres.data.data.signCert
          console.log("certContent",certContent)
          nanfanggetQrCode({certContent}).then(AgetQrCoderes=>{
            if(AgetQrCoderes.data.data.qrCodeBase64) resolve(AgetQrCoderes.data.data.qrCodeBase64)
          })
        }else reject("获取证书失败！")
      })
    }else{
      const base64 = new base()
      const userPin = base64.encode(password)
      getCertificate(userUid).then(Certificateres=>{
        if(Certificateres.data.data.signCert.length>0){
          const certContent = Certificateres.data.data.signCert
          console.log("certContent",certContent)
          getAccessToken({certContent,userPin}).then(AccessTokenres=>{
            if(AccessTokenres.data.data.userToken && AccessTokenres.data.data.userToken.length>0){
              const userToken = AccessTokenres.data.data.userToken
              p7Sign({signData:{...p7SignObj},userUid ,userToken}).then(p7Signres=>{
                console.log("p7Signres",p7Signres)
                resolve(p7Signres)
              })
            }
          })
        }else reject("获取证书失败！")
      })
    }

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
  verifyNewCaSign,
  SOF_GetRetryCount,
  nanfnagCaSign,
  getRandomQrCode,
  getQrCodeStatus
}
