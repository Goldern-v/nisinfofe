<template>
  <div class="test">

    <div id="sheetPagePrint">
      <slot name="loading" v-if="vLoading">
        <div v-loading="vLoading" element-loading-text="护记拼命加载中" class="fullFill"></div>
      </slot>
      <div v-else-if="errorFlag" class="fullFill">{{ errorMessage }}</div>
      <div ref="sheetTableContain" class="iframe" :class="HOSPITAL_ID === 'hengli' ? 'reduceGap' : ''" v-else>
        <sheetTable v-for="(item, index) in filterSheetModel" :key="index" :data="item.data" :index="item.index"
          :length="item.length"></sheetTable>
      </div>

    </div>
  </div>
</template>

<script>
import sheetTable from "@/Page/sheet-page/components/sheetTable/sheetTable.vue";
import sheetModel, {
  initSheetPage,
  cleanData,
} from "@/Page/sheet-page/sheet.js";
import {
  showBodyByPage,
  showTitle,
  findListByBlockId,
  markList,
  getHomePage,
  getBlock,
} from "../api/api";
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
import $ from "jquery";
import { $params } from "../tool/tool";
import { printDir } from "@/Part/print/control/common-print.js";
import { addCSS } from "@/utils/css";
import { formatSub } from "@/utils/sup";
import { decodeRelObj } from "@/Page/sheet-page/components/utils/relObj";
export default {
  data() {
    return {
      data: {
        bedList: [],
      },
      recordList: [],//患者护记
      errorFlag: false,
      vLoading: true,
      iframeHeight: 0,
      errorMessage: "请检查入参",
      lineSpacingArr: [
        "icu_qz", // 曲周_重症护理记录单
        "neonatology_hd", // 花都_新生儿科护理记录单
        "postpartum_wj", // 武警_产后(产房)观察记录单
        "iabp_fs", // 佛山市一_IABP护理记录单
        "intravenous_sdlj", // 顺德龙江_硫酸镁、安宝静脉点滴观察记录表
        "mechanical_sdlj", // 机械通气监护记录单（儿科）
      ],
      // 需要双签名的记录单code
      multiSignArr: [
        "common_hd", // 花都_通用护理记录单
        "neurosurgery_hd", // 花都_神经外科护理记录单
        "prenatal_hd", // 花都_产前记录单
        "neonatology2_hd", // 花都_新生儿护理记录单
        "postpartum_hd", // 花都_产后记录单
        "wait_delivery_hd", // 花都_候产记录单
        "wait_delivery_zjhj", // 湛江海军_候产记录单
        "neonatology_hd", // 花都_新生儿科护理记录单

        "neonatal_care_jm", //江门妇幼_新生儿监护单
        "pediatric_surgery_jm", //江门妇幼_小儿外科护理记录单
        "pediatrics_jm", //江门妇幼_儿科护理记录单
        "child_recovery_jm", //江门妇幼_儿童康复科护理记录单
        "gynaecology_jm", //江门妇幼_妇科护理记录单
        "generalsurgery_jm", //江门妇幼_普外科护理记录单
        "neonatology_jm", //江门妇幼_产科新生儿护理记录单
        "antenatalwaiting_jm", //江门妇幼_产前待产记录单
        "breastkenursing_jm", //江门妇幼_乳腺科护理记录单
        "obstetricnursing_jm", //江门妇幼_产科护理记录单
        "antenatalwaiting_jm", //江门妇幼_产前待产护理记录单
        "postpartumnursing_jm",//江门妇幼_产后护理记录单
        "entdepartment_jm",//江门妇幼_耳鼻喉科护理记录单
        "tcm_pediatrics_jm", //江门妇幼_中医儿科护理记录单
         "ear_nose_jm", //江门妇幼_耳鼻喉科护理记录单-成人
        "internalCareRecord", //江门妇幼_内科护理记录单
        "catheterplacement_jm",//江门妇幼_深静脉导管置入术后维护单
        "safemetachysis_jm",//江门妇幼_输血护理记录单
        "internal_eval_lcey",//聊城_一般患者护理记录单
        "critical_new_lcey",//聊城_病重（危）患者护理记录单(带瞳孔）
        "critical2_lcey",//聊城_病重（危）患者护理记录单
        "critical_lcey",//聊城_病重（病危）患者护理记录单（带瞳孔）
      ],
      sheetModel,
      sheetInfo
    };
  },
  computed: {
    filterSheetModel() {
      // 根据页码处理后的页面
      let mapSheetModel = this.sheetModel.map((item, index, arr) => {
        let obj = {
          index,
          data: item,
          length: arr.length
        };
        return obj;
      });
      return mapSheetModel;
    }

  },
  methods: {
    getSheetData() {
      cleanData();
      let { startPageIndex, endPageIndex, id } = $params
      if (startPageIndex == undefined || endPageIndex == undefined || !id) {
        return this.errorFlag = true
      }
      getHomePage(id).then((res_a) => {
        /**
         * 这个接口是获取护记的汇总信息的 ，indexNo是设置的起始页
         * 传入的页码  要先减去起始页 再请求  比如户籍第一页 但是设置起始页是10  但是后端识别是 0
         * 所以就是 10 - 10 = 0
         * */
        sheetInfo.sheetStartPage = res_a.data.data.indexNo
        const start = startPageIndex - sheetInfo.sheetStartPage
        const end = endPageIndex - sheetInfo.sheetStartPage
        startPageIndex = start ? start : 0
        endPageIndex = end ? end : 0
        getBlock($params.id).then(res_b => {
          this.sheetInfo.selectBlock = res_b.data.data;
          this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;
          let fnArr = [
            showTitle(startPageIndex, endPageIndex),
            showBodyByPage(startPageIndex, endPageIndex),
            markList(),
          ]
          // 佛山市一 获取自定义标题数据
          if (['foshanrenyi', 'fsxt', 'gdtj', 'nfyksdyy', 'zjhj', 'hzly','sdhpwk'].includes(this.HOSPITAL_ID)) {
            fnArr.shift()
            fnArr.unshift(findListByBlockId(startPageIndex, endPageIndex))
          }
          Promise.all(fnArr).then(res => {
            let titleData = res[0].data.data;
            let bodyData = res[1].data.data;
            let markData = [];
            let pageData = res[2].data.data;
            this.vLoading = false
            this.$nextTick(() => {
              initSheetPage(titleData, bodyData, markData);
              sheetInfo.relObj = decodeRelObj(bodyData.relObj) || {};
              this.formatPrintCriterion()
            });
          });
        })
      }).catch((err) => {
          this.vLoading = false
          this.errorFlag = true
          this.errorMessage =`请检查护记ID！${err.data.desc}或者护记ID错误`
        });
    },
    formatPrintCriterion() {
      this.$nextTick(() => {
        if (document.querySelector('th[dataname="审核签名"]')) {
          $(".contant").width(Math.max($(".contant").width()));
        }
        let sheetTableWidth = document.querySelector(".contant").offsetWidth;
        //   医院的护理单打印双数页面会翻转（双面打印）。这些医院都是不需要偶数页面打印翻转的
        if (this.HOSPITAL_ID === "sdlj"
          || this.HOSPITAL_ID === "fuyou"
          || this.sheetInfo.sheetType === "ventilation_hl"
          || this.HOSPITAL_ID === "wujing"
          || this.HOSPITAL_ID === "zjhj"
          || this.HOSPITAL_ID === "fsxt"
          || this.HOSPITAL_ID === "gdtj"
          || this.HOSPITAL_ID === "whfk"
          || this.HOSPITAL_ID === "foshanrenyi"
          || this.HOSPITAL_ID === "zhzxy"
          || this.HOSPITAL_ID === "lyxrm"
          || this.HOSPITAL_ID === "huadu"
          || this.HOSPITAL_ID === "xiegang"
          || this.HOSPITAL_ID === 'whsl'
          || this.HOSPITAL_ID === 'ytll'
          || this.HOSPITAL_ID === 'stmz'
          || this.HOSPITAL_ID === 'dglb') {
          printDir("h");
          addCSS(
            window,
            `
          @media print {
            .iframe > div:nth-of-type(2n) {
              transform: rotate(0deg) !important;
            }
          }
          `
          );
        }

        $("#app").css({
          minWidth: sheetTableWidth + "px"
        });
        if (sheetTableWidth > 1000 && !['ops_linyi', 'nicu_custody_hd'].includes(this.sheetInfo.sheetType)) {
          printDir("h");
          addCSS(
            window,
            `
        @media print {
          .iframe > div:nth-of-type(2n) {
          }
        }
        `
          );
        } else {
          printDir("v");
          addCSS(
            window,
            `
        @media print {
          #sheetPagePrint .iframe > div{
          padding-top: 40px !important;
          }
          .iframe > div:nth-of-type(2n) {
              transform: rotate(0) !important;
          }
      }
        `
          );
        }
        if ((this.HOSPITAL_ID === "foshanrenyi")
        ) {
          addCSS(
            window,
            `
        @media print {
          .body-con{
            height: 30px !important;
          }
        }
        `
          );
        }
        if (this.HOSPITAL_ID === "foshanrenyi") {
          addCSS(
            window,
            `
          #sheetPagePrint#sheetPagePrint th[dataname='质控护士签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='质控护士']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='质控人<br/>签名']{
            display:none !important;
          }
          @media print {
            #sheetPagePrint .sheet-page-container{

            }
          }
        `
          )
        }
        if (!this.isDev) $('[style="display: none;"]').remove();
        if (!this.isDev) $(".no-print").remove();
        this.$nextTick(() => {
          $("#sheetPagePrint")
            .find("span")
            .each((index, item) => {
              if ($(item).html() == "签名") {
                $(item).html("");
              }
              if (
                $(item)
                  .html()
                  .indexOf("标题1") > -1 ||
                $(item)
                  .html()
                  .indexOf("标题2") > -1 ||
                $(item)
                  .html()
                  .indexOf("标题3") > -1 ||
                $(item)
                  .html()
                  .indexOf("标题4") > -1 ||
                $(item)
                  .html()
                  .indexOf("标题5") > -1 ||
                $(item)
                  .html()
                  .indexOf("标题6") > -1 ||
                $(item)
                  .html()
                  .indexOf("标题7") > -1 ||
                $(item)
                  .html()
                  .indexOf("标题8") > -1 ||
                $(item)
                  .html()
                  .indexOf("标题9") > -1
              ) {
                $(item).html("");
              }
            });
          $("[ischecked='true']").each((index, el) => {
            $(el).prop("checked", true);
          });
          /* 聊城二院-介入诊疗护理记录单时间选择器打印显示 */
          if ($(".editOrPirnt").length) {
            const cssArr = Array.from($(".editOrPirnt"));
            cssArr.forEach(item => {
              item.style.display = "none";
              item.outerText =
                (item.attributes.value && item.attributes.value.value) || "";
            });
          }
          /** 添加上标下标 */
          $('[datakey="description"]').each((index, el) => {
            let dataValue = $(el)
              .find("input")
              .val();
            let resultValue = `<span>${formatSub(
              formatSub(formatSub(dataValue))
            )}</span>`;
            if (dataValue.indexOf("^") > -1) {
              $(el)
                .empty()
                .append(resultValue);
            }
          });
        });
        $(".iframe > div").each((index, element) => {
          if ($(element).find(".contant").length == 0) {
            $(element).remove();
          }
        });
        $("textarea").each((index, el) => {
          $(el).html($(el).attr("value"));
        });
      })

    },
  },
  created() {
    cleanData();
    this.sheetInfo.model = "print";
    this.getSheetData();
  },
  components: {
    sheetTable
  }
};
</script>
