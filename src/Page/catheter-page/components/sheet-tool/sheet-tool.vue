<template>
  <div>
    <div class="tool-contain" flex="cross:center">
      <div class="item-box" flex="cross:center main:center" @click="emit('addSheetPage')">
        <div class="text-con">添加新页</div>
      </div>
      <!-- <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('delSheetPage')">
                    <div class="icon-box">
                      <i class="icon-shanchu1 iconfont" style="font-size: 14px;color:#E55E01;"></i>
                    </div>
                    <div class="text-con">
                      删除记录单
                    </div>
      </div>-->
      <div class="item-box" flex="cross:center main:center" @click="emit('saveSheetPage')">
        <div class="text-con" flex="cross:center">保存</div>
      </div>
      <!-- <div class="item-box" flex="cross:center main:center" @click="emit('openHJModal')">
        <div class="text-con">
          出入量统计
        </div>
      </div>-->
      <!-- <div class="item-box" flex="cross:center main:center" @click="setPage" style="width: 100px">
        <div class="text-con">
          设置起始页({{sheetInfo.sheetStartPage}})
        </div>
      </div>-->
      <div class="item-box" flex="cross:center main:center" @click="toPrint">
        <div class="text-con">打印预览</div>
      </div>
      <div class="item-box" flex="cross:center main:center" @click.stop="toMoreSign">
        <div class="text-con">批量签名</div>
      </div>
      <div class="item-box" flex="cross:center main:center" @click.stop="delSheet">
        <div class="text-con">删除整单</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="createSheet"
        style="width: 120px"
      >
        <div class="text-con">新建导尿管监测单</div>
      </div>
      <div flex-box="1"></div>
      <!-- <span class="label">护理记录：</span> -->
      <el-select
        v-model="sheetInfo.selectBlock"
        @change="changeSelectBlock"
        value-key="id"
        placeholder="请选择深静脉导管维护单"
        class="select-con"
        popper-class="sheetSelect-con-sheet"
      >
        <div class="head-con" flex="cross:stretch">
          <div class="col-1">记录单标题</div>
          <div class="col-2">科室</div>
          <div class="col-3">开始时间</div>
          <!-- <div class="col-3">结束时间</div> -->
        </div>
        <el-option
          v-for="item in sheetBlockList"
          :key="item.id"
          :label="blockLabel(item, sheetBlockList)"
          :value="item"
        >
          <div class="list-con" flex="cross:stretch">
            <div class="col-1" :title="item.recordName">{{item.codeName}}</div>
            <div class="col-2" :title="item.deptName">{{item.wardName}}</div>
            <div class="col-3" :title="item.createTime">{{item.createDate}}</div>
            <!-- <div class="col-3" :title="item.completeName">{{item.completeName}}</div> -->
          </div>
        </el-option>
      </el-select>
      <!-- <span class="label">页码范围:</span> -->
      <div class="item-box" style="width: 105px" flex="cross:center main:center">
        <el-autocomplete
          class="pegeSelect"
          icon="caret-bottom"
          placeholder="请输入页码"
          v-model="pageArea"
          :fetch-suggestions="querySearch"
        ></el-autocomplete>
      </div>
      <!-- <div class="item-box" flex="cross:center main:center" @click="tofull">
            <div class="text-con">
              <span v-if="fullpage">关闭全屏</span>
              <span v-else>全屏</span>
            </div>
      </div>-->
      <div style="width: 5px;"></div>
    </div>
    <newFormModal ref="newFormModal"></newFormModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" src="./tool.styl" scoped>
</style>

<style lang="stylus">
.sheetSelect-con-sheet
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.50);
  border-radius: 4px;
  width 562px !important
  left auto !important
  right 120px
  .el-select-dropdown__list, .el-select-dropdown__item
    padding 0
    height auto
  .el-select-dropdown__wrap
    max-height 500px
  .head-con
    height 37px
    background: #F7FAFA;
    border-bottom: 1px solid #EAEEF1;
    font-size: 13px;
    color: #333333;
    font-weight bold
  .col-1,.col-2,.col-3,.col-4
    display flex
    align-items center
  .col-1
    width 192px
    padding 0 24px
    border-right: 1px solid #EAEEF1;
  .col-2
    width 126px
    padding 0 16px
    border-right: 1px solid #EAEEF1;
  .col-3
    width 133px
    padding 0 14px
    border-right: 1px solid #EAEEF1;
  .col-4
    width 133px
    padding 0 14px
  .list-con
    font-size: 13px;
    color: #333333;
    height 37px
    border-bottom: 1px solid #EAEEF1
  .el-select-dropdown__item.selected
    background #fff
    position relative
    &:after
      content ''
      position absolute
      left 0
      top 9px
      height 20px
      width 4px
      background #4bb08d
  .el-select-dropdown__item.hover
    background #fff;
  .el-select-dropdown__item:hover
    background #E5F1F0;
