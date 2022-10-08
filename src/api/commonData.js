// 入院评估 api
import axios from './axios'
import {apiPath} from './apiConfig'
import qs from 'qs'

//  入院评估得分
/*
request:
{
    "patientId": "1001",  //必须参数 病人ID
    "visitId": "1",       //必须参数 就诊流水号
    "codes": [            //必须参数 表单编码列表
        "form_sas",
        "form_sds"
    ]
}

response:
{
    "code": "200",
    "desc": "操作成功",
    "data": {
        "form_sas": {
            "ID": 1,
            "EVAL_DATE": "2017-12-13 16:00",
            "EVAL_SCORE": "9",
            "EVAL_USER": "张三"
        },
        "form_sds": {
            "ID": 2,
            "EVAL_DATE": "2017-12-13 16:00",
            "EVAL_SCORE": "10",
            "EVAL_USER": "张三"
        }
    }
}
*/
export function loadScore(patientId,visitId,codes) {
  return axios.post(`${apiPath}commonData/loadScore`, {"patientId":patientId,"visitId":visitId,"codes":codes})
}


//  入院病人资料
export function loadPatient(patientId,visitId) {
  return axios.get(`${apiPath}commonData/loadPatient/${patientId}/${visitId}`)
}

// 入院评估项
export function loadEval(code,patientId,visitId) {
  return axios.get(`${apiPath}commonData/loadEval/${code}/${patientId}/${visitId}`)
}
/**
 *  获取手术名称
 */
export function getOperationName(patientId,visitId, date) {
  return axios.get(`${apiPath}commonData/operationName/${patientId}/${visitId}/${date}`)
}

export default {
  loadScore:loadScore,
  loadPatient:loadPatient,
  loadEval:loadEval,
}
