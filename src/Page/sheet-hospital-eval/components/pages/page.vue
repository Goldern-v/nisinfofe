<template>
  <div :class="fileJSON ? 'pages':'no-page'">
    <div
      v-if="isShowLoadingLayout"
      class="mask-layout"
      v-loading="loading"
      :element-loading-text="loadingText"
    ></div>
    <div :style="isShow?'display:block':'display:none'">
      <RenderForm :sourceObj="fileJSON" :updateFunc="updateFunc" :lock="status == 1" />
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
/**
 *
 * http://120.25.105.45:9864/crNursing/formPage?wardCode=030502&wardName=神经内科护理单元
 * deptCode=030501
 * deptName=神经内科病区
 * bedLabel=05
 * bedNo=5
 * patientId=71025238
 * visitId=8
 * name=尹解放
 * sex=男
 * age=68岁
 * birthday=1950-05-07 00%3A00%3A00
 * inpNo=348371
 * admissionDate=2019-03-12 15%3A00%3A39
 * inpDay=48
 * doctorInCharge=官少兵
 * diagnosis=头晕查因：后循环缺血？，气促查因：气管炎？，冠心病 支架植入术后
 * nursingClass=一级护理
 * patientCondition=普通
 * chargeType=基本险
 * prepayments=1000
 * totalCosts=4012.66
 * isTodayOperation=0
 * isTommorowOperation=0
 * isTodayDischarge=0
 * isTommorowDischarge=0
 * deptLend=
 * lendDeptCode=
 * glFlag=
 * drugGms=
 * weight=55KG
 * height=
 * foodAnDrink=
 * beApprovedType=0
 * newBornOut=
 * isFollow=0
 * sysBedId
 * formLowestStatus=0
 * dangerInMorse=false
 * dangerInYachuang=true
 * hasYachuang=false
 * dangerInTengtong=false
 * dangerInMews=false
 * evalIcons=[object Object]
 * evalIcons=[object Object]
 * evalIcons=[object Object]
 * mewsInstanceDto
 * config
 *
 *  */
import RenderForm from "@/Page/sheet-hospital-eval/components/Render/main.vue";

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
      status: 0
    };
  },
  watch: {
    loading(newVal, oldVal) {
      // console.log("loading", newVal, oldVal, this.isShowLoadingLayout);
      this.isShowLoadingLayout = newVal;
    }
  },
  created() {
    this.bus.$on("openHosptialEvalForm", this.openForm);
    this.bus.$on("closeHosptialEvalForm", this.closeForm);
    this.bus.$on("setHosptialEvalPageMessage", this.setMessage);

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

    this.bus.$on("setHosptialEvalLoading", config => {
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
    initial(patient = null) {
      this.loading = true;
      // 主表结构
      let file = JSON.parse(
        JSON.stringify(require("../data/住院评估.form.json"))
      );
      try {
        file.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
      } catch (error) {}
      // 主表字段对照表
      let schemes = JSON.parse(
        JSON.stringify(require("../data/formSchemes/住院评估.schemes.json"))
      );
      // 主表下拉框选项字典表
      let dictionary = JSON.parse(
        JSON.stringify(
          require("../data/formDictionary/住院评估.dictionary.json")
        )
      );
      //
      // 其他下拉框选项字典表
      let otherDictionary = JSON.parse(
        JSON.stringify(
          require("../data/formDictionary/other.dictionary.json")
        )
      );
      //
      file.dictionary = {...dictionary, ...otherDictionary};
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
      console.log(this.fileJSON, "fileJSON");
      // window.file = this.fileJSON;
    },
    setMessage(msg) {
      this.message = msg; // "请选择左侧患者~"
    },
    closeForm() {
      this.isShow = false;
      this.initial();
      this.loading = false;
    },
    openForm(config) {
      let patient = config.patient;
      let formObj = config.formObj;
      this.status = config.patient.status;
      // alert(status);
      //
      this.isShow = true;
      console.log("openForm!!", patient);

      this.initial(patient);

      // this.loading = false;

      // 滚动到顶端
      document.querySelector(".sheetTable-contain").scrollTop = 0;
      document.querySelector(".sheetTable-contain").style.background =
        "#DFDFDF";

      setTimeout(() => {
        //数据回填表单
        this.fillForm(formObj.model);
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
            // let refObj = this.$root.$refs[key];
            if (
              this.$root.$refs[key] &&
              (this.$root.$refs[key].type === "text" ||
                this.$root.$refs[key].type === "textarea")
            ) {
              // this.$root.$refs[key].setCurrentValue(textResult);
              if (key === "status") {
                let textResult = this.$root.$refs[key].checkValueRule(
                  element + ""
                );
                console.log(
                  "----this.$root.$refs[key]",
                  this.$root.$refs[key],
                  key,
                  textResult
                );
                this.$root.$refs[key].setCurrentValue(textResult + "");
                this.$root.$refs[key].checkValueRule(textResult + "");
              } else {
                this.$root.$refs[key].setCurrentValue(element);
                this.$root.$refs[key].checkValueRule(element);
                if (this.$root.$refs[key + "_clone"]) {
                  this.$root.$refs[key + "_clone"].setCurrentValue(element);
                  this.$root.$refs[key + "_clone"].checkValueRule(element);
                }
              }
            }
            if (
              this.$root.$refs[key] &&
              this.$root.$refs[key].type === "datetime"
            ) {
              this.$root.$refs[key].currentValue = element;
              console.log("datetime", this.$root.$refs[key], key, element);
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
