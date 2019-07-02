/**

宸瑞软件公司logo

oooooooo8 oooooooooo   oooooooo8               o888o  o8
o888     88  888    888 888           ooooooo  o888oo o888oo oooo  o  oooo ooooooo   oo oooooo    ooooooooo8
888          888oooo88   888oooooo  888     888 888    888    888 888 888  ooooo888   888    888 888oooooo8
888o     oo  888  88o           888 888     888 888    888     888888888 888    888   888        888
888oooo88  o888o  88o8 o88oooo888    88ooo88  o888o    888o    88   88   88ooo88 8o o888o         88oooo888


*/

import bus from 'vue-happy-bus'
import moment from 'moment'
import common from '@/common/mixin/common.mixin.js'

/**
  @auth weijun lai
  @date 07-25-2018
  @description 佛祖加持  iii 帮你找BUG 让你DEBUG更醒目
*/
// export var getFoZuHelp = function(){
//   return `
//
            //                      _oo0oo_
            //                     088888880
            //                     88" . "88
            //                     (| -_- |)
            //                      0\ = /0
            //                   ___/'---'\___
            //                 .' \\\\|     |// '.
            //                / \\\\|||  :  |||// \\
            //               /_ ||||| -:- |||||- \\
            //              |   | \\\\\\  -  /// |   |
            //              | \_|  ''\---/''  |_/ |
            //              \  .-\__  '-'  __/-.  /
            //            ___'. .'  /--.--\  '. .'___
            //         ."" '<  '.___\_<|>_/___.' >'  "".
            //        | | : '-  \'.;'\ _ /';.'/ - ' : | |
            //        \  \ '_.   \_ __\ /__ _/   .-' /  /
            //    ====='-.____'.___ \_____/___.-'____.-'=====
            //                      '=---='
             
            //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //            佛祖加持    iii    帮你找BUG
// `};

/**
  @auth weijun lai
  @date 07-25-2018
  @description 获取电子签名URL存储路径
  @param String empNo 医务人员工号
  @return String ""   电子签名图片URL路径
*/
function getSignImageURL(empNo){
  return `/crNursing/api/file/signImage/${empNo}?${common.computed.token()}`;
}

