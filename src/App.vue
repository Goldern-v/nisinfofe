<template>
  <div id="app" v-if="reLoadHeader">
    <router-view></router-view>
    <autoComplete ref="autoComplete"></autoComplete>
    <contextMenu ref="contextMenu"></contextMenu>
    <markTip ref="markTip"></markTip>
    <signModal ref="signModal"></signModal>
    <whhkSignModal ref="whhkSignModal"></whhkSignModal>
    <formBox ref="moadl"></formBox>
    <formBoxClean ref="formBoxClean"></formBoxClean>
    <formBoxEdu ref="formBoxEdu"></formBoxEdu>
    <slideCon ref="slideRight"></slideCon>
    <newFormBox ref="newFormBox"></newFormBox>
    <newDiagnosisBox ref="newDiagnosisBox"></newDiagnosisBox>
    <selectDiagnosis ref="selectDiagnosis"></selectDiagnosis>
    <Infomation ref="InfoDiagnosis"></Infomation>
    <testModal ref="testDiagnosis"></testModal>
    <testFormModal ref="testFormDiagnosis"></testFormModal>
    <subFormModal ref="subFormDiagnosis"></subFormModal>
    <setAuditDateModal ref="setAuditDateModal"></setAuditDateModal>
    <setTextModal ref="setTextModal"></setTextModal>
    <setTextModalNew ref="setTextModalNew"></setTextModalNew>
    <caSignModal ref="caSignModal"></caSignModal>
    <fuyouCaSignModal ref="fuyouCaSignModal"></fuyouCaSignModal>
    <zzwyCaSignModal ref="zzwyCaSignModal"></zzwyCaSignModal>
    <whhkCaSignModal ref="whhkCaSignModal"></whhkCaSignModal>
    <hjCaSignModal ref="hjCaSignModal"></hjCaSignModal>
    <!-- 测试 -->

    <!-- 锁屏界面 -->
    <ScreenLockView v-if="HOSPITAL_ID === 'zhongshanqi'" />
  </div>
</template>

<script>
import autoComplete from "@/components/autoComplete/autoComplete.vue";
import contextMenu from "@/components/contextMenu/contextMenu.vue";
import markTip from "@/components/markTip/markTip.vue";
import signModal from "@/components/modal/sign.vue";
import whhkSignModal from "@/components/modal/whhk-sign.vue";
import testModal from "@/components/modal/testDialog.vue";
import Infomation from "@/components/modal/infomation.vue";
import testFormModal from "@/components/modal/testFormDialog.vue";
import subFormModal from "@/components/modal/subFormDialog.vue";
import formBox from "@/Page/patientInfo/supComponts/formBox/formBox.vue";
import formBoxClean from "@/Page/patientInfo/supComponts/formBox/formBoxClean.vue";
import formBoxEdu from "@/Page/patientInfo/supComponts/formBox/formBoxEdu.vue";
import slideCon from "@/Page/patientInfo/supComponts/slide/slideCon.vue";
import selectDiagnosis from "@/Page/patientInfo/supComponts/select/selectDiagnosis.vue";
import newFormBox from "@/Page/patientInfo/supComponts/formBox/newFormBox";
import newDiagnosisBox from "@/Page/patientInfo/supComponts/formBox/newDiagnosisBox";
import setAuditDateModal from "@/components/modal/set-audit-date.vue";
import setTextModal from "@/components/modal/set-text-modal.vue";//体温单录入自定义模板
import setTextModalNew from "@/Page/sheet-page/components/modal/set-title-modal.vue";//体温单录入自定义模板(带模板录入的)
import caSignModal from "@/components/modal/ca-sign";
import common from "@/common/mixin/common.mixin";
import detectZoom from "@/plugin/tool/detectZoom.js";
import ScreenLockView from "@/components/screenLockView/ScreenLockView";
import fuyouCaSignModal from "@/components/modal/fuyou-ca-sign";
import zzwyCaSignModal from "@/components/modal/zzwy-ca-sign";
import whhkCaSignModal from "@/components/modal/whhk-ca-sign";
import hjCaSignModal from "@/components/modal/hj-ca-sign";


