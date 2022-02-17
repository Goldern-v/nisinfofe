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
      return axios.post(`/hj_ca/api/v1.0/getAccessToken`,{
        appid:'891124536567752',
        appkey:'WSHJTJO602GHU4FWHPDE31FQEZG6E5KR'
      })
    default:
      return axios.get(`${apiPath}caSignJmfy/authorizeCaJmfy`)
  }
}

//数字医信 OAuth登陆-获取用户信息
export const getTrustUserInfo=(data)=>{
  switch(process.env.HOSPITAL_ID){
    case 'hj':
      return axios.post(`/hj_ca/api/v1.0/auth/getOauthStatus?accessToken=${data.accessToken}`,{
        transactionId:data.transactionId,
      })
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
  return axios.post(`${apiPath}caSignJmfy/pushCaSign`,data);
}

export function getQrCode(accessToken){
  return axios.post(`/hj_ca/api/v1.0/auth/oauth?accessToken=${accessToken}`,{oauthMethod:'3'})
}

