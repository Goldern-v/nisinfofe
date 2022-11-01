<template>
  <div>
    <!-- 签名确认 -->
    <!-- 花都体温单自定义标题模板 -->
    <sweet-modal ref="modalName" size="small" title="设置标题" @close="onClose">
      <p for class="name-title" flex="main:justify">
        <span>设置自定义标题</span>
        <span
          style="
            color: #284fc2;
            cursor: pointer;
            font-size: 12px;
            font-weight: 400;
          "
          @click="openTitleTemplateSlide"
          >+模板</span
        >
      </p>
      <div action @keyup.13="post" ref="titleInput">
        <!-- <el-input size="small" type="text" placeholder="输入标题名称" v-model="title"></el-input> -->
        <template  v-if="HOSPITAL_ID == 'foshanrenyi' || HOSPITAL_ID == 'fsxt' || HOSPITAL_ID == 'gdtj'">
          <el-autocomplete
            style="width: 100%"
            :value="fstitle"
            :fetch-suggestions="querySearch"
            placeholder="输入标题名称"
            @select="handleSelect"
          ></el-autocomplete>
          <el-select v-model="selectedVal" placeholder="请选择" style="width: 100%;margin-top:20px;" v-if="options">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.options"
              :value="item.options">
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
import { titleTemplateList } from './api';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      bus: bus(this),
      title: "",
      fstitle: "",
      callback: "",
      cellObj: null,
      options: null, //自定义选项下拉列表
      selectedVal:'', //下拉列表已选择项
      // 自定义标题模板列表
      templateList: [],
      // 已选标题模板id
      selectedTempId: '',
    };
  },
  computed: {
    ...mapState({
      deptCode: state => state.lesion.deptCode
    })
  },
  methods: {
    /**
     * callback：回调函数
     * title：标题
     * item：标题模板信息
     * optionList: 标题模板选项
     */
    open(callback, title, item, optionList) {
      // if(optionList && optionList.children && this.HOSPITAL_ID == 'foshanrenyi'){
      if(this.HOSPITAL_ID == 'foshanrenyi' || this.HOSPITAL_ID == 'fsxt' || this.HOSPITAL_ID == 'gdtj'){
        this.callback = callback;
        // this.options = optionList.children
        this.fstitle = title;
        this.getTemplateList()
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
      if(this.fstitle && this.HOSPITAL_ID == 'foshanrenyi' || this.HOSPITAL_ID == 'fsxt' || this.HOSPITAL_ID == 'gdtj'){
        this.callback(this.fstitle, {
          list: this.options || [],
          id: this.selectedTempId
        });
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
      this.close();
    },
    close() {
      this.reset()
      this.$refs.modalName.close();
    },
    onClose() {
      this.reset()
      this.$refs.titleTemplateSlide.close();
      this.$refs.titleTemplateSlideFS.close();
    },
    async querySearch(queryString, cb) {
      if (['foshanrenyi','fsxt', 'gdtj'].includes(this.HOSPITAL_ID)) {
        let list = []
        if (!queryString) {
          list = this.templateList.map(item => ({value: item.title, id: item.id, list: item.list || []}))
        } else {
          list = this.templateList.reduce((arr, item) => {
            if (item.title.indexOf(queryString) > -1) {
              arr.push({value: item.title, id: item.id, list: item.list || []})
            }
            return arr
          }, [])
          if (this.fstitle != queryString) {
            this.clearOptions()
          }
        }
        this.fstitle = queryString
        cb(list)
      } else if (this.cellObj && this.cellObj.titleList) {
        cb(
          this.cellObj.titleList.map((item) => {
            return {
              value: item,
            };
          })
        );
      } else {
        let {
          data: { data },
        } = await listItem(
          "自定义标题",
          //北海体温单调用护理记录单模板
            this.$route.path.includes("newSingleTemperatureChart")||this.$route.path.includes("temperature")
            ? "bodyTemperature"
            : sheetInfo.sheetType,
            this.deptCode,
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
    openTitleTemplateSlide() {
      if (['foshanrenyi','fsxt', 'gdtj','lyyz'].includes(this.HOSPITAL_ID)) {
        this.$refs.titleTemplateSlideFS.open();
        return
      }
      this.$refs.titleTemplateSlide.open();
    },
    /**
     * 获取自定义标题模板列表
     */
    async getTemplateList() {
      try {
        const res = await titleTemplateList({
          wardCode: this.deptCode
        })
        if (res.data.code === '200') {
          this.templateList = res.data.data
        }
      } catch (e) {
      }
    },
    handleSelect(item) {
      this.fstitle = item.value
      if (item.list.length) {
        this.options = item.list
        this.selectedVal = item.list[0].options
        this.selectedTempId = item.id
        return
      }
      this.clearOptions()
    },
    clearOptions() {
     this.options = null
     this.selectedVal = ''
     this.selectedTempId = ''
    },
    reset() {
      this.selectedVal = ''
      this.options = null
    }
  },
  created() {
    this.bus.$on("addTitleTemplate", (name) => {
      this.title = name;
    });
    // 添加标题模板
    this.bus.$on("addTitleTemplateFS", (data) => {
      if(data.list && data.list.length > 0){
        this.fstitle = data.title;
        this.options = data.list
        this.selectedVal = data.list[0].options
      }else if(data.title){
        this.fstitle = data.title;
        this.options = null
        this.selectedVal = ''
      }else{
        this.fstitle = data.title;
        this.options = null
        this.selectedVal = ''
      }
    });
    // 刷新标题模板列表
    if (['foshanrenyi','fsxt', 'gdtj'].includes(this.HOSPITAL_ID)) {
      this.bus.$on("refreshTitleTemplate", this.getTemplateList);
    }
  },
  components: {
    titleTemplateSlide,
    titleTemplateSlideFS,
  },
};
</script>
