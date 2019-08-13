
<template>
  <div class="contain">
    <div class="body-con" id="sheet_body_con" :style="{height: containHeight}">
      <div class="left-part">
        <patientList :data="data.bedList" v-loading="patientListLoading"></patientList>
      </div>
      <div class="right-part" :style="{marginLeft: openLeft?'200px':'0'}">
        <record :filterObj="filterObj"></record>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 0
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
  .body-con
    position relative
    .left-part
      width 199px
      position absolute
      left 0
      top 0
      bottom 0
    .right-part
      margin-left 199px
      height 100%
      overflow hidden
      transition: all .4s cubic-bezier(.55, 0, .1, 1)
</style>

<script>
import patientList from "@/components/patient-list/patient-list.vue";
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
import record from "@/Page/patientInfo/supPage/record/record";
export default {
  mixins: [common],
  data() {
    return {
      filterObj: {
        label: '住院病人处理单',
        formType: "1",
        formName: "住院病人处理单"
      },
      data: {
        bedList: []
      },
      patientListLoading: false,
      bus: bus(this)
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    containHeight() {
      return this.wih - 62 + "px";
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    }
  },
  methods: {
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode).then(res => {
          this.data.bedList = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    }
  },
  created() {
    this.$store.commit("upPatientInfo", {});
    // 初始化
    if (this.deptCode) {
      this.getDate();
    }

    this.bus.$on("refreshFormPagePatientList", this.getDate);
  },
  watch: {
    deptCode(val, oldValue) {
      console.log(oldValue, val, "oldValue");
      if (oldValue && val) {
        this.$router.replace({
          path: "/handlingPage",
          query: {}
        });
        this.bus.$emit("refreshTree", true);
        this.bus.$emit("closeAssessment");
      }
      this.getDate();
    }
  },
  components: {
    patientList,
    record
  }
};
</script>
