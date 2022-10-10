<template>
  <div>
    <!-- 护嘱单顶部控制工具 -->
    <div class="tool-contain" flex="cross:center">
      <div class="item-box" flex="cross:center main:center" @click="addSheet">
        <div class="text-con">添加新页</div>
      </div>
      <!-- <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('delNursingOrderSheetPage')">
                  <div class="icon-box">
                    <i class="icon-shanchu1 iconfont" style="font-size: 14px;color:#E55E01;"></i>
                  </div>
                  <div class="text-con">
                    删除记录单
                  </div>
                </div> -->
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="emit('saveNursingOrderSheetPage')"
      >
        <div class="text-con" flex="cross:center">保存</div>
      </div>
      <!-- <div class="item-box" flex="cross:center main:center" @click="emit('openHJModal')">
        <div class="text-con">
          出入量统计
        </div>
      </div>
      <div class="item-box" flex="cross:center main:center" @click="setPage" style="width: 100px">
        <div class="text-con">
          设置起始页({{sheetInfo.sheetStartPage}})
        </div>
      </div> -->
      <div class="item-box" flex="cross:center main:center" @click="toPrint">
        <div class="text-con">打印</div>
      </div>

      <!-- <div class="item-box" flex="cross:center main:center" @click.stop="toMoreSign">
        <div class="text-con">
          批量签名
        </div>
      </div> -->
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="delSheet"
      >
        <div class="text-con">删除整单</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="bus.$emit('createNursingOrderPage', true)"
      >
        <div class="text-con">新建护嘱单</div>
      </div>
      <!-- <div class="item-box" flex="cross:center main:center" @click.stop="delSheet">
        <div class="text-con">
          删除整单
        </div>
      </div> -->
      <!-- <div class="item-box" flex="cross:center main:center" @click.stop="createSheet" style="width: 100px">
        <div class="text-con">
          新建护嘱单
        </div>
      </div> -->
      <div flex-box="1"></div>

      <span class="label">护嘱记录：</span>
      <el-select
        v-model="sheetInfo.selectBlock"
        @change="changeSelectBlock"
        value-key="id"
        placeholder="请选择护嘱单"
        class="select-con"
        popper-class="sheetSelect-con"
      >
        <div class="head-con" flex="cross:stretch">
          <div class="col-1">护嘱单标题</div>
          <div class="col-2">科室</div>
          <div class="col-3">创建时间</div>
        </div>
        <el-option
          v-for="item in sheetBlockList"
          :key="item.id"
          :label="blockLabel(item)"
          :value="item"
        >
          <div class="list-con" flex="cross:stretch">
            <!-- <div class="col-1" :title="item.recordName">{{item.recordName}}</div> -->
            <div class="col-1" :title="item.formTitle">
              {{ item.formTitle || "护嘱单" }}
            </div>
            <div class="col-2" :title="item.deptName">{{ item.deptName }}</div>
            <div class="col-3" :title="item.createDate">
              {{ item.createDate }}
            </div>
          </div>
        </el-option>
      </el-select>
      <!-- <span class="label">页码范围:</span>
      <div class="item-box" style="width: 105px" flex="cross:center main:center">
        <el-autocomplete class="pegeSelect" icon="caret-bottom" placeholder="请输入页码" v-model="pageArea" :fetch-suggestions="querySearch"></el-autocomplete>
      </div> -->
      <!-- <div class="item-box" flex="cross:center main:center" @click="tofull">
          <div class="text-con">
            <span v-if="fullpage">关闭全屏</span>
            <span v-else>全屏</span>
          </div>
        </div> -->
      <div style="width: 5px"></div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="showSheetDescription"
      >
        <div class="text-con">护嘱单说明</div>
      </div>
      <div style="width: 5px"></div>
    </div>
    <signModal ref="signModal"></signModal>
    <newFormModal ref="newFormModal"></newFormModal>
     <!-- 电子病例弹窗 -->
    <doctorEmr
      v-if="['foshanrenyi'].includes(HOSPITAL_ID)"
    />
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" src="./tool.styl" scoped></style>