.red-border
  border 2px solid red !important
</style>
<script>
import bus from "vue-happy-bus";
import $ from "jquery";
import setPageModal from "../modal/setPage-modal.vue";
import sheetModel, { cleanData } from "../../sheet.js";
import sheetInfo from "../config/sheetInfo/index.js";
import { sign } from "../../api/sheet.js";
import { Tr } from "../render/Body.js";
import { blockList, blockDelete } from "../../api/index.js";
import commom from "@/common/mixin/common.mixin.js";
import newFormModal from "../modal/new-sheet-modal.vue";
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
      sheetModel,
      sheetInfo,
      sheetBlockList: []
    };
  },
  methods: {
    emit(todo) {
      this.bus.$emit(todo);
    },
    tofull() {
      this.$store.commit("upSheetPageFullpage", !this.fullpage);
    },
    toPrint() {
      if (process.env.NODE_ENV == "production") {
        let newWid;
        if (
          $(".mark-mark-mark").length == 0 &&
          $(".noSignRow").length == 0 &&
          $(".multiSign").length == 0
        ) {
          newWid = window.open();
        }
        this.bus.$emit("toSheetPrintPage", newWid);
      } else {
        this.bus.$emit("toSheetPrintPage");
      }
    },
    setPage() {
      this.bus.$emit("openSetPageModal");
    },
    initSelectList() {
      let length = this.sheetModel.length + this.sheetInfo.sheetStartPage - 1;
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
            value: `${pagelist[i]}-${pagelist[i + 1]}`
          });
        } else {
          this.selectList.push({
            value: `${pagelist[i]}-${pagelist[i + 1] - 1}`
          });
        }
      }
    },
    querySearch(queryString, cb) {
      this.initSelectList();
      cb(this.selectList);
    },
    getPrev(index, bodyModel, val) {
      if (index < 0) return "";
      let tr = bodyModel[index];
      let value = tr.find(item => {
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
    toMoreSign() {
      if (this.sheetInfo.selectRow.length) {
        window.openSignModal((password, empNo) => {
          let list = [];
          for (let trArr of this.sheetInfo.selectRow) {
            let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            list.push(
              Object.assign({}, trObj, {
                recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                // recordHour: this.getPrev(currIndex, allList, "recordHour"),
                recordYear: this.getPrev(currIndex, allList, "recordYear"),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index
              })
            );
          }
          let data = {
            empNo,
            password,
            list
          };
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            res => {
              for (let i = 0; i < res.data.data.length; i++) {
                let trArrClone = Tr(res.data.data[i]);
                let trArr = sheetInfo.selectRow[i];
                if (
                  trArr.find(item => {
                    return item.key == "recordMonth";
                  }).value == ""
                ) {
                  trArrClone.find(item => {
                    return item.key == "recordMonth";
                  }).value = "";
                }
                // if (
                //   trArr.find(item => {
                //     return item.key == "recordHour";
                //   }).value == ""
                // ) {
                //   trArrClone.find(item => {
                //     return item.key == "recordHour";
                //   }).value = "";
                // }
                trArr.splice(0, trArr.length);
                for (let i = 0; i < trArrClone.length; i++) {
                  trArr.push(trArrClone[i]);
                }
              }
              this.sheetInfo.selectRow.splice(
                0,
                this.sheetInfo.selectRow.length
              );
              this.$notify.success({
                title: "提示",
                message: "批量签名成功"
              });
              this.bus.$emit("saveSheetPage");
            }
          );
        });
      } else {
        this.$alert("请按下 ctrl 键并单击选择需要签名的行", "批量签名提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    getBlockList() {
      if (
        this.patientInfo.patientId &&
        this.patientInfo.visitId &&
        this.deptCode
      ) {
        blockList(
          this.patientInfo.patientId,
          this.patientInfo.visitId,
          this.deptCode
        ).then(res => {
          this.sheetBlockList = res.data.data.list;
          this.sheetInfo.selectBlock =
            res.data.data.list[res.data.data.list.length - 1] || {};
          // if (this.patientInfo.blockId) {
          //   try {
          //     let index = this.sheetBlockList.findIndex(item => item.id == this.patientInfo.blockId)
          //     this.sheetInfo.selectBlock = res.data.data.list[index]
          //   } catch (e) {
          //     console.log(e)
          //   }
          // }
          this.sheetInfo.sheetType = this.sheetInfo.selectBlock.code;
          console.log(this.sheetInfo, this.sheetInfo.sheetType);
          // this.bus.$emit('refreshSheetPage', true)
        });
      }
    },
    createSheet() {
      this.$refs.newFormModal.open();
    },
    delSheet() {
      if (!this.sheetInfo.selectBlock.id)
        return this.$message.warning("还没有选择护理记录单");
      this.$confirm("此操作将永久删除该护理记录单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        blockDelete(this.sheetInfo.selectBlock.id).then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // 刷新
          this.getBlockList();
          this.bus.$emit("refrehCatheterPatientList");
        });
      });
    },
    blockLabel(item, list) {
      // return `${item.deptName} ${dayjs(item.createTime).format("MM-DD")} 至 ${
      //   item.completeTime ? dayjs(item.completeTime).format("MM-DD") : "至今"
      // }`;
      return `${item.wardName.replace("护理单元", "")} ${dayjs(
        item.createDate
      ).format("MM-DD")}建 共${list.length}张
      `;
    },
    changeSelectBlock() {
      this.sheetInfo.sheetType = this.sheetInfo.selectBlock.code;
      cleanData();
      this.bus.$emit("refreshSheetPage", true);
    }
  },
  computed: {
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    patientId() {
      return this.$store.state.sheet.patientInfo.id;
    }
  },
  created() {
    this.bus.$on("initSheetPageSize", () => {
      this.initSelectList();
      // 判断是否存在recodeId
      // 获取被标记的页数
      try {
        let index;
        if (this.patientInfo.recordId) {
          alert(888,'定位')

          for (let i = 0; i < this.sheetModel.length; i++) {
            for (let j = 0; j < this.sheetModel[i].bodyModel.length; j++) {
              if (
                this.patientInfo.recordId ==
                this.sheetModel[i].bodyModel[j].find(item => item.key == "id")
                  .value
              ) {
                index = i + this.sheetInfo.sheetStartPage;
              }
            }
          }
          for (let i = 0; i < this.selectList.length; i++) {
            let page = this.selectList[i].value.split("-");
            let startPage = Number(page[0]);
            let endPage = Number(page[1]);
            if (index >= startPage && index <= endPage) {
              this.pageArea = this.selectList[i].value || "";
              let todo = () => {
                $(this.$parent.$refs.scrollCon).animate({
                  scrollTop:
                    $(`[recordId='${this.patientInfo.recordId}']`)
                      .eq(0)
                      .offset().top +
                    this.$parent.$refs.scrollCon.scrollTop -
                    150
                });
                $(`[recordId='${this.patientInfo.recordId}']`)
                  .eq(0)
                  .addClass("red-border");
              };
              this.$nextTick(() => {
                setTimeout(() => {
                  todo();
                }, 0);
                setTimeout(() => {
                  todo();
                }, 100);
                setTimeout(() => {
                  todo();
                  this.patientInfo.blockId = "";
                  this.patientInfo.recordId = "";
                }, 300);
              });
            }
          }
        } else {
          this.pageArea =
            this.selectList[this.selectList.length - 1].value || "";
        }
      } catch (error) {}
    });
    this.bus.$on("toSheetMoreSign", () => {
      this.toMoreSign();
    });
    this.bus.$on("getBlockList", () => {
      this.getBlockList();
    });
    document.onkeydown = e => {
      if (e.keyCode == 91 || e.keyCode == 17) {
        this.sheetInfo.downControl = true;
      }
    };
    document.onkeyup = e => {
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
    patientId: {
      deep: true,
      handler() {
        if (this.patientInfo.patientId) {
          this.$parent.breforeQuit(() => {
            this.getBlockList();
          });
        }
      }
    }
  },
  components: {
    setPageModal,
    newFormModal
  }
};
</script>
