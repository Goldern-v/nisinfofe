import {host} from '@/api/apiConfig'
import commonData from '@/api/commonData' //入院HIS数据等
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

function getFormCode(wid) {
  return jQuery(`input[name*='formCode']`,wid.document).val()||"";
}

export function initList(wid,pdata= window.app.$route.query) {
    let $ = wid.jQuery
    var formCode = getFormCode(wid);

    let query = window.app.$route.query

    //  键盘事件
    let elelist = jQuery('input',wid.document)
    // console.log("======键盘事件elelist",elelist)
    FormToTab(elelist)



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
          vteid.prop('checked','checked');
        }else{
          vteid.prop('checked', '');
        }
      } catch (error) {
        vteid.prop("checked", "");
      }
    }

  }


    // dataColNo
    // 需求页数  Math.ceil(26/8)=4
    let dataColNo = parseInt(jQuery(`[name*='dataColNo']`,wid.document).val())||-1;
    let dataPageNo = parseInt(jQuery(`[name*='dataPageNo']`,wid.document).val())||-1;
    let numOfData = pdata.numOfData
    let numOfPage = Math.ceil(numOfData/dataColNo)
    let newPage = ''
    let html = ''
    let emptySpace = '<div class="space-no-print-only"></div>'
    // let pageNumbersDiv;
    let totalPageNum = numOfPage
    console.log("----PageCountInfo:dataColNo:",dataColNo,"numOfData:",numOfData,"numOfPage:",numOfPage)

    // 根据数据量自动复制表单
    // if(formCode  === 'form_pain_assessment'){
    if(dataColNo>0 && dataPageNo>0){
      // dataColNo = 8
      // newPage = '<div class="space-no-print-only"></div>'
      newPage = '<div style="height:1px;background:transparent;"></div>'
      // page-title
      newPage += jQuery(`.page-title`,wid.document).html()||""
      newPage += jQuery(`.page-body`,wid.document).html()||""
      let pageNumbersDiv =jQuery(`.page-numbers`,wid.document)||""
      totalPageNum = numOfPage*dataPageNo
      // add page numbers
      for (var i = 1; i <= totalPageNum; i++) {
        html += `<div class="page-number"><div>第 ${i} / ${totalPageNum} 页</div></div>`
      }

      pageNumbersDiv.html(html)
      // console.log("----:",newPage)
      for (var i = 1; i < numOfPage; i++) {
        jQuery(".wrapper",wid.document).append(newPage);
      }
    }




    // 初始化 填入表单已知数据  姓名：性别： 年龄： 病区： 床号： 住院号/ID号
    // window.app.$route.query

    // var pdata = window.app.$route.query;
    console.log("form.detail.printpage.initList",formCode,pdata,wid);
    var itemname = "";
    for (var item in pdata) {
      if (pdata.hasOwnProperty(item)) {
        jQuery("[name='"+item+"']",wid.document).each(function(){


          // console.log("pdata.patientInfo", pdata.patientInfo);
          /**
          * 针对 入院评估表 作出特别修改  formCode getFormCode(wid)
          */
          if (formCode.indexOf("_first") > -1 && pdata.patientInfo) {
            pdata["admissionDate"] = pdata.patientInfo.admissionDateTime;
            pdata["admissionDateTime"] = pdata.patientInfo.admissionDateTime;
          }

          // 入院时间 格式化
          // admissionDate
          if(item==='admissionDate'){
            if(formCode.indexOf('first')>-1){
              pdata[item] = moment(pdata[item]).format('YYYY-MM-DD HH:mm');
            }else{
              pdata[item] = moment(pdata[item]).format('YYYY-MM-DD');
            }
          }

          // console.log('-----this',this);
          if(this.tagName!=="INPUT"){
            // this.parentNode.innerHTML.replace(/：/g,':');
            // this.parentNode.style.fontSize = '13px';
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










}// initList()
