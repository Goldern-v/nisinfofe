<template>
  <div>
    <div
      :class="isLandscape ? 'contant-landscape' : 'contant'"
      v-loading="pageLoading"
      :element-loading-text="pageLoadingText"
      ref="iframeLoading"
    >
      <iframe
        :style="{ height: iframeHeight + 'px' }"
        frameborder="0"
        class="assessment-iframe"
        v-if="url"
        :src="url"
        @load="onload"
        ref="iframe"
      ></iframe>
    </div>
    <!-- 批注弹窗 -->
    <pizhuModal ref="pizhuModal"></pizhuModal>
    <!-- 签名弹窗 -->
    <signModal ref="signModal" :title="signTitle"></signModal>
    <scoreChart ref="scoreChart"></scoreChart>
    <!-- 消息提示弹窗 -->
    <message-modal ref="messageModal"></message-modal>
    <!-- 打开新建弹框 -->
    <openForm-modal ref="openFormModal"></openForm-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

.contantV2 {
  position: relative;
  background: transparent;
  margin: 0 auto;
  height: 100%;
  width: 100%;
}

.contant {
  border-radius: 2px;
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 20px 0px;
  box-sizing: border-box;
  width: 760px;
  margin: 0 auto;

  .assessment-iframe {
    width: 100%;
    min-height: 600px;
    overflow: hidden;
  }
}

// .print-contain
// padding 20px
// position relative
// box-sizing border-box
// width 760px
// overflow hidden
// .iframe-con
// width 100%
// overflow hidden
// min-height 600px
.contant-landscape {
  border-radius: 2px;
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 20px 20px;
  box-sizing: border-box;
  width: 1110px;
  // min-width 1110px
  margin: 0 auto;

  .assessment-iframe {
    width: 100%;
    overflow: hidden;
    min-height: 600px;
  }
}

>>>.el-loading-mask {
  background: white !important;
}
</style>

