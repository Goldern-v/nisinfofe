<template>
  <div>
    <el-row class="header" type="flex" justify="space-between" align="middle">
      <span
        class="title"
        style="cursor:pointer"
        @click="refreshTree()"
        @dblclick="refreshTree(true)"
      >护理文书</span>
      <el-button type="text" class="new-btn" @click="newRecordOpen">
        <i class="el-icon-plus"></i>创建
      </el-button>
    </el-row>
    <div class="body" :style="{height: height}">
      <el-tree
        v-loading="treeLoading"
        v-if="ifTree"
        class="record-tree"
        :data="regions"
        highlight-current
        :render-content="renderContent"
        @node-click="nodeClick"
        node-key="index"
        :default-expanded-keys="expandList"
        @node-expand="node_expand"
        @node-collapse="node_collapse"
      ></el-tree>
      <div style="height: 20px"></div>
    </div>
    <!-- 弹出框 -->
    <newForm ref="newForm"></newForm>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
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
    line-height 30px;
    border: 1px solid #eee;
    box-shadow: 0 2px 4px 0 #eee;
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
import {
  listPatientRecord,
  emrList,
  groupList,
  groupListHuadu,
  getInstanceByPatientInfo,
  listRecord,
  getBlockByPV
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
    filterObj: Object
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
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      if (this.$route.path == "/formPage" || this.filterObj) {
        return `${this.wih - 120}px`;
      } else {
        return `${this.wih - 180}px`;
      }
    }
  },
  watch: {
    "$route.params"() {
      // this.params = this.$route.params
      // this.$route.query
      console.log(
        "params:",
        this.$route.params,
        "query:",
        this.$route.query,
        "regions",
        this.regions
      );
      if (!this.$route.query.patientId) {
        this.regions = [];
        this.bus.$emit("closeAssessment");
      }

      console.log(
        "params:",
        this.$route.params,
        "query:",
        this.$route.query,
        "--regions",
        this.regions
      );
    }
  },
  methods: {
    createListHj(){
       return {
            label: "输血安全护理记录单",
            index: index + 1,
            formCode: "form_transfusion_safety",
            nooForm: 2,
            pageUrl: "输血安全护理记录单.html",
            children: this.formTransfusionSafety.map(option => {
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
                formName: "输血安全护理记录单"
              };
            })
          };
    },
    createListHd(){
       return {
            label: "输血安全护理记录单",
            formCode: "E0314",
            nooForm: 2,
            pageUrl: "输血安全护理记录单.html",
            children: this.formTransfusionSafety.map(option => {
              return {
                status: option.status,
                label: `${option.evalDate.substring(0,16)}
                  ${option.signerNo}`,
                // ${option.status == 0 ? "T" : option.status}`,
                form_id: option.entityId,
                formName: "输血安全护理记录单"
              };
            })
          };
    },
    nodeClick(data, node) {
      console.log(
        "nodeClick",
        {data, node},
        node.parent,
        node.data.formName,
        data.pageTitle
      );
      // window.app.$store.commit('upFormFilledData', data)
      // wid.setTitle(data.pageTitle+"健康教育单")
      // this.bus.$emit("disableAllButons");

      try {
        // if (data.formName && data.formName.includes("入院评估表")) {
        //   this.bus.$emit("disableAllButons");
        //   // this.bus.$emit("visibleButtons", { name: "", bool: false });
        // } else {
        this.bus.$emit("activeAllButons");
        // this.bus.$emit("visibleButtons", { name: "", bool: false });
        // }
        window.app.$CRMessageBox.notifyBox.close();
      } catch (error) {
        console.error("nodeClickError", error);
      }
      //
      // console.log("555555555555")
      // rgb(228, 241, 240)
      if (node.level === 2) {
        if (node.parent.label != "记录单") {
          console.log("---$emit('openAssessment')");
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
              missionId: data.missionId
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
            islink: node.data.islink
          })
        );
      }
    },
    renderContent(h, {node, data, store}) {
      // let fileicon = fileicon
      // let filebox = filebox
      // // 如果存在保存
      // console.log("111",node.childNodes,node.level)
      let hasSave =
        node.childNodes.filter(item => {
          return item.data.status == "0";
        }).length > 0;
      let hasSign =
        node.childNodes.filter(item => {
          return item.data.status == "1";
        }).length > 0;

      let fileHasSave = node.data.status == 0;
      let fileHasSign = node.data.status == 1;
      let icon;
      let box;

      let formNoSign = node.data.formTreeRemindType == '0'; // 无签名
      let formSign = node.data.formTreeRemindType == '1'; // 责任（多人签名）
      let formAudit = node.data.formTreeRemindType == '2'; // 责任 + 审核

      // 花都特殊处理
      if (this.HOSPITAL_ID == "huadu" || this.HOSPITAL_ID == "liaocheng" || this.HOSPITAL_ID == "zhongshanqi") {
        // 文件夹
        // 责任 + 审核的情况
        if (formAudit) {// 责任 + 审核的情况
          if (this.HOSPITAL_ID == "zhongshanqi") { // 中山七颜色处理
            if (hasSave) {
              box = fileboxYellow;
            }// 未签名
            else if (hasSign) {
              box = fileboxRed;
            }// 责任 + 审核的情况 责任签名
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
            }// 未签名
            else if (hasSign) {
              box = fileboxGreen;
            }// 责任 + 审核的情况 责任签名
            else if (fileHasSave) {
              icon = fileiconRed;
            }// 未签名
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
          if (this.HOSPITAL_ID == "zhongshanqi") { // 责任（多人签名）的情况 未签名
            if (hasSave) {
              box = fileboxYellow;
            }// 未签名
            else if (hasSign) {
              box = fileboxGreen;
            }// // 责任（多人签名）的情况 责任签名
            else if (fileHasSave) {
              icon = fileiconYellow;
            } else if (fileHasSign) {
              icon = fileiconGreen;
            } else {
              box = fileboxGreen;
              icon = fileiconGreen;
            }// // 责任（多人签名）的情况 责任签名
          } else {
            if (hasSave) {
              box = fileboxRed;
            }// 未签名
            else if (hasSign) {
              box = filebox;
            }// 责任（多人签名）的情况 责任签名
            else if (fileHasSave) {
              icon = fileiconRed;
            } else if (fileHasSign) {
              icon = fileicon;
            } else {
              box = filebox;
              icon = fileicon;
            }
          }
        } else { // 没有签名的情况
          box = filebox;
          icon = fileicon;
        }
      } else {
        // 文件夹
        if (hasSave && this.HOSPITAL_ID !== "weixian") {
          box = fileboxRed;
        } else if (hasSign && this.HOSPITAL_ID !== "weixian") {
          box = fileboxGreen;
        } else {
          box = filebox;
        }
        // 内容
        if (fileHasSave && this.HOSPITAL_ID !== "weixian") {
          icon = fileiconRed;
        } else if (fileHasSign && this.HOSPITAL_ID !== "weixian") {
          icon = fileiconGreen;
        } else {
          icon = fileicon;
        }
      }
      let viewDom = h()
      if (this.HOSPITAL_ID === "liaocheng" || this.HOSPITAL_ID === "quzhou") {
        viewDom = h(
          'div',
          {class: {'view': true}, on: {click: (e) => this.handleViewClick(e, node, data)}},
          [
            h('i', {class: {'el-icon-view': true}}),
          ],
        )
      }
      if (node.level !== 2) {
        return h('span',
          {class: {'tree-box-node': true}},
          [
            h('img', {attrs: {src: box}}),
            h('span', {}, node.label),
            viewDom
          ]
        )
      } else {
        return h('span',
          {class: {'tree-node': true}},
          [
            h('img', {attrs: {src: icon}}),
            h('span', {}, node.label)
          ]
        )
      }
    },
    handleViewClick(e, node) {
      e.stopPropagation()
      if (node && node.childNodes && node.childNodes.length > 0) {
        node = node.childNodes[0]
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
          isPrintPreview: true
        })
      );
    },
    handlePrintClick(e,node,data){
      console.log(e,node,data);

    },
    getBlockByPV() {
      if (this.HOSPITAL_ID == "hj" || this.HOSPITAL_ID == "houjie") {
        getBlockByPV(
          this.$route.query.patientId,
          this.$route.query.visitId
        ).then(res => {
          this.formTransfusionSafety = res.data.data || [];
        });
      }else if(this.HOSPITAL_ID == "huadu"){
        groupListHuadu(this.$route.query.patientId, this.$route.query.visitId).then(res => {
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
        this.getBlockByPV()
      ])
        .then(res => {
          console.log("Promise.all", res);
          let index = 0;
          //
          window.app.$store.commit("cleanFormLastId");
          //
          let list_1 = res[0].data.data.map(item => {
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
              children: item.formInstanceDtoList && item.formInstanceDtoList.map((option, i) => {
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
                    evalDate: option.evalDate
                  });
                }
                // formName: "疼痛护理单"
                // 查找第一张填写的疼痛评估单
                if (item.formName && item.formName === "疼痛护理单") {
                  // console.log("===疼痛护理单",i,option,item.formInstanceDtoList.length)
                  if (item.formInstanceDtoList.length - 1 == i) {
                    // console.log("--疼痛护理单",i,option,item.formInstanceDtoList.length)
                    // /crNursing/api/eval/detail/{id}
                    localStorage[
                    "firtPainFormID" + this.$route.query.patientId
                      ] = option.id;
                  }
                }
                return {
                  status: option.status,
                  evalScore: option.evalScore || "",
                  label: `${option.evalDate}
                  ${option.countSize ? option.countSize + "条" : ""}
                  ${option.evalScore ? option.evalScore + "分" : ""}
                  ${option.pusherName ? option.pusherName : option.creatorName}
                  ${option.status == 0 ? "T" : option.status}`,
                  form_id: option.id,
                  formName: item.formName,
                  formTreeRemindType: item.formTreeRemindType

                };
              })
            };
          });
          //
          // upFormTree
          if (list_1) {   
            window.app.$store.commit("upFormTree", [...list_1]);
          }
          //
          let list_2 = info => {
            index += 1;
            info = info.filter(opt => opt.status != "-1");
            // console.log("健康教育单info", info);
            return {
              label: "健康教育单",
              index: index,
              formCode: "eduMission",
              // showCurve: item.showCurve,
              // creator: item.creator,
              // listPrint: item.listPrint,
              nooForm: 1,
              pageUrl: "健康教育单.html",
              children: info.map(option => {
                // console.log(option, "健康教育单option");
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
                  missionId: option.missionId
                };
              })
            };
          };

          // console.log(res[1].data.data.length,"res[1].data.data")
          // if (res[1].data.data.length > 0) {
          //   list_1.push(list_2(res[1].data.data));
          // }
          let list_3 = []
          switch(this.HOSPITAL_ID){
            case 'hj':
              list_3 = this.createListHj();
              break;
            case 'huadu':
              list_3 = this.createListHd();
              break;
            default:
              break;
          }

          list_1 = list_1.filter(
            item => item.formCode != "form_transfusion_safety"
          );
          if (this.formTransfusionSafety.length) {
            list_1.push(list_3);
          }

          if (this.filterObj) {
            this.regions = list_1.filter(
              item => item.label == this.filterObj.label
            );
          } else {
            this.regions = list_1;
          }
          console.log(this.regions);

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
          // console.log(list_1, "list_1list_1list_1");
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
      // console.log(this.filterObj);
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
      // console.table(this.regions)
    },
    toLoadPatientDetial(callback = null, query = this.$route.query) {
      // console.log("toLoadPatientDetial", query, this.$route.query);
      // let query = this.$route.query;
      commonData
        .loadPatient(query.patientId, query.visitId)
        .then(res => {
          try {
            // console.log("-入院病人资料:", res, res.data.data);
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
            console.log("入院病人资料error:", res, error);
          }

          if (callback && res) {
            callback(res);
          }

          return res;
        })
        .catch(err => {
          console.log("入院病人资料err:", err);
          if (callback && err) {
            callback(err);
          }
        });
    },
    // 患者：是否进入过重症医学科个护理单元
    isTransferToWard() {
      let patientId = this.$route.query.patientId;
      let visitId = this.$route.query.visitId;
      hadTransferToWard(patientId, visitId, '610102').then(res => {
        if (res.data.data) {
          let index = this.regions.length ? ++this.regions[this.regions.length - 1].index : 1;
          let obj = {
            label: "ICU护理记录单",
            index,
            pageUrl: `http://10.35.0.82/op.html?patientid=${patientId}&visitId=${visitId}`,
            nooForm: 2,
            islink: true
          };
          this.regions.push(obj);
        }
      })
    }
  },
  created() {
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
      // console.log("tree:", this.regions);
      // return this.regions;
    });
  },
  components: {
    SweetModal,
    SweetModalTab,
    newForm
  }
};
</script>
