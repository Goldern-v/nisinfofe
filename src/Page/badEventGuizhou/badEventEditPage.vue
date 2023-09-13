
<template>
  <div class="editbar">
    <!-- 病人列表 -->
    <!-- <div class="editbar-left">
            <patientList v-if="showPatientList" :data="bedList" v-loading="patientListLoading"></patientList>
    </div>-->

    <!-- <div class="editbar-right" :style="showPatientList?'margin-left:200px':'margin-left:0px'"> -->
    <!-- 不良事件 报告单   data-print-class="printing"-->
    <!-- HOSPITAL_ID != 'hj' && $route.params.isIndependent==1（是否带外框） 目前厚街、南医三、贵州有不良事件 -->
    <HeadToolBar :showToolBar="!pageLoading" v-if="HOSPITAL_ID != 'hj'"></HeadToolBar>
    <EditToolbar :showLeft="true" :showRight="true" v-if="!pageLoading"></EditToolbar>
    <div class="bad-event-container" :style="'height:'+(wih-100)+'px!important;'">
      <div class="bad-event-edit">
        <NullBg v-if="iframeHeight===0" text="该页面没有找到～" />
        <div
          v-else
          class="bad-event-paper"
          v-loading="pageLoading"
          :element-loading-spinner="pageLoadingIco"
          :element-loading-text="pageLoadingText"
        >
          <iframe
            frameborder="0"
            class="badEvent-iframe"
            :src="url"
            :style="`min-height:${wih-100}px`"
            @load="onloadPage"
            ref="iframe"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- </div> -->
  </div>
</template>

<style lang="stylus"  rel="stylesheet/stylus" type="text/stylus" scoped>
.editbar {
  margin-right: 0px;
  font-size: 13px;
  position: relative;
}

.editbar-left {
  width: 200px;
  min-width: 200px;
  height: auto;
  background: #fff;
  margin-right: 0px;
  padding: 0px 0px;
  position: absolute;
  border-right: 1px solid #CBD5DD;
}

// .editbar-right
// margin-left 200px

// .editbar-left
// width 199px
// position absolute
// left 0
// top 0
// bottom 0
// .editbar-right
// margin-left 199px
// height 100%
// overflow hidden
// transition: all .4s cubic-bezier(.55, 0, .1, 1)
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
  border-radius: 0px;
  background: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.badEvent-iframe {
  width: 100%;
  // min-height 1080px
  // height: auto;
  // height: -webkit-fill-available;
  // height: auto;
  background: #ccc;
  min-height: 600px;
}

