<template>
  <div flex="cross:stretch" style="height: 100%">
    <div class="left-part" flex="dir:top">
      <leftTop :data="wardPat"></leftTop>
      <div class="mid-margin"></div>
      <leftBottom style="height: 0" flex-box="1" :data="chargeNurse"></leftBottom>
    </div>
    <div class="mid-part" flex="dir:top">
      <midTop :data="wardLog"></midTop>
      <div class="mid-margin"></div>
      <div style="height:0" flex-box="1" flex="cross:stretch">
        <midBottomLeft style="width: 0;" flex-box="1" :data="nurseDept"></midBottomLeft>
        <div class="mid-left-margin"></div>
        <midBottomRight style="width: 0;" flex-box="1" :data="msgData"></midBottomRight>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../style/wb.styl';

.left-part {
  width: 32.9%;
}

.mid-part {
  margin: 0 tovw(20);
  width: 67.1%;
}

.mid-margin {
  height: tovw(20);
}

.mid-left-margin {
  width: tovw(20);
}
</style>
<script>
import leftTop from "./box/left-top";
import leftBottom from "./box/left-bottom";
import midTop from "./box/mid-top";
import midBottomLeft from "./box/mid-bottom-left";
import midBottomRight from "./box/mid-bottom-right";
import { deptSetting, getMsg, wardPatient } from "@/api/whiteBoard";
export default {
  data() {
    return {
      chargeNurse: {},
      nurseDept: [],
      msgData: {},
      wardPat: {},
      wardLog: {},
      timer: ''
    };
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    }
  },
  methods: {
    getData() {
      if (this.deptCode) {
        deptSetting(this.deptCode).then(res => {
          this.chargeNurse = res.data.data.chargeNurse
          this.nurseDept = res.data.data.nurseDept;
        });
         getMsg(this.deptCode).then(res => {
           this.msgData = res.data.data
         })
         wardPatient(this.deptCode).then(res => {
           this.wardPat = res.data.data.wardPat
           this.wardLog = res.data.data.wardLog
         })
      }
    }
  },
  created() {
    this.getData();
     this.timer = setInterval(() => {
        this.getData()
      }, 1000 * 60)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    deptCode() {
      this.getData();
    }
  },
  components: {
    leftTop,
    leftBottom,
    midTop,
    midBottomLeft,
    midBottomRight
  }
};
</script>
