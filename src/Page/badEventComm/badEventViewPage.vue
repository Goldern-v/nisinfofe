<template>
  <div>
    <ReportedModal
      :dialogVisible="isReported"
      :data="reportedData"
      @close="close"
      @confirm="confirm"
    />
    <!-- 不良事件 -->
    <div class="viewbar">
      <div class="viewbar-left">
        <div class="viewbar-left-top">
          <div class="bad-event-nav">
            <router-link to="/badEvent">不良事件</router-link>> 事件详情
          </div>
          <div class="bad-event-title">
            {{ $route.query.badEventOrderNo || "" }}
            {{ $route.params.name || "" }}
          </div>
          <div class="state-text">
            <span>状态：</span>
            <span class="state">{{ stateText }}</span>
          </div>
        </div>
        <div
          class="bad-event-container"
          :style="'height:' + (wih - 100) + 'px!important;'"
        >
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
                :style="`min-height:${wih - 176}px`"
                @load="onloadPage"
                ref="iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div class="viewbar-right" :style="'height: ' + (wih - 60) + 'px'">
        <div class="viewbar-right-top">
          <Button class="btn" @click="goBack">返回</Button>
          <Button
            class="btn"
            :disabled="badEventLoad || isDisabled"
            @click="saveEdit"
            >编辑</Button
          >
          <Button
            class="green-btn btn"
            :disabled="badEventLoad || isDisabled2"
            @click="uploadEdit"
            >上报</Button
          >
        </div>
        <div class="track-area">
          <div class="viewbar-right-title">事件轨迹：</div>
          <div class="trackEvents">
            <el-steps
              class="viewbar-right-steps"
              :active="stepStatus"
              finish-status="success"
              direction="vertical"
            >
              <el-step
                v-for="(step, index) in steps"
                :key="'step' + index"
                :title="step.title"
                :description="step.description"
                :status="step.status"
              >
                <div slot="title" style="color: #333">{{ step.title }}</div>
                <div
                  slot="description"
                  style="color: #333; line-height: 1.5em"
                  v-html="step.auditMind"
                ></div>
                <div
                  slot="description"
                  style="color: #333; line-height: 1.5em"
                  v-html="step.description"
                ></div>
              </el-step>
            </el-steps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.viewbar {
  margin-right: 0px;
  font-size: 13px;
  position: relative;
}

