<template>
  <div class="patient-list-part" v-loading="patientListLoading">
    <el-input placeholder="床号/姓名"
              icon="search"
              class="search-box"
              v-model="searchWord">
    </el-input>
    <div class="left-wapper">
    <div class="patient-list-contain">
     <patientItem v-for="(item, index) in list" :key="item.name" :item="item" :index="index"></patientItem>
    </div>
    <div class="flag-con"
           :style="{top: flagTop}"
           flex="main:center cross:center"
           @click="toOpenLeft">
        <i class="iconfont icon-yincang"
           v-show="openLeft"
           style="margin-left: -1px"></i>
        <i class="iconfont icon-xianshi"
           v-show="!openLeft"
           style="margin-left: -2px"></i>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-list-part
  height 100%
  box-sizing border-box
  padding-top 51px
  position relative
  border-right 1px solid #CBD5DD
.patient-list-contain
  padding 0px 13px 11px
  height 100%
  box-sizing border-box
  overflow auto
  cursor pointer
  position relative
.search-box
  position absolute
  top 12px
  left 15px
  width 168px
  >>>&.el-input
    margin-bottom 5px
  >>>.el-input__inner
    height 28px
    outline none
    padding-left 10px
    background #fff
    border-radius 4px
    font-size 12px !important
    color #333
.flag-con
  width 10px
  height 73px
  position absolute
  right -11px
  top 100px
  z-index 10
  background-image url('../../../../common/images/patient/隐藏框.png')
  cursor pointer
  &:hover
    color #5CC6A1
  i
    font-size 12px
.left-wapper
  position relative
  transition all 0.4s cubic-bezier(0.55, 0, 0.1, 1)
  height calc(100vh - 114px)
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import patientItem from "./patient-item.vue";
import currDataObj from "../store/index";
export default {
  mixins: [common],
  data() {
    return {
      data: [],
      searchWord: "",
      patientListLoading: false,
      currDataObj
    };
  },
  methods: {
    isActive(item) {
      return item.patientId == this.$store.state.sheet.patientInfo.patientId;
    },
    toOpenLeft() {
      this.$store.commit("upOpenSheetLeft", !this.openLeft);
    },
    getLIstData() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then(res => {
          this.data = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    }
  },
  computed: {
    list() {
      return this.data.filter(item => {
        return (
          item.bedLabel.indexOf(this.searchWord) > -1 ||
          item.name.indexOf(this.searchWord) > -1
        );
      });
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    flagTop() {
      return `${this.wih * 0.4}px`;
    }
  },
  created() {
    this.getLIstData();
  },
  watch: {
    deptCode(val) {
      this.getLIstData();
    }
  },
  components: {
    patientItem
  }
};
</script>
