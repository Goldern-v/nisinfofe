<template>
  <div :style="{ height: '100%' }">
    <div
      class="contantV2"
      v-loading="pageLoading"
      :element-loading-text="pageLoadingText"
      ref="iframeLoadingV2"
      @click="onAnthenPerm"
    >
      <iframe
        :style="{ height: iframeHeight + 'px' }"
        frameborder="0"
        class="assessmentv2-iframe"
        v-if="url"
        :src="url"
        @load="onload"
        v-authen="authenPerm"
        ref="iframeV2"
      ></iframe>
    </div>
    <!-- 批注弹窗 -->
    <pizhuModal ref="pizhuModal"></pizhuModal>
    <!-- 签名弹窗 -->
    <signModal ref="signModal" :title="signTitle"></signModal>
    <!-- 体征同步 -->
    <tztbModal ref="tztbModal"></tztbModal>
    <scoreChart ref="scoreChart"></scoreChart>
    <!-- 消息提示弹窗 -->
    <message-modal ref="messageModal"></message-modal>
    <!-- 打开新建弹框 -->
    <openForm-modal ref="openFormModal"></openForm-modal>
    <!-- 执行单同步 -->
    <yztbModal ref="yztbModal"></yztbModal>

  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contantV2 {
  position: relative;
  background: transparent;
  margin: 0 auto;
  height: 100%;
  width: 100%;

  // border: 1px solid red;
  .assessmentv2-iframe {
    width: 100%;
    // min-height: 600px;
    overflow: hidden;
  }

  /deep/ .circular {
    // display: none!important;
    // visibility: hidden!important;
    &.hidden-loading {
      display: none !important;
      visibility: hidden !important;
    }
  }
}

/deep/ .hidden-loading {
  display: none !important;
  visibility: hidden !important;
}

/deep/ .el-loading-mask {
  // background: white !important;
  background-color: rgba(255, 255, 255, 0.98);
}

/deep/ .mask-loading-button {
  font-size: 13px;
  padding: 8px 20px;
  margin-top: 20px;
  color: #55b391;
  outline: 0;
  cursor: pointer;
  border: 1px solid #55b391;
  background: transparent;
}
</style>

<script>
import $ from "jquery";
import moment from "moment";
import BusFactory from "vue-happy-bus";
import { evalDel } from "@/api/record";
import { checkUser } from "@/api/login"; //检查用户名密码有效性
import { host } from "@/api/apiConfig";
import tztbModal from "@/Page/sheet-page/components/modal/tztb-modal";
import signModal from "@/components/modal/sign.vue";
import openFormModal from "@/Page/patientInfo/supPage/record/modal/open-form.vue";
import scoreChart from "../../../../modal/score-chart.vue";
import messageModal from "../../../../../../supComponts/message-modal/message-modal.vue";
import yztbModal from "@/Page/sheet-page/components/modal/yztb-modal";
import pizhuModal from "@/Page/patientInfo/supPage/record/component/right-part/components/comment/pizhu-modal.vue";
import { del } from "@/api/mutilRecord.js";
import {
  markListById,
  handlepz,
  delpz,
  auditpz,
} from "@/Page/patientInfo/supPage/record/component/right-part/components/comment/api/index.js";
import {
  formUrl,
  devFormUrl,
} from "@/common/pathConfig/index.js";
import common from "@/common/mixin/common.mixin.js";
import qs from "qs";

