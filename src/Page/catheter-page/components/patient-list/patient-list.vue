<template>
  <div class="patient-list-part" :style="{left: openLeft?'0':'-201px'}">
    <el-input placeholder="床号/姓名" icon="search" class="search-box" v-model="searchWord"></el-input>
    <div class="left-wapper">
      <div class="patient-list-contain">
        <div
          class="patient-box"
          flex="cross:center"
          v-for="item in list"
          :key="item.patientId"
          @click="selectPatient(item)"
          :class="{active: isActive(item)}"
        >
          <img src="./images/男默认头像.png" alt class="img" v-if="item.sex == '男'">
          <img src="./images/女士默认头像.png" alt class="img" v-else>
          <div class="name" flex-box="1">{{item.name}}</div>
          <div class="bed">{{item.bedLabel}} 床</div>
          <div
            class="catheter-block"
            :style="(!blockText(item) || blockText(item) == 0) && {opacity: 0}"
          >{{ blockText(item) }}</div>
          <span
            class="point-box"
            v-show="item.config.catheter.status != null"
            :class="{red: item.config.catheter.status == '0', green: item.config.catheter.status == '1'}"
          ></span>
          <span class="todayPullCatheter" v-if="item.config.catheter.todayPullCatheter">拔</span>
        </div>
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
  height 100%
  box-sizing border-box
  padding-top 45px
  position relative
  border-right 1px solid #CBD5DD
  position relative
  transition: all .4s cubic-bezier(.55, 0, .1, 1); 
  background #fff
.patient-list-contain
  padding 0px 8px 11px
  height 100%
  box-sizing border-box
  overflow auto
  cursor pointer
  position relative
  .patient-box
    padding 6px 5px
    font-size 13px
    border-radius 3px
    margin 1px 0
    position relative
    .img
      height 30px
      width 30px
      border-radius 50%
      margin-right 11px
    .name
      color #687179
    .bed
      color #333333
    &:hover
      background #F7F7FA
    &.active
      background #F1F1F5
      font-weight bold
      .name
        color #333333
.search-box
  position absolute
  top 10px
  left 6px
  width 178px
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
  height 100%
.todayPullCatheter
  position absolute
  left 3px
  top 5px
  position: absolute;
  width: 0;
  height: 0;
  border-width: 10px 10px 0 0;
  border-style: solid;
  border-color: red transparent;
.point-box
  width 16px  
  height 16px 
  display: inline-block 
  border: 1px solid #EAEEF1
  margin-left: 5px
  border-radius: 50%
  position absolute
  left 25px
  top 3px
  &:after
    content: ''
    position absolute
    width 10px
    height 10px
    border-radius: 50%
    top: 0
    right 0
    bottom: 0
    left 0
    margin: auto
  &.red:after
    background: #E62C2C
  &.green:after
    background: #27A45E   
.catheter-block
  width 18px
  height 18px
  border-radius:2px;
  border:1px solid rgba(203,213,221,1);    
  display flex
  justify-content center
  align-items center
  font-size 13px
  color #333
  margin-left 10px;
  margin-right 4px
  font-weight bold
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import { model } from "../../store/index";
export default {
  props: {
    data: Array
  },
  mixins: [common],
  data() {
    return {
      searchWord: "",
      bus: bus(this),
      model
    };
  },
  methods: {
    selectPatient(item) {
      model.setSelectedPatient(item);
    },
    isActive(item) {
      return item.patientId == model.selectedPatient.patientId;
    },
    toOpenLeft() {
      this.$store.commit("upOpenSheetLeft", !this.openLeft);
    },
    blockText(item) {
      try {
        return item.config.catheter.simpleName || item.config.catheter.size;
      } catch (error) {}
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
  created() {},
  components: {}
};
</script>
