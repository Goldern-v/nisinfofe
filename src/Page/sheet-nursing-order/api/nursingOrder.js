import axios from '@/api/axios'
import { apiPath } from '@/api/apiConfig'
import sheetInfo from '@/Page/sheet-nursing-order/components/config/sheetInfo'
import qs from 'qs'


// common - 字典信息(护嘱单)
// POST
// http://127.0.0.1:8080/crNursing/api/dept/dictInfoForNO
/**
 *
 * @Field code	String 必须参数 字典编码,如"护嘱内容"
 * @Field wardCode String 非必须参数 护理单元编码
 *
 */
export function listItem(data) {
  // let code = "护嘱内容";
  return axios.post(`${apiPath}dept/dictInfoForNO`, qs.stringify(data)
  // , {
  //   'code': code,
  //   'wardCode':wardCode
  // }
  );
};

// findTemplatesByDeptCode
// common - 字典信息(护嘱单)
// POST
// http://127.0.0.1:8080/crNursing/api/dept/dictInfoForNO
/**
 *
 * @Field code	String 必须参数 字典编码,如"护嘱内容"
 * @Field wardCode String 非必须参数 护理单元编码
 * @return
    deptCode: "030502"
    deptName: "神经内科"
    id: 1
    name: "神内护嘱单"
    orderContentCode: "orders:public:神内护嘱单"
    status: "1"
 */
export function findTemplatesByDeptCode(wardCode) {
  return axios.get(`${apiPath}ordersPublicTemplate/findTemplatesByDeptCode/${wardCode}`);
};

// 新接口
export function findTemplatesByDeptCodeCN(deptCode) {
  return axios.post(`${apiPath}ordersPublicTemplate/findTemplatesByDeptCodeWithCN`,qs.stringify({deptCode}));
};


// orders - 护嘱：保存或修改
// POST JSON / APPLICATION
// http://127.0.0.1:8080/crNursing/api/orders/public/save
/**
 *
 * id	Long 必须参数 医嘱整单ID
 * signType Long 非必须参数 签名类型（1:签名第一个， 2：签名第二个）
 * empNo String 必须参数 签名工号
 * password String 必须参数 签名密码
 *
 * list	List 数组， 以下为数组参数
 *
*/
export function saveOrUpdate (orderPostData) {
    return axios.post(`${apiPath}orders/public/save`, orderPostData);
};


// orders - 护嘱：获取护嘱单列表

/**
 *
 *
 * @param patientId	String 必须参数 患者ID
 * @param visitId	String 必须参数 就诊次数
 * @url http://127.0.0.1:8080/crNursing/api/orders/public/whole/list
 *
*/
export function list(patientId, visitId) {
  return axios.post(`${apiPath}orders/public/whole/list`, {patientId, visitId})
 }


// //  列表
// export function list(groupName) {
//   // let recordCode = sheetInfo.sheetType
//   // return axios.post(`${apiPath}record/desc/list`, {recordCode, groupName})
//  }


// orders - 护嘱：获取护嘱单详情

// //  删除
// export function del(id) {
// // return axios.get(`${apiPath}record/desc/delete/${id}`,)
// }
//  获取
export function get(id) {
  return axios.get(`${apiPath}orders/public/get/${id}`)
}
