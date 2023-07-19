<template>
  <div class="right-part-contain" :class="{ fullPageRecord }">
    <div
        class="form-loading-box"
        v-loading="formBoxLoading"
        :element-loading-text="formBoxLoadingText"
        ref="iframeLoadingBox"
    >
      <!-- <div class="null-tool" v-show="showTpye == ''"></div> -->
      <!-- 护理记录单 -->
      <div v-if="showConToolBar" class="tool-bar">
        <toolBar
            v-if="!hasMeasure"
            v-show="showType"
            :config="toolBarConfig"
        ></toolBar>
        <toolCon v-else v-show="showType"></toolCon>
      </div>
      <!-- 护理评估表 -->
      <template v-if="isOtherPages">
      <div
          class="form-contain"
          :class="{ nopadding: !showConToolBar }"
          ref="formContain"
          :style="{ height: height }"
      >
          <assessment v-show="showConToolBar && showType" ref="assessment"/>
          <assessment_v2
              v-show="!showConToolBar && showType"
              ref="assessmentV2"
              :tagsViewHeight="tagsViewHeight"
          />

          <div
              v-show="showType == ''"
              class="null-btn"
              flex="cross:center main:center"
              @click="newRecordOpen"
              v-if="HOSPITAL_ID == 'beihairenyi'"
          >
            <i class="el-icon-plus"></i>
            <span>创建护理评估单</span>
          </div>
          <div
              v-show="showType == ''"
              class="null-btn"
              flex="cross:center main:center"
              @click="newRecordOpen"
              v-else
          >
            <i class="el-icon-plus"></i>
            <span>创建护理文书</span>
          </div>
        <div>
          <!-- 患者资料 -->
          <patientInfo
            :notNurseRecordList="true"
            v-if="this.$route.query.patientId && (['lingcheng', 'lyxrm', 'xiegang', 'whhk', 'stmz', 'whsl'].includes(HOSPITAL_ID))"
          ></patientInfo>
        </div>
      </div>
     </template>
     <!-- 其他记录单或者血糖，健康 -->
        <component :is="otherComponent" v-else :evalTagHeight="tagsViewHeight"></component>
      <!-- 关联表单弹窗 -->
      <RelationFormModal/>
      <!-- 电子病例弹窗 -->
      <doctorEmr v-if="['foshanrenyi','huadu','zhzxy','dglb','nfyksdyy'].includes(HOSPITAL_ID)" />
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.right-part-contain {
  height: 100%;
  .form-loading-box {
    height: 100%;
  }
}
.form-contain {
  padding: 20px;
  overflow: auto;
  box-sizing: border-box;
  background: #dfdfdf;
  position: relative;

  &.nopadding {
    padding: 0px;
  }
}

.null-tool {
  height: 40px;
  background: #dfdfdf;
}

.null-btn {
  position: absolute;
  top: 0px;
  bottom: 150px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 14px;
  color: #687179;
  width: 135px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #ADB4BA;
  box-shadow: 0 1px 2px 0 rgba(200, 200, 200, 0.5);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }

  i {
    margin-right: 4px;
  }
}

.fullPageRecord {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 10000;

  .form-contain {
    height: 100% !important;
  }
}

.tool-bar {
  // background red
  // outline 1px dashed red
}

/deep/ .hidden-loading {
  display: none !important;
  visibility: hidden !important;
}

/deep/ .el-loading-mask {
  // background: white !important;
  background-color: rgba(255, 255, 255, 1);
}

/deep/ .mask-loading-button {
  font-size: 13px;
  padding: 8px 20px;
  margin-top: 20px;
  color: #55b391;
  outline: 0;
  cursor: pointer;
  border: 1px solid #55b391;
  background: transparent;
}
</style>
<script>
import toolCon from "./components/tool-con/tool-con";
import comomMixin from "../../../../../../common/mixin/common.mixin";
import assessment from "./components/assessment/assessment";
import assessment_v2 from "./components/assessment/assessment_v2";
import RelationFormModal from "./components/relationFormModal/RelationFormModal";
import toolBar from "@/components/toolBar/toolBar.vue";
import {toolBarConfig} from "./config.js";
import bus from "vue-happy-bus";
import patientInfo from "@/Page/sheet-page/components/sheet-tool/patient-info";
import doctorEmr from "@/components/doctorEmr";
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue"; //护理记录单
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_nfyksdyy.vue"; //血糖
import healthEducation from "@/Page/patientInfo/supPage/healthEducation/healthEducation.vue";

