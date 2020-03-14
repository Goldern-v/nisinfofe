
<template>
  <div>
    <!-- 不良事件 -->
    <div class="viewbar">
      <div class="viewbar-left">
        <div class="viewbar-left-top">
          <div class="bad-event-nav">
            <router-link to="/badEvent">不良事件</router-link>> 事件详情
          </div>
          <div
            class="bad-event-title"
          >{{$route.query.badEventOrderNo || ''}} {{$route.params.name || ''}}</div>
          <div class="state-text">
            <span>状态：</span>
            <span class="state">{{stateText}}</span>
          </div>
        </div>
        <div class="bad-event-container" :style="'height:'+(wih-100)+'px!important;'">
          <div class="bad-event-edit">
            <div
              class="bad-event-paper"
              v-loading="badEventPageLoading"
              :element-loading-text="pageLoadingText"
            >
              <iframe
                frameborder="0"
                class="badEvent-iframe"
                :src="url"
                :style="`min-height:${wih-176}px`"
                @load="onloadPage"
                ref="iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div class="viewbar-right" :style="'height: '+(wih-60)+'px'">
        <div class="viewbar-right-top">
          <Button class="btn" :disabled="isDisabled" @click="saveEdit">编辑</Button>
          <Button class="btn" :disabled="isDisabled" @click="deleteEdit">删除</Button>
          <Button class="green-btn btn" :disabled="isDisabled" @click="uploadEdit">上报</Button>
        </div>
        <div class="viewbar-right-title">事件轨迹：</div>
        <el-steps
          class="viewbar-right-steps"
          :active="stepStatus"
          finish-status="success"
          direction="vertical"
        >
          <el-step
            v-for="(step,index) in steps"
            :key="'step'+index"
            :title="step.title"
            :description="step.description"
            :status="step.status"
          >
            <span slot="title" style="color:#333">{{step.title}}</span>
            <br />
            <span
              slot="description"
              style="color:#333;line-height: 1.5em;"
              v-html="step.description"
            ></span>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<style lang="stylus"  rel="stylesheet/stylus" type="text/stylus" scoped>
.viewbar {
  margin-right: 0px;
  font-size: 13px;
  position: relative;
}

.viewbar-right {
  width: 320px;
  min-width: 200px;
  height: auto;
  background: #fff;
  margin-right: 0px;
  padding: 0px 0px;
  position: absolute;
  right: 0;
  top: 0;
  border-right: 1px solid #CBD5DD;
  background: #F7FAFA;

  .viewbar-right-top {
    background: linear-gradient(180deg, rgba(248, 248, 252, 1) 0%, rgba(235, 236, 240, 1) 100%);
    border-bottom: 1px solid #CBD5DD;
    overflow: hidden;
    padding: 42px 0 41px 42px;

    .btn {
      width: 78px;
      margin-right: 8px;
      margin-left: 0;
      height: 30px;

      &.green-btn {
        background: #4BB08D;
        color: #fff;
      }
    }
  }

  .viewbar-right-title {
    position: relative;
    margin-left: 20px;
    margin-top: 19px;
    margin-bottom: 16px;
    color: #333;
    font-size: 14px;

    line-height 18px {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 6px;
      height: 100%;
      background: #4BB08D;
    }
  }

  .viewbar-right-steps {
    margin-left: 28px;

    >>>.el-step__icon {
      font-size: 12px;
    }
  }
}

>>>.el-step__head {
  // width 20px
  // height 20px
  &.is-text {
    font-size: 9px;
  }
}

// color: #13ce66;
// >>>.el-step__head.is-text.is-success,.is-error
// background: transparent;
// >>>.el-step__head.is-text.is-error
// background: transparent;
.viewbar-left {
  margin-right: 320px;

  .viewbar-left-top {
    background: linear-gradient(180deg, rgba(248, 248, 252, 1) 0%, rgba(235, 236, 240, 1) 100%);
    border-bottom: 1px solid #CBD5DD;
    overflow: hidden;
    padding-top: 20px;
    padding-bottom: 20px;

    &>div {
      margin-left: 15px;
    }

    a {
      color: #000;
      text-decoration: none;
    }

    .bad-event-title {
      margin-top: 11px;
      line-height: 25px;
      font-size: 18px;
      padding-bottom: 5px;
    }

    .state-text {
      font-size: 13px;
      line-height: 18px;
      margin-top: 1px;
      color: #284FC2;
    }
  }
}

hr {
  color: #EAEEF1;
  background-color: #EAEEF1;
  border: 1px solid #EAEEF1;
}

.viewbar-box {
  padding: 19px 20px;

  &.title {
    background-color: #F7FAFA;
    padding: 0px;
  }

  &.bottom {
    border-bottom: 1px solid #CBD5DD;
    min-height: 42px;
  }
}

.red-font {
  color: red;
}

.green-font {
  color: green;
}

.bad-event-container {
  padding: 0;
  flex: 1;
  // overflow: auto;
}

.bad-event-edit {
  display: flex;
  flex-direction: column;
}

