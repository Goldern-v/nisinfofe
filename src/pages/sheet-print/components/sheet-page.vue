<template>
  <div class="sheet-contain" id="sheetPagePrint">
    <div class="body-con">
      <div class="sheetTable-contain">
        <div ref="sheetTableContain" class="iframe">
          <sheetTable
            v-for="(item, index) in filterSheetModel"
            :key="index"
            :data="item.data"
            :index="item.index"
            :length="item.length"
          ></sheetTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.sheetTable-contain {
  background: #DFDFDF;
}
</style>

<script>
import sheetTable from "@/Page/sheet-page/components/sheetTable/sheetTable.vue";
import sheetModel, {
  initSheetPage,
  cleanData
} from "@/Page/sheet-page/sheet.js";
import decode from "@/Page/sheet-page/components/render/decode.js";
import {
  showBody,
  showTitle,
  markList,
  getHomePage,
  getBlock,
  syncToRecord
} from "../api/api.js";
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
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
        bedList: []
      },
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
        "tcm_pediatrics_jm", //江门妇幼_中医儿科护理记录单
        "breastkenursing_jm", //江门妇幼_乳腺科护理记录单
        "obstetricnursing_jm", //江门妇幼_产科护理记录单
        "antenatalwaiting_jm", //江门妇幼_产前待产护理记录单
        "postpartumnursing_jm",//江门妇幼_产后护理记录单
        "entdepartment_jm",//江门妇幼_耳鼻喉科护理记录单
        "catheterplacement_jm",//江门妇幼_深静脉导管置入术后维护单
        "safemetachysis_jm",//江门妇幼_输血护理记录单
        "internal_eval_lcey",//聊城_一般患者护理记录单
        "critical_new_lcey",//聊城_病重（危）患者护理记录单(带瞳孔）
        "critical2_lcey",//聊城_病重（危）患者护理记录单
        "critical_lcey",//聊城_病重（病危）患者护理记录单（带瞳孔）
      ],
      bus: bus(this),
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

      if ($params.previewId || $params.showType == "lastTowPage") {
        /** 预览模式只显示最后两页 */
        return mapSheetModel.slice(-2);
      }

      let resultModel = mapSheetModel.filter(item => {
        // todo 需要修改
        let pageIndex = this.sheetInfo.sheetStartPage + item.index;
        if ($params.endPageIndex && $params.startPageIndex) {
          if (
            pageIndex <= $params.endPageIndex &&
            pageIndex >= $params.startPageIndex
          ) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      });

      return resultModel;
    }
  },
  methods: {
    getSheetData() {
      cleanData();

      if ($params.previewId) {
        console.log('住院评估单预览');
        /** 住院评估单预览 */
        syncToRecord($params.previewId).then(res => {
          this.sheetInfo.selectBlock = res.data.data.block;
          this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;

          let titleData = { list: res.data.data.fieldSettingList };
          let bodyData = { list: res.data.data.recordList };
          let markData = [];
          let pageData = res.data.data.homePage;

          this.$nextTick(() => {
            initSheetPage(titleData, bodyData, markData);
            this.sheetInfo.sheetStartPage = (pageData && pageData.indexNo) || 1;
            this.sheetInfo.sheetMaxPage =
              (pageData && pageData.maxIndexNo) || 1;
            this.$nextTick(() => {
              window.scrollTo(0, 10000);
            });
          });
        });
        return;
      }
      console.log('beforeGetBlock');
      getBlock($params.id).then(res_b => {
        this.sheetInfo.selectBlock = res_b.data.data;
        this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;
      console.log('beforePromise');
        Promise.all([showTitle(), showBody(), getHomePage()]).then(res => {
          let titleData = res[0].data.data;
          let bodyData = res[1].data.data;
          let markData = [];
          let pageData = res[2].data.data;

      console.log('beforeNextTick');
          this.$nextTick(() => {
            initSheetPage(titleData, bodyData, markData);
            sheetInfo.relObj = decodeRelObj(bodyData.relObj) || {};
            this.sheetInfo.sheetStartPage = (pageData && pageData.indexNo) || 1;
            this.sheetInfo.sheetMaxPage =
              (pageData && pageData.maxIndexNo) || 1;
            this.$nextTick(() => {
      console.log('beforeNextTick2');
              $("#sheetPagePrint")
                .find(".head-con span")
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
              if (document.querySelector('th[dataname="审核签名"]')||document.querySelector('th[dataname="质控护士"]')) {
                $(".contant").width(Math.max($(".contant").width()));
              }
              console.log('findAndEach');
              /** 添加上标下标 */
              try{
                $('[datakey="description"]').each((index, el) => {
                  let dataValue = $(el)
                    .find("input")
                    .val();
                    if(dataValue){
                      let resultValue = `<span>${formatSub(
                        formatSub(formatSub(dataValue))
                      )}</span>`;
                      if (dataValue.indexOf("^") > -1) {
                        $(el)
                          .empty()
                          .append(resultValue);
                      }
                    }
                });
              }catch(err){
                console.log(err);
              }
              console.log('each');
              let sheetTableWidth = document.querySelector("div.contant").offsetWidth;
              console.log(sheetTableWidth);
              $("#sheetPagePrint").css({
                minWidth: sheetTableWidth + "px"
              });
              if (sheetTableWidth > 1000) {
                printDir("h");
                addCSS(
                  window,
                  `
                  @media print {
                    .iframe > div:nth-of-type(2n) {
                      height: ${sheetTableWidth * 0.755}px !important;
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

              if(['lyxrm','huadu', 'stmz', 'wujing', 'zhzxy','nfyksdyy', 'fuyou', 'beihairenyi', 'ytll'].includes(this.HOSPITAL_ID)) {
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
              if(['internal_eval_linyi'].includes(this.sheetInfo.sheetType)){
                addCSS(
                  window,
                  `
                    @media print {
                      .iframe > div:nth-of-type(2n) {
                        height: ${sheetTableWidth * 0.7}px !important;
                      }
                    }
                  `
                );
              }
              if(['common_wj'].includes(this.sheetInfo.sheetType)) {
                addCSS(
                  window,
                  `
                    #sheetPagePrint .iframe .sheet-table td[datakey="description"] strong{
                      font-weight:bold !important;
                    }
                  `
                );
              }else if(['orthopaedic_sdry'].includes(this.sheetInfo.sheetType)) {
                addCSS(
                  window,
                  `
                    #sheetPagePrint .iframe{
                      overflow: auto;
                    }
                    #sheetPagePrint .iframe > div:nth-of-type(n) {
                        padding-top: 0 !important;
                        transform-origin:top center;
                        transform:scaleY(1.35) scaleX(0.95) translateX(-40px) rotate(0) !important;
                    }
                    #sheetPagePrint .iframe > div:nth-of-type(n) .sheet-table td[datakey="description"] textarea{
                      letter-spacing: -1.21px;
                    }
                    #sheetPagePrint .iframe .sign-img img{
                      height: 20px;
                    }
                    @media print {
                      .iframe > div:nth-of-type(n) {
                        height: ${sheetTableWidth * 0.75}px !important;
                      }
                    }

                  `
                );
              }else if(['orthopaedic_hzly'].includes(this.sheetInfo.sheetType)) {
                addCSS(
                  window,
                  `
                    #sheetPagePrint .iframe{
                      overflow: auto;
                    }
                    #sheetPagePrint .iframe > div:nth-of-type(n) {
                        transform-origin:top center;
                        transform:scaleX(0.97) translateX(-40px) rotate(0) !important;
                    }
                    #sheetPagePrint#sheetPagePrint th[dataname='护士签名'] {
                      width: 120px !important;
                    }
                    #sheetPagePrint .iframe .sign-img img{
                       height: 20px;
                    }
                    @media print {
                      .iframe > div:nth-of-type(n) {
                        height: ${sheetTableWidth * 0.75}px !important;
                      }
                    }
                  `
                );
              }else if ("critical2_weihai" === this.sheetInfo.sheetType) {
                addCSS(
                  window,
                  `
                  @media print {
                    @page{
                      size:A4;
                    }
                    .iframe > div:nth-of-type(n){
                      transform: rotateZ(90deg) scaleX(.9) scaleY(1.33) translateY(595px) !important;
                      margin-top: 30px !important;
                      transform-origin: center center !important;
                      height: 1620px !important;
                    }
                  }
                  `
                );
              }
              /** 如果是威县超宽打印 */
              if (this.HOSPITAL_ID == "weixian") {
                addCSS(
                  window,
                  `
                    @page{
                      margin: 0 5mm;
                      size: ${Math.round((sheetTableWidth * 25.4) / 96)}mm ${Math.round(
                                ((sheetTableWidth * 25.4) / 96) * 0.68
                              )}mm;
                    }

                    @media print {
                      #sheetPagePrint#sheetPagePrint .iframe > div:nth-of-type(2n) {
                        height: auto !important;
                      }
                      #sheetPagePrint#sheetPagePrint .iframe > div:nth-of-type(2n) {
                        transform: rotate(0deg) !important;
                      }
                    }
                  #sheetPagePrint#sheetPagePrint th[dataname='护士签名'] {
                    width: 60px !important;
                  }
                  .sign-img img {
                    width: 40px !important;
                  }
                `
                );
              }
              if (
                  (this.HOSPITAL_ID === "huadu") &&
                  this.multiSignArr.includes(this.sheetInfo.sheetType)
                ) {
                  addCSS(
                    window,
                    `
                      #sheetPagePrint#sheetPagePrint th[dataname='质控护士签名']{
                        display:none !important;
                      }
                      #sheetPagePrint#sheetPagePrint th[dataname='质控人<br/>签名']{
                        display:none !important;
                      }
                      @media print {
                        #sheetPagePrint .contant{
                          margin-top:-20px;!important;
                        }
                      }
                    `
                  );
                }

              if (!this.isDev) $('[style="display: none;"]').remove();
              if (!this.isDev) $(".no-print").remove();
            });
          });
        });
      });
    }
  },
  created() {
    // 初始化
    cleanData();
    // this.sheetInfo.selectBlock = {
    //   admissionDate: "2018-12-07 11:36:59",
    //   age: "75岁",
    //   bedLabel: "05",
    //   completeName: null,
    //   completeNo: null,
    //   completeTime: null,
    //   createTime: "2018-12-08 11:10",
    //   creatorName: "邓敏怡",
    //   creatorNo: "6895",
    //   deptCode: "030502",
    //   deptName: "神经内科护理单元",
    //   diagnosis: "高血压性心脏病",
    //   id: 10421,
    //   inpNo: "422764",
    //   patientId: "71547442",
    //   patientName: "王惠仔",
    //   recordCode: "neurology",
    //   recordName: "护理记录单（神经内科）",
    //   recordTitleCoyeType: "no",
    //   recordTitleType: "useItselfIndex",
    //   sex: "男",
    //   status: "0",
    //   visitId: "1",
    //   token: ''
    // };
    // http://60.6.218.17:9093/crNursing/sheet-print?startPageIndex=1&id=552&endPageIndex=5&Auth-Token-Nursing=4fabc967-a5b6-464c-b5b2-631a652f6f0d&App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&appToken=51e827c9-d80e-40a1-a95a-1edc257596e7&token=4fabc967-a5b6-464c-b5b2-631a652f6f0d
    this.sheetInfo.model = "print";
    this.getSheetData();
  },
  watch: {},
  destroyed() {},
  components: {
    sheetTable
  }
};
</script>
