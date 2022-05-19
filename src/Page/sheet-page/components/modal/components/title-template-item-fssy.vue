<template>
  <div>
    <!-- <div class="item-con" @click="addTemplateAtDoc"> -->
    <div class="item-con">
      <!-- <div class="title">{{data.name}}</div> -->

      <el-tree
        :data="datalist"
        :render-content="renderContent"
        :props="{
          children: 'list'
        }"
        @node-click="addTemplateAtDoc"
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
    <addTitletemplateModalFssy ref="addTitletemplateModalFssyss"></addTitletemplateModalFssy>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.item-con {
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
>>> .el-tree-node__content{
  display: flex;
  align-items:center ;
}
>>> .custom-tree-node {
  font-size: 14px;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
>>> .tooltipcls{
  margin-right: 10px;
}
</style>
<script>
import bus from "vue-happy-bus";
import data from "../../../sheet";
import { dictDelete } from "@/api/common";
import sheetInfo from "../../config/sheetInfo";
import common from "@/common/mixin/common.mixin";
import {titleTempalateList,deleteId,deleteGroup} from "../api/index"
import addTitletemplateModalFssy from '../add-title-template-modal-fssy.vue';
export default {
  mixins: [common],
  props: {
    listData: Array,
  },
  data() {
    return {
      bus: bus(this),
      msg: "hello vue",
      datalist: [],
    };
  },
  watch:{
    listData(newValue){
      // console.log(newValue);
      this.datalist = newValue
    }
  },
  mounted(){
    this.datalist = this.listData
  },
  methods: {
    renderContent(h, { node, data, store }) {
      if(node.level == 1){
        return (
          <span
            class="custom-tree-node"
          >
            <span>{data.title}</span>
            <span style="margin-left:10px">
              <el-tooltip content="编辑" placement="bottom" effect="dark" class="tooltipcls">
                <i class="iconfont icon-hulijiludan" on-click={(e)=>{
                  e.stopPropagation()
                  this.toEdit(e,data)
                  }}></i>
              </el-tooltip>
              <el-tooltip content="删除" placement="bottom" effect="dark">
                <i
                  class="iconfont icon-shanchuzhenghang"
                  on-click={(e)=>{
                    e.stopPropagation()
                    this.toDel(data)
                  }}
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
            <span>{data.options}</span>
            <span style="margin-left:10px">
              <el-tooltip content="删除" placement="bottom" effect="dark">
                <i
                  class="iconfont icon-shanchuzhenghang"
                  on-click={(e)=>{
                    e.stopPropagation()
                    this.toDeleteById(data)
                  }}
                ></i>
              </el-tooltip>
            </span>
          </span>
        );
      }
    },
    addTemplateAtDoc(data) {
      if (data.title == undefined) return
      this.bus.$emit("addTitleTemplateFS", data);
    },
    toEdit(event,data) {
      console.log(event,data);
      // this.bus.$emit("openAddTitleTemplateModalFS", data);
      this.$refs.addTitletemplateModalFssyss.open(data)

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
    /**删除标题模板 */
    toDel(data) {
      this.$confirm("此操作将永久删除该含选项标题版, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          id: data.id
        };
        deleteGroup(obj).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.bus.$emit("refreshTitleTemplate");
        });
      });
    },
    /**删除标题模板选项 */
    toDeleteById(data) {
      this.$confirm("此操作将永久删除该自定义标题选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let id = data.id
        deleteId(id).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.bus.$emit("refreshTitleTemplate");
        });
      });
    },
  },
  components: {
    addTitletemplateModalFssy,
  },
};
</script>
