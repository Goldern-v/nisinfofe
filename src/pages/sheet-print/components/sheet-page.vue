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
.sheetTable-contain
  background #DFDFDF
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
  getBlock
} from "../api/api.js";
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import $ from "jquery";
import { $params } from "../tool/tool";
import { printDir } from "@/Part/print/control/common-print.js";
import { addCSS } from "@/utils/css";
import { formatSub } from "@/utils/sup";
export default {
  data() {
    return {
      data: {
        bedList: []
      },
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

      let resultModel = mapSheetModel.filter(item => {
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
      getBlock($params.id).then(res_b => {
        this.sheetInfo.selectBlock = res_b.data.data;
        this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;
        Promise.all([showTitle(), showBody(), markList(), getHomePage()]).then(
          res => {
            let titleData = res[0].data.data;
            let bodyData = res[1].data.data;
            let markData = res[2].data.data.list || [];
            let pageData = res[3].data.data;
            this.$nextTick(() => {
              initSheetPage(titleData, bodyData, markData);
              this.sheetInfo.sheetStartPage =
                (pageData && pageData.indexNo) || 1;
              this.sheetInfo.sheetMaxPage =
                (pageData && pageData.maxIndexNo) || 1;
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
                    if (document.querySelector('th[dataname="审核签名"]')) {
                      $(".contant").width(Math.max($(".contant").width()));
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

                    let sheetTableWidth = document.querySelector("div.contant")
                      .offsetWidth;
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

                    if (!this.isDev) $('[style="display: none;"]').remove();
                    if (!this.isDev) $(".no-print").remove();
                  });
              });
            });
          }
        );
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
