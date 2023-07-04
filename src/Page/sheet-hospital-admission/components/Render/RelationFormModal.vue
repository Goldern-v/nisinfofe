<template>
  <sweet-modal
    ref="modal"
    :modalWidth="1000"
    :title="title || '关联表单'"
    @close="handleClose"
    id="relation-form-modal-con"
  >
    <div class="form-area">
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
        v-show="showSignBtn"
        >签名</el-button
      >
    </div>
  </sweet-modal>
</template>

<script>
import commonMixin from "@/common/mixin/common.mixin";
import BusFactory from "vue-happy-bus";
import { devFormUrl, formUrl } from "@/common/pathConfig";
import qs from "qs";

/**关联表单弹窗 */
export default {
  mixins: [commonMixin],
  props: {
    formObj: {
      type: Object,
      default: {},
    }
  },
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
      callbackCode: '',//需要返回入院评估的code值
      callbackInfo: {
        // needScore: ''//是否需要evalScore回传
        // code: '',//需要返回入院评估的code值
        // prefix: '',//返回值的前缀,可以为array[{max:'',min:'',value}]
        // suffix: '',//返回值的后缀，可以为array[{max:'',min:'',value}]
      },
      formCode: null,//表单code
      selectedValue: '', // 下拉选中值
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
    dropDownValue(data) {
      console.log("关联表单下拉值", data)
    },
    handleOpen(payload) {
      this.$refs.modal.open();
      console.log("payload====",payload)
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
      this.callbackInfo = payload && payload.callbackInfo;
      this.formCode = payload && payload.formCode;
      this.selectedValue = payload && payload.valueNew
      this.selectValue = payload && payload.TSInputVal
      //覆写成功回调
      if (payload.callback)
        this.successCallback = (data) => payload.callback(data);
    },
    toClose() {
      if (this.selectValue){
        this.formObj.model[this.callbackInfo.code] = this.selectValue
        //弹窗精准找到需要修改的inputBox
        this.bus.$emit(`updateValue${this.callbackInfo.code}`)
      }
      this.$refs.modal.close();
    },
    handleSave() {
      if (this.useIframe) {
        let target = document.querySelector(".relation-form-modal-iframe");
        if (target && target.contentWindow.todoSave) {
          target.contentWindow.todoSave();
        }

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
      if (this.selectValue){
        this.formObj.model[this.callbackInfo.code] = this.selectValue
        //弹窗精准找到需要修改的inputBox
        this.bus.$emit(`updateValue${this.callbackInfo.code}`)
      }
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
    //成功后返回表单id和evalscore
    successCallback(data){
      console.log(data,'successCallback-default')
      //表单id返回formCode值
      this.formObj.model[this.formCode] = data.master.id;
      if(this.callbackInfo.code && data.master.evalScore) {
        if(this.callbackInfo.needScore){
          //默认传值: prefix + evalScore + suffix
          let resVal = data.master.evalScore;
          let evalScore = data.master.evalScore;
          if(this.callbackInfo.prefix) {
            /**prefix，suffix可通过数组形式判断evalScore值的所处范围来动态添加前、后缀*/
            if(Array.isArray(this.callbackInfo.prefix)){
              this.callbackInfo.prefix.forEach(range =>{
                if(evalScore >= range.min && evalScore <= range.max) {
                  resVal = range.value + resVal
                }
              })
            } else {
              resVal = this.callbackInfo.prefix + resVal;
            }
          }
          if(this.callbackInfo.suffix) {
            if(Array.isArray(this.callbackInfo.suffix)){
              this.callbackInfo.suffix.forEach(range =>{
                if(evalScore >= range.min && evalScore <= range.max) {
                  resVal = resVal + range.value;
                }
              })
            } else {
              resVal = resVal + this.callbackInfo.suffix;
            }
          }
          // this.formObj.modal[this.callbackInfo.id] = data.master.id
          this.formObj.model[this.callbackInfo.code] = (this.callbackInfo.openKeyName ? this.selectedValue + ',' : '') + resVal
        }
      }
      if (this.callbackInfo.defaultName) {
        this.formObj.model[this.callbackInfo.code] = this.callbackInfo.prefix
      }
      if (this.callbackInfo.code && this.callbackInfo.needRiskRank) {
        // 佛一成人单子: 化疗致恶心呕吐（CINV）风险评估单
        this.formObj.model[this.callbackInfo.code] = this.callbackInfo.prefix + data.itemData.I373012
      }
      //弹窗精准找到需要修改的inputBox
      this.bus.$emit(`updateValue${this.callbackInfo.code}`)
    },
  },
  components: {},
};
</script>

<style lang='scss' scoped>
</style>

<style lang="scss">
#relation-form-modal-con .sweet-content {
  padding: 0;
  .sweet-content-content {
    .form-area {
      width: 100%;
      height: calc(100vh - 35vh);
      position: relative;
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
