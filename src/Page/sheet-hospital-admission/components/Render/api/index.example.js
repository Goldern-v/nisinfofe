export function save(postData) {
  // return axios.post(`${apiPath}form/design/save`, postData)
}

// formDesign - 新表单：创建表单
/**
{
    "patientId": "71025238",
    "visitId": "8",
    "formType": "eval",
    "formCode": "E0003"
}
*/
export function createForm(postData) {
  // return axios.post(`${apiPath}form/design/createForm`, postData)
}

// formDesign - 新表单：删除表单
/**
{
  "id": 4,
  "empNo": "0519",
  "password": "123456"
}
*/

export function del(postData) {
  // return axios.post(`${apiPath}form/design/delete`, postData)
}

// formDesign - 新表单：获取数据
/**
{
  "id": 4,
  "empNo": "0519",
  "password": "123456"
}
*/
export function get(id) {
  // return axios.get(`${apiPath}form/design/get/${id}`)
}

// formDesign - 新表单：获取模板
/**
{
  "deptCode": "4003",
  "templateType": "eval"
}
*/
export function templates(postData) {
  // return axios.post(`${apiPath}form/design/templates`, postData)
}

// http://{{url}}/api/form/design/list
// {
// 	"patientId":"71325620",
// 	"visitId":"1",
// 	"formCode":"E0003"
// }
export function list(postData) {
  // return axios.post(`${apiPath}form/design/list`, postData)
}
