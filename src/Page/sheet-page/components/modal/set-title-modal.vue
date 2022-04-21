<template>
  <div>
    <!-- 签名确认 -->
    <!-- 花都体温单自定义标题模板 -->
    <sweet-modal ref="modalName" size="small" title="设置标题" @close="onClose">
      <p for class="name-title" flex="main:justify">
        <span>设置自定义标题</span>
        <span
          v-if="HOSPITAL_ID == 'foshanrenyi'"
          style="
            color: #284fc2;
            cursor: pointer;
            font-size: 12px;
            font-weight: 400;
          "
          @click="openTitleTemplateSildeFS"
          >+模板</span
        >
        <span
          v-else
          style="
            color: #284fc2;
            cursor: pointer;
            font-size: 12px;
            font-weight: 400;
          "
          @click="openTitleTemplateSilde"
          >+模板</span
        >
      </p>
      <div action @keyup.13="post" ref="titleInput">
        <!-- <el-input size="small" type="text" placeholder="输入标题名称" v-model="title"></el-input> -->
        
        <template  v-if="HOSPITAL_ID == 'foshanrenyi'">
          <el-autocomplete
            style="width: 100%"
            v-model="fstitle"
            :fetch-suggestions="querySearch"
            placeholder="输入标题名称"
          ></el-autocomplete>
          <el-select v-model="sonValue" placeholder="请选择" style="width: 100%;margin-top:20px;" v-if="options">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.title"
              :value="item.title">
            </el-option>
          </el-select>
        </template>
        <template v-else>
          <el-autocomplete
          style="width: 100%"
          v-model="title"
          :fetch-suggestions="querySearch"
          placeholder="输入标题名称"
        ></el-autocomplete>
        </template>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post"
          >确认</el-button
        >
      </div>
    </sweet-modal>
    <titleTemplateSlide ref="titleTemplateSlide"></titleTemplateSlide>
    <titleTemplateSlideFS ref="titleTemplateSlideFS"></titleTemplateSlideFS>
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
import titleTemplateSlideFS from "../modal/title-template-slide-fssy";
import { showTitle } from "@/api/sheet.js";
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      bus: bus(this),
      title: "",
      fstitle: "",
      callback: "",
      cellObj: null,
      options:[], //子自定义下拉选择
      sonValue:[], //子自定义内容
      sonData:'', //子自定义内容id
    };
  },
  methods: {
    open(callback, title, item,datader) {
      console.log(datader,title);
      if(datader && datader.children && this.HOSPITAL_ID == 'foshanrenyi'){
        this.callback = callback;
        this.options = datader.children
        this.title = datader.groupName;
         this.$refs.modalName.open();
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.titleInput.querySelector("input").focus();
          }, 200);
        });
      }else{
        this.callback = callback;
        this.cellObj = item;
        this.options = null;
        this.fstitle = title;
        this.title = title.indexOf("标题") > -1 ? "" : title;
        this.$refs.modalName.open();
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.titleInput.querySelector("input").focus();
          }, 200);
        });
      }
    },
    post() {
      this.close();
      if(this.sonValue && this.options){
        // console.log(this.sonValue);
        this.callback(this.sonValue,this.sonData);
      }else if(this.fstitle){
        this.callback(this.fstitle);
      }else{
        this.callback(this.title);
      }
      if (
        ["huadu"].includes(this.HOSPITAL_ID) &&
        (this.$route.path.includes("singleTemperatureChart")||this.$route.path.includes("temperature"))
      ) {
        this.bus.$emit("saveSheetPage", "refreshSheetPage");
        //体温单保存自定义标题刷新
      }
    },
    close() {
      this.$refs.modalName.close();
    },
    onClose() {
      this.$refs.titleTemplateSlide.close();
      this.$refs.titleTemplateSlideFS.close();
    },
    async querySearch(queryString, cb) {
      if (this.cellObj && this.cellObj.titleList) {
        cb(
          this.cellObj.titleList.map((item) => {
            return {
              value: item,
            };
          })
        );
      } else {
        let deptCode = this.$store.state.lesion.deptCode
        let {
          data: { data },
        } = await listItem(
          "自定义标题",
          //北海体温单调用护理记录单模板
            this.$route.path.includes("newSingleTemperatureChart")||this.$route.path.includes("temperature")
            ? "bodyTemperature"
            : sheetInfo.sheetType,
            deptCode,
        );
        // 调用 callback 返回建议列表的数据
        let autoList = [];
        if (!queryString) {
          autoList = data.map((item) => {
            return {
              value: item.name,
            };
          });
        } else {
          autoList = data
            .filter((item) => item.name.indexOf(queryString) > -1)
            .map((item) => {
              return {
                value: item.name,
              };
            });
        }
        cb(autoList);
      }
    },
    openTitleTemplateSilde() {
      this.$refs.titleTemplateSlide.open();
    },
    openTitleTemplateSildeFS() {
      this.$refs.titleTemplateSlideFS.open();
    },
  },
  created() {
    this.bus.$on("addTitleTemplate", (name) => {
      this.title = name;
    });
    this.bus.$on("addTitleTemplateFS", (data) => {
      if(data.children){
        this.fstitle = data.groupName;
        this.options = data.children
        this.sonValue = data.children[0].title
        this.sonData = data
      }else if(data.title){
        this.options = []
        this.options.push(data) 
        this.sonValue= data.title
        this.sonData = data
      }else{
         this.options = null;
         this.fstitle = data.groupName;
         this.sonData = data
      }
    });
  },
  components: {
    titleTemplateSlide,
    titleTemplateSlideFS,
  },
};
</script>
