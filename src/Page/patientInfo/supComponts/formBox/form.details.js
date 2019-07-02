import {host} from '@/api/apiConfig'
import commonData from '@/api/commonData' //入院HIS数据等
import {
  evalDetail
  // formPrintPage,
  // formInputPrint
} from "@/api/form_hj"

import { formUrl, devFormUrl } from "@/common/pathConfig/index.js";


import formFill from "./form.fill"
import FormToTab from '@/plugin/tool/FormToTab.js'
import qs from 'qs'
import $ from 'jquery'
import moment from 'moment'
import bus from 'vue-happy-bus'
// 护理系统表单api
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    if (parent.window.location.hash.split('?')[1]) {
        var r = parent.window.location.hash.split('?')[1].match(reg)
    }
    if (r != null) {
        return decodeURIComponent(r[2])
    }
    return null
}

// 字段转换

function getFormCode(wid) {
  let formCode = ""
  try{
    formCode = jQuery(`input[name*='formCode']`,wid.document).val()||""
  }catch(e){
    console.log(e)
  }
  return formCode;
}

export function initList(wid,pdata= window.app.$route.query) {
    // let $ = wid.jQuery
    var formCode = getFormCode(wid);
    var iframeClassName = wid.frameElement.className || '';

    //  键盘事件
    let elelist = jQuery('input',wid.document)
    // console.log("======键盘事件elelist",elelist)
    FormToTab(elelist)


    console.log('initList::iframeClassName',iframeClassName)
    //
    if(iframeClassName==='iframe-form-con'){
      $("tr",wid.document).remove(".nursing-operation")
      // $("td",wid.document).remove(".text-center")
      // $("td",wid.document).remove(".2")
    }


  if (formCode === "form_internal_first") {
    // if(data.status==="0"){bus.$emit('assessmentSignSave');}


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
        if (id && !isNaN(id)) {
          vteGroup.hide();
          dvtGroup.show();
        } else {
          vteGroup.show();
          dvtGroup.hide();
        }
      } catch (error) {
        console.log("切换 DVT 和 VTE==", error);
      }
      try {
        let vteid = parseInt(vteid.val());
        if (vteid && !isNaN(vteid)) {
          vteid.prop('checked', 'checked');
        } else {
          vteid.prop('checked', '');
        }
      } catch (error) {
        vteid.prop("checked", "");
      }
    }

  }




    // 初始化 填入表单已知数据  姓名：性别： 年龄： 病区： 床号： 住院号/ID号
    // window.app.$route.query

    // var pdata = window.app.$route.query;
    console.log("form.detail.initList",pdata,wid);
    var itemname = "";
    for (var item in pdata) {
      if (pdata.hasOwnProperty(item)) {
        jQuery("[name='"+item+"']",wid.document).each(function(){

          // 入院时间 格式化
          // admissionDate
          if(item==='admissionDate'){
            console.log("入院时间", pdata[item])
            if(formCode.indexOf('first')>-1){
              pdata[item] = moment(pdata[item]).format('YYYY-MM-DD HH:mm');
            }else{
              pdata[item] = moment(pdata[item]).format('YYYY-MM-DD');
            }

            pdata[item+"Time"] = moment(pdata[item]).format("YYYY-MM-DD HH:mm");
          }


          if(this.tagName!=="INPUT"){
            this.innerHTML = pdata[item]
            return;
          }
        	// if (this.type==="text"){
        		this.value=pdata[item];
            this.disabled = true;
            // }
        });
      }
    }





    // // 初始化时 自动填写当前时间和日期
    var timeInput = jQuery(`input[name='${formCode}_record_time']`,wid.document);
    var dateInput = jQuery(`input[name='${formCode}_record_date']`,wid.document);
    var evaldateInput = jQuery(`input[name='${formCode}_eval_date']`,wid.document);
    // signDate auditDate
    // var signDateInput = jQuery(`input[name*='${formCode}_signDate']`,wid.document);
    // var auditDateInput = jQuery(`input[name*='${formCode}_auditDate']`,wid.document);
    try {
      moment.locale('en');
      dateInput.val(moment().format('YYYY-MM-DD'));
      timeInput.val(moment().format('HH:mm'));
      evaldateInput.val(moment().format('YYYY-MM-DD HH:mm'));
    } catch (e) {
      console.log(e)
    }

  if (['form_selfcare','form_pain_assessment','form_pressure_risk','form_fall','form_swallowing'].indexOf(formCode)>-1) {

    try {
      bus.$emit("updateTreeData");
      let treeData = window.app.$route.query.treeData;
      // let isFirstForm = false
      treeData = treeData.filter(item => {
        return item.formCode === formCode;
        // console.log(isFirstForm, item.formCode, formCode);
        // if (isFirstForm){return}
      });
      console.log("-------自理评估表", treeData.length, treeData);
      if (treeData.length==0) {
        // commonData.loadPatient(pdata.patientId, pdata.visitId).then(res => {
        //   console.log("入院病人资料:", res, res.data.data, window.app.$route.query);
          // console.log(res);

          console.log("---入院时间", window.app.$route.query.patientInfo,pdata,pdata['admissionDateTime'],pdata['admissionDate'],window.app.$route.query.patientInfo)

          let dateTime = window.app.$route.query.patientInfo?(window.app.$route.query.patientInfo.admissionDate||window.app.$route.query.patientInfo.admissionDateTime):(pdata['admissionDateTime']||pdata['admissionDate']);

          console.log('dateTime',dateTime)


          if(dateTime==='Invalid date'){
            dateInput.val(moment().format("YYYY-MM-DD"));
            timeInput.val(moment().format("HH:mm"));
            evaldateInput.val(moment().format('YYYY-MM-DD HH:mm'));
          }else{
            dateInput.val(moment(dateTime).format("YYYY-MM-DD"));
            timeInput.val(moment(dateTime).format("HH:mm"));
            evaldateInput.val(moment(dateTime).format('YYYY-MM-DD HH:mm'));
          }

          // dateInput.prop("disabled","true");
          // timeInput.prop("disabled", "true");
      console.log("---记录时间", dateInput.val(),timeInput.val());
        // })
      }

    } catch (error) {
      console.log("error:",error)
      //
    }


  }



    // 表单补丁
    // 插入人体图鼠标事件到疼痛评估表
    if(formCode==="form_pain_assessment") {
        jQuery("#bodyImageButton",wid.document).on("click",function (e) {
          window.openBodyModal(1, function(parts){
                jQuery("input[name$='form_pain_assessment_bw']",wid.document).val(parts);
              }, jQuery("input[name$='form_pain_assessment_bw']",wid.document).val());
        });

    } // form_pain_assessment



    // form_swallowing_swallow_water_result
    // form_swallowing_swallow_paste_result
    // 吐咽评估表 结果颜色
    if(formCode==="form_swallowing") {
      try {
        let waterResult = jQuery(`[name='form_swallowing_swallow_water_result']`,wid.document)
        let pasteResult = jQuery(`[name='form_swallowing_swallow_paste_result']`,wid.document)
        // waterResult.prop('disabled','true');
        // pasteResult.prop('disabled','true');
        if(waterResult.val().indexOf('+')>-1){
          waterResult.css({'color':'red'});
        }
        if(waterResult.val().indexOf('-')>-1){
          waterResult.css({'color':'black'});
        }
        if(pasteResult.val().indexOf('+')>-1){
          pasteResult.css({'color':'red'});
        }
        if(pasteResult.val().indexOf('-')>-1){
          pasteResult.css({'color':'black'});
        }
        waterResult.keyup(function(e){
          console.log("waterResult",e);
          if(e.target.value.indexOf('+')>-1){
            waterResult.css({'color':'red'});
          }else{
            waterResult.css({'color':'black'});
          }
        })
        pasteResult.keyup(function(e){
          console.log("pasteResult",e);
          if(e.target.value.indexOf('+')>-1){
            pasteResult.css({'color':'red'});
          }else{
            pasteResult.css({'color':'black'});
          }
        })
        console.log("吐咽评估表fill",waterResult,pasteResult);
      } catch (e) {
        console.log("吐咽评估表Errorfill",e);
      }

    } // form_swallowing



    //wid.document.querySelector("input[name$='eval_score']")
    console.log("initList",wid);
    wid.addCSS = function (cssText) {
        var style = wid.document.createElement('style'),  //创建一个style元素
            head = wid.document.head || wid.document.getElementsByTagName('head')[0]; //获取head元素
        style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
        if (style.styleSheet) { //IE
            var func = function () {
                try { //防止IE中stylesheet数量超过限制而发生错误
                    style.styleSheet.cssText = cssText;
                } catch (e) {

                }
            }
            //如果当前styleSheet还不能用，则放到异步中则行
            if (style.styleSheet.disabled) {
                setTimeout(func, 10);
            } else {
                func();
            }
        } else { //w3c
            //w3c浏览器中只要创建文本节点插入到style元素中就行了
            var textNode = wid.document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style); //把创建的style元素插入到head中
    }


    wid.formApp = new FormApp()



    // form app
    function FormApp() {
        var _this = this
        //控制按钮
        this.controlBtn = function () {
            let resulte = []
            if(jQuery("input[name='showPrint']").val() == 'true') {
                resulte.push('printClick')
            }
            if(jQuery("input[name='viewName']").val() == 'db' || jQuery("input[name='viewName']").val() == "") {
                resulte.push('signSave')
            }
            // if(jQuery("input[name='viewName']").val() == 'yb') {
            //     resulte.push('noTool')
            // }
            if(jQuery("input[name='viewName']").val() == 'zb') {
                resulte.push('shenheSign')
            }
            return resulte
        }
        //判断签名
        this.isZbView = function (password) {
            var viewName = jQuery("input[name='viewName']").val();
            if(viewName=='zb'){
             _this.agAdmin(password)
            }
            else{
                _this.agCharge(password)
            }
        }
        //设置责任护士的签名
        this.agCharge =function (password) {
            jQuery("input[name='createSign']").val(password)
        }
        //设置管理护士的签名
        this.agAdmin =function (password) {
            jQuery("input[name='auditSign']").val(password)
        }


        // 提交表单数据
        this.postForm = function(password, postData, successCallBack) {
            // _this.isZbView(password)
            // data: jQuery("#smartform").serialize()+ postData,
            // window.closeModalName()
            window.openPostForm()

            // console.log("patientId",window.app.$route.query.patientId,window.app.$route.query);
            // console.log("smartform wid",wid);
            // var serialize = wid.document.querySelector("#smartform")
            // console.log("smartform data",wid.document.querySelector("#smartform"),serialize + postData);
            // 表单病人基础数据

            var formTableData = {};
            var formCode = getFormCode(wid);
            let token = window.app.$getCookie('NURSING_USER').split('##')[1]

            console.log("postData",postData);
            console.log("pdata",pdata);
            console.log("window.app.$route.query",window.app.$route.query);

            // window.app.$route.query

            // formTableData['diags']="";
            let mappingKeys={
              'formCode':formCode,
              'patientId':pdata['patientId'],
              'visitId':pdata['visitId'],
              'name':pdata['name'],
              'sex':pdata['sex'],
              'age':pdata['age'],
              'deptCode':pdata['deptCode'],
              'bedLabel':pdata['bedLabel'],
              'inpNo':pdata['inpNo'],
              'wardCode':pdata['wardCode'],
              'App-Token-Nursing':"51e827c9-d80e-40a1-a95a-1edc257596e7",
              'Auth-Token-Nursing':token,
              'visitDate':moment().format('YYYY-MM-DD HH:mm:ss'),
            }

            for (var val in mappingKeys) {
              if (mappingKeys.hasOwnProperty(val)) {
                formTableData[val] = mappingKeys[val]
              }
            }

            // formTableData['formCode']=formCode;
            // formTableData['patientId']=pdata['patientId'];
            // formTableData['visitId']=pdata['visitId'];
            // formTableData['name']=pdata['name'];
            // formTableData['sex']=pdata['sex'];
            // formTableData['age']=pdata['age'];
            // formTableData['deptCode']=pdata['deptCode'];
            // formTableData['bedLabel']=pdata['bedLabel'];
            // formTableData['inpNo']=pdata['inpNo'];
            // formTableData['wardCode']=pdata['wardCode'];
            // formTableData['App-Token-Nursing']="51e827c9-d80e-40a1-a95a-1edc257596e7";
            // formTableData['Auth-Token-Nursing']=token;
            // formTableData['visitDate']=moment().format('YYYY-MM-DD HH:mm:ss');

            // if(postData[formCode+'_eval_date']===undefined){
              // formTableData[formCode+'_eval_date']=moment().format('YYYY-MM-DD HH:mm');
            // }

            console.log("formTableData",formTableData);

            // return;

            jQuery.ajax({
                // type: "post",
                // url: "/crNursing/api/form/save" + wid.location.search,
                // data: postData,
                method: 'post',
                url: '/crNursing/api/form/save?',
                data: qs.stringify(formTableData)+'&'+qs.stringify(postData),
                success: function (data) {
                    bus.$emit('refreshTree');
                    if (data.code == 200) {
                        console.log("-----success:",data);
                        // window.closePostForm();
                        if(password && data.data.reminder && data.data.reminder.indexOf('评')==-1){
                          data.data.reminder="签名成功"
                          password = ""
                        }
                        // 除了吞咽表 新建时都需要签名
                        // if(formCode && formCode.indexOf('form_swallowing')==-1 && !postData['id']){
                        //   // window.saveAndSign(data.data.reminder, data.data)
                        //   postData['id'] = data.data.id;
                        //   // wid.formApp.postForm(password, postData, successCallBack)
                        // } else{
                        //   window.successPostForm(data.data.reminder, data.data)
                        // }
                        window.successPostForm(data.data.reminder, data.data)
                        if(successCallBack) {
                          successCallBack(data);
                        }
                    }
                    else if (data.code == 300) {
                        window.errosPostForm(data.desc)
                    }
                    else {
                        //todo 1.提示优化  2.错误码提示
                        window.errosPostForm(data.desc)
                    }
                }
            });// jquery post
          } // postForm

          //设置责任护士的签名
          this.agCharge = function (password) {
              jQuery("input[name='createSign']").val(password)
          }
          //设置管理护士的签名
          this.agAdmin = function (password) {
              jQuery("input[name='auditSign']").val(password)
          }
          //判断签名
          this.isZbView = function(password) {
              var status = jQuery("input[name='status']").val();
              if (status == '1') {
                  _this.agAdmin(password)
              }
              else {
                  _this.agCharge(password)
              }
          }

          this.printClick = function () {
              wid.print();
          }
      } // FormApp






   //
   //          \\\///
   //         / _  _ \
   //       (| (.)(.) |)
   // .---.OOOo--()--oOOO.---.
   // |                      |
   // |针对入院评估表作出特别修改|
   // |                      |
   // '---.oooO--------------'
   //      (   )   Oooo.
   //       \ (    (   )
   //        \_)    ) /
   //              (_/
   //

    let keyMap={
      'diagnosis':'ry_zd', // 入院诊断
      'temperature':'smtz_t', // 体温
      'pulse':'smtz_p', // 脉博P
      'heartRate':'smtz_p', // 心率HR
      'breathe':'smtz_r', // 呼吸频率是R
      'bloodPressure':'smtz_bp', // 血压是BP
      'height':'height', // 身高
      'weight':'weight', // 体重
      'bmi':'bmi', // 体征
      'nation':'nation', // 国籍
      'occupation':'occupation', // 工作
      'religion':'religion', // 宗教
      // 'admissionDate':'', // 入院日期
    };

    // 入院病人资料
    function todoLoadPatient(data,wid){
      // console.log("data:",item,pdata[item]);
      var itemname = "";
      for (var item in data) {
        if (data.hasOwnProperty(item)) {

          // mapping 入院病人资料API返回字段 与 入院表 字段 字典映射 填值
          let itemvalue = keyMap[item];
          if(itemvalue!=undefined && itemvalue!=null){
            itemname = formCode+"_"+itemvalue;
          }else{
            itemname = item;
          }
          // 入院日期
          if(item==='admissionDate'){
            // data[item] = moment(data[item]).format('YYYY-MM-DD');
            data[item] = moment(data[item]).format('YYYY-MM-DD HH:mm');
          }
          /*
          呼吸频率是R : breathe, 血压是BP : bloodPressure
          脉博P : pulse, 心率HR : heartRate
          血糖是BS , 血氧饱和度（SpO2）
          体温： temperature, 脉搏： pulse, 呼吸： breathe, 血压： bloodPressure, 心率： heartRate
          */
          jQuery("[name='"+itemname+"']",wid.document).each(function(e){
            if(this.tagName!=="INPUT"){
              this.innerHTML = data[item];
              return;
            }
            // if (this.type==="text"){
              this.value=data[item];
              // this.disabled = true;
              // }
          });
        }
      }
    }

    // loadScore 入院评估得分 patientId,visitId,codes
    let codes = [
      "form_selfcare",  //自理能力评估单
      "form_pain_assessment",  //疼 痛 护 理 单
      "form_pressure_risk",    //Braden压疮风险护理单
      "form_fall",             //跌倒护理单
      "form_dvt_pte", //下肢深静脉血栓形成（DVT）及肺栓塞（PTE)风险护理单
      "form_swallowing",       //吞咽评估单
    ];

    // 入院评估得分
    function todoLoadScore(data,wid){
      let pdata = []
      // console.log("疼 痛 护 理 单:",codes[1],data[codes[1]]);
      for (var i in codes) {
        if (codes.hasOwnProperty(i) && data !=null) {
          // console.log("--:",codes[i],data[codes[i]]);
          if(data[codes[i]]!==null){
            pdata[codes[i]+"_eval_score"] = data[codes[i]]["EVAL_SCORE"]
          }
        }
      }
      // 入院表内 入院评估得分 回填
      // callbackPainAssessment(pdata)
      callbackSelfcareAssessment(pdata)
      callbackPressureRiskAssessment(pdata)
      callbackDVTAssessment(pdata)
      callbackSwallowingAssessment(pdata)
      callbackFallAssessment(pdata)
    }

    // 入院评估项
    function todoLoadEval(formCode,data,wid){

      // form_pain_assessment 回填 疼痛评估表 第一次记录数据
      if(formCode === 'form_pain_assessment'){
        if(data===null){
          jQuery("[name*='tt_option'][value*='无']",wid.document).prop("checked", "checked");
          return
        }
        console.log("入院评估项:疼痛评估表_第一次记录数据",'form_pain_assessment',data);
        jQuery('[name="form_internal_first_ttpf"]',wid.document).val(data['EVAL_SCORE'])
        jQuery("[name*='ttpglbxz'][value*='启用疼痛护理单']",wid.document).prop("checked", "checked")
        // 部位  form_internal_first_tt_explain
        jQuery('[name*="tt_explain"]',wid.document).val(data['BW'])
        jQuery(`[name*="ttpglbxz"][value*=${data['TTPGB_OPTION'].substring(0,2)}]`,wid.document).prop("checked", "checked")
        // jQuery(`[name*="ttpglbxz"]`, wid.document).prop("disabled", "true")
        jQuery("[name*='tt_option'][value*='有']",wid.document).prop("checked", "checked")
        jQuery("[name*='tt_option'][value*='无']",wid.document).prop("checked", "");
        if(data['RYSTTQK'] && data['RYSTTQK'].indexOf('持续')>-1){
          jQuery("[name*='tttd'][value*='持续']",wid.document).prop("checked", "checked")
        }else if(data['RYSTTQK'] && data['RYSTTQK'].indexOf('无')===-1){
          jQuery("[name*='tttd'][value*='间歇']",wid.document).prop("checked", "checked")
        }
      }

      // form_swallowing 回填 吞咽评估单 第一次记录数据
      if(formCode === 'form_swallowing') {
        if(data===null){
          jQuery("[name$='tykn_option'][value*='无']",wid.document).prop("checked", "checked");
          jQuery("[name$='tykn_option'][value*='有']",wid.document).prop("checked", "");
          return;
        }
        console.log("入院评估项:吞咽评估单_第一次记录数据", "form_swallowing", data);
        let has = false;
        if(data['SWALLOW_WATER_RESULT'] && data['SWALLOW_WATER_RESULT'].indexOf('+')>-1){
          jQuery("[name$='tykn_ts_option'][value*='阳性']",wid.document).prop("checked", "checked");
          has = true;
        }
        if(data['SWALLOW_WATER_RESULT'] && data['SWALLOW_WATER_RESULT'].indexOf('-')>-1){
          jQuery("[name$='tykn_ts_option'][value*='阴性']",wid.document).prop("checked", "checked");
          // has = false;
        }
        if(data['SWALLOW_PASTE_RESULT'] && data['SWALLOW_PASTE_RESULT'].indexOf('+')>-1){
          jQuery("[name$='tykn_th_option'][value*='阳性']",wid.document).prop("checked", "checked");
          has = true;
        }
        if(data['SWALLOW_PASTE_RESULT'] && data['SWALLOW_PASTE_RESULT'].indexOf('-')>-1){
          jQuery("[name$='tykn_th_option'][value*='阴性']",wid.document).prop("checked", "checked");
          // has = false;
        }
        if(has){
          jQuery("[name$='tykn_option'][value*='有']",wid.document).prop("checked", "checked");
          jQuery("[name$='tykn_option'][value*='启用']",wid.document).prop("checked", "checked");
          jQuery("[name$='tykn_option'][value*='无']",wid.document).prop("checked", "");
        }else{
          jQuery("[name$='tykn_option'][value*='有']",wid.document).prop("checked", "");
          jQuery("[name$='tykn_option'][value*='无']",wid.document).prop("checked", "checked");
        }
      }
    }





   //  _____________________________
   // /\                            \
   // \_|                           |
   //   |  针对 入院评估表 作出特别修改 |
   //   |                           |
   //   |  _________________________|
   //   \_/_________________________/
   //

   /********************************/
   /*                             */
   /*  针对 入院评估表 作出特别修改   */
   /*                             */
   /*******************************/


     /**
      * 针对 入院评估表 作出特别修改  formCode getFormCode(wid)
      */
  // if (formCode==="form_internal_first") {
  if (formCode.indexOf("first") > -1) {
    let token = window.app.$getCookie("NURSING_USER").split("##")[1];
    let query = window.app.$route.query;
    console.log("针对入院评估表作出特别修改", token, query);

    // loadPatient 入院病人资料  ---------- 1
    console.log("入院病人资料first:", query.patientInfo);
    if(query.patientInfo){
      todoLoadPatient(query.patientInfo, wid);
    }

    try {
      // 从 HIS 获取 体征数据  入院病人资料 入院评估得分 入院评估项 等
      Promise.all([evalDetail(query.id)]).then(res => {
        // commonData.loadPatient(query.patientId, query.visitId),
        // commonData.loadScore(query.patientId, query.visitId, codes),
        // commonData.loadEval('form_pain_assessment', query.patientId, query.visitId),
        // commonData.loadEval('form_swallowing', query.patientId, query.visitId),
        console.log("Promise.all_HIS:", res);
        if (res[0]) {
          formFill.fill(res[0].data.data, wid);
          console.log("-----assessmetIframe", query.assessmetIframe);
          query.assessmetIframe.style.height = "auto";
          query.assessmetIframe.style.height = wid.document.body.scrollHeight * 1.05 + "px";
          // wid.updateIframeUI(res[0].data.data.status)
          query["formStatus"] = res[0].data.data.status;

          bus.$emit("setAssessmentLoadingStatus", false);

          bus.$emit("initAssessmentTool", {
            tool: {
              formCode: query.info.formCode,
              canEdit: query.info.canEdit,
              status: res[0].data.data.status
            },
            creator: query.info.creator,
            listPrint: query.info.listPrint
          });
        }
        // loadPatient 入院病人资料  ---------- 1
        // console.log("入院病人资料:", res[1]);
        // todoLoadPatient(res[1].data.data, wid);
        // loadScore 入院评估得分 ---------- 2
        // console.log("入院评估得分:", res[1]);
        // todoLoadScore(res[1].data.data, wid);
        // loadEval 疼痛评估表 第一次记录数据   ---------- 3
        // console.log("入院评估项:疼痛评估表", 'form_pain_assessment', res[2]);
        // todoLoadEval('form_pain_assessment', res[2].data.data, wid)
        // loadEval 吞咽评估单 第一次记录数据     ---------- 4
        // console.log("入院评估项:吞咽评估单", 'form_swallowing', res[3]);
        // todoLoadEval('form_swallowing', res[3].data.data, wid)
      });
    } catch (error) {
      console.log("Promise.all_HIS:", error);
    }

    // // 从 HIS 获取 体征数据 等
    // // loadPatient  入院病人资料  ---------- 1
    // commonData.loadPatient(query.patientId,query.visitId).then(res=>{
    //   console.log("入院病人资料:",res);
    //   let data = res.data.data;
    //   todoLoadPatient(data,wid);
    // })
    //
    // //      ---------- 2
    // commonData.loadScore(query.patientId,query.visitId,codes).then(res=>{
    //   console.log("入院评估得分:",res);
    //   let data = res.data.data
    //   todoLoadScore(data,wid);
    // })
    //
    // //入院评估项
    // // 疼痛评估表 第一次记录数据   ---------- 3
    // commonData.loadEval('form_pain_assessment',query.patientId,query.visitId).then(res=>{
    //   console.log("入院评估项:疼痛评估表",'form_pain_assessment',res);
    //   // form_internal_first_tttd  RYSTTQK
    //   // try {
    //     let data = res.data.data
    //     todoLoadEval('form_pain_assessment',data,wid)
    //   // } catch (e) {
    //
    //   // }
    // })
    //
    // // 吞咽评估单 第一次记录数据     ---------- 4
    // commonData.loadEval('form_swallowing',query.patientId,query.visitId).then(res=>{
    //   console.log("入院评估项:吞咽评估单",'form_swallowing',res);
    //   let data = res.data.data
    //   todoLoadEval('form_swallowing',data,wid)
    // })

    // 打开疼痛评估表  tt_option
    // jQuery("[name$='_p2_tton'][value*='有']").click(() => {
    // form_internal_first_tt_option

    // let painAssessmentOpen = jQuery("[name$='tt_option'][value*='有']",wid.document);

    // form_internal_first_zlnlpg_option 启用自理能力评估单
    // let selfcareAssessmentOpen = jQuery("[name$='zlnlpg_option'][value*='启用自理能力评估单']",wid.document);

    // 启用疼痛护理单
    openAssessmentsBox(jQuery("[name$='tt_option'][value*='有']", wid.document), "form_pain_assessment", callbackPainAssessment);

    // 启用疼痛护理单
    openAssessmentsBox(jQuery("[name$='pain_id']", wid.document), "form_pain_assessment", callbackPainAssessment);

    // 自理评估表开启并回填
    openAssessmentsBox(jQuery("[name$='selfcare_id']", wid.document), "form_selfcare", callbackSelfcareAssessment);

    // 启用压疮风险评估单  form_internal_first_ycfxpf_explain form_pressure_risk
    openAssessmentsBox(jQuery("[name$='pressure_id']", wid.document), "form_pressure_risk", callbackPressureRiskAssessment);

    // 启用DVT及PTE风险评估单 form_internal_first_dvt_or_pte_option  form_dvt_pte
    openAssessmentsBox(jQuery("[name$='dvt_id']", wid.document), "form_dvt_pte", callbackDVTAssessment);

    openAssessmentsBox(jQuery("[name$='vte_id']", wid.document), "form_caprini", callbackVTEAssessment);

    // 启用吞咽评估单 form_internal_first_tykn_option    form_swallowing
    openAssessmentsBox(jQuery("[name$='swallowing_id']", wid.document), "form_swallowing", callbackSwallowingAssessment);

    // 启用跌倒护理单 form_internal_first_ddfxpg_option  form_fall
    openAssessmentsBox(jQuery("[name$='fall_id']", wid.document), "form_fall", callbackFallAssessment);

    /*
.===|__|          .===|__|          .===|__|          .===|__|
||                ||                ||                ||
||                ||                ||                ||
||                ||                ||                ||
||                ||                ||                ||
[]                []                []                []
[]                []                []                []
[]                []                []                []
        _  _            _  _            _  _            _  _
     __//  |___.     __//  |___.     __//  |___.     __//  |___.
    |'_ '--' _ |    |'_ '--' _ |    |'_ '--' _ |    |'_ '--' _ |
    `(_)----(_)'=   `(_)----(_)'=   `(_)----(_)'=   `(_)----(_)'=
*/

    return;

    //  // 打开GCS
    //  jQuery("[name$='_p5_yson'][value='障碍']").click(() => {
    //     let formCode = 'form_gcs'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //         let data = qs.parse(form)
    //         wid.jQuery('[name$="_p5_ysdf"]').val(data['form_gcs_eval_score'])
    //         if(data['form_gcs_eval_desc'] == '轻度昏迷') {
    //             wid.jQuery(`[name$="_p5_ysza"][value="浅昏迷"]`).prop("checked", "checked")
    //         }
    //         else if(data['form_gcs_eval_desc'] == '中度昏迷') {
    //             wid.jQuery(`[name$="_p5_ysza"][value="中昏迷"]`).prop("checked", "checked")
    //         }
    //         else if(data['form_gcs_eval_desc'] == '重度昏迷') {
    //             wid.jQuery(`[name$="_p5_ysza"][value="深昏迷"]`).prop("checked", "checked")
    //         }
    //     })
    // })
    //
    //   // 打开营养
    //   jQuery("[name$='_p7_yyon'][value='异常']").click(() => {
    //     let formCode = 'form_yingyang'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //     })
    // })
    //
    //   // 打开尿垫
    //   jQuery("[title='form_niaodian']").click(() => {
    //     let formCode = 'form_niaodian'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p8_ndln"]').val(data['form_niaodian_eval_score'])
    //       wid.jQuery(`[name$="_p8_ndon"][value=${data['form_niaodian_eval_desc']}]`).prop("checked", "checked")
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // 打开压疮
    //   jQuery("[name$='_p9_wzxon'][value='压疮']").click(() => {
    //     let formCode = 'form_yachuang'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       console.log(data)
    //       wid.jQuery('[name$="_p9_wzxycw1"]').val(data['form_yachuang_sk_part1'])
    //       wid.jQuery('[name$="_p9_wzxycx1"]').val(data['form_yachuang_sk_area_x1'])
    //       wid.jQuery('[name$="_p9_wzxycy1"]').val(data['form_yachuang_sk_area_y1'])
    //
    //       wid.jQuery('[name$="_p9_wzxycw2"]').val(data['form_yachuang_sk_part2'])
    //       wid.jQuery('[name$="_p9_wzxycx2"]').val(data['form_yachuang_sk_area_x2'])
    //       wid.jQuery('[name$="_p9_wzxycy2"]').val(data['form_yachuang_sk_area_y2'])
    //
    //       wid.jQuery('[name$="_p9_wzxycw3"]').val(data['form_yachuang_sk_part3'])
    //       wid.jQuery('[name$="_p9_wzxycx3"]').val(data['form_yachuang_sk_area_x3'])
    //       wid.jQuery('[name$="_p9_wzxycy3"]').val(data['form_yachuang_sk_area_y3'])
    //
    //
    //       wid.jQuery(`[name$="_p9_wzxyclc"][value=${data['form_yachuang_lc_stage']}]`).prop("checked", "checked")
    //       wid.jQuery(`[name$="_p9_wzxycsc"][value=${data['form_yachuang_ccy_with']}]`).prop("checked", "checked")
    //
    //       wid.jQuery('[name$="_p9_wzxycys"]').val(data['form_yachuang_ccy_color'])
    //       wid.jQuery('[name$="_p9_wzxycqw"]').val(data['form_yachuang_ccy_odour'])
    //       wid.jQuery('[name$="_p9_wzxycli"]').val(data['form_yachuang_ccy_amount'])
    //
    //       wid.jQuery(`[name$="_p9_wzxycgr"][value=${data['form_yachuang_skgy_with']}]`).prop("checked", "checked")
    //       wid.jQuery(`[name$="_p9_wzxychs"][value=${data['form_yachuang_zzhs_with']}]`).prop("checked", "checked")
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // 打开barthel
    //   jQuery("[title='form_barthel']").click(() => {
    //     let formCode = 'form_barthel'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p10_zszf"]').val(data['form_barthel_eval_score'])
    //       let score = Number(data['form_barthel_eval_score'])
    //       console.log(score)
    //       if(score<= 40) {
    //         wid.jQuery(`[name$="_p10_zlcd"][value='重度依赖']`).prop("checked", "checked")
    //         wid.jQuery(`[name$="_p10_zgcd"][value='全部需他人照顾']`).prop("checked", "checked")
    //       }
    //       else if(41 < score && score <= 60) {
    //         wid.jQuery(`[name$="_p10_zlcd"][value='中度依赖']`).prop("checked", "checked")
    //         wid.jQuery(`[name$="_p10_zgcd"][value='大部分需他人照顾']`).prop("checked", "checked")
    //       }
    //       else if(61 < score && score <= 99) {
    //         wid.jQuery(`[name$="_p10_zlcd"][value='轻度依赖']`).prop("checked", "checked")
    //         wid.jQuery(`[name$="_p10_zgcd"][value='少部分需他人照顾']`).prop("checked", "checked")
    //       }
    //       else if(score == 100) {
    //         wid.jQuery(`[name$="_p10_zlcd"][value='无需依赖']`).prop("checked", "checked")
    //         wid.jQuery(`[name$="_p10_zgcd"][value='无需他人照顾']`).prop("checked", "checked")
    //       }
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // 打开mmse
    //   jQuery('[title="form_mmse"]').click(() => {
    //     let formCode = 'form_mmse'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p12_rznl"]').val(data['form_mmse_eval_score'])
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // 打开sas
    //   jQuery('[title="form_sas"]').click(() => {
    //     let formCode = 'form_sas'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p12_jlsp"]').val(data['form_sas_eval_score'])
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // 打开sds
    //   jQuery('[title="form_sds"]').click(() => {
    //     let formCode = 'form_sds'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p12_yysp"]').val(data['form_sds_eval_score'])
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // 打开smilkstein
    //   jQuery('[title="form_smilkstein"]').click(() => {
    //     let formCode = 'form_smilkstein'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p12_jthj"]').val(data['form_smilkstein_eval_score'])
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // 打开form_procidano
    //   jQuery('[title="form_procidano"]').click(() => {
    //     let formCode = 'form_procidano'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p12_jtzc"]').val(data['form_procidano_eval_score'])
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // form_braden
    //   jQuery('[title="form_braden"]').click(() => {
    //     let formCode = 'form_braden'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p14_ycdf"]').val(data['form_braden_eval_score'])
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // form_braden
    //   jQuery('[title="form_braden"]').click(() => {
    //     let formCode = 'form_braden'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p14_ycdf"]').val(data['form_braden_eval_score'])
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})
    //
    //   // form_morse
    //   jQuery('[title="form_morse"]').click(() => {
    //     let formCode = 'form_morse'
    //     let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
    //     window.openFormBoxClean(url, (form) => {
    //       let data = qs.parse(form)
    //       wid.jQuery('[name$="_p14_dddf"]').val(data['form_morse_eval_score'])
    //     })
    // })
    // .css({cursor: 'pointer', 'text-decoration': 'underline', 'color': 'blue'})

    // 计算BMI
    function getBmi() {
      let sg = jQuery('[name$="_p7_tzsg"]').val();
      let tz = jQuery('[name$="_p7_tztz"]').val();
      let sb = jQuery('[name$="_p7_tzsb"]').val();
      let xt = jQuery('[name$="_p7_tzxt"]').val();
      let result = "";
      if (sg && tz && sb && xt) {
        result = 14.42 - 14.63 * sg + 0.61 * sb + 0.46 * xt;
        jQuery('[name$="_p7_tzbmi"]').val(result.toFixed(2));
      } else if (sg && tz) {
        result = tz / (sg * sg);
        jQuery('[name$="_p7_tzbmi"]').val(result.toFixed(2));
      }
    }
    jQuery('[name$="_p7_tzsg"]').change(getBmi);
    jQuery('[name$="_p7_tztz"]').change(getBmi);
    jQuery('[name$="_p7_tzsb"]').change(getBmi);
    jQuery('[name$="_p7_tzxt"]').change(getBmi);

    // 过敏控制
    jQuery("[name$='_p3_gmon'][value='有']").click(() => {
      jQuery('[name$="_p3_gmysw"]').css({ color: "red" });
      jQuery('[name$="_p3_gmyyw"]').css({ color: "red" });
      jQuery('[name$="_p3_gmyqt"]').css({ color: "red" });
      jQuery('[name$="_p3_gmyon"]').attr("disabled", false);
      jQuery('[name$="_p3_gmyon"]:checked')
        .click()
        .click();
    });
    jQuery("[name$='_p3_gmon'][value='无']").click(() => {
      jQuery('[name$="_p3_gmysw"]')
        .css({ color: "#666" })
        .attr("disabled", true);
      jQuery('[name$="_p3_gmyyw"]')
        .css({ color: "#666" })
        .attr("disabled", true);
      jQuery('[name$="_p3_gmyqt"]')
        .css({ color: "#666" })
        .attr("disabled", true);
      jQuery('[name$="_p3_gmyon"]').attr("disabled", true);
    });
  }





  // 打开各类评估表
  function openAssessmentsBox(buttonItem, formCode, callback) {



    //  let formName = buttonItem.val();
    //  formName = formName.replace('启用', '')
    buttonItem.on("click",function(e) {
      console.log("打开各类评估表", buttonItem, e,wid.formInfo);
      let token = window.app
        .$getCookie("NURSING_USER")
        .split("##")[1];
      let query = window.app.$route.query;
      let tokens = `App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`

      // 入院表formCode
      var formCodeSource =  getFormCode(wid)||"";
      // var rawData = wid.getRawData()
      // var formData = rawData.formData;
      // var form_ids_callback = formData[formCodeSource + "_form_ids_callback"];
      // var form_ids = []
      var form_id = e.target.value||""
      console.log("打开各类评估表openAssessmentsBox",buttonItem);
      // if (form_ids_callback) {
      //   //  form_ids = form_ids_callback.split(',');
      //   form_ids_callback.map(item => {
      //     if (item.split(":")[0] === formCode) {
      //       form_id = item.split(":")[1];
      //       return;
      //     }
      //   });
      // }

      if (buttonItem[0] && buttonItem[0].checked) {
        let id = undefined
        try {
          id = parseInt(form_id);
          console.log("!!!!!+++id", id);
        } catch (error) {

        }

        // let query = this.$route.query
        let queryObj = {
          id: id || '',
          formCode: wid.formInfo.formCode||'',
          patientId: query.patientId,
          visitId: query.visitId,
          name: query.name,
          sex: query.sex,
          age: query.age,
          deptCode: query.deptCode,
          deptName: query.deptName,
          diagnosis: query.diagnosis,
          bedLabel: query.bedLabel,
          inpNo: query.inpNo,
          wardCode: query.wardCode,
          wardName: query.wardName,
          admissionDate: query.admissionDate,
          token: token,
          // todo: this.info.todo,
          // title:this.info.title || ''
        }

        // 旧表单
        // let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`;
        let url = ''

        // if (this.isDev) {
        //   url = `${devFormUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`
        //   this.urlForm = `${formUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`
        // }else{

        // }
        console.log(formUrl,"....打开表单", url);

        let pageUrlMap = {
          "form_caprini": "VTE风险评估量表(手术科室).html",
          "form_padua": "VTE风险评估量表(非手术科室).html",
          "form_pain_assessment":"疼痛护理单.html",
          "form_selfcare":"自理能力护理单.html",
          "form_pressure_risk":"Braden压疮风险护理单.html",
          "form_fall":"跌倒护理单.html",
          "form_swallowing":"吞咽护理单.html"
          }

        let pageUrl = pageUrlMap[formCode];//"VTE风险评估量表(手术科室).html";

        url = `${formUrl}/${pageUrl}?${qs.stringify(queryObj)}`



        if (wid.formInfo && (wid.formInfo.nooForm === "1") ) {
        // 新表单
        if (pageUrl) {
          //
          let box = {
            title:"VTE风险评估单",
            templates:[{name:"VTE风险评估单(非手术科室)",formCode:"form_padua",formType: 'eval',nooForm: '1',pageUrl: "VTE风险评估量表(非手术科室).html"},{name:"VTE风险评估单(手术科室)",formCode: 'form_caprini',formType: 'eval',nooForm: '1',pageUrl: "VTE风险评估量表(手术科室).html"}],
            callback:callback,
          };

          if(iframeClassName==='iframe-form-con'){
            // bus.$emit("openNewFormBox",box);
            bus.$emit("openNewFormBoxModal",box);
            // window.openNewFormBoxModal(box)
            return
          }
          else{
            bus.$emit("openNewFormBox",box);
            // bus.$emit("openNewFormBoxModal",box);
            // window.openNewFormBoxModal(box)
          }
          //
          return;
          // if (wid.formInfo && wid.formInfo.nooForm === "1") {
            // /crNursing/formUrl/VTE风险评估量表(手术科室).html
            // localhost:8088/VTE风险评估量表(手术科室).html?id=1550&formCode=form_caprini&patientId=0989826&visitId=1&name=%E9%99%88%E6%9C%89%E6%A2%85&sex=%E5%A5%B3&age=73%E5%B2%81&deptCode=3007&bedLabel=5&inpNo=P111902&wardCode=4003&wardName=%E6%99%AE%E5%A4%96%E6%8A%A4%E7%90%86%E5%8D%95%E5%85%83&admissionDate=2015-09-21%2015%3A25%3A32&token=App-Token-Nursing%3D51e827c9-d80e-40a1-a95a-1edc257596e7%26Auth-Token-Nursing%3D70212136-20cc-4cd0-8b25-4078e97cd687
            // /form/list/form_caprini/0989826/1
            //  let query = this.$route.query
            let queryObj = { id: id || "", formCode: formCode, patientId: query.patientId, visitId: query.visitId, name: query.name, sex: query.sex, age: query.age, deptCode: query.deptCode, bedLabel: query.bedLabel, inpNo: query.inpNo, wardCode: query.wardCode, wardName: query.wardName, admissionDate: query.admissionDate, token: tokens };

            console.log('-==URL:',qs.stringify(queryObj))

            if (process.env.NODE_ENV === "development") {
              // url = `${devFormUrl}/${this.info.pageUrl + '.html'}?${qs.stringify(queryObj)}`
              // 后台传回补了 '.html'
              url = `${devFormUrl}/${pageUrl}?${qs.stringify(queryObj)}`;
            } else {
              url = `${formUrl}/${pageUrl}?${qs.stringify(queryObj)}`;
            }
          }
        }
        try {

          if (id && !isNaN(id)) {
            window.openFormBoxClean(url + "&editForm=true&openFormId=" + id, callback);
          } else {
            window.openFormBoxClean(url, callback);
          }
        } catch (error) {
          //
          window.openFormBoxClean(url, callback);
        }
      }
    });
  } //



     // let codes = [
     //   "form_selfcare",  //自理能力评估单
     //   "form_pain_assessment",  //疼 痛 护 理 单
     //   "form_pressure_risk",    //Braden压疮风险护理单
     //   "form_fall",             //跌倒护理单
     //   "form_dvt_pte", //下肢深静脉血栓形成（DVT）及肺栓塞（PTE)风险护理单
     //   "form_swallowing",       //吞咽评估单
     // ];

     function callbackPainAssessment(data,callbackData) {
       // let data = form;//qs.parse(form)
       let formCode = 'form_pain_assessment';
       let evalscore = 0;
       console.log("回填数据", data, callbackData);
       if(data[formCode+'_eval_score']===undefined){return;}
       console.log("eval_score",data);

       jQuery("[name$='pain_id']", wid.document).val(callbackData.data.id)


       jQuery(`[name*="ttpglbxz"]`, wid.document).prop("checked", "");
       // 疼痛评分
       jQuery('[name="form_internal_first_ttpf"]',wid.document).val(data['form_pain_assessment_eval_score'])
       jQuery("[name*='ttpglbxz'][value*='启用疼痛护理单']",wid.document).prop("checked", "checked")
       // 部位  form_internal_first_tt_explain
       jQuery('[name*="tt_explain"]',wid.document).val(data['form_pain_assessment_bw'])
       jQuery(`[name*="ttpglbxz"][value*=${data['form_pain_assessment_ttpgb_option'].substring(0,2)}]`,wid.document).prop("checked", "checked")
      //  jQuery(`[name*="ttpglbxz"]`, wid.document).prop("disabled", "true");
       jQuery("[name$='ttpglbxz'][value*='启用疼痛护理单']", wid.document).prop("disabled", "");
       jQuery("[name*='tt_option'][value*='有']",wid.document).prop("checked", "checked")
       jQuery("[name*='tt_option'][value*='无']",wid.document).prop("checked", "")
       // wid.jQuery(`[name$="_p2_ttxz"][value=${data['form_pain_assessment_xz_option']}]`).prop("checked", "checked")
       // wid.jQuery('[name$="_p2_ttxzqt"]').val(data['form_pain_assessment_xz_other'])
     }



  function callbackSelfcareAssessment(data, callbackData){ //form_selfcare
           // form_internal_first_zlnlpg_option  form_selfcare
           // 完全依赖（0-20分）  严重依赖（20-40分）  明显依赖（40-60分）基本自理（＞60分）
           let evalscore = 0;
           let formCode = 'form_selfcare';
           try {
             if(data[formCode+'_eval_score']===undefined){return;}

             jQuery("[name$='selfcare_id']", wid.document).val(callbackData.data.id);

             evalscore = parseInt(data[formCode+'_eval_score']);
             jQuery(`[name*="zlnlpg_option"]`, wid.document).prop("checked", "");
             if(evalscore<20){
               jQuery("[name$='zlnlpg_option'][value*='完全依赖']",wid.document).prop("checked", "checked");
             }else if(evalscore>=20 && evalscore<40){
               jQuery("[name$='zlnlpg_option'][value*='严重依赖']",wid.document).prop("checked", "checked");
             }else if(evalscore>=40 && evalscore<60){
               jQuery("[name$='zlnlpg_option'][value*='明显依赖']",wid.document).prop("checked", "checked");
             }else {
               jQuery("[name$='zlnlpg_option'][value*='基本自理']",wid.document).prop("checked", "checked");
             }
            //  jQuery(`[name*="zlnlpg_option"]`, wid.document).prop("disabled", "true");
             jQuery("[name$='zlnlpg_option'][value*='启用自理能力评估单']",wid.document).prop("checked", "checked");
             jQuery("[name$='zlnlpg_option'][value*='启用自理能力评估单']", wid.document).prop("disabled", "");
            //  jQuery(`[name*="zlnlpg_option"]`, wid.document).prop("disabled", "true");
           } catch (e) {
             console.log("ERROR:callbackSelfcareAssessment",e)
           }
    console.log("callbackSelfcareAssessment", evalscore, data, callbackData);
     }

     // 压舱
  function callbackPressureRiskAssessment(data, callbackData){
       // form_internal_first_ycfxpf_explain 选项
       // form_internal_first_ycfxpf_option 无有
       // form_internal_first_ycfxpf 得分
       /*
     15-18分（轻度危险）  13-14分（中度危险）  10-12分（高度危险） ＜9分（极度危险）  启用压疮风险评估单
       */
       let evalscore = 0;
       let formCode = 'form_pressure_risk';
       try {
         if(data[formCode+'_eval_score']===undefined){return;}

         jQuery("[name$='pressure_id']", wid.document).val(callbackData.data.id);

         evalscore = parseInt(data[formCode+'_eval_score']);
         jQuery("[name$='ycfxpf_explain']", wid.document).prop("checked", "");
         if(evalscore<9){
           jQuery("[name$='ycfxpf_explain'][value*='极度危险']",wid.document).prop("checked", "checked");
         }else if(evalscore>9 && evalscore<12){
           jQuery("[name$='ycfxpf_explain'][value*='高度危险']",wid.document).prop("checked", "checked");
         }else if(evalscore>=13 && evalscore<14){
           jQuery("[name$='ycfxpf_explain'][value*='中度危险']",wid.document).prop("checked", "checked");
         }else {
           jQuery("[name$='ycfxpf_explain'][value*='轻度危险']",wid.document).prop("checked", "checked");
         }
        //  jQuery("[name$='ycfxpf_explain']", wid.document).prop("disabled", "true");
         jQuery("[name$='ycfxpf_explain'][value*='启用压疮风险评估单']",wid.document).prop("checked", "checked");
         jQuery("[name$='ycfxpf_explain'][value*='启用压疮风险评估单']", wid.document).prop("disabled", "");
         jQuery("[name$='ycfxpf_option'][value*='有']",wid.document).prop("checked", "checked");
         jQuery("[name$='ycfxpf']",wid.document).prop("value", evalscore);
       } catch (e) {
         console.log("ERROR:callbackPressureRiskAssessment",e)
       }
    console.log("callbackPressureRiskAssessment", evalscore, data, callbackData);
     }


  // VTE
  function callbackVTEAssessment(res) {
    console.log("VTE表返回数据：", res);
    let data = res.data.data
    let evalscore = 0;
    let formCode = data.formCode;
    // 入院表formCode
    var formCodeSource = getFormCode(wid) || "";//wid.formInfo.formCode;

    try {
      if (!data.evalScoreAndUnit) {
        return
      }
      evalscore = parseInt(data.evalScoreAndUnit);

      // wid.setFormData(formCodeSource + "_vte_score", evalscore);
      // jQuery("[name$='vte_score']", wid.document).prop("value", evalscore);
      // jQuery("[name$='vte_score']", wid.document).html(evalscore);
      jQuery("[name='"+formCodeSource+"_vte_score']", wid.document).html(evalscore);

      jQuery("[name$='vte_id']", wid.document).val(data.id);
      // wid.setFormData(formCodeSource + "_form_ids_callback", formCode + ':' + data.id, "object", true);

      //  data.formCode "form_padua"  手术科室 form_caprini

      jQuery("[name$='vte_option'][value*='风险']", wid.document).prop("checked", "");

      // vte_score  form_caprini
      if( formCode ==='form_caprini'){
        if (evalscore <= 2) {
          jQuery("[name$='vte_option'][value*='低风险']", wid.document).prop("checked", "checked");
          //
          // wid.setFormData(formCodeSource + "_vte_option", "低风险(1-2分)", "object");
        } else if (evalscore >= 3 && evalscore < 5) {
          jQuery("[name$='vte_option'][value*='中风险']", wid.document).prop("checked", "checked");
          //
          // wid.setFormData(formCodeSource + "_vte_option", "中风险(3-4分)", "object");
        } else {
          jQuery("[name$='vte_option'][value*='高风险']", wid.document).prop("checked", "checked");
          //
          // wid.setFormData(formCodeSource + "_vte_option", "高风险(≥5分)", "object");
        }
      }

      // 非手术科室
      if( formCode ==='form_padua'){
        // <4分低风险
        if (evalscore <4) {
          jQuery("[name$='vte_option'][value*='低风险']", wid.document).prop("checked", "checked");
          //
          // wid.setFormData(formCodeSource + "_vte_option", "低风险(1-2分)", "object");
        // } else if (evalscore >= 3 && evalscore < 5) {
        //   jQuery("[name$='vte_option'][value*='中风险']", wid.document).prop("checked", "checked");
          //
          // wid.setFormData(formCodeSource + "_vte_option", "中风险(3-4分)", "object");
        } else {
          jQuery("[name$='vte_option'][value*='高风险']", wid.document).prop("checked", "checked");
          //
          // wid.setFormData(formCodeSource + "_vte_option", "高风险(≥5分)", "object");
        }
      }



    } catch (e) {
      console.log("ERROR:callbackVTEAssessment", e);
    }
    console.log("callbackVTEAssessment", res);


  }

     // DVT
  function callbackDVTAssessment(data, callbackData){
     /*
     form_internal_first_dvt_or_pte_score form_internal_first_dvt_or_pte_option
     分  低风险（≤10分）  中风险（11-14分） 高风险（≥15分）  启用DVT及PTE风险评估单
     */
     let evalscore = 0;
     let formCode = 'form_dvt_pte';
     try {
       if(data[formCode+'_eval_score']===undefined){return;}

       jQuery("[name$='dvt_id']", wid.document).val(callbackData.data.id);

       evalscore = parseInt(data[formCode+'_eval_score']);
       jQuery("[name$='dvt_or_pte_option']", wid.document).prop("checked", "");
       if(evalscore<=10){
         jQuery("[name$='dvt_or_pte_option'][value*='低风险']",wid.document).prop("checked", "checked");
       }else if(evalscore>=11 && evalscore<15){
         jQuery("[name$='dvt_or_pte_option'][value*='中风险']",wid.document).prop("checked", "checked");
       }else {
         jQuery("[name$='dvt_or_pte_option'][value*='高风险']",wid.document).prop("checked", "checked");
       }
      //  jQuery("[name$='dvt_or_pte_option']", wid.document).prop("disabled", "true");
       jQuery("[name$='dvt_or_pte_option'][value*='启用DVT及PTE风险评估单']",wid.document).prop("checked", "checked");
       jQuery("[name$='dvt_or_pte_option'][value*='启用DVT及PTE风险评估单']", wid.document).prop("disabled", "");
       // jQuery("[name$='ycfxpf_option'][value*='有']",wid.document).prop("checked", "checked");
       jQuery("[name$='dvt_or_pte_score']",wid.document).prop("value", evalscore);
     } catch (e) {
       console.log("ERROR:callbackDVTAssessment",e)
     }
    console.log("callbackDVTAssessment", evalscore, data, callbackData);
     }

     // 跌倒
  function callbackFallAssessment(data, callbackData){
     // ≥65岁  跌倒高风险（≥10分）  跌倒低风险（＜10分）  启用跌倒护理单
     // form_internal_first_ddfxpg_option
     let evalscore = 0;
     let age=0;
     let formCode = 'form_fall';
     try {
       if(data[formCode+'_eval_score']===undefined){return;}

       jQuery("[name$='fall_id']", wid.document).val(callbackData.data.id);

       evalscore = parseInt(data[formCode+'_eval_score']);
       age = parseInt(jQuery("[name$='age']",wid.document).val());
       jQuery("[name$='ddfxpg_option']", wid.document).prop("checked", "");
       if(evalscore<10){
         jQuery("[name$='ddfxpg_option'][value*='跌倒低风险']",wid.document).prop("checked", "checked");
       }else {
         jQuery("[name$='ddfxpg_option'][value*='跌倒高风险']",wid.document).prop("checked", "checked");
       }
      //  jQuery("[name$='ddfxpg_option']", wid.document).prop("disabled", "true");
       jQuery("[name$='ddfxpg_option'][value*='启用跌倒护理单']", wid.document).prop("checked", "checked");
       jQuery("[name$='ddfxpg_option'][value*='启用跌倒护理单']", wid.document).prop("disabled", "");

       // age
       if(age>=65){
         jQuery("[name$='ddfxpg_option'][value*='65岁']",wid.document).prop("checked", "checked");
       }

       // jQuery("[name$='ycfxpf_option'][value*='有']",wid.document).prop("checked", "checked");
       // jQuery("[name$='dvt_or_pte_score']",wid.document).prop("value", evalscore);
     } catch (e) {
       console.log("ERROR:callbackDVTAssessment",e)
     }
    console.log("callbackDVTAssessment", evalscore, data, callbackData);

     }

     // 吞咽评估单
  function callbackSwallowingAssessment(data, callbackData){
       // let evalscore = 0;
       // let age=0;
       // console.log("回填数据",data);
    console.log("回填数据callbackSwallowingAssessment", data, callbackData)
       let formCode = 'form_swallowing';
       // let data = res.data.data
       if(data===null || data.length==0){
         jQuery("[name$='tykn_option'][value*='无']",wid.document).prop("checked", "checked");
         jQuery("[name$='tykn_option'][value*='有']",wid.document).prop("checked", "");
         return
       }

    jQuery("[name$='swallowing_id']", wid.document).val(callbackData.data.id);

       // SWALLOW_WATER_RESULT   form_internal_first_tykn_ts_option
       // SWALLOW_PASTE_RESULT   form_internal_first_tykn_th_option
       // form_internal_first_tykn_option  data[formCode+'_eval_score']
       let has = false;
       jQuery("[name$='tykn_ts_option']", wid.document).prop("checked", "");
       jQuery("[name$='tykn_th_option']", wid.document).prop("checked", "");
       if(data['form_swallowing_swallow_water_result'].indexOf('+')>-1){
         jQuery("[name$='tykn_ts_option'][value*='阳性']",wid.document).prop("checked", "checked");
         has = true;
       }
       if(data['form_swallowing_swallow_water_result'].indexOf('-')>-1){
         jQuery("[name$='tykn_ts_option'][value*='阴性']",wid.document).prop("checked", "checked");
         // has = false;
       }
       if(data['form_swallowing_swallow_paste_result'].indexOf('+')>-1){
         jQuery("[name$='tykn_th_option'][value*='阳性']",wid.document).prop("checked", "checked");
         has = true;
       }
       if(data['form_swallowing_swallow_paste_result'].indexOf('-')>-1){
         jQuery("[name$='tykn_th_option'][value*='阴性']",wid.document).prop("checked", "checked");
         // has = false;
       }
      //  jQuery("[name$='tykn_ts_option']", wid.document).prop("disabled", "true");
      //  jQuery("[name$='tykn_th_option']", wid.document).prop("disabled", "true");
       jQuery("[name$='tykn_option'][value*='启用']", wid.document).prop("disabled", "");
       if(has){
         jQuery("[name$='tykn_option'][value*='有']",wid.document).prop("checked", "checked");
         jQuery("[name$='tykn_option'][value*='启用']",wid.document).prop("checked", "checked");
         jQuery("[name$='tykn_option'][value*='无']",wid.document).prop("checked", "");
       }else{
         jQuery("[name$='tykn_option'][value*='有']",wid.document).prop("checked", "");
         jQuery("[name$='tykn_option'][value*='无']",wid.document).prop("checked", "checked");
       }

     }







}// initList()
