<template>
  <div>
    <!-- <div class="item-con" @click="addTemplateAtDoc"> -->
    <div class="item-con">
      <!-- <div class="title">{{data.name}}</div> -->

      <el-tree
        :data="datalist"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      >
      </el-tree>
      <!-- <div class="tool-box" flex="cross:center">
        <el-tooltip content="编辑" placement="bottom" effect="dark">
          <i class="iconfont icon-hulijiludan" @click.stop="toEdit"></i>
        </el-tooltip>
        <el-tooltip content="删除" placement="bottom" effect="dark">
          <i class="iconfont icon-shanchuzhenghang" @click.stop="toDel"></i>
        </el-tooltip>
      </div> -->
    </div>
    <!-- <div class="line"></div> -->
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.item-con {
  // position: relative;
  // padding: 10px 20px;

  

  &:hover {
    background: #f4f2f5;
    cursor: pointer;
    transition: all 0.3s;

    .tool-box {
      display: flex;
    }

    .title {
      min-height: 14px;
    }
  }

  .title {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    padding-right: 50px;
    min-height: 0px;
    margin-bottom: 10px;
  }

  .desc {
    font-size: 13px;
    color: #687179;
    line-height: 18px;
  }

  .tool-box {
    position: absolute;
    bottom: 0px;
    right: 5px;
    display: none;

    i {
      color: #687179;
      font-size: 16px;
      padding: 4px 2px;
    }
  }
}

.line {
  background: #ECEEEF;
  height: 1px;
  margin: 0 20px;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .custom-tree-node {
    font-size: 14px;
    width: 90%;
    display: flex;
    position: relative;
    top: -33px;
    left: 25px;
    justify-content: space-between;
  }
  .tooltipcls{
    margin-right: 10px;
  }
</style>
<script>
import bus from "vue-happy-bus";
import data from "../../../sheet";
import { dictDelete } from "@/api/common";
import sheetInfo from "../../config/sheetInfo";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  props: {
    data: Object,
  },
  data() {
    return {
      bus: bus(this),
      msg: "hello vue",
      datalist: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
            },
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    renderContent(h, { node, data, store }) {
      console.log(node,data,'ddddddddddd');
      if(node.level == 1){
        return (
          <span
            class="custom-tree-node"
          >
            <span>{node.label}</span>
            <span style="margin-left:10px">
              <el-tooltip content="编辑" placement="bottom" effect="dark" class="tooltipcls">
                <i class="iconfont icon-hulijiludan" on-click={this.toEdit}></i>
              </el-tooltip>
              <el-tooltip content="删除" placement="bottom" effect="dark">
                <i
                  class="iconfont icon-shanchuzhenghang"
                  on-click={this.toDel}
                ></i>
              </el-tooltip>
            </span>
          </span>
        );
      }else{
          return (
          <span
            class="custom-tree-node"
          >
            <span>{node.label}</span>
            <span style="margin-left:10px">
              <el-tooltip content="删除" placement="bottom" effect="dark">
                <i
                  class="iconfont icon-shanchuzhenghang"
                  on-click={this.toDel}
                ></i>
              </el-tooltip>
            </span>
          </span>
        );
      }
    },
    addTemplateAtDoc() {
      this.bus.$emit("addTitleTemplateFS", this.data.name);
    },
    toEdit( event ) {
      event.preventDefault();
      this.bus.$emit("openAddTitleTemplateModalFS", this.data);
    },
    getRecordCode() {
      if (
        this.$route.path.includes("newSingleTemperatureChart") ||
        this.$route.path.includes("temperature")
      ) {
        return true;
      } else {
        return false;
      }
    },
    toDel() {
      this.$confirm("此操作将永久删除该自定义标题版, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = {
          dictCode: "自定义标题",
          itemCode: this.data.name,
          deptCode: this.deptCode,
          recordCode:
            //北海体温单调用护理记录单模板
            this.getRecordCode() ? "bodyTemperature" : sheetInfo.sheetType,
          moduleCode: this.getRecordCode() ? "bodyTemperature" : "",
          wardCode: this.deptCode,
        };
        dictDelete(data).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.bus.$emit("refreshTitleTemplate");
        });
      });
    },
  },
  components: {},
};
</script>
