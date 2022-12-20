<template>
  <div :class="fileJSON ? 'pages':'no-page'" ref="sheetPage">
    <div
      v-if="isShowLoadingLayout"
      class="mask-layout"
      v-loading="loading"
      :element-loading-text="loadingText"
    ></div>
    <div :style="isShow?'display:block':'display:none'">
      <RenderForm ref="renderForm" :sourceObj="fileJSON" :updateFunc="updateFunc" :lock="locker"/>
    </div>
    <div :style="isShow?'display:none':'display:block;backgroud:white;'">
      <div class="null-img" @click="message=='新建评估单'&&bus.$emit('createHEvalForm')">
        <img src="./image/分组.png" alt/>
        <aside>{{ message }}</aside>
      </div>
    </div>
    <!-- <div class="container"></div> -->
  </div>
</template>

<script>
import RenderForm from "@/Page/sheet-hospital-admission/components/Render/main.vue";
import { getOldFormCode } from "@/Page/sheet-hospital-admission/components/Render/common.js";
import BusFactory from "vue-happy-bus";
import common from "@/common/mixin/common.mixin.js";
import { getPatientInfo } from '../../api'

export default {
  name: "page",
  mixins: [common],
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
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = [];
    }

    if (this.$refs["sheetPage"]) {
      this.$refs["sheetPage"]["fillForm"] = this.fillForm;
      this.$root.$refs["sheetPage"] = this.$refs["sheetPage"];
    }
    //
    this.getOldFormInfo(() => {
      this.$refs.renderForm.updateSheet();
      this.loading = false;
    });
  },
  watch: {
    loading(newVal, oldVal) {
      this.isShowLoadingLayout = newVal;
    },
    deptCode(newVal, oldVal) {
      // this.clearAll();
      this.initial();
      this.getOldFormInfo(() => {
        this.$refs.renderForm.updateSheet();
        this.loading = false;
      });
    },
    wardCode(newVal, oldVal) {
      // this.clearAll();
      this.initial();
      this.getOldFormInfo(() => {
        this.$refs.renderForm.updateSheet();
        this.loading = false;
      });
    }
  },
  computed: {
    locker() {
      return this.lock;
    },
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {
      }
      return "E0001";
    }
  },
  created() {
    this.bus.$on("openHosptialAdmissionForm", this.openForm);
    this.bus.$on("closeHosptialAdmissionForm", this.closeForm);
    this.bus.$on("setHosptialAdmissionPageMessage", this.setMessage);

    this.bus.$on("setFormLocker", (lock = false) => {
      this.lock = lock;
    });

    // 加载loading状态显示
    this.bus.$on("setHosptialAdmissionLoading", config => {
      if (typeof config === "object") {
        if (config.hasOwnProperty("status")) {
          this.loading = config.status;
        }
        if (config.hasOwnProperty("isShow")) {
          this.isShow = config.isShow;
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
    // 初始化话表内容渲染
    initial(patient = null, isDevMode = false) {
      this.loading = true;
      // 主表结构
      let file = null
      if (this.HOSPITAL_ID === 'liaocheng') {
        file = JSON.parse(
          JSON.stringify(require("../data/入院评估.form.liaoc.json"))
        )
      } else if (['lyxrm', 'qhwy', 'foshanrenyi','lyyz', 'stmz'].includes(this.HOSPITAL_ID)) {
        file = JSON.parse(
          JSON.stringify(require(`../data/入院评估.form.${this.HOSPITAL_ID}.json`))
        )
      } else {
        file = JSON.parse(
          JSON.stringify(require("../data/入院评估.form.json"))
        )
      }
      let title = "";
      try {
        file.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
      } catch (error) {
      }
      // 主表字段对照表
      let schemes = JSON.parse(
        JSON.stringify(require("../data/formSchemes/入院评估.schemes.json"))
      );
      // 主表下拉框选项字典表
      let dictionary = null
      if (this.HOSPITAL_ID === 'liaocheng') {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/入院评估.dictionary.liaoc.json")))
      } else if (['lyxrm', 'qhwy', 'foshanrenyi','lyyz', 'stmz'].includes(this.HOSPITAL_ID)) {
        dictionary = JSON.parse(JSON.stringify(require(`../data/formDictionary/入院评估.dictionary.${this.HOSPITAL_ID}.json`)))
      } else {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/入院评估.dictionary.json")))
      }
      //
      file.dictionary = dictionary;
      //
      file.schemes = schemes;
      file.schemesObj = {};
      file.schemes.map(key => {
        file.schemesObj[key.name] = key.title;
      });

      /** 自动获取弹窗配置 */
      let contexts = null
      // 这里require.context 方法中的路径如果换成变量形式就会报错。读取不到
      if (this.HOSPITAL_ID === 'liaocheng') {
        contexts = require.context('../data/formDialogLiaoc', true, /\.json$/);
      } else if (['lyxrm', 'stmz'].includes(this.HOSPITAL_ID)) {
        contexts = require.context('../data/formDialogLyxrm', true, /\.json$/);
      } else if (this.HOSPITAL_ID === 'qhwy') {
        contexts = require.context('../data/formDialogQhwy', true, /\.json$/);
      } else if (this.HOSPITAL_ID === 'foshanrenyi') {
        contexts = require.context('../data/foshanrenyi/formDialog', true, /\.json$/);
      } else if (this.HOSPITAL_ID === 'lyyz') {
        contexts = require.context('../data/formDialogLyyz', true, /\.json$/);
      } else {
        contexts = require.context('../data/formDialog', true, /\.json$/);
      }
      contexts.keys().forEach((context, b, c, d) => {
        let djson = contexts(context);
        try {
          djson.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
        } catch (error) {
        }

        if (djson.schemes) {
          let fromName = context.replace("./", "").replace(".json", "");
          let hospitalSchemes = {
            'liaocheng':'formSchemesLiaoc',
            'lyxrm':'formSchemesLyxrm',
            'stmz':'formSchemesLyxrm',
            'qhwy':'formSchemesQhwy',
            'lyyz':'formSchemesLyyz',
          }
          let schemesJson = null
          if (['liaocheng', 'lyxrm', 'qhwy', 'lyyz', 'stmz'].includes(this.HOSPITAL_ID)) {
            schemesJson = require(`../data/${hospitalSchemes[this.HOSPITAL_ID]}/${fromName}.txt.json`)
          } else {
            schemesJson = require(`../data/formSchemes/${fromName}.txt.json`)
          }
          let schemes = JSON.parse(JSON.stringify(schemesJson));

          djson.schemes = schemes;
          djson.schemesObj = {};
          djson.schemes.map(key => {
            djson.schemesObj[key.name] = key.title;
          });
        }

        if (patient) {
          this.setPatientInfo(djson, patient);
        }
        if (djson.constructor === Array) {
          // file.dialogs.push(...djson);
          djson.map(d => {
            title = d.title;
            if (title) {
              file.dialogs[title] = {...d};
            }
          });
        } else {
          // file.dialogs.push(djson);
          // file.dialogs[title + ""] = JSON.parse(JSON.stringify(djson));
          try {
            title = djson.formSetting.formTitle.formName;
            this.setPatientInfo(djson, patient);
            // file.dialogs.push(djson);
            file.dialogs[title + ""] = JSON.parse(JSON.stringify(djson));
          } catch (error) {
          }
        }
      });

      if (patient) {
        // model
        file.model["id"] = patient.id + "" || "";
        this.setPatientInfo(file, patient);
        this.setPatientInfo(window.formObj, patient);
      }
      //
      this.fileJSON = file; //JSON.stringify(file,null,4)

      if (isDevMode) {
        file.pageSetting.mode = "development";
        this.fileJSON.pageSetting.mode = "development";
      }
      // window.file = this.fileJSON;
    },
    // 显示空状态的值
    setMessage(msg) {
      this.message = msg; // "请选择左侧患者~"
    },
    // 关闭表显示
    closeForm() {
      this.isShow = false;
      this.initial();
    },
    async openForm(config) {
      let isDevMode = config.isDevMode || false;
      let patient = config.patient;
      let formObj = config.formObj;
      this.status = config.patient.status;

      // 请求接口获取数据填充
      if (['liaocheng','lyyz','qhwy'].includes(this.HOSPITAL_ID)) {
        const {data: {data}} = await getPatientInfo(config.patient.patientId, config.patient.visitId)
        if(!formObj.I001014 && !['liaocheng'].includes(this.HOSPITAL_ID)){
          formObj.I001014 = data.chargeType  // 费别
        }
        formObj.I001003 = data.nation // 名族
      }
      // alert(status);
      //
      this.isShow = true;

      this.initial(patient, isDevMode);

      if (this.status != "2") {
        this.bus.$emit("setFormLocker", false);
      } else {
        this.bus.$emit("setFormLocker", true);
      }

      // renderForm
      if (isDevMode) {
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
      // console.log("数据回填表单", this.$root.$refs);
    },
    updateFunc(value) {
      console.log("updateFunc!!", value);
    },
    getOldFormInfo(callback = null) {
      // getOldFormCode
      if (this.formCode && this.wardCode) {
        // let res = await
        getOldFormCode(this.formCode, this.wardCode).then(res => {
          if (!res) {
            return {};
          }
          let {
            data: {data: oldFormInfo}
          } = res;
          this.oldFormInfo = oldFormInfo;
          // this.$store.commit("upOldFormInfo", oldFormInfo);
          this.$store.commit(
            "upOldFormInfo",
            JSON.parse(JSON.stringify(oldFormInfo))
          );
          // try {
          //   //
          //   if (this.oldFormInfo && this.oldFormInfo.name) {
          //     this.formObj.formSetting.formTitle.formName = this.oldFormInfo.name;
          //   } else {
          //     this.formObj.formSetting.formTitle.formName = "入 院 评 估 表";
          //   }
          // } catch (error) {}
          //
          if (callback) {
            callback();
          }
        });
      }
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
            // let refObj = this.$root.$refs[this.formCode][key];
            // 文本回填
            if (
              this.$root.$refs[this.formCode][key] &&
              ["text", "textarea"].indexOf(
                this.$root.$refs[this.formCode][key].type
              ) > -1
            ) {
              // this.$root.$refs[this.formCode][key].setCurrentValue(textResult);
              // 状态框回显数据
              if (key === "status") {
                textResult = this.$root.$refs[this.formCode][
                  key
                  ].checkValueRule(element + "");
                this.$root.$refs[this.formCode][key].setCurrentValue(
                  textResult + ""
                );
                this.$root.$refs[this.formCode][key].checkValueRule(
                  textResult + ""
                );
              } else {
                // 输入框回显数据
                // if(element){
                textResult = this.$root.$refs[this.formCode][
                  key
                  ].checkValueRule(element);
                this.$root.$refs[this.formCode][key].setCurrentValue(element);
                // }
                // if (this.$root.$refs[key + "_clone"]) {
                //   this.$root.$refs[key + "_clone"].setCurrentValue(element);
                //   this.$root.$refs[key + "_clone"].checkValueRule(element);
                // }
              }
            }
            // 日期回填
            if (
              this.$root.$refs[this.formCode][key] &&
              this.$root.$refs[this.formCode][key].type === "datetime"
            ) {
              this.$root.$refs[this.formCode][key].currentValue = element || "";
            }
            // 选项回填
            if (
              this.$root.$refs[this.formCode][key] &&
              this.$root.$refs[this.formCode][key].constructor === Array
            ) {
              // if(!element){
              // 初始化清空选卡
              for (const subkey in this.$root.$refs[this.formCode][key]) {
                if (
                  this.$root.$refs[this.formCode][key].hasOwnProperty(subkey)
                ) {
                  this.$root.$refs[this.formCode][key][subkey].model = [];
                  if (
                    this.$root.$refs[this.formCode][key][subkey].$parent &&
                    this.$root.$refs[this.formCode][key][
                      subkey
                      ].$parent.hasOwnProperty("checkboxValue") > -1
                  ) {
                    this.$root.$refs[this.formCode][key][
                      subkey
                      ].$parent.checkboxValue = [];
                  }
                  if (
                    this.$root.$refs[this.formCode]["formGroupColBox" + subkey]
                  ) {
                    this.$root.$refs[this.formCode][
                    "formGroupColBox" + subkey
                      ].hidden = true;
                  }
                }
              }
              //   continue
              // }
              // this.$root.$refs[this.formCode][key] = element.split(',');
              if (element) {
                let value = element + "";
                let arr = value.split(",");
                if (arr) {
                  // for (const subkey in this.$root.$refs[this.formCode][key]) {
                  //   if (this.$root.$refs[this.formCode][key].hasOwnProperty(subkey) && arr.indexOf(subkey)>-1 && this.$root.$refs[this.formCode][key][subkey].hasOwnProperty('type')===-1) {
                  //     this.$root.$refs[this.formCode][key][subkey].model=[]
                  //     this.$root.$refs[this.formCode][key][subkey].push(subkey)
                  //   }
                  // }
                  arr.map(c => {
                    try {
                      if (
                        this.$root.$refs[this.formCode][key][c] &&
                        ["radio", "checkbox"].indexOf(
                          this.$root.$refs[this.formCode][key][c].$parent.obj
                            .type
                        ) > -1
                      ) {
                        this.$root.$refs[this.formCode][key][c].model = [];
                        this.$root.$refs[this.formCode][key][c].model = [c];
                        this.$root.$refs[this.formCode][key][
                          c
                          ].$parent.checkboxValue = [c];
                        //
                        if (value === c) {
                          // if(this.$root.$refs['formGroupColBox'+this.obj.title]){
                          //  this.$root.$refs['formGroupColBox'+this.obj.title].hidden = true
                          // }
                          this.$root.$refs[this.formCode][key][c].runTasks();
                        }
                      }
                    } catch (error) {
                      console.log(
                        "--error选项回填subkey",
                        error,
                        c,
                        key,
                        value,
                        this.$root.$refs[this.formCode][key][c]
                      );

                      // key 红叉辅助单选框组件
                      if (
                        value &&
                        key === window.formObj.design.XRadiobox.name &&
                        value.indexOf(c) > -1
                      ) {
                        this.$root.$refs[this.formCode][key][c].checked = true;
                      }
                      // else{
                      //   this.$root.$refs[this.formCode][key][c].checked = false;
                      // }
                      //
                      //
                      if (
                        this.$root.$refs[this.formCode][key][c].$parent &&
                        this.$root.$refs[this.formCode][key][
                          c
                          ].$parent.hasOwnProperty("checkboxValue") > -1
                      ) {
                        this.$root.$refs[this.formCode][key][
                          c
                          ].$parent.checkboxValue = [];
                      }
                    }
                  });
                }

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
  background: rgba(255, 255, 255, 1);

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
  position: fixed !important;
  width: calc(100% - 200px);
  height: 100%;
  top: 100px;
  left: 200px;
  z-index: 999;
</style>
