<template>
  <div :class="fileJSON ? 'pages':'no-page'" ref="sheetPage">
    <div
      v-if="isShowLoadingLayout"
      class="mask-layout"
      v-loading="loading"
      :element-loading-text="loadingText"
    ></div>
    <div :style="isShow?'display:block':'display:none'">
      <RenderForm ref="renderForm" :sourceObj="fileJSON" :updateFunc="updateFunc" :lock="locker" />
    </div>
    <div :style="isShow?'display:none':'display:block;backgroud:white;'">
      <div class="null-img" @click="bus.$emit('createHEvalForm')">
        <img src="./image/分组.png" alt />
        <aside>{{message}}</aside>
      </div>
    </div>
    <!-- <div class="container"></div> -->
  </div>
</template>

<script>
import RenderForm from "@/Page/sheet-hospital-admission/components/Render/main.vue";

import BusFactory from "vue-happy-bus";

export default {
  name: "page",
  components: {
    RenderForm
  },
  data() {
    return {
      bus: BusFactory(this),
      fileJSON: "",
      loadingText: "数据载入中...",
      loading: false,
      isShow: false,
      isShowLoadingLayout: true,
      message: "请选择左侧患者~",
      status: 0,
      lock: false
    };
  },
  mounted() {
    if (this.$refs["sheetPage"]) {
      this.$refs["sheetPage"]["fillForm"] = this.fillForm;
      this.$root.$refs["sheetPage"] = this.$refs["sheetPage"];
    }
  },
  watch: {
    loading(newVal, oldVal) {
      console.log("loading", newVal, oldVal, this.isShowLoadingLayout);
      this.isShowLoadingLayout = newVal;
    }
  },
  computed: {
    locker() {
      return this.lock;
    }
  },
  created() {
    this.bus.$on("openHosptialAdmissionForm", this.openForm);
    this.bus.$on("closeHosptialAdmissionForm", this.closeForm);
    this.bus.$on("setHosptialAdmissionPageMessage", this.setMessage);

    this.bus.$on("setFormLocker", (lock = false) => {
      this.lock = lock;
    });

    // this.bus.$on("updateFormUIData", res => {
    //   // itemData  master
    //   let {
    //     data: {
    //       data: { itemData: itemData, master: master }
    //     }
    //   } = res;
    //   let model = { ...itemData, ...master };
    //   window.formObj.model = { ...model };
    //   this.fillForm();
    // });

    this.bus.$on("setHosptialAdmissionLoading", config => {
      if (typeof config === "object") {
        if (config.hasOwnProperty("status")) {
          this.loading = config.status;
        }
        if (config.hasOwnProperty("msg")) {
          this.loadingText = config.msg;
        } else {
          this.loadingText = "数据载入中...";
        }
      } else {
        this.loading = config;
        this.loadingText = "数据载入中...";
      }
    });

    this.initial();
    this.loading = false;
  },
  methods: {
    initial(patient = null, isDevMode = false) {
      this.loading = true;
      // 主表结构
      let file = JSON.parse(
        JSON.stringify(require("../data/入院评估.form.json"))
      );
      try {
        file.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
      } catch (error) {}
      // 主表字段对照表
      let schemes = JSON.parse(
        JSON.stringify(require("../data/formSchemes/入院评估.schemes.json"))
      );
      // 主表下拉框选项字典表
      let dictionary = JSON.parse(
        JSON.stringify(
          require("../data/formDictionary/入院评估.dictionary.json")
        )
      );
      //
      file.dictionary = dictionary;
      //
      file.schemes = schemes;
      file.schemesObj = {};
      file.schemes.map(key => {
        file.schemesObj[key.name] = key.title;
      });

      /** 自动获取弹窗配置 */
      const contexts = require.context("../data/formDialog", true, /\.json$/);
      contexts.keys().forEach((context, b, c, d) => {
        let djson = contexts(context);
        try {
          djson.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
        } catch (error) {}

        if (djson.schemes) {
          let fromName = context.replace("./", "").replace(".json", "");

          let schemes = JSON.parse(
            JSON.stringify(require(`../data/formSchemes/${fromName}.txt.json`))
          );

          djson.schemes = schemes;
          djson.schemesObj = {};
          djson.schemes.map(key => {
            djson.schemesObj[key.name] = key.title;
          });
        }

        if (patient) {
          // console.log(patient, "patientpatientpatientpatient");
          this.setPatientInfo(djson, patient);
        }
        if (djson.constructor === Array) {
          file.dialogs.push(...djson);
        } else {
          file.dialogs.push(djson);
        }
      });

      if (patient) {
        // model
        file.model["id"] = patient.id + "" || "";
        this.setPatientInfo(file, patient);
        this.setPatientInfo(window.formObj, patient);
      }
      console.log("file", file, window.formObj);
      //
      this.fileJSON = file; //JSON.stringify(file,null,4)

      if (isDevMode) {
        file.pageSetting.mode = "development";
        this.fileJSON.pageSetting.mode = "development";
      }
      console.log(this.fileJSON, "fileJSON");
      // window.file = this.fileJSON;
    },
    setMessage(msg) {
      this.message = msg; // "请选择左侧患者~"
    },
    closeForm() {
      this.isShow = false;
      this.initial();
    },
    openForm(config) {
      let isDevMode = config.isDevMode || false;
      let patient = config.patient;
      let formObj = config.formObj;
      this.status = config.patient.status;
      // alert(status);
      //
      this.isShow = true;
      console.log("openForm!!", patient, config);

      this.initial(patient, isDevMode);

      if (this.status != "2") {
        this.bus.$emit("setFormLocker", false);
      } else {
        this.bus.$emit("setFormLocker", true);
      }

      // renderForm
      if (isDevMode) {
        console.log(this.$refs, this.$refs["renderForm"]);
        this.$refs["renderForm"].runDevMode();
      }

      // this.loading = false;

      // 滚动到顶端
      document.querySelector(".sheetTable-contain").scrollTop = 0;
      document.querySelector(".sheetTable-contain").style.background =
        "#DFDFDF";

      setTimeout(() => {
        //数据回填表单
        this.fillForm(formObj.model);
        this.bus.$emit("setHosptialAdmissionLoading", false);
      }, 100);
      console.log("数据回填表单", this.$root.$refs);
    },
    updateFunc(value) {
      console.log("updateFunc!!", value);
    },
    setPatientInfo(json, patient) {
      // 设置 formHeads
      try {
        json.formSetting.formHeads.map(h => {
          if (patient[h.name]) {
            h.value = patient[h.name];
          }
        });
      } catch (error) {
        //
      }
    },
    fillForm(formObj = window.formObj.model) {
      if (formObj) {
        for (const key in formObj) {
          if (formObj.hasOwnProperty(key)) {
            let element = formObj[key];
            let textResult = "";
            // let refObj = this.$root.$refs[key];
            // 文本回填
            if (
              this.$root.$refs[key] &&
              ["text", "textarea"].indexOf(this.$root.$refs[key].type) > -1
            ) {
              // this.$root.$refs[key].setCurrentValue(textResult);
              // 状态框回显数据
              if (key === "status") {
                textResult = this.$root.$refs[key].checkValueRule(element + "");
                // console.log(
                //   "----this.$root.$refs[key]",
                //   this.$root.$refs[key],
                //   key,
                //   textResult
                // );
                this.$root.$refs[key].setCurrentValue(textResult + "");
                this.$root.$refs[key].checkValueRule(textResult + "");
              } else {
                // 输入框回显数据
                // if(element){
                textResult = this.$root.$refs[key].checkValueRule(element);
                this.$root.$refs[key].setCurrentValue(element);
                // }

                // if(key==='signerName'){
                //   console.log(
                //     "-!!-this.$root.$refs[key]",
                //     this.$root.$refs[key],
                //     key,
                //     this.$root.$refs[key].type,
                //     textResult,
                //     element,
                //     formObj[key],
                //     formObj
                //   );
                //  }

                // if (this.$root.$refs[key + "_clone"]) {
                //   this.$root.$refs[key + "_clone"].setCurrentValue(element);
                //   this.$root.$refs[key + "_clone"].checkValueRule(element);
                // }
              }
            }
            // 日期回填
            if (
              this.$root.$refs[key] &&
              this.$root.$refs[key].type === "datetime"
            ) {
              this.$root.$refs[key].currentValue = element||"";
              console.log("datetime", this.$root.$refs[key], key, element);
            }
            // 选项回填
            if (
              this.$root.$refs[key] &&
              this.$root.$refs[key].constructor === Array
            ) {
              // if(!element){
              // 初始化清空选卡
              for (const subkey in this.$root.$refs[key]) {
                if (this.$root.$refs[key].hasOwnProperty(subkey)) {
                  this.$root.$refs[key][subkey].model = [];
                  if (
                    this.$root.$refs[key][subkey].$parent &&
                    this.$root.$refs[key][subkey].$parent.hasOwnProperty(
                      "checkboxValue"
                    ) > -1
                  ) {
                    this.$root.$refs[key][subkey].$parent.checkboxValue = [];
                  }
                  if (this.$root.$refs["formGroupColBox" + subkey]) {
                    this.$root.$refs["formGroupColBox" + subkey].hidden = true;
                  }
                }
              }
              //   continue
              // }
              // this.$root.$refs[key] = element.split(',');
              if (element) {
                // console.log('~~~~~!!',key,formObj,element)
                let value = element + "";
                let arr = value.split(",");
                if (arr) {
                  // for (const subkey in this.$root.$refs[key]) {
                  //   if (this.$root.$refs[key].hasOwnProperty(subkey) && arr.indexOf(subkey)>-1 && this.$root.$refs[key][subkey].hasOwnProperty('type')===-1) {
                  //     this.$root.$refs[key][subkey].model=[]
                  //     this.$root.$refs[key][subkey].push(subkey)
                  //     console.log("--选项回填subkey", subkey, key,this.$root.$refs[key][subkey]);
                  //   }
                  // }
                  arr.map(c => {
                    try {
                      if (
                        this.$root.$refs[key][c] &&
                        ["radio", "checkbox"].indexOf(
                          this.$root.$refs[key][c].$parent.obj.type
                        ) > -1
                      ) {
                        this.$root.$refs[key][c].model = [];
                        this.$root.$refs[key][c].model = [c];
                        this.$root.$refs[key][c].$parent.checkboxValue = [c];
                        //
                        if (value === c) {
                          // if(this.$root.$refs['formGroupColBox'+this.obj.title]){
                          //  this.$root.$refs['formGroupColBox'+this.obj.title].hidden = true
                          // }
                          this.$root.$refs[key][c].runTasks();
                        }
                        //
                        // console.log("--选项回填subkey", c, key,this.$root.$refs[key][c]);
                      }
                    } catch (error) {
                      console.log(
                        "--error选项回填subkey",
                        error,
                        c,
                        key,
                        value,
                        this.$root.$refs[key][c]
                      );

                      // key 红叉辅助单选框组件
                      if (
                        value &&
                        key === window.formObj.design.XRadiobox.name &&
                        value.indexOf(c) > -1
                      ) {
                        this.$root.$refs[key][c].checked = true;
                      }
                      // else{
                      //   this.$root.$refs[key][c].checked = false;
                      // }
                      //
                      //
                      if (
                        this.$root.$refs[key][c].$parent &&
                        this.$root.$refs[key][c].$parent.hasOwnProperty(
                          "checkboxValue"
                        ) > -1
                      ) {
                        this.$root.$refs[key][c].$parent.checkboxValue = [];
                      }
                    }
                  });
                }
                console.log("选项回填", this.$root.$refs[key], key, value, arr);
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.pages
    width: 100%;
.no-page
    background: white;
    width: 100%;
    height: 100%;
    margin: -15px -5px 0 -15px;
    padding: 0px 5px 15px 15px;

.container
    width: 100%;
    height: 100%;
    padding: 5mm;
    background: white;
    margin: auto auto;
    background:rgba(255,255,255,1);
    /* box-shadow:0px 5px 10px 0px rgba(0,0,0,0.5); */

.null-img
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    margin auto
    width 200px
    height 240px
    padding 20px
    background white
    border 1px solid #ADB4BA
    border-radius 0px
    cursor pointer
    aside
        color: #cecece;
        font-size 16px
        margin-top 10px
        text-align center
        // font-weight bold
    &:hover
      box-shadow: 0px 0px 10px #888
.mask-layout
  // border 1px solid red
  position: fixed!important;
  width: calc(100% - 200px);
  height: 100%;
  top: 100px;
  left: 200px;
  z-index: 999;
</style>
