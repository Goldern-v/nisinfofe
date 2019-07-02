<template>
  <div class="patient-list-part" v-loading="dataModel.dataLoading">
    <el-input placeholder="住院号、姓名、ID号" class="search-box" v-model="searchWord">
      <el-button slot="append" icon="search" @click="searchPatient"></el-button>
    </el-input>
    <div class="left-wapper">
      <div class="patient-list-contain" v-loading="dataModel.patientLoading">
        <patientItem v-for="(item, index) in list" :key="index" :item="item" :index="index"></patientItem>
      </div>
      <div
        class="flag-con"
        :style="{top: flagTop}"
        flex="main:center cross:center"
        @click="toOpenLeft"
      >
        <i class="iconfont icon-yincang" v-show="openLeft" style="margin-left: -1px"></i>
        <i class="iconfont icon-xianshi" v-show="!openLeft" style="margin-left: -2px"></i>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-list-part
  top: 100px
  bottom: 0
  position fixed
  left 0
  width 200px
  box-sizing border-box
  border-right 1px solid #CBD5DD
  background #fff
  padding-top 50px
  box-sizing border-box
.patient-list-contain
  padding 0px 6px 8px
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
    border-radius 4px 0 0 4px
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
  height calc(100vh - 150px)
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import patientItem from "./patient-item.vue";
import { model } from "../../viewModel/model";
import { dataModel } from "../schecdulingTable/viewModel/dataModel";
export default {
  mixins: [common],
  data() {
    return {
      data: [],
      searchWord: "",
      dataModel
    };
  },
  methods: {
    toOpenLeft() {
      this.$store.commit("upOpenSheetLeft", !this.openLeft);
    },
    searchPatient() {
      dataModel.getHDPatientList(this.searchWord);
    }
  },
  computed: {
    list() {
      return (this.dataModel.patientList || []).filter(item => {
        return true;
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

  components: {
    patientItem
  }
};
</script>
