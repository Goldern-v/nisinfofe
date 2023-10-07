<template>
  <div
    class="contain"
    :class="{ fullpage }"
    v-loading="pageloading"
    element-loading-text="正在保存"
  >
    <div class="head-con" flex>
      <div class="tool-con" flex-box="1">
        <sheetTool2
        ref="sheetTool"
        v-if="sheetTool2Visible"
        :isNursingPreview="isNursingPreview"
        :sheetTitleData="sheetTitleData"
        ></sheetTool2>
      </div>
    </div>
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <div class="right-part" v-loading="tableLoading">
        <div class="sheetTable-contain" ref="scrollCon" @scroll="onScroll">
          <div ref="sheetTableContain">
            <sheetTable
              v-for="(item, index) in filterSheetModel"
              :key="index"
              :data="item.data"
              :index="item.index"
              :length="item.length"
              :isFirst="index === 0"
              :scrollY="scrollY"
              :isInPatientDetails="true"
              :bedAndDeptChange="bedAndDeptChange"
              :listData="listData"
              @onModalChange="onModalChange"
            ></sheetTable>
          </div>
          <div
          v-show="!sheetModelData.length"
            class="null-btn"
            flex="cross:center main:center"
            @click="addSheetPage"
          >
            <i class="el-icon-plus"></i>
            创建体温单
          </div>
        </div>
      </div>
    </div>
    <delPageModal ref="delPageModal" :index="sheetModelData.length"></delPageModal>
    <HjModal ref="HjModal"></HjModal>
    <HdModal ref="HdModal"></HdModal>
    <GuizhouModal ref="GuizhouModal"></GuizhouModal>
    <signModal ref="signModal" title="需要该行签名着确认"></signModal>
    <signModal ref="signModal2" title="签名者确认"></signModal>
    <setPageModal ref="setPageModal"></setPageModal>
    <specialModal ref="specialModal"></specialModal>
    <specialModal2 ref="specialModal2"></specialModal2>
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

  >>> .el-input__inner {
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

/* * 特殊样式 */
>>> .fixed-icon {
  top: 130px !important;
}

>>> .patient-info-slide {
  .slide-con {
    top: 91px !important;
  }
}
</style>

<script>
// import sheetTool2 from "@/Page/sheet-page/components/sheet-tool/sheet-tool.vue";
import patientList from "@/components/patient-list/patient-list.vue";
import sheetTable from "@/Page/sheet-page/components/sheetTable/sheetTable.vue";
import common from "@/common/mixin/common.mixin.js";
import { nursingUnit } from "@/api/lesion";
import sheetModel, {
  addSheetPage,
  delSheetPage,
  initSheetPage,
  cleanData,
  getData,
} from "@/Page/sheet-page/sheet.js";
import { typeList } from "@/api/lesion";
import decode from "@/Page/sheet-page/components/render/decode.js";
import {
  saveBody,
  showBodyByPage,
  showTitle,
  delPage,
  markList,
  splitRecordBlock,
} from "@/api/sheet.js";
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import delPageModal from "@/Page/sheet-page/components/modal/del-page.vue";
import $ from "jquery";
import moment from "moment";
import HjModal from "@/Page/sheet-page/components/modal/hj-modal.vue";
import HdModal from "@/Page/sheet-page/components/modal/hd-modal.vue";
import GuizhouModal from "@/Page/sheet-page/components/modal/guizhou-modal.vue";
import signModal from "@/components/modal/sign.vue";
import specialModal from "@/Page/sheet-page/components/modal/special-modal.vue";
import specialModal2 from "@/Page/sheet-page/components/modal/special-modal2.vue";
import setPageModal from "@/Page/sheet-page/components/modal/setPage-modal.vue";
import pizhuModal from "@/Page/sheet-page/components/modal/pizhu-modal.vue";
import evalModel from "@/Page/sheet-page/components/modal/eval-model/eval-model.vue";
import { getHomePage } from "@/Page/sheet-page/api/index.js";
import { decodeRelObj } from "@/Page/sheet-page/components/utils/relObj";
import { sheetScrollBottom } from "@/Page/sheet-page/components/utils/scrollBottom";
import { patients } from "@/api/lesion";
import { blockSave, getNurseExchageInfo } from "@/Page/sheet-page/api/index";
export default {
  mixins: [common],
  name: "singleTemperatureChart",
  props: {
    isNursingPreview: {//是否为调阅界面体温单调起的护记
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      data: {
        deptValue: "",
        deptList: [],
        bedList: [],
      },
      patientListLoading: false,
      tableLoading: false,
      pageloading: false,
      bus: bus(this),
      sheetModel,
      sheetModelData:[],
      sheetInfo,
      sheetTitleData: {}, // 自定义表头数据
      scrollTop: 0,
      scrollY: 0,
      bedAndDeptChange: {},
      sheetTool2Visible: false,
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
      let resultModel =this.sheetModelData
      return resultModel;
    },
  },
  methods: {
    addSheetPage() {
      // let recordCode = "body_temperature_Hd";
      let recordCode = (() => {
        switch (this.HOSPITAL_ID) {
          case "huadu":
            return "body_temperature_Hd";
          case "hj":
            return "body_temperature_hj";
          // case "liaocheng":
          //   return "body_temperature_lcey";
          case "wujing":
            return "body_temperature_wj";
          case "hengli":
            return "body_temperature_hl";
          default:
            break;
        }
      })();
      blockSave(
        this.patientInfo.patientId,
        this.patientInfo.visitId,
        this.deptCode,
        recordCode
      ).then((res) => {
        this.bus.$emit("getBlockList");
        this.$message.success("创建成功");
      });
    },
    onModalChange(e,tr,x,y,index){
      // 改变当前行状态
      tr.isChange = true
      // // 获取recordDate的下标
      let dateIndex = tr.findIndex(item=>item.key == "recordDate")
      // 如果当前行有recordDate(即是保存过)
      if(tr[dateIndex].value)return
      // // 判断修改的记录是否起始页
      let isStartPage =  index == 0 || y!=0
      // // 获取上条记录
      let preRow = isStartPage ? sheetModel[index].bodyModel[y - 1] : sheetModel[index - 1].bodyModel[sheetModel[index - 1].bodyModel.length - 1]
      let monthIndex = tr.findIndex(item=>item.key == "recordMonth")
      let hourIndex = tr.findIndex(item=>item.key == "recordHour")
      let monthValue = ''
      let hourValue = ''
      if(preRow && (preRow[monthIndex].value || preRow[dateIndex].value || preRow[hourIndex].value)){
        monthValue = preRow[monthIndex].value || moment(preRow[dateIndex].value.split(' ')[0]).format('MM-DD')
        hourValue = preRow[hourIndex].value || preRow[dateIndex].value.split(' ')[1]
      } else {
        monthValue = moment().format('MM-DD')
        hourValue= moment().format('HH:ss')
      }
      ![0,1].includes(x) && !tr[monthIndex].value && (tr[monthIndex].value = monthValue)
      ![0,1].includes(x) && !tr[hourIndex].value && (tr[hourIndex].value = hourValue)
    },
    scrollFun(scrollValue){
      this.$nextTick(() => {
        //不传入参滚动值 默认选择refscrollCon的scrollTop
        this.$refs.scrollCon.scrollTop = scrollValue;
        $(".red-border").removeClass("red-border");
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
        }, 600);
      });

    },
    getSheetData(isBottom) {
      const {startPageIndex,endPageIndex} = this.$store.state.sheet.sheetPageArea
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        setTimeout(() => {
          sheetInfo.isSave = true;
        }, 100);
        return;
      }
      this.tableLoading = true;
      $(".red-border").removeClass("red-border");
      return Promise.all([
        showTitle(this.patientInfo.patientId, this.patientInfo.visitId,startPageIndex,endPageIndex),
        showBodyByPage(this.patientInfo.patientId, this.patientInfo.visitId,startPageIndex,endPageIndex),
        markList(this.patientInfo.patientId, this.patientInfo.visitId),
      ]).then((res) => {
        let titleData = res[0].data.data;
        let bodyData = res[1].data.data;
        let markData = res[2].data.data.list || [];
        this.listData = bodyData.list;

        if (this.HOSPITAL_ID === "huadu") {
          this.bedAndDeptChange = {
            bedLabelChange: bodyData.bedLabel,
            deptNameChange: bodyData.deptName,
          };
        }
        // this.sheetModel = []
        this.$nextTick(async () => {
          await initSheetPage(titleData, bodyData, markData, this.listData);
          this.sheetModelData= getData()
          sheetInfo.relObj = decodeRelObj(bodyData.relObj) || {};
          this.tableLoading = false;
          let timeNum = 10;
          function toBottom() {
            timeNum--;
              //初始化护记数据都设置保存状态为已经保存，放这里运行是借用多次执行判断护记加载完成再设置
                this.sheetInfo.isSave = true;
                const sheetPageScrollValue = localStorage.getItem('sheetPageScrollValue')
                const isBottom = sheetPageScrollValue !== "null" ? false : true
                if (
                  this.$refs.scrollCon.scrollHeight >
                  this.$refs.scrollCon.offsetHeight
                ) {
                  if (isBottom) {
                    sheetScrollBottom.call(this, 0);
                    timeNum > 0 && toBottom.call(this);
                    localStorage.setItem('sheetPageScrollValue', null)
                  } else {
                    this.scrollFun(sheetPageScrollValue)
                  }
                }
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
        localStorage.setItem('sheetPageScrollValue',e.target.scrollTop>0?e.target.scrollTop:null)
      }
    },
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then((res) => {
          let bedList = res.data.data.filter((item) => {
            return item.patientId;
          });
          sheetInfo.bedList = bedList;
        });
      }
    },
  },

  created() {
    // getListData1()
    // getListData2()
    // getListData3()
    // getListData4()
    this.getDate();
    sheetInfo.isSave = true;

    this.$store.commit("upPatientInfo", {});
    setTimeout(() => {
      this.$store.commit("upPatientInfo", this.$route.query);
    }, 100);
    this.bus.$on('clearSheetModel',()=>{
      this.sheetModelData=[]
    })
    this.bus.$on("addSheetPage", () => {
      if (!this.sheetInfo.selectBlock.id) {
        return this.$notify.info({
          title: "提示",
          message: "请先创建体温单",
        });
      }
      addSheetPage(() => {
        this.bus.$emit("initSheetPageSize",true);
        this.sheetModelData = getData()
        this.$nextTick(() => {
          /**添加页码重新赋值*/
            sheetScrollBottom.call(this);
        });

      });
    });
    this.bus.$on("delSheetPage", () => {
      this.$refs.delPageModal.open(async (checkList) => {
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
          message: "删除成功",
        });
      });
    });
    this.bus.$on("saveSheetPage", (isInitSheetPageSize = true,ayncVisitedData) => {
      let save = () => {
        this.pageLoading = true;
        const ayncVisitedData = ayncVisitedData
        this.scrollTop = this.$refs.scrollCon.scrollTop;
        saveBody(this.patientInfo.patientId, this.patientInfo.visitId, decode(ayncVisitedData))
          .then((res) => {
             let isdischarge = decode(ayncVisitedData).list.find(item => item.topComment == '出院|')
              if(this.sheetInfo.sheetType == 'body_temperature_Hd' && isdischarge){
                this.$confirm(
                    `体温单出院时间已填写为：${isdischarge.recordYear}-${isdischarge.recordMonth} ${isdischarge.recordHour}，请及时完成应归档记录!`,
                    {
                      confirmButtonText: "确定",
                      showCancelButton: false,
                      type: "warning",
                    }
                  ).then((res)=>{
                    // this.pageLoading = false;
                    this.$notify.success({
                      title: "提示",
                      message: "保存成功",
                      duration: 1000,
                    });
                  })
              }else{
                this.$notify.success({
                  title: "提示",
                  message: "保存成功",
                  duration: 1000,
                });
              }
            // this.$notify.success({
            //   title: "提示",
            //   message: "保存成功",
            // });
            this.getSheetData().then((res) => {
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
        reverseList.find((item) => item.recordDate && item.recordHour) || {}
      ).recordHour;
      /** 所有新增的时间 */
      let newRecordHours = reverseList
        .filter(
          (item) => item.recordHour && !item.recordMonth && !item.recordDate
        )
        .map((item) => item.recordHour);
      /** 新增记录是否存在比原有记录更前 */
      let isBefore = newRecordHours.some(
        (item) =>
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
            type: "warning",
          }
        ).then((res) => {
          save();
        });
      } else {
        save();
      }
    });
    this.bus.$on("refreshSheetPage", (isFirst) => {
      this.getSheetData(isFirst);
    });
    this.bus.$on("toSheetPrintPage", (newWid) => {
      if ($(".sign-text").length) {
        // 判断是否存在标记
        if ($(".mark-mark-mark").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".mark-mark-mark").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              150,
          });
          return this.$message.warning("打印前必须去除所有标记");
        }
        // 判断是否存在未签名
        if ($(".noSignRow").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".noSignRow").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              150,
          });
          return this.$message.warning("存在未签名的记录，请全部签名后再打印");
        }
        // 判断是否存在多签名
        if ($(".multiSign").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".multiSign").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              150,
          });
          return this.$message.warning("记录存在多个签名，或者忘记填写时间");
        }
      }

      if (
        $(".sheet-page-container-hemodialysis .isNoSign") &&
        $(".sheet-page-container-hemodialysis .isNoSign").length
      ) {
        $(".signTd").eq(0).addClass("red-border");
        $(this.$refs.scrollCon).animate({
          scrollTop:
            $(".sheet-page-container-hemodialysis .isNoSign").eq(0).offset()
              .top +
            this.$refs.scrollCon.scrollTop -
            150,
        });
        return this.$message.warning("存在未签名的记录，请全部签名后再打印");
      }

      // window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();
      // 对存储空间不够做处理
      try {
        window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();
      } catch (err) {
        // 可能要预留下来的 暂时不移除
        let keys = [
          "selectDeptValue",
          "rememberAccount",
          "ppp",
          "user",
          "adminNurse",
        ];
        for (let key in localStorage) {
          if (!keys.includes(key)) {
            localStorage.removeItem(key);
          }
        }
        window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();
      }

      // let printUrl = "";
      // if (process.env.NODE_ENV === "production") {
      //   this.$message.info("正在准备打印，请勿重复操作");
      //   printUrl = "/crNursing/print/sheetPage?toPrint=true";
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
    this.bus.$on("openHDModal", () => {
      this.$refs.HdModal.open();
    });
    this.bus.$on("openGuizhouModal", () => {
      this.$refs.GuizhouModal.open();
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
    this.bus.$on("setSheetTableLoading", (state = false) => {
      this.tableLoading = state;
    });
    this.bus.$on("splitSheet", (tr, td) => {
      this.$refs.signModal2.open((password, empNo) => {
        let recordDate = tr.find((item) => item.key == "recordDate").value;
        recordDate = recordDate
          ? moment(recordDate).format("YYYY-MM-DD HH:mm")
          : recordDate;
        splitRecordBlock(empNo, password, recordDate).then((res) => {
          this.bus.$emit("getBlockList");
          this.$message.success("创建成功");
          this.bus.$emit("setSheetTableLoading", true);
        });
      });
    });
  },
  mounted() {
    setTimeout(() => {
      this.sheetTool2Visible = true;
    }, 100);
  },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
      }
    },
    sheetModel: {
      deep: true,
      handler() {
        if (this.patientInfo.name) {
          sheetInfo.isSave = false;
        }
      },
    },
  },
  beforeRouteLeave: (to, from, next) => {
    if (!sheetInfo.isSave) {
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
    sheetTool2: () =>
      import("@/Page/sheet-page/components/sheet-tool/sheet-tool.vue"),
    patientList,
    sheetTable,
    delPageModal,
    HjModal,
    HdModal,
    GuizhouModal,
    signModal,
    specialModal,
    specialModal2,
    setPageModal,
    pizhuModal,
    evalModel,
  },
};
</script>
