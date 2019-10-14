<template>
  <div
    class="patient-box"
    flex="cross:center"
    :key="item.patientId"
    v-show="isShow"
    @click="selectPatient"
    :class="{active: active}"
  >
    <span class="block" :style="{background: frameData.iconTextRgb}"></span>
    <div class="name" flex-box="1">
      {{item.name}}
      <span class="red-tip" v-if="isTip && (item.iconText != '正常')"></span>
    </div>
    <div class="bed">{{item.bedLabel}} 床</div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-box {
  padding: 12px 10px;
  font-size: 13px;
  border-radius: 3px;
  margin: 1px 0;

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
  margin-right: 15px;
}
</style>
<script>
import WebSocketService from "@/plugin/webSocket";
import currDataObj from "../store/index";
export default {
  props: ["item", "index"],
  data() {
    return {
      frameData: {},
      currDataObj,
      isTip: false,
      subscribeId: "",
      firstFlag: true,
      isShow: true
    };
  },
  created() {
    this.subscribeId = WebSocketService.subscribe(
      `/topic/mews/${this.item.patientId}/${this.item.visitId}`,
      frame => {
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
      return this.item.patientId === this.currDataObj.patientId;
    }
  },
  methods: {
    selectPatient() {
      Object.assign(currDataObj, this.frameData);
      this.isTip = false;
      if (!WebSocketService.isInMd5List(this.frameData.md5)) {
        WebSocketService.addMd5List(this.frameData.md5);
      }
    }
  },
  components: {}
};
</script>