export default {
  name: "assessment_v2",
  mixins: [common],
  props: { tagsViewHeight: Number },
  data() {
    return {
      bus: BusFactory(this),
      url: "",
      urlForm: "",
      pageLoading: false,
      pageLoadingText: "数据加载中",
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
      onlyView: false,
      authenPerm: true,
    };
  },
  created() {
    this.pageLoading = true;
    this.bus.$on("closeAssessmentV2", () => {
      this.url = "";
    });
    this.bus.$on("savaParamsPerm",(data)=>{
      this.authenPerm = data
    })
    this.bus.$on("openAssessmentV2", this.openUrl);
    this.bus.$on("openNewFormBoxV2", this.openNewFormBox);
    this.bus.$on("openMessageBoxV2", this.openMessageBox);
    this.bus.$on("printAssessmentV2", this.print);
    this.bus.$on("printAssessmentSingleV2", this.printSingle);
    this.bus.$on("printAssessmentMoreV2", this.printMore);
    this.bus.$on("addAssessmentV2", this.add);
    this.bus.$on("assessmentSignSaveV2", this.signSave);
    this.bus.$on("assessmentShenheSignV2", this.shenheSign);
    this.bus.$on("assessmentRefreshV2", this.refresh);
    this.bus.$on("assessmentLoadedV2", this.onFormLoaded);
    this.bus.$on("assessmentOpenScoreChartV2", this.openScoreChart);
    this.bus.$on("editAssessmentV2", this.openEditAssessment);
    this.bus.$on(
      "reOpenFormInsideAssessmentV2",
      this.reOpenFormInsideAssessment
    );

    this.bus.$on("refreshSheetPageOne", (a)=>{
      this.handleMarklist.push(...a)
    });
    this.bus.$on("delAssessmentV2", this.delAssessment);
    this.bus.$on("setAssessmentLoadingStatusV2", this.setLoadingStatus);
    //
    this.bus.$on("openPizhuModalBox", (tr, td, callback = null) => {
      this.$refs.pizhuModal.open(tr, td, callback);
    });
  },
  mounted() {
    window.cleanAllMark = this.cleanAllMark;
    window.onFormLoaded = this.onFormLoaded;
    try {
      window.app.$refs.iframeLoadingBox.$methods().setLoadingStatus(false);
    } catch (error) {}
    //
    this.$refs["iframeLoadingV2"]["$methods"] = () => {
      return {
        busEmit: this.bus.$emit,
        refreshTree: () => {
          this.bus.$emit("refreshTree");
        },
        updateTree: () => {
          this.bus.$emit("updateTree");
        },
        openAssessment: this.openUrl,
        activeAllButons: () => {
          this.bus.$emit("activeAllButons");
        },
        disableAllButons: () => {
          this.bus.$emit("disableAllButons");
        },
        visibleButtons: (e) => {
          this.bus.$emit("visibleButtons", e);
        },
        activeButton: (e) => {
          this.bus.$emit("activeButton", e);
        },
        disableButton: (e) => {
          this.bus.$emit("disableButton", e);
        },
        closeAssessment: () => {
          this.url = "";
          this.bus.$emit("closeAssessment");
        },
        openAssessmentBoxWidthVersion: (e) => {
          this.bus.$emit("openAssessmentBoxWidthVersion", e);
        },
        openAssessmentBox: (e) => {
          this.bus.$emit("openAssessmentBox", e);
        },
        setLoadingText: this.setLoadingText,
        setLoadingStatus: this.setLoadingStatus,
        setLoadingButton: this.setLoadingButton,
        setloadingSVGHidden: this.setloadingSVGHidden,
        openSignModal: window.openSignModal,
        opentztbModal: this.opentztbModal,
        openyztbModal:this.openyztbModal,
        confirmfrom:this.$confirm
      };
    };
    // iframeLoadingV2
    this.$refs["iframeLoadingV2"]["setLoadingText"] = this.setLoadingText;
    this.$refs["iframeLoadingV2"]["setLoadingStatus"] = this.setLoadingStatus;
    this.$refs["iframeLoadingV2"]["setLoadingButton"] = this.setLoadingButton;
    this.$refs["iframeLoadingV2"]["setloadingSVGHidden"] =
      this.setloadingSVGHidden;
    this.$refs["iframeLoadingV2"]["opentztbModal"] = this.opentztbModal;
    // this.$refs["iframeLoadingV2"]["openyztbModal"] = this.openyztbModal;
    this.$root.$refs["iframeLoadingV2"] = this.$refs["iframeLoadingV2"];
  },
  directives:{
    authen:{
      bind(el, binding){
        if(!binding.value){
          el.style.pointerEvents = 'none'
          window.app.$root.$refs.iframeLoadingV2.style.cursor = 'no-drop'
        }
      }
    }
  },
  methods: {
    onAnthenPerm(e){
      if(!this.authenPerm) {
       this.$message.warning('抱歉！您当前权限不能修改，只能查看！');
      }
    },
    openNewFormBox(box) {
      this.$refs.openFormModal.open(box);
    },
    openMessageBox(box) {
      this.$refs.messageModal.open("", box.content, box.title, "small");
    },
    // 点击左边栏目录里已经记录好的模版,通过改变iframe URL属性,刷新iframe内容
    openUrl(info) {
      this.onlyView = info.onlyView;
      if (info.islink && this.HOSPITAL_ID == "hj") {
        this.pageLoading = false;
        this.url = info.pageUrl;
        this.info = { ...info };
        return;
      }
      try {
        window.app.$refs.iframeLoadingBox.$methods().setLoadingStatus(false);
      } catch (error) {
        console.error("~~~openUrl2", error);
      }
      this.pageLoading = true;
      this.pageLoadingText = "数据加载中";
      this.setloadingSVGHidden(false);
      let token = window.app.$getCookie("NURSING_USER").split("##")[1];
      // this.$route.query['id'] = info.id
      let query = this.$route.query;
      // this.info = {}
      this.info.todo = "";
      this.info = { ...this.info, ...info };
      // this.info = Object.assign({}, this.info, info);
      // this.info = Object.assign(this.info, info);
      let url = "";

      if (!this.info.nooForm) {
        this.info.nooForm = "0";
      }

      // 关闭右键菜单\批注
      window.closeContextMenu();
      window.closeMarkTip();
      //
      this.marklist = [];
      this.handleMarklist = [];
      // 如果不是输血评估单,则获取批注列表
      if(info.formCode!='E0314'){
        // 获取批注列表
        this.getMarkList();
      }

      // 如果是新版表单
      // let query = this.$route.query
      let queryObj = {
        id: this.info.id || "",
        showToolBar: true,
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
        title: this.info.title || "",
        isPrintPreview: info.isPrintPreview,
        pageIndex: this.info.pageIndex
        // ...this.info
      };
      if (this.onlyView) {
        queryObj = {
          onlyView: info.onlyView,
        };
      }
      if (this.HOSPITAL_NAME === "东莞市厚街医院") {
        delete queryObj.token;
      }

      this.info["pagePrintUrl"] = this.info.pageUrl
        ? this.info.pageUrl.replace(".html", "-打印.html")
        : "";

      if (["1", "2"].indexOf(this.info.nooForm) > -1) {
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
        console.log("打开表单", url, { url: url + "" });
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
        console.log("....打开表单", formUrl, url);
      }

      this.url = url;
      // 这里导致的会请求两次表单，但不知道为啥要写这个，我也不敢删，放着没啥问题我就不动他了
      if (this.$refs.iframeV2) {
        this.$refs.iframeV2.contentWindow.location.href = url;
      }
    },
    onFormLoaded(type = "") {
      this.pageLoadingText = "数据加载中";
      this.pageLoading = false;
      this.setloadingSVGHidden(false);

      let wid = this.$refs.iframeV2.contentWindow;
      this.wid = this.$refs.iframeV2.contentWindow;
      this.wid.onmessage = this.onmessage;

      // 医生查看患者详情  或者 预览模式
      if (
        this.$route.path.includes("showPatientDetails") ||
        this.$route.path.includes("nursingPreview") ||
        this.onlyView
      ) {
        if (wid.document.querySelector(".tool-contain")) {
          wid.document.querySelector(".tool-contain").style = "display:none;";
          if (wid.document.querySelector("#app .form")) {
            wid.document.querySelector("#app .form").style =
              "padding-top:20px;";
          }
        }
        if (wid.document.querySelector(".top-bar")) {
          wid.document.querySelector(".top-bar").style = "display:none;";
          wid.document.querySelector("body").style = "padding-top:20px;";
        }
        console.log('formCode', this.info.formCode)
        // 厚街（手术患者交接记录单第三方查阅时可以编辑，显示top-bar按钮）
        if (
          wid.document.querySelector(".top-bar") &&
          this.HOSPITAL_ID == 'hj' &&
          (this.info.formCode == 'J0010' || this.info.formCode == 'operationInstrumentDressing')
        ) {
          wid.document.querySelector(".top-bar").style = "display: flex;";
          wid.document.querySelector("body").style = "padding-top:50px;";
        }
      }

      //
      try {
        // if (wid.formInfo.nooForm == "1") {
        //   this.bus.$emit("openAssessmentBoxWidthVersion", { nooForm: "1" });
        //   return;
        // }
        // window.wid.document.querySelector(
        //   ".hospital"
        // ).innerText = this.hospitalNameSpace;
        this.wid.formInfo.hospital = this.hospitalNameSpace;
        console.info("onFormLoaded:hospital", this.wid.formInfo);
        if (
          this.HOSPITAL_ID == "hj" &&
          this.$route.path.includes("showPatientDetails")
        ) {
          this.wid.formInfo.hospital = "";
        }
      } catch (error) {
        console.info("onFormLoaded", error);
      }
    },
    onmessage(e) {
      // alert(e.data.type)
      // console.log(e, "message", e.data.type);
      // if (e.data.type == 'loaded' || e.data.type == "webpackOk") {
      if (e.data.type === "loaded") {
        this.onFormLoaded("onmessage");
      }
    },
    onload() {
      if (this.info.islink && this.HOSPITAL_ID == "hj") {
        return;
      }
      this.wid = this.$refs.iframeV2.contentWindow;
      window.wid = this.$refs.iframeV2.contentWindow;

      this.isLandscape = false;
      try {
        if (
          this.wid.formInfo &&
          this.wid.formInfo.hasOwnProperty("rotation") > -1
        ) {
          this.isLandscape =
            this.wid.formInfo.rotation == "landscape" ? true : false;
        }
        if (!this.wid.formInfo) {
          this.setLoadingStatus(true);
          this.setLoadingText(
            `网络异常,${
              this.info.name || this.info.pageUrl.replace(".html", "")
            },页面无法获取,请尝试刷新`
          );
          // this.pageLoadingText = `网络异常,${this.info.name},页面无法获取,请尝试刷新`;
          this.setloadingSVGHidden(true);
          this.setLoadingButton(true, "刷新", () => {
            console.log("刷新", window.wid.location);
            // window.wid.location.reload();
            this.setLoadingText("数据加载中...");
            this.refresh();
          });
        }
      } catch (error) {
        console.error("onload:formInfo:error", { error });
        this.setLoadingStatus(true);
        this.setLoadingText(
          `网络异常,${this.info.name},页面无法获取,请尝试刷新.`
        );
        // this.pageLoadingText = `网络异常,${this.info.name},页面无法获取,请尝试刷新.`;
        this.setloadingSVGHidden(true);
        this.setLoadingButton(true, "刷新", () => {
          console.log("err刷新", window.wid.location);
          // window.wid.location.reload();
          this.setLoadingText("数据加载中...");
          this.refresh();
        });
      }

      if (
        this.wid.loadTimeData &&
        this.wid.loadTimeData.data_ &&
        this.wid.loadTimeData.data_.errorCode
      ) {
        console.log(
          "找不到页面",
          this.wid.loadTimeData.data_,
          this.wid.loadTimeData.data_.errorCode
        );
        this.pageLoadingText = "网络异常,页面无法获取,请尝试刷新";
        this.setloadingSVGHidden(true);
        this.setLoadingButton(true, "刷新", () => {
          console.log("刷新...");
          this.pageLoadingText = "刷新中...";
          setTimeout(() => {
            window.wid.location.reload();
          }, 100);
        });
      }

      // 医生查看患者详情  或者 预览模式
      if (
        window.location.href.includes("showPatientDetails") ||
        window.location.href.includes("nursingPreview") ||
        this.onlyView
      ) {
        this.$nextTick(() => {
          let css = `#app input,#app label,#app td,#app .sign-con{
              pointer-events: none !important;
          }`;
          // 厚街（手术患者交接记录单第三方查阅时可以编辑）ZHZXY_E0007      ZHZXY_E0004
          let listHospital = [
              ()=> this.HOSPITAL_ID == 'hj' && (this.info.formCode == 'J0010' || this.info.formCode == 'operationInstrumentDressing'),
              ()=> this.HOSPITAL_ID == 'zhzxy' && (this.info.formCode == 'ZHZXY_E0007' || this.info.formCode == 'ZHZXY_E000'|| this.info.formCode == 'E1760'|| this.info.formCode == 'ZHZXY_E0031'),
          ]
          if (listHospital[0]() || listHospital[1]()) {
            css = `#app input,#app label,#app td,#app .sign-con{
            }`;
          }
          if(this.HOSPITAL_ID == 'whsl'){
            css = `#app input,#app label,#app td,#app .sign-con{
            }`;
          }
          if (
            this.HOSPITAL_ID == 'hj' &&
            (this.info.formCode == 'J0010' || this.info.formCode == 'operationInstrumentDressing')
          ) {
            css = `#app input,#app label,#app td,#app .sign-con{
            }`;
          }
          var style = document.createElement("style");
          style.type = "text/css";
          try {
            style.appendChild(document.createTextNode(css));
          } catch (ex) {
            style.styleSheet.cssText = css; //针对IE
          }
          var head = wid.document.querySelector("head");
          head.appendChild(style);
          this.onFormLoaded();
        });
      }
    },
    cleanAllMark(str = "") {
      try {
        let qStr = str;
        // if(!this.wid.formatData || !this.wid.formatData.dataShop){}
        let keys = this.wid.formatData.dataShop.getModel();
        Object.keys(keys).map((k) => {
          qStr = str ? str : '[name="' + k + '"]';
          jQuery(qStr, this.wid.document).off();
          let inputs = this.wid.document.querySelectorAll(qStr);
          [...inputs].map((el) => {
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

        markList.map((m) => {
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
                (event) => {
                  if (!event) {
                    return;
                  }
                  event.stopPropagation();
                  let id = event.target.getAttribute("data-id");
                  let name = event.target.getAttribute("name");
                  let mid = [...this.handleMarklist, ...this.marklist].find(
                    (r) => {
                      return r.recordId == id && r.fieldEn == name;
                    }
                  );
                  console.log("----mid", mid, id, markList, [
                    ...this.handleMarklist,
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
        if (callback) {
          callback();
        }
      }
    },
    getMarkList(callback = null) {
      this.marklist = [];
      if (this.info.id) {
        markListById(this.info.id).then((res) => {
          if (res) {
            let {
              data: {
                data: { list: list },
              },
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
      let treeData = this.bus.$emit("getTreeRaw", (res) => {
        console.log("getTreeRaw", res);
        // pageUrl
        if (res) {
          curForm = res.find((f) => {
            return f.pageUrl == this.info.pageUrl;
          });
          //children
          if (curForm && curForm.children) {
            unsignForm = curForm.children.filter((f) => {
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
        !this.info.title.includes("入院评估表") && 
        this.HOSPITAL_ID !== "hj"
      ) {
        this.$message.warning(`不允许打印,请查看提示详情.`);
        this.$notify({
          title: "提示",
          message: `打印前请检查所有 ${curForm.label || ""} 都已签名, 仍有 ${
            unsignForm.length || 0
          } 张未签名.`,
          type: "warning",
        });
        return;
      }

      try {
        if (this.info.nooForm == "1") {
          if (this.info.title == "生长发育评估量表") {
            if (!this.info.id) {
              return this.$message.warning("打印前请先保存");
            } else {
              return window.open(
                `/crNursing/print/growth?${qs.stringify(
                  Object.assign({}, this.info, this.$route.query)
                )}`
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
        wardCode: query.wardCode,
      };

      // 页面数据 接口参数
      let pageDataArgs = {
        id: this.info.id,
        formCode: this.info["formCode"],
        patientId: query.patientId,
        visitId: query.visitId,
        listPrint: listPrint,
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
        todo: this.info.todo,
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
        let wid = this.$refs.iframeV2.contentWindow;
        if (this.info.nooForm == "1") {
          window.openSignModal((password, empNo) => {
            wid.signForm(empNo, password).then((res) => {
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
        let wid = this.$refs.iframeV2.contentWindow;
        if (this.info.nooForm == "1") {
          window.openSignModal((password, empNo) => {
            wid.auditForm(empNo, password).then((res) => {
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
      let wid = this.$refs.iframeV2.contentWindow;
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
            type: "warning",
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
            type: "warning",
          });
        }
      }
    },
    saveFormbyPw(password, username) {
      if (!password) {
        return this.$notify({
          title: "警告",
          message: "密码不能为空",
          type: "warning",
        });
      }
      let wid = this.$refs.iframeV2.contentWindow;
      let list = this.$store.state.form.measure;
      let select = this.$store.state.form.select;

      console.log("Assessment_saveFormbyPw", list, select);
      var formCode =
        wid.CRForm.formInfo.formCode ||
        jQuery(`input[name='formCode']`, wid.document).val();

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

      // alert("formCode:"+formCode);

      // // 侧边栏 护理措施 和 入院情况 字段数据获取
      try {
        let tabs = this.formListData.tabs;
        // let formCode = formCode; //this.formListData.smartForm.formCode;
        tabs.forEach((tab, index) => {
          tab.items.forEach((item, index) => {
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
      } catch (e) {
        //
        console.log("++++Error++++getDataToPost", postData);
      }

      if (this.url.indexOf("editMode") > -1) {
        var formId = this.$store.state.form.formFilledData.id;
        postData["id"] = formId;
      }

      // $(`input[id*='CR']`,wid.document)
      // window.widTest.document
      // $(`input[name*='formCode']`,wid.document)
      // window.widTest.document.querySelectorAll(`input[id*='CR']`)

      $(selectString, wid.document).each(function () {
        // var item = {[this.name]:this.value};
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
          postData[this.name] = this.value;
        }
        if (
          this.type === "radio" ||
          this.type === "date" ||
          this.type === "time" ||
          this.type === "number"
        ) {
          postData[this.name] = this.value;
        }
        if (this.type === "checkbox") {
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
        postData[formCode + "_eval_date"] =
          moment(evalData).format("YYYY-MM-DD HH:mm");
        if (postData[formCode + "_eval_date"] === "Invalid date") {
          postData[formCode + "_eval_date"] =
            moment().format("YYYY-MM-DD HH:mm");
        }
        // _record_date _record_time
        // }
      } catch (e) {
        console.log(e);
      }

      if (formCode.indexOf("form_swallowing") > -1) {
        // console.log("=====window.sign", window.sign);
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
    refresh() {
      try {
        this.$refs.iframeV2.contentWindow.location.reload();

        // console.log("innerHTML",this.$refs.iframeV2.contentWindow.document.innerHTML);
      } catch (e) {}
    },
    openScoreChart() {
      let query = this.$route.query;
      let scoreUrl = `${host}/crNursing/api/form/curve/${this.info.formCode}/${query.patientId}/${query.visitId}`;
      this.$refs.scoreChart.open(scoreUrl);
    },
    openEditAssessment() {
      let wid = this.$refs.iframeV2.contentWindow;
      // if ((this.formStatus === "2" || this.info.status == '2') && JSON.parse(localStorage.user).title !== '护士长') {

      if (window.app.$route.query.formStatus) {
        this.formStatus = window.app.$route.query.formStatus;
      }

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
        // checkUser
        this.$refs.signModal.open((password, empNo) => {
          console.log("openEditAssessment:", this.$refs, password, empNo);
          checkUser(empNo, password).then((res) => {
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
                center: true,
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
          type: "warning",
        }
      ).then((res) => {
        //
        console.log(res);
      });
    },
    delAssessment() {
      this.$confirm("此操作将永久删除该评估表", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        this.$refs.signModal.open((password, empNo) => {
          try {
            if (this.info.nooForm == "1") {
              let wid = this.$refs.iframeV2.contentWindow;
              wid.delForm(empNo, password).then((res) => {
                this.$message.success("删除成功");
                this.bus.$emit("refreshTree");
                this.bus.$emit("closeAssessment");
              });
              return;
            }
          } catch (e) {}
          evalDel(this.info.id, password, empNo).then((res) => {
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
                list: [{ id: item.id }],
              }
            );
            del(item.formApiCode, data, item.formType).then((res) => {
              window.messageBox.show("删除记录成功", "success", 5000);
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
    setLoadingText(text, callback = null) {
      this.pageLoadingText = text;
      if (callback) {
        callback();
      }
    },
    setLoadingButton(isShow, text = "知道了", callback = null) {
      var spinners = window.document.querySelectorAll(".el-loading-spinner");
      spinners = [...spinners];
      var spin = null,
        sinput = null,
        input = null;
      sinput = window.document.querySelector("#spin-button");
      if (isShow) {
        if (spinners && spinners.length > 0) {
          spin = spinners.find((res) => {
            let className = "";
            try {
              className = res.parentNode.parentNode.className;
            } catch (error) {
              //
            }
            // console.log(className, res.innerText);
            return className == "contantV2";
            // return res.innerText.indexOf(key) > -1;
          });
          if (spin) {
            if (!sinput) {
              input = document.createElement("input");
              input.type = "button";
              input.classList.add("mask-loading-button");
              input.id = "spin-button";
              input.value = text; //"知道了";
              input.onclick = () => {
                if (callback) {
                  callback();
                }
                this.setLoadingStatus(false);
                input.parentNode.removeChild(input);
              };
              spin.appendChild(input);
            } else {
              // console.log("sinput", sinput);
              sinput.value = text;
              if (callback) {
                sinput.onclick = callback;
              }
            }
          }
        }
      } else {
        if (sinput) {
          sinput.parentNode.removeChild(sinput);
        }
      }
    },
    setloadingSVGHidden(bool) {
      let svgs = [];
      svgs = window.document.querySelectorAll(".contantV2 .circular");
      svgs = [...svgs];
      if (bool == true) {
        console.log("setloadingSVGHidden", bool, true, svgs);
        if (svgs && svgs.length > 0) {
          svgs.forEach((svg) => {
            svg.classList.add("hidden-loading"); //.setAttribute("visibility", "hidden");
          });
        }
        this.setLoadingButton(true);

      } else {
        console.log("setloadingSVGHidden", bool, false, svgs);
        if (svgs && svgs.length > 0) {
          svgs.forEach((svg) => {
            svg.classList.remove("hidden-loading"); //.setAttribute("visibility", "visible");
          });
        }
        this.setLoadingButton(false);
        // if (sinput) {
        //   sinput.parentNode.removeChild(sinput);
        // }
      }
    },
    opentztbModal(baseParams) {
      this.$refs.tztbModal.open(baseParams);
    },
    openyztbModal(cb,patientInfo){
      this.$refs.yztbModal.open(cb,patientInfo);
    },
    onContextMenu(event) {
      console.log("onContextMenu", event);
      if (this.eventTarget) {
        this.eventTarget.style.outline = "";
        // this.eventTarget.style.background = "";
      }
      this.wid = this.$refs.iframeV2.contentWindow;
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
        formType: this.wid.formInfo.formType || "",
        formCode: this.wid.formInfo.formCode || "",
        formApiCode: this.wid.formInfo.formApiCode || "",
        id: event.target.getAttribute("data-id") || "",
        blockId:
          event.target.getAttribute("data-blockId") ||
          this.wid.formInfo.id + "" ||
          "",
        index: event.target.getAttribute("data-index") || "",
        pageIndex: event.target.getAttribute("data-pageIndex") || "",
        name: event.target.getAttribute("name") || "",
      };
      let mkid = [...this.marklist].find((r) => {
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
      let xyiframe = this.$refs.iframeV2.getBoundingClientRect();
      let xy = event.target.getBoundingClientRect();
      let y = xyiframe.top + xy.top + event.offsetY - 20;
      let x = xyiframe.left + xy.left + event.offsetX + 10;
      x = Math.min(x, window.innerWidth - 200);
      let style = {
        top: `${y}px`,
        left: `${x}px`,
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
            Object.keys(newItem).forEach((k) => {
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
              this.onFormLoaded();
            }, 100);
          },
        },
        {
          name: "向下插入新行",
          icon: "xiangxiacharuyihang",
          disable: !recordObj.formApiCode,
          click: () => {
            let newItem = JSON.parse(JSON.stringify(rowData));
            Object.keys(newItem).forEach((k) => {
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
              this.onFormLoaded();
            }, 100);
          },
        },
        {
          name: "删除整行",
          icon: "shanchuzhenghang",
          disable: !recordObj.formApiCode,
          click: () => {
            this.delRecord(recordObj, rowData);
            console.log("删除整行", rowData);
          },
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
          },
        },
        {
          name: "打印区域",
          icon: "shanchuzhenghang",
          // disable: !recordObj.formApiCode,
          click: () => {
            // this.delRecord(recordObj, rowData);
            console.log("打印区域", event, rowData);
            event.view.print();
            // this.printIframe(event.target.innerHTML);
          },
        },
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
        innerWidth: window.innerWidth,
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
        let xyiframe = this.$refs.iframeV2.getBoundingClientRect();
        let xy = event.target.getBoundingClientRect();
        let y = xyiframe.top + xy.top + event.offsetY - 10;
        let x = xyiframe.left + xy.left + event.offsetX + 10;
        x = Math.min(x, window.innerWidth - 300);
        console.log("xy", x, y, xy, xyiframe);
        window.openMarkTip({
          style: {
            left: x,
            top: y,
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
                  let mobj = [...this.handleMarklist].find((r) => {
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
                  this.markList = [...this.markList].filter((r) => {
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
                  this.handleMarklist = [...this.handleMarklist].filter((r) => {
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
              //     this.onFormLoaded();
              //   }, 100);
              // });
            },
          },
        });
      }
    },
    closeMarkTip() {
      console.log("closeMarkTip", event);
      window.closeMarkTip();
    },
  },
  computed: {
    markListArr() {
      return this.markList;
    },
    fullPageRecord() {
      return this.$store.state.record.fullPageRecord;
    },
    offsetHeight() {
      return this.$store.state.record.fullPageRecord ? 5 : 85;
    },
    iframeHeight() {
      if (
        this.$route.path == "/formPage" ||
        this.$route.path.includes("showPatientDetails") ||
        this.$route.path.includes("nursingPreview")
      ) {
        return this.wih - 0 - this.offsetHeight - (this.tagsViewHeight || 0);
      } else if (this.$route.path.includes("nursingTemperature")) {
        return this.wih - (this.tagsViewHeight || 0);
      } else {
        return this.wih - 60 - this.offsetHeight - (this.tagsViewHeight || 0);
      }
      // return this.wih - this.offsetHeight;
    },
  },
  watch: {
    url() {
      if (this.info.formCode) {
        this.pageLoading = true;
      }
    },
  },
  components: {
    signModal,
    pizhuModal,
    scoreChart,
    messageModal,
    openFormModal,
    tztbModal,
    yztbModal
  },
};
</script>
