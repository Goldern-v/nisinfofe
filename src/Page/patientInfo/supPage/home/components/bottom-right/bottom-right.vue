<template>
  <div>
    <box :title="'MEWS'" :aside="`(${scoreList})`">
      <div slot="body">
        <div :style="{height: boxHeight + 'px'}" class="body-con">
          <div class="score-con" flex="cross:center">
            <span class="score-text">当前评分：</span>
            <div class="status-btn" :style="{background: frameData.iconTextRgb}">{{frameData.score}}分-{{frameData.iconText}}</div>
          </div>
          <div>
            <div class="body-box" v-for="(item, index) in list" :key="index">
              <div class="title" flex="cross:center">
                <span class="key">{{item.title}}：</span>
                <span class="value">（{{item.reason}}）</span>
              </div>
              <div class="list-item" v-html="item.wardShipPlan"></div>
            </div>
            <div v-if="(list || []).length === 0" class="null-text">
              暂无监护方案
            </div>
          </div>
        </div>
      </div>
    </box>
  </div>
</template>

<script>
import box from "../box/box";
import WebSocketService from "@/plugin/webSocket";
export default {
  data() {
    return {
      subscribeId: "",
      frameData: {
        bedLabel: "",
        iconText: "",
        iconTextRgb: "",
        instanceVitalDtos: [],
        mewsInstancePlanDto: "",
        name: "",
        patientId: "",
        score: "",
        visitId: ""
      }
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    boxHeight() {
      return this.wih - 354;
    },
    scoreList() {
      return (this.frameData.instanceVitalDtos || [])
        .map(item => `${item.signName}${item.signScore}分`)
        .join("，");
    },
    list() {
      return this.frameData.mewsInstancePlanDto;
    }
  },
  methods: {},
  created() {
    this.subscribeId = WebSocketService.subscribe(
      `/topic/mews/${this.$route.query.patientId}/${this.$route.query.visitId}`,
      frame => {
        this.frameData = JSON.parse(frame.body).data;
      }
    );
  },
  beforeDestroy() {
    if (typeof this.subscribeId == "number") {
      WebSocketService.unsubscribe(this.subscribeId);
    }
  },
  components: {
    box
  }
};
</script>

<style lang="stylus" scoped>
.score-con {
  height: 56px;
  padding-left: 14px;
  border-bottom: 1px dashed #E7EAEC;

  .score-text {
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
}

.status-btn {
  width: 72px;
  height: 26px;
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  margin-left: 8px;
}

.body-con {
  position: relative;
  overflow: auto;
}

.body-box {
  padding: 14px 0 14px 14px;
  border-bottom: 1px dashed #E7EAEC;
}

.title {
  margin-bottom: 10px;
  font-weight: bold;

  .key {
    font-size: 14px;
    color: #000;
  }

  .value {
    font-size: 13px;
    color: #687179;
  }
}

.list-item {
  font-size: 13px;
  color: #000;
  line-height: 18px;
}

.null-text {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 20px;
  line-height: 20px;
}
</style>