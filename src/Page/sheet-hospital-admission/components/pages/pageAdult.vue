<template>
  <div class="adult-Container">
    <div v-if="route" class="tool-con" flex-box="1">
      <sheetTool :formCodeFy='formCode' ref="sheetHospitalAdmissionTool"></sheetTool>
    </div>
    <div :class="[route&&'sheetTable-contain']" @click="handleIsLeaveTip">
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
    </div>
  </div>
</template>

<script>
import RenderForm from "@/Page/sheet-hospital-admission/components/Render/main.vue";
import { getOldFormCode } from "@/Page/sheet-hospital-admission/components/Render/common.js";
import sheetTool from "@/Page/sheet-hospital-admission/components/sheet-tool/sheet-tool.vue";
import BusFactory from "vue-happy-bus";
import common from "@/common/mixin/common.mixin.js";
import { getPatientInfo } from '../../api'
import form from '@/store/module/form';

export default {
  name: "page",
  mixins: [common],
  components: {
    RenderForm,
    sheetTool
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
      lock: false,
      formCode: 'E2332',
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
    if(this.route){
      this.$nextTick(()=>{
        this.bus.$emit("setHosptialAdmissionLoading", true);
        this.bus.$emit("setIsNewForm", false);
        this.bus.$emit("getHEvalBlockList", this.$route.query);
        this.$store.commit("upPatientInfo", this.$route.query);
      })
    }
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
    route(){
      return this.$route.path === '/admissionPageAdult2'
    },
    // formCode() {
    //   try {
    //     console.log(this.formObj, this.formObj.formSetting, 'code值查询问题')
    //     return this.formObj.formSetting.formInfo.formCode;
    //   } catch (error) {
    //   }
    //   return "E2332";
    // }
  },
  created() {
    this.bus.$on("openHosptialAdmissionForm", this.openForm);
    this.bus.$on("closeHosptialAdmissionForm", this.closeForm);
    this.bus.$on("setHosptialAdmissionPageMessage", this.setMessage);

    this.bus.$on("setFormLocker", (lock = false) => {
      this.lock = lock;
    });

    // 加载loading状态显示
    this.bus.$on("setHosptialAdmissionLoading", config =>this.setHosptialAdmissionLoading(config) );
    this.initial();
    this.loading = false;
  },
  methods: {
    setHosptialAdmissionLoading(config){
      console.log("setHosptialAdmissionLoading",config)
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
    },
    // 初始化话表内容渲染
    initial(patient = null, isDevMode = false) {
      this.loading = true;
      // 主表结构
      let file = null
      if (this.HOSPITAL_ID === 'nfyksdyy'){
        file = JSON.parse(
        JSON.stringify(require("../data/formNfyksdyy/adult/入院评估.form.json"))
      )
      } else if (this.HOSPITAL_ID === 'whyx') {
        file = JSON.parse(
          JSON.stringify(require("../data/formWhyx/adult/入院评估.form.json"))
        )
      } else{
        file = JSON.parse(
        JSON.stringify(require("../data/formFoshanrenyi/adult/入院评估.form.json"))
      )
      }


      let title = "";
      try {
        file.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
      } catch (error) {
      }
      // 主表字段对照表 - 待确认
      let schemes = JSON.parse(
        JSON.stringify(require("../data/formSchemes/入院评估.schemes.json"))
      );
      // 主表下拉框选项字典表
      let dictionary = null
      if (this.HOSPITAL_ID === 'nfyksdyy') {
         dictionary = JSON.parse(JSON.stringify(require("../data/formNfyksdyy/adult/formDictionary/入院评估.dictionary.nfyksdyy.json")))
      } else if (this.HOSPITAL_ID === 'whyx') {
        dictionary = JSON.parse(JSON.stringify(require("../data/formWhyx/adult/formDictionary/入院评估.dictionary.whyx.json")))
      } else{
        dictionary = JSON.parse(JSON.stringify(require("../data/formFoshanrenyi/adult/formDictionary/入院评估.dictionary.foshanrenyi.json")))
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
      // contexts = require.context('../data/formFoshanrenyi/adult/formDialog', true, /\.json$/);
    //   if (this.HOSPITAL_ID === 'liaocheng') {
    //     contexts = require.context('../data/formDialogLiaoc', true, /\.json$/);
    //   } else if (['lyxrm', 'stmz'].includes(this.HOSPITAL_ID)) {
    //     contexts = require.context('../data/formDialogLyxrm', true, /\.json$/);
    //   } else if (this.HOSPITAL_ID === 'qhwy') {
    //     contexts = require.context('../data/formDialogQhwy', true, /\.json$/);
    //   } else if (this.HOSPITAL_ID === 'foshanrenyi') {
    //     contexts = require.context('../data/foshanrenyi/formDialog', true, /\.json$/);
    //   } else if (this.HOSPITAL_ID === 'lyyz') {
    //     contexts = require.context('../data/formDialogLyyz', true, /\.json$/);
      // } else
     if (this.HOSPITAL_ID === 'nfyksdyy') {
        contexts = require.context('../data/formNfyksdyy/adult/formDialog', true, /\.json$/);
      } else if (this.HOSPITAL_ID === 'whyx') {
        contexts = require.context('../data/formWhyx/adult/formDialog', true, /\.json$/);
      } else {
        contexts = require.context('../data/formFoshanrenyi/adult/formDialog', true, /\.json$/);
      }
      contexts.keys().forEach((context, b, c, d) => {
        let djson = contexts(context);
        // console.log(djson, context, '弹出框key')
        try {
          djson.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
        } catch (error) {
        }

        // if (djson.schemes) {
        //   let fromName = context.replace("./", "").replace(".json", "");

        //   console.log(fromName, '弹出框文件')
        //   let hospitalSchemes = {
        //     'liaocheng':'formSchemesLiaoc',
        //     'lyxrm':'formSchemesLyxrm',
        //     'stmz':'formSchemesLyxrm',
        //     'qhwy':'formSchemesQhwy',
        //     'lyyz':'formSchemesLyyz',
        //     'nfyksdyy':'formSchemesNfyksdyy',
        //   }
        //   let schemesJson = null
        //   if (['liaocheng', 'lyxrm', 'qhwy', 'lyyz', 'stmz','nfyksdyy'].includes(this.HOSPITAL_ID)) {
        //     schemesJson = require(`../data/${hospitalSchemes[this.HOSPITAL_ID]}/${fromName}.txt.json`)
        //   } else {
        //     schemesJson = require(`../data/formSchemes/${fromName}.txt.json`)
        //   }
        //   let schemes = JSON.parse(JSON.stringify(schemesJson));

        //   djson.schemes = schemes;
        //   djson.schemesObj = {};
        //   djson.schemes.map(key => {
        //     djson.schemesObj[key.name] = key.title;
        //   });
        // }

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
          try {
            title = djson.formSetting.formTitle.formName;
            this.setPatientInfo(djson, patient);
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
    async openForm(config,scrollHeight=0) {
      let isDevMode = config.isDevMode || false;
      let patient = config.patient;
      let formObj = config.formObj;
      this.status = config.patient.status;

      // 请求接口获取数据填充
    //   if (['liaocheng','lyyz','qhwy'].includes(this.HOSPITAL_ID)) {
    //     const {data: {data}} = await getPatientInfo(config.patient.patientId, config.patient.visitId)
    //     if(!formObj.I001014 && !['liaocheng'].includes(this.HOSPITAL_ID)){
    //       formObj.I001014 = data.chargeType  // 费别
    //     }
    //     formObj.I001003 = data.nation // 名族
    //   }
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

      if(!config.title){
         // 滚动到顶端
      document.querySelector(".sheetTable-contain").scrollTop = scrollHeight
      document.querySelector(".sheetTable-contain").style.background =
        "#DFDFDF";
      }

      setTimeout(() => {
        //数据回填表单
        this.fillForm(formObj.model);
        this.bus.$emit("setHosptialAdmissionLoading", false);
      }, 100);
    },
    updateFunc(value) {
      console.log("updateFunc!!", value);
    },
    getOldFormInfo(callback = null) {
      if (this.formCode && this.wardCode) {
        getOldFormCode(this.formCode, this.wardCode).then(res => {
          if (!res) {
            return {};
          }
          let {
            data: {data: oldFormInfo}
          } = res;
          this.oldFormInfo = oldFormInfo;
          this.$store.commit(
            "upOldFormInfo",
            JSON.parse(JSON.stringify(oldFormInfo))
          );
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
            // 文本回填
            if (
              this.$root.$refs[this.formCode][key] &&
              ["text", "textarea"].indexOf(
                this.$root.$refs[this.formCode][key].type
              ) > -1
            ) {
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
                textResult = this.$root.$refs[this.formCode][
                  key
                  ].checkValueRule(element);
                this.$root.$refs[this.formCode][key].setCurrentValue(element);
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
              if (element) {
                let value = element + "";
                let arr = value.split(",");
                if (arr) {
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
                        if (value.includes(c)) {
                          this.$root.$refs[this.formCode][key][c].runTasks(true);
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
    },
    // 点击使用是修改，就将他设置为没有保存
    handleIsLeaveTip(){
      // 离开表单是否保存
      this.$store.commit("upIsLeaveTip", false);
    }
  },

  beforeRouteLeave(to, from, next) {
    if(['nfyksdyy', 'whyx'].includes(this.HOSPITAL_ID) && from.path == '/admissionPageAdult2' && !this.$store.state.admittingSave.isLeaveTip ){
    window.app
      .$confirm("入院评估（成人），离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then((res) => {
        this.$store.commit("upIsLeaveTip", true);
        next();
      });
    }else if(this.HOSPITAL_ID == 'foshanrenyi' && !this.$store.state.admittingSave.isLeaveTip ){
      window.app
      .$confirm("是否保存一体化评估内容", "提示", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then((res) => {
        this.bus.$emit("tosave")
        this.$store.commit("upIsLeaveTip", true);
        next();
      });
    }else{
       next();
    }
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.adult-Container{
  height: calc(100% - 50px);
}
.sheetTable-contain
  height: calc(100% - 41px);
  background #DFDFDF
  overflow auto
  padding 15px 5px 0 15px
  box-sizing border-box
  margin 0 auto 20px
  position relative
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
