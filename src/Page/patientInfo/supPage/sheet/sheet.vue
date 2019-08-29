<template>
  <div class="contain" :class="{fullpage}" v-loading="pageloading" element-loading-text="正在保存">
    <div class="head-con" flex>
      <div class="tool-con" flex-box="1">
        <sheetTool ref="sheetTool"></sheetTool>
      </div>
    </div>
    <div class="body-con" id="sheet_body_con" :style="{height: containHeight}">
      <div class="right-part" v-loading="tableLoading">
        <div class="sheetTable-contain" ref="scrollCon" @scroll="onScroll">
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
              :isInPatientDetails="true"
            ></component>
          </div>
          <div
            v-show="sheetModel.length == 0"
            class="null-btn"
            flex="cross:center main:center"
            @click="addSheetPage"
          >
            <i class="el-icon-plus"></i>
            创建护理文书
          </div>
        </div>
      </div>
    </div>
    <delPageModal ref="delPageModal" :index="sheetModel.length"></delPageModal>
    <HjModal ref="HjModal"></HjModal>
    <signModal ref="signModal" title="需要该行签名着确认"></signModal>
    <setPageModal ref="setPageModal"></setPageModal>
    <specialModal ref="specialModal"></specialModal>
    <pizhuModal ref="pizhuModal"></pizhuModal>
    <evalModel ref="evalModel"></evalModel>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 0;
  background: #fff;
  border: 1px solid #CBD5DD;
  border-top: 0;
  border-radius: 2px;
  overflow: hidden;

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

    .right-part {
      height: 100%;
      overflow: hidden;
    }
  }
}

.dept-select-con {
  box-sizing: border-box;
  width: 180px;
  height: 37px;
  background: #F7FAFA;
  border-right: 1px solid #CBD5DD;
  border-bottom: 1px solid #EAEEF1;
  border-radius: 2px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  >>>.el-input__inner {
    width: 152px;
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
  padding: 15px;
  box-sizing: border-box;
  margin: 0 auto 20px;
  position: relative;
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

<script>
import sheetTool from "@/Page/sheet-page/components/sheet-tool/sheet-tool.vue";
import patientList from "@/components/patient-list/patient-list.vue";
import sheetTable from "@/Page/sheet-page/components/sheetTable/sheetTable.vue";
import sheetTableNeonatology from "@/Page/sheet-page/components/sheetTable-neonatology/sheetTable";
import common from "@/common/mixin/common.mixin.js";
import { nursingUnit } from "@/api/lesion";
import sheetModel, {
  addSheetPage,
  delSheetPage,
  initSheetPage,
  cleanData
} from "@/Page/sheet-page/sheet.js";
import { typeList } from "@/api/lesion";
import decode from "@/Page/sheet-page/components/render/decode.js";
import {
  saveBody,
  showBody,
  showTitle,
  delPage,
  markList
} from "@/api/sheet.js";
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import delPageModal from "@/Page/sheet-page/components/modal/del-page.vue";
import $ from "jquery";
import HjModal from "@/Page/sheet-page/components/modal/hj-modal.vue";
import signModal from "@/components/modal/sign.vue";
import specialModal from "@/Page/sheet-page/components/modal/special-modal.vue";
import setPageModal from "@/Page/sheet-page/components/modal/setPage-modal.vue";
import pizhuModal from "@/Page/sheet-page/components/modal/pizhu-modal.vue";
import evalModel from "@/Page/sheet-page/components/modal/eval-model/eval-model.vue";
import { getHomePage } from "@/Page/sheet-page/api/index.js";
import { decodeRelObj } from "@/Page/sheet-page/components/utils/relObj";
import { sheetScrollBotton } from "@/Page/sheet-page/components/utils/scrollBottom";

export default {
  mixins: [common],
  data() {
    return {
      data: {
        deptValue: "",
        deptList: [],
        bedList: []
      },
      patientListLoading: false,
      tableLoading: false,
      pageloading: false,
      bus: bus(this),
      sheetModel,
      sheetInfo,
      scrollTop: 0,
      scrollY: 0
    };
  },
  computed: {
    containHeight() {
      if (this.fullpage) {
        return this.wih - 100 + "px";
      } else {
        return this.wih - 154 + "px";
      }
    },
    patientInfo() {
      return this.$route.query;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
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
      } else {
        return sheetTable;
      }
    }
  },
  methods: {
    addSheetPage() {
      if (this.patientInfo.name) {
        this.bus.$emit("openNewSheetModal");
        // addSheetPage()
      } else {
        this.$notify.info({
          title: "提示",
          message: "请选择一名患者"
        });
      }
    },
    getSheetData(isBottom) {
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        setTimeout(() => {
          sheetInfo.isSave = true;
        }, 100);
        return;
      }
      this.tableLoading = true;
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
          this.sheetModel = sheetModel;
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
            toBottom.call(this);
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
      this.scrollY = parseInt(e.target.scrollTop);
    }
  },
  created() {
    // getListData1()
    // getListData2()
    // getListData3()
    // getListData4()
    sheetInfo.isSave = true;
    this.$store.commit("upPatientInfo", {});
    setTimeout(() => {
      this.$store.commit("upPatientInfo", this.$route.query);
    }, 100);
    this.bus.$on("addSheetPage", () => {
      addSheetPage(() => {
        this.$nextTick(() => {
          this.bus.$emit("initSheetPageSize");
          // $(this.$refs.scrollCon).animate({
          //   scrollTop:
          //     this.$refs.scrollCon.scrollHeight -
          //     this.$refs.scrollCon.offsetHeight -
          //     190
          // });
          sheetScrollBotton.call(this);
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
      this.pageloading = true;
      this.scrollTop = this.$refs.scrollCon.scrollTop;
      saveBody(this.patientInfo.patientId, this.patientInfo.visitId, decode())
        .then(res => {
          this.$notify.success({
            title: "提示",
            message: "保存成功"
          });
          this.pageloading = false;
          this.getSheetData().then(res => {
            isInitSheetPageSize &&
              setTimeout(() => {
                this.bus.$emit("initSheetPageSize");
              }, 100);
            this.$nextTick(() => {
              this.$refs.scrollCon.scrollTop = this.scrollTop;
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
              }, 100);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
              }, 200);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
              }, 300);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
              }, 400);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
              }, 500);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
              }, 600);
              setTimeout(() => {
                if (this.$refs.scrollCon.scrollTop == 0) {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                }
              }, 1000);
            });
          });
        })
        .catch(() => {
          this.pageloading = false;
        });
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
        // 判断是否存在多签名
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

      window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();
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
    this.bus.$on("openEvalModel", (tr, td) => {
      this.$refs.evalModel.open();
    });
    this.bus.$on("refrehSheetStartPage", () => {
      this.getHomePage();
    });
    this.bus.$on("openPizhuModal", (tr, td) => {
      this.$refs.pizhuModal.open(tr, td);
    });
  },
  watch: {
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
    setPageModal,
    pizhuModal,
    sheetTableNeonatology,
    evalModel
  }
};
</script>
