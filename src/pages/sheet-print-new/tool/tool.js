function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串   
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
         theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest
   // return Object.assign(theRequest, {
   //    token: '630ca6b2-e8e5-47f1-9649-9f4891ac0875'
   // })
}

/**
 * 患者id
 * @param patientId  
 * 住院次数
 * @param visitId
 * 记录单类型
 * @param recordCode
 * 访问类型 默认 100
 * @param type
 * @param token
 * @param AppTokenNursing
 */

// export const $params = {
//   patientId: 1017251,
//   visitId: 2,
//   recordCode: 'public',
//   type: '100',
//   token: '86f0858a-8af1-4655-aa94-8508ae645a0e',
//   AppTokenNursing: '51e827c9-d80e-40a1-a95a-1edc257596e7',
// }
export const $params = GetRequest()