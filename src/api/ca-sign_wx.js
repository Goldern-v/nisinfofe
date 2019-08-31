// 登录模块api
import axios from "./axios";
import { apiPath } from "./apiConfig";
import qs from "qs";
import { $_$WebSocketObj, GetSignCert } from "./XTXSAB";

//  获取服务器证书和随机数签名
export function getCertAndRandomSign() {
  return axios.post(`${apiPath}dsvs/getCertAndRandomSign`);
}
//  验证服务器证书和随机数签名
export function verifyCertAndUse(cert, signValue, algType) {
  return axios.post(
    `${apiPath}dsvs/verifyCertAndUser`,
    qs.stringify({
      cert,
      signValue,
      algType
    })
  );
}

export function verifyCaSign() {
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
        $_$WebSocketObj.SignData(strUserCertID, random, retValObj => {
          let signValue = retValObj.retVal;
          verifyCertAndUse(cert, signValue, "SM2-256").then(res => {
            $_$WebSocketObj.GetPic(strUserCertID, function(str) {
              console.log(str.retVal);
              let src = "data:image/gif;base64," + str.retVal + "";
              console.log(str, "str");
            });
          });
        });
      });
    });
  });
}
