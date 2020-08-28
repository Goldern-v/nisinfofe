<template>
  <div
    class="contain"
    :class="{ fullpage }"
    v-loading="pageLoading"
    element-loading-text="正在保存"
  >
    <div class="head-con" flex>
      <div class="dept-select-con"></div>
      <div class="tool-con" flex-box="1">
        <sheetTool ref="sheetTool"></sheetTool>
      </div>
    </div>
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <div class="left-part">
        <!-- <patientList
          :data="data.bedList"
          :isSelectPatient="isSelectPatient"
          v-loading="patientListLoading"
        ></patientList>-->

        <patientList toName="sheetPage" :callFunction="isSelectPatient" />
      </div>
      <div
        class="right-part"
        :style="{ marginLeft: openLeft ? '200px' : '0' }"
        :class="{ wxHighLightBg: HOSPITAL_ID == 'weixian' }"
        v-loading="tableLoading"
      >
        <div
          class="sheetTable-contain"
          ref="scrollCon"
          @scroll="e => onScroll(e)"
        >
          <div ref="sheetTableContain">
            <component
              v-bind:is="sheetTable"
              v-for="(item, index) in filterSheetModel"
              :key="index"
              :data="item.data"
              :index="item.index"
              :length="item.length"
              :isFirst="index === 0"
              :scrollY="scrollY"
              :isInPatientDetails="false"
            ></component>
            <!-- <sheetTable
              v-else
              v-for="(item, index) in filterSheetModel"
              :key="index"
              :data="item.data"
              :index="item.index"
              :length="item.length"
            ></sheetTable>-->
          </div>
          <div
            v-show="sheetModel.length == 0"
            class="null-btn"
            flex="cross:center main:center"
            @click="addSheetPage"
          >
            <i class="el-icon-plus"></i>
            创建护理记录单
          </div>
        </div>
      </div>
    </div>
    <delPageModal ref="delPageModal" :index="sheetModel.length"></delPageModal>
    <HjModal ref="HjModal"></HjModal>
    <signModal ref="signModal" title="需要该行签名者确认"></signModal>
    <signModal ref="signModal2" title="签名者确认"></signModal>
    <specialModal ref="specialModal"></specialModal>
    <specialModal2 ref="specialModal2"></specialModal2>
    <setPageModal ref="setPageModal"></setPageModal>
    <pizhuModal ref="pizhuModal"></pizhuModal>
    <evalModel ref="evalModel"></evalModel>
    <syncToIsbarModal ref="syncToIsbarModal"></syncToIsbarModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../assets/css/style.styl';

.contain {
  margin: 0;
  background: #fff;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  &.fullpage {
    position: fixed !important;
    z-index: 10000;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0;
  }

  .head-con {
    height: 41px;
  }

  .body-con {
    position: relative;

    .left-part {
      width: 199px;
      position: absolute;
      left: 0;
      top: -40px;
      bottom: 0;
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
}

.dept-select-con {
  box-sizing: border-box;
  width: 199px;
  height: 41px;
  background: #F7FAFA;
  border-right: 1px solid #CBD5DD;
  border-bottom: 1px solid #EAEEF1;
  border-radius: 2px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  >>>.el-input__inner {
    width: 172px;
    height: 28px;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
    font-size: 12px;
  }
}

.sheetTable-contain {
  height: 100%;
  background: #DFDFDF;
  overflow: auto;
  padding: 15px 5px 15px;
  box-sizing: border-box;
  margin: 0 auto 20px;
  position: relative;
  scrollBar(7px, 14px);
}

.null-btn {
  position: absolute;
  top: 0px;
  bottom: 150px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 17px;
  color: #687179;
  width: 195px;
  height: 50px;
  background: #FFFFFF;
  border: 1px solid #ADB4BA;
  box-shadow: 0 1px 2px 0 rgba(200, 200, 200, 0.5);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }

  i {
    margin-right: 4px;
  }
}
</style>
<style lang="stylus">
#sheet_body_con {
  .wxHighLightBg {
    .sheet-excel-container {
      .sheet-table {
        .body-con {
          &:focus, &:hover {
            background: #FEF8B1;
          }
        }
      }
    }
  }
}
</style>