.viewbar-right {
  width: 250px;
  min-width: 200px;
  height: auto;
  background: #fff;
  margin-right: 0px;
  padding: 114px 0 0;
  position: absolute;
  right: 0;
  top: 0;
  border-right: 1px solid #CBD5DD;
  background: #F7FAFA;
  box-sizing: border-box;

  .viewbar-right-top {
    background: linear-gradient(180deg, rgba(248, 248, 252, 1) 0%, rgba(235, 236, 240, 1) 100%);
    border-bottom: 1px solid #CBD5DD;
    overflow: hidden;
    padding: 42px 0 41px 20px;
    display: flex;
    width: 360px;
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;

    .btn {
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

  .track-area {
    height: 100%;
  }

  .trackEvents {
    height: 100%;
    height: calc(100% - 50px);
    overflow: auto;
  }

  .viewbar-right-steps {
    margin-left: 28px;
  }
}
>>>.is-success {
  .el-step__line {
    background-color: #4BB08D;
  }
}
>>>.el-step__head {
  width: 18px;
  height: 18px;
  line-height: 18px;
  font-size: 18px;

  &.is-text {
    font-size: 9px;

    &.is-success {
      background-color: #4BB08D;
      border-color: #4BB08D;
    }
  }

  .el-step__icon {
    line-height: 18px;
  }

  .el-step__line.is-vertical {
    top: 22px;
    left: 10px;
  }
}
>>>.el-step {
  &.is-vertical {
    .el-step__main {
      padding-left: 30px;
      padding-bottom: 26px;
    }

    .el-step__title {
      line-height: 24px;
    }
  }

  .el-step__head, .el-step__main {
    display: block !important;
  }

  .el-step__head {
    float: left;
  }
}

// color: #13ce66;
// >>>.el-step__head.is-text.is-success,.is-error
// background: transparent;
// >>>.el-step__head.is-text.is-error
// background: transparent;
.viewbar-left {
  margin-right: 250px;

  .viewbar-left-top {
    background: linear-gradient(180deg, rgba(248, 248, 252, 1) 0%, rgba(235, 236, 240, 1) 100%);
    border-bottom: 1px solid #CBD5DD;
    overflow: hidden;
    padding-top: 20px;
    padding-bottom: 20px;

    &>div {
      margin-left: 15px;
    }

    .bad-event-nav {
      color: #999;

      >a {
        color: #666;
      }
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
  background: #ccc;
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
import ReportedModal from "./components/modal/reportedModal.vue";
import { checkUser, reportForLc } from "./apis/index";
import { messageBox } from "./utils/messageBox";
export default {
  mixins: [common],
  components: {
    Button,
    EditToolbar,
    ReportedModal
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
      stateText: "保存", //状态名称
      badEventLoad: true, // 编辑按钮置灰
      isDisabled: true, //编辑/删除
      isDisabled2: false, // 上报
      isDisabled3: true, // 撤销
      showPrint: false,
      isSaved: false,
      departmentBack: false,
      anonymous: true, //是否匿名上报
      isReported: false,
      reportedData: {},
      master:{}
    };
  },
  computed: {
    badEventPageLoading() {
      return window.pageLoading || this.pageLoading;
    }
  },
  created() {
    this.load();
    this.bus.$on("badEventViewPageUpdateUI", this.updateUI);
  },
  mounted() {
    window.updateBadEventViewPage = this.onloadPage;
    window.badEventLoad = this.showBtn;

    this.stateText = this.$route.query.statusName || this.stateText;
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
    showBtn(instance, handlenodeDto, auditDetails) {
      this.master = instance
      this.badEventLoad = false;
      if (instance) {
        let status = instance.status;
        this.status = status;
        this.showPrint = instance.inFinish;
        this.departmentBack =
          instance.status == "department_back" &&
          this.$route.params.code == "badevent_nys_pressure";
        this.anonymous = instance.anonymous;
      }
      // this.updateUI(handlenodeDto);
      // if (this.HOSPITAL_ID == "guizhou") {
      //   this.updateUI(handlenodeDto);
      //   return;
      // }
      // 获取所有事件状态
      // this.getEventStatus(this.status);

      this.$nextTick(() => {
        // auditDetails 聊城审核节点
        this.updateUI(handlenodeDto, auditDetails);
      });
      // this.getBadEventStream();
    },
    async load() {
      if (this.$route.params.name) {
        let queryObj = {
          id: this.$route.params.id || "",
          token: this.token,
          badEventName: this.$route.params.name,
          badEventType: this.$route.params.type,
          badEventCode: this.$route.params.code,
          operation: this.$route.params.operation,
          isIndependent: this.$route.params.isIndependent
        };
        // 不良事件报表
        // let formHTMLName = "不良事件病人安全通报单";
        let formHTMLName = this.$route.params.name;
        let eventName = this.$route.params.name;
        let eventType = this.$route.params.type;
        let commonUrl = this.isDev ? devFormUrl : formUrl;
        this.url = `${commonUrl}/${formHTMLName}.html?${qs.stringify(
          queryObj
        )}`;
        // if (this.isDev) {
        //   this.url = `${devFormUrl}/${formHTMLName}.html?${qs.stringify(
        //     queryObj
        //   )}`;
        // } else {
        //   const host = window.location.host;
        //   //if((this.HOSPITAL_ID == 'nys' && ( host == 'info.cr-health.com:20201' || host == '192.168.1.54:8062') ) || this.HOSPITAL_ID == 'guizhou'){
        //   if (
        //     (this.HOSPITAL_ID == "nys" &&
        //       (host == "info.cr-health.com:20201" ||
        //         host == "192.168.1.54:8062")) ||
        //     this.HOSPITAL_ID == "guizhou" ||
        //     this.HOSPITAL_ID == "fqfybjy"
        //   ) {
        //     formHTMLName += ".html";
        //   }
        //   this.url = `${formUrl}/${formHTMLName}?${qs.stringify(queryObj)}`;
        // }
        this.pageLoadingText = formHTMLName + ",正在加载中...";
      }
      Array.prototype.max = function () {
        return Math.max.apply({}, this);
      };
      Array.prototype.min = function () {
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
    updateUI(stream, auditDetails) {
      console.log(stream, auditDetails);
      let isFlag = false,
        nextStatusObj;
      this.steps = stream.map((item, index) => {
        let operatorName = "",
          operateDate = "",
          status = "";
        operatorName = item.handlerName || "未完成";
        operateDate = item.handleTime
          ? moment(item.handleTime).format("YYYY-MM-DD HH:mm")
          : "";
        if (item.status == 1 && index == stream.length - 1 && !item.noPass) {
          status = "finish";
          this.currentNodeCode = item.nodeCode;
          this.stateText = item.nodeName;
        } else if (item.status == 1 && !item.noPass) {
          status = "success";
          this.currentNodeCode = item.nodeCode;
          this.stateText = item.nodeName;
        } else if (item.status == 0) {
          status = "wait";
        } else {
          status = "error";
        }
        // if (item.status == 0 && !nextStatusObj) {
        //   nextStatusObj = item;
        //   this.isDisabled = !nextStatusObj.canUpdate;
        // }
        if (item.status == 1 && item.nodeCode == "commit") {
          this.isDisabled = true;
          this.isDisabled2 = true;
        } else if (item.status == 0 && item.nodeCode == "commit") {
          this.isDisabled = false;
          this.isDisabled2 = false;
        }
        return {
          title: item.operateName || item.operatorName || item.nodeName,
          auditMind: item.auditMind || "",
          description: `${operatorName}<br>${operateDate}<br>${item.handleContent}`,
          status
        };
      });
      if (["liaocheng"].includes(this.HOSPITAL_ID)) {
        auditDetails = auditDetails || {}
        this.lcAuditDetails(auditDetails);
      }
    },
    lcAuditDetails(auditDetails) {
      this.isDisabled = auditDetails.sbstatus == "已上报";
      this.isDisabled2 = auditDetails.sbstatus == "已上报";
      this.steps = [
        {
          title: "保存",
          status: "success"
        },
        // {
        //   title:"提交",
        //   status:Number(this.master.status)>=1 ? "success" :"wait"
        // },
        {
          title: "上报",
          description: auditDetails.sbr,
          status: auditDetails.sbstatus == "已上报" ? "success" : "wait"
        },
        {
          title: "质控科分派",
          description: `${auditDetails.fpr||''}<br>${auditDetails.fprq||''}`,
          status: auditDetails.fpstatus == "已分派" ? "success" : "wait"
        },
        {
          title: "职能部门审核",
          description: `${auditDetails.znbmshr||''}<br>${auditDetails.znbmshsj||''}`,
          status: auditDetails.znbmshstatus == "审核通过" ? "success" : "wait"
        },
        // {
        //   title: "质控科审核",
        //   name: "",
        //   data: "",
        //   status: "",
        //   description:"zkzxshyj"
        // },
        {
          title: "职能部门结案",
          description: `${auditDetails.jar||''}<br>${auditDetails.jasj||''}`,
          status: auditDetails.jastatus == "已结案" ? "success" : "wait"
        },
        {
          title: "质控科结案",
          description: `${auditDetails.zkzxshr||''}<br>${auditDetails.zkzxshsj||''}`,
          status: auditDetails.zkzxshstatus == "审核通过" ? "success" : "wait"
        },
        {
          title: "完成",
          status: auditDetails.zkzxshstatus == "审核通过" ? "success" : "wait"
        }
      ];
      this.steps.map((item,index)=>{
        if(item.status=='success') {
          this.stateText = item.title
        }
      })
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
      const formIframe = this.$refs.iframe.contentWindow;
      if (["liaocheng"].includes(this.HOSPITAL_ID)) {
        this.specialUpload(formIframe);
      } else {
        formIframe.uploadBadEventForm(this.$router, this.currentNodeCode);
      }
    },
    //聊城上报
    specialUpload(formIframe) {
      let data = formIframe.getFormData();
      //B0023001 发生科室、 B0023013  发生日期 、B0023014  日期类型 、B0023015  发生时段 、B0023031 事件经过
      // B0023006 住院号 、B0023004 性别  、 B0023005 年龄 、B0023003 姓名
      let { B0023001, B0023013, B0023014, B0023015, B0023031 ,B0023006,B0023004,B0023005,B0023003} = data;
      let eventType={
        "其他类" :"其他类",
        '新发2期及以上院内压力性损伤通报单':"压力性损伤",
        '药物应用事件通报单':"药物应用",
        '跌倒通报单':"跌倒",
        '非计划拔管通报单':"非计划拔管",
      }
      this.reportedData = {
        isAnonymity: "", //是否匿名上报
        reporterType: "", //报告人类型  临床医生  临床护士  门诊医技人员  药学系统人员  行政后勤人员  其他人员
        happenedPlace: "", //发生地点
        happenedDept: this.master.wardName, //发生科室
        happenedDate: B0023013 ? new Date(B0023013) : "", //发生日期
        eventType: eventType[this.master.eventType] || "", //事件类型
        happenedTimeFrame: B0023015, //发生时段 上午 中午 下午 小夜 大夜 具体时间不明
        courseOfEvent: B0023031, //时间经过
        patientId:this.master.patientId,//患者id
        sex:B0023004,//性别
        name:B0023003,//姓名
        age:B0023005,
      };
       this.isReported = true;
      // window.openSignModal((password, empNo) => {
      //   messageBox().show("正在身份验证中...", "info", 2000);
      //   checkUser({ empNo, password })
      //     .then((res) => {
      //       if (res.data.code == 200) {
      //         messageBox().show("验证成功", "success", 3000);
              // this.isReported = true;
      //       } else {
      //         messageBox().show(res.data.desc, "error", 3000);
      //       }
      //     })
      //     .catch((err) => {
      //       messageBox().show("验证失败", "error", 3000);
      //     });
      // }, "提交验证");
    },
    // 撤销上报
    revoke() {
      if (this.wid) {
        this.wid.CRForm.controller.revoke(this.$route.params.id, this.$router);
      }
    },
    // 获取所有事件状态
    getEventStatus(status = "save") {
      let list = ["badEvent_status"];
      multiDictInfo(list).then((res) => {
        let arr = res.data.data.badEvent_status;
        this.eventStatusOptions = this.eventStatusOptions.concat([
          { code: "", name: "全部" },
          ...arr
        ]);
        for (let i = 0; i < this.eventStatusOptions.length; i++) {
          if (this.eventStatusOptions[i].code == status) {
            this.stateText = this.eventStatusOptions[i].name;
          }
        }

        this.isDisabled =
          this.status != this.eventStatusOptions[1].code &&
          this.eventStatusOptions[2] &&
          this.status != this.eventStatusOptions[2].code;
        console.log(this.isDisabled);
        console.log(this.status);
        this.isDisabled2 =
          this.eventStatusOptions[1] &&
          this.status != this.eventStatusOptions[1].code;
        this.isDisabled3 =
          this.eventStatusOptions[2] &&
          this.status != this.eventStatusOptions[2].code;
      });
    },
    // 不良事件轨迹
    getBadEventStream() {
      getStreamByInstanceId(this.$route.params.id).then((res) => {
        if (res.data && res.data.code == 200) {
          this.updateUI(res.data.data);
        }
      });
    },
    goBack() {
      this.$router.push("/badEvent");
    },
    onPrint() {
      if (this.$refs.iframe) {
        let el = document.querySelector(".viewbar-right .track-area");
        if (
          !this.$refs.iframe.contentWindow.document.querySelector(".track-area")
        ) {
          this.$refs.iframe.contentWindow.document
            .querySelector("#track-area")
            .appendChild(el.cloneNode(true));
        }
        this.$refs.iframe.contentWindow.print();
      }
    },
    save(e) {
      console.log("save", e);
      if (this.wid) {
        this.isSaved = true;
        this.wid.CRForm.controller.saveForm(this.$router);
      }
    },
    close(flag) {
      this.isReported = flag;
    },
    confirm(data) {
      const { id } = this.$route.params;
      data.happenedDate = moment(data.happenedDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      data.formId = id;
      console.log(data);
      reportForLc(data).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          this.isReported = false;
          messageBox().show("上报成功", "success", 3000);
          setTimeout(() => {
            this.$router.push("/badEvent");
          }, 1000);
        } else {
          messageBox().show(res.data.desc, "error", 3000);
        }
      });
    }
  }
};
</script>
