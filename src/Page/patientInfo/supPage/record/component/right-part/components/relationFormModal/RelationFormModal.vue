<template>
  <sweet-modal
    ref="modal"
    :modalWidth="1000"
    :title="title || '关联表单'"
    @close="handleClose"
    id="relation-form-modal-con"
  >
    <div class="form-area" :class="{'form-area--full': '925' === HOSPITAL_ID}">
      <div class="loading-mask" v-show="loading">
        <div class="loading-mask-info">
          <i class="el-icon-loading" v-show="iconVisible"></i>
          <span>{{ loadintText || "载入中..." }}</span>
          <br />
          <el-button
            style="margin-top: 10px"
            v-show="loadingBtnVisible"
            type="primary"
            @click="handleLoadingBtn"
            >{{ loadingBtnText || "确定" }}</el-button
          >
        </div>
      </div>
      <iframe
        src
        frameborder="0"
        ref="iframe"
        class="relation-form-modal-iframe"
      ></iframe>
    </div>
    <div class="sweet-buttons">
      <el-button @click="toClose">取消</el-button>
      <el-button type="primary" @click="handleSave" :disabled="loading"
        >保存</el-button
      >
      <el-button
        type="primary"
        @click="handleSign"
        :disabled="loading"
        v-show="showSignBtn && HOSPITAL_ID!='guizhou' && HOSPITAL_ID!='huadu'"
        >签名</el-button
      >
    </div>
  </sweet-modal>
</template>

<script>
import commonMixin from "@/common/mixin/common.mixin";
import BusFactory from "vue-happy-bus";
import { devFormUrl, formUrl } from "@/common/pathConfig/index.js";
import qs from "qs";

/**关联表单弹窗 */
export default {
  mixins: [commonMixin],
  props: {},
  data() {
    return {
      title: "",
      bus: BusFactory(this),
      useIframe: true,
      loading: false,
      iconVisible: true,
      loadingBtnText: "",
      loadingBtnVisible: false,
      loadintText: "载入中...",
      showSignBtn: true,
    };
  },
  mounted() {
    this.bus.$on("showRelationFormModal", this.handleOpen);
    this.bus.$on("saveSuccess", this.handleSaveSuccess);
    this.bus.$on("signSuccess", this.handleSignSuccess);

    let $methods = {
      busEmit: this.bus.$emit,
      setLoadingStatus: (visible) => (this.loading = visible),
      setLoadingText: (text) => (this.loadintText = text),
      setloadingSVGHidden: (hidden) => (this.iconVisible = !hidden),
      setLoadingButton: (visible, text, callback) => {
        this.loadingBtnVisible = visible;
        this.loadingBtnText = text || "";
        this.loadingBtnCallback = callback || function () {};
      },
      updateTree: () => this.bus.$emit("updateTree"),
      openSignModal: window.openSignModal,
    };
    this.$root.$refs["relationFormModal"] = {
      ...$methods,
      $methods: () => {
        return $methods;
      },
    };
  },
  beforeDestroy() {
    delete this.$root.$refs["relationFormModal"];
  },
  methods: {
    handleOpen(payload) {
      this.$refs.modal.open();
      payload.query.patientName = payload.query.patientName ? payload.query.patientName : payload.query.name
      if (!payload.noFetch) {
        //使用iframe引入表单地址
        var baseURL = this.isDev ? devFormUrl : formUrl;
        let url = `${baseURL}/${payload.formUrl}?${qs.stringify({
          ...payload.query,
          formCode: payload.formCode,
          showToolBar: false,
          relationFormModal: true,
          timeset: new Date().getTime(),
        })}`;

        this.showSignBtn = payload.showSignBtn || false;

        this.$refs.iframe.setAttribute("src", url);

        this.useIframe = true;
      } else {
        this.useIframe = false;
        //使用独立的界面
      }

      //覆写成功回调
      if (payload.callback)
        this.successCallback = (data) => payload.callback(data);

    },
    toClose() {
      this.$refs.modal.close();
    },
    handleSave() {
      if (this.useIframe) {
        let target = document.querySelector(".relation-form-modal-iframe");
        if (target && target.contentWindow.todoSave)
          target.contentWindow.todoSave();
      }
    },
    handleSign() {
      if (this.useIframe) {
        let target = document.querySelector(".relation-form-modal-iframe");
        if (target && target.contentWindow.todoSign)
          target.contentWindow.todoSign();
      }
    },
    handleClose() {
      this.loading = false;
      this.loadintText = "";
      this.showSignBtn = false;
      this.loadingBtnVisible = false;
    },
    handleSaveSuccess(data) {
      if (this.useIframe) {
        this.$refs.modal.close();
        this.successCallback && this.successCallback(data);
      }
    },
    handleSignSuccess(data) {
      if (this.useIframe) {
        this.$refs.modal.close();
        this.successCallback && this.successCallback(data);
      }
    },
    handleLoadingBtn() {
      // this.$refs.modal.open();
      console.log(this.loadintText);
      if (this.loadingBtnText == "签名成功") {
        this.$refs.modal.close();
      } else {
        this.loading = false;
        this.loadintText = "";
        this.showSignBtn = true;
        this.loadingBtnVisible = false;
      }
      this.loadingBtnCallback && this.loadingBtnCallback();
    },
  },
  components: {},
};
</script>

<style lang='scss' scoped>
</style>

<style lang="scss">
#relation-form-modal-con .sweet-content {
  overflow:hidden;
  padding: 0;
  max-height: calc(100vh - 50px);
  .sweet-content-content {
    .form-area {
      width: 100%;
      height: 50vh;
      position: relative;
      &.form-area--full {
        height: 85vh;
      }
      .loading-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        .loading-mask-info {
          text-align: center;
          width: 80%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #4bb08d;
          font-size: 18px;
        }
      }
      .relation-form-modal-iframe {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
