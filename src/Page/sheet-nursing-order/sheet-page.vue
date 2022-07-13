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
      top: -41px;
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
  addNewNursingOrderSheetPage,
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
import { updateListData } from "@/Page/sheet-nursing-order/components/config/general/tr.js";
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
      // console.log("addNursingOrderSheetPage", this.patientInfo);
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
      // console.log("getSheetData", data, this.sheetInfo);
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        setTimeout(() => {
          sheetInfo.isSave = true;
        }, 100);
        return;
      }
      // return null
      this.tableLoading = true;
      return Promise.all([
        // showTitle(this.patientInfo.patientId, this.patientInfo.visitId),
        showBody(this.sheetInfo.selectBlock.id),
        // markList(this.patientInfo.patientId, this.patientInfo.visitId)
      ]).then((res) => {
        // console.log("服务器返回护嘱单数据：showTitle,showBody,markList", res);
        let titleData = []; //res[0].data.data
        let bodyData = res[0].data.data;
        let markData = []; //res[2].data.data.list || []

        this.sheetModel = [];
        this.$nextTick(() => {
          this.sheetModel = sheetModel;
          // sheetInfo.selectBlock.id = bodyData.id
          // console.log(
          //   "titleData, bodyData, markData",
          //   titleData,
          //   bodyData,
          //   markData,
          //   sheetInfo
          // );
          initNursingOrderSheetPage(titleData, bodyData, markData);
          this.getHomePage(isBottom);

          if (bodyData && bodyData.list && bodyData.list.length > 0) {
            sheetInfo.formTitle = bodyData.list[0].formTitle;
            this.sheetInfo.formTitle = bodyData.list[0].formTitle;
            sheetInfo.orderContentCode =
              bodyData.list[0].orderContentCode || "orders:public:通用护嘱内容";
            this.sheetInfo.orderContentCode =
              bodyData.list[0].orderContentCode || "orders:public:通用护嘱内容";

            if (this.sheetInfo.orderContentCode) {
              let dictFormName =
                this.sheetInfo.orderContentCode.split(":")[2] || "";
              let dicData = {
                type: "orders",
                code: "public",
                formName: dictFormName,
              };
              if (this.HOSPITAL_ID === "hj") {
                updateListDataHj(dicData);
              } else {
                updateListData(dicData);
              }
            }
          }

          this.sheetInfo.isSave = true;
          sheetInfo.isSave = true;

          this.tableLoading = false;
          // setTimeout(() => {
          //   sheetInfo.isSave = true
          //   if (isBottom) {
          //     this.$refs.scrollCon.scrollTop = this.$refs.scrollCon.scrollHeight - this.$refs.scrollCon.offsetHeight - 190
          //   }
          // }, 100)
          // setTimeout(() => {
          //   sheetInfo.isSave = true
          //   if (isBottom && this.$refs.scrollCon.scrollTop == 0) {
          //     this.$refs.scrollCon.scrollTop = this.$refs.scrollCon.scrollHeight - this.$refs.scrollCon.offsetHeight - 190
          //   }
          // }, 300)
          // setTimeout(() => {
          //   sheetInfo.isSave = true
          //   if (isBottom && this.$refs.scrollCon.scrollTop == 0) {
          //     this.$refs.scrollCon.scrollTop = this.$refs.scrollCon.scrollHeight - this.$refs.scrollCon.offsetHeight - 190
          //   }
          // }, 500)
          // setTimeout(() => {
          //   sheetInfo.isSave = true
          //   if (isBottom && this.$refs.scrollCon.scrollTop == 0) {
          //     this.$refs.scrollCon.scrollTop = this.$refs.scrollCon.scrollHeight - this.$refs.scrollCon.offsetHeight - 190
          //   }
          // }, 1000)
        });
      });
    },
    breforeQuit(next) {
      // if (!sheetInfo.isSave) {
      //   window.app
      //     .$confirm("护嘱单还未保存，离开将会丢失数据", "提示", {
      //       confirmButtonText: "离开",
      //       cancelButtonText: "取消",
      //       type: "warning",
      //     })
      //     .then((res) => {
      //       next();
      //     });
      // } else {
        next();
      // }
    },
    getHomePage(isFirst) {
      getHomePage(this.patientInfo.patientId, this.patientInfo.visitId).then(
        (res) => {
          // console.log("getHomePage", res);
          this.sheetInfo.sheetStartPage =
            (res.data.data && res.data.data.indexNo) || 1;
          this.sheetInfo.sheetMaxPage =
            (res.data.data && res.data.data.maxIndexNo) || 1;
          isFirst && this.bus.$emit("initNursingOrderSheetPageSize");
        }
      );
    },
    getDict() {
      // console.log(
      //   "this.patientInfo",
      //   this.patientInfo,
      //   this.patientInfo.wardCode
      // );
      // orderApi
      listItem(this.patientInfo.wardCode).then((res) => {
        // console.log("获取字典", res);
      });
    },
    isSelectPatient(item) {
      sheetInfo.selectBlock = {};
      this.$store.commit("upPatientInfo", item);
    },
  },
  created() {
    cleanData();
    this.getDate();
    // getListData1()
    // getListData2()
    // getListData3()
    // getListData4()
    // this.getDict()
    // updateListData(this.patientInfo.wardCode)

    // let dicData={type:'orders',code:'public',formName:'神内护嘱单'}
    // updateListData(dicData)

    sheetInfo.isSave = true;
    sheetInfo.selectBlock = {};

    this.$store.commit("upPatientInfo", {});
    setTimeout(() => {
      this.$store.commit("upPatientInfo", this.$route.query);
    }, 100);
    this.bus.$on(
      "addNewNursingOrderSheetPage",
      (message = "新建护嘱单成功") => {
        //
        // console.log("!!初始化护嘱单页面...");
        addNewNursingOrderSheetPage(() => {
          this.$nextTick(() => {
            // addNursingOrderSheetPage
            this.bus.$emit("initNursingOrderSheetPageSize");
            //  $(this.$refs.scrollCon).animate({
            //   scrollTop: this.$refs.scrollCon.scrollHeight - this.$refs.scrollCon.offsetHeight - 190
            // })
            this.bus.$emit("refreshNursingOrderSheetPage", true);

            this.bus.$emit("addNursingOrderSheetPage");
            if (message) {
              this.$notify.success({
                title: "提示",
                message: message,
              });
            }
          });
        });
      }
    );
    this.bus.$on("addNursingOrderSheetPage", () => {
      // console.log("新建护嘱单页面");
      addNursingOrderSheetPage(() => {
        this.$nextTick(() => {
          this.bus.$emit("initNursingOrderSheetPageSize");
          //  $(this.$refs.scrollCon).animate({
          //   scrollTop: this.$refs.scrollCon.scrollHeight - this.$refs.scrollCon.offsetHeight - 190
          // })
        });
      });
    });
    this.bus.$on("delNursingOrderSheetPage", () => {
      this.$refs.delPageModal.open(async (checkList) => {
        //
        // console.log("删除护嘱单", checkList, sheetInfo.selectBlock.id);
        // for (let item of checkList.sort((a, b) => { return b - a })) {
        //   await delPage(this.patientInfo.patientId, this.patientInfo.visitId, item - 1)
        //   await delPage(id,empNo,password)
        //   delNursingOrderSheetPage(item - 1)
        // }
        this.$notify.success({
          title: "提示",
          message: "删除成功",
        });
      });
    });
    this.bus.$on("saveNursingOrderSheetPage", () => {
      // console.log("")
      this.pageloading = true;
      this.scrollTop = this.$refs.scrollCon.scrollTop;
      saveBody(this.patientInfo.patientId, this.patientInfo.visitId, decode())
        .then((res) => {
          // console.log(
          //   "保存成功-saveBody",
          //   this.sheetModel.length,
          //   this.sheetModel,
          //   res
          // );
          this.$notify.success({
            title: "提示",
            message: "保存成功",
          });
          if (this.sheetModel.length > 0) {
            this.bus.$emit("getNOBlockList");
          }
          this.pageloading = false;
          this.sheetInfo.isSave = true;
          sheetInfo.isSave = true;
          // this.getSheetData().then(res => {
          //   console.log('保存成功-获取数据',res);
          //   this.$nextTick(() => {

          //     this.$refs.scrollCon.scrollTop = this.scrollTop
          //      setTimeout(() => {
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
          //   })
          // })
          //
        })
        .catch(() => {
          this.pageloading = false;
        });
    });
    this.bus.$on("refreshNursingOrderSheetPage", (isFirst, data) => {
      // console.log("更新护嘱单页面", isFirst, data);
      this.getSheetData(isFirst, data);
    });
    this.bus.$on("toNursingOrderSheetPrintPage", (newWid) => {
      // console.log("启动护嘱单打印页", newWid, this.$refs.sheetTableContain);
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
        this.$router.push(`/print/sheetNursingOrder`);
      }
    });
    this.bus.$on("openNOHJModal", () => {
      this.$refs.HjModal.open();
    });
    this.bus.$on("openNOSetPageModal", () => {
      this.$refs.setPageModal.open();
    });
    this.bus.$on("refrehNursingOrderSheetStartPage", (isFirst) => {
      this.getHomePage(isFirst);
    });
    this.bus.$on("openPizhuModal", (tr, td) => {
      this.$refs.pizhuModal.open(tr, td);
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
      handler: function (newVal, oldVal) {
        console.dir();
        // console.log('患者姓名',this.patientInfo.name,this.patientInfo,sheetModel,sheetInfo.isSave,newVal, oldVal)
        if (this.patientInfo.name && newVal != oldVal) {
          sheetInfo.isSave = false;
        }
      },
    },
  },
  // beforeRouteLeave: (to, from, next) => {
    // console.log("离开页面", sheetInfo.isSave);
    // if (!sheetInfo.isSave) {
    //   window.app
    //     .$confirm("护嘱单还未保存，离开页面将会丢失数据", "提示", {
    //       confirmButtonText: "离开",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     })
    //     .then((res) => {
    //       next();
    //     });
    // } else {
      // next();
    // }
  // },
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