export default {
  mixins: [common],
  name: "app",
  data() {
    return {
      showScaleMsg: false, //是否出现缩放窗口提示
      scaleRate: "", //当前页面缩放比例
      reLoadHeader:true
    };
  },
  watch: {
    $route(to, from) {
      if (
        from.path != "/" &&
        !this.HOSPITAL_ID.includes("yanshi") &&
        !this.isDev &&
        this.empNo != "admin" &&
        this.HOSPITAL_ID != "fuyou"
      ) {
        this.isScale();
      }
    }
  },
  created() {

    // start --- 针对花都多窗口切换用户bug的绑定监听事件
    let _this = this // 改写windo事件的this指向
    window.addEventListener("storage", function (e) {
      if(e.key=="user"){
        this.reLoadHeader = false // 用来控制页面刷新
        setTimeout(()=>{
          this.reLoadHeader = true
        })
      }
    }.bind(_this));
    // end --- 针对花都多窗口切换用户bug的绑定监听事件
    window.onresize = () => {
      this.$store.commit("common/upWih");
    };
    // 禁止缩放
    if (
      !this.isDev &&
      !this.HOSPITAL_ID.includes("yanshi") &&
      this.empNo != "admin"
    ) {
      // 禁止 鼠标滚轮 缩放网页比例
      this.preventMouseScale();
      // 禁止通过键盘按钮缩放
      this.preventBtnScale();
      // 缩放提示（无法禁掉缩放的情况下出现）
      this.isScale();
      this.isResize();
    }
  },
  mounted() {
    window.openSignModal = this.$refs.signModal.open;
     // 存起。处理武汉汉口CA、U盾签名弹窗和默认账号密码输入弹窗操作
    window.commonSignModal = this.$refs.signModal.open;
    window.openWhhkSignModal = this.$refs.whhkSignModal.open;
    window.openTestDiagnosisModal = this.$refs.testDiagnosis.open;
    window.openInfoDiagnosisModal = this.$refs.InfoDiagnosis.open;
    window.openTestFormDiagnosisModal = this.$refs.testFormDiagnosis.open;
    window.openSubFormDialogModal = this.$refs.subFormDiagnosis.open;
    window.openSetAuditDateModal = this.$refs.setAuditDateModal.open;
    //
    this.$root.$refs = {
      ...this.$root.$refs,
      sign: this.$refs.signModal,
      whhkSignModal:this.$refs.whhkSignModal,
      setTextModal: this.$refs.setTextModal,
      setTextModalNew: this.$refs.setTextModalNew,
      newFormBox: this.$refs.newFormBox,
      caSignModal: this.$refs.caSignModal,
      fuyouCaSignModal: this.$refs.fuyouCaSignModal,
      zzwyCaSignModal: this.$refs.zzwyCaSignModal,
      whhkCaSignModal: this.$refs.whhkCaSignModal,
      hjCaSignModal: this.$refs.hjCaSignModal,
      selectDiagnosis: this.$refs.selectDiagnosis,
      formBox: this.$refs.moadl,
      formBoxEdu: this.$refs.formBoxEdu,
      slideRight: this.$refs.slideRight
    };
    //
    window.openSubFormDialogModal = params => {
      this.$refs.subFormDiagnosis.open(params);
    };

    window.openTestDiagnosisModal = params => {
      this.$refs.testDiagnosis.open(params);
    };
    window.openInfoDiagnosisModal = params => {
      this.$refs.InfoDiagnosis.open(params);
    };

    window.openTestFormDiagnosisModal = params => {
      this.$refs.testFormDiagnosis.open(params);
    };

    // 打开病历表单弹窗
    window.openFormBox = url => {
      // 清除已有数据
      this.$store.commit("cleanMeasureAll");
      this.$refs.moadl.open(url);
    };
    window.closeFormBox = () => {
      this.$store.commit("cleanMeasureAll");
      this.$refs.moadl.close();
    };

    window.openFormBoxEdu = (url, fun, title) => {
      this.$refs.formBoxEdu.open(url, fun, title);
    };
    window.closeFormBoxEdu = () => {
      this.$refs.formBoxEdu.close();
    };
    window.openFormBoxClean = (url, fun, title) => {
      this.$refs.formBoxClean.open(url, fun, title);
    };
    window.closeFormBoxClean = () => {
      this.$refs.formBoxClean.close();
    };
    // 打开诊断详情侧边栏
    window.openSlide = item => {
      return this.$refs.slideRight.open(item);
    };
    window.closeSlide = () => {
      this.$refs.slideRight.close();
    };
    window.openNewForm = () => {
      return this.$refs.newFormBox.open();
    };
    window.closeNewForm = () => {
      this.$refs.newFormBox.close();
    };
    window.openNewDiagnosis = () => {
      return this.$refs.newDiagnosisBox.open();
    };
    window.closeNewDiagnosis = () => {
      this.$refs.newDiagnosisBox.close();
    };
    window.openselectDiagnosis = item => {
      return this.$refs.selectDiagnosis.open(item);
    };
    window.closeselectDiagnosis = () => {
      this.$refs.selectDiagnosis.close();
    };
    /** 打开修改文字信息 */
    window.openSetTextModal = (...item) => {
      return this.$refs.setTextModal.open(...item);
    };
    window.openSetTextModalNew = (...item) => {
      return this.$refs.setTextModalNew.open(...item);
    };
    window.setTextModal = (...item) => {
      return this.$refs.setTextModal.open(...item);
    };
    window.closeSetTextModalNew = () => {
      this.$refs.setTextModalNew.onClose();
    };
    window.closeSetTextModal = () => {
      this.$refs.setTextModal.close();
    };
    /** 威县ca签名 */
    window.openCaSignModal = (...item) => {
      return this.$refs.caSignModal.open();
    };
    window.closeCaSignModal = () => {
      this.$refs.caSignModal.close();
    };
    window.reloginCaSignModal = (relogobj) => {
      this.$refs.caSignModal.relogin(relogobj);
    };
    /** 江门妇幼ca签名 */
    window.openFuyouCaSignModal = (isStart) => {
      return this.$refs.fuyouCaSignModal.open(()=>{},isStart);
    };

    window.openHjCaSignModal = (isStart) => {
      return this.$refs.hjCaSignModal.open(()=>{},isStart);
    };
    window.closeFuyouCaSignModal = () => {
      this.$refs.fuyouCaSignModal.close();
    };
    window.closeHjCaSignModal = () => {
      this.$refs.hjCaSignModal.close();
    };
    /** 漳州五院ca签名 */
    window.openZzwyCaSignModal = (isStart) => {
      return this.$refs.zzwyCaSignModal.open(()=>{},isStart);
    };
    window.closeZzwyCaSignModal = () => {
      this.$refs.zzwyCaSignModal.close();
    };
    /** 漳州五院ca签名 */
    window.openWhhkCaSignModal = (isStart) => {
      return this.$refs.whhkCaSignModal.open(()=>{},isStart);
    };
    window.closeWhhkCaSignModal = () => {
      this.$refs.whhkCaSignModal.close();
    };
    //fuyouCaSignModal
    /** 关闭前提示 */
    !this.isDev &&
      !window.location.href.includes("otherPage") &&
      !window.location.href.includes("nursingDoc") &&
      !window.location.href.includes("showPatientDetails") &&
      !window.location.href.includes("bottleLabelByProgram") &&
      (window.onbeforeunload = function(event) {
        console.log(event, "eventevent");
        return confirm("");
      });
  },
  methods: {
    // 禁止通过键盘按钮缩放
    preventBtnScale() {
      if (this.isDev) {
        return;
      }
      // 阻止pc端浏览器缩放js代码
      // 由于浏览器菜单栏属于系统软件权限，没发控制，我们着手解决ctrl/cammond + +/- 或 Windows下ctrl + 滚轮 缩放页面的情况，只能通过js来控制了
      document.addEventListener(
        "DOMContentLoaded",
        function(event) {
          // chrome 浏览器直接加上下面这个样式就行了，但是ff不识别
          document.body.style.zoom = "reset";
          document.addEventListener(
            "keydown",
            function(event) {
              if (
                (event.ctrlKey === true || event.metaKey === true) &&
                (event.which === 61 ||
                  event.which === 107 ||
                  event.which === 173 ||
                  event.which === 109 ||
                  event.which === 187 ||
                  event.which === 189)
              ) {
                event.preventDefault();
              }
            },
            false
          );
          let scrollFunc = function(event) {
            event = event || window.event;
            if (event.wheelDelta) {
              //判断浏览器IE，谷歌滑轮事件
              if (event.ctrlKey === true || event.metaKey) {
                event.preventDefault();
              }
            }
          };
          //给页面绑定滑轮滚动事件
          if (document.addEventListener) {
            document.addEventListener("DOMMouseScroll", scrollFunc, false);
          }
          //滚动滑轮触发scrollFunc方法
          window.onmousewheel = document.onmousewheel = scrollFunc;
        },
        false
      );
    },
    // 判断页面是否缩放
    isScale() {
      if (localStorage.getItem("noShowScaleTip") || this.showScaleMsg) {
        return;
      }
      this.showScaleMsg = true;
      this.scaleRate = detectZoom();
      if (this.scaleRate != 100 && !this.isDev) {
        // 如果浏览器缩放比不是100的时候弹出提示
        try {
          !this.isDev &&
            this.$notify.info({
              title: "提示",
              message: `当前浏览器缩放 ${this.scaleRate}%，可能会影响页面正常显示，可以通过 cltr + '0' 恢复 100%`,
              onClose: () => {
                this.showScaleMsg = false;
              }
            });
        } catch (e) {}
      }
    },
    isResize() {
      window.addEventListener("resize", () => {
        if (localStorage.getItem("noShowScaleTip") || this.showScaleMsg || this.scaleRate == detectZoom()) {
          this.scaleRate = detectZoom();
          if (
            document.getElementsByClassName("el-notification__content") &&
            document.getElementsByClassName("el-notification__content")[0] &&
            document.getElementsByClassName("el-notification__content")[0]
              .innerText &&
            document
              .getElementsByClassName("el-notification__content")[0]
              .innerText.includes("可以通过 cltr + '0'")
          ) {
            document.getElementsByClassName(
              "el-notification__content"
            )[0].innerText = `当前浏览器缩放 ${this.scaleRate}%，可能会影响页面正常显示，可以通过 cltr + '0' 恢复 100%`;
          }
          return;
        }
        this.isScale();
      });
    },
    // 禁止 鼠标滚轮 缩放网页比例
    preventMouseScale() {
      var scrollFunc = function(e) {
        e = e || window.event;
        if (e.wheelDelta && event.ctrlKey) {
          //IE/Opera/Chrome
          console.log("禁止 鼠标滚轮 缩放网页比例");
          event.returnValue = false;
        } else if (e.detail) {
          //Firefox
          event.returnValue = false;
        }
      };

      /*注册事件*/
      if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", scrollFunc, false);
      } //W3C
      window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome/Safari
    }
  },
  components: {
    autoComplete,
    contextMenu,
    markTip,
    signModal,
    whhkSignModal,
    testModal,
    Infomation,
    testFormModal,
    subFormModal,
    formBox,
    slideCon,
    newFormBox,
    newDiagnosisBox,
    selectDiagnosis,
    formBoxClean,
    formBoxEdu,
    setAuditDateModal,
    setTextModal,
    setTextModalNew,
    caSignModal,
    ScreenLockView,
    fuyouCaSignModal,
    zzwyCaSignModal,
    whhkCaSignModal,
    hjCaSignModal
  }
};
</script>

<style>
#app {
  min-width: 1024px;
}
.health-education-exclusive-cascade-selector-drop-down .el-cascader-menu__item{
  width: 150px;
  text-overflow:unset;
  white-space:pre-wrap;
  min-height:36px;
  height: auto;
}
</style>