<style lang="stylus" scoped>
.pegeSelect {
  >>>.el-input__inner {
    border: 0 !important;
    font-size: 12px;
    color: #333333;
  }
}

.label {
  font-size: 12px;
  color: #333;
}
</style>

<style lang="stylus">
.el-message-box__btns {
  text-align: center;
}

.sheetSelect-con {
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 493px;
  width: auto;
  left: auto !important;
  right: 120px;

  .el-select-dropdown__list, .el-select-dropdown__item {
    padding: 0;
    height: auto;
  }

  .el-select-dropdown__wrap {
    max-height: 500px;
  }

  .head-con {
    height: 42px;
    background: #F7FAFA;
    border-bottom: 1px solid #EAEEF1;
    font-size: 13px;
    color: #333333;
    font-weight: bold;
  }

  .col-1, .col-2, .col-3, .col-4 {
    display: flex;
    align-items: center;
  }

  .col-1 {
    width: 192px;
    padding: 0 24px;
    border-right: 1px solid #EAEEF1;
  }

  .col-2 {
    width: 126px;
    padding: 0 16px;
    border-right: 1px solid #EAEEF1;
  }

  .col-3 {
    width: 133px;
    padding: 0 14px;
    border-right: 1px solid #EAEEF1;
  }

  .col-4 {
    width: 133px;
    padding: 0 14px;
  }

  .list-con {
    font-size: 13px;
    color: #333333;
    height: 42px;
    border-bottom: 1px solid #EAEEF1;
  }

  .el-select-dropdown__item.selected {
    background: #E5F1F0 !important;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      height: 20px;
      width: 4px;
      background: #4bb08d;
    }
  }

  .el-select-dropdown__item.hover {
    background: #fff;
  }

  .el-select-dropdown__item:hover {
    background: #E5F1F0;
  }
}
</style>