/**
  @auth weijun lai
  @date 07-25-2018
  @description 数据回填处理函数
  @param Object data 回填数据包
  @return Object wid  数据将被填入传入的窗口 window对象
*/
export function fill(data, wid, isUpdate=true) {
  console.log("!!数据回填fill",data,wid);
  var splitMark = ',';
  var pdata = data.pageMap;
  var iframeClassName = wid.frameElement.className || '';
  var formCode = data.formCode;
  var evalDate = "";

  

  var evalDateInput = $(`[name='${formCode}_eval_date']`, wid.document);

  var formHeadInfo = data.formHeadInfo;

  // 自动填写 表头病人信息
  for (const info in formHeadInfo) {
    if (formHeadInfo.hasOwnProperty(info)) {
      var val = formHeadInfo[info];
      // 入院时间 格式化
      // admissionDate
      if (info === "deptName"){
        val = formHeadInfo[info]||formHeadInfo['wardName']
      }
      if (info === "admissionDate") {
        console.log("入院时间", val);
        if (formCode.indexOf("first") > -1) {
          val = moment(val).format("YYYY-MM-DD HH:mm");
        } else {
          val = moment(val).format("YYYY-MM-DD");
        }
        let adate =  pdata[formCode+'_admission_date'.toUpperCase()]
        if(!adate){
          adate = val
        }
      }
      $(`[name='${info}']`, wid.document).val(val);
      $(`span[name='${info}']`, wid.document).html(val);
    }
  }



  // 自动填写 时间 日期 签名 数据
  try{
    let edKey = `${formCode}_eval_date`;
    evalDate = pdata[edKey.toUpperCase()];
    console.log("-------fillevalDate",evalDate);
    if(moment(evalDate).format('YYYY-MM-DD HH:mm')==="Invalid date"){
      evalDate=moment().format('YYYY-MM-DD HH:mm');
    }



    console.log("-------fillevalDate2",evalDate);
    // 入院时间 格式化
    // admissionDate

    


    $(`[name='${formCode}_record_date']`,wid.document).val(moment(evalDate).format('YYYY-MM-DD'));
    $(`[name='${formCode}_record_time']`,wid.document).val(moment(evalDate).format('HH:mm'));

    //
    $(`[name='${formCode}_creator']`,wid.document).val(data.creator); //
    $(`[name='${formCode}_signDate']`,wid.document).val(data.signDate); //
    if(formCode.indexOf('first')>-1 && data.signDate!==""){
      $(`[name='${formCode}_eval_date']`,wid.document).val(data.signDate);
    }
    if(evalDateInput){
      evalDateInput.val(evalDate)
    }
    $(`[name='${formCode}_auditor']`,wid.document).val(data.auditor);  //
    $(`[name='${formCode}_auditDate']`,wid.document).val(data.auditDate); //
    $(`[name='${formCode}_eval_auth']`,wid.document).val(data.creator);
  }catch(e){
    //
  }

  // 区分处理 编辑页面下iframe 和 打印页面 iframe 下 签名框显示内容
  // 编辑页面iframe 签名框显示为下划线+数码文字，打印页面iframe 签名框为电子签名图片
  // 编辑页面 class="assessment-iframe"  打印页面 class="iframe-con"    iframe-form-con
  if(iframeClassName==="iframe-con"){

    try {
      // 签名
      // 字段 creator form_pain_assessment_creator  auditor
      let inputCreator = $(`[name*='${formCode.toLowerCase()}_creator']`, wid.document)[0];
      console.log("签名",inputCreator,data.creator);
      if(inputCreator){
        // console.log('creator',inputCreator,inputCreator.parentNode,item)
        // 如果护士已经签名了，就把签名INPUT框替换为电子签名图片IMG
        if(data.creator&&data.creator.indexOf('未签名')===-1){
          inputCreator.value = data.creator
          inputCreator.outerHTML = `<img src=${getSignImageURL(data.creatorNo)} style="margin: -10px auto;height:33px;width:72px;position: absolute; " name='${inputCreator.name}' />`
        }else{
          // inputCreator.value = '未签名'+index
          inputCreator.outerHTML = "";
        }
        // console.log('creatorouterHTML',inputCreator,data)
      }
      let inputAuditor = $(`[name*='${formCode.toLowerCase()}_auditor']`, wid.document)[0];
      if(inputAuditor){
        // console.log('creator',inputAuditor,data)
        // 如果护士长已经审核了，就把签名INPUT框替换为电子签名图片IMG
        if(data.auditor && data.auditor.indexOf('未签名')===-1){
          inputAuditor.value = data.auditor
          inputAuditor.outerHTML = `<img src=${getSignImageURL(data.auditorNo)} style="margin: -8px 0 0 14px;height:33px;width:72px;position: absolute; "  name='${inputAuditor.name}'>`
        }else{
          // inputAuditor.value = '未签名'+index
          inputAuditor.outerHTML = "";
        }
      }

    } catch (e) {
      console.log(e);
    }
  }// iframeClassName

  // console.log("-------fill",data,wid);
  // $(`input[name='${formCode}_eval_auth']`,wid.document).css({"border":"0px"});
  // 获取的表单数据, 更新存储到store
  if (isUpdate){
  window.app.$store.commit('upFormFilledData', data)
  }


  if(iframeClassName==='iframe-form-con'){
    $("tr",wid.document).remove(".nursing-operation")
    // $("td",wid.document).remove(".text-center")
    // $("td",wid.document).remove(".2")
  }


  // 循环读取 data.pageMap 里所有 字段 及 值，回填入同字段名的且值相同的 元素里
    for (var variable in pdata) {
      if (pdata.hasOwnProperty(variable)) {
        var value = pdata[variable];
        if(value===null){
          continue;
        }
        // console.log("this.value:",value,variable);
        variable = variable.toLowerCase();
        // 去掉括号（ ）替换为()
        value = value.replace(/（/g,'(');
        value = value.replace(/）/g,')');
        value = value.replace(/：/g,':');

        $("[name='"+variable+"']",wid.document).each(function(e){
          // console.log("this.value:",this.value,value,variable);
          // 护士签名时间 如果有则 替换记录时间字段 值
          if(!this){
            return
          }
          if(variable.indexOf('eval_date') > -1 ){
            if(formCode.indexOf('first')>-1 && data.signDate!==""){
              this.value = data.signDate;
              // $(`[name='${variable}']`,wid.document).val(data.signDate);
              return;
            }
          }

          let group = this.getAttribute('group')
          if(group && group==='护理措施'){
            // console.log('group',group,variable,value,this)
            this.value = value
            if(this.type==='checkbox'){
              value = value.replace(/,/g,'');
              this.checked = false
              if(value.indexOf('true')>-1){
                this.checked = true
                value = 'true'
                pdata[variable] = value
              }
              return
            }
            if(this.tagName && this.tagName!=="INPUT"){
              value = value.replace(/,/g,'/');
              pdata[variable] = value
              $(this).html(value)
              // this.innerHTML = value
            }
            console.log('group',this.tagName,group,variable,value,this,iframeClassName)
            
            return
          }

          if(this.value){
            this.value = this.value.replace(/（/g,'(');
            this.value = this.value.replace(/）/g,')');
            this.value = this.value.replace(/：/g,':');
          }

          // 不是Input元素，只是更改 innerHTML 为 回填 值 内容
          if(this.tagName && this.tagName!=="INPUT"){
            this.innerHTML = value
            return;
          }

          if (this.type==="text"||this.type==="number"
            ||this.type==="time"||this.type==="date"){
              //eval_date
              if(variable.indexOf('record_date') > -1){
                this.value= moment(value).format('YYYY-MM-DD')
                if(this.value==="Invalid date"){
                  this.value= moment(evalDate).format('YYYY-MM-DD')
                }
                return;
              }
              if(variable.indexOf('record_time') > -1){
                this.value= moment(evalDate).format('HH:mm')
                // if(this.value==="Invalid date"){
                //   this.value= moment().format('HH:mm')
                // }
                return;
              }
            this.value=value;
            return;
          }
          //
          // if (this.type==="date") {
          //   // console.log("##########this.type",this.type,this.name,value,this);
          //   this.value=value;
          //   return;
          // }
          if (this.type==="checkbox") {
            try{
              // 回填多选框数据，解析 逗号分隔符 内容
              var arr = (value).split(splitMark);
              
              if (variable.toUpperCase().indexOf("_ID") > -1) {
                let id = parseInt(value);
                // console.log("回填多选框数据", this.name, variable, this.value, value, id);
                if (id && !isNaN(id)) {
                  this.checked = true;
                  this.value = id;
                }
              }
              for (var i = 0; i < arr.length; i++) {
                if(arr[i]===this.value||arr[i]==="true"){
                  this.checked = true;
                }
                if (arr[i].indexOf('启用')>-1){
                  // console.log("启用", arr[i], this.value);
                  $(`[value="${arr[i]}"]`,wid.document).prop('checked','checked')
                }
              }
            }catch(e){
              console.log("--fill-error",e,arr);
            }
            return;
          }
          // 循环到的元素包含的值 与 回填字段里的值 相同
        	if (this.value===value){
            // if (this.type==="radio") {
            //     this.checked = true;
            //     return;
            // }
        		// this.value=value;
            // this.disabled = true;
              this.checked = true;
              let s = wid.document.getElementsByName(this.name+"_score");
              let span = wid.document.querySelector(`.${this.name}_score`);
              if(s && s.length>0){
                s[0].value = this.value;
              }
              if(span){
                span.innerHTML = `${this.value}`;
              }

              //eval_auth
              if(variable.indexOf('eval_auth') > -1){
                //
              }



            }
        });



      } // if
    }// for

    //
    // wid
    /* 表单补丁
       --事件
       --样式
       --功能
    ooooo ooooo             o8     o888o o88
     888   888   ooooooo  o888oo o888oo  oooo  oooo   oooo
     888ooo888 888     888 888    888     888    888o888
     888   888 888     888 888    888     888    o88 88o
    o888o o888o  88ooo88    888o o888o   o888o o88o   o88o

    */
    // 疼痛评估表
    // if(formCode==="form_pain_assessment") {
    // 表单里的钩子
      try {
        wid.recheck();
      } catch (e) {
        //
      }

    // }




    // 签名审核输入框鼠标事件处理
    // 点击事件-责任护士输入框-后弹窗签名
    // wid.parent.frameElement.className === "assessment-iframe"

    try {
      if(wid.frameElement.className === "assessment-iframe"){
        let creator =  jQuery("input[name*='_creator']",wid.document)[0];
        // console.log("点击事件-责任护士输入框-后弹窗签名",creator,creator.parentNode);
        creator.parentNode.disabled=true
        creator.parentNode.addEventListener("mouseover",function (e) {
          creator.style.cursor = data.status==="0"?"pointer":"default";
        });
        creator.parentNode.addEventListener("click",function (e) {
          if(data.status==="0"){bus.$emit('assessmentSignSave');}
        });
        // form_pain_assessment_auditor
        let auditor =  jQuery("input[name*='_auditor']",wid.document)[0];
        // console.log("点击事件-审核输入框-后弹窗签名",auditor,auditor.parentNode);
        auditor.parentNode.disabled=true
        auditor.parentNode.addEventListener("mouseover",function (e) {
          auditor.style.cursor = data.status==="1"?"pointer":"default";
        });
        auditor.parentNode.addEventListener("click",function (e) {
          if(data.status==="1"){bus.$emit('assessmentShenheSign');}
        });
      }
    } catch (e) {
      //
    }


  if (formCode === "form_internal_first") {
    // if(data.status==="0"){bus.$emit('assessmentSignSave');}

    let edKey = `${formCode}_eval_date`;
    evalDate = pdata[edKey.toUpperCase()];
    

    let dvtDate = '2018-09-28 00:00'
    
    // moment 评估时间 在 DVTData之前 true
    let isOld = moment(evalDate).isBefore(dvtDate)

    console.log("---评估时间",evalDate,dvtDate,isOld)


    // 切换 DVT 和 VTE
    let dvtid = jQuery("[name$='dvt_id']", wid.document)
    let vteid = jQuery("[name$='vte_id']", wid.document);
    let dvtGroup = jQuery("#dvt_group_options", wid.document);
    let vteGroup = jQuery("#vte_group_options", wid.document);
    // dvt_group_options
    // vte_group_options
    console.log("切换 DVT 和 VTE", dvtGroup, vteGroup, dvtid);
    if (dvtGroup && vteGroup && dvtid) {
      console.log("切换 DVT 和 VTE--", dvtGroup, vteGroup, dvtid);
      try {
        let id = parseInt(dvtid.val());
        console.log("切换 DVT 和 VTE,=id=", id);
        if ((id && !isNaN(id))||isOld) {
          vteGroup.hide();
          dvtGroup.show();
        } else {
          vteGroup.show();
          dvtGroup.hide();
        }
      } catch (error) {
        console.log("切换 DVT 和 VTE==", error);
      }
      // try {
      //   let vteid = parseInt(vteid.val());
      //   if (vteid && !isNaN(vteid)) {
      //     vteid.prop('checked', 'checked');
      //   } else {
      //     vteid.prop('checked', '');
      //   }
      // } catch (error) {
      //   vteid.prop("checked", "");
      // }
    }

  }


    try {
      let valueCreator = jQuery("[name*='creator']",wid.document).val();
      let valueAuditor = jQuery("[name*='auditor']",wid.document).val();
      jQuery("[name*='creator']",wid.document).prop("disabled","true")
      jQuery("[name*='auditor']",wid.document).prop("disabled","true")
      if(data.status==="2"){
        jQuery("input[name*='auditDate']",wid.document).attr("disabled",false);
        jQuery("input[name*='auditDate']",wid.document).removeAttr("disabled");
      }
      // form_internal_first_creator
      // form_internal_first_auditor
      // form_internal_first_auditDate
    } catch (e) {
      console.log('auditDate未签名:',e)
    }






    // form_swallowing_swallow_water_result
    // form_swallowing_swallow_paste_result
    // 吐咽评估表
    if(formCode==="form_swallowing") {
      try {
        let waterResult = $(`input[name='form_swallowing_swallow_water_result']`,wid.document)
        let pasteResult = $(`input[name='form_swallowing_swallow_paste_result']`,wid.document)
        if(waterResult.val().indexOf('+')>-1){
          waterResult.css({'color':'red'});
        }else{
          waterResult.css({'color':'black'});
        }
        if(pasteResult.val().indexOf('+')>-1){
          pasteResult.css({'color':'red'});
        }else{
          pasteResult.css({'color':'black'});
        }

        //  签名
        let waterSignature = $(`[name='form_swallowing_swallow_water_signature']`,wid.document);
        let pasteSignature = $(`[name='form_swallowing_swallow_paste_signature']`,wid.document);
        // waterSignature.prop("disabled","true")
        // pasteSignature.prop("disabled","true")
        if(!data['auditor']){
          data['auditor']=""
        }
        let creatorSignature =  data['creator']
        let auditorSignature =  data['auditor']
        console.log("吐咽评估表waterSignature",waterSignature,waterSignature.val(),pasteSignature);

        waterSignature.val(creatorSignature);
        pasteSignature.val(auditorSignature);
        // if(auditorSignature===null){
        //   pasteSignature.val(creatorSignature);
        // }

        // waterSignature.disabled=true;
        // pasteSignature.disabled=true;
        if(wid.frameElement.className === "assessment-iframe"){
          if(waterSignature.val()=="" || waterSignature.val().indexOf('未签名')>-1){
          // if(data.status==="0"){
            waterSignature.css({"cursor":'pointer'});
            waterSignature[0].parentNode.addEventListener("click",function (e) {
              console.log("吐咽评估表waterSignature",waterSignature,e);
              bus.$emit('assessmentSignSave');
            });
          // }
          }


          if(pasteSignature.val()==""|| pasteSignature.val().indexOf('未签名')>-1){
          // if(data.status==="0"){
            pasteSignature.css({"cursor":'pointer'});
            pasteSignature[0].parentNode.addEventListener("click",function (e) {
              console.log("吐咽评估表pasteSignature",pasteSignature,e);
              bus.$emit('assessmentShenheSign');
            });
          // }
          }
        }



        // console.log("吐咽评估表fill",waterSignature,pasteSignature,creatorSignature,auditorSignature);
        // console.log("吐咽评估表fill",waterResult,pasteResult,waterSignature,pasteSignature,creatorSignature,auditorSignature);
      } catch (e) {
        console.log("吐咽评估表Erorrfill",e);
      }

    }









}

export default {
  fill:fill,
  // getFoZuHelp:getFoZuHelp,
}
