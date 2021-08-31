<template>
  <div
    class="contain"
    :class="{ fullpage }"
    v-loading="pageLoading"
    element-loading-text="正在保存"
  >
    <div class="head-con" flex>
      <div class="dept-select-con"></div>
      <div
        class="tool-con"
        v-bind:style="[
          sheetModel.length === 0
            ? 'pointer-events: none;'
            : 'pointer-events: visible;',
        ]"
        flex-box="1"
      >
        <sheetTool></sheetTool>
        <!-- pointer-events: none; -->
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
          :isSelectPatient="isSelectPatient"
          v-loading="patientListLoading"
        ></patientList>
      </div>
      <div class="right-part" v-loading="tableLoading">
        <div class="sheetTable-contain" ref="scrollCon">
          <div ref="sheetTableContain">
            <sheetTable
              v-for="(item, index) in sheetModel"
              :key="index"
              :data="item"
              :index="index"
              :length="sheetModel.length"
            ></sheetTable>
          </div>
          <div
            v-show="sheetModel.length == 0"
            class="null-btn"
            flex="cross:center main:center"
            @click="addNursingOrderSheetPage"
          >
            <i class="el-icon-plus"></i>
            创建护理文书
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

.disable-tool-con {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
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
import patientList from "@/components/patient-list/patient-list.vue";
import sheetTable from "./components/sheetTable/sheetTable.vue";
import common from "@/common/mixin/common.mixin.js";

import { typeList } from "@/api/lesion";
import sheetModel, {
  addNursingOrderSheetPage,
  delNursingOrderSheetPage,
  initNursingOrderSheetPage,
  cleanData,
} from "./sheet.js";
import { patients } from "@/api/lesion";
import orderApi from "./api/nursingOrder.js";
import decode from "./components/render/decode.js";
import {
  saveBody,
  showBody,
  showTitle,
  delPage,
  markList,
} from "@/api/nursingOrderSheet.js";
import sheetInfo from "./components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import delPageModal from "./components/modal/del-page.vue";
import $ from "jquery";
import HjModal from "./components/modal/hj-modal.vue";
import signModal from "@/components/modal/sign.vue";
// import { getListData1 } from '@/Page/sheet-nursing-order/components/config/endocrinology/tr.js'
// import { getListData2 } from '@/Page/sheet-nursing-order/components/config/gynecology/tr.js'
// import { getListData3 } from '@/Page/sheet-nursing-order/components/config/joint/tr.js'
// import { getListData4 } from '@/Page/sheet-nursing-order/components/config/neurology/tr.js'
import specialModal from "@/Page/sheet-nursing-order/components/modal/special-modal.vue";
import setPageModal from "@/Page/sheet-nursing-order/components/modal/setPage-modal.vue";
import pizhuModal from "@/Page/sheet-nursing-order/components/modal/pizhu-modal.vue";
import { getHomePage } from "@/Page/sheet-nursing-order/api/index.js";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: [],
      },
      patientListLoading: false,
      pageLoading: false,
      tableLoading: false,
      bus: bus(this),
      sheetModel,
      sheetInfo,
      scrollTop: 0,
      typeList: [], // 科室类型
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
  },
  methods: {
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then((res) => {
          this.data.bedList = res.data.data.filter((item) => {
            return item.patientId;
          });
          this.patientListLoading = false;
          this.sheetInfo.isSave = true;
        });
      }
    },
    addNursingOrderSheetPage() {
      if (this.patientInfo.name) {
        this.bus.$emit("openNewNOrderSheetModal");
        // addNursingOrderSheetPage()
      } else {
        this.$notify.info({
          title: "提示",
          message: "请选择一名患者",
        });
      }
    },
    getSheetData(isBottom, data = {}) {
      console.log("getSheetData", data, this.sheetInfo);
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        setTimeout(() => {
          this.sheetInfo.isSave = true;
        }, 300);
        return;
      }
      // console.log('getSheetData',data,this.sheetInfo)
      this.tableLoading = true;
      return Promise.all([
        // showTitle(this.patientInfo.patientId, this.patientInfo.visitId),
        showBody(this.sheetInfo.selectBlock.id),
        // markList(this.patientInfo.patientId, this.patientInfo.visitId)
      ]).then((res) => {
        console.log("获取护嘱表数据", res);
        let titleData = []; //res[0].data.data
        let bodyData = res[0].data.data;
        let markData = []; //res[2].data.data.list || []
        // this.sheetModel = []
        this.$nextTick(() => {
          // this.sheetModel = sheetModel
          initNursingOrderSheetPage(titleData, bodyData, markData);
          // this.getHomePage(isBottom)

          this.tableLoading = false;
          setTimeout(() => {
            this.sheetInfo.isSave = true;
            if (isBottom) {
              this.$refs.scrollCon.scrollTop =
                this.$refs.scrollCon.scrollHeight -
                this.$refs.scrollCon.offsetHeight -
                190;
            }
          }, 2000);
          setTimeout(() => {
            this.sheetInfo.isSave = true;
            if (isBottom && this.$refs.scrollCon.scrollTop == 0) {
              this.$refs.scrollCon.scrollTop =
                this.$refs.scrollCon.scrollHeight -
                this.$refs.scrollCon.offsetHeight -
                190;
            }
          }, 300);
          setTimeout(() => {
            this.sheetInfo.isSave = true;
            if (isBottom && this.$refs.scrollCon.scrollTop == 0) {
              this.$refs.scrollCon.scrollTop =
                this.$refs.scrollCon.scrollHeight -
                this.$refs.scrollCon.offsetHeight -
                190;
            }
          }, 500);
          setTimeout(() => {
            this.sheetInfo.isSave = true;
            if (isBottom && this.$refs.scrollCon.scrollTop == 0) {
              this.$refs.scrollCon.scrollTop =
                this.$refs.scrollCon.scrollHeight -
                this.$refs.scrollCon.offsetHeight -
                190;
            }
          }, 1000);
        });
      });
    },
    breforeQuit(next) {
      if (this.sheetInfo.isSave != true) {
        window.app
          .$confirm("评估单还未保存，离开将会丢失数据", "提示", {
            confirmButtonText: "离开",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then((res) => {
            next();
          });
      } else {
        next();
      }
    },
    getHomePage(isFirst) {
      getHomePage(this.patientInfo.patientId, this.patientInfo.visitId).then(
        (res) => {
          console.log("getHomePage", res);
          this.sheetInfo.sheetStartPage =
            (res.data.data && res.data.data.indexNo) || 1;
          this.sheetInfo.sheetMaxPage =
            (res.data.data && res.data.data.maxIndexNo) || 1;
          isFirst && this.bus.$emit("initNursingOrderSheetPageSize");
        }
      );
    },
    getDict() {
      console.log("this.patientInfo", this.patientInfo);
      // orderApi
      orderApi.listItem().then((res) => {
        console.log("获取字典", res);
      });
    },
    getList() {
      // list
      orderApi
        .list(this.patientInfo.patientId, this.patientInfo.visitId)
        .then((res) => {
          console.log("获取字典", res);
        });
    },
    isSelectPatient(item) {
      this.$store.commit("upPatientInfo", item);
    },
  },
  created() {
    // 初始化
    cleanData();
    // 下拉
    // getListData1()
    // getListData2()
    // getListData3()
    // getListData4()
    this.getDict();

    if (this.deptCode) {
      this.getDate();
    }
    this.bus.$on("addNursingOrderSheetPage", (e) => {
      console.log("ON.addNursingOrderSheetPage", e);
      addNursingOrderSheetPage((e) => {
        console.log("addNursingOrderSheetPage", e);
        this.$nextTick((e) => {
          this.bus.$emit("initNursingOrderSheetPageSize");
          $(this.$refs.scrollCon).animate({
            scrollTop:
              this.$refs.scrollCon.scrollHeight -
              this.$refs.scrollCon.offsetHeight -
              190,
          });
        });
      });
    });
    this.bus.$on("delNursingOrderSheetPage", () => {
      this.$refs.delPageModal.open(async (checkList) => {
        for (let item of checkList.sort((a, b) => {
          return b - a;
        })) {
          await delPage(
            this.patientInfo.patientId,
            this.patientInfo.visitId,
            item - 1
          );
          delNursingOrderSheetPage(item - 1);
        }
        this.$notify.success({
          title: "提示",
          message: "删除成功",
        });
      });
    });
    this.bus.$on("saveNursingOrderSheetPage", () => {
      this.pageLoading = true;
      this.scrollTop = this.$refs.scrollCon.scrollTop;
      saveBody(this.patientInfo.patientId, this.patientInfo.visitId, decode())
        .then((res) => {
          this.sheetInfo.isSave = true;
          this.$notify.success({
            title: "提示",
            message: "保存成功",
          });
          // this.getSheetData().then(res => {
          //   this.$nextTick(() => {
          //     this.$refs.scrollCon.scrollTop = this.scrollTop
          //   })
          //   setTimeout(() => {
          //     if (this.$refs.scrollCon.scrollTop == 0) {
          //       this.$refs.scrollCon.scrollTop = this.scrollTop
          //     }
          //   }, 100)
          //   setTimeout(() => {
          //     if (this.$refs.scrollCon.scrollTop == 0) {
          //       this.$refs.scrollCon.scrollTop = this.scrollTop
          //     }
          //   }, 200)
          //   setTimeout(() => {
          //     if (this.$refs.scrollCon.scrollTop == 0) {
          //       this.$refs.scrollCon.scrollTop = this.scrollTop
          //     }
          //   }, 300)
          //   setTimeout(() => {
          //     if (this.$refs.scrollCon.scrollTop == 0) {
          //       this.$refs.scrollCon.scrollTop = this.scrollTop
          //     }
          //   }, 400)
          //   setTimeout(() => {
          //     if (this.$refs.scrollCon.scrollTop == 0) {
          //       this.$refs.scrollCon.scrollTop = this.scrollTop
          //     }
          //   }, 500)
          //   setTimeout(() => {
          //     if (this.$refs.scrollCon.scrollTop == 0) {
          //       this.$refs.scrollCon.scrollTop = this.scrollTop
          //     }
          //   }, 600)
          //   setTimeout(() => {
          //     if (this.$refs.scrollCon.scrollTop == 0) {
          //       this.$refs.scrollCon.scrollTop = this.scrollTop
          //     }
          //   }, 1000)

          // })
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
        });
    });
    this.bus.$on("refreshNursingOrderSheetPage", (isFirst, data) => {
      console.log("-更新护嘱单页面", isFirst, data);
      this.getSheetData(isFirst, data);
    });
    this.bus.$on("toNursingOrderSheetPrintPage", (newWid) => {
      // 判断是否存在标记
      if ($(".mark-mark-mark").length) {
        $(this.$refs.scrollCon).animate({
          scrollTop:
            $(".mark-mark-mark").eq(0).offset().top +
            this.$refs.scrollCon.scrollTop -
            150,
        });
        return this.$message.warning("打印前必须去除所有标记");
      }
      // 判断是否存在未签名
      if ($(".noSignRow").length) {
        $(this.$refs.scrollCon).animate({
          scrollTop:
            $(".noSignRow").eq(0).offset().top +
            this.$refs.scrollCon.scrollTop -
            150,
        });
        return this.$message.warning("存在未签名的记录，请全部签名后再打印");
      }
      window.localStorage.sheetNursingOrderModel = $(
        this.$refs.sheetTableContain
      ).html();
      if (process.env.NODE_ENV === "production") {
        newWid.location.href = "/crNursing/print/sheetNursingOrder";
      } else {
        // this.$router.push(`/print/sheetNursingOrder`)
        let routeData = this.$router.resolve({
          path: `/print/sheetNursingOrder`,
        });
        window.open(routeData.href, "_blank");
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
    this.bus.$on("refrehNursingOrderSheetStartPage", () => {
      this.getHomePage();
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
          this.sheetInfo.isSave = false;
        }
      },
    },
  },
  beforeRouteLeave: (to, from, next) => {
    if (!this.sheetInfo.isSave) {
      window.app
        .$confirm("评估单还未保存，离开将会丢失数据", "提示", {
          confirmButtonText: "离开",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then((res) => {
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
  },
};
</script>
