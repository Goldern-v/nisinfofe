// 登录模块api
import axios from "./axios";
import { apiPath } from "./apiConfig";
import qs from "qs";

//  获取服务器证书和随机数签名
export function getCertAndRandomSign() {
  return axios.post(`${apiPath}dsvs/getCertAndRandomSign`);
}
//  验证服务器证书和随机数签名
export function verifyCertAndUse(cert, signValue, algType, signPic) {
  return axios.post(
    `${apiPath}dsvs/verifyCertAndUser`,
    qs.stringify({
      cert,
      signValue,
      algType,
      signPic
    })
  );
}
//  验证服务器证书和随机数签名
export function saveSignPic(signPic) {
  return axios.post(
    `${apiPath}dsvs/saveSignPic `,
    qs.stringify({
      signPic
    })
  );
}

// //数字医信OAuth登陆-认证请求接口
// export const getAuthorize=(data)=>{
//     return axios.get(`https://test.51trust.com/gateway/oauth/authorize?responseType=code&clientId=2017070411003376`)
// }

// //数字医信 OAuth登陆-获取用户信息
// export const getTrustUserInfo=(data)=>{
//   return axios.get(`https://test.51trust.com/gateway/oauth/tokeninfo?clientId=2017070411003376&requestId=${data.requestId}`)
// }

//数字医信OAuth登陆-认证请求接口
export const getAuthorize=(data)=>{
  console.log(process.env.HOSPITAL_ID);
  switch(process.env.HOSPITAL_ID){
    case 'hj':
    case 'guizhou':
      return axios.get(`${apiPath}caSignHoujie/getAccessToken`)
    case 'zhzxy':
      return axios.get(`${apiPath}caSignZhzxy/authorizeCaZhzxy`,{params:{selfSign:true}})
    case 'zzwy':
      return axios.get(`${apiPath}manufactor/zzwy/getQRCodeForLogin`)
      // /api/manufactor/zzwy/getQRCodeForLogin
    default:
      return axios.get(`${apiPath}caSignJmfy/authorizeCaJmfy`)
  }
}

//数字医信 OAuth登陆-获取用户信息
export const getTrustUserInfo=(data)=>{
  switch(process.env.HOSPITAL_ID){
    case 'hj':
    case 'guizhou':
      return axios.post(`${apiPath}caSignHoujie/auth/getOauthStatus`,{
        accessToken:data.accessToken,
        transactionId:data.transactionId,
      })
    case 'zhzxy':
      return axios.get(`${apiPath}caSignZhzxy/tokeninfoCaZhzxy/${data.requestId}`)
    case 'zzwy':
      return axios.post(`${apiPath}manufactor/zzwy/queryQRCode`,data)
    case 'whhk':
      return axios.post(`${apiPath}manufactor/whhk/getSignResult`,data)
    default:
      return axios.get(`${apiPath}caSignJmfy/tokeninfoCaJmfy/${data.requestId}`)
  }
}


//
// "patientName": "0830测试", -- 患者名称
// "patientSex": "男", -- 患者性别
// "patientCardType": "SF", -- 患者证件类型
// "openId": "1554fec40e617298q7634w02f4y8770be9a", -- 当前用户唯一标识
// "patientAge": "23", -- 患者年龄
// "patientCard": "123456789", -- 患者证件号
// "templateId":"hash", -- 模板id
// "formId":"139339", -- 表单ID
// "selfSign":false -- 是否开启自动签名
export function getCaSignJmfy(data) {
  switch(process.env.HOSPITAL_ID){
    case 'hj':
    case 'guizhou':
      console.log(data);
      return axios.post(`${apiPath}caSignHoujie/sign/signdata`,data)
    case "zhzxy":
      return axios.post(`${apiPath}caSignZhzxy/pushCaSignCommon`,data);
    default:
      return axios.post(`${apiPath}caSignJmfy/pushCaSign`,data);
  }
}

export function getQrCode(accessToken){
  return axios.get(`${apiPath}caSignHoujie/auth/oauth/${accessToken}`,{oauthMethod:'3'})
}

export function verifyData(accessToken,fileCode,empNo){
  return axios.post(`${apiPath}caSignHoujie/sign/verifyData`,{
    accessToken,
    fileCode,
    empNo
})
}
