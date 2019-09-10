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

export function verifyCaSign() {
  return new Promise((resolve, reject) => {
    // 获取用户id
    $_$WebSocketObj.GetUserList(usrInfo => {
      let strUserCertID = usrInfo.retVal
        .substring(usrInfo.retVal.indexOf("||") + 2, usrInfo.retVal.length)
        .replace("&&&", "");
      console.log(strUserCertID, "strUserCertID");
      GetSignCert(strUserCertID, function(certObj) {
        let cert = certObj.retVal;
        console.log(cert, "cert");
        getCertAndRandomSign().then(res => {
          let random = res.data.data.random;
          console.log(`strUserCertID-${strUserCertID}`, `random-${random}`);
          SignedData(strUserCertID, random, retValObj => {
            console.log(retValObj, "retValObj");
            let signValue = retValObj.retVal;
            $_$WebSocketObj.GetPic(strUserCertID, function(str) {
              verifyCertAndUse(cert, signValue, "SM2-256", str.retVal).then(
                res => {
                  resolve(random);
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