>>>.el-message {
  &.my-message-box {
    top: 6% !important;
    z-index: 20004 !important;
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import Button from "./components/button";
import patientList from "@/components/patient-list/patient-list.vue";
import EditToolbar from "./components/toolbar/editToolbar";
import HeadToolBar from "./components/toolbar/headToolBar";
import NullBg from "@/components/null/null-bg.vue";

import commonData from "@/api/commonData"; //入院HIS数据等

import qs from "qs";

import { formUrl, devFormUrl } from "@/common/pathConfig/index.js";
import { patients, nursingUnit, typeList } from "@/api/lesion.js";

import BusFactory from "vue-happy-bus";

export default {
  mixins: [common],
  components: {
    EditToolbar,
    NullBg,
    patientList,
    HeadToolBar
  },
  data() {
    return {
      url: "",
      bus: BusFactory(this),
      iframeHeight: this.whi,
      pageLoading: true,
      pageLoadingText: "表单加载中...",
      pageLoadingIco: "el-icon-loading",
      params: {},
      wid: null,
      bedList: [],
      bedLabel: "",
      patientListLoading: false,
      showPatientList: true,
      patient: null
    };
  },
  created() {
    this.pageLoading = true;
    this.load();
    this.bus.$on("loadPatientData", this.loadPatientData);
    this.bus.$on("loadError", this.loadError);

    function MessageBox() {
      var mesg = null;
      return {
        status: "close",
        // 显示消息
        show: function(info, type = "info", duration = 0, callback = null) {
          if (mesg) {
            this.close();
          }
          mesg = parent.window.app.$message({
            message: info,
            customClass: "my-message-box",
            type: type,
            duration: duration,
            showClose: true,
            onClose: () => {
              this.status = "close";
              console.log("!!!close!!!");
              if (duration !== 0 && callback) {
                callback();
              }
            }
          });
          this.status = "show";
        },
        // 关闭消息
        close: function() {
          console.log("关闭消息框");
          if (mesg) {
            mesg.close();
            this.status = "close";
          }
        },
        getStatus: function() {
          console.log("消息框状态", this.status);
          return this.status || "close";
        }
      };
    }
    window.messageBox = new MessageBox();
  },
  mounted() {
    // if (this.deptCode) {
    //   this.getDate();
    // }
  },
  watch: {
    "$route.params.operation"() {
      this.load();
    },
    "$route.params"() {
      this.params = this.$route.params;
      this.onloadPage();
    },
    iframeHeight() {
      console.log("iframeHeight", this.iframeHeight);
      if (this.iframeHeight === 0) {
        this.bus.$emit("configButton", {
          save: { disabled: true },
          submit: { disabled: true }
        });
      }
    },
    deptCode() {
      // if (this.deptCode) {
      //   this.getDate();
      // }
    }
  },
  methods: {
    async load() {
      console.log(
        "载入报告单",
        this.params,
        this.$route.params,
        this.$route,
        this.$route.query
      );
      if (this.$route.query && this.$route.query.bedLabel) {
        this.bedLabel = this.$route.query.bedLabel;
        this.showPatientList = false;
      } else {
        this.showPatientList = true;
      }
      if (this.$route.params.name) {
        let queryObj = {
          // "patientId": "",
          // "visitId": "",
          // "name": "",
          // "sex": "",
          // "age": "",
          // "diagnosis":"",
          // "bedLabel": "",
          // "inpNo": "",
          deptCode: "",
          wardCode: "",
          deptName: "",
          wardName: "",
          eventType: this.$route.params.type || "",
          happenDate: "",
          happenTime: "",
          happenReason: "",
          happenPlace: "",
          creator: this.empNo,
          creatorName: this.empName,
          badEventName: this.$route.params.name,
          badEventType: this.$route.params.type,
          badEventCode: this.$route.params.code,
          operation: this.$route.params.operation,
          token: this.token,
          isIndependent: this.$route.params.isIndependent
        };

        if (this.$route.params.operation === "edit") {
          // queryObj.id = this.$route.params.id||''
          this.showPatientList = false;
          queryObj = Object.assign(
            { id: this.$route.params.id || "" },
            queryObj
          );
        }
        // showBadEvent: "true"
        let showDevTool = localStorage["showDevTool"];
        let devStr = "";
        if (showDevTool && showDevTool === "true") {
          devStr = "isDev=1&";
        }
        // isDev=1&
        // 不良事件报表
        let formHTMLName = "不良事件病人安全通报单";
        let eventName = this.$route.params.name;
        let eventType = this.$route.params.type;
        if (this.isDev) {
          this.url = `${devFormUrl}/${formHTMLName}.html?${devStr}${qs.stringify(
            queryObj
          )}`;
        } else {
          const host = window.location.host;
          if((this.HOSPITAL_ID == 'nys' && ( host == 'info.cr-health.com:20201' || host == '192.168.1.54:8062') ) || ["guizhou", '925', 'qhwy'].includes(this.HOSPITAL_ID)){
            formHTMLName += '.html';
          }
          this.url = `${formUrl}/${formHTMLName}?${devStr}${qs.stringify(
            queryObj
          )}`;
        }
        this.pageLoadingText = eventName + "安全通报单,正在加载中...";

        console.log("载入url", this.url);
      }
    },
    onloadPage() {
      console.log("onloadPage", this.url, this.$route.params);

      this.pageLoading = false;
      this.iframeHeight = "auto";

      try {
        let wid = this.$refs.iframe.contentWindow;
        window.wid = wid;
        this.wid = wid;
        this.iframeHeight = wid.document.body.scrollHeight * 1.05;
        console.log(
          "wid",
          window,
          wid,
          wid.document.readyState,
          this.iframeHeight
        );
        if (this.patient && window.wid.rawData) {
          window.wid.rawData.methods.fillForm(this.patient);
          window.messageBox.close();
        }
      } catch (error) {
        //
      }

      //
    },
    loadError(meg = "", autoloadTime = 0) {
      this.pageLoadingText =
        autoloadTime === 0 ? meg : meg + autoloadTime + "秒后自动刷新。";
      this.pageLoadingIco = "el-icon-close";
      console.log("loadError", meg, autoloadTime);
      if (autoloadTime > 0) {
        setTimeout(() => {
          this.loadError(meg, --autoloadTime);
        }, 1000);
      } else {
        this.pageLoading = false;
        this.wid.messageBox.show("请重新请求数据", "info", 3000);
        this.onloadPage();
      }
    },
    async loadPatientData(patient) {
      this.bedLabel = "";
      this.patient = {};
      // this.iframeHeight = 'auto'
      this.iframeHeight = window.outerHeight * 0.9 || 600;
      this.pageLoading = true;
      this.pageLoadingIco = "el-icon-loading";
      this.pageLoadingText = "正在加载数据中...";
      console.log("病人patient:", patient);
      const res = await commonData
        .loadPatient(patient.patientId, patient.visitId)
        .catch(error => {
          console.log("loadPatient-error", error, res);
          this.loadError("网络异常，请求超时。请刷新页面。", 5);
        });
      console.log("病人资料:", res);
      if (res && res.data && res.data.data) {
        console.log("病人资料:", res, res.data.data);
        localStorage["patientInfo" + patient.patientId] = JSON.stringify(
          res.data.data
        );
        this.pageLoading = false;
        this.pageLoadingText = "表单加载中...";
        this.onloadPage();
        if (patient.callback) {
          patient.callback(res.data.data);
        }
      }
    },
    async getDate() {
      this.bedList = [];
      this.patient = null;
      // let wid = this.$refs.iframe.contentWindow
      // window.wid = wid
      // this.wid = wid

      if (!localStorage["patientList" + this.deptCode]) {
        this.patientListLoading = true;
        // window.messageBox.show('正在获取HIS数据中...')
        window.messageBox.show(
          "正在获取第" + this.bedLabel + "床号病人的HIS数据中...",
          "info",
          30000
        );
        const patRes = await patients(this.deptCode).catch(error => {
          window.messageBox.show("加载HIS数据失败", "error", 3000);
        });
        // this.patientList = patRes.data.data
        localStorage["patientList" + this.deptCode] = JSON.stringify(
          patRes.data.data
        );
        this.bedList = JSON.parse(localStorage["patientList" + this.deptCode]);
        console.log("病人列表p", patRes, localStorage);
        this.patientListLoading = false;
        // load patient with bedLabel
        if (this.bedLabel) {
          let p = this.bedList.filter(n => {
            return n.bedLabel === this.bedLabel;
          });
          if (p.length > 0) {
            this.patient = p[0];
            this.onloadPage();
          }
          console.log("patient", this.patient);
          window.messageBox.show("完成加载HIS数据", "success", 3000);
        } else {
          window.messageBox.show("请选择病人", "info", 3000);
        }
      } else {
        this.patientListLoading = false;
        this.bedList = JSON.parse(localStorage["patientList" + this.deptCode]);
        if (this.bedLabel) {
          let p = this.bedList.filter(n => {
            return n.bedLabel === this.bedLabel;
          });
          if (p.length > 0) {
            this.patient = p[0];
            // this.onloadPage()
          }
          console.log("--patient", this.patient);
        }
      }
    }
  }
};
</script>