<script>
import bus from "vue-happy-bus";
import $ from "jquery";
import setPageModal from "../modal/setPage-modal.vue";
import sheetModal from "../../sheet.js";
import sheetInfo, { resetSheetInfoData } from "../config/sheetInfo/index.js";
import sheetModel from "../../sheet.js";
import { sign } from "@/api/nursingOrderSheet.js";
import { Tr } from "../render/Body.js";
import { TrHj } from "../render/Body_hj.js";
// import {
//   blockList,
//   blockDelete
// } from '../../api/index.js'
import { blockList, blockDelete } from "../../api/index.js";
import signModal from "@/components/modal/sign.vue";
import commom from "@/common/mixin/common.mixin.js";
import newFormModal from "../modal/new-sheet-modal.vue";
import doctorEmr from "@/components/doctorEmr";
import dayjs from "dayjs";
export default {
  mixins: [commom],
  data() {
    return {
      bus: bus(this),
      tool: "",
      showCurve: false,
      creator: "",
      user: JSON.parse(localStorage.user),
      selectList: [],
      pageArea: "",
      sheetModal,
      sheetInfo,
      sheetBlockList: [],
    };
  },
  methods: {
    emit(todo) {
      if (arguments.length == 2) {
        return this.bus.$emit(todo, arguments[1]);
      }
      this.bus.$emit(todo);
    },
    tofull() {
      this.$store.commit("upNursingOrderSheetPageFullpage", !this.fullpage);
    },
    toPrint() {
      if (process.env.NODE_ENV == "production") {
        let newWid;
        if ($(".mark-mark-mark").length == 0 && $(".noSignRow").length == 0) {
          newWid = window.open();
        }
        this.bus.$emit("toNursingOrderSheetPrintPage", newWid);
      } else {
          this.bus.$emit("toNursingOrderSheetPrintPage");
      }
    },
    setPage() {
      this.bus.$emit("openNOSetPageModal");
    },
    initSelectList() {
      let length = this.sheetModal.length + this.sheetInfo.sheetStartPage - 1;
      let pagelist = [];
      let num = Math.ceil(Math.max(length / 10, 1));
      for (let i = 0; i <= num; i++) {
        if ((i + 1) * 10 >= this.sheetInfo.sheetStartPage) {
          pagelist.push(i * 10 + 1);
        }
      }
      pagelist[0] = this.sheetInfo.sheetStartPage;
      pagelist[pagelist.length - 1] = length;
      this.selectList = [];
      for (let i = 0; i < pagelist.length; i++) {
        if (i == pagelist.length - 1) {
        } else if (i == pagelist.length - 2) {
          this.selectList.push({
            value: `${pagelist[i]}-${pagelist[i + 1]}`,
          });
        } else {
          this.selectList.push({
            value: `${pagelist[i]}-${pagelist[i + 1] - 1}`,
          });
        }
      }
      // console.log("初始化页面列表", this.selectList);
    },
    querySearch(queryString, cb) {
      this.initSelectList();
      cb(this.selectList);
    },
    getPrev(index, bodyModel, val) {
      if (index < 0) return "";
      let tr = bodyModel[index];
      let value = tr.find((item) => {
        return item.key == val;
      }).value;
      if (value) {
        return value;
      } else {
        return this.getPrev(index - 1, bodyModel, val);
      }
    },
    getAllListAndCurrIndex(trArr) {
      let allList = [];
      let currIndex = 0;
      for (let i = 0; i < sheetModel.length; i++) {
        allList = allList.concat(sheetModel[i].bodyModel);
      }
      currIndex = allList.indexOf(trArr);
      return [allList, currIndex];
    },
    toMoreSign(selectRow, signType) {
      // this.sheetInfo.selectRow = selectRow
      // this.sheetInfo.selectRow = []
      // selectRow.map(item=>{
      //   this.sheetInfo.selectRow.push(item)
      // })
      // console.log("批量签名sheetInfo", this.sheetInfo, selectRow);
      if (selectRow.length) {
        this.$refs.signModal.open((password, empNo) => {
          let list = [];
          for (let trArr of selectRow) {
            let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            list.push(
              Object.assign({}, trObj, {
                // recordMonth: this.getPrev(currIndex, allList, 'recordMonth'),
                // recordHour: this.getPrev(currIndex, allList, 'recordHour'),
                // recordYear: this.getPrev(currIndex, allList, 'recordYear'),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index,
              })
            );
          }
          let data = {
            empNo,
            password,
            list,
            signType: signType,
          };

          // console.log("批量签名data", data);
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            (res) => {
              // console.log("批量签名res", res);
              this.sheetInfo.isSave = true;
              for (let i = 0; i < res.data.data.length; i++) {
                let trArrClone = Tr(res.data.data[i]);
                let trArr = selectRow[i];
                trArr.splice(0, trArr.length);
                for (let i = 0; i < trArrClone.length; i++) {
                  trArr.push(trArrClone[i]);
                }
              }
              selectRow.splice(0, selectRow.length);
              this.$notify.success({
                title: "提示",
                message: "批量签名成功",
              });
              this.bus.$emit("saveNursingOrderSheetPage");
            }
          );
        });
      } else {
        this.$alert("请按下 ctrl 键并单击选择需要签名的行", "批量签名提示", {
          confirmButtonText: "确定",
          callback: (action) => {},
        });
      }
    },
    // sortId(a,b){
    //   return a['id'] - b['id']
    // },
    getNOBlockList(isAutoSelectLast = true) {
      if (
        this.patientInfo.patientId &&
        this.patientInfo.visitId &&
        this.deptCode
      ) {
        // todo here...
        blockList(
          this.patientInfo.patientId,
          this.patientInfo.visitId,
          this.deptCode
        ).then((res) => {
          // console.log('blockList',res);
          this.sheetBlockList = res.data.data.list;
          if (this.sheetBlockList.length > 0) {
            this.sheetBlockList = this.sheetBlockList.sort((a, b) => {
              return a.id - b.id;
            });
          }
          let index = this.sheetBlockList.length - 1;
          if (!this.sheetInfo.selectBlock.id && isAutoSelectLast) {
            this.sheetInfo.selectBlock = this.sheetBlockList[index] || {};
          }
          this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;

          // console.log(
          //   "获取护嘱单列表",
          //   index,
          //   res,
          //   this.sheetBlockList,
          //   this.sheetInfo,
          //   this.patientInfo
          // );

          if (this.sheetBlockList.length > 0) {
            this.bus.$emit("refreshNursingOrderSheetPage", true);
            // 刷新
            // this.getNOBlockList()
          } else {
            console.log("无数据显示");
          }
          // console.log(
          //   "获取护嘱单列表Sorted",
          //   res,
          //   this.sheetBlockList,
          //   this.sheetInfo,
          //   this.patientInfo
          // );
        });
      }
    },
    addSheet() {
      // console.log("新建页面", this.sheetInfo, this.sheetBlockList);
      if (this.sheetBlockList.length === 0) {
        this.bus.$emit("createNursingOrderPage", true);
        return;
      }
      if (this.sheetInfo.startPage === "0" || this.sheetInfo.startPage === 0) {
        this.createSheet();
      } else {
        this.emit("addNursingOrderSheetPage");
        this.$notify.success({
          title: "提示",
          message: "添加页面成功",
        });
      }
    },
    createSheet(openForm = false, formTitle = this.sheetInfo.formTitle) {
      this.sheetInfo.selectBlock = {};
      // 清空之前选中护理单
      this.sheetInfo.formTitle = formTitle;
      this.sheetInfo.orderContentCode =
        sheetInfo.orderContentCode || "orders:public:通用护嘱内容";

      resetSheetInfoData(this.sheetInfo);

      if (openForm) {
        this.$refs.newFormModal.open();
      } else {
        this.bus.$emit("addNewNursingOrderSheetPage");
      }
      // console.log("新建护嘱单", this.sheetInfo);
    },
    delSheetRow() {
      alert("happy del sheet row!");
    },
    delSheet() {
      if (!this.sheetInfo.selectBlock.id)
        return this.$message.warning("还没有选择护嘱单");
      console.log(this.sheetModal);
      if(this.HOSPITAL_ID =='huadu' && this.sheetModal[0] && this.sheetModal[0].bodyModel[0][0].value){
        window.openSignModal((password, empNo) => {
          blockDelete({
            id: this.sheetInfo.selectBlock.id,
            password: password,
            empNo: empNo,
          }).then((res) => {
            // 清空之前选中护理单
            resetSheetInfoData(this.sheetInfo); //
            // this.bus.$emit("addNewNursingOrderSheetPage", "删除成功!");
            this.$message.success('删除成功!')
            this.getNOBlockList(false);
          });
        });
      }else{
        this.$confirm("此操作将永久删除该护嘱单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          if(this.HOSPITAL_ID !='huadu'){
            window.openSignModal((password, empNo) => {
              blockDelete({
                id: this.sheetInfo.selectBlock.id,
                password: password,
                empNo: empNo,
              }).then((res) => {
                // 清空之前选中护理单
                resetSheetInfoData(this.sheetInfo); //
                this.bus.$emit("addNewNursingOrderSheetPage", "删除成功!");
                this.getNOBlockList(false);
              });
            });
          }else{
            blockDelete({
              id: this.sheetInfo.selectBlock.id,
            }).then((res) => {
              resetSheetInfoData(this.sheetInfo);
              // this.bus.$emit("addNewNursingOrderSheetPage", "删除成功!");
              this.$message.success('删除成功!')
              this.getNOBlockList(false);
            })
          }

        });
      }


      // this.$parent.$parent.$refs.signModal.open((password, empNo) => {
      //             delRow({list:[{id:id}], password:password, empNo:empNo}).then(res => {
      //               this.delRow(index)
      //               this.$notify.success({
      //                 title: '提示',
      //                 message: '删除成功'
      //               })
      //               this.bus.$emit('saveNursingOrderSheetPage')
      //             })
      //           })
    },

    blockLabel(item) {
      return `${item.wardName} ${dayjs(item.createTime).format("MM-DD")} 至 ${
        item.completeTime ? dayjs(item.completeTime).format("MM-DD") : "至今"
      }`;
    },
    changeSelectBlock(e) {
      // console.log("changeSelectBlock", e);
      this.bus.$emit("refreshNursingOrderSheetPage", true, e);
    },
    showSheetDescription() {
      const h = this.$createElement;
      let titleText = "护嘱单说明";
      let description = "";
      this.$msgbox({
        dangerouslyUseHTMLString: true,
        center: true,
        confirmButtonText: "好的，知道了",
        title: titleText,
        message: h("p", { style: "font-size:13px" }, [
          h("p", null, "1、临时护嘱在备注栏上写上“执行1次”。"),
          h("br"),
          h(
            "p",
            null,
            "2、神经内科的护嘱主要是针对病危病重和一级护理及重度依赖的患者，由护理组长或护士长开出，由责任护士或护理班执行。"
          ),
          h("br"),
          h(
            "p",
            null,
            "3、本单挂在病人房间的宣传框内，每天交接班时组长或护士长当场进行开出或停止护嘱，并同时监控之前开出的护嘱有无执行。"
          ),
          h("br"),
          h(
            "p",
            null,
            "4、本护嘱单等到完全不需要护嘱或病人出院时责任护士将其收回，夹在护士站护嘱文件夹内存档。"
          ),
          h("br"),
          h(
            "p",
            null,
            "5、为方便大家工作，科室把常见的护嘱内容做成电子版，频次和协助或指导由开护嘱者自己写，如果有特殊的护嘱，请另外手写在上面。"
          ),
        ]),
        callback: (action) => {},
      });
    },
  },
  computed: {
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
  },
  created() {
    this.bus.$on("initNursingOrderSheetPageSize", () => {
      // console.log("初始化护嘱单页面大小");
      this.initSelectList();
      this.pageArea = this.selectList[this.selectList.length - 1].value || "";
    });
    this.bus.$on("toNursingOrderSheetMoreSign", (sheetInfo, signType) => {
      this.toMoreSign(sheetInfo, signType);
    });
    this.bus.$on("getNOBlockList", () => {
      // console.log("刷新getNOBlockList");
      this.getNOBlockList();
    });

    this.bus.$on(
      "createNursingOrderPage",
      (isOpenForm, formTitle = this.sheetInfo.formTitle) => {
        // console.log("创建护嘱表单", isOpenForm, formTitle);
        this.createSheet(isOpenForm, formTitle);
      }
    );

    // 鼠标事件处理
    document.onkeydown = (e) => {
      if (e.keyCode == 91 || e.keyCode == 17) {
        this.sheetInfo.downControl = true;
      }
      var currKey = 0,
        e = e || event || window.event;
      currKey = e.keyCode || e.which || e.charCode;
      var currKeyStr = String.fromCharCode(currKey);
      // console.log('currKeyStr',currKeyStr)
      if (currKeyStr == "S" && (e.ctrlKey || e.metaKey)) {
        //Ctrl+s
        e.preventDefault();
        e.returnvalue = false;
        // console.log("Ctrl+s保存");
        this.emit("saveNursingOrderSheetPage");
        e.stopPropagation();
      }
    };
    document.onkeyup = (e) => {
      if (e.keyCode == 91 || e.keyCode == 17) {
        this.sheetInfo.downControl = false;
      }
    };
  },
  mounted() {
    document.querySelector("#sheet_body_con").addEventListener("click", () => {
      if (!this.sheetInfo.downControl) {
        this.sheetInfo.selectRow.splice(0, this.sheetInfo.selectRow.length);
      }
    });
  },
  watch: {
    pageArea() {
      let page = this.pageArea.split("-");
      let startPage = page[0];
      let endPage = page[1];
      if (startPage && endPage) {
        if (
          Number(endPage) - Number(startPage) >= 0 &&
          Number(endPage) - Number(startPage) <= 20
        ) {
          this.sheetInfo.startPage = startPage;
          this.sheetInfo.endPage = endPage;
        }
      }
    },
    patientInfo: {
      deep: true,
      handler() {
        if (this.patientInfo.patientId) {
          this.$parent.breforeQuit(() => {
            this.getNOBlockList();
          });
        }
      },
    },
    // deptCode: {
    //   deep: true,
    //   handler() {
    //     if (this.deptCode) {
    //       this.$parent.breforeQuit(() => {
    //         this.getNOBlockList()
    //       })
    //     }
    //   }
    // },
  },
  components: {
    setPageModal,
    newFormModal,
    signModal,
    doctorEmr
  },
};
</script>
