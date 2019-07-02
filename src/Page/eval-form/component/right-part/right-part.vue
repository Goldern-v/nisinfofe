<template>
  <div :class="{fullPageRecord}">
    <div class="null-tool" v-show="showTpye == ''"></div>
    <!-- 护理记录单 -->
    <toolBar v-if="!hasMeasure" v-show="showTpye" :config="toolBarConfig"></toolBar>
    <toolCon v-else v-show="showTpye"></toolCon>
    <!-- 护理评估表 -->
    <div class="form-contain" ref="formContain" :style="{height: height}">
      <assessment v-show="showTpye" ref="assessment"></assessment>
      <div v-show="showTpye == ''" class="null-btn" flex="cross:center main:center" @click="newRecordOpen">
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
</style>
<script>
import toolCon from "./components/tool-con/tool-con";
import comomMixin from "../../../../common/mixin/common.mixin";
import assessment from "./components/assessment/assessment";
import toolBar from "@/components/toolBar/toolBar.vue";
import { toolBarConfig } from "./config.js";
import bus from "vue-happy-bus";
export default {
  mixins: [comomMixin],
  data() {
    return {
      showTpye: "",
      bus: bus(this),
      isOutSign: true,
      isOutAudit: true,
      isAddNewPage: true,
      hasMeasure: true,
      hasCheck: true,
    };
  },
  created() {
    this.bus.$on("openAssessment", data => {
      if (data.hasOwnProperty("isOutSign")) {
        this.isOutSign = data.isOutSign;
        this.isOutAudit = data.isOutAudit;
        this.isAddNewPage = data.isAddNewPage;
        this.hasMeasure = data.hasMeasure;
        this.hasCheck = data.hasCheck;
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
      if (this.$route.path == "/formPage") {
        return `${this.wih - 120}px`;
      } else {
        return `${this.wih - 180}px`;
      }
    },
    toolBarConfig() {
      return toolBarConfig(
        this,
        this.isOutSign,
        this.isOutAudit,
        this.hasCheck,
        this.isAddNewPage,
        this.isDev
      );
    }
  },
  components: {
    toolCon,
    assessment,
    toolBar
  }
};
</script>