<script>
import sheetTool from "./components/sheet-tool/sheet-tool.vue";
// import patientList from "@/components/patient-list/patient-list.vue";
import patientList from "@/components/patient-list/patient-list-router-link.vue";
import sheetTable from "./components/sheetTable/sheetTable.vue";
import sheetTableNeonatology from "./components/sheetTable-neonatology/sheetTable";
import sheeTableBurn_plastic from "./components/sheeTable-burn_plastic/sheetTable";
import sheetTablePost_partum from "./components/sheetTable-post_partum/sheetTable";
import sheetTablePost_hemodialysis from "./components/sheetTable-hemodialysis/sheetTable";
import sheetTable_oxytocin from "./components/sheetTable-oxytocin/sheetTable";
import sheetTableDressing_count from "./components/sheetTable-dressing_count/sheetTable";
import sheetTableMaternal_newborn_lc from "./components/sheetTable-maternal_newborn_lc/sheetTable";
import sheetTable_picc_maintenance_hd from "./components/sheetTable-picc_maintenance_hd/sheetTable";
import common from "@/common/mixin/common.mixin.js";
import evalModel from "./components/modal/eval-model/eval-model.vue";
import { typeList } from "@/api/lesion";
import sheetModel, {
  addSheetPage,
  delSheetPage,
  initSheetPage,
  cleanData
} from "./sheet.js";
import { patients } from "@/api/lesion";
import decode from "./components/render/decode.js";
import {
  saveBody,
  showBody,
  showTitle,
  delPage,
  markList,
  splitRecordBlock
} from "@/api/sheet.js";
import sheetInfo from "./components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import delPageModal from "./components/modal/del-page.vue";
import $ from "jquery";
import moment from "moment";
import HjModal from "./components/modal/hj-modal.vue";
import signModal from "@/components/modal/sign.vue";
import specialModal from "@/Page/sheet-page/components/modal/special-modal.vue";
import specialModal2 from "@/Page/sheet-page/components/modal/special-modal2.vue";
import setPageModal from "@/Page/sheet-page/components/modal/setPage-modal.vue";
import pizhuModal from "@/Page/sheet-page/components/modal/pizhu-modal.vue";
import syncToIsbarModal from "@/Page/sheet-page/components/modal/sync-toIsbar-modal.vue";
import { getHomePage } from "@/Page/sheet-page/api/index.js";
import { decodeRelObj } from "./components/utils/relObj";
import { sheetScrollBotton } from "./components/utils/scrollBottom";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: []
      },
      patientListLoading: false,
      pageLoading: false,
      tableLoading: false,
      bus: bus(this),
      sheetModel,
      sheetInfo,
      scrollTop: 0,
      typeList: [], // 科室类型
      scrollY: 0
    };
  },
  computed: {
    containHeight() {
      if (this.fullpage) {
        return this.wih - 44 + "px";
      } else {
        return this.wih - 104 + "px";
      }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
    filterSheetModel() {
      // 根据页码处理后的页面
      let showSheetPage = i => {
        let startPage = this.sheetInfo.startPage;
        let endPage = this.sheetInfo.endPage;
        let index = i + this.sheetInfo.sheetStartPage;
        if (startPage && endPage) {
          if (index >= Number(startPage) && index <= Number(endPage)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };
      let mapSheetModel = this.sheetModel.map((item, index, arr) => {
        let obj = {
          index,
          data: item,
          length: arr.length
        };
        return obj;
      });

      let resultModel = mapSheetModel.filter(item => {
        return showSheetPage(item.index);
      });
      return resultModel;
    },
    sheetTable() {
      if (sheetInfo.sheetType == "neonatology") {
        return sheetTableNeonatology;
        //  return sheetTablePost_partum;
      } else if (sheetInfo.sheetType == "post_partum") {
        return sheetTablePost_partum;
      } else if (sheetInfo.sheetType == "blood_purification") {
        return sheetTablePost_hemodialysis;
      } else if (sheetInfo.sheetType == "oxytocin") {
        return sheetTable_oxytocin;
      } else if (sheetInfo.sheetType == "dressing_count") {
        return sheetTableDressing_count;
      } else if (sheetInfo.sheetType == "maternal_newborn_lc") {
        return sheetTableMaternal_newborn_lc;
      } else if (sheetInfo.sheetType == "picc_maintenance_hd") {
        return sheetTable_picc_maintenance_hd;
      } else {
        return sheetTable;
      }
    }
  },
  methods: {
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then(res => {
          this.data.bedList = res.data.data.filter(item => {
            return item.patientId;
          });
          sheetInfo.bedList = this.data.bedList;
          this.patientListLoading = false;
          sheetInfo.isSave = true;
        });
      }
    },
    addSheetPage() {
      this.bus.$emit("openNewSheetModal");
    },
    getSheetData(isBottom) {
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        setTimeout(() => {
          sheetInfo.isSave = true;
        }, 300);
        return;
      }
      this.tableLoading = true;
      $(".red-border").removeClass("red-border");
      //  cleanData()
      return Promise.all([
        showTitle(this.patientInfo.patientId, this.patientInfo.visitId),
        showBody(this.patientInfo.patientId, this.patientInfo.visitId),
        markList(this.patientInfo.patientId, this.patientInfo.visitId)
      ]).then(res => {
        let titleData = res[0].data.data;
        let bodyData = res[1].data.data;
        let markData = res[2].data.data.list || [];
        // this.sheetModel = []
        this.$nextTick(() => {
          // this.sheetModel = sheetModel
          initSheetPage(titleData, bodyData, markData);
          sheetInfo.relObj = decodeRelObj(bodyData.relObj) || {};
          this.getHomePage(isBottom);

          this.tableLoading = false;

          let timeNum = 5;
          function toBottom() {
            timeNum--;
            setTimeout(() => {
              this.sheetInfo.isSave = true;
              if (
                isBottom &&
                this.$refs.scrollCon.scrollHeight >
                  this.$refs.scrollCon.offsetHeight
              ) {
                // this.$refs.scrollCon.scrollTop =
                //   this.$refs.scrollCon.scrollHeight -
                //   this.$refs.scrollCon.offsetHeight -
                //   190;
                sheetScrollBotton.call(this, 0);
                timeNum > 0 && toBottom.call(this);
              } else {
                timeNum > 0 && toBottom.call(this);
              }
            }, 200);
          }
          this.$nextTick(() => {
            if (!this.patientInfo.recordId) {
              toBottom.call(this);
            }
          });
        });
      });
    },
    breforeQuit(next) {
      if (!sheetInfo.isSave) {
        window.app
          .$confirm("评估单还未保存，离开将会丢失数据", "提示", {
            confirmButtonText: "离开",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(res => {
            next();
          });
      } else {
        next();
      }
    },
    getHomePage(isFirst) {
      getHomePage(this.patientInfo.patientId, this.patientInfo.visitId).then(
        res => {
          this.sheetInfo.sheetStartPage =
            (res.data.data && res.data.data.indexNo) || 1;
          this.sheetInfo.sheetMaxPage =
            (res.data.data && res.data.data.maxIndexNo) || 1;
          isFirst && this.bus.$emit("initSheetPageSize");
        }
      );
    },
    onScroll(e) {
      if (sheetInfo.sheetType && sheetInfo.sheetType.indexOf("_wx") > -1) {
      } else {
        this.scrollY = parseInt(e.target.scrollTop);
      }
    },
    isSelectPatient(item) {
      this.$store.commit("upPatientInfo", item);
    },

  },
  created() {
    // 初始化
    cleanData();
    // 下拉
    if (this.deptCode) {
      this.getDate();
    }
    this.bus.$on("addSheetPage", () => {
      if (!this.sheetInfo.selectBlock.id) {
        return this.$notify.info({
          title: "提示",
          message: "请先创建护理记录单"
        });
      }
      addSheetPage(() => {
        this.$nextTick(() => {
          this.bus.$emit("initSheetPageSize");
          this.$nextTick(() => {
            // $(this.$refs.scrollCon).animate({
            //   scrollTop:
            //     this.$refs.scrollCon.scrollHeight -
            //     this.$refs.scrollCon.offsetHeight -
            //     ($(".contant").height() - 560)
            // });
            sheetScrollBotton.call(this);
          });
        });
      });
    });
    this.bus.$on("delSheetPage", () => {
      this.$refs.delPageModal.open(async checkList => {
        for (let item of checkList.sort((a, b) => {
          return b - a;
        })) {
          await delPage(
            this.patientInfo.patientId,
            this.patientInfo.visitId,
            item - 1
          );
          delSheetPage(item - 1);
        }
        this.$notify.success({
          title: "提示",
          message: "删除成功"
        });
      });
    });
    this.bus.$on("saveSheetPage", (isInitSheetPageSize = true) => {
      let save = () => {
        // 审核签名（头部保存按钮auditorMap传空对象，不去修改审核签名数据，避免跨窗口审核签名丢失）
        if (isInitSheetPageSize == "noSaveSign") {
          sheetInfo.auditorMap = {};
        }
        isInitSheetPageSize =
          isInitSheetPageSize == "noSaveSign" ? false : isInitSheetPageSize;

        this.pageLoading = true;
        this.scrollTop = this.$refs.scrollCon.scrollTop;
        saveBody(this.patientInfo.patientId, this.patientInfo.visitId, decode())
          .then(res => {
            this.$notify.success({
              title: "提示",
              message: "保存成功"
            });
            this.getSheetData().then(res => {
              isInitSheetPageSize &&
                setTimeout(() => {
                  this.bus.$emit("initSheetPageSize");
                }, 100);
              this.$nextTick(() => {
                this.$refs.scrollCon.scrollTop = this.scrollTop;
                $(".red-border").removeClass("red-border");
              });
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
                $(".red-border").removeClass("red-border");
              }, 100);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
                $(".red-border").removeClass("red-border");
              }, 200);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
                $(".red-border").removeClass("red-border");
              }, 300);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
                $(".red-border").removeClass("red-border");
              }, 400);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
              }, 500);
              $(".red-border").removeClass("red-border");
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
                $(".red-border").removeClass("red-border");
              }, 600);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
                $(".red-border").removeClass("red-border");
              }, 1000);
            });
            this.pageLoading = false;
          })
          .catch(() => {
            this.pageLoading = false;
          });
      };

      let reverseList = [...decode().list].reverse();
      /** 最后的时间 */
      let lastRecordHour = (
        reverseList.find(item => item.recordDate && item.recordHour) || {}
      ).recordHour;
      /** 所有新增的时间 */
      let newRecordHours = reverseList
        .filter(
          item => item.recordHour && !item.recordMonth && !item.recordDate
        )
        .map(item => item.recordHour);
      /** 新增记录是否存在比原有记录更前 */
      let isBefore = newRecordHours.some(
        item =>
          moment("2019-9-20 " + item).unix() <
          moment("2019-9-20 " + lastRecordHour).unix()
      );
      if (isBefore) {
        this.$confirm(
          "新增记录比原有记录时间更前, 请确定日期, 是否确认保存?",
          "提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(res => {
          save();
        });
      } else {
        save();
      }
    });
    this.bus.$on("refreshSheetPage", isFirst => {
      this.getSheetData(isFirst);
    });
    this.bus.$on("toSheetPrintPage", newWid => {
      if ($(".sign-text").length) {
        // 判断是否存在标记
        if ($(".mark-mark-mark").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".mark-mark-mark")
                .eq(0)
                .addClass("red-border")
                .offset().top +
              this.$refs.scrollCon.scrollTop -
              150
          });
          return this.$message.warning("打印前必须去除所有标记");
        }
        // 判断是否存在未签名
        if ($(".noSignRow").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".noSignRow")
                .eq(0)
                .addClass("red-border")
                .offset().top +
              this.$refs.scrollCon.scrollTop -
              150
          });
          return this.$message.warning("存在未签名的记录，请全部签名后再打印");
        }
        if ($(".multiSign").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".multiSign")
                .eq(0)
                .addClass("red-border")
                .offset().top +
              this.$refs.scrollCon.scrollTop -
              150
          });
          return this.$message.warning("记录存在多个签名，或者忘记填写时间");
        }
      }
      if ($(".isNoSign") && $(".isNoSign").length) {
        $(".signTd")
          .eq(0)
          .addClass("red-border");
        $(this.$refs.scrollCon).animate({
          scrollTop:
            $(".isNoSign")
              .eq(0)
              .offset().top +
            this.$refs.scrollCon.scrollTop -
            150
        });
        return this.$message.warning("存在未签名的记录，请全部签名后再打印");
      }

      window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();

      // let printUrl = "";
      // if (process.env.NODE_ENV === "production") {
      //   this.$message.info("正在准备打印，请勿重复操作");
      // printUrl = "/crNursing/print/sheetPage?toPrint=true";
      //   /** 打印 */
      //   const iframe = document.createElement("iframe");
      //   iframe.style.display = "block";
      //   iframe.style.height = "0";
      //   iframe.style.width = "0";
      //   iframe.style.overflow = "hidden";
      //   iframe.src = printUrl;
      //   document.body.appendChild(iframe);
      //   const iframeWindow = iframe.contentWindow;
      //   setTimeout(() => {
      //     document.body.removeChild(iframe);
      //   }, 20000);
      // } else {
      //   this.$router.push(`/print/sheetPage`);
      // }
      if (process.env.NODE_ENV === "production") {
        newWid.location.href = "/crNursing/print/sheetPage";
      } else {
        this.$router.push(`/print/sheetPage`);
      }
    });
    this.bus.$on("openHJModal", () => {
      this.$refs.HjModal.open();
    });
    this.bus.$on("openSetPageModal", () => {
      this.$refs.setPageModal.open();
    });
    this.bus.$on("openPizhuModal", (tr, td) => {
      this.$refs.pizhuModal.open(tr, td);
    });
    this.bus.$on("openEvalModel", (tr, td) => {
      this.$refs.evalModel.open();
    });
    this.bus.$on("refrehSheetStartPage", () => {
      this.getHomePage();
    });
    this.bus.$on("setSheetTableLoading", (state = false) => {
      this.tableLoading = state;
    });
    this.bus.$on("splitSheet", (tr, td) => {
      this.$refs.signModal2.open((password, empNo) => {
        let recordDate = tr.find(item => item.key == "recordDate").value;
        recordDate = recordDate
          ? moment(recordDate).format("YYYY-MM-DD HH:mm")
          : recordDate;
        splitRecordBlock(empNo, password, recordDate).then(res => {
          this.bus.$emit("getBlockList");
          this.$message.success("创建成功");
          this.bus.$emit("setSheetTableLoading", true);
        });
      });
    });
    this.bus.$on("syncDecription", (tr, td) => {
      this.$refs.syncToIsbarModal.open(tr, td,sheetModel);
    });
  },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
        this.breforeQuit(() => {
          cleanData();
          this.getDate();
        });
      }
    },
    sheetModel: {
      deep: true,
      handler() {
        if (this.patientInfo.name) {
          sheetInfo.isSave = false;
        }
      }
    }
  },
  beforeRouteLeave: (to, from, next) => {
    if (!sheetInfo.isSave) {
      window.app
        .$confirm("评估单还未保存，离开将会丢失数据", "提示", {
          confirmButtonText: "离开",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(res => {
          next();
        });
    } else {
      next();
    }
  },
  components: {
    sheetTool,
    patientList,
    sheetTable,
    delPageModal,
    HjModal,
    signModal,
    specialModal,
    specialModal2,
    setPageModal,
    pizhuModal,
    syncToIsbarModal,
    sheetTableNeonatology,
    sheetTablePost_partum,
    evalModel,
    sheetTablePost_hemodialysis,
    sheetTable_oxytocin,
    sheetTableDressing_count,
    sheetTableMaternal_newborn_lc,
    sheetTable_picc_maintenance_hd
  }
};
</script>
