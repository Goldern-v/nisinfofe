
<template>
  <div>
    <span v-if="showMessage">渲染消息 {{test}}</span>

    <!-- UIEditor -->
    <UIEditor ref="uiEditor" :formObj="formObj" v-if="showUIEditor"/>

    <!-- 弹窗 -->
    <!-- <Dialog ref="dialogBox" :formObj="formObj"/> -->

    <!-- 弹窗 -->
    <DialogSweet ref="dialogBox" :formObj="formObj"/>

    <!-- 人体图 -->
    <bodyModal ref="bodyModal" :formObj="formObj"/>

    <!-- 诊断右侧弹窗 -->
    <diagnosisSlide ref="diagnosisSlide" :formObj="formObj"/>

    <!-- 诊断弹窗 -->
    <diagnosisModal ref="diagnosisModal" :formObj="formObj"/>

    <!-- 下拉框 -->
    <autoComplete ref="autoInput"/>

    <!-- 模板 -->
    <templateSlide ref="templateSlide"/>  

    <!-- 页面信息 -->
    <div v-if="formObj && formObj.model" ref="mainPage" class="cover-page">
      <div :style="formObj.pageSetting.style || '' " class="main-page" :class="{lock: lock}">
        <span class="update-message-page" v-if="formObj.formSetting.updateInfo" v-html="formObj.formSetting.updateInfo"></span>
        <img src="../../images/责任护士已签.png" alt v-if="lock" class="lock-img">
        <!-- 页面标题 -->
        <FormTitle :obj="formObj.formSetting" :formObj="formObj"/>

        <!-- 页面头部 -->
        <FormHeader :obj="formObj.header" :formObj="formObj"/>

        <!-- 页面正文 -->
        <FormBody :obj="formObj.body" :formObj="formObj"/>

        <!-- 页面尾部 -->
        <FormFooter :obj="formObj.footer" :formObj="formObj"/>


      </div>
    </div>

    <!-- TableOfContent -->
    <TableOfContent :formObj="formObj"/>


  </div>
</template>

<script>
import vue from "vue";
import bus from "vue-happy-bus";

// import './directives/common.directive.js'

import UIEditor from "./UIEditor";
import TableOfContent from "./TableOfContent";
import Dialog from "./Dialog";
import DialogSweet from "./DialogSweet";
import FormGroupColBox from "./FormGroupColBox";
import FormGroupHorizontalBox from "./FormGroupHorizontalBox";
import InputElements from "./InputElements";
import FormTitle from "./FormTitle";
import FormHeader from "./FormHeader";
import FormBody from "./FormBody";
import FormFooter from "./FormFooter";
import draggable from "vuedraggable";
import autoComplete from "./autoComplete.vue";
import bodyModal from "./modal/body-modal/body-modal";
import diagnosisSlide from "./modal/diagnosisSlide";
import diagnosisModal from "../Render/modal/diagnosis-modal";
import templateSlide from "../Render/modal/template-slide/template-slide";
// import VueDragResize from 'vue-drag-resize'
// import ElementUI from 'element-ui'
// import { Button, Select , Input, Table, Form, FormItem, Radio, Checkbox} from 'element-ui';

