<template>
  <div class="main-containter">
    <toolBar :config="toolBarConfig"></toolBar>
    <div class="wrapper" v-if="block.status">
      <div class="header" flex="cross:center">
        <span class="catheter-name">{{block.catheterName}}</span>
        <span class="catheter-status" :style="{background: statusBlock.color}">{{statusBlock.text}}</span>
        <span v-show="block.status == '1'">
          <span class="margin-line">|</span>
          <span class="text-key">距拔管日还有：</span>
          <span class="days" :style="block.restDays < 0 && {color: 'red'}">{{block.restDays}}天</span>
        </span>
      </div>
      <div class="info-wrapper">
        <div class="info-content" flex>
          <div class="info-box" flex="cross:center">
            <div class="info-key">置管日期：</div>
            <div class="info-value" flex-box="1">{{block.startDate | toYmdhm}}</div>
          </div>
          <div class="info-box" flex="cross:center">
            <div class="info-key">置管人：</div>
            <div class="info-value" flex-box="1">{{block.startNurseName}}</div>
          </div>
          <div class="info-box" flex="cross:center">
            <div class="info-key">管道来源：</div>
            <div class="info-value" flex-box="1">{{block.source}}</div>
          </div>
        </div>
        <div class="info-content" flex>
          <div class="info-box" flex="cross:center">
            <div class="info-key">{{statusBlock.endDateText}}：</div>
            <div class="info-value" flex-box="1">{{block[statusBlock.endDate]}}</div>
          </div>
          <div class="info-box" flex="cross:center">
            <div class="info-key">拔管人：</div>
            <div class="info-value" flex-box="1">{{block.endNurseName}}</div>
          </div>
          <div class="info-box" flex="cross:center">
            <div class="info-key">置管天数：</div>
            <div class="info-value" flex-box="1">{{block.keepDays}}天</div>
          </div>
        </div>
        <whiteButton class="set-info-btn" text="编辑管道信息" @click="openEditBlockModal"></whiteButton>
      </div>
      <timeLine></timeLine>
      <div class="list-content">
        <recordBox v-for="(item,index) in model.recordList" :key="index" :data="item"></recordBox>
        <nullImg v-if="model.recordList.length == 0">
          <span>
            今天没有评估记录，点击
            <span class="zl" @click="openEvalModal()">这里</span>
            创建
          </span>
        </nullImg>
      </div>
    </div>
    <div v-else>
      <nullBg></nullBg>
    </div>
    <editBlockModal ref="editBlockModal"></editBlockModal>
    <evalModal ref="evalModal"></evalModal>
    <fluidModal ref="fluidModal"></fluidModal>
    <fluidSumUpModal ref="fluidSumUpModal"></fluidSumUpModal>
    <endBlockModal ref="endBlockModal"></endBlockModal>
    <editFluidSumUpModal ref="editFluidSumUpModal"></editFluidSumUpModal>
    <fluidChartModal ref="fluidChartModal"></fluidChartModal>
  </div>
</template>

<script>
import toolBar from "@/components/toolBar/toolBar";
import { toolBarConfig } from "./config/toolBar";
import whiteButton from "@/components/button/white-button";
import timeLine from "../timeLine/timeLine";
import { model, status_strategy } from "../../store";
import editBlockModal from "../../modal/edit-block-modal";
import evalModal from "../../modal/eval-modal";
import fluidModal from "../../modal/fluid-modal";
import fluidSumUpModal from "../../modal/fluidSumUp-modal";
import endBlockModal from "../../modal/end-block-modal";
import editFluidSumUpModal from "../../modal/edit-fluidSumUp-modal";
import fluidChartModal from "../../modal/fluid-chart-modal";
import recordBox from "./components/record-box";
import nullBg from "@/components/null/null-bg";
import nullImg from "@/components/null/null-img";
import moment from "moment";
export default {
  provide() {
    return {
      openEvalModal: this.openEvalModal,
      openFluidModal: this.openFluidModal,
      openFluidSumUpModal: this.openFluidSumUpModal,
      openEditFluidSumUpModal: this.openEditFluidSumUpModal
    };
  },
  data() {
    return {
      toolBarConfig: {},
      model,
      status_strategy
    };
  },
  computed: {
    block() {
      return model.selectedBlock;
    },
    statusBlock() {
      try {
        return status_strategy[this.block.status] || {};
      } catch (error) {
        return {};
      }
    }
  },
  created() {
    this.toolBarConfig = toolBarConfig(this);
  },
  methods: {
    openEditBlockModal() {
      this.$refs.editBlockModal.open(model.selectedBlock);
    },
    openEvalModal() {
      this.$refs.evalModal.open(...arguments);
    },
    openFluidModal() {
      this.$refs.fluidModal.open(...arguments);
    },
    openFluidSumUpModal() {
      this.$refs.fluidSumUpModal.open(...arguments);
    },
    openEndBlockModal() {
      this.$refs.endBlockModal.open(...arguments);
    },
    openEditFluidSumUpModal() {
      this.$refs.editFluidSumUpModal.open(...arguments);
    },
    openFluidChartModal() {
      this.$refs.fluidChartModal.open(...arguments);
    }
  },
  filters: {
    toYmdhm(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    }
  },
  components: {
    toolBar,
    whiteButton,
    timeLine,
    editBlockModal,
    recordBox,
    evalModal,
    fluidModal,
    fluidSumUpModal,
    endBlockModal,
    editFluidSumUpModal,
    fluidChartModal,
    nullBg,
    nullImg
  }
};
</script>

<style lang='scss' scoped>
.main-containter {
  height: 100%;
  border: 1px solid rgba(203, 213, 221, 1);
  border-left: 0;
  border-top: 0;
  box-sizing: border-box;
  background: rgba(248, 251, 251, 1);
  border-radius: 0px 2px 2px 0px;
}
.wrapper {
  padding: 20px 15px 0;
  box-sizing: border-box;
}
.header {
  border-bottom: 1px dashed rgba(203, 213, 221, 1);
  padding-bottom: 15px;
  .catheter-name {
    font-size: 20px;
    color: #333;
    margin-right: 11px;
    font-weight: bold;
  }
  .catheter-status {
    font-size: 14px;
    color: #fff;
    background: #69a7d9;
    padding: 3px 5px;
    border-radius: 2px;
  }
  .margin-line {
    font-size: 16px;
    color: #bababa;
    margin: 0 16px;
  }
  .days {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }
  .text-key {
    color: #687179;
    font-size: 13px;
  }
}
.info-wrapper {
  padding: 5px 0;
  border-bottom: 1px dashed rgba(203, 213, 221, 1);
  position: relative;
}
.info-content {
  padding: 5px 0;
  .info-box {
    font-size: 13px;
    width: 200px;
    .info-key {
      color: rgba(153, 153, 153, 1);
      width: 65px;
    }
    .info-value {
      color: rgba(51, 51, 51, 1);
      width: 0;
      margin-right: 20px;
    }
  }
}
.list-content {
  background: rgba(234, 238, 241, 1);
  border: 1px solid rgba(203, 213, 221, 1);
  height: calc(100vh - 310px);
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
</style>

<style lang="stylus" scoped>
.set-info-btn {
  position: absolute;
  right: 0;
  top: 19px;
  >>> .white-btn {
    margin-right: 0;
    padding: 0 10px;
    height: 27px;
  }
}
.zl {
  color: #284fc2;
  text-decoration:underline;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
}
</style>
