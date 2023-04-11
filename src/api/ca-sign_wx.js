// 登录模块api
import axios from "./axios";
import { apiPath } from "./apiConfig";
import qs from "qs";
import {
  $_$WebSocketObj,
  GetSignCert,
  SignedData,
  DecryptData
} from "./XTXSAB";
let fnPath  = ``
switch(process.env.HOSPITAL_ID){
  case'weixian':
  fnPath = `dsvs`;
    break;
  case'foshanrenyi':
  fnPath = `dsvsFssy`;
    break;
  case'whhk':
    fnPath = `dsvsFssy`;
    break;
  default:
    fnPath = `dsvs`;
    break;
}
//  获取服务器证书和随机数签名
export function getCertAndRandomSign() {
  return axios.post(`${apiPath}${fnPath}/getCertAndRandomSign`);
}
//  验证服务器证书和随机数签名
export function verifyCertAndUse(cert, signValue, algType, signPic) {
  return axios.post(
    `${apiPath}${fnPath}/verifyCertAndUser`,
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
    `${apiPath}${fnPath}/saveSignPic `,
    qs.stringify({
      signPic
    })
  );
}
export function verifyCaSign() {
  return new Promise((resolve, reject) => {
    // 获取用户id
    let sumTime = 0
    let sumTimer = setInterval(() => {
      sumTime+=0.5
    }, 500);
    // timer = setInterval(()=>logTime('证书助手','GetUserList'),1000)
    $_$WebSocketObj.GetUserList(usrInfo => {
      let strUserCertID = usrInfo.retVal
        .substring(usrInfo.retVal.indexOf("||") + 2, usrInfo.retVal.length)
        .replace("&&&", "");
      GetSignCert(strUserCertID, function(certObj) {
      // console.log('调用了证书助手接口：SOF_ExportUserCert',sumTime);
        let cert = certObj.retVal;
        getCertAndRandomSign().then(res => {
          // console.log('调用了后端接口：getCertAndRandomSign',sumTime);
          // console.log('后端接口返回的cert证书',res.data.data.serverCert);
          let random = res.data.data.random;
          // console.log(`strUserCertID-${strUserCertID}`, `random-${random}`);
          SignedData(strUserCertID, random, retValObj => {
            // console.log('调用了证书助手接口：SOF_SignData',sumTime);
            // console.log(retValObj, "retValObj");
            let signValue = retValObj.retVal;
            $_$WebSocketObj.GetPic(strUserCertID, function(str) {
              // console.log('调用了证书助手接口：GetPic',sumTime);
              verifyCertAndUse(cert, signValue, "SM2-256", str.retVal).then(res => {
                // console.log('调用了后端接口：verifyCertAndUse',sumTime);
                // console.log('ca相关接口调用完毕',sumTime,'s');
                clearInterval(sumTimer)
                resolve({random,data:res.data.data});
                  // DecryptData(random, res.data.data, retValObj => {
                  //   let password = retValObj.retVal;
                  //   resolve();
                  // });
                }
              );
            });
          });
        });
      });
    });
  });
}