export default {
  props: {
    filterObj: Object,
    hasTagsView: Boolean,
  },
  mixins: [comomMixin],
  data() {
    return {
      showType: "",
      showConToolBar: true,
      formVersion: 0,
      bus: bus(this),
      isOutSign: true,
      isOutAudit: true,
      isAddNewPage: true,
      hasMeasure: true,
      hasCheck: true,
      isPushForward: false,
      formBoxLoading: false,
      formBoxLoadingText: "载入中..",
      nodeData: {},
      isOtherPages: true,
      otherComponent:""
    };
  },
  created() {
  },
  mounted() {
    this.$refs["iframeLoadingBox"]["$methods"] = () => {
      return {
        setLoadingText: this.setLoadingText,
        setLoadingStatus: this.setLoadingStatus,
        setLoadingButton: this.setLoadingButton,
        setloadingSVGHidden: this.setloadingSVGHidden,
      };
    };
    // iframeLoadingBox
    this.$refs["iframeLoadingBox"]["setLoadingText"] = this.setLoadingText;
    this.$refs["iframeLoadingBox"]["setLoadingStatus"] = this.setLoadingStatus;
    // this.$refs["iframeLoadingBox"]["setLoadingButton"] = this.setLoadingButton;
    // this.$refs["iframeLoadingBox"][
    //   "setloadingSVGHidden"
    // ] = this.setloadingSVGHidden;
    this.$root.$refs["iframeLoadingBox"] = this.$refs["iframeLoadingBox"];
    //
    this.bus.$on("openAssessmentBoxWidthVersion", (data) => {
      this.bus.$emit("openAssessmentBox", {
        ...this.nodeData,
        ...data,
      });
    });
    this.bus.$on("openAssessmentBox", (data,isopenPages) => {
      console.log("openAssessmentBox", data);
      this.isOtherPages = true;
      if(isopenPages) return
      if(data.formCode==="form_growth" && this.HOSPITAL_ID == 'hj'){
        this.$route.query.id = data.id;
        this.$route.query.formType = "eval"
        this.$route.query.formCode = "growth"
      }
      this.nodeData = {...data};
      // 关闭已经打开的页面
      this.bus.$emit("closeAssessmentV1");
      this.bus.$emit("closeAssessmentV2");
      //
      // 外置按钮配置
      if (data.hasOwnProperty("isOutSign")) {
        this.isOutSign = data.isOutSign;
        this.isOutAudit = data.isOutAudit;
        this.isAddNewPage = data.isAddNewPage;
        this.hasMeasure = data.hasMeasure;
        this.hasCheck = data.hasCheck;
        this.isPushForward = data.isPushForward;
      }
      this.showConToolBar = true;
      if (data.hasOwnProperty("showConToolBar")) {
        this.showConToolBar = data.showConToolBar;
      }
      this.formVersion = 0;
      let newFormList = ["form_in_patients", "inPatients"];
      if (
          data.nooForm == "2" ||
          (data.hasOwnProperty("formVersion") && data.formVersion == 2) ||
          newFormList.includes(data.formCode) ||
          newFormList.includes(data.fromCode)
      ) {
        this.formVersion = data.formVersion;
        this.showConToolBar = false;
        this.$nextTick(()=>{
          this.bus.$emit("openAssessmentV2", data);
        })
      } else if (data.nooForm == 1 || data.formVersion == 0) {
        console.log("~~~~openAssessment");
        this.bus.$emit("openAssessment", data);
      } else {
        console.log("~~~~openAssessment..");
        this.bus.$emit("openAssessment", data);
      }
      this.showType = "assessment";
      console.log("on:", {
        componentSwitch: this.componentSwitch,
        formVersion: this.formVersion,
        nooForm: data.nooForm,
        data,
      });
      // this.$forceUpdate();
    });
    this.bus.$on("openOtherPage",(data, isopenSheetTag = false)=>{
      this.isOtherPages = false;
      this.otherComponent = data.type
      if(isopenSheetTag){
        if (data.type == 'sheet') {
          this.$store.commit("upSheetTagInfo", data);
        }
        this.bus.$emit("mountTag", data);
        // this.bus.$emit("openSheetTag", data)
      }
    })

    this.bus.$on("closeAssessment", () => {
      this.showType = "";
    });
    // 滚动到底部
    this.bus.$on("swiperToBottomRecord", () => {
      this.$refs.formContain.scrollTop = this.$refs.formContain.scrollHeight;
    });
    this.$store.commit("upPatientInfo", this.$route.query);
  },
  methods: {
    newRecordOpen() {
      this.$parent.$refs.tree.$refs.newForm.open();
    },
    setLoadingStatus(bool) {
      this.formBoxLoading = bool;
    },
    setLoadingText(text, callback = null) {
      this.formBoxLoadingText = text;
      if (callback) {
        callback();
      }
    },
  },
  computed: {
    // 标签高度
    tagsViewHeight() {
      return this.hasTagsView ? 35 : 0
    },
    fullPageRecord() {
      return this.$store.state.record.fullPageRecord;
    },
    height() {
      // let offset = this.showConToolBar ? 0 : 40;
      if (this.$route.path == "/formPage" || this.filterObj) {
        return `${this.wih - 80 - this.tagsViewHeight}px`;
      } else if (this.$route.path.includes("nursingTemperature")) {
        return `${this.wih - this.tagsViewHeight}px`;
      } else {
        return `${this.wih - 140 - this.tagsViewHeight}px`;
      }
    },

    toolBarConfig() {
      return toolBarConfig(
          this,
          this.isOutSign,
          this.isOutAudit,
          this.hasCheck,
          this.isAddNewPage,
          this.isDev,
          this.isPushForward
      );
    },
    componentSwitch() {
      return this.formVersion == 2 ? "assessment_v2" : "assessment";
    },
  },
  components: {
    toolCon,
    assessment,
    assessment_v2,
    toolBar,
    RelationFormModal,
    patientInfo,
    doctorEmr,
    sheet,
    bloodSugar,
    healthEducation
  },
};
</script>