.bad-event-paper {
  position: relative;
  margin: 0px;
  padding: 0px;
  // height 2080px
  // min-height 1080px
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.badEvent-iframe {
  width: 100%;
  // min-height 1080px
  height: -webkit-fill-available;
  height: auto;
  background: #eee;
  min-height: auto;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  // filter alpha(opacity=0)
  opacity: 0;
  background: #ffffff;
  margin: -12px -20px;
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import Button from "./components/button";

import EditToolbar from "./components/toolbar/editToolbar";

import { formUrl, devFormUrl } from "@/common/pathConfig/index.js";
import { getStreamByInstanceId } from "./apis/index.js";
import { multiDictInfo } from "@/api/common";

import qs from "qs";

import BusFactory from "vue-happy-bus";

import moment from "moment";

export default {
  mixins: [common],
  components: {
    Button,
    EditToolbar
  },
  data() {
    return {
      bus: BusFactory(this),
      steps: [], // wait/process/finish/error/success
      url: "",
      iframeHeight: this.whi + 50,
      pageLoading: true,
      pageLoadingText: "表单加载中...",
      params: {},
      wid: Object,
      stepStatus: 0, //步骤条状态
      eventStatusOptions: [], //所有事件状态
      status: "", //状态
      stateText: "" //状态名称
    };
  },
  computed: {
    badEventPageLoading() {
      return window.pageLoading || this.pageLoading;
    },
    isDisabled() {
      return (
        (this.eventStatusOptions[1] &&
          this.status == this.eventStatusOptions[1].code) ||
        (this.eventStatusOptions[2] &&
          this.status == this.eventStatusOptions[2].code)
      );
    }
  },
  created() {
    this.load();
    this.bus.$on("badEventViewPageUpdateUI", this.updateUI);
  },
  mounted() {
    this.getBadEventStream();
    window.updateBadEventViewPage = this.onloadPage;
    // 获取所有事件状态
    this.getEventStatus();
    this.stateText = this.$route.query.statusName;
    this.status = this.$route.params.status;
  },
  watch: {
    "$route.params.operation"() {
      this.load();
    },
    "$route.params"() {
      this.params = this.$route.params;
      this.onloadPage();
    }
  },
  methods: {
    async load() {
      if (this.$route.params.name) {
        let queryObj = {
          id: this.$route.params.id || "",
          token: this.token,
          badEventName: this.$route.params.name,
          badEventType: this.$route.params.type,
          badEventCode: this.$route.params.code,
          operation: this.$route.params.operation
        };
        // 不良事件报表
        let formHTMLName = "不良事件病人安全通报单";
        let eventName = this.$route.params.name;
        let eventType = this.$route.params.type;

        if (this.isDev) {
          this.url = `${devFormUrl}/${formHTMLName}.html?${qs.stringify(
            queryObj
          )}`;
        } else {
          this.url = `${formUrl}/${formHTMLName}.html?${qs.stringify(
            queryObj
          )}`;
        }
        this.pageLoadingText = formHTMLName + ",正在加载中...";
      }
      Array.prototype.max = function() {
        return Math.max.apply({}, this);
      };
      Array.prototype.min = function() {
        return Math.min.apply({}, this);
      };
    },
    onloadPage() {
      this.iframeHeight = "auto";
      if (this.$refs.iframe) {
        let wid = this.$refs.iframe.contentWindow;
        window.wid = wid;
        this.wid = wid;
        this.iframeHeight = wid.document.body.scrollHeight * 1.05;
      }
      this.pageLoading = false;
    },
    gotoEditPage() {
      this.$router.push({
        name: "badEventEdit",
        params: {
          id: this.$route.params.id,
          name: this.$route.params.name,
          operation: "edit",
          type: this.$route.params.type
        }
      });
    },
    updateUI(stream) {
      let list = [
        {
          label: "保存：" + this.$route.params.name
        },
        {
          label: "上报"
        },
        {
          label: "质控科审核"
        },
        {
          label: "责任科室"
        },
        {
          label: "质控科总结"
        },
        {
          label: "医院质量与安全管理委员会处理"
        }
      ];

      this.steps = list.map((item, index) => {
        let operatorName = "",
          operateDate = "",
          status = "";
        if (index < stream.length) {
          if (
            stream[index].operatorStatus == "quality_controller_allow" &&
            !stream[index].allow
          ) {
            status = "error";
          } else {
            status = "success";
          }
        } else if (index == list.length - 1) {
          status = "finish";
        } else {
          status = "wait";
        }
        if (stream[index]) {
          if (
            stream[index].operatorStatus == "save" ||
            stream[index].operatorStatus == "nurse_submit"
          ) {
            operatorName = "***" + stream[index].operatorWardName || "";
          } else {
            operatorName =
              stream[index].operatorName +
                " (" +
                stream[index].operatorWardName +
                ")" || "";
          }
          operateDate = stream[index].operateDate
            ? moment(stream[index].operateDate).format("YYYY-MM-DD HH:mm")
            : "";
        } else {
          operatorName = "未完成";
        }

        return {
          title: item.label,
          description: `${operatorName}<br>${operateDate}`,
          status
        };
      });
    },
    saveEdit() {
      this.$route.params.operation = "edit";
      this.$router.push({
        name: "badEventEdit",
        params: this.$route.params
      });
    },
    deleteEdit() {
      if (this.wid) {
        this.wid.CRForm.controller.deleteForm(
          this.$route.params.id,
          this.$router
        );
      }
    },
    uploadEdit() {
      if (this.wid) {
        this.wid.CRForm.controller.aduitForm(
          this.$route.params.status,
          this.$router
        );
      }
    },
    // 获取所有事件状态
    getEventStatus() {
      let list = ["badEvent_status"];
      multiDictInfo(list).then(res => {
        let arr = res.data.data.badEvent_status;
        this.eventStatusOptions = [{ code: "", name: "全部" }, ...arr];
      });
    },
    // 不良事件轨迹
    getBadEventStream() {
      getStreamByInstanceId(this.$route.params.id).then(res => {
        if (res.data && res.data.code == 200) {
          this.updateUI(res.data.data);
          this.stepStatus = res.data.data.length;
          let index = res.data.data.length - 1 || 0;
        }
      });
    }
  }
};
</script>
