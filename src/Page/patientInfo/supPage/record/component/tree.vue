<template>
  <div class="form-list-part">
    <div
      :style="isShow ? 'display:block' : 'display:none'"
      style="transition: width 2s"
    >
      <el-row class="header" type="flex" justify="space-between" align="middle">
        <span
          v-if="HOSPITAL_ID == 'beihairenyi'"
          class="title"
          style="cursor: pointer"
          @click="refreshTree()"
          @dblclick="refreshTree(true)"
          >护理评估单</span
        >
        <span
          v-else-if="HOSPITAL_ID == 'fuyou'"
          class="title"
          style="cursor: pointer"
          @click="refreshTree()"
          @dblclick="refreshTree(true)"
          >护理评估</span
        >
        <span
          v-else
          class="title"
          style="cursor: pointer"
          @click="refreshTree()"
          @dblclick="refreshTree(true)"
          >护理文书</span
        >
        <el-button type="text" class="new-btn" @click="newRecordOpen">
          <i class="el-icon-plus"></i>创建
        </el-button>
      </el-row>
      <div class="body" :style="{ height: height }">
        <el-tree
          v-loading="treeLoading"
          v-if="ifTree"
          class="record-tree"
          :data="regions"
          highlight-current
          :render-content="renderContent"
          :default-expand-all="HOSPITAL_ID == 'whfk' && !isPersonage"
          @node-click="nodeClick"
          node-key="id"
          :default-expanded-keys="expandList"
          @node-expand="node_expand"
          @node-collapse="node_collapse"
        ></el-tree>
        <div style="height: 20px"></div>
      </div>
      <!-- 弹出框 -->
      <newForm ref="newForm"></newForm>
      <!-- 批量审核弹框 -->
      <BatchAuditForm
        :batchAuditDialog="batchAuditDialog"
        :batchAuditForms="batchAuditForms"
        :refresh="refreshTree"
        @closeBatchAudit="handleCloseBatchAudit"
      />
    </div>

    <div
      v-if="hisLeftList.includes(HOSPITAL_ID)"
      @click="showBtn"
      :class="[isActive ? 'active' : 'button']"
      :style="{ top: flagTop }"
    >
      <i
        class="iconfont icon-yincang"
        v-show="!isActive"
        style="margin-left: -2px"
      ></i>
      <i
        class="iconfont icon-xianshi"
        v-show="isActive"
        style="margin-left: -2px"
      ></i>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.form-list-part {
  position: relative;
  // transition: all 2s;
  .header {
    height: 37px;
    background: #F7FAFA;
    padding: 0 13px;
    border-bottom: 1px solid #EAEEF1;

    .title {
      font-size: 13px;
      color: #333333;
      font-weight: bold;
    }

    .new-btn {
      color: #687179;
      font-size: 12px;

      i {
        margin-right: 2px;
      }
    }
  }

  .body {
    overflow: auto;
  }

  .button {
    // transition: width 2s;
    // transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    // transform: translate(100px,100px);
    position: absolute;
    top: 100px;
    right: -11px;
    z-index: 2;
    cursor: pointer;
    height: 73px;
    width: 10px;
    background-image: url('../../../../../common/images/patient/隐藏框.png');

    &:hover {
      color: #5CC6A1;
    }

    .iconfont {
      font-size: 12px;
      position: absolute;
      top: 30px;
    }
  }

  .active {
    position: absolute;
    top: 416px;
    cursor: pointer;
    height: 73px;
    width: 10px;
    background-image: url('../../../../../common/images/patient/隐藏框.png');

    &:hover {
      color: #5CC6A1;
    }

    .iconfont {
      font-size: 12px;
      position: absolute;
      top: 30px;
    }
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.el-tree-node__content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
  // &:hover
  // .tree-node
  // background rgb(228, 241, 240)
}

.tree-node {
  margin-left: -16px;
  position: relative;
  font-size: 12px;
  color: #687179;
  top: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 92%;
  display: inline-block;

  img {
    width: 20px;
    position: relative;
    top: 3px;
    margin-right: 2px;
  }
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background: rgb(228, 241, 240);
}

.tree-box-node {
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  color: #687179;
  position: relative;
  top: 3px;

  &:hover .view {
    display: inherit;
  }

  img {
    width: 20px;
    position: relative;
    top: 3px;
    margin-right: 2px;
  }

  .view {
    display: none;
    width: 40px;
    height: 30px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    text-align: center;
    line-height: 30px;
    border: 1px solid #eee;
    box-shadow: 0 2px 4px 0 #eee;
  }
}
.tree-box-node2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  color: #687179;
  position: relative;
  top: 3px;
  .box-label {
    overflow hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover .view {
    display: inherit;
  }

  img {
    width: 20px;
    position: relative;
    top: 3px;
    margin-right: 2px;
  }
}
.el-tree {
  border: 0 !important;
}

.modal-record {
  .record-con {
    background: #ffffff;
    overflow: auto;
    margin: 20px 0 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
}

.record-tree {
  .el-tree {
    border: 0 !important;
  }
}
</style>

<script>
/* eslint-disable */
import fileicon from "@/common/images/record/文件.png";
import filebox from "@/common/images/record/文件夹.png";

import fileiconRed from "@/common/images/record/文件红点.png";
import fileboxRed from "@/common/images/record/文件夹红点.png";

import fileiconGreen from "@/common/images/record/文件绿点.png";
import fileboxGreen from "@/common/images/record/文件夹绿点.png";

import fileiconYellow from "@/common/images/record/文件黄点.png";
import fileboxYellow from "@/common/images/record/文件夹黄点.png";

import { SweetModal, SweetModalTab } from "@/plugin/sweet-modal-vue";
import BatchAuditForm from '../modal/BatchAuditForm.vue'
import {
  listPatientRecord,
  emrList,
  groupList,
  groupListHuadu,
  getInstanceByPatientInfo,
  listRecord,
  getBlockByPV,
} from "@/api/patientInfo";
import moment from "moment";
import commonData from "@/api/commonData"; //入院HIS数据等
import BusFactory from "vue-happy-bus";
import newForm from "../modal/new-form.vue";
import commonMixin from "@/common/mixin/common.mixin";
import { getFormConfig } from "../config/form-config.js";
import { hadTransferToWard } from "../api/index.js";

export default {
  props: {
    filterObj: Object,
  },
  mixins: [commonMixin],
  data() {
    return {
      regions: [],
      bus: BusFactory(this),
      treeLoading: false,
      expandList: [],
      expandListCopy: [],
      ifTree: true,
      formTransfusionSafety: [],
      isShow: true, //护理文书菜单列是否展示
      isActive: false, //是否点击收起图标
      isPersonage: false, //是否为个人详情打开
      hisLeftList: ["wujing"], //是否要开放左侧收缩功能医院
      batchAuditDialog: false, // 批量审核表单弹框
      batchAuditForms: {}, // 批量审核节点数据
      lockHospitalList:['huadu'],//配置了评估单锁定功能的医院
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    flagTop() {
      return `${(this.wih + 85) * 0.4}px`;
    },
    height() {
      if (this.$route.path == "/formPage" || this.filterObj) {
        return `${this.wih - 120}px`;
      } else {
        return `${this.wih - 180}px`;
      }
    },
  },
  watch: {
    "$route.params"() {
      if (!this.$route.query.patientId) {
        this.regions = [];
        this.bus.$emit("closeAssessment");
      }
    },
  },
  methods: {
    showBtn() {
      this.isShow = !this.isShow;
      this.isActive = !this.isActive;
      // this.regions = []
      if (this.isShow) {
        var show = document.getElementById("right");
        show.style.marginLeft = "275px";
      } else {
        var unshow = document.getElementById("right");
        unshow.style.marginLeft = "20px";
      }

      if (this.isActive) {
        var actives = document.getElementById("left");
        actives.style.width = "0";
      } else {
        var unactive = document.getElementById("left");
        unactive.style.width = "260px";
      }
    },
    createListHj(index) {
      return {
        label: "输血安全护理记录单",
        index: index + 1,
        formCode: "form_transfusion_safety",
        nooForm: 2,
        pageUrl: "输血安全护理记录单.html",
        children: this.formTransfusionSafety.map((option) => {
          return {
            status: option.status,
            label: `${option.creatDate}
                  ${option.wardAlias}
                  ${option.countSize ? option.countSize + "条" : ""}
                  ${option.evalScore ? option.evalScore + "分" : ""}
                  ${
                    option.pusherName ? option.pusherName : option.creatorName
                  }`,
            // ${option.status == 0 ? "T" : option.status}`,
            form_id: option.id,
            formName: "输血安全护理记录单",
          };
        }),
      };
    },
    createListHd() {
      return {
        label: "输血安全护理记录单",
        formCode: "E0314",
        nooForm: 2,
        pageUrl: "输血安全护理记录单.html",
        children: this.formTransfusionSafety.map((option) => {
          return {
            status: option.status,
            label: `${option.evalDate.substring(0, 16)}
                  ${option.signerNo}`,
            // ${option.status == 0 ? "T" : option.status}`,
            form_id: option.entityId,
            formName: "输血安全护理记录单",
          };
        }),
      };
    },
    async nodeClick(data, node) {
      if (!this.$store.state.admittingSave.admittingSave) {
      // if (node.level == 2) {
        const comfirm = await this.$confirm(
          "入院评估单还未保存，是否需要离开页面?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            // this.$message({
            //   type: "success",
            //   message: "退出成功!",
            // });
            // this.$store.state.admittingSave.admittingSave = true;
            return true;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
            return false;
          });
        if (!comfirm) return;
      }

      // 临邑评估单保存前的滚动定位
      if (node.level === 1 && ['lyxrm', 'stmz'].includes(this.HOSPITAL_ID)) {
        sessionStorage.removeItem('evalScrollTop')
      }

      try {
        this.bus.$emit("activeAllButons");
        window.app.$CRMessageBox.notifyBox.close();
      } catch (error) {
      }
      if (node.level === 2) {
        // 当点击2级栏目就是这里做操作，不知道是否能进入。所以先清空
        if(this.lockHospitalList.includes(this.HOSPITAL_ID)){
         localStorage.setItem("lockForm",'')
        }
        if (node.parent.label != "记录单") {
          this.bus.$emit(
            "openAssessmentBox",
            Object.assign({}, getFormConfig(node.data.formName), {
              id: node.data.form_id,
              formCode: node.parent.data.formCode,
              showCurve: node.parent.data.showCurve,
              creator: node.parent.data.creator,
              listPrint: node.parent.data.listPrint,
              nooForm: node.parent.data.nooForm,
              pageUrl: node.parent.data.pageUrl,
              pageItem: data.pageTitle,
              status: data.status,
              missionId: data.missionId,
              pageIndex: node.data.pageIndex
            })
          );
        } else {
        }
      } else if (node.data.islink && this.HOSPITAL_ID == "hj") {
        this.bus.$emit(
          "openAssessmentBox",
          Object.assign({}, getFormConfig(node.data.formName), {
            pageUrl: node.data.pageUrl,
            nooForm: node.data.nooForm,
            islink: node.data.islink,
          })
        );
      }
    },
    renderContent(h, { node, data, store }) {
      //未签名
      let hasSave =
        node.childNodes.filter((item) => {
          return item.data.status == "0";
        }).length > 0;

      //已签名
      let hasSign =
        node.childNodes.filter((item) => {
          return item.data.status == "1";
        }).length > 0;

      let fileHasSave = node.data.status == 0;
      let fileHasSign = node.data.status == 1;
      let icon;
      let box;

      let formNoSign = node.data.formTreeRemindType == "0"; // 无签名
      let formSign = node.data.formTreeRemindType == "1"; // 责任（多人签名）
      let formAudit = node.data.formTreeRemindType == "2"; // 责任 + 审核
      // 花都特殊处理
      if (
        this.HOSPITAL_ID == "huadu" ||
        this.HOSPITAL_ID == "liaocheng" ||
        this.HOSPITAL_ID == "zhongshanqi" ||
        this.HOSPITAL_ID == "foshanrenyi" ||
        this.HOSPITAL_ID == "weixian"
      ) {
        // 文件夹
        // 责任 + 审核的情况
        if (formAudit) {
          // 责任 + 审核的情况
          if (this.HOSPITAL_ID == "zhongshanqi") {
            // 中山七颜色处理
            if (hasSave) {
              box = fileboxYellow;
            } // 未签名
            else if (hasSign) {
              box = fileboxRed;
            } // 责任 + 审核的情况 责任签名
            else if (fileHasSave) {
              icon = fileiconYellow;
            } // 未签名
            else if (fileHasSign) {
              icon = fileiconRed;
            } // 未签名
            else {
              box = fileboxGreen;
              icon = fileiconGreen;
            } // 未签名
          } else {
            if (hasSave) {
              box = fileboxRed;
            } // 未签名
            else if (hasSign) {
              box = fileboxGreen;
            } // 责任 + 审核的情况 责任签名
            else if (fileHasSave) {
              icon = fileiconRed;
            } // 未签名
            else if (fileHasSign) {
              icon = fileiconGreen;
            } //责任签名
            else {
              box = filebox;
              icon = fileicon;
            }
          }
        }
        // 责任（多人签名）的情况
        else if (formSign) {
          if (this.HOSPITAL_ID == "zhongshanqi") {
            // 责任（多人签名）的情况 未签名
            if (hasSave) {
              box = fileboxYellow;
            } // 未签名
            else if (hasSign) {
              box = fileboxGreen;
            } // // 责任（多人签名）的情况 责任签名
            else if (fileHasSave) {
              icon = fileiconYellow;
            } else if (fileHasSign) {
              icon = fileiconGreen;
            } else {
              box = fileboxGreen;
              icon = fileiconGreen;
            } // // 责任（多人签名）的情况 责任签名
          } else {
            if (hasSave) {
              box = fileboxRed;
            } // 未签名
            else if (hasSign) {
              box = filebox;
            } // 责任（多人签名）的情况 责任签名
            else if (fileHasSave) {
              icon = fileiconRed;
            } else if (fileHasSign) {
              icon = fileicon;
            } else {
              box = filebox;
              icon = fileicon;
            }
          }
        } else {
          // 没有签名的情况
          box = filebox;
          icon = fileicon;
        }
      } else {
        // 文件夹
        if (hasSave) {
          box = fileboxRed;
        } else if (hasSign) {
          box = fileboxGreen;
          if(this.HOSPITAL_ID === "hj"&&['E1671','E1670','E0136'].includes(data.formCode)){
            /*儿童的跌倒单特殊处理，护士签名后不显示绿点*/
            /*成人的跌倒单特殊处理，护士签名后不显示绿点*/
            /*躁动-镇静评分（RASS）单特殊处理，护士签名后不显示绿点*/
            box = filebox;
          }
        }
        else {
          box = filebox;
        }
        // 内容
        if (fileHasSave) {
          icon = fileiconRed;
        } else if (fileHasSign) {
          icon = fileiconGreen;
          if(( data.formName=='东莞厚街 Morse跌倒评估及护理记录'||data.formName=='躁动-镇静评分（RASS）'||data.formName=='东莞厚街儿童跌倒、坠床护理单')&&this.HOSPITAL_ID === "hj"){
            /*儿童的跌倒单特殊处理，护士签名后不显示绿点*/
            /*成人的跌倒单特殊处理，护士签名后不显示绿点*/
            /*躁动-镇静评分（RASS）单特殊处理，护士签名后不显示绿点*/
            icon = fileicon;
          }
        } else {
          icon = fileicon;
        }
      }
      // 多行表单签名状态（佛医）
      const style = {} // 文件夹
      const pageStyle = {} // 每张表单
      if (this.HOSPITAL_ID === 'foshanrenyi') {
        // signStatus: 0 - 完成，1 - 未签名（责任签名），2 - 未审核
        // 多行表单（表内多行签名状态判断）
        if (data.multiLine) {
          const formsSign = node.data.fillRemindType == "1"; // 只有一个签名（责任签名）
          const formsAudit = node.data.fillRemindType == "2"; // 责任 + 审核
          // 是否有表单多行内未签名（责任签名）
          const hasPageNotSign = node.childNodes.filter((item) => {
            return item.data.signStatus === "1";
          }).length > 0;
          // 是否有表单多行内未审核
          const hasPageNotAudit = node.childNodes.filter((item) => {
            return item.data.signStatus === "2";
          }).length > 0;
          const currentPageNotSign = node.data.signStatus === '1' // 当前表单多行内未签名（责任签名）
          const currentPageNotAudit = node.data.signStatus === '2' // 当前表单多行内未审核
          if (formsSign) { // 表单多行内只有签名（责任）
            if (hasPageNotSign) { // 存在表单目录下有表单多行内未签名（责任签名）
              style.color = 'red'
            }
            if (currentPageNotSign) { // 当前表单多行内未签名（责任签名）
              pageStyle.color = 'red'
            }
          } else if (formsAudit) { // 表单多行内有两个签名，责任 + 审核
            if (hasPageNotSign) { // 存在表单目录下有表单多行内未签名（责任签名）
              style.color = 'red'
            } else if (hasPageNotAudit) { // 存在表单目录下有表单多行内未审核
              style.color = '#27a45e'
            }
            if (currentPageNotSign) { // 当前表单多行内未签名（责任签名）
              pageStyle.color = 'red'
            } else if (currentPageNotAudit) { // 当前表单多行内未审核
              pageStyle.color = '#27a45e'
            }
          }
        }
      }
      let viewDom = h();
      if (this.HOSPITAL_ID === "liaocheng" || this.HOSPITAL_ID === "quzhou") {
        viewDom = h(
          "div",
          {
            class: { view: true },
            on: { click: (e) => this.handleViewClick(e, node, data) },
          },
          [h("i", { class: { "el-icon-view": true } })]
        );
      }
      if (node.level !== 2) {
        if (["foshanrenyi","lyxrm", 'whhk', 'stmz'].includes(this.HOSPITAL_ID)) {
          this.batchAuditForms = node.data
          return (
            <span class="tree-box-node2">
              <span class="box-label">
                <img src={box}/>
                <span style={ style }>{node.label}</span>
              </span>
              {
                node.data.canBatchAudit &&
                <el-button
                  type="text"
                  size="mini"
                  on-click={
                    (e) => this.batchAudit(e, node,this.$route.query)
                  }
                >
                  批量审核
                </el-button>
              }
            </span>
          )
        } else {
           /* 逻辑一直没改过。但是有一次发包过去厚街，医院非说这两张表以前没有状态的。直接强制去掉 */
          if( (node.label=="生长发育评估量表"||node.label=="住院病人处理单") && this.HOSPITAL_ID=='hj'){
            box = filebox;
          }
          return h("span", { class: { "tree-box-node": true }, attrs: { title: node.label } }, [
            h("img", { attrs: { src: box } }),
            h("span", {}, node.label),
            viewDom,
          ]);
        }
      } else {
        if (this.HOSPITAL_ID == "foshanrenyi") {

          let pageIndex = node.parent.childNodes.map((item, index) => {
            if (item.id == data.$treeNodeId) {
              return index - node.parent.childNodes.length;
            }
          });
          let pages = String(
            pageIndex.find((item) => item !== undefined)
          ).substring(1);
          return h("span", { class: { "tree-node": true }, style: pageStyle }, [
            h("img", { attrs: { src: icon } }),
            h("span", {}, `第${pages}页`),
            h("span", {}, node.label),
          ]);
        } else {
          /* 逻辑一直没改过。但是有一次发包过去厚街，医院非说这两张表以前没有状态的。直接强制去掉 */
          if( (data.formName=="生长发育评估量表"||data.formName=="住院病人处理单") && this.HOSPITAL_ID=='hj'){
             icon = fileicon;
          }
          return h("span", { class: { "tree-node": true } }, [
            h("img", { attrs: { src: icon } }),
            h("span", {}, node.label),
          ]);
        }
      }
    },
    batchAudit(e, node,query) {
      e.stopPropagation()
      this.batchAuditForms = {...node.data,query}
      this.batchAuditDialog = true
    },
    handleCloseBatchAudit(refresh) {
      this.batchAuditDialog = false
      if (refresh) {
        this.refreshTree(true)
      }
    },
    handleViewClick(e, node) {
      e.stopPropagation();
      if (node && node.childNodes && node.childNodes.length > 0) {
        node = node.childNodes[0];
      }
      this.bus.$emit(
        "openAssessmentBox",
        Object.assign({}, getFormConfig(node.data.formName), {
          id: node.data.form_id,
          formCode: node.parent.data.formCode,
          showCurve: node.parent.data.showCurve,
          creator: node.parent.data.creator,
          listPrint: node.parent.data.listPrint,
          nooForm: node.parent.data.nooForm,
          pageUrl: node.parent.data.pageUrl,
          isPrintPreview: true,
        })
      );
    },

    getBlockByPV() {
      if (this.HOSPITAL_ID == "hj" || this.HOSPITAL_ID == "houjie") {
        getBlockByPV(
          this.$route.query.patientId,
          this.$route.query.visitId
        ).then((res) => {
          this.formTransfusionSafety = res.data.data || [];
        });
      } else if (this.HOSPITAL_ID == "huadu") {
        groupListHuadu(
          this.$route.query.patientId,
          this.$route.query.visitId
        ).then((res) => {
          this.formTransfusionSafety = res.data.data || [];
        });
      }
    },
    getTreeData() {
      this.treeLoading = true;
      Promise.all([
        groupList(this.$route.query.patientId, this.$route.query.visitId),
        // getInstanceByPatientInfo(
        //   this.$route.query.patientId,
        //   this.$route.query.visitId
        // ),
        this.getBlockByPV(),
      ])
        .then((res) => {
          let index = 0;
          window.app.$store.commit("cleanFormLastId");
          let list_1 = res[0].data.data.map((item) => {
            index += 1;
            return {
              label: item.formName,
              index: index,
              formCode: item.formCode,
              showCurve: item.showCurve,
              creator: item.creator,
              listPrint: item.listPrint,
              nooForm: item.nooForm,
              pageUrl: item.pageUrl,
              formTreeRemindType: item.formTreeRemindType,
              canBatchAudit: item.canBatchAudit,
              multiLine: item.multiLine,
              fillRemindType: item.fillRemindType,
              children:
                item.formInstanceDtoList &&
                item.formInstanceDtoList.map((option, i) => {
                  //
                  // item.formCode
                  // this.$store.state.form.upFormLastId
                  // window.app.$store.commit('upFormLastId', data)
                  if (item.formInstanceDtoList.length - 1 == i) {
                    window.app.$store.commit("upFormLastId", {
                      formName: item.formName,
                      formCode: item.formCode,
                      id: option.id,
                      patientId: this.$route.query.patientId,
                      visitId: this.$route.query.visitId,
                      evalDate: option.evalDate,
                    });
                  }
                  // formName: "疼痛护理单"
                  // 查找第一张填写的疼痛评估单
                  if (item.formName && item.formName === "疼痛护理单") {
                    if (item.formInstanceDtoList.length - 1 == i) {
                      localStorage[
                        "firtPainFormID" + this.$route.query.patientId
                      ] = option.id;
                    }
                  }
                  return {
                    status: option.status,
                    evalScore: option.evalScore || "",
                    deptCode: option.deptCode,
                    deptName: option.deptName,
                    label: `${option.evalDate}
                  ${option.countSize ? option.countSize + "条" : ""}
                  ${option.evalScore ? option.evalScore + "分" : ""}
                  ${option.pusherName ? option.pusherName : option.creatorName}
                  ${this.HOSPITAL_ID == 'whfk' ? '' : option.status == 0 ? "T" : option.status}`,
                    form_id: option.id,
                    formName: item.formName,
                    formTreeRemindType: item.formTreeRemindType,
                    pageIndex: item.formInstanceDtoList.length - i,
                    multiLine: item.multiLine,
                    fillRemindType: item.fillRemindType,
                    signStatus: option.signStatus
                  };
                }),
            };
          });
          //
          // upFormTree
          if (list_1) {
            window.app.$store.commit("upFormTree", [...list_1]);
          }
          //
          let list_2 = (info) => {
            index += 1;
            info = info.filter((opt) => opt.status != "-1");
            return {
              label: "健康教育单",
              index: index,
              formCode: "eduMission",
              // showCurve: item.showCurve,
              // creator: item.creator,
              // listPrint: item.listPrint,
              nooForm: 1,
              pageUrl: "健康教育单.html",
              children: info.map((option) => {
                return {
                  status: option.status,
                  label:
                    "健康教育单 " +
                    `${moment(option.creatDate).format("YYYY-MM-DD HH:mm")} ${
                      option.evalScore ? option.evalScore + "分" : ""
                    } ${option.creatorName} ${
                      option.status == 0 ? "T" : option.status
                    }`,
                  form_id: option.id,
                  formName: "健康教育单",
                  pageTitle: option.title,
                  missionId: option.missionId,
                };
              }),
            };
          };

          // if (res[1].data.data.length > 0) {
          //   list_1.push(list_2(res[1].data.data));
          // }
          let list_3 = [];
          switch (this.HOSPITAL_ID) {
            case "hj":
              list_3 = this.createListHj(index);
              break;
            case "huadu":
              list_3 = this.createListHd();
              break;
            default:
              break;
          }
          list_1 = list_1.filter(
            (item) => item.formCode != "form_transfusion_safety"
          );
          if (this.formTransfusionSafety.length) {
            list_1.push(list_3);
          }

          //区分患者转科------------------------------------------------------------------------------------------------------
          if(process.env.formPage_change_major){
            let newList = []
            list_1.map((item,index)=>{
              //处理患者转科前的表单
              //每个科室对应的表单数组
              let dptObj = {}
              item.children.map((childrenItem,childrenIdx)=>{
                !dptObj[childrenItem.deptName] ? dptObj[childrenItem.deptName] = [childrenItem] : dptObj[childrenItem.deptName] = [...dptObj[childrenItem.deptName],childrenItem]
              })
              for (let i in dptObj){
                let newObj = {}
                newObj = JSON.parse(JSON.stringify(item))
                newObj.label = list_1[index].label + "(" + i + ")"
                newObj.children = dptObj[i]
                newList.push(newObj)
              }
            })
            list_1 = [...newList]
          }

          //区分患者转科------------------------------------------------------------------------------------------------------
          if (this.filterObj) {
            this.regions = list_1.filter(
              (item) => item.label == this.filterObj.label
            );
          } else {
            this.regions = list_1;
          }

          // if (
          //   this.HOSPITAL_ID == "hj" &&
          //   window.location.href.includes("showPatientDetails")
          // ) {
          //   let obj = this.regions.find(item => {
          //     return item.formCode == "E0064";
          //   });
          //   this.regions = [obj];
          // }

          if (this.HOSPITAL_ID == "hj") {
            this.isTransferToWard();
          }
        })
        .then((res) => {
          this.treeLoading = false;
        });
    },
    node_expand(curNode) {
      if (this.expandListCopy.indexOf(curNode.index) == -1) {
        this.expandListCopy.push(curNode.index);
      }
    },
    node_collapse(curNode) {
      this.expandListCopy.remove(curNode.index);
    },
    newRecordOpen() {
      this.$refs.newForm.open(this.filterObj);
    },
    refreshTree(isAllRefresh = false) {
      if (isAllRefresh) {
        this.expandList = [];
      } else {
        this.expandList = this.expandListCopy;
        this.bus.$emit("refreshFormPagePatientList");
      }
      this.getTreeData();
      this.ifTree = false;
      this.$nextTick(() => {
        this.ifTree = true;
      });
      this.bus.$emit("activeAllButons");
    },
    updateTree() {
      this.expandList = this.expandListCopy || [];
      this.getTreeData();
      this.ifTree = false;
      this.$nextTick(() => {
        this.ifTree = true;
      });
      this.bus.$emit("activeAllButons");
    },
    updateTreeData(formcode) {
      this.$route.query["treeData"] = this.regions;
    },
    toLoadPatientDetial(callback = null, query = this.$route.query) {
      commonData
        .loadPatient(query.patientId, query.visitId)
        .then((res) => {
          try {
            if (res && res.data && res.data.data["admissionDateTime"]) {
              res.data.data["admissionDateTime"] = moment(
                res.data.data["admissionDate"]
              ).format("YYYY-MM-DD HH:mm");
            }

            this.$route.query["patientInfo"] = res.data.data;
            localStorage["patientInfo" + query.patientId] = JSON.stringify(
              this.$route.query["patientInfo"]
            );
          } catch (error) {
          }
          if (callback && res) {
            callback(res);
          }

          return res;
        })
        .catch((err) => {
          if (callback && err) {
            callback(err);
          }
        });
    },
    // 患者：是否进入过重症医学科个护理单元
    isTransferToWard() {
      let patientId = this.$route.query.patientId;
      let visitId = this.$route.query.visitId;
      hadTransferToWard(patientId, visitId, "610102").then((res) => {
        if (res.data.data) {
          let index = this.regions.length
            ? ++this.regions[this.regions.length - 1].index
            : 1;
          let obj = {
            label: "ICU护理记录单",
            index,
            pageUrl: `http://10.35.0.82/op.html?patientid=${patientId}&visitId=${visitId}`,
            nooForm: 2,
            islink: true,
          };
          this.regions.push(obj);
        }
      });
    },
  },
  created() {
    if(!this.$route.name){
      this.isPersonage = true;
    }
    if (!(this.$route.query.patientId && this.$route.query.visitId)) return;
    this.refreshTree(true);
    this.toLoadPatientDetial();
  },
  mounted() {
    this.bus.$on("toLoadPatientDetial", this.toLoadPatientDetial);
    this.bus.$on("getTreeData", this.getTreeData);
    this.bus.$on("updateTreeData", this.updateTreeData);
    this.bus.$on("refreshTree", this.refreshTree);
    this.bus.$on("updateTree", this.updateTree);
    this.bus.$on("getTreeRaw", (callback) => {
      if (callback) {
        callback(this.regions);
      }
    });
  },
  components: {
    SweetModal,
    SweetModalTab,
    newForm,
    BatchAuditForm,
  },
};
</script>
