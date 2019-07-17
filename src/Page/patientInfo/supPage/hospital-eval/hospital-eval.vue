
<template>
  <div class="contain" :class="{fullpage}" v-loading="pageLoading" element-loading-text="正在保存">
    <div class="head-con" flex>
      <div class="tool-con" flex-box="1">
        <sheetTool ref="sheetHospitalEvalTool"></sheetTool>
      </div>
    </div>
    <div class="body-con" id="sheet_body_con" :style="{height: containHeight}">
      <div class="right-part">
        <!-- <record></record> -->
        <div class="sheetTable-contain">
          <pages />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 0
  background #fff
  border 1px solid #CBD5DD
  border-radius 2px
  &.fullpage
    position fixed !important
    z-index 10000
    left 0
    top 0
    bottom 0
    right 0
    margin 0
  .head-con
    height 41px
    position relative
    width 100%
  .body-con
    position relative
    .left-part
      width 199px
      position absolute
      left 0
      top: -40px
      bottom 0
    .right-part
      height 100%
      overflow hidden
      transition: all .4s cubic-bezier(.55, 0, .1, 1);
.dept-select-con
  box-sizing border-box
  width 199px
  height 41px
//   background #F7FAFA
//   border-right 1px solid #CBD5DD
//   border-bottom 1px solid #EAEEF1
//   border-radius 2px 0 0 0
  display flex
  justify-content center
  align-items center
  >>>.el-input__inner
    width 172px
    height 28px
    border 1px solid #C2CBD2
    border-radius 4px
    font-size 12px
.sheetTable-contain
  height 100%
  background white
  overflow auto
  padding 15px 5px 0 15px
  box-sizing border-box
  margin 0 auto 20px
  position relative
.null-btn
  position absolute
  top 0px
  bottom 150px
  left 0
  right 0
  margin auto
  font-size 17px
  color #687179
  width 195px
  height 50px
  background #FFFFFF
  border 1px solid #ADB4BA
  box-shadow 0 1px 2px 0 rgba(200, 200, 200, 0.5)
  border-radius 2px
  cursor pointer
  &:hover
    background #fafafa
  i
    margin-right 4px
</style>

<script>
import sheetTool from "@/Page/sheet-hospital-eval/components/sheet-tool/sheet-tool.vue";
import pages from "@/Page/sheet-hospital-eval/components/pages/page.vue";
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
// import record from "@/Page/patientInfo/supPage/record/record";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: []
      },
      pageLoading: false,
      patientListLoading: false,
      bus: bus(this)
    };
  },
  computed: {
    containHeight() {
      return this.wih - 153 + "px";
      // if (this.fullpage) {
      //   return this.wih - 14 + "px";
      // } else {
      //   return this.wih + 0 + "px";
      // }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    }
  },
  methods: {},
  mounted() {
    let item = this.$route.query;
    this.bus.$emit("setHosptialEvalLoading", true);
    this.bus.$emit("getHEvalBlockList", item);

    this.$store.commit("upPatientInfo", item);
  },

  components: {
    // record,
    sheetTool,
    pages
  }
};
</script>
