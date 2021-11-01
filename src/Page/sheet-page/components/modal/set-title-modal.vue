<template>
  <div>
    <!-- 签名确认 -->
    <sweet-modal ref="modalName" size="small" title="设置标题" @close="onClose">
      <p for class="name-title" flex="main:justify">
        <span>设置自定义标题</span>
        <span
          style="color: #284FC2;cursor: pointer; font-size: 12px;font-weight:400"
          @click="openTitleTemplateSilde"
        >+模板</span>
      </p>
      <div action @keyup.13="post" ref="titleInput">
        <!-- <el-input size="small" type="text" placeholder="输入标题名称" v-model="title"></el-input> -->
        <el-autocomplete
          style="width: 100%"
          v-model="title"
          :fetch-suggestions="querySearch"
          placeholder="输入标题名称"
        ></el-autocomplete>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
      </div>
    </sweet-modal>
    <titleTemplateSlide ref="titleTemplateSlide"></titleTemplateSlide>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title {
  font-size: 14px;
  margin: 5px 0 10px;
  font-weight: bold;
}
</style>

<script>
import { listItem } from "../../api/recordDesc";
import sheetInfo from "../config/sheetInfo/index.js";
import titleTemplateSlide from "../modal/title-template-slide";
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      bus: bus(this),
      title: "",
      callback: "",
      cellObj: null
    };
  },
  methods: {
    open(callback, title, item) {
      this.callback = callback;
      this.cellObj = item;
      this.title = title.indexOf("标题") > -1 ? "" : title;
      this.$refs.modalName.open();
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.titleInput.querySelector("input").focus();
        }, 200);
      });
    },
    post() {
      this.close();
      this.callback(this.title);
    },
    close() {
      this.$refs.modalName.close();
    },
    onClose() {
      this.$refs.titleTemplateSlide.close();
    },
    async querySearch(queryString, cb) {
      if (this.cellObj && this.cellObj.titleList) {
        cb(
          this.cellObj.titleList.map(item => {
            return {
              value: item
            };
          })
        );
      } else {
        let {
          data: { data }
        } = await listItem("自定义标题", 
        //北海体温单调用护理记录单模板
        ['beihairenyi','guizhou'].includes(this.HOSPITAL_ID)&&this.$route.path.includes('newSingleTemperatureChart')?'bodyTemperature':sheetInfo.sheetType);
        // 调用 callback 返回建议列表的数据
        let autoList = [];
        if (!queryString) {
          autoList = data.map(item => {
            return {
              value: item.name
            };
          });
        } else {
          autoList = data
            .filter(item => item.name.indexOf(queryString) > -1)
            .map(item => {
              return {
                value: item.name
              };
            });
        }
        cb(autoList);
      }
    },
    openTitleTemplateSilde() {
      this.$refs.titleTemplateSlide.open();
    }
  },
  created() {
    this.bus.$on("addTitleTemplate", name => {
      this.title = name;
    });
  },
  components: {
    titleTemplateSlide
  }
};
</script>
