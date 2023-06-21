<template>
  <div class="form-list-part">
    <div
      :style="isShow ? 'display:block' : 'display:none'"
      style="transition: width 2s"
    >
      <el-row class="header" type="flex" justify="space-between" align="middle">
        <span
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
        <!-- 评估单 -->
        <el-tree
          v-loading="treeLoading"
          v-if="ifTree"
          ref="formTree"
          class="record-tree"
          :data="regions"
          highlight-current
          :render-content="renderContent"
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
        @closeBatchAudit="handleCloseBatchAudit"
      />
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
    overflow: hidden;
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

  .flag-con {
    width: 10px;
    height: 73px;
    position: absolute;
    right: -11px;
    top: 100px;
    z-index: 10;
    background-image: url('../../../../../common/images/patient/隐藏框.png');
    cursor: pointer;

    &:hover {
      color: #5CC6A1;
    }

    i {
      font-size: 12px;
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
import BatchAuditForm from "../modal/BatchAuditForm.vue";
import { groupList, getEduFormList } from "@/api/patientInfo";
import moment from "moment";
import commonData from "@/api/commonData"; //入院HIS数据等
import BusFactory from "vue-happy-bus";
import newForm from "../modal/new-form.vue";
import commonMixin from "@/common/mixin/common.mixin";
import { getFormConfig } from "../config/form-config.js";
import { hadTransferToWard } from "../api/index.js";
import { DATA_CHANGE } from "@/utils/localStorage";
import { blockList } from "@/Page/sheet-page/api/index";

export default {
  props: {
    filterObj: Object,
    hasTagsView: Boolean
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
      hisLeftList: ["wujing", "huadu"], //是否要开放左侧收缩功能医院
      batchAuditDialog: false, // 批量审核表单弹框
      batchAuditForms: {}, // 批量审核节点数据
    };
  },
  computed: {
    // 标签高度
    tagsViewHeight() {
      return this.hasTagsView ? 35 : 0;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    flagTop() {
      return `${(this.wih + 85) * 0.4}px`;
    },
    height() {
      if (this.$route.path == "/formPage" || this.filterObj) {
        return `${this.wih - 120 - this.tagsViewHeight}px`;
      } else {
        return `${this.wih - 180 - this.tagsViewHeight}px`;
      }
    },
    openLeft() {
      return this.$store.state.sheet.openWritTreeLeft;
    }
  },
  watch: {
    "$route.params"() {
      if (!this.$route.query.patientId) {
        this.regions = [];
        this.bus.$emit("closeAssessment");
      }
    }
  },
  methods: {
    toOpenLeft() {
      this.$store.commit("upWritTreeLeft", !this.openLeft);
    },
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
    async nodeClick(data, node) {
      let isChange = localStorage.getItem(DATA_CHANGE);
      isChange = isChange ? JSON.parse(isChange) : false;
      if (isChange && node.level == 2) {
        // if (node.level == 2) {
        const comfirm = await this.$confirm(
          "入院评估单还未保存，是否需要离开页面?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            localStorage.setItem(DATA_CHANGE, false);
            return true;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
            return false;
          });
        if (!comfirm) return;
      }

      try {
        this.bus.$emit("activeAllButons");
        window.app.$CRMessageBox.notifyBox.close();
      } catch (error) {}
      let typelsit = ["sheet", "bloodSugar","healthEducation"];
      if(typelsit.includes(data.type)){
        if (node.level === 2) {
          this.bus.$emit("openOtherPage", data);
        }
      }else{
         if (node.level == 3) {
            this.$emit(
              "openFormTag",
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
                pageIndex: node.data.pageIndex,
                evalDate: node.data.label.slice(0, 16),
                node
              })
            );
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
        }
      }
    },
    renderContent(h, { node, data, store }) {
      //未签名
      let hasSave =
        node.childNodes.filter(item => {
          return item.data.status == "0";
        }).length > 0;

      //已签名
      let hasSign =
        node.childNodes.filter(item => {
          return item.data.status == "1";
        }).length > 0;

      let fileHasSave = node.data.status == 0;
      let fileHasSign = node.data.status == 1;
      let fileHasAudit = node.data.status == 2;
      let icon;
      let box;

      let formNoSign = node.data.formTreeRemindType == "0"; // 无签名
      let formSign = node.data.formTreeRemindType == "1"; // 责任（多人签名）
      let formAudit = node.data.formTreeRemindType == "2"; // 责任 + 审核
      // 文件夹
      // 责任 + 审核的情况
      if (formAudit) {
        // 责任 + 审核的情况
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
      // 责任（多人签名）的情况
      else if (formSign) {
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
      } else {
        // 没有签名的情况
        box = filebox;
        icon = fileicon;
      }
      let viewDom = h();
      let typelsit = ["sheet", "bloodSugar","healthEducation"];
      if (node.level == 1) {
        if (typelsit.includes(node.data.type)) {
          return h(
            "span",
            {
              class: { "tree-box-node": true },
              attrs: { title: node.data.label }
            },
            [
              h(
                "span",
                { attrs: { style: "font-size:14px; font-weight:bold;" } },
                node.label
              ),
              viewDom
            ]
          );
        } else {
          return h(
            "span",
            { class: { "tree-box-node": true }, attrs: { title: node.label } },
            [
              h(
                "span",
                { attrs: { style: "font-size:14px; font-weight:bold;" } },
                node.label
              ),
              viewDom
            ]
          );
        }
      } else if (node.level == 2 && !typelsit.includes(node.parent.data.type)) {
        return h("span", { class: { "tree-box-node": true } }, [
          h("img", { attrs: { src: box } }),
          h("span", {}, node.label),
          viewDom
        ]);
      } else {
        if (typelsit.includes(node.parent.data.type)) {
          return h("span", { class: { "tree-node": true } }, [
            h("img", { attrs: { src: fileicon } }),
            h("span", {}, node.label)
          ]);
        } else {
          return h("span", { class: { "tree-node": true } }, [
            h("img", { attrs: { src: icon } }),
            h("span", {}, node.label)
          ]);
        }
      }
    },
    handleCloseBatchAudit(refresh) {
      this.batchAuditDialog = false;
      if (refresh) {
        this.refreshTree(true);
      }
    },
    getTreeData() {
      this.treeLoading = true;
      let params = {patientId: this.$route.query.patientId, visitId:this.$route.query.visitId,deptCode: this.$store.state.lesion.deptCode}
      Promise.all([
        groupList(params.patientId, params.visitId),
        blockList(
          params.patientId,
          params.visitId,
          params.deptCode
        ),
        getEduFormList({patientId: params.patientId,
          visitId:params.visitId,})
      ])
        .then(res => {
          let index = 0;
          window.app.$store.commit("cleanFormLastId");
          let list_1 = res[0].data.data.map(item => {
            index += 1;
            return {
              label: item.formName,
              type: "record",
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
                  if (item.formInstanceDtoList.length - 1 == i) {
                    window.app.$store.commit("upFormLastId", {
                      formName: item.formName,
                      formCode: item.formCode,
                      id: option.id,
                      patientId: this.$route.query.patientId,
                      visitId: this.$route.query.visitId,
                      evalDate: option.evalDate
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
                  ${option.status == 0 ? "T" : option.status}`,
                    form_id: option.id,
                    formName: item.formName,
                    formTreeRemindType: item.formTreeRemindType,
                    pageIndex: item.formInstanceDtoList.length - i,
                    multiLine: item.multiLine,
                    fillRemindType: item.fillRemindType,
                    signStatus: option.signStatus
                  };
                })
            };
          });
          //
          let list_2 = res[1].data.data.list.map(item => {
            return {
              label: `${item.recordName} ${item.createTime}`,
              type: "sheet",
              ...item
            };
          });
          let list_3 = [{
            label:'血糖单',
            type: "bloodSugar"
          }]
          let list_4 = res[2].data.data.map(item => {
            return {
              label: `健康教育单 ${item.creatDate}`,
              type: "healthEducation",
              ...item
            };
          });
          // upFormTree
          if (list_1) {
            window.app.$store.commit("upFormTree", [...list_1]);
          }
          list_1 = list_1.filter(
            item => item.formCode != "form_transfusion_safety"
          );

          //区分患者转科------------------------------------------------------------------------------------------------------
          if (process.env.formPage_change_major) {
            let newList = [];
            list_1.map((item, index) => {
              //处理患者转科前的表单
              //每个科室对应的表单数组
              let dptObj = {};
              item.children.map((childrenItem, childrenIdx) => {
                !dptObj[childrenItem.deptName]
                  ? (dptObj[childrenItem.deptName] = [childrenItem])
                  : (dptObj[childrenItem.deptName] = [
                      ...dptObj[childrenItem.deptName],
                      childrenItem
                    ]);
              });
              for (let i in dptObj) {
                let newObj = {};
                newObj = JSON.parse(JSON.stringify(item));
                newObj.label = list_1[index].label + "(" + i + ")";
                newObj.children = dptObj[i];
                newList.push(newObj);
              }
            });
            list_1 = [...newList];
          }

          //区分患者转科------------------------------------------------------------------------------------------------------
          if (this.filterObj) {
            this.regions = list_1.filter(
              item => item.label == this.filterObj.label
            );
          } else {
            this.regions = [
              {
                label: "护理评估单",
                type: "record",
                children: [...list_1]
              },
              {
                label: "护理记录单",
                type: "sheet",
                children: [...list_2]
              },
              {
                label: "血糖单",
                type: "bloodSugar",
                children: [...list_3]
              },
              {
                label: "健康教育单",
                type: "healthEducation",
                children: [...list_4]
              }
            ];
          }
        })
        .then(res => {
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
      if(!(this.$route.query.patientId && this.$route.query.visitId )) return
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
        .then(res => {
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
          } catch (error) {}
          if (callback && res) {
            callback(res);
          }

          return res;
        })
        .catch(err => {
          if (callback && err) {
            callback(err);
          }
        });
    },
    // 点击标签高亮对应树节点
    onHighlightTreeNode(form) {
      // 设置当前高亮树节点
      this.$nextTick(() => {
        if (form && form.node) {
          // 1.x版本的el-tree没有 setCurrentKey 方法，使用 store.setCurrentNode 方法
          this.$refs.formTree &&
            this.$refs.formTree.store.setCurrentNode(form.node || null);
          // 未展开
          if (!form.node.expanded) {
            form.node.parent.expand();
          }
        }
      });
    }
  },
  created() {
    if (!this.$route.name) {
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
    this.bus.$on("getTreeRaw", callback => {
      if (callback) {
        callback(this.regions);
      }
    });
    this.bus.$on("highlightTreeNode", this.onHighlightTreeNode);
  },
  components: {
    SweetModal,
    SweetModalTab,
    newForm,
    BatchAuditForm
  }
};
</script>
