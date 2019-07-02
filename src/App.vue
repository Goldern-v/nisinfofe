<template>
  <div id="app">
    <router-view></router-view>
    <autoComplete ref="autoComplete"></autoComplete>
    <contextMenu ref="contextMenu"></contextMenu>
    <markTip ref="markTip"></markTip>
    <signModal ref="signModal"></signModal>
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
  </div>
</template>

<script>
import autoComplete from "@/components/autoComplete/autoComplete.vue";
import contextMenu from "@/components/contextMenu/contextMenu.vue";
import markTip from "@/components/markTip/markTip.vue";
import signModal from "@/components/modal/sign.vue";
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
import setTextModal from "@/components/modal/set-text-modal.vue";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  name: "app",
  created() {
    window.onresize = () => {
      this.$store.commit("upWih");
    };
    // 禁止 鼠标滚轮 缩放网页比例
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
  },
  mounted() {
    window.openSignModal = this.$refs.signModal.open;
    window.openTestDiagnosisModal = this.$refs.testDiagnosis.open;
    window.openInfoDiagnosisModal = this.$refs.InfoDiagnosis.open;
    window.openTestFormDiagnosisModal = this.$refs.testFormDiagnosis.open;
    window.openSubFormDialogModal = this.$refs.subFormDiagnosis.open;
    window.openSetAuditDateModal = this.$refs.setAuditDateModal.open;
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
    window.closeSetTextModal = () => {
      this.$refs.setTextModal.close();
    };

    /** 关闭前提示 */
    !this.isDev &&
      (window.onbeforeunload = function(event) {
        console.log(event, "eventevent");
        return confirm("");
      });
  },
  components: {
    autoComplete,
    contextMenu,
    markTip,
    signModal,
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
    setTextModal
  }
};
</script>

<style>
#app {
  min-width: 1024px;
}
</style>
