<template>
  <div>
    <div class="body">
      <el-tree
        v-loading="treeLoading"
        v-if="ifTree"
        class="record-tree"
        :data="configList"
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
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
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

import moment from "moment";
import commonData from "@/api/commonData"; //入院HIS数据等
import BusFactory from "vue-happy-bus";

import commonMixin from "@/common/mixin/common.mixin";

export default {
  props: {
    configList: Array
  },
  mixins: [commonMixin],
  data() {
    return {
      regions: [
        {
          label: 1234,
          children: [
            {
              label: 222
            }
          ]
        }
      ],
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
    }
  },

  methods: {
    nodeClick(data, node) {
      if (node.level === 2) {
        data.onClick(data);
      }
    },
    renderContent(h, { node, data, store }) {
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

      if (hasSave) {
        box = fileboxRed;
      } else if (hasSign) {
        box = filebox;
      } else {
        box = filebox;
      }

      if (fileHasSave) {
        icon = fileiconRed;
      } else if (fileHasSign) {
        icon = fileicon;
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
    }
  },
  created() {},
  mounted() {},
  components: {}
};
</script>
