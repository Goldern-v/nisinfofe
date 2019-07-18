<template>
  <div :class="{fullPageRecord}">
    <div class="null-tool" v-show="showTpye == ''"></div>
    <!-- 护理记录单 -->
    <div v-if="showConToolBar" class="tool-bar">
      <toolBar v-if="!hasMeasure" v-show="showTpye" :config="toolBarConfig"></toolBar>
      <toolCon v-else v-show="showTpye"></toolCon>
    </div>
    <!-- 护理评估表 -->
    <div class="form-contain" ref="formContain" :style="{height: height}">
      <assessment v-show="showTpye" ref="assessment"></assessment>
      <div
        v-show="showTpye == ''"
        class="null-btn"
        flex="cross:center main:center"
        @click="newRecordOpen"
      >
        <i class="el-icon-plus"></i>
        创建护理文书
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.form-contain
  padding 20px
  overflow auto
  box-sizing border-box
  background #dfdfdf
  position relative
.null-tool
  height 40px
  background #dfdfdf
.null-btn
  position absolute
  top 0px
  bottom 150px
  left 0
  right 0
  margin auto
  font-size 14px
  color: #687179;
  width 135px
  height 40px
  background: #FFFFFF;
  border: 1px solid #ADB4BA;
  box-shadow: 0 1px 2px 0 rgba(200,200,200,0.50);
  border-radius: 2px;
  cursor pointer
  &:hover
    background #fafafa
  i
    margin-right 4px
.fullPageRecord
  position fixed
  left 0
  right 0
  bottom 0
  top 0
  z-index 10000
  .form-contain
    height 100% !important
.tool-bar
  // background red
  outline 1px dashed red
</style>
<script>
import toolCon from "./components/tool-con/tool-con";
import comomMixin from "../../../../../../common/mixin/common.mixin";
import assessment from "./components/assessment/assessment";
import assessment_v2 from "./components/assessment/assessment_v2";
import toolBar from "@/components/toolBar/toolBar.vue";
import { toolBarConfig } from "./config.js";
import bus from "vue-happy-bus";
export default {
  props: {
    filterObj: Object
  },
  mixins: [comomMixin],
  data() {
    return {
      showTpye: "",
      showConToolBar: true,
      bus: bus(this),
      isOutSign: true,
      isOutAudit: true,
      isAddNewPage: true,
      hasMeasure: true,
      hasCheck: true,
      isPushForward: false
    };
  },
  created() {
    this.bus.$on("openAssessment", data => {
      console.log("openAssessment", data);
      if (data.hasOwnProperty("isOutSign")) {
        this.isOutSign = data.isOutSign;
        this.isOutAudit = data.isOutAudit;
        this.isAddNewPage = data.isAddNewPage;
        this.hasMeasure = data.hasMeasure;
        this.hasCheck = data.hasCheck;
        this.isPushForward = data.isPushForward;
      }
      if (data.hasOwnProperty("showConToolBar")) {
        this.showConToolBar = data.showConToolBar;
      } else {
        this.showConToolBar = true;
      }
      if (data.hasOwnProperty("nooForm") && data.nooForm == 2) {
        this.showConToolBar = false;
      }
      this.showTpye = "assessment";
    });

    this.bus.$on("closeAssessment", () => {
      this.showTpye = "";
    });
    // 滚动到底部
    this.bus.$on("swiperToBottomRecord", () => {
      this.$refs.formContain.scrollTop = this.$refs.formContain.scrollHeight;
    });
  },
  methods: {
    newRecordOpen() {
      this.$parent.$refs.tree.$refs.newForm.open();
    }
  },
  computed: {
    fullPageRecord() {
      return this.$store.state.record.fullPageRecord;
    },
    height() {
      let offset = this.showConToolBar ? 0 : 40;
      if (this.$route.path == "/formPage" || this.filterObj) {
        return `${this.wih - 120 + offset}px`;
      } else {
        return `${this.wih - 180 + offset}px`;
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
    }
  },
  components: {
    toolCon,
    assessment,
    assessment_v2,
    toolBar
  }
};
</script>
