import {host} from '@/api/apiConfig'
import commonData from '@/api/commonData' //入院HIS数据等
import {
  evalDetail
  // formPrintPage,
  // formInputPrint
} from "@/api/form_hj"

import {
  formUrl,
  devFormUrl
} from '@/common/pathConfig/index.js'

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

export function initNooForm(wid, pdata = window.app.$route.query) {
         // let $ = wid.jQuery
         var formCode = wid.formInfo.formCode;

        //  console.log("!!!!initNooForm",wid,pdata,formCode)

         var iframeClassName = wid.frameElement.className || '';

         /********************************/
         /*                             */
         /*  针对 入院评估表 作出特别修改   */
         /*                             */
         /*******************************/

         if (formCode.indexOf("first") > -1) {
          //  let token = window.app
          //    .$getCookie("NURSING_USER")
          //    .split("##")[1];
          //  let query = window.app.$route.query;
          //  console.log("针对入院评估表作出特别修改", token, query);
          //  console.log("入院病人资料:", query.patientInfo);

           // 配置启动其他关联表单
           openInsideBoxes(wid)

           return;

         }
}// initList()





         // 打开各类评估表
         function openAssessmentsBox(buttonItem, formCode, callback, wid) {

          // console.log("!!!绑定启动按钮",buttonItem, formCode, wid);

           //  let formName = buttonItem.val();
           //  formName = formName.replace('启用', '')
           buttonItem.click(e => {
             console.log("打开各类评估表", buttonItem, e);
             let token = window.app
               .$getCookie("NURSING_USER")
               .split("##")[1];
             let query = window.app.$route.query;
             let tokens = `App-Token-Nursing%3D51e827c9-d80e-40a1-a95a-1edc257596e7%26Auth-Token-Nursing%3D${token}`

             // 入院表formCode
             var formCodeSource = wid.formInfo.formCode;
             var rawData = wid.getRawData()
             var formData = rawData.formData;
             var form_ids_callback = formData[formCodeSource + "_form_ids_callback"];
             var form_ids = []
             var form_id = ""
             console.log("打开各类评估表openAssessmentsBox", form_ids_callback, formData, buttonItem);
             if (form_ids_callback) {
               //  form_ids = form_ids_callback.split(',');
               form_ids_callback.map(item => {
                 if (item.split(":")[0] === formCode) {
                   form_id = item.split(":")[1];
                   return;
                 }
               });
             }

             if (buttonItem[0] && buttonItem[0].checked) {
              let id = undefined
              try {
                id = parseInt(form_id);
                console.log("!!!!!+++id", id);
              } catch (error) {

              }

                // 旧表单
              //  let url = `${host}/crNursing/api/form/input/${formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`;

              // let query = this.$route.query
              // let queryObj = {
              //   id: id || '',
              //   formCode: wid.formInfo.formCode||'',
              //   patientId: query.patientId,
              //   visitId: query.visitId,
              //   name: query.name,
              //   sex: query.sex,
              //   age: query.age,
              //   deptCode: query.deptCode,
              //   deptName: query.deptName,
              //   diagnosis: query.diagnosis,
              //   bedLabel: query.bedLabel,
              //   inpNo: query.inpNo,
              //   wardCode: query.wardCode,
              //   wardName: query.wardName,
              //   admissionDate: query.admissionDate,
              //   token: token,
              //   // todo: this.info.todo,
              //   // title:this.info.title || ''
              // }

               let url = ''

               let queryObj = { id: id || "",
                formCode: formCode,
                patientId: query.patientId,
                visitId: query.visitId,
                name: query.name,
                sex: query.sex,
                age: query.age,
                deptCode: query.deptCode,
                bedLabel: query.bedLabel,
                inpNo: query.inpNo,
                wardCode: query.wardCode,
                wardName: query.wardName,
                admissionDate: query.admissionDate,
                token: tokens
              };

                 let pageUrlMap = {
                  "form_caprini": "VTE风险评估量表(手术科室).html",
                  "form_padua": "VTE风险评估量表(非手术科室).html",
                  "form_pain_assessment":"疼痛护理单.html",
                  "form_selfcare":"自理能力护理单.html",
                  "form_pressure_risk":"Braden压疮风险护理单.html",
                  "form_fall":"跌倒护理单.html",
                  "form_swallowing":"吞咽护理单.html"
                  }

                 let pageUrl = pageUrlMap[formCode]; //"VTE风险评估量表(手术科室).html";

              // if (this.isDev) {
              //   url = `${devFormUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`
              //   this.urlForm = `${formUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`
              // }else{
                url = `${formUrl}/${pageUrl}?${qs.stringify(queryObj)}`
              // }
              console.log(formUrl,"....打开表单", url, pageUrl, pageUrlMap);


              // 新表单
               if (wid.formInfo && (wid.formInfo.nooForm === "1") ) {
                 // /crNursing/formUrl/VTE风险评估量表(手术科室).html
                 // localhost:8088/VTE风险评估量表(手术科室).html?id=1550&formCode=form_caprini&patientId=0989826&visitId=1&name=%E9%99%88%E6%9C%89%E6%A2%85&sex=%E5%A5%B3&age=73%E5%B2%81&deptCode=3007&bedLabel=5&inpNo=P111902&wardCode=4003&wardName=%E6%99%AE%E5%A4%96%E6%8A%A4%E7%90%86%E5%8D%95%E5%85%83&admissionDate=2015-09-21%2015%3A25%3A32&token=App-Token-Nursing%3D51e827c9-d80e-40a1-a95a-1edc257596e7%26Auth-Token-Nursing%3D70212136-20cc-4cd0-8b25-4078e97cd687
                 // /form/list/form_caprini/0989826/1
                 //  let query = this.$route.query

                //  let queryObj = { id: id || "", formCode: formCode, patientId: query.patientId, visitId: query.visitId, name: query.name, sex: query.sex, age: query.age, deptCode: query.deptCode, bedLabel: query.bedLabel, inpNo: query.inpNo, wardCode: query.wardCode, wardName: query.wardName, admissionDate: query.admissionDate, token: tokens };

                //  let pageUrlMap = {
                //   "form_caprini": "VTE风险评估量表(手术科室).html",
                //   "form_padua": "VTE风险评估量表(非手术科室).html"
                //   }

                //  let pageUrl = pageUrlMap[formCode]; //"VTE风险评估量表(手术科室).html";

                 console.log('==URL:',qs.stringify(queryObj))

                 if (pageUrl && pageUrl.indexOf('VTE')>-1) {
                   //
                  let box = {
                    title:"VTE风险评估单",
                    templates:[{name:"VTE风险评估单(非手术科室)",formCode:"form_padua",formType: 'eval',nooForm: '1',pageUrl: "VTE风险评估量表(非手术科室).html"},{name:"VTE风险评估单(手术科室)",formCode: 'form_caprini',formType: 'eval',nooForm: '1',pageUrl: "VTE风险评估量表(手术科室).html"}],
                    callback:callback,
                  };

                  // if(iframeClassName==='iframe-form-con'){
                  //   // bus.$emit("openNewFormBox",box);
                  //   bus.$emit("openNewFormBoxClean",box);
                  //   // window.openNewFormBoxClean(box)
                  //   return
                  // }
                  // else{
                    bus.$emit("openNewFormBox",box);
                    // bus.$emit("openNewFormBoxClean",box);
                    // window.openNewFormBoxClean(box)
                  // }
                  //
                  return;

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
                 console.log("打开表单错误",error)
                 window.openFormBoxClean(url, callback);
               }
             }
           });
         } //







export function openInsideBoxes(wid){

          console.log("配置绑定启动按钮")

          // 启用疼痛护理单
          openAssessmentsBox(jQuery("[name$='tt_option'][value*='有']", wid.document), "form_pain_assessment", callbackPainAssessment,wid);

          // 启用疼痛护理单
          openAssessmentsBox(jQuery("[name$='pain_id']", wid.document), "form_pain_assessment", callbackPainAssessment,wid);

          // 自理评估表开启并回填
          openAssessmentsBox(jQuery("[name$='selfcare_id']", wid.document), "form_selfcare", callbackSelfcareAssessment,wid);

          // 启用压疮风险评估单  form_internal_first_ycfxpf_explain form_pressure_risk
          openAssessmentsBox(jQuery("[name$='pressure_id']", wid.document), "form_pressure_risk", callbackPressureRiskAssessment,wid);

          // 启用DVT及PTE风险评估单 form_internal_first_dvt_or_pte_option  form_dvt_pte
          openAssessmentsBox(jQuery("[name$='dvt_id']", wid.document), "form_dvt_pte", callbackDVTAssessment,wid);

          openAssessmentsBox(jQuery("[name$='vte_id']", wid.document), "form_caprini", callbackVTEAssessment,wid);

          // form_caprini

          // 启用吞咽评估单 form_internal_first_tykn_option    form_swallowing
          openAssessmentsBox(jQuery("[name$='swallowing_id']", wid.document), "form_swallowing", callbackSwallowingAssessment,wid);

          // 启用跌倒护理单 form_internal_first_ddfxpg_option  form_fall
          openAssessmentsBox(jQuery("[name$='fall_id']", wid.document), "form_fall", callbackFallAssessment,wid);


         // let codes = [
         //   "form_selfcare",  //自理能力评估单
         //   "form_pain_assessment",  //疼 痛 护 理 单
         //   "form_pressure_risk",    //Braden压疮风险护理单
         //   "form_fall",             //跌倒护理单
         //   "form_dvt_pte", //下肢深静脉血栓形成（DVT）及肺栓塞（PTE)风险护理单
         //   "form_swallowing",       //吞咽评估单
         // ];

         function callbackPainAssessment(data, callbackData) {
           console.log(data, callbackData, wid.formInfo, 88888)

          // 入院表formCode
           var formCodeSource = wid.formInfo.formCode;

           // 疼痛评估表formCode
           let formCode = "form_pain_assessment";
           let evalscore = 0;

          try {
            data[formCode + "_ttpgb_option"] = data[formCode + "_ttpgb_option"].replace("疼痛",'');
            // let wid = document.querySelector('.assessment-iframe').contentWindow

            // 疼痛评分
            wid.setFormData(formCodeSource + '_ttpf', data[formCode + '_eval_score']) //儿科
            wid.setFormData(formCodeSource + "_tt_score", data[formCode + "_eval_score"]); //外科

            // 疼痛部位
            wid.setFormData(formCodeSource + '_tt_explain', data[formCode + '_bw'])//儿科
            wid.setFormData(formCodeSource + "_tt_bw_explain", data[formCode + "_bw"]);
            //
            wid.setFormData(formCodeSource + "_ttbw", data[formCode + "_bw"]);//儿科

            // 启动类型
            wid.setFormData(formCodeSource + "_ttpglbxz", data[formCode + "_ttpgb_option"], 'object');//儿科
            wid.setFormData(formCodeSource + "_ttpglb_option", data[formCode + "_ttpgb_option"], "object");//外科

            // 有无
            wid.setFormData(formCodeSource + "_tt_option", "有", "object");

            // tt_option

            // 外科
            // form_surgical_first_tt_bw_explain
            // form_surgical_first_tt_score
            // form_surgical_first_ttpglb_option 启动类型
            // form_surgical_first_tt_option 有无



            // form_kiddept_first_ttpglbxz;

          }
          catch(e) {}

           console.log('测试数据', data[formCode + '_eval_score'], data[formCode + '_bw'], data[formCode + '_ttpgb_option'], formCodeSource + '_ttpf')
          // console.log(assessmentData.formData.form_kiddept_first_ttpf, data.form_pain_assessment_eval_score,6666)
          // assessmentData.formData.form_kiddept_first_ttpf = data.form_pain_assessment_eval_score
           // let data = form;//qs.parse(form)
          //  form_pain_assessment_bw
          //  form_pain_assessment_hdqk
          //  form_pain_assessment_mbbqttb_score
          //  form_pain_assessment_eval_score

           console.log("回填数据", data, callbackData);
           if (data[formCode + "_eval_score"] === undefined) {
             return;
           }
           console.log("eval_score", data);

           jQuery("[name$='pain_id']", wid.document).val(callbackData.data.id);
          //  wid.setFormData(formCodeSource + "_pain_id", callbackData.data.id, "object");
           wid.setFormData(formCodeSource + "_form_ids_callback", formCode + ':' + callbackData.data.id, "object", true);

           jQuery(`[name*="ttpglbxz"]`, wid.document).prop("checked", "");
           // 疼痛评分
           jQuery('[name="' + formCodeSource+'_ttpf"]', wid.document).val(data["form_pain_assessment_eval_score"]);
           jQuery('[name="' + formCodeSource + '_ttpf"]', wid.document).html(data["form_pain_assessment_eval_score"]);
           jQuery("[name*='ttpglbxz'][value*='启用疼痛护理单']", wid.document).prop("checked", "checked");
           // 部位  form_internal_first_tt_explain
            jQuery('[name*="tt_explain"]', wid.document).val(data["form_pain_assessment_bw"]);
           jQuery('[name*="tt_explain"]', wid.document).html(data["form_pain_assessment_bw"]);

           jQuery(`[name*="ttpglbxz"][value*=${data[formCode + "_ttpgb_option"]}]`, wid.document).prop("checked", "checked");
           //  jQuery(`[name*="ttpglbxz"]`, wid.document).prop("disabled", "true");
           jQuery("[name$='ttpglbxz'][value*='启用疼痛护理单']", wid.document).prop("disabled", "");
           jQuery("[name*='tt_option'][value*='有']", wid.document).prop("checked", "checked");
           jQuery("[name*='tt_option'][value*='无']", wid.document).prop("checked", "");
           // wid.jQuery(`[name$="_p2_ttxz"][value=${data['form_pain_assessment_xz_option']}]`).prop("checked", "checked")
           // wid.jQuery('[name$="_p2_ttxzqt"]').val(data['form_pain_assessment_xz_other'])
         }

         function callbackSelfcareAssessment(data, callbackData) {
           //form_selfcare
           // form_internal_first_zlnlpg_option  form_selfcare
           // 完全依赖（0-20分）  严重依赖（20-40分）  明显依赖（40-60分）基本自理（＞60分）
           //
           // 外科
           // form_surgical_first_zlnlpg_option
           let evalscore = 0;
           let formCode = "form_selfcare";
           // 入院表formCode
           var formCodeSource = wid.formInfo.formCode;

           try {
             if (data[formCode + "_eval_score"] === undefined) {
               return;
             }

             jQuery("[name$='selfcare_id']", wid.document).val(callbackData.data.id);
            //  wid.setFormData(formCodeSource + "_selfcare_id", callbackData.data.id, "object");
             wid.setFormData(formCodeSource + "_form_ids_callback", formCode + ':' + callbackData.data.id, "object", true);

             evalscore = parseInt(data[formCode + "_eval_score"]);
             jQuery(`[name*="zlnlpg_option"]`, wid.document).prop("checked", "");
             if (evalscore < 20) {
               jQuery("[name$='zlnlpg_option'][value*='完全依赖']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_zlnlpg_option", "完全依赖（0-20分）", "object");
             } else if (evalscore >= 20 && evalscore < 40) {
               jQuery("[name$='zlnlpg_option'][value*='严重依赖']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_zlnlpg_option", "严重依赖（20-40分）", "object");
             } else if (evalscore >= 40 && evalscore < 60) {
               jQuery("[name$='zlnlpg_option'][value*='明显依赖']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_zlnlpg_option", "明显依赖（40-60分）", "object");
             } else {
               jQuery("[name$='zlnlpg_option'][value*='基本自理']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_zlnlpg_option", "基本自理（＞60分）", "object");
             }
             //  jQuery(`[name*="zlnlpg_option"]`, wid.document).prop("disabled", "true");
             jQuery("[name$='zlnlpg_option'][value*='启用自理能力评估单']", wid.document).prop("checked", "checked");
             jQuery("[name$='zlnlpg_option'][value*='启用自理能力评估单']", wid.document).prop("disabled", "");
             //  jQuery(`[name*="zlnlpg_option"]`, wid.document).prop("disabled", "true");
           } catch (e) {
             console.log("ERROR:callbackSelfcareAssessment", e);
           }
           console.log("callbackSelfcareAssessment", evalscore, data, callbackData);
         }

         // 压舱
         function callbackPressureRiskAssessment(data, callbackData) {
           // form_internal_first_ycfxpf_explain 选项
           // form_internal_first_ycfxpf_option 无有
           // form_internal_first_ycfxpf 得分
           //

           // 外科
           //评分 form_surgical_first_ycfxpf_explain
           //有无 form_surgical_first_ycfxpf_option
           /*
     15-18分（轻度危险）  13-14分（中度危险）  10-12分（高度危险） ＜9分（极度危险）  启用压疮风险评估单
       */
           let evalscore = 0;
           let formCode = "form_pressure_risk";
           // 入院表formCode
           var formCodeSource = wid.formInfo.formCode;

           try {
             if (data[formCode + "_eval_score"] === undefined) {
               return;
             }

             // ycfxpf_score

             jQuery("[name$='pressure_id']", wid.document).val(callbackData.data.id);
             wid.setFormData(formCodeSource + "_form_ids_callback", formCode + ':' + callbackData.data.id, "object", true);

             evalscore = parseInt(data[formCode + "_eval_score"]);

             //


             jQuery("[name$='ycfxpf_explain']", wid.document).prop("checked", "");
             if (evalscore <= 9) {
               jQuery("[name$='ycfxpf_explain'][value*='极度危险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_ycfxpf_explain", "＜9分（极度危险）", "object");
             } else if (evalscore > 9 && evalscore <= 12) {
               jQuery("[name$='ycfxpf_explain'][value*='高度危险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_ycfxpf_explain", "10-12分（高度危险）", "object");
             } else if (evalscore >= 13 && evalscore <= 14) {
               jQuery("[name$='ycfxpf_explain'][value*='中度危险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_ycfxpf_explain", "13-14分（中度危险）", "object");
             } else {
               jQuery("[name$='ycfxpf_explain'][value*='轻度危险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_ycfxpf_explain", "15-18分（轻度危险）", "object");
             }
             //  jQuery("[name$='ycfxpf_explain']", wid.document).prop("disabled", "true");
             jQuery("[name$='ycfxpf_explain'][value*='启用压疮风险评估单']", wid.document).prop("checked", "checked");
             jQuery("[name$='ycfxpf_explain'][value*='启用压疮风险评估单']", wid.document).prop("disabled", "");
             jQuery("[name$='ycfxpf_option'][value*='有']", wid.document).prop("checked", "checked");
             //
             wid.setFormData(formCodeSource + "_ycfxpf_option", "有", "object");
             //
             wid.setFormData(formCodeSource + "_ycfxpf", evalscore);
             wid.setFormData(formCodeSource + "_ycfxpf_score", evalscore);
             //
             jQuery("[name$='ycfxpf']", wid.document).prop("value", evalscore);
             jQuery("[name$='ycfxpf_score']", wid.document).html(evalscore);
           } catch (e) {
             console.log("ERROR:callbackPressureRiskAssessment", e);
           }


           console.log("callbackPressureRiskAssessment", evalscore, data, callbackData, callbackData.data.id, wid.getRawData(), wid.getFormData());


         }

         // VTE
        function callbackVTEAssessment(res){
          console.log("VTE表返回数据：", res);
          let data = res.data.data
          let evalscore = 0;
          let formCode = data.formCode;
          // 入院表formCode
          var formCodeSource = wid.formInfo.formCode;

          try {
            if (!data.evalScoreAndUnit){
              return
            }
            evalscore = parseInt(data.evalScoreAndUnit);

            wid.setFormData(formCodeSource + "_vte_score", evalscore);
            // jQuery("[name$='"+formCodeSource+"_vte_score']", wid.document).prop("value", evalscore);

            // jQuery("[name='"+formCodeSource+"_vte_score']", wid.document).html(evalscore);

            jQuery("[name='"+formCodeSource+"_vte_id']", wid.document).val(data.id);
            wid.setFormData(formCodeSource + "_form_ids_callback", formCode + ':' + data.id, "object", true);

            // vte_score

            if( formCode ==='form_caprini'){
              if (evalscore === 0) {
                jQuery("[name$='vte_option'][value*='无风险']", wid.document).prop("checked", "checked");
                //
                wid.setFormData(formCodeSource + "_vte_option", "无风险", "object");
              }else if (evalscore <= 2) {
                jQuery("[name$='vte_option'][value*='低风险']", wid.document).prop("checked", "checked");
                //
                wid.setFormData(formCodeSource + "_vte_option", "低风险", "object");
              } else if (evalscore >= 3 && evalscore < 5) {
                jQuery("[name$='vte_option'][value*='中风险']", wid.document).prop("checked", "checked");
                //
                wid.setFormData(formCodeSource + "_vte_option", "中风险", "object");
              } else {
                jQuery("[name$='vte_option'][value*='高风险']", wid.document).prop("checked", "checked");
                //
                wid.setFormData(formCodeSource + "_vte_option", "高风险", "object");
              }
            }

            if( formCode ==='form_padua'){
              if (evalscore === 0 ) {
                jQuery("[name$='vte_option'][value*='无风险']", wid.document).prop("checked", "checked");
                wid.setFormData(formCodeSource + "_vte_option", "无风险", "object");
              }else if (evalscore < 4) {
                jQuery("[name$='vte_option'][value*='低风险']", wid.document).prop("checked", "checked");
                //
                wid.setFormData(formCodeSource + "_vte_option", "低风险", "object");
              // } else if (evalscore >= 3 && evalscore < 5) {
              //   jQuery("[name$='vte_option'][value*='中风险']", wid.document).prop("checked", "checked");
              //   //
              //   wid.setFormData(formCodeSource + "_vte_option", "中风险", "object");
              } else {
                jQuery("[name$='vte_option'][value*='高风险']", wid.document).prop("checked", "checked");
                //
                wid.setFormData(formCodeSource + "_vte_option", "高风险", "object");
              }
            }


          } catch (e) {
            console.log("ERROR:callbackVTEAssessment", e);
          }
          console.log("callbackVTEAssessment", res);


        }

         // DVT
         function callbackDVTAssessment(data, callbackData) {
           /*
     form_internal_first_dvt_or_pte_score form_internal_first_dvt_or_pte_option
     分  低风险（≤10分）  中风险（11-14分） 高风险（≥15分）  启用DVT及PTE风险评估单

     // 外科
     // form_surgical_first_dvt_or_pte_score
     // form_surgical_first_ddfxpg_option
     // form_surgical_first_dvt_or_pte_option
     */
           let evalscore = 0;
           let formCode = "form_dvt_pte";
           // 入院表formCode
           var formCodeSource = wid.formInfo.formCode;
           try {
             if (data[formCode + "_eval_score"] === undefined) {
               return;
             }

             jQuery("[name$='dvt_id']", wid.document).val(callbackData.data.id);
            //  wid.setFormData(formCodeSource + "_dvt_id", callbackData.data.id, "object");
            wid.setFormData(formCodeSource + "_form_ids_callback", formCode + ':' + callbackData.data.id, "object",true);

             evalscore = parseInt(data[formCode + "_eval_score"]);
             jQuery("[name$='dvt_or_pte_option']", wid.document).prop("checked", "");

             //
             wid.setFormData(formCodeSource + "_dvt_or_pte_score", evalscore);
             jQuery("[name$='dvt_or_pte_score']", wid.document).prop("value", evalscore);
             jQuery("[name$='dvt_or_pte_score']", wid.document).html(evalscore);

             if (evalscore <= 10) {
               jQuery("[name$='dvt_or_pte_option'][value*='低风险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_dvt_or_pte_option", "低风险(≤10分)", "object");
             } else if (evalscore >= 11 && evalscore < 15) {
               jQuery("[name$='dvt_or_pte_option'][value*='中风险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_dvt_or_pte_option", "中风险(11-14分）", "object");
             } else {
               jQuery("[name$='dvt_or_pte_option'][value*='高风险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_dvt_or_pte_option", "高风险（≥15分）", "object");
             }
             //  jQuery("[name$='dvt_or_pte_option']", wid.document).prop("disabled", "true");
             jQuery("[name$='dvt_or_pte_option'][value*='启用DVT及PTE风险评估单']", wid.document).prop("checked", "checked");
             jQuery("[name$='dvt_or_pte_option'][value*='启用DVT及PTE风险评估单']", wid.document).prop("disabled", "");
             // jQuery("[name$='ycfxpf_option'][value*='有']",wid.document).prop("checked", "checked");

           } catch (e) {
             console.log("ERROR:callbackDVTAssessment", e);
           }
           console.log("callbackDVTAssessment", evalscore, data, callbackData);
         }

         // 跌倒
         function callbackFallAssessment(data, callbackData) {
           // ≥65岁  跌倒高风险（≥10分）  跌倒低风险（＜10分）  启用跌倒护理单
           // form_internal_first_ddfxpg_option
           let evalscore = 0;
           let age = 0;
           let formCode = "form_fall";
           // 入院表formCode
           var formCodeSource = wid.formInfo.formCode;

           try {
             if (data[formCode + "_eval_score"] === undefined) {
               return;
             }

             jQuery("[name$='fall_id']", wid.document).val(callbackData.data.id);
            //  wid.setFormData(formCodeSource + "_fall_id", callbackData.data.id, "object");
            wid.setFormData(formCodeSource + "_form_ids_callback", formCode + ':' + callbackData.data.id, "object",true);

             evalscore = parseInt(data[formCode + "_eval_score"]);
             age = parseInt(jQuery("[name$='age']", wid.document).val());
             jQuery("[name$='ddfxpg_option']", wid.document).prop("checked", "");
             if (evalscore < 10) {
               jQuery("[name$='ddfxpg_option'][value*='跌倒低风险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_ddfxpg_option", "跌倒低风险（＜10分）", "object");
             } else {
               jQuery("[name$='ddfxpg_option'][value*='跌倒高风险']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_ddfxpg_option", "跌倒高风险（≥10分）", "object");
             }
             //  jQuery("[name$='ddfxpg_option']", wid.document).prop("disabled", "true");
             jQuery("[name$='ddfxpg_option'][value*='启用跌倒护理单']", wid.document).prop("checked", "checked");
             jQuery("[name$='ddfxpg_option'][value*='启用跌倒护理单']", wid.document).prop("disabled", "");

             // age
             if (age >= 65) {
               jQuery("[name$='ddfxpg_option'][value*='65岁']", wid.document).prop("checked", "checked");
               //
               wid.setFormData(formCodeSource + "_ddfxpg_option", "≥65岁", "object");
             }

             jQuery("[name$='ddfxpg_score']", wid.document).html(evalscore);
             //
             wid.setFormData(formCodeSource + "ddfxpg_score", evalscore);

             // jQuery("[name$='ycfxpf_option'][value*='有']",wid.document).prop("checked", "checked");
             // jQuery("[name$='ddfxpg_score']",wid.document).prop("value", evalscore);
           } catch (e) {
             console.log("ERROR:callbackDVTAssessment", e);
           }
           console.log("callbackDVTAssessment", evalscore, data, callbackData);
         }

         // 吞咽评估单
         function callbackSwallowingAssessment(data, callbackData) {
           // let evalscore = 0;
           // let age=0;
           // console.log("回填数据",data);
           console.log("回填数据callbackSwallowingAssessment", data, callbackData);
           let formCode = "form_swallowing";
           // 入院表formCode
           var formCodeSource = wid.formInfo.formCode;



           try {
                 /*
            有无 tykn_option
            吞水 阴阳 tssy_option
            吞糊 阴阳 thsy_option
            swallowing_id
            wid.setFormData()
            */
               } catch (error) {
             //
           }

           // let data = res.data.data
           if (data === null || data.length == 0) {
             jQuery("[name$='tykn_option'][value*='无']", wid.document).prop("checked", "checked");
             jQuery("[name$='tykn_option'][value*='有']", wid.document).prop("checked", "");

             //
             wid.setFormData(formCodeSource + '_tykn_option', '无', 'object');
             return;
           }

           jQuery("[name$='swallowing_id']", wid.document).val(callbackData.data.id);
          //  wid.setFormData(formCodeSource + "_swallowing_id", callbackData.data.id, "object");
           wid.setFormData(formCodeSource + "_form_ids_callback", formCode + ':' + callbackData.data.id, "object",true);

           // SWALLOW_WATER_RESULT   form_internal_first_tykn_ts_option
           // SWALLOW_PASTE_RESULT   form_internal_first_tykn_th_option
           // form_internal_first_tykn_option  data[formCode+'_eval_score']
           let has = false;
           jQuery("[name$='tykn_ts_option']", wid.document).prop("checked", "");
           jQuery("[name$='tykn_th_option']", wid.document).prop("checked", "");
           if (data["form_swallowing_swallow_water_result"].indexOf("+") > -1) {
             jQuery("[name$='tykn_ts_option'][value*='阳性']", wid.document).prop("checked", "checked");
             has = true;
             //
             wid.setFormData(formCodeSource + "_tssy_option", "阳性", 'object');
             wid.setFormData(formCodeSource + "_tykn_ts_option", "阳性", 'object');
           }
           if (data["form_swallowing_swallow_water_result"].indexOf("-") > -1) {
             jQuery("[name$='tykn_ts_option'][value*='阴性']", wid.document).prop("checked", "checked");
             // has = false;
             //
             wid.setFormData(formCodeSource + "_tssy_option", "阴性", "object");
             wid.setFormData(formCodeSource + "_tykn_ts_option", "阴性", "object");
           }
           if (data["form_swallowing_swallow_paste_result"].indexOf("+") > -1) {
             jQuery("[name$='tykn_th_option'][value*='阳性']", wid.document).prop("checked", "checked");
             has = true;
             //
             wid.setFormData(formCodeSource + "_thsy_option", "阳性", "object");
             wid.setFormData(formCodeSource + "_tykn_th_option", "阳性", "object");
           }
           if (data["form_swallowing_swallow_paste_result"].indexOf("-") > -1) {
             jQuery("[name$='tykn_th_option'][value*='阴性']", wid.document).prop("checked", "checked");
             // has = false;
             //
             wid.setFormData(formCodeSource + "_thsy_option", "阴性", "object");
             wid.setFormData(formCodeSource + "_tykn_th_option", "阴性", "object");
           }
           //  jQuery("[name$='tykn_ts_option']", wid.document).prop("disabled", "true");
           //  jQuery("[name$='tykn_th_option']", wid.document).prop("disabled", "true");
           jQuery("[name$='tykn_option'][value*='启用']", wid.document).prop("disabled", "");
           if (has) {
             jQuery("[name$='tykn_option'][value*='有']", wid.document).prop("checked", "checked");
             jQuery("[name$='tykn_option'][value*='启用']", wid.document).prop("checked", "checked");
             jQuery("[name$='tykn_option'][value*='无']", wid.document).prop("checked", "");
             //
             wid.setFormData(formCodeSource + "_tykn_option", "有", "object");
           } else {
             jQuery("[name$='tykn_option'][value*='有']", wid.document).prop("checked", "");
             jQuery("[name$='tykn_option'][value*='无']", wid.document).prop("checked", "checked");
             //
             wid.setFormData(formCodeSource + "_tykn_option", "无", "object");
           }
         }

    }
