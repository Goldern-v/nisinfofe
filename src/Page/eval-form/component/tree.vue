<template>
  <div>
    <el-row class="header" type="flex" justify="space-between" align="middle">
      <span class="title">护理文书</span>
      <el-button type="text" class="new-btn" @click="newRecordOpen">
        <i class="el-icon-plus"></i>创建
      </el-button>
    </el-row>
    <div class="body" :style="{height: height}" v-loading="treeLoading">
      <el-tree
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  color: #687179;
  position: relative;
  top: 3px;

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
import { SweetModal, SweetModalTab } from "@/plugin/sweet-modal-vue";
import {
  listPatientRecord,
  emrList,
  groupList,
  getInstanceByPatientInfo,
  listRecord
} from "@/api/patientInfo";
import moment from "moment";
import commonData from "@/api/commonData"; //入院HIS数据等
import BusFactory from "vue-happy-bus";
import newForm from "../modal/new-form.vue";
import commonMixin from "@/common/mixin/common.mixin";
import { getFormConfig } from "../config/form-config.js";
export default {
  mixins: [commonMixin],
  data() {
    return {
      regions: [],
      bus: BusFactory(this),
      treeLoading: false,
      expandList: [],
      expandListCopy: [],
      ifTree: true
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      if (this.$route.path == "/formPage") {
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
    nodeClick(data, node) {},
    renderContent(h, { node, data, store }) {
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

      if (hasSave && this.HOSPITAL_ID !== "weixian") {
        box = fileboxRed;
      } else if (hasSign && this.HOSPITAL_ID !== "weixian") {
        box = fileboxGreen;
      } else {
        box = filebox;
      }

      if (fileHasSave && this.HOSPITAL_ID !== "weixian") {
        icon = fileiconRed;
      } else if (fileHasSign && this.HOSPITAL_ID !== "weixian") {
        icon = fileiconGreen;
      } else {
        icon = fileicon;
      }
      if (node.level !== 2) {
        return (
          <span class="tree-box-node">
            {" "}
            <img src={box} />
            {node.label}
          </span>
        );
      } else {
        return (
          <span class="tree-node" title={node.label}>
            {" "}
            <img src={icon} />
            {node.label}
          </span>
        );
      }
    },
    getTreeData() {
      this.treeLoading = true;
      Promise.all([
        groupList(this.$route.query.patientId, this.$route.query.visitId),
        getInstanceByPatientInfo(
          this.$route.query.patientId,
          this.$route.query.visitId
        )
      ])
        .then(res => {
          console.log("Promise.all", res, res[1].data.data);
          let index = 0;
          let list_1 = res[0].data.data.map(item => {
            index += 1;
            return {
              label: item.formName || item.name || "",
              index: index,
              formCode: item.formCode,
              showCurve: item.showCurve,
              creator: item.creator,
              listPrint: item.listPrint,
              nooForm: item.nooForm,
              pageUrl: item.pageUrl,
              children: item.formInstanceDtoList.map((option, i) => {
                // formName: "疼痛护理单"
                let fName = item.formName || item.name || "";
                // 查找第一张填写的疼痛评估单
                if (fName && fName === "疼痛护理单") {
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
                  label: `${option.evalDate}
                  ${option.countSize ? option.countSize + "条" : ""}
                  ${option.evalScore ? option.evalScore + "分" : ""}
                  ${option.pusherName ? option.pusherName : option.creatorName}
                  ${option.status == 0 ? "T" : option.status}`,
                  form_id: option.id,
                  formName: item.formName || item.name || ""
                };
              })
            };
          });
          let list_2 = info => {
            index += 1;
            info = info.filter(opt => opt.status != "-1");
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
                // console.log(option,"option")
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
                  pageTitle: option.title
                };
              })
            };
          };
          // console.log(res[1].data.data.length,"res[1].data.data")
          if (res[1].data.data.length > 0) {
            list_1.push(list_2(res[1].data.data));
          }
          this.regions = list_1;
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
      this.$refs.newForm.open();
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
    updateTreeData(formcode) {
      this.$route.query["treeData"] = this.regions;
      // console.table(this.regions)
    }
  },
  created() {
    if (!(this.$route.query.patientId && this.$route.query.visitId)) return;
    this.refreshTree(true);
  },
  mounted() {
    this.bus.$on("getTreeData", this.getTreeData);
    this.bus.$on("updateTreeData", this.updateTreeData);
    this.bus.$on("refreshTree", this.refreshTree);
  },
  components: {
    SweetModal,
    SweetModalTab,
    newForm
  }
};
</script>
