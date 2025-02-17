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
        <sheetTool></sheetTool>
      </div>
    </div>
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <div class="left-part">
        <patientList
          :data="data.bedList"
          v-loading="patientListLoading"
        ></patientList>
      </div>
      <div class="right-part" v-loading="tableLoading">
        <div class="sheetTable-contain" ref="scrollCon">
          <div ref="sheetTableContain">
            <sheetTable
              v-for="(item, index) in filterSheetModel"
              :key="index"
              :data="item.data"
              :index="item.index"
              :length="item.length"
            ></sheetTable>
          </div>
          <div
            v-show="sheetModel.length == 0"
            class="null-btn"
            flex="cross:center main:center"
            @click="addSheetPage"
          >
            <i class="el-icon-plus"></i>
            创建导尿管
          </div>
        </div>
      </div>
    </div>
    <delPageModal ref="delPageModal" :index="sheetModel.length"></delPageModal>
    <HjModal ref="HjModal"></HjModal>
    <signModal ref="signModal" title="需要该行签名者确认"></signModal>
    <specialModal ref="specialModal"></specialModal>
    <setPageModal ref="setPageModal"></setPageModal>
    <pizhuModal ref="pizhuModal"></pizhuModal>
    <setDiagsModal ref="setDiagsModal"></setDiagsModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
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
      top: 0;
      bottom: 0;
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      overflow: hidden;
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
import sheetTool from "./components/sheet-tool/sheet-tool.vue";
import patientList from "./components/patient-list/patient-list.vue";
import sheetTable from "./components/sheetTable/sheetTable.vue";
import common from "@/common/mixin/common.mixin.js";
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
  saveRelObj
} from "./api/sheet.js";
import sheetInfo from "./components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import delPageModal from "./components/modal/del-page.vue";
import $ from "jquery";
import HjModal from "./components/modal/hj-modal.vue";
import signModal from "@/components/modal/sign.vue";
import specialModal from "./components/modal/special-modal.vue";
import setPageModal from "./components/modal/setPage-modal.vue";
import pizhuModal from "./components/modal/pizhu-modal.vue";
import setDiagsModal from "./components/modal/set-diags.vue";
import { getHomePage } from "./api/index.js";
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
      typeList: [] // 科室类型
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
    }
  },
  methods: {
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {
          showMonitor: true
        }).then(res => {
          this.data.bedList = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
          sheetInfo.isSave = true;
        });
      }
    },
    addSheetPage() {
      // if (this.sheetInfo.selectBlock.id) {
      this.bus.$emit("openNewSheetModal");
      // addSheetPage()
      // } else {
      //   this.$notify.info({
      //     title: '提示',
      //     message: '请先创建护理记录单'
      //   });
      // }
    },
    getSheetData(isBottom) {
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        setTimeout(() => {
          sheetInfo.isSave = true;
        }, 400);
        return;
      }
      this.tableLoading = true;
      $(".red-border").removeClass("red-border");
      return Promise.all([
        showBody(this.patientInfo.patientId, this.patientInfo.visitId),
        markList(this.patientInfo.patientId, this.patientInfo.visitId)
      ]).then(res => {
        let bodyData = res[0].data.data;
        let markData = res[1].data.data.list || [];
        this.sheetInfo.relObjs = bodyData.relObjs;
        if (this.sheetInfo.relObjs.length == 0) {
          this.sheetInfo.relObjs.push({
            pageNo: "1",
            relObj: {}
          });
        }
        this.$nextTick(() => {
          // this.sheetModel = sheetModel
          initSheetPage([], bodyData, markData);
          this.getHomePage(isBottom);

          this.tableLoading = false;
          setTimeout(() => {
            this.sheetInfo.isSave = true;
          }, 200);
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
      // getHomePage(this.patientInfo.patientId, this.patientInfo.visitId).then(
      //   res => {
      //     this.sheetInfo.sheetStartPage =
      //       (res.data.data && res.data.data.indexNo) || 1;
      //     this.sheetInfo.sheetMaxPage =
      //       (res.data.data && res.data.data.maxIndexNo) || 1;
      //     isFirst && this.bus.$emit("initSheetPageSize");
      //   }
      // );
      this.sheetInfo.sheetStartPage = 1;
      this.sheetInfo.sheetMaxPage = 1;
      isFirst && this.bus.$emit("initSheetPageSize");
    }
  },
  created() {
    // 初始化
    cleanData();
    if (this.deptCode) {
      this.getDate();
    }
    this.bus.$on("addSheetPage", () => {
      addSheetPage(() => {
        this.$nextTick(() => {
          this.bus.$emit("initSheetPageSize");
          this.$nextTick(() => {
            $(this.$refs.scrollCon).animate({
              scrollTop:
                this.$refs.scrollCon.scrollHeight -
                this.$refs.scrollCon.offsetHeight -
                400
            });
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
      this.pageLoading = true;
      this.scrollTop = this.$refs.scrollCon.scrollTop;
      saveBody(this.patientInfo.patientId, this.patientInfo.visitId, decode())
        .then(res => {
          this.$notify.success({
            title: "提示",
            message: "保存成功"
          });
          this.bus.$emit("refrehCatheterPatientList");
          this.getSheetData().then(res => {
            isInitSheetPageSize &&
              setTimeout(() => {
                this.bus.$emit("initSheetPageSize");
              }, 100);
            this.$nextTick(() => {
              this.$refs.scrollCon.scrollTop = this.scrollTop;
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
            }, 400);
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
              $(".red-border").removeClass("red-border");
            }, 500);
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
      saveRelObj(sheetInfo.selectBlock.id, sheetInfo.relObjs).then(res => {
        this.$notify.success({
          title: "提示",
          message: "保存成功"
        });
      });
    });
    this.bus.$on("refreshSheetPage", isFirst => {
      this.getSheetData(isFirst);
    });
    this.bus.$on("toSheetPrintPage", newWid => {
      // 判断是否存在标记
      if ($(".mark-mark-mark").length) {
        $(this.$refs.scrollCon).animate({
          scrollTop:
            $(".mark-mark-mark")
              .eq(0)
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
    this.bus.$on("openPizhuModal", (tr, td) => {
      this.$refs.pizhuModal.open(tr, td);
    });
    this.bus.$on("openSetDiagsModal", obj => {
      this.$refs.setDiagsModal.open(obj);
    });
    this.bus.$on("refrehSheetStartPage", () => {
      this.getHomePage();
    });
    this.bus.$on("refrehCatheterPatientList", this.getDate);
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
    setPageModal,
    pizhuModal,
    setDiagsModal
  }
};
</script>
