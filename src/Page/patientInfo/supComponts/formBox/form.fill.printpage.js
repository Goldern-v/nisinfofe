
import {signImage} from '@/api/form-sign-image' // 电子签名图片
import common from '@/common/mixin/common.mixin.js'
import moment from 'moment'

// 空白图片
const emptyImage = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='

// 获取 电子签名URL地址
function getSignImageURL(empNo){
  return `/crNursing/api/file/signImage/${empNo}?${common.computed.token()}`;
}

// 回填 表单 打印页 UI 界面的 数据

//数据回填处理函数
export function fill(data,wid) {
  console.log("回填 表单 打印页 UI 界面的 数据",data,common)
  let formCode = data[0].formCode

  let dataColNo = parseInt($(`[name="dataColNo"]`, wid.document).val())||7;

  let currentPage = 0

  // 回填打印页 表单数据 每个 item 都是一列组一张评估表数据
  data.forEach((item,index)=>{
    currentPage = Math.ceil(index/dataColNo)
    // console.log("---item,index:",index,"dataColNo:",dataColNo,'currentPage:',currentPage,item);
    let pageMap = item.pageMap

    var formHeadInfo = item.formHeadInfo;

    // 自动填写 表头病人信息
    for (const info in formHeadInfo) {
      if (formHeadInfo.hasOwnProperty(info)) {
        var val = formHeadInfo[info];
        // 入院时间 格式化
        // admissionDate
        if (info === "admissionDate") {
          // console.log("入院时间", val);
          if (formCode.indexOf("first") > -1) {
            val = moment(val).format("YYYY-MM-DD HH:mm");
          } else {
            val = moment(val).format("YYYY-MM-DD");
          }
        }
        $(`[name='${info}']`, wid.document).val(val);
        $(`span[name='${info}']`, wid.document).html(val);
      }
    }



    // RECORD_DATE RECORD_TIME EVAL_DATE
    try {
      // let evalDate = pageMap[formCode.toUpperCase()+'_EVAL_DATE'].split(' ')
      // let evalDateNoYear = evalDate[0].split('-')
      // pageMap[formCode.toUpperCase()+'_RECORD_DATE'] = evalDateNoYear[1]+'-'+evalDateNoYear[2]
      // pageMap[formCode.toUpperCase()+'_RECORD_TIME'] = evalDate[1]

      let evalDate = pageMap[formCode.toUpperCase() + '_EVAL_DATE']
      let evalScore = pageMap[formCode.toUpperCase() + "_EVAL_SCORE"]||'';
      // _EVAL_SCORE

      let date_ = moment(evalDate).format('MM-DD')
      let time_ = moment(evalDate).format('HH:mm')
      pageMap[formCode.toUpperCase()+'_RECORD_DATE'] = date_=='Invalid date'?'':date_
      pageMap[formCode.toUpperCase()+'_RECORD_TIME'] = time_=='Invalid date'?'':time_
      pageMap[formCode.toUpperCase()+'_RECORD_DATE2'] = date_=='Invalid date'?'':date_
      pageMap[formCode.toUpperCase()+'_RECORD_TIME2'] = time_=='Invalid date'?'':time_



      // 自理表 得100分 不显示 护理措施 时间日期
      if (formCode === "form_selfcare" && evalScore==='100') {
        pageMap[formCode.toUpperCase() + '_RECORD_DATE2'] = "";
        pageMap[formCode.toUpperCase() + "_RECORD_TIME2"] = "";
      }

      // moment(evalDate).format('YYYY-MM-DD')
      //
      // $(`[name='${formCode}_record_date']`,wid.document).val(moment(evalDate).format('YYYY-MM-DD'));
      // $(`[name='${formCode}_record_time']`,wid.document).val(moment(evalDate).format('HH:mm'));
    } catch (e) {

    }

    // 签名
    // creator form_pain_assessment_creator  auditor
    let nameCreator = `${formCode.toLowerCase()}_creator`
    let waterCreator = null
    let pasteAuditor = null
    let htmlCreator = ''
    let htmlAuditor = ''
    // 特殊处理 吞咽评估表 的签名
    if(formCode==='form_swallowing'){
      nameCreator = 'form_swallowing_swallow_water_signature';
      waterCreator = !pageMap['FORM_SWALLOWING_SWALLOW_WATER_SIGNATURE']?false:true //有true, 无false
      pasteAuditor = !pageMap['FORM_SWALLOWING_SWALLOW_PASTE_SIGNATURE']?false:true //有true, 无false
    }

    let imgstyle = "height:auto;width:55px; margin: auto;";
    if(formCode==='form_internal_first'){
      imgstyle = "margin: -10px auto;height:auto;width:55px; ";
    }

    let inputCreator = $(`[name='${nameCreator}']`, wid.document)[index];

    if(inputCreator){
      // console.log('creator',inputCreator,inputCreator.parentNode,item)
      // if(formCode==='form_swallowing' && pageMap['FORM_SWALLOWING_SWALLOW_WATER_SIGNATURE']==null){
      //   return;
      // }
      if(item.creator&&item.creator.indexOf('未签名')===-1 && item.creatorNo!=null
      ){
        inputCreator.value = item.creator+index
        htmlCreator = `<img src=${getSignImageURL(item.creatorNo)} style="${imgstyle}" name='${nameCreator}' />`
        if(waterCreator!==null && waterCreator===false){
          imgstyle = "margin: -10px auto;height:28px;width:55px; ";
          htmlCreator = `<img src=${emptyImage} style="${imgstyle}" name='${nameCreator}' />`
        }
        inputCreator.outerHTML = htmlCreator
      }else{
        // inputCreator.value = '未签名'+index
        imgstyle = "margin: -10px auto;height:28px;width:55px; ";
        inputCreator.outerHTML = `<img src=${emptyImage} style="${imgstyle}" name='${nameCreator}' />`
      }
      // console.log('creatorouterHTML',inputCreator,item)


    }
    let nameAuditor = `${formCode.toLowerCase()}_auditor`;







    // 吞咽表 签名 特殊处理
    if(formCode==='form_swallowing'){
      nameAuditor = 'form_swallowing_swallow_paste_signature'
    }
    let inputAuditor = $(`[name='${nameAuditor}']`, wid.document)[index];
    if(inputAuditor){
      // console.log('creator',inputAuditor,item)
      // if(formCode==='form_swallowing' && pageMap['FORM_SWALLOWING_SWALLOW_PASTE_SIGNATURE']==null){
      //   return;
      // }
      if(item.auditor && item.auditor.indexOf('未签名')===-1 && item.auditorNo!=null
      ){
        inputAuditor.value = item.auditor
        htmlAuditor = `<img src=${getSignImageURL(item.auditorNo)} style="${imgstyle}"  name='${nameAuditor}'>`
        // inputAuditor.outerHTML = `<img src=${getSignImageURL(item.auditorNo)} style="${imgstyle}"  name='${nameAuditor}'>`
        if(pasteAuditor!==null && pasteAuditor===false){
          imgstyle = "margin: -10px auto;height:28px;width:55px; ";
          htmlAuditor = `<img src=${emptyImage} style="${imgstyle}"  name='${nameAuditor}'>`
        }
        inputAuditor.outerHTML = htmlAuditor
      }else{
        // inputAuditor.value = '未签名'+index
        imgstyle = "margin: -10px auto;height:28px;width:55px; ";
        inputAuditor.outerHTML = `<img src=${emptyImage} style="${imgstyle}"  name='${nameAuditor}'>`
      }
    }

    // scan tr for each table
    // $(".print-table table tr input",wid.document).each(function(i,item){
    //   // if(i===index){
    //     console.log('input:',item.name,item.value,index,i);
    //   // }
    // });

      // console.log("-----",$(".print-table table tr input",wid.document))


    // 循环 读取 一张评估表 的数据 回填入 表格相对应 的一列
    for (var keyword in pageMap) {
      if (pageMap.hasOwnProperty(keyword)) {

        // // scan tr for each table
        // $(".print-table table tr input",wid.document).each(function(i,item){
        //   if(keyword.toLowerCase()===item.name){
        //     console.log('input:',item,index,i);
        //   }
        // });


        // console.log("---keyword",keyword.toLowerCase(),pageMap[keyword],$(`[name='${keyword.toLowerCase()}']`, wid.document),index);
        try {
          // wid.$(".print-table table tr",wid.document)
          // keyword = keyword.toLowerCase();
          // 评分项目
          // let inputKeyword = $(`[name*='${keyword.toLowerCase()}']`, wid.document)[index];

          /**
          表单中 字段 特殊处理
          */
          // 吞咽表 评估 频率
          if(keyword.toLowerCase()=='form_swallowing_frequency'){
            pageMap[keyword] = '第'+(index+1)+'次'
          }

          // 疼痛表 护理措施 时间
          if(keyword.toLowerCase()=='form_pain_assessment_hlcs_zyzyzl_time'){
            let date_ = moment(pageMap[keyword]).format('YYYY-MM-DD HH:mm')
            date_ = date_=='Invalid date'?'':date_
            date_ = date_.replace(' ','<br>')
            pageMap[keyword] = date_
          }

          // DVT 和 PTE 风险单 风险程度
          if(keyword.toLowerCase()=='form_dvt_pte_eval_score'){
            // risk-degree
            let total = parseInt(pageMap[keyword])
            let risk = ''
            if (total >= 15) {
              risk = '高风险';
            }
            if (total <= 14) {
              risk = '中风险';
            }
            if (total <= 10) {
              risk = '低风险';
            }
            if (total <= 6) {
              risk = '无风险';
            }
            let riskInput = $(`input[name='risk-degree']:text`, wid.document)[index];
            if(riskInput){
              riskInput.style.fontSize = '12px'
              riskInput.value = risk
            }
          }


          let inputKeyword = $(`[name='${keyword.toLowerCase()}'][value='${pageMap[keyword]}']`, wid.document)[index];



          // 时间日期  _RECORD_DATE _RECORD_TIME
          if(keyword.indexOf('_RECORD_DATE')>-1
            || keyword.indexOf('_RECORD_TIME')>-1
            || keyword.indexOf('_RECORD_DATE2')>-1
            || keyword.indexOf('_RECORD_TIME2')>-1
            || keyword.indexOf('_EVAL_SCORE') > -1
            || keyword.indexOf('_PGXM') > -1  // 项目评估
          // || inputKeyword.length > dataColNo
          ){
          // inputKeyword = $(`[name*='${keyword.toLowerCase()}'][value*='${pageMap[keyword]}']`, wid.document)[index];
            inputKeyword = $(`[name='${keyword.toLowerCase()}']`, wid.document)[index];
            // 不是Input元素，只是更改 innerHTML 为 回填 值 内容
            if(inputKeyword && inputKeyword.tagName!=="INPUT"){
              inputKeyword.innerHTML = pageMap[keyword]
              continue;
            }
            if(inputKeyword && pageMap[keyword]){
              inputKeyword.value = pageMap[keyword];
              continue;
            }

          }

          // 评估措施
          let inputGroup = $(`[name='${keyword.toLowerCase()}'][group="护理措施"]`, wid.document)[index];

          if(inputGroup){
          // console.log("----评估措施-----inputGroup",inputGroup.length,inputGroup);
          inputKeyword = $(`[name='${keyword.toLowerCase()}']`, wid.document)[index];
          }


          // formCode==='form_dvt_pte' ||

          if(formCode==='form_swallowing' ||  formCode==='form_pain_assessment' ){
            inputKeyword = $(`[name='${keyword.toLowerCase()}']`, wid.document)[index];
            // console.log("----吞咽表",inputKeyword);
            // form_pain_assessment_ttfl 疼痛分类
            // form_pain_assessment_rysttqk 入院时疼痛情况
            if(keyword.toLowerCase() === 'form_pain_assessment_ttfl'
            || keyword.toLowerCase() ==='form_pain_assessment_rysttqk'

            // || keyword.toLowerCase().indexOf('form_pain_assessment_ttbw')>-1
            ){
              inputKeyword = $(`[name='${keyword.toLowerCase()}'][value='${pageMap[keyword]}']`, wid.document);
              if(pageMap[keyword]){
                // console.log("----疼痛表",inputKeyword.value,pageMap[keyword],inputKeyword);
                // inputKeyword.checked = true;
                // inputKeyword.prop("checked","true")
                inputKeyword.each(function(i,opt){
                  let self = this
                  // console.log("----疼痛表e",i,opt);
                  self.checked = true;
                });
              }
            }
            // 疼痛评估量表选择
            if(keyword.toLowerCase() === 'form_pain_assessment_ttpgb_option'){
              inputKeyword = $(`input[name='${keyword.toLowerCase()}'][value='${pageMap[keyword]}']`, wid.document);

              if(pageMap[keyword]){
                inputKeyword.attr("checked","checked")
                // console.log("----疼痛表",pageMap[keyword],inputKeyword);
                // inputKeyword.each(function(i,opt){
                //   this.checked = true;
                // });
                continue;
              }
            }

            // 疼痛部位
            if(keyword.toLowerCase().indexOf('form_pain_assessment_ttbw')>-1

            ){
              inputKeyword = $(`[name='${keyword.toLowerCase()}']`, wid.document);
              // inputKeyword.val(pageMap[keyword])
              if(pageMap[keyword]){
                // console.log("----疼痛表",pageMap[keyword],inputKeyword);
                inputKeyword.each(function(){
                  this.value = pageMap[keyword];
                });
              }
            }

            if(inputKeyword && pageMap[keyword] && (pageMap[keyword].indexOf('on')>-1 || pageMap[keyword].indexOf('true')>-1 || inputKeyword.value===pageMap[keyword]
           ) ){
              inputKeyword.checked = true;
              continue;
            }
          }//--------------

          // console.log("======inputKeyword",keyword,pageMap[keyword],inputKeyword)

          // DVT 表填写部分 特殊处理
          if (keyword.toUpperCase().indexOf('FORM_DVT_PTE_GCXM')>-1){
            pageMap[keyword] = pageMap[keyword].replace(',','/');
          }


          if (pageMap[keyword]!==null && pageMap[keyword].indexOf(',')>-1
               && keyword.toLowerCase().indexOf('form_pain_assessment_bw')===-1
              && keyword.toLowerCase().indexOf('form_pain_assessment_ttbw')===-1
             ) {
            try{
              // 回填多选框数据，解析 逗号分隔符 内容
              // console.log("-回填多选框数据-fill",pageMap[keyword],inputKeyword);
              pageMap[keyword] = pageMap[keyword].replace(/（/g,'(');
              pageMap[keyword] = pageMap[keyword].replace(/）/g,')');
              pageMap[keyword] = pageMap[keyword].replace(/：/g,':');

              var arr = (pageMap[keyword]).split(',');
              for (var i = 0; i < arr.length; i++) {
                // 去掉括号（ ）替换为()
                // arr[i] = arr[i].replace(/（/g,'(');
                // arr[i] = arr[i].replace(/）/g,')');
                // arr[i] = arr[i].replace(/：/g,':');
                inputKeyword = $(`[name='${keyword.toLowerCase()}'][value='${arr[i]}']`, wid.document)[index];
                if(inputKeyword){
                  inputKeyword.checked = true;
                }
                if (arr[i].indexOf('启用') > -1) {
                  console.log("启用", arr[i]);
                  $(`[value="${arr[i]}"]`, wid.document).prop('checked', 'checked')
                }
                // if(arr[i]===inputKeyword.value){
                  // inputKeyword.checked = true;
                // }
              }
            }catch(e){
              console.log("--fill-error",e,arr);
            }
            // return;
            continue;
          }

          if(inputKeyword===undefined || pageMap[keyword]===null){continue;}
              // console.log("======inputKeyword",index,keyword,pageMap[keyword],inputKeyword.value,inputKeyword)
            // if(keyword === `${formCode.toUpperCase()}_CREATOR` ){
            //   console.log("______creator",keyword,pageMap[keyword])
            // // //   if(pageMap[keyword].indexOf('未签名')===-1){
            // // //     inputKeyword.outerHTML = `<img src=${getSignImageURL(item.creatorNo)} style="${imgstyle}" />`
            // // //     continue;
            // // //   }
            // }


            // 不是Input元素，只是更改 innerHTML 为 回填 值 内容
            if(inputKeyword.tagName!=="INPUT"){
              // console.log("______不是Input元素",inputKeyword,inputKeyword.tagName)
              inputKeyword.innerHTML = pageMap[keyword]

              continue;
            }

            // 去掉括号（ ）替换为()
            pageMap[keyword] = pageMap[keyword].replace(/（/g,'(');
            pageMap[keyword] = pageMap[keyword].replace(/）/g,')');
            pageMap[keyword] = pageMap[keyword].replace(/：/g,':');


            if(inputKeyword.value){
              inputKeyword.value = inputKeyword.value.replace(/（/g,'(');
              inputKeyword.value = inputKeyword.value.replace(/）/g,')');
              inputKeyword.value = inputKeyword.value.replace(/：/g,':');
            }



            // let inputKeyword = $(".print-table table tr input",wid.document).find(`[name*='${keyword.toLowerCase()}']`)[index];
            // console.log("====inputKeyword",keyword,inputKeyword,inputKeyword.value,pageMap[keyword],$(`[name*='${keyword.toLowerCase()}']`, wid.document))
            // form_fall_qxcd_jszt form_fall_qxcd_jszt
          if ((pageMap[keyword].indexOf('on') > -1 || pageMap[keyword].indexOf('true') > -1 || (inputKeyword.value && inputKeyword.value===pageMap[keyword]) )){
              inputKeyword.checked = true
            } else if(inputKeyword.type==="text"){
              inputKeyword.value = pageMap[keyword]
            }


            // 对吞咽表 补丁 特殊情况处理
            if(formCode==="form_swallowing") {
              if(pageMap[keyword].indexOf('+')>-1){
                // console.log("---form_swallowing",keyword,pageMap[keyword],inputKeyword);
                inputKeyword.style.color = 'red'
              }else{
                inputKeyword.style.color = 'black'
              }

              // if(keyword.toLowerCase().indexOf('water_signature')>-1){
              //   inputKeyword.value = data[index].creator
              //   inputKeyword.outerHTML = `<img src=${getSignImageURL(data[index].creatorNo)} style="${imgstyle}"  name='${keyword.toLowerCase()}'>`
              // }
              // if(keyword.toLowerCase().indexOf('paste_signature')>-1){
              //   inputKeyword.value = data[index].auditor
              //   inputKeyword.outerHTML = `<img src=${getSignImageURL(data[index].auditorNo)} style="${imgstyle}"  name='${keyword.toLowerCase()}'>`
              // }
            }
        } catch (e) {
          console.log("error:",e)
        }


      }
    }
  });






}



export default {
  fill:fill,
}