export default {
  name: "RenderForm",
  props: {
    source: String,
    lock: Boolean,
    sourceObj: Object,
    updateFunc: Function
  },
  components: {
    UIEditor,
    FormTitle,
    FormHeader,
    FormBody,
    FormGroupColBox,
    FormGroupHorizontalBox,
    FormFooter,
    InputElements,
    TableOfContent,
    Dialog,
    DialogSweet,
    draggable,
    autoComplete,
    bodyModal,
    diagnosisSlide,
    templateSlide,
    diagnosisModal
    // VueDragResize
  },
  data() {
    return {
      bus: bus(this),
      formObj: {},
      // sourceObj: {},
      test: "",
      showMessage: false,
      showUIEditor: false,
      isRefresh:true
    };
  },
  computed: {},
  watch: {
    // 动态更新
    source: {
      handler: function(val, oldVal) {
        try {
          this.formObj = JSON.parse(val);
          console.log("watch_渲染this.formObj", this.formObj);
          this.showMessage = false;
        } catch (error) {
          this.test = "watch_error:" + error.message;
          console.log("watch_error", error.message, typeof error);
          this.showMessage = true;
        }
      },
      deep: true
    }
    // 动态更新
    // formObj: {
    //   handler: function(val, oldVal) {
    //     console.log("###main#watch_formObj", val);
    //     // this.modelData = JSON.parse(JSON.stringify(val.model));
    //     // this.$store.commit("upFormObj", JSON.parse(JSON.stringify(val)));
    //     // try {
    //     //   this.source = JSON.stringify(val, null, 4);
    //     //   console.log("watch_渲染this.source", this.source);
    //     // } catch (error) {
    //     //   console.log("watch_error", error.message, typeof error);
    //     // }
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.$root.$refs.dialogBox = this.$refs.dialogBox;
    this.$root.$refs.autoInput = this.$refs.autoInput;
    this.$root.$refs.mainPage = this.$refs.mainPage;
    this.$root.$refs.uiEditor = this.$refs.uiEditor;
    this.$root.$refs.bodyModal = this.$refs.bodyModal;
    this.$root.$refs.diagnosisSlide = this.$refs.diagnosisSlide;
    this.$root.$refs.diagnosisModal = this.$refs.diagnosisModal;
    this.$root.$refs.templateSlide = this.$refs.templateSlide;
    // console.log(this.$refs.dialogBox);

    //
    let allInputs = this.$root.$refs.mainPage.querySelectorAll(
      'input[type="text"]'
    );
    allInputs = [...allInputs];
    // console.log("allInputs", allInputs, this.$refs.mainPage);
    setTimeout(() => {
      allInputs.map((input, index) => {
        let Lindex = (index - 1) % allInputs.length;
        let Rindex = (index + 1) % allInputs.length;
        input["$index"] = index + "";
        input["$leftNode"] = allInputs[Lindex];
        input["$rightNode"] = allInputs[Rindex];
      });
    }, 1000);
    // this.$store.commit("upFormObj", this.formObj);
    // console.log('allInputs', allInputs, this.$refs.mainPage)
    window.formObj = this.formObj;
  },
  created() {
    this.initial();
  },
  methods: {
    initial() {
      // 初始化载入JSON
      try {
        // console.log('渲染this.source',this.source, JSON.parse(this.source))
        if (this.source) {
          this.formObj = JSON.parse(this.source);
        } else if (this.sourceObj) {
          this.formObj = this.sourceObj;//JSON.parse(JSON.stringify(this.sourceObj))//this.sourceObj;
        }
        console.log("渲染this.formObj", this.formObj);
        this.test = "JSON格式正常"; //JSON.stringify(this.formObj)
        this.showMessage = false;
        if(!this.formObj){
          this.bus.$emit("setHosptialEvalLoading", false);
          return
        }
        //
        // 初始化绑定UI字段
        this.modelBindUI(this.formObj.body, this.formObj);
        //
        // console.log("modelBindUI", this.formObj);
        //
        try {
          this.showUIEditor = this.formObj.pageSetting.mode === "development";
        } catch (error) {
          //
        }
        //
        // window.formObj = this.formObj;
      } catch (error) {
        this.test = "mounted_error:" + error.message;
        console.log("mounted_error", error, typeof error);
        this.showMessage = true;
      }
    },
    // 循环 formObj.body 里 数组，遍历 type，添加字段到 formObj.model 里 值为相应的 数据类型
    modelBindUI(formArray, formObj) {
      if (!formArray) {
        return;
      }
      // console.log("--constructor", formArray.constructor);
      switch (formArray.constructor) {
        case Array:
          // 初始化类型
          for (const iterator of formArray) {
            // console.log('iterator',iterator)
            if (["checkbox"].indexOf(iterator.type) > -1) {
              formObj.model[iterator.name] = new Array();
            } else if (
              ["radio", "input", "select", "datePicker", "mark"].indexOf(
                iterator.type
              ) > -1
            ) {
              formObj.model[iterator.name] = "";
            }
            if (iterator.hasOwnProperty("children") > -1) {
              this.modelBindUI(iterator.children, formObj);
            }
          }
          break;
        case Object:
          break;
        default:
          break;
      }
    }
    //
  }
};
</script>


<style scoped lang="scss">
.ghost-box {
  outline: 1px dashed red;
  background: #fffff0;
}

.cover-page {
  background: #fff;
  width: 950px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 50px;
  border: none;//1px solid #eee;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  position: absolute;
  left: calc(50% - 600px);
}

.main-page {
  background: #fff;
  width: 850px;
  margin: auto;
  margin-left: 80px;
  /* margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 50px;
  border: 1px solid #eee;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  position: absolute;
  left: calc(50% - 500px); */
  &.lock {
    pointer-events: none;
    /deep/ input {
      background: #f5f7faff !important;
    }
  }
  /* /deep/ .el-input-group__append {
    border: 0 !important;
  } */
}
.lock-img {
  position: absolute;
  top: 20px;
  right: 20px;
}

.update-message-page {
  font-size:12px;
  font-family:STSongti-SC;
  font-weight:400;
  color:#c1c1c1;
  line-height:17px;
  top: 10px;
  left: 50px;
  position: absolute;
}

</style>
