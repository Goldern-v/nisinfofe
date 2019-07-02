import { form } from '@/api/form';
import $ from 'jquery';

function getKeyName(source,formCode){
  source = source.replace(formCode+"_","");
  source = source.replace(/_score/g,"");
  return source;
}

function hasDiagnosis(diagnosis,id){
  for (var i = 0; i < diagnosis.length; i++) {
    if(diagnosis[i].id===id){
      return true;
    }
  }
  return false;
}

function getScoreJsCode(wid,isFirst=false){
  var formCode = jQuery(`input[name*='formCode']`,wid.document).val();
  var inputs = jQuery(`input[name*='_score']`,wid.document);
  var values = [];
  var keys = [];
  var jscode = "";
  var varWord = isFirst?'var ':'';
  // console.log("eventInit_inputs",formCode,inputs);

  for (var i in inputs) {
    if (inputs.hasOwnProperty(i)) {
      var key = ""+inputs[i].name;
      var value = inputs[i].value;
      // form_selfcare_eval_score
      // key = key.replace(formCode+"_","");
      // key = key.replace(/_score/g,"");
      key = getKeyName(key,formCode);

      if (key!="undefined" && key!="eval"){
        // console.log(key,value);
        values.push({key:key,value:value});
        jscode += `${varWord}${key}=${value};`;
      }
    }
  }
  console.log("jscode",jscode);
  return {script:jscode,values:values};
}

export function eventInit(data, wid) {
    // let $ = wid.$
    var jscode = getScoreJsCode(wid,true);
    wid.eval(jscode.script);
    // eval(`${jscode.script}`);

    // console.log("values",values,jscode);
    // console.log("jscode",js);
    var formList = [];

    function openList() {
      formList = [];

      jscode = getScoreJsCode(wid);
      console.log("eventInit",data,jscode.script,jscode,wid);
      wid.eval(jscode.script);
      // eval(`${jscode.script}`);

      // console.log("js",js);

      for (var variable in data) {
        if (data.hasOwnProperty(variable)) {
          let result = wid.eval(data[variable].fieldValue);
          // let result = eval(`${data[variable].fieldValue}`);
          console.log("result:",data[variable].fieldValue,result,data[variable].diagnosisName);
          if(result){
            if(!hasDiagnosis(formList,data[variable].id)){
              formList.push(data[variable]);
            }
          }
        }
      }

      return window.app.$store.commit('upFormData', formList);
    }

    openList();

    console.log("data",data);
    for (var index in data) {
      if (data.hasOwnProperty(index)) {
        // console.log("data[index]",data[index],index);
        let formCode = data[index].formCode
        let field = data[index].field
        let fieldValue = data[index].fieldValue
        let values = jscode.values;
        // console.log("values",values);
        for (var i = 0; i < values.length; i++) {
          var key = values[i].key;
          if(key===null||key===undefined){continue;}
          if(fieldValue.indexOf(values[i].key)>-1){
            console.log("--values",fieldValue,values[i].key);
            let item = jQuery(`input[name*='${formCode}_${values[i].key}']`,wid.document).click((e) => {
                openList()
            })
          }
        }

      }
    }





    // return;


    // let fieldMap = data.fieldMap //js callback code
    // let diags = data.diags
    // // window.app.$store.commit('upHisDiags', data.hisDiags)
    //
    //
    // function getList() {
    //     let formList = []
    //     for (let key in fieldMap) { //js callback code
    //         // 表单的类型
    //         if ($(`[name=${key}]`).eq(0).attr('type') == 'radio') {
    //             let val = $(`[name=${key}]:checked`).val()
    //             var jscode = new Function('return ' + fieldMap[key])();
    //             let data = jscode(val)  // eg. return [162,163]
    //             formList = [...formList, ...data]
    //         }
    //         if ($(`[name=${key}]`).eq(0).attr('type') == 'checkbox' && $(`[name=${key}]:checked`).length) {
    //             $(`[name=${key}]:checked`).foreach((index, ele) => {
    //                 var jscode = new Function('return ' + fieldMap[key])();
    //                 let val = $(ele).val()
    //                 let data = jscode(val) // eg. return [162,163]
    //                 formList = [...formList, ...data]
    //             })
    //         }
    //         if ($(`[name=${key}]`).eq(0).attr('type') == 'select' || $(`[name=${key}]`).eq(0).attr('type') == 'text') {
    //             let val = $(`[name=${key}]`).val()
    //             var jscode = new Function('return ' + fieldMap[key])();
    //             let data = jscode(val) // eg. return [1,109,112]
    //             formList = [...formList, ...data]
    //         }
    //     }//js callback code
    //
    //
    //     let result = renderList(formList)
    //     window.app.$store.commit('upFormData', result)
    //
    //     /*
    //     eg. [1,109,112]
    //     result = [
    //       {
    //         "id": 1,
    //         "code": "0000000010",
    //         "name": "活动无耐力",
    //         "seqNo": null
    //       },
    //       {
    // 				"id": 109,
    // 				"code": "0000000540",
    // 				"name": "躯体移动障碍",
    // 				"seqNo": null
    // 			},
    //       {
    // 				"id": 112,
    // 				"code": "0000000543",
    // 				"name": "借助轮椅活动障碍",
    // 				"seqNo": null
    // 			},
    //     ]
    //     */
    //
    //
    // }
    //
    //
    //
    // function renderList(list) {
    //     // eg. [1,109,112]
    //     let uniq = window.app.$_.uniq(list)
    //
    //     let result = []
    //     uniq.forEach(function(option, index, array) {
    //         for(let j of diags) {
    //             if(j.id == option) {
    //                 result.push(j)
    //             }
    //         }
    //     })
    //     console.log(result)
    //     return result
    // }
    //
    //
    //
    // // 绑定事件
    // for (let key in fieldMap) {  //js callback code
    //     if ($(`[name=${key}]`).eq(0).attr('type') == 'radio' || $(`[name=${key}]`).eq(0).attr('type') == 'checkbox') {
    //         $(`[name=${key}]`).click(() => {
    //             getList()
    //         })
    //     }
    //     if ($(`[name=${key}]`).eq(0).attr('type') == 'text') {
    //         $(`[name=${key}]`).change(() => {
    //             getList()
    //         })
    //     }
    //     if ($(`[name=${key}]`).eq(0).attr('type') == 'select') {
    //         $(`[name=${key}]`).change(() => {
    //             getList()
    //         })
    //     }
    // }
}