<script>
import $ from "jquery";
import moment from "moment";
import BusFactory from "vue-happy-bus";
import { evalDel } from "@/api/record";
import { checkUser } from "@/api/login"; //检查用户名密码有效性
import { eventInit } from "../../../../../../supComponts/formBox/form.event";
import formFill from "../../../../../../supComponts/formBox/form.fill";
import {
  evalDetail
  // formPrintPage,
  // formInputPrint
} from "@/api/form_hj";
import { host } from "@/api/apiConfig";
import { initList } from "../../../../../../supComponts/formBox/form.details";
import { initNooForm } from "../../../../../../supComponts/formBox/form.details.nooForm";
import signModal from "@/components/modal/sign.vue";
import openFormModal from "@/Page/patientInfo/supPage/record/modal/open-form.vue";
import scoreChart from "../../../../modal/score-chart.vue";
import messageModal from "../../../../../../supComponts/message-modal/message-modal.vue";
import pizhuModal from "@/Page/patientInfo/supPage/record/component/right-part/components/comment/pizhu-modal.vue";
import { del } from "@/api/mutilRecord.js";
import {
  markListById,
  handlepz,
  delpz,
  auditpz
} from "@/Page/patientInfo/supPage/record/component/right-part/components/comment/api/index.js";
import {
  formUrl,
  devFormUrl,
  devFormUrl_p80
} from "@/common/pathConfig/index.js";
import common from "@/common/mixin/common.mixin.js";
import qs from "qs";
export default {
  name: "assessment",
  mixins: [common],
  data() {
    return {
      bus: BusFactory(this),
      url: "",
      urlForm: "",
      pageLoading: false,
      pageLoadingText: "数据加载中",
      iframeHeight: 0,
      info: {},
      formInfo: {},
      wid: {},
      signTitle: "签名确认",
      showSignSave: false,
      formStatus: "0",
      isLandscape: false,
      eventTarget: null,
      marklist: [],
      handleMarklist: [],
      clipboardData: ""
    };
  },
  created() {
    this.pageLoading = true;
    this.bus.$on("closeAssessmentV1", () => {
      this.url = "";
    });
    this.bus.$on("openAssessment", this.openUrl);
    this.bus.$on("openNewFormBox", this.openNewFormBox);
    this.bus.$on("openMessageBox", this.openMessageBox);
    this.bus.$on("printAssessment", this.print);
    this.bus.$on("printAssessmentSingle", this.printSingle);
    this.bus.$on("printAssessmentMore", this.printMore);
    this.bus.$on("addAssessment", this.add);
    this.bus.$on("assessmentSignSave", this.signSave);
    this.bus.$on("assessmentShenheSign", this.shenheSign);
    this.bus.$on("assessmentRefresh", this.refresh);
    this.bus.$on("assessmentLoaded", this.onPageLoaded);
    this.bus.$on("assessmentOpenScoreChart", this.openScoreChart);
    this.bus.$on("editAssessment", this.openEditAssessment);
    this.bus.$on("reOpenFormInsideAssessment", this.reOpenFormInsideAssessment);
    this.bus.$on("delAssessment", this.delAssessment);
    this.bus.$on("setAssessmentLoadingStatus", this.setLoadingStatus);
    //
    this.bus.$on("openPizhuModalBox", (tr, td, callback = null) => {
      this.$refs.pizhuModal.open(tr, td, callback);
    });
  },
  mounted() {
    window.cleanAllMark = this.cleanAllMark;

    this.$refs["iframeLoading"]["$methods"] = () => {
      return {
        closeAssessment: () => {
          this.url = "";
          this.bus.$emit("closeAssessment");
        },
        openAssessmentBoxWidthVersion: e => {
          this.bus.$emit("openAssessmentBoxWidthVersion", e);
        },
        openAssessmentBox: e => {
          this.bus.$emit("openAssessmentBox", e);
        }
      };
    };
    this.$root.$refs["iframeLoadingV1"] = this.$refs["iframeLoading"];
  },
  methods: {
    openNewFormBox(box) {
      this.$refs.openFormModal.open(box);
    },
    openMessageBox(box) {
      // this.pageLoading = true
      this.$refs.messageModal.open("", box.content, box.title, "small");
      // this.pageLoading = true
    },
    // 点击左边栏目录里已经记录好的模版,通过改变iframe URL属性,刷新iframe内容
    openUrl(info) {
      try {
        window.app.$refs.iframeLoadingBox.$methods().setLoadingStatus(true);
      } catch (error) {
        console.error("~~openUrl", error);
      }

      // console.log(info, "mmmmtttttttttt");
      this.pageLoading = true;
      this.iframeHeight = 0;
      let token = window.app.$getCookie("NURSING_USER").split("##")[1];
      // this.$route.query['id'] = info.id
      let query = this.$route.query;
      // this.info = {}
      this.info.todo = "";
      this.info = Object.assign({}, this.info, info);
      this.info = Object.assign(this.info, info);
      let url = "";
      this.url = "";

      if (!this.info.nooForm) {
        this.info.nooForm = "0";
      }

      this.clipboardData = "";
      window.localStorage["clipboardData"] = "";

      // 关闭右键菜单\批注
      window.closeContextMenu();
      window.closeMarkTip();
      //
      this.marklist = [];
      this.handleMarklist = [];
      // 获取批注列表
      // this.getMarkList();

      console.log("~~~openUrl");

      // 如果是新版表单
      // let query = this.$route.query
      let queryObj = {
        id: this.info.id || "",
        formCode: this.info.formCode,
        patientId: query.patientId,
        visitId: query.visitId,
        name: query.name,
        sex: query.sex,
        age: query.age,
        deptCode: query.deptCode,
        deptName: query.deptName,
        diagnosis: query.diagnosis,
        bedLabel: query.bedLabel,
        inpNo: query.inpNo,
        wardCode: query.wardCode,
        wardName: query.wardName,
        admissionDate: query.admissionDate,
        token: this.token,
        todo: this.info.todo,
        title: this.info.title || ""
      };
      if( this.HOSPITAL_NAME === '东莞市厚街医院'){
        delete queryObj.token
      }

      this.info["pagePrintUrl"] = this.info.pageUrl
        ? this.info.pageUrl.replace(".html", "-打印.html")
        : "";

      if (this.info.nooForm == "1") {
        // console.log(queryObj.title,"formCode")
        if (this.isDev) {
          //  if(queryObj.formCode==='eduMission'){
          //     wid.setTitle(this.info.pageItem+"健康教育单")
          //  }
          // url = `${devFormUrl}/${this.info.pageUrl + '.html'}?${qs.stringify(queryObj)}`
          // 后台传回补了 '.html'
          url = `${devFormUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`;
          this.urlForm = `${formUrl}/${this.info.pageUrl}?${qs.stringify(
            queryObj
          )}`;
        } else {
          url = `${formUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`;
        }
        console.log("打开表单", url);
      } else {
        this.showSignSave = this.info.showSignSave || false;
        let formid = this.info.id;
        if (this.isDev) {
          url = `${devFormUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`;
          this.urlForm = `${formUrl}/${this.info.pageUrl}?${qs.stringify(
            queryObj
          )}`;
        } else {
          url = `${formUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`;
        }
        console.log(formUrl, "....打开表单", url);
      }

      this.url = "";
      setTimeout(() => {
        this.url = url;
      }, 100);
      // if (url == this.url) {
      // this.refresh();
      // } else {
      // console.log(url, "---", this.url, "1111");
      // }
    },
    onPageLoaded(type = "") {
      this.pageLoading = false;
      // 如果是新表单
      let wid = null;
      try {
        window.app.$refs.iframeLoadingBox.$methods().setLoadingStatus(false);
        wid = this.$refs.iframe.contentWindow;
        this.wid = this.$refs.iframe.contentWindow;
      } catch (error) {
        console.error("onPageLoaded:", error);
      }

      // 前方高能，此处有锅！

      //
      try {
        window.wid.document.querySelector(
          ".hospital"
        ).innerText = this.hospitalNameSpace;
      } catch (error) {
        //
      }

      //
      console.log("表单名", [type], this.info, this.info.title);
      try {
        try {
          if (wid.formInfo.nooForm == "2") {
            this.bus.$emit("openAssessmentBoxWidthVersion", { nooForm: "2" });
            return;
          }
        } catch (error) {}
        // 健康教育单
        if (this.info.pageItem) {
          wid.formInfo.getItem(this.info.pageItem);
          this.info.pageItem = this.info.pageItem.replace(/健康教育单/g, "");
          wid.formInfo.missionId = this.info.missionId + "";
          wid.setTitle(this.info.pageItem + "健康教育单");
          wid.formInfo.status = this.info.status;
          // if(this.info.missionId){
          //   wid.data.setFormData('页面ID',this.info.missionId)
          // }
          wid.data.setFormData("页面ID", this.info.missionId || "");

          // this.formatData.data.setFormData('页面ID',formInfo.missionId)
        }
      } catch (error) {
        console.log("error这里是楚霏的锅", error);
      }

      try {
        // this.$refs.formIframe.contentDocument.body.clientHeight

        if (!wid.formInfo.nooForm) {
          wid.formInfo.nooForm = "0";
          this.iframeHeight = "auto";
          this.iframeHeight = wid.document.body.clientHeight + 50;
          // this.iframeHeight = wid.document.body.scrollHeight * 1.04;
        }
        if (wid.formInfo.nooForm == "1") {
          this.iframeHeight = "auto";
          this.iframeHeight = wid.document.body.clientHeight + 50;
          // this.iframeHeight = wid.document.body.scrollHeight * 1.04;
          this.info = Object.assign({}, this.info, wid.formInfo);

          // 更新工具栏
          this.bus.$emit("initAssessmentTool", {
            tool: {
              formCode: this.info.formCode,
              canEdit: this.info.canEdit,
              status: this.info.status
            },
            creator: this.info.creator,
            listPrint: this.info.listPrint
          });
          // return;
        }
        //
        if (this.marklist) {
          // console.log("!!marklist!!", this.marklist);
          this.onloadMarkList();
        }
        //
      } catch (e) {
        console.log(e);
      }
      this.pageLoading = false;
    },
    onmessage(e) {
      // alert(e.data.type)
      if (["webpackClose"].indexOf(e.data.type) == -1) {
        console.log(e, "message");
      }
      // if (e.data.type == 'loaded' || e.data.type == "webpackOk") {
      if (["webpackOk", "loaded"].indexOf(e.data.type) > -1) {
        this.onPageLoaded("onmessage");
      }
    },
    onload() {
      this.pageLoading = true;
      this.pageLoadingText = "数据加载中";
      // this.marklist = [];
      let wid = this.$refs.iframe.contentWindow;
      this.wid = this.$refs.iframe.contentWindow;

      // window.document.addEventListener()
      this.wid.document.removeEventListener("click", this.onClick);
      window.document.removeEventListener("onScroll", this.onClick);
      this.wid.document.removeEventListener("contextmenu", this.onContextMenu);

      // window.document.addEventListener("click", this.onClick);
      this.wid.document.addEventListener("click", this.onClick);
      window.document.addEventListener("onScroll", this.onClick);
      this.wid.document.addEventListener("contextmenu", this.onContextMenu);
      //

      this.iframeHeight = "auto";
      this.iframeHeight = 100;

      this.isLandscape = false;
      try {
        for (const key in this.wid.formInfo) {
          if (this.wid.formInfo.hasOwnProperty(key)) {
            const element = this.wid.formInfo[key];
            if (key === "rotation" && element === "landscape") {
              this.isLandscape = true;
              break;
            }
          }
        }
      } catch (error) {
        //
        console.log(error);
      }

      // // // check input initial value;
      // let wid = this.$refs.iframe.contentWindow
      // var inputs = jQuery(`[name*="${this.info.formCode}"]`,wid.document)
      // console.log("#######inputs#######",inputs);
      console.log("载入页面", wid);
      window.wid = wid;

      if (
        wid.loadTimeData &&
        wid.loadTimeData.data_ &&
        wid.loadTimeData.data_.errorCode
      ) {
        console.log(
          "找不到页面",
          wid.loadTimeData.data_,
          wid.loadTimeData.data_.errorCode
        );
        let waitTime = 5;
        this.pageLoadingText = "网络异常,页面无法获取,请尝试刷新";
        let self = this;
        this.pageLoading = true;
        // window.clearInterval(wt);
        // let wt = window.setInterval(function(){
        //   if(waitTime<1){
        //     self.pageLoadingText = "正在载入页面";
        //     window.clearInterval(wt);
        //     window.setTimeout(function(){
        //       self.openUrl(self.url)
        //     },2000);
        //   }else{
        //     try {
        //       self.pageLoadingText = self.wid.loadTimeData.data_.errorCode+":页面无法获取，请尝试刷新("+(waitTime--)+"秒)"
        //     } catch (error) {
        //       window.clearInterval(wt);
        //     }
        //   }
        // }, 1000);
        return;
      }

      // 如果是新表单 跳出
      try {
        if (wid.formInfo.nooForm == "2") {
          this.bus.$emit("openAssessmentBoxWidthVersion", { nooForm: "2" });
          return;
        }
        // console.log("!!!!!!info",this.info)
        if (
          this.info &&
          this.info.formCode &&
          this.info.formCode === "eduMission"
        ) {
          return;
        }
        if (!wid.formInfo.nooForm) {
          wid.formInfo.nooForm = "0";
        }
        if (wid.formInfo.nooForm == "1") {
          console.log("ooooo");
          wid.onmessage = this.onmessage;
          // console.log("!!!!!!info.id",this.info,this.info.id)
          // if(!this.info.id){
          initNooForm(wid);
          // }
          return;
        }
      } catch (e) {
        console.log(e, "eeee");
      }

      // wid.updateIframeUI = function(formStatus) {
      //   let self = this
      //   this.iframeHeight = 'auto'
      //   this.iframeHeight = wid.document.body.scrollHeight * 1.05;
      //   this.formStatus = formStatus;
      //   // 更新工具栏
      //   // this.bus.$emit('initAssessmentTool', {
      //   //   // tool: {
      //   //   //   canEdit: wid.document.querySelector("input[name*='canEdit']")[0].value == 'true' ? true: false,
      //   //   //   status:  wid.document.querySelector("input[name*='status']")[0].value
      //   //   // },
      //   //   tool: {
      //   //     formCode: this.info.formCode,
      //   //     canEdit: this.info.canEdit,
      //   //     status: formStatus,
      //   //   },
      //   //   creator: this.info.creator,
      //   //   listPrint: this.formInfo.listPrint,
      //   // })
      //   this.pageLoading = false
      //   if (formStatus === '0') {
      //     this.$notify({
      //       title: "提示",
      //       message: "责任护士未签名",
      //       type: "warning"
      //     });
      //   }
      // }

      this.info["canEdit"] = jQuery(
        "input[name*='canEdit']",
        wid.document
      ).val();
      this.info["formCode"] = jQuery(
        "input[name*='formCode']",
        wid.document
      ).val();
      // 获取表 标题
      this.info["formTitle"] = jQuery(".title", wid.document).html();
      if (this.info["formTitle"] === undefined) {
        // this.info['formTitle'] = jQuery(".subtitle", wid.document).html();
        // if (this.info['formTitle'] === undefined) {
        this.info["formTitle"] = "";
        // }
      }

      this.signTitle = "签名确认 " + this.info["formTitle"];

      console.log("assessment_onload", wid, this.info);

      jQuery(`input[name='id']:hidden`, wid.document).val(this.info.id);

      window.app.$route.query["info"] = this.info;
      window.app.$route.query["assessmetIframe"] = this.$refs.iframe;
      window.app.$route.query[
        "assessmetIframeLoading"
      ] = this.$refs.iframeLoading;
      //iframeLoading

      // 旧表单
      initList(wid);
      window.wid = wid;
      this.wid = wid;

      try {
        window.wid.document.querySelector(
          ".hospital"
        ).innerText = this.hospitalNameSpace;
      } catch (error) {
        //
      }

      if (this.wid) {
        this.cleanAllMark();
      }

      // if(!wid.$){return;}
      // 获取表单信息
      this.formInfo = {
        listPrint: this.info.listPrint,
        curve: this.info.showCurve
      };
      console.log("获取表单信息", this.formInfo, this.$refs.iframeLoading);
      this.bus.$emit("showCurve", this.formInfo.curve);

      if (this.info.formCode && this.info.formCode.indexOf("first") > -1) {
        // this.info.id = null

        return;
      }

      try {
        //   // && !this.info.formCode==='eduMission'
        // console.log(this.info.formCode,"this.info.formCode")
        // 获取表单数据源信息
        evalDetail(this.info.id).then(
          res => {
            this.info.creator = res.data.data.creator;
            console.log("!!!!!onload_formField:evalDetail", res, this.info);
            // eventInit(res.data.data, wid);

            // 本地开发模式未生成相关表单，localhost模式下找不到页面开发地址
            if (!this.info.formCode) {
              //
              this.$notify({
                title: "提示",
                message: "页面找不到地址",
                type: "warning"
              });
              let waitTime = 5;
              this.pageLoadingText = "网络异常,页面找不到地址,请尝试刷新页面";
              this.pageLoadingText += this.isDev
                ? ":   " + decodeURIComponent(this.url)
                : "";
              this.pageLoading = true;
              // this.pageLoadingText += this.isDev?':   -  '+decodeURIComponent(this.urlForm):''
              // this.urlForm
              // let self = this
              // if(wtpageid){window.clearInterval(wtpageid);}
              // let wtpageid = window.setInterval(function(){
              //   if(waitTime<1){
              //     this.pageLoadingText = "正在载入页面";
              //     window.clearInterval(wtpageid);
              //     window.setTimeout(function(){
              //       this.openUrl(this.url)
              //     },2000);
              //   }else{
              //     try {
              //       this.pageLoadingText = this.wid.loadTimeData.data_.errorCode+":页面无法获取，请尝试刷新("+(waitTime--)+"秒)"
              //     } catch (error) {
              //       window.clearInterval(wtpageid);
              //     }
              //   }
              // }, 1000);
              return;
            }

            if (
              this.info.formCode &&
              this.info.formCode.indexOf("first") === -1
            ) {
              formFill.fill(res.data.data, wid);
            }

            this.formStatus = res.data.data.status;
            window.app.$route.query["formStatus"] = this.formStatus;
            //
            this.pageLoading = false;
            //
            if (res.data.data.status === "0") {
              this.$notify({
                title: "提示",
                message: "责任护士未签名",
                type: "warning"
              });
            }

            // 更新工具栏
            this.bus.$emit("initAssessmentTool", {
              tool: {
                formCode: this.info.formCode,
                canEdit: this.info.canEdit,
                status: res.data.data.status
              },
              creator: this.info.creator,
              listPrint: this.formInfo.listPrint
            });

            // this.showSignSave
            if (this.showSignSave) {
              window.closeOKForm();
              this.bus.$emit("assessmentSignSave");
            }

            this.iframeHeight = "auto";
            this.iframeHeight = wid.document.body.scrollHeight * 1.05;
          },
          error => {
            console.log("获取表单信息,错误", error);
          }
        );
      } catch (error) {
        this.pageLoading = false;
        console.log("获取表单信息,错误", error);
      }

      // window.app.currentForm.formCode = this.info.formCode

      // this.iframeHeight = 'auto'
      // this.iframeHeight = wid.document.body.scrollHeight * 1.05;
    },
    cleanAllMark(str = "") {
      try {
        let qStr = str;
        if (!this.wid.formatData || !this.wid.formatData.dataShop) {
          return;
        }
        let keys = this.wid.formatData.dataShop.getModel();
        Object.keys(keys).map(k => {
          qStr = str ? str : '[name="' + k + '"]';
          jQuery(qStr, this.wid.document).off();
          let inputs = this.wid.document.querySelectorAll(qStr);
          [...inputs].map(el => {
            // this.handleMarklist
            el.style.background = "";
            // el.removeEventListener("mouseover", this.markTip,true);
            // el.removeEventListener("mouseout", this.closeMarkTip,true);
          });
        });
      } catch (err) {
        console.warn(err);
      }
    },
    onloadMarkList(callback = null) {
      // console.log("onloadMarkList", this.marklist);
      if (this.wid) {
        console.log(
          "onloadMarkList",
          [callback],
          this.marklist,
          this.handleMarklist,
          this.wid
        );
        // this.wid.document.querySelector()
        // blockId: 14166  fieldEn: "bloodOxygenValue" recordId: 25696
        // data-id="25696" data-blockid="14166" name=""
        // initial input elements

        this.cleanAllMark();

        let markList = [...this.handleMarklist, ...this.marklist];

        markList.map(m => {
          if (m.recordId) {
            let qstr = `[name='${m.fieldEn}'][data-id='${m.recordId}']`;
            // let qstr = `[data-id='${m.recordId}'][data-blockid='${m.blockid}'][name='${m.fieldEn}']`;
            // jQuery(qstr, this.wid.document).off()
            let input = this.wid.document.querySelector(qstr);
            // let bgColor = m.status==0?"#e3c1ff":'#ede7bd'
            if (input) {
              console.log("----input", input, m);
              input.style.background = m.status == 0 ? "#e3c1ff" : "#ede7bd";
              // input.style.outline = "2px solid #e3c1ff"
              let widMouseover = input.addEventListener(
                "mouseover",
                event => {
                  if (!event) {
                    return;
                  }
                  event.stopPropagation();
                  let id = event.target.getAttribute("data-id");
                  let name = event.target.getAttribute("name");
                  let mid = [...this.handleMarklist, ...this.marklist].find(
                    r => {
                      return r.recordId == id && r.fieldEn == name;
                    }
                  );
                  console.log("----mid", mid, id, markList, [
                    ...this.handleMarklist
                  ]);
                  if (
                    (id && mid && mid.recordId) ||
                    (id && mid && m.status == 1)
                  ) {
                    input.style.background =
                      m.status == 0 ? "#e3c1ff" : "#ede7bd";
                    this.markTip(event, m);
                  } else {
                    input.style.background = "";
                  }
                  this.$forceUpdate();
                },
                true
              );
              let widMouseout = input.addEventListener(
                "mouseout",
                this.closeMarkTip,
                true
              );
              input["$listeners"] = [widMouseover, widMouseout];
            }
          }
        });
        // if (this.wid.updateListTabelUI) {
        //   this.wid.updateListTabelUI();
        // }
        if (callback) {
          callback();
        }
      }
    },
    getMarkList(callback = null) {
      //
      // this.handleMarklist = [];
      this.marklist = [];
      if (this.info.id) {
        markListById(this.info.id).then(res => {
          // console.log("批注：", res);
          if (res) {
            let {
              data: {
                data: { list: list }
              }
            } = res;
            this.marklist = JSON.parse(JSON.stringify(list));
            console.log("批注：", this.marklist);
            if (callback) {
              callback();
            }
          }
        });
      }
      //
    },
    print() {
      let curForm = {};
      let unsignForm = [];
      let allSigned = true;
      let treeData = this.bus.$emit("getTreeRaw", res => {
        console.log("getTreeRaw", res);
        // pageUrl
        if (res) {
          curForm = res.find(f => {
            return f.pageUrl == this.info.pageUrl;
          });
          //children
          if (curForm && curForm.children) {
            unsignForm = curForm.children.filter(f => {
              return f.status == 0;
            });
            if (unsignForm && unsignForm.length) {
              allSigned = false;
            }
          }
        }
      });
      console.log(allSigned, curForm, treeData, this.info, "info");
      // curForm.label
      if (
        !allSigned &&
        this.info.title &&
        (this.info.title.includes("入院评估表")||this.info.title.includes("首次护理记录单"))
      ) {
        this.$message.warning(`不允许打印,请查看提示详情.`);
        this.$notify({
          title: "提示",
          message: `打印前请检查所有 ${curForm.label ||
            ""} 都已签名, 仍有 ${unsignForm.length || 0} 张未签名.`,
          type: "warning"
        });
        return;
      }

      try {
        if (this.info.nooForm == "1") {
          if (this.info.title == "生长发育评估量表") {
            if (!this.info.id) {
              return this.$message.warning("打印前请先保存");
            } else {
              /* ${qs.stringify(Object.assign({}, this.info, this.$route.query))} 会导致重复调用引起对象循环引用 后边有问题再研究 */
              return window.open(
                  `/crNursing/print/growth?${qs.stringify(this.$route.query)}`
              );
            }
          }
          // 打印模式isPrint
          localStorage["assessment_printUrl"] = this.url + "&isPrint=true";
          let print_wid = window.open(`/crNursing/print/assessmentv1`);
          return;
        }
      } catch (error) {
        console.log(error);
      }

      let token = window.app.$getCookie("NURSING_USER").split("##")[1];
      let query = this.$route.query;
      let listPrint = this.formInfo.listPrint || false;

      try {
        // 初始化清除 localStorage 表单缓存
        localStorage["assessment_printUrl"] = "";
        localStorage["assessment_query"] = "";
        localStorage["assessment_printPage"] = "";
        localStorage["assessment_pageData"] = "";

        // remove
        localStorage.remove("assessment_printUrl");
        localStorage.remove("assessment_query");
        localStorage.remove("assessment_printPage");
        localStorage.remove("assessment_pageData");
      } catch (e) {
        //
      }

      // 入院表
      // if (this.info['formCode'].indexOf('first') > -1) {
      //   listPrint = false;
      // }
      // window.app.$route.query = query;
      query["listPrint"] = listPrint;
      query["assessmetIframe"] = null;
      query["assessmetIframeLoading"] = null;
      query["info"] = null;
      let print_url = this.url.replace(".html", "-打印.html");
      localStorage["assessment_printUrl"] = print_url;
      // localStorage['assessment_printUrl'] = listPrint?'about:blank':print_url
      localStorage["assessment_query"] = JSON.stringify(query);

      console.log("表单-query", query, this.formInfo, listPrint, print_url);

      // 页面模版 接口参数
      let printPageArgs = {
        formCode: this.info["formCode"],
        patientId: query.patientId,
        visitId: query.visitId,
        name: query.name,
        sex: query.sex,
        age: query.age,
        deptCode: query.deptCode,
        deptName: query.deptName,
        bedLabel: query.bedLabel,
        inpNo: query.inpNo,
        wardCode: query.wardCode
      };

      // 页面数据 接口参数
      let pageDataArgs = {
        id: this.info.id,
        formCode: this.info["formCode"],
        patientId: query.patientId,
        visitId: query.visitId,
        listPrint: listPrint
      };

      localStorage["assessment_printPageArgs"] = JSON.stringify(printPageArgs);
      localStorage["assessment_pageDataArgs"] = JSON.stringify(pageDataArgs);

      console.log("printPageArgs", printPageArgs, "pageDataArgs", pageDataArgs);

      // 打开打印页面
      let print_wid = window.open(`/crNursing/print/assessment`);
    },
    printMore() {
      let token = window.app.$getCookie("NURSING_USER").split("##")[1];
      let query = this.$route.query;
      let print_url = `${host}/crNursing/api/form/print/${this.info.formCode}/${query.patientId}/${query.visitId}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`;
      localStorage["assessment_printUrl"] = print_url;
      let print_wid = window.open(`/crNursing/print/assessment`);
    },
    add() {
      if (this.info.nooForm == "1") {
        window.openFormBox(this.url.replace("id=", "noid="));
        return;
      }
      let token = window.app.$getCookie("NURSING_USER").split("##")[1];
      let query = this.$route.query;

      let queryObj = {
        id: this.info.id || "",
        formCode: this.info.formCode,
        patientId: query.patientId,
        visitId: query.visitId,
        name: query.name,
        sex: query.sex,
        age: query.age,
        deptCode: query.deptCode,
        deptName: query.deptName,
        diagnosis: query.diagnosis,
        bedLabel: query.bedLabel,
        inpNo: query.inpNo,
        wardCode: query.wardCode,
        wardName: query.wardName,
        admissionDate: query.admissionDate,
        // token: this.token,
        todo: this.info.todo
        // title:this.info.title || ''
      };
      let url = "";
      if (this.isDev) {
        url = `${devFormUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`;
        this.urlForm = `${formUrl}/${this.info.pageUrl}?${qs.stringify(
          queryObj
        )}`;
      } else {
        url = `${formUrl}/${this.info.pageUrl}?${qs.stringify(queryObj)}`;
      }

      // console.log('assessment',url)

      window.openFormBox(url);

      // let url =
      //   `${host}/crNursing/api/form/input/${this.info.formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
      // window.openFormBox(url)
    },
    // 签名
    signSave() {
      try {
        let wid = this.$refs.iframe.contentWindow;
        if (this.info.nooForm == "1") {
          window.openSignModal((password, empNo) => {
            wid.signForm(empNo, password).then(res => {
              this.$message.success("签名成功");
              this.refresh();
              this.bus.$emit("refreshTree");
            });
          });
          return;
        }
      } catch (e) {}
      this.info["status"] = "1";
      jQuery("[name$='status']", this.wid.document).val("1");
      this.saveForm();
    },
    // 审核
    shenheSign() {
      try {
        let wid = this.$refs.iframe.contentWindow;
        if (this.info.nooForm == "1") {
          window.openSignModal((password, empNo) => {
            wid.auditForm(empNo, password).then(res => {
              this.$message.success("审核成功");
              this.refresh();
              this.bus.$emit("refreshTree");
            });
          });
          return;
        }
      } catch (e) {}
      window.sign = "shenheSign";
      this.info["status"] = "2";
      jQuery("[name$='status']", this.wid.document).val("2");
      this.saveForm();
    },
    saveForm() {
      let wid = this.$refs.iframe.contentWindow;
      console.log("saveForm", wid);
      window.w = wid;
      if (wid.validateForm) {
        let obj = wid.validateForm();
        if (obj.ok) {
          // 开启签名
          this.$refs.signModal.open(this.saveFormbyPw);
        } else {
          this.$notify({
            title: "警告",
            message: obj.msg,
            type: "warning"
          });
        }
      } else {
        // 未签名
        if (
          (jQuery("input[name$='eval_score']", wid.document).length &&
            jQuery("input[name$='eval_score']", wid.document).val()) ||
          jQuery("input[name$='eval_score']", wid.document).length == 0
        ) {
          //
          this.$refs.signModal.open(this.saveFormbyPw);
        } else {
          this.$notify({
            title: "警告",
            message: "评估表分数不能为空",
            type: "warning"
          });
        }
      }
    },
    saveFormbyPw(password, username) {
      if (!password) {
        return this.$notify({
          title: "警告",
          message: "密码不能为空",
          type: "warning"
        });
      }
      let wid = this.$refs.iframe.contentWindow;
      let list = this.$store.state.form.measure;
      let select = this.$store.state.form.select;

      console.log("Assessment_saveFormbyPw", list, select);
      var formCode = jQuery(`input[name='formCode']`, wid.document).val();

      let result = [];
      for (let item of list) {
        if (this.$_.indexOf(select, item.code) > -1) {
          result.push(item);
        }
      }
      let all = [];
      for (let item of result) {
        let allItem = "";
        let code = `${item.code}`;
        let measure = [];
        for (let option of item.measure) {
          measure.push(option);
        }
        let factor = `${item.factor}`;
        allItem = `${code}/${measure.join("_")}/${factor}`;
        all.push(allItem);
      }
      let postData = {}; // `&diags=${all.join(",")}&empNo=${username}`;
      postData["diags"] = all.join(",");
      postData["empNo"] = username;

      console.log("this.info", this.info);
      if (password && (this.info.status == 0 || this.info.status == 1)) {
        postData["id"] = this.info.id;
        postData["createSign"] = password;
        // 无审核人的表单，自动附带审核人签名密码
        if (
          formCode.indexOf("form_fall") > -1 ||
          formCode.indexOf("form_dvt_pte") > -1 ||
          formCode.indexOf("form_pressure") > -1 ||
          formCode.indexOf("form_selfcare") > -1 ||
          formCode.indexOf("form_pain_assessment") > -1
          // formCode.indexOf('form_swallowing') > -1 ||
        ) {
          postData["auditSign"] = password;
        }
      } else if (this.info.status == 2) {
        postData["id"] = this.info.id;
        postData["auditSign"] = password;
      }

      postData["status"] = this.info.status;

      // var selectString = `input[name*='${formCode}']`;
      var selectString = `input[name*='${formCode}']:checked,[name*='${formCode}'][type="text"],input[type*='date'],input[type*='time']`;
      var splitMark = ",";
      console.log("FormBoxwid.document", formCode, wid, wid.document);
      console.log(
        "-jQuery_formCode)",
        jQuery(`input[name*='formCode']`, wid.document)
      );

      // alert("formCode:"+formCode);

      // // 侧边栏 护理措施 和 入院情况 字段数据获取
      try {
        let tabs = this.formListData.tabs;
        // let formCode = formCode; //this.formListData.smartForm.formCode;
        tabs.forEach((tab, index) => {
          tab.items.forEach((item, index) => {
            console.log("----getDataToPost", formCode, item.result, item);
            if (item.group != undefined && item.name.indexOf(formCode) > -1) {
              if (item.result.length > 0) {
                postData[item.name] = item.result;
                return;
              }
            }
            if (item.child != undefined) {
              item.child.forEach((kid, index) => {
                if (kid.name.indexOf(formCode) > -1) {
                  if (kid.type === "datetime") {
                    console.log(
                      "----datetime",
                      formCode,
                      kid.name,
                      typeof kid.result,
                      moment(kid.result),
                      kid
                    );
                    postData[kid.name] = moment(kid.result).format(
                      "YYYY/MM/DD HH:mm"
                    );
                    return;
                  }
                  postData[kid.name] = kid.result;
                }
              });
            }
          });
        });
        console.log("++++++++getDataToPost", postData);
      } catch (e) {
        //
        console.log("++++Error++++getDataToPost", postData);
      }

      if (this.url.indexOf("editMode") > -1) {
        var formId = this.$store.state.form.formFilledData.id;
        postData["id"] = formId;
        console.log("----id", formId, "url", this.url, postData);
      }

      // $(`input[id*='CR']`,wid.document)
      // window.widTest.document
      // $(`input[name*='formCode']`,wid.document)
      // window.widTest.document.querySelectorAll(`input[id*='CR']`)

      $(selectString, wid.document).each(function() {
        // var item = {[this.name]:this.value};
        // console.log(this.name);
        if (
          this.id.indexOf("CRS") > -1 ||
          this.name.indexOf("eval_auth") > -1 ||
          this.name.indexOf("creator") > -1 ||
          this.name.indexOf("signDate") > -1 ||
          this.name.indexOf("auditor") > -1 ||
          this.name.indexOf("auditDate") > -1
        ) {
          return;
        }
        if (this.type === "text") {
          // console.log("text:", this.name, ",", this.value);
          postData[this.name] = this.value;
        }
        if (
          this.type === "radio" ||
          this.type === "date" ||
          this.type === "time" ||
          this.type === "number"
        ) {
          // console.log(this.type, this.name, ",", this.value);
          postData[this.name] = this.value;
        }
        if (this.type === "checkbox") {
          // console.log("checkbox:", this.name, ",", this.value);
          if (!postData[this.name]) {
            postData[this.name] = "";
          }
          postData[this.name] += this.value + splitMark;
        }
      });

      try {
        // if (postData[formCode + '_eval_date'] === undefined || postData[formCode + '_eval_date'] === "") {
        let evalData =
          postData[formCode + "_record_date"] +
          " " +
          postData[formCode + "_record_time"];
        postData[formCode + "_eval_date"] = moment(evalData).format(
          "YYYY-MM-DD HH:mm"
        );
        if (postData[formCode + "_eval_date"] === "Invalid date") {
          postData[formCode + "_eval_date"] = moment().format(
            "YYYY-MM-DD HH:mm"
          );
        }
        // _record_date _record_time
        // }
      } catch (e) {
        console.log(e);
      }

      if (formCode.indexOf("form_swallowing") > -1) {
        console.log("=====window.sign", window.sign);
        if (this.info.status < 2) {
          postData["createSign"] = password;
          postData["auditSign"] = password;
          postData["form_swallowing_swallow_water_signature"] = username;
        } else if (this.info.status == 2) {
          postData["auditSign"] = password;
          postData["form_swallowing_swallow_paste_signature"] = username;
        }
      }
      // window.sign = "signSave"
      // window.sign = "shenheSign"

      console.log("FormBoxpostData", postData);

      this.refresh();
      wid.formApp.postForm(password, postData);
    },
    refresh(url = null) {
      try {
        console.log("~~~refresh", { url, old: this.url });
        // this.url
        this.$refs.iframe.contentWindow.location.reload();
        // this.wid.location.reload();
        // console.log("innerHTML",this.$refs.iframe.contentWindow.document.innerHTML);
      } catch (e) {
        console.error(e);
      }
    },
    openScoreChart() {
      let query = this.$route.query;
      let scoreUrl = `${host}/crNursing/api/form/curve/${this.info.formCode}/${query.patientId}/${query.visitId}`;
      this.$refs.scoreChart.open(scoreUrl);
    },
    openEditAssessment() {
      let wid = this.$refs.iframe.contentWindow;
      // if ((this.formStatus === "2" || this.info.status == '2') && JSON.parse(localStorage.user).title !== '护士长') {

      if (window.app.$route.query.formStatus) {
        this.formStatus = window.app.$route.query.formStatus;
      }
      console.log(
        "=======formStatus",
        this.formStatus,
        this.info.status,
        JSON.parse(localStorage.user),
        JSON.parse(localStorage.user).title
      );

      if (this.formStatus === "2" || this.info.status === "2") {
        // this.$refs.signModal.open(this.saveFormbyPw);
        // window.sign = "shenheSign"
        try {
          this.info["status"] = "2";
          jQuery("[name$='status']", this.wid.document).val("2");
        } catch (e) {}

        let NurseTitle = JSON.parse(localStorage.user).title;
        if (NurseTitle && NurseTitle === "护士长") {
          window.openFormBox(this.url + "&editMode=true");
          return;
        }
        // this.saveForm()
        // let result = this.$refs.signModal.open(this.saveFormbyPw);
        // console.log('openEditAssessment-result', result)
        // checkUser
        this.$refs.signModal.open((password, empNo) => {
          console.log("openEditAssessment:", this.$refs, password, empNo);
          checkUser(empNo, password).then(res => {
            console.log("-----checkUser:", res);
            if (
              res &&
              res.data &&
              (res.data.data.title === "护士长" ||
                res.data.data.post === "护长")
            ) {
              window.openFormBox(this.url + "&editMode=true");
            } else {
              this.$message({
                message: "您无修改权限，请联系护士长",
                center: true
              });
            }
          });

          // this.$nextTick(() => {
          //   // window.openFormBox(this.url + '&editMode=true')
          // });
        });
      } else {
        window.openFormBox(this.url + "&editMode=true");
      }
    },
    reOpenFormInsideAssessment(formName) {
      formName = formName.replace("启用", "");
      this.$confirm(
        "是否要清空已填写的 " + formName + " 记录并重新填写",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(res => {
        //
        console.log(res);
      });
    },
    delAssessment() {
      this.$confirm("此操作将永久删除该评估表", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$refs.signModal.open((password, empNo) => {
          try {
            if (this.info.nooForm == "1") {
              let wid = this.$refs.iframe.contentWindow;
              wid.delForm(empNo, password).then(res => {
                this.$message.success("删除成功");
                this.bus.$emit("refreshTree");
                this.bus.$emit("closeAssessment");
              });
              return;
            }
          } catch (e) {}
          evalDel(this.info.id, password, empNo).then(res => {
            this.bus.$emit("refreshTree");
            this.bus.$emit("closeAssessment");
          });
        });
      });
    },
    delRecord(item = {}, rowData = {}) {
      if (item.id) {
        window.openSignModal(
          (password, empNo) => {
            let data = Object.assign(
              {},
              {
                id: item.blockId,
                password,
                empNo,
                list: [{ id: item.id }]
              }
            );
            del(item.formApiCode, data, item.formType).then(res => {
              window.messageBox.show("删除记录成功", "success", 5000);
              // console.log(res,rowData)
              for (const key in rowData) {
                if (rowData.hasOwnProperty(key)) {
                  rowData[key] = "";
                }
              }
              //
              window.app.bus.$emit("refreshTree");
            });
          },
          `删除记录验证-${this.wid.formInfo.title}`,
          false,
          `请确认是否要删除这一条于${rowData.recordDate || ""}的记录?`
        );
      } else {
        for (const key in rowData) {
          if (rowData.hasOwnProperty(key)) {
            rowData[key] = "";
          }
        }
      }
    },
    // this.bus.$emit('setLoadingStatus')
    setLoadingStatus(bool) {
      this.pageLoading = bool;
    },
    onContextMenu(event) {
      console.log("onContextMenu", event);
      if (this.eventTarget) {
        this.eventTarget.style.outline = "";
        // this.eventTarget.style.background = "";
      }
      this.wid = this.$refs.iframe.contentWindow;
      // formApiCode
      // if (
      //   this.wid &&
      //   this.wid.formInfo &&
      //   !this.wid.formInfo.hasOwnProperty("formApiCode")
      // ) {
      //   return;
      // }
      //
      this.eventTarget = event.target;
      this.eventTarget.style.outline = "1px dashed green";
      // this.eventTarget.style.background = "#f9f73f";
      // $(event.target)
      //   .parents("tr")
      //   .addClass("selectedRow");

      //
      // let query = this.$route.query;

      //
      let recordObj = {
        formType: this.wid.formInfo.formType,
        formCode: this.wid.formInfo.formCode,
        formApiCode: this.wid.formInfo.formApiCode,
        id: event.target.getAttribute("data-id") || "",
        blockId:
          event.target.getAttribute("data-blockId") ||
          this.wid.formInfo.id + "" ||
          "",
        index: event.target.getAttribute("data-index") || "",
        pageIndex: event.target.getAttribute("data-pageIndex") || "",
        name: event.target.getAttribute("name") || ""
      };
      let mkid = [...this.marklist].find(r => {
        return (
          recordObj.id &&
          r.recordId == recordObj.id &&
          r.fieldEn == recordObj.name
        );
      });
      // Object.keys(recordObj).forEach(k => {
      //   if (!recordObj[k]) {
      //     return;
      //   }
      // });
      let pageIndex = event.target.getAttribute("data-pageIndex") || -1; // 第几页
      let recordIndex = event.target.getAttribute("data-index") || -1; // 第几行
      let rowData = {}; // 整页数据
      try {
        rowData = this.wid.formatData.recordsPages[pageIndex][recordIndex];
      } catch (e) {
        console.log(e);
      }
      let pageItems = [];
      // formatData.recordsPages
      if (
        this.wid &&
        this.wid.formatData &&
        this.wid.formatData.hasOwnProperty("recordsPages")
      ) {
        this.wid.formatData.recordsPages.map((page, index) => {
          let p = [...page].filter((r, i) => {
            if (
              recordObj.id &&
              r.id == recordObj.id &&
              r.parentId == recordObj.blockId
            ) {
              recordIndex = i;
              return r;
            }
          });
          if (p && p.length > 0) {
            pageItems = page;
            pageIndex = index;
            rowData = p[0];
          } else if (index == pageIndex && recordIndex != -1) {
            pageItems = page;
            pageIndex = index;
            // recordIndex = recordObj.index;
            rowData = page[recordIndex];
            rowData.parentId = recordObj.blockId;
          }
        });
      }
      // recordslist
      // if (this.wid && this.wid.formatData.hasOwnProperty("recordslist")) {
      //   this.wid.formatData.recordslist.map((r, index) => {
      //     if (r.id == recordObj.id && r.parentId == recordObj.blockId) {
      //       recordIndex = index;
      //       rowData = r;
      //       return r;
      //     }
      //   });
      //   pageItems = this.wid.formatData.recordslist;
      // }

      console.log(
        "recordObj",
        recordObj,
        // this.wid.formatData.recordsPages,
        this.marklist,
        this.handleMarklist,
        rowData,
        "第",
        pageIndex,
        "页，第",
        recordIndex,
        "行"
      );
      //
      let xyiframe = this.$refs.iframe.getBoundingClientRect();
      let xy = event.target.getBoundingClientRect();
      let y = xyiframe.top + xy.top + event.offsetY - 20;
      let x = xyiframe.left + xy.left + event.offsetX + 10;
      x = Math.min(x, window.innerWidth - 200);
      let style = {
        top: `${y}px`,
        left: `${x}px`
      };

      // let isTableForm = true;
      // recordObj.formApiCode

      let data = [
        {
          name: "向上插入新行",
          icon: "charuxinhang",
          disable: !recordObj.formApiCode,
          click: () => {
            let newItem = JSON.parse(JSON.stringify(rowData));
            Object.keys(newItem).forEach(k => {
              if (k != "parentId") {
                newItem[k] = "";
              }
            });
            // data-index
            let qstr = `[data-index='${recordIndex}']`;
            pageItems.splice(~~recordIndex, 0, newItem);
            console.log("向上插入新行", recordIndex, newItem, pageItems);
            //
            if (this.wid.updateListTabelUI) {
              this.wid.updateListTabelUI();
              this.cleanAllMark(qstr);
              // this.onloadMarkList();
            }
            //
            setTimeout(() => {
              this.onPageLoaded();
            }, 100);
          }
        },
        {
          name: "向下插入新行",
          icon: "xiangxiacharuyihang",
          disable: !recordObj.formApiCode,
          click: () => {
            let newItem = JSON.parse(JSON.stringify(rowData));
            Object.keys(newItem).forEach(k => {
              if (k != "parentId") {
                newItem[k] = "";
              }
            });
            // data-index
            let qstr = `[data-index='${recordIndex}']`;
            pageItems.splice(~~recordIndex + 1, 0, newItem);
            console.log("向下插入新行", recordIndex, newItem, pageItems);
            //
            if (this.wid.updateListTabelUI) {
              this.wid.updateListTabelUI();
              this.cleanAllMark(qstr);
            }
            //
            setTimeout(() => {
              this.onPageLoaded();
            }, 100);
          }
        },
        {
          name: "复制",
          icon: "shanchuzhenghang",
          // disable: this.clipboardData,
          click: () => {
            // this.delRecord(recordObj, rowData);
            console.log("复制区域", event, rowData);
            try {
              // event.target.clipboardData.setData(
              //   "text/plain",
              //   event.target.value
              // );
              this.clipboardData =
                event.target.value || event.target.textContent || "";
              window.localStorage["clipboardData"] = this.clipboardData;
              window.localStorage["clipboardDataObj"] = JSON.stringify(rowData);
            } catch (error) {
              console.log("复制:error", error);
            }
            console.log(
              "复制区域",
              this.clipboardData,
              event,
              rowData,
              window.localStorage["clipboardDataObj"]
            );
            // event.view.print();
            // this.printIframe(event.target.innerHTML);
          }
        },
        {
          name: this.clipboardData ? `粘贴 (${this.clipboardData})` : "粘贴",
          icon: "shanchuzhenghang",
          disable: !this.clipboardData,
          click: () => {
            // this.delRecord(recordObj, rowData);
            console.log("粘贴区域", this.clipboardData, event, rowData);
            try {
              // event.target.value =
              //   event.target.clipboardData.getData("text") + "";
              event.target.value = this.clipboardData;
              // tagName: "SPAN"
              // textContent
              if (
                window.localStorage["clipboardDataObj"] &&
                this.wid.formatData &&
                this.wid.formatData.recordsPages
              ) {
                //   rowData = JSON.parse(window.localStorage["clipboardDataObj"]);
                // }
                // this.wid.formatData.recordsPages[pageIndex][recordIndex]
                // if (this.wid.formatData.recordsPages[pageIndex][recordIndex]) {
                let clipObj =
                  JSON.parse(window.localStorage["clipboardDataObj"]) || {};

                console.log("clipObj:", clipObj, rowData);

                try {
                  [
                    "dataHash",
                    "id",
                    "signerName",
                    "signerNo",
                    "timeStr",
                    "dateStr",
                    "recordDate",
                    "recordHourMinute",
                    "recordMonthDay"
                  ].map(kname => {
                    if (
                      clipObj &&
                      Object.keys(clipObj).length > 0 &&
                      clipObj.hasOwnProperty(kname) > -1 &&
                      clipObj[kname]
                    ) {
                      delete clipObj[kname];
                    }
                  });
                } catch (error) {}
                console.log("clipObj::", clipObj, rowData);

                rowData = {
                  ...rowData,
                  ...clipObj
                };
                this.wid.formatData.recordsPages[pageIndex][
                  recordIndex
                ] = JSON.parse(JSON.stringify(rowData));
              }
              if (this.wid.updateListTabelUI) {
                this.wid.updateListTabelUI();
              }
              if (event.target.tagName == "SPAN") {
                event.target.textContent =
                  window.localStorage["clipboardData"] || this.clipboardData;
              }
              // this.clipboardData = "";
              // window.localStorage["clipboardDataObj"] = "";
              // window.localStorage["clipboardData"] = "";
            } catch (error) {
              console.log("粘贴:error", error);
            }
            console.log(
              "粘贴区域:clipboard",
              this.clipboardData,
              rowData,
              pageIndex,
              recordIndex,
              window.localStorage,
              JSON.parse(window.localStorage["clipboardDataObj"])
            );
            // event.view.print();
            // this.printIframe(event.target.innerHTML);
          }
        },
        {
          name: "删除整行",
          icon: "shanchuzhenghang",
          disable: !recordObj.formApiCode,
          click: () => {
            this.delRecord(recordObj, rowData);
            console.log("删除整行", rowData);
          }
        },
        {
          name: "添加格批注",
          icon: "pizhu",
          disable: !recordObj.id || mkid,
          click: () => {
            console.log("添加格批注", recordObj.id);
            if (recordObj.id) {
              this.bus.$emit(
                "openPizhuModalBox",
                { ...rowData, ...recordObj },
                recordObj.name,
                () => {
                  this.getMarkList(this.onloadMarkList);
                }
              );
            }
          }
        }
        // {
        //   name: "打印区域",
        //   icon: "shanchuzhenghang",
        //   // disable: !recordObj.formApiCode,
        //   click: () => {
        //     // this.delRecord(recordObj, rowData);
        //     console.log("打印区域", event, rowData);
        //     event.view.print();
        //     // this.printIframe(event.target.innerHTML);
        //   }
        // }
        // {
        //   name: "添加行批注",
        //   icon: "pizhu",
        //   disable: !recordObj.id,
        //   // disable: !recordObj.id || mkid,
        //   click: () => {
        //     console.log("添加行批注", recordObj.id);
        //     if (recordObj.id) {
        //       this.bus.$emit(
        //         "openPizhuModalBox",
        //         { ...rowData, ...recordObj },
        //         "all",
        //         () => {
        //           this.getMarkList(this.onloadMarkList);
        //         }
        //       );
        //     }
        //   }
        // }
      ];
      event.preventDefault();
      window.openContextMenu({ style, data });
    },
    onClick(event) {
      console.log("onClick", event, {
        clientY: event.clientY,
        clientX: event.clientX,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
      });
      if (this.eventTarget) {
        this.eventTarget.style.outline = "";
        // this.eventTarget.style.background = "";
      }
      window.closeContextMenu();
    },
    printIframe(html) {
      //判断iframe是否存在，不存在则创建iframe
      var iframe = document.getElementById("print-iframe");
      if (!iframe) {
        // var el = document.getElementById("printcontent");
        iframe = document.createElement("IFRAME");
        var doc = null;
        iframe.setAttribute("id", "print-iframe");
        iframe.setAttribute(
          "style",
          "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
        );
        document.body.appendChild(iframe);
        doc = iframe.contentWindow.document;
        //这里可以自定义样式
        //doc.write("<LINK rel="stylesheet" type="text/css" href="css/print.css">");
        doc.write("<div>" + html + "</div>");
        doc.close();
        iframe.contentWindow.focus();
      }
      iframe.contentWindow.print();
    },
    markTip(event, obj = {}) {
      console.log("fun:markTip", event);
      if (!event) {
        return;
      }
      let dom = event.target;
      let key = $(dom).attr("name");
      if (obj) {
        let xyiframe = this.$refs.iframe.getBoundingClientRect();
        let xy = event.target.getBoundingClientRect();
        let y = xyiframe.top + xy.top + event.offsetY - 10;
        let x = xyiframe.left + xy.left + event.offsetX + 10;
        x = Math.min(x, window.innerWidth - 300);
        console.log("xy", x, y, xy, xyiframe);
        window.openMarkTip({
          style: {
            left: x,
            top: y
          },
          data: obj,
          td: { markObj: obj, event: event, value: dom.value },
          fun: {
            handlepz,
            delpz,
            auditpz,
            callback: (td, operation = "", status = null) => {
              if (td && td.markObj) {
                console.log("--td--", operation, td);
                if (td.markObj.status == 1) {
                  let mobj = [...this.handleMarklist].find(r => {
                    return r.id && r.id == td.markObj.id;
                  });
                  if (!mobj) {
                    this.handleMarklist.push(td.markObj);
                  }
                }
                console.log(
                  "--this.handleMarklist--",
                  this.markListArr,
                  this.handleMarklist
                );
              }
              if (["delete", "audit"].indexOf(operation) > -1) {
                // td.markObj
                console.log("--delete--", td.markObj.status, this.markList);
                this.getMarkList();
                // this.getMarkList(this.onloadMarkList());
                //
                // if (operation == "delete") {
                try {
                  this.markList = [...this.markList].filter(r => {
                    return (
                      r.recordId != td.markObj.id &&
                      r.fieldEn != td.markObj.fieldEn
                    );
                  });
                } catch (err) {
                  console.log(err);
                }

                try {
                  // this.handleMarklist
                  this.handleMarklist = [...this.handleMarklist].filter(r => {
                    return (
                      r.recordId != td.markObj.id &&
                      r.fieldEn != td.markObj.fieldEn
                    );
                  });
                } catch (err) {
                  console.log(err);
                }
                //
                // }
              }
              // handleMarklist
              if (this.wid.updateListTabelUI) {
                this.wid.updateListTabelUI();
                this.cleanAllMark();
              }

              // this.getMarkList(()=>{
              //   // if (this.wid.updateListTabelUI) {
              //   //   this.wid.updateListTabelUI();
              //   //   this.cleanAllMark();
              //   // }
              //   this.onloadMarkList()
              //   setTimeout(() => {
              //     this.onPageLoaded();
              //   }, 100);
              // });
            }
          }
        });
      }
    },
    closeMarkTip() {
      console.log("closeMarkTip", event);
      window.closeMarkTip();
    }
  },
  computed: {
    markListArr() {
      return this.markList;
    }
  },
  watch: {
    url() {
      this.pageLoading = true;
      this.iframeHeight = "auto";
      this.iframeHeight = 100;
      // this.bus.$emit("closeAssessmentV2");
    }
  },
  components: {
    signModal,
    pizhuModal,
    scoreChart,
    messageModal,
    openFormModal
  }
};
</script>
