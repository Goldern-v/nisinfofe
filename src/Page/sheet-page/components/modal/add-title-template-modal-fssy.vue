<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="460"
      :title="modalTitle"
      :enable-mobile-fullscreen="false"
    >
      <div style="margin-bottom: 20px">
        <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="纯标题模板" style="display: flex;" name="first">
            <div class="tab-list-item">
              <p for class="title" style="margin-right: 10px">标题：</p>
              <el-input type="text" v-model="titleName"></el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="含选项标题模板" name="second">
            <div class="tab-list-item">
              <p for class="title" style="margin-right: 10px">标题：</p>
              <el-input type="text" v-model="titleName"></el-input>
            </div>
            <div
              class="tab-list-item"
              v-for="(contentItem, contentIndex) in contentList"
              :key="contentIndex"
            >
              <p for class="title" style="margin-right: 10px">内容：</p>
              <el-input type="text" v-model="contentItem.options"> </el-input>
              <el-tooltip content="删除" placement="bottom" effect="dark">
                <i
                  class="iconfont icon-shanchuzhenghang"
                  @click.stop="toDel(contentIndex)"
                ></i>
              </el-tooltip>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div
        slot="button"
        :style="isAddList ? 'display:flex; justify-content:space-between' : ''"
      >
        <el-button
          class="modal-btn"
          type="text"
          @click="addContent"
          v-show="isAddList"
          >+添加可选项</el-button
        >
        <div>
          <el-button class="modal-btn" @click="close">取消</el-button>
          <el-button class="modal-btn" type="primary" @click="post"
            >保存</el-button
          >
        </div>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title{
   width 60px;
  font-weight bold;
}
>>>textarea{
  height 100px
}

>>>.el-tab-pane{
  display: flex;
  flex-wrap: wrap;
  .tab-list-item{
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom:10px;
  }
}
>>>.el-tabs__item.is-active{
  color: #fff;
  background: rgb(4 165 128);
}
>>>.el-tabs__item {
    color: #666;
}
</style>

<script>
import { dictSave, dictUpdate } from "@/api/common";
import { titleTemplateSaveOrUpdate } from "./api/index";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      dictCode: "",
      dictName: "",
      itemCode: "",
      titleName: "",
      isEditItem: null,
      isAddList: false,
      contentList: [],
      activeName: "first"
    };
  },
  computed: {
    modalTitle() {
      if (this.isEditItem) {
        return "编辑自定义标题模版";
      } else {
        return "新建自定义标题模版";
      }
    }
  },
  methods: {
    /**切换模板类型 */
    handleClick(tab, event) {
      if (tab.index == "1") {
        this.isAddList = true;
      } else {
        this.isAddList = false;
      }
    },
    reset() {
      this.dictCode = "";
      this.dictName = "";
      this.itemCode = "";
      this.titleName = "";
      this.contentList = [];
      this.isEditItem = null;
    },
    open(item) {
      this.$refs.modal.open();
      if (item) {
          this.titleName = item.title;
          this.isEditItem = item;
          this.activeName = "first";
          this.contentList = [];
          this.isAddList = false;
        if (item.list.length > 0) {
          this.activeName = "second";
          this.contentList = [...item.list];
          this.isAddList = true;
        }
      } else {
        this.reset()
      }
    },
    getRecordCode() {
      return this.$route.path.includes("newSingleTemperatureChart") || this.$route.path.includes("temperature");
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      //recorCode/moduleCode传体温单code值，护理记录单传护理记录单coe值，没有就传空，
      if (this.isEditItem) {
        let data = {
          ...this.isEditItem,
          title: this.titleName,
          list: []
        };
        this.activeName == 'second' && (data.list = this.contentList)
        titleTemplateSaveOrUpdate(data).then(res => {
          this.$message.success("更新常用语模版成功");
          this.bus.$emit("refreshTitleTemplate");
          this.close();
          this.bus.$emit("refreshSheetPage");
        });
      } else {
        let data = {
          title: this.titleName,
          recordCode: this.getRecordCode()?'bodyTemperature':sheetInfo.sheetType,
          wardCode: this.deptCode,
        };
        this.activeName == 'second' && (data.list = this.contentList)
        titleTemplateSaveOrUpdate(data).then(res => {
          this.$message.success("保存常用语模版成功");
          this.close();
          this.bus.$emit("refreshTitleTemplate");
        });
      }
    },
    querySearch(queryString, cb) {
      cb(
        queryString
          ? this.typeList.filter(item => item.value.indexOf(queryString) > -1)
          : this.typeList
      );
    },
    // 新增内容
    addContent() {
      this.contentList.push({ options: "" });
    },
    // 删除内容
    toDel(isIndex) {
      this.contentList = this.contentList.filter(
        (item, index) => isIndex != index
      );
    }
  },
  components: {}
};
</script>
