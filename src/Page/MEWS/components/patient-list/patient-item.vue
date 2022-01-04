<template>
  <div
    class="patient-box"
    flex="cross:center"
    :key="item.patientId"
    v-show="isShow"
    @click="selectPatient"
    :class="{active: active,follow:type=='follow'}"
  >
    <span class="block" :style="{background: frameData.iconTextRgb}"></span>
    <!-- <img
      :src="item.bedLabel.includes('_')?imageBoy:imageMan"
      alt
      class="img"
      v-if="item.sex == '男'"
    />
    <img  :src="item.bedLabel.includes('_')?imageGirl:imageWomen" alt class="img" v-else /> -->
    <div class="name" flex-box="1">
      {{item.name}}
      <span
        class="red-tip"
        v-if="isTip && (frameData.iconText != '正常' && frameData.iconText != '没有评分')"
      ></span>
    </div>
    <div class="bed">{{item.bedLabel}} 床</div>
     <!-- <span class="block" :style="{background: frameData.iconTextRgb}"></span> -->
     <img v-if="type=='follow'" src="../../../../common/images/card/like.png" height="18" width="18" style="margin-left: 3px;" />
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-box {
  padding: 12px 10px;
  font-size: 13px;
  border-radius: 3px;
  margin: 1px 0;
  white-space: nowrap;

  .img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 11px;
  }

  .name {
    overflow: visible;
    color: #687179;
  }

  .bed {
    color: #333333;
  }

  &:hover {
    background: #F7F7FA;
  }
  &.active {
    background: #F1F1F5;
    font-weight: bold;

    .name {
      color: #333333;
    }
  }

}
.follow {
  &.active{
    background: #fff !important;
  }
  &:hover {
    background: #fff !important;
  }
}
.red-tip {
  display: inline-block;
  width: 13px;
  height: 13px;
  background: rgba(230, 44, 44, 1);
  border-radius: 50%;
  position: relative;
  top: -3px;
  left: -5px;
}

.block {
  width: 13px;
  height: 13px;
  display: inline-block;
  border-radius: 2px;
  background: transparent;
  // margin-right: 15px;
  margin-left: 5px;
}
</style>
<script>
import WebSocketService from "@/plugin/webSocket";
import currDataObj from "../store/index";
export default {
  props: ["item", "index","type"],
  data() {
    return {
      frameData: {},
      currDataObj,
      isTip: false,
      subscribeId: "",
      firstFlag: true,
      isShow: true,
      imageBoy: require("./images/男婴.png"),
      imageGirl: require("./images/女婴.png"),
      imageMan: require("./images/男.png"),
      imageWomen: require("./images/女.png")
    };
  },
  created() {
    this.subscribeId = WebSocketService.subscribe(
      `/topic/mews/${this.item.patientId}/${this.item.visitId}`,
      (frame) => {
        this.frameData = JSON.parse(frame.body).data;
        if (!WebSocketService.isInMd5List(this.frameData.md5)) {
          if (this.frameData.mewsInstancePlanDto) {
            this.isTip = true;
          }
        }
        if (!this.frameData.mewsInstancePlanDto) {
          // this.isShow = false;
        } else {
          this.isShow = true;
        }
        if (this.active) {
          this.selectPatient();
        }
        // if (this.index === 0 && this.firstFlag) {
        //   this.selectPatient();
        //   this.firstFlag = false;
        // }
      }
    );
  },
  beforeDestroy() {
    if (typeof this.subscribeId == "number") {
      WebSocketService.unsubscribe(this.subscribeId);
    }
  },
  computed: {
    active() {
      // return this.item.patientId === this.currDataObj.patientId;
      return this.item.patientId === this.$store.state.sheet.patientInfo.patientId;
    },
  },
  methods: {
    selectPatient() {
      Object.assign(currDataObj, this.frameData);
      this.isTip = false;
      this.$store.commit("upPatientInfo", this.item);
      if (!WebSocketService.isInMd5List(this.frameData.md5)) {
        WebSocketService.addMd5List(this.frameData.md5);
      }
    },
  },
  components: {},
};
</script>
