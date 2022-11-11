
<template>
  <span style="display: inline-flex">
    <!-- 警报icon -->
    <div
      v-if="obj.type === 'input' && alertMessage"
      :class="
        obj.suffixDesc || obj.postText ? 'alert-message-post' : 'alert-message'
      "
    >
      <el-tooltip
        class="item"
        effect="light"
        :enterable="false"
        placement="top"
      >
        <div class="el-tooltip-content" slot="content">
          <div v-html="alertMessage || ''"></div>
        </div>
        <img
          :src="alertImg"
          :alt="obj.title"
          :style="obj.tips ? 'margin-left:28px!important' : ''"
          :name="`${obj.name}_${obj.title}_${obj.label}_img`"
          @click="alertClick($event, obj)"
          width="14"
        />
      </el-tooltip>
    </div>

    <span
      style="margin: 0 0px 0 0; display: inline-flex; align-items: center"
      :style="obj.label && { display: 'flex', alignItems: 'center' }"
    >
      <!-- <span style="" :style="(obj.label||obj.suffixDesc)  && {display: 'flex', alignItems: 'center' }"> -->
      <!-- <autoComplete v-if="isShow" ref="autoInput" /> -->
      <!-- <el-input v-if="obj.type==='input'" v-model="checkboxValue" border size="small" :label="obj.title" :class="obj.class" :style="obj.style">{{obj.title}}</el-input> -->
      <span
        v-if="obj.label"
        :style="[
          obj.spanStyle,
          {
            width: obj.labelWidth,
            textAlign: 'right',
            paddingRight: obj.paddingRight || '0px',
            marginBottom: obj.marginBottom,
          },
        ]"
      >
        <span
          style="font-size: 12px; padding: 0px 0px"
          :style="obj.labelStyle"
          :class="obj.labelClass"
          >{{ obj.label }}:</span
        >
      </span>

      <!-- v-autoComplete="{dataList: obj.options, obj:formObj.model, key: obj.name}" -->
      <el-input
        v-model="inputValue"
        :id="getUUID()"
        :style="[obj.style, obj.inputWidth && { width: obj.inputWidth }]"
        :ref="obj.name"
        :name="obj.name"
        :title="obj.title || obj.label"
        v-if="obj.type === 'input'"
        :placeholder="
          obj.dialog ? '点击评估' : obj.placeholder ? obj.placeholder : '空'
        "
        :class="model === 'development' ? 'development-model' : obj.class || ''"
        :size="obj.size || ''"
        :type="obj.inputType || 'text'"
        :disabled="obj.disabled ? true : false"
        :readonly="obj.readOnly ? obj.readOnly : false"
        v-bind="obj.props"
        @change="inputChange($event, obj)"
        @dblclick.native.stop="inputClick($event, obj)"
        @click.native.stop="
          inputFocus($event, obj);
          obj.readOnly && inputClick($event, obj);
        "
        @focus="inputFocus($event, obj)"
        @blur.stop="inputBlur"
        @keydown.native="inputKeyDown($event, obj)"
        :clearable="true"
      >
        <span class="pre-text" v-if="obj.prefixDesc" slot="prepend">{{
          obj.prefixDesc
        }}</span>
        <!-- <span slot="append"> -->
        <!-- <i
        slot="append"
        v-if="obj.options&&!obj.suffixDesc"
        @click.prevent.stop="()=>{}"
        class="el-input__icon el-icon-caret-top"
        ></i>-->
        <!-- <span slot="append" class="post-text" v-if="obj.suffixDesc">{{obj.suffixDesc}}</span> -->
        <!-- </span> -->
        <!-- <template slot="append" v-if="obj.options"> -->
        <!-- </template> -->
      </el-input>
      <openFormSum
        @scoreListSum="scoreListsum"
        @changetableSum="changetablesum"
        @click="tableScoreSum()"
        :dialogTable="tableScore"
      ></openFormSum>
      <faceForm
        @scoreListFace="scoreListFace"
        @changetableFace="changetableface"
        @click="tableScoreFace()"
        :dialogTableFace="tableScore1"
      ></faceForm>
      <adultForm
        @scoreListAdult="scoreListAdult"
        @changetableAdult="changetableAdult"
        @click="tableScoreAdult()"
        :dialogTableAdult="tableScore2"
      ></adultForm>
      <severForm
        @scoreListSever="scoreListSever"
        @changetableSever="changetableSever"
        @click="tableScoreSever()"
        :dialogTableSever="tableScore3"
      ></severForm>
      <childForm
        @scoreListChild="scoreListChild"
        @changetableChild="changetableChild"
        @click="tableScoreChild()"
        :dialogTableChild="tableScore4"
      ></childForm>
      <!-- <span>{{obj.suffixDesc}}</span> -->
      <!-- <span class="post-text" v-if="obj.suffixDesc" v-html="obj.suffixDesc"></span> -->
      <span class="post-text" v-if="obj.postText">{{ obj.postText }}</span>
    </span>
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import { setTimeout } from "timers";
// import autoComplete from "./autoComplete.vue"
import { checkRule } from "./js/ruleHandler";
import openFormSum from "./modal/openFormsum/sumForm";
import faceForm from "./modal/faceForm/index";
import adultForm from "./modal/adultForm/index";
import severForm from "./modal/severForm/index";
import childForm from "./modal/childForm/index";

export default {
  name: "InputBox",
  props: {
    obj: Object,
    formObj: Object,
    col: {
      type: Number,
      default: 1,
    },
    model: {
      type: String,
      default: "normal",
    },
    property: {
      type: Object,
      default: () => new Object(),
    },
  },
  components: {
    // autoComplete
    openFormSum,
    faceForm,
    adultForm,
    severForm,
    childForm,
  },
  data() {
    return {
      inputValue: "",
      isShow: true,
      isClone: false,
      alertMessage: "",
      alertImg: require("./image/预警@2x.png"),
      alertActived: false,
      currentRule: {},
      tableScore:false,
      tableScore1:false,
      tableScore2:false,
      tableScore3:false,
      tableScore4:false,
    };
  },
  computed: {
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0100";
    },
  },
  watch: {
    "inputValue"(newVal){
       if(newVal == 'NRS(数字疼痛分级法)'){
        this.tableScoreSum();
      }else if(newVal == 'WONG_BAKER(面部表情评分法)'){
        this.tableScoreFace();
      }else if(newVal == '成人疼痛行为评估量表'){
        this.tableScoreAdult();
      }else if(newVal == '重症监护患者疼痛观察工具'){
        this.tableScoreSever();
      }else if(newVal == '小儿疼痛行为评估量表'){
        this.tableScoreChild();
      }
    },
    "formObj.model.I618004"(newVal) {
      console.log(newVal, "formObj.model.I618004");

    },
    // inputValue(valueNew, oldvaule) {
    //   console.log("watch:inputValue:", [valueNew], [oldvaule]);
    //   if (this.model === "normal") {
    //     this.formObj.model[this.obj.name] = valueNew+"";
    //     this.checkValueRule(valueNew+"");
    //     this.obj.value = valueNew+"";
    //     console.log("obj:", this.obj);
    //   }
    //   //
    //   /** 如果存在clone ref */
    //   // setTimeout(() => {
    //   //   if (this.isClone) {
    //   //     this.$root.$refs[this.obj.name].setCurrentValue(valueNew);
    //   //     this.$root.$refs[this.obj.name].$parent.checkValueRule(valueNew);
    //   //   } else if (this.$root.$refs[this.obj.name + "_clone"]) {
    //   //     this.$root.$refs[this.obj.name + "_clone"].setCurrentValue(valueNew);
    //   //     this.$root.$refs[this.obj.name + "_clone"].$parent.checkValueRule(
    //   //       valueNew
    //   //     );
    //   //   }
    //   // }, 100);
    //   return valueNew?valueNew:"";
    // },
    // obj: {
    //   handler(curVal, oldVal) {
    //     // console.log("handler", curVal, oldVal);
    //     if (
    //       this.obj &&
    //       this.obj.hasOwnProperty("value") > -1
    //       && curVal &&
    //       curVal.value != undefined
    //     ) {
    //       this.inputValue = curVal.value + "";
    //     }
    //     // if(this.obj && this.obj.hasOwnProperty('value')>-1 && curVal.value!=undefined &&curVal.value.constructor === Array){
    //     //   this.inputValue = curVal.value + ''
    //     // }
    //   },
    //   deep: true
    // }
  },
  mounted() {

    let refName = this.obj.name + ""; //+this.obj.type.toUpperCase()+(this.obj.title||this.obj.label)
    let refNameTitle = this.obj.title || this.obj.label;
    //
    // let formCode = this.formObj.formSetting.formInfo.formCode;
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = new Object();
    }
    if (!this.$root.$refs[this.formCode][refName]) {
      this.$root.$refs[this.formCode][refName] = [];
    }
    if (this.formCode && this.$refs[refName]) {
      // this.formObj.model[this.obj.name] = this.$refs[refName].currentValue;
      this.$refs[refName]["childObject"] = this.obj;
      this.$refs[refName]["checkValueRule"] = this.checkValueRule;
      // this.$root.$refs[refName] = [...this.$root.$refs[refName],this.$refs[refName]];
      //
      this.$root.$refs[this.formCode][refName][refNameTitle] =
        this.$refs[refName];
    }
    // if (1
    //   this.obj &&
    //   this.obj.hasOwnProperty("value") > -1 &&
    //   this.obj.value &&
    //   this.obj.value.constructor !== Array
    // ) {
    //   // console.log(this.obj, this.obj.value, "aaaaaaaaaaa");
    //   // setTimeout(() => {
    //   //   this.inputValue = this.obj.value;
    //   //   this.$refs[refName].setCurrentValue(this.obj.value + "");
    //   // }, 1000);
    // }
    if (
      this.obj &&
      this.obj.hasOwnProperty("value") > -1 &&
      this.obj.value &&
      this.obj.value.constructor === Array
    ) {
      this.inputValue = this.obj.value + "";
    }
    if (this.model === "development") {
      this.obj.class = "development-model";
    }
    // if (this.obj.hasOwnProperty("focus") && this.obj.focus === true) {
    //   this.$refs[refName].$refs.input.focus();
    //   console.log("focus", this.$refs[refName]);
    // }

    // console.log("inputMounted", this.$refs, this.$root.$refs);
    // focus()  this.$refs.input.value
    // try {
    //   let modelObj = window.formObj.model || this.formObj.model;
    //   if (modelObj && modelObj[refName]) {
    //     this.checkValueRule(modelObj[refName]);
    //     this.$refs[refName].setCurrentValue(modelObj[refName]);
    //   }
    // } catch (error) {
    //   //
    // }
  },
  created() {
    let refName = this.obj.name + "";
    // console.log(
    //   "created:refName",
    //   refName,
    //   window.formObj,
    //   this.formObj,
    //   this.formObj.dictionary
    // );
    try {
      let dictionary = {};
      if (window.formObj && window.formObj.hasOwnProperty("dictionary")) {
        dictionary = window.formObj.dictionary;
      }
      if (this.formObj && this.formObj.hasOwnProperty("dictionary")) {
        dictionary = this.formObj.dictionary;
      }

      let options = dictionary[refName]
        ? dictionary[refName]
        : this.obj.options;
      // console.log("created:options", this.obj.title, options);
      if (options && options.length > 0) {
        if (options[0].constructor === Object) {
          this.obj.options = options;
        } else {
          this.obj.options = [];
          options.map((item) => {
            this.obj.options.push({ name: item, code: item, pinyin: "" });
          });
        }
      }
    } catch (error) {
      //
      console.log(error);
    }

    if (
      this.obj.hasOwnProperty("options") &&
      this.obj.options &&
      this.obj.options.length === 0 &&
      (!this.formObj.dictionary ||
        !this.formObj.dictionary.hasOwnProperty(refName) ||
        !this.formObj.dictionary[refName])
    ) {
      // this.obj["options"] = [{ name: "未测量", code: "未测量", pinyin: "wcl" }];
    }
  },
  methods: {
    // 疼痛评分弹框
    tableScoreSum(){
      this.tableScore =true;
    },
    tableScoreFace(){
      this.tableScore1 =true;
    },
    tableScoreAdult(){
      this.tableScore2 =true;
    },
    tableScoreSever(){
      this.tableScore3 =true;
    },
    tableScoreChild(){
      this.tableScore4 =true;
    },
    changetablesum(flag){
      this.tableScore = flag
    },
    changetableface(flag){
      this.tableScore1 = flag
    },
    changetableAdult(flag){
      this.tableScore2 = flag
    },
    changetableSever(flag){
      this.tableScore3 = flag
    },
    changetableChild(flag){
      this.tableScore4 = flag
    },
    scoreListsum(val){
       this.formObj.model["evalScore"] = val;
        this.setElementValue("evalScore", val);
      //  this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    scoreListFace(val){
       this.formObj.model["evalScore"] = val;
        this.setElementValue("evalScore", val);
      //  this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    scoreListAdult(val){
      this.formObj.model["evalScore"] = val;
      this.setElementValue("evalScore", val);
      //  this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    scoreListSever(val){
       this.formObj.model["evalScore"] = val;
        this.setElementValue("evalScore", val);
      //  this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    scoreListChild(val){
      console.log(val);
       this.formObj.model["evalScore"] = val;
        this.setElementValue("evalScore", val);
      //  this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    checkValueRule(valueNew, repeat = null) {
      // let ageLevel = this.$store.getters.getAgeLevel()
      // console.log('checkValueRule',[valueNew,repeat])
      valueNew = valueNew == "undefined" ? "" : valueNew;
      // let textResult = checkRule({
      //   rule:this.obj.rule,
      //   value:valueNew+"",
      //   obj:this.obj,
      //   formObj:this.formObj,
      //   repeat
      // })

      // return textResult
      // if(!repeat){return}
      let textResult = valueNew + "";
      // textResult = valueNew+"";
      this.obj.style = "";
      this.alertMessage = "";
      this.currentRule = {};
      let agelevel = "";
      //
      if (
        this.obj.hasOwnProperty("rule") !== -1 &&
        this.obj.rule &&
        this.obj.rule.constructor === Array
      ) {
        // console.log("rule:", this.obj.rule);
        this.alertActived = false;
        //
        agelevel = this.$store.getters.getAgeLevel();
        // 遍历规则
        this.obj.rule.map((r) => {
          try {
            let [min, max] = [Number(r.min), Number(r.max)];
            let value = Number(
              valueNew ? (valueNew + "").replace(/[^0-9.]/g, "") : ""
            );
            min = isNaN(min) ? 0 : min;
            max = isNaN(max) ? 0 : max;
            value = value === NaN ? -1 : value;

            // 空
            if (!valueNew) {
              // console.log('[空]检查事件规则',[valueNew, r, value])
              this.setElementStyle(this.obj.name, "");
              return;
            }

            // 计算BMI
            if (r.name === "计算BMI") {
              if (
                this.$root.$refs[this.formCode][r.height] &&
                this.$root.$refs[this.formCode][r.weight] &&
                this.$root.$refs[this.formCode][r.result]
              ) {
                let height =
                  ~~this.getElementValue(r.height) ||
                  this.formObj.model[r.height] ||
                  0;
                let weight =
                  ~~this.getElementValue(r.weight) ||
                  this.formObj.model[r.weight] ||
                  0;
                let result = weight / Math.pow(height / 100, 2).toFixed(2);
                result =
                  isNaN(Number(result)) || !isFinite(result) ? 0 : result;
                //
                this.setElementValue(r.result, result ? result.toFixed(2) : "");
                //
                this.formObj.model[r.result] = result ? result.toFixed(2) : "";
                //
                if (repeat == null) {
                  this.getValueRule(
                    r.result,
                    result ? result.toFixed(2) : "",
                    false
                  );
                }
              }
            }

            // 输入字符自动转换
            // source target string replace
            if (r.name === "输入字符自动转换") {
              if (
                this.$root.$refs[this.formCode][r.source] &&
                this.$root.$refs[this.formCode][r.target] &&
                r.string &&
                valueNew &&
                valueNew.toUpperCase().includes(r.string.toUpperCase())
              ) {
                let regexp = new RegExp(r.string, "g");
                let ret = r.string.replace(regexp, r.replacement || "") || "";
                //
                console.log(
                  "输入字符自动转换",
                  r,
                  r.source,
                  r.target,
                  r.string,
                  r.replacement,
                  [ret],
                  this.getElementValue(r.target)
                );
                //
                this.$nextTick(() => {
                  this.formObj.model[r.target] = ret;
                  this.setElementValue(r.target, ret);
                  if (repeat == null) {
                    this.getValueRule(r.target, ret ? ret : "", false);
                    this.updateAlertBox(ret);
                  }
                });
                //
              }
            }

            // 判断规则
            if (
              valueNew &&
              r.min &&
              r.max &&
              value >= min &&
              value <= max &&
              ((r.agelevel &&
                ((r.agelevel.constructor == String && r.agelevel == agelevel) ||
                  (r.agelevel.constructor == Array &&
                    r.agelevel.indexOf(agelevel) > -1))) ||
                !r.agelevel) &&
              ((r.equal &&
                r.constructor == Object &&
                this.formObj.model[r.equal.key] == r.equal.value) ||
                !r.equal)
            ) {
              this.obj.style = r.style;
              if (r.message) {
                console.log(
                  "rule:message",
                  r.message,
                  [r.min, r.max, value],
                  [min, max, value]
                );
                this.alertMessage = r.message + "";
                this.alertActived = true;
                this.currentRule = { ...r };
                // return;
              }
              // 替换显示 r.display
              if (
                r.display &&
                this.$refs[this.obj.name] &&
                this.$refs[this.obj.name].hasOwnProperty("type") &&
                this.$refs[this.obj.name].type === "text"
              ) {
                this.$refs[this.obj.name].setCurrentValue(r.display);
                // this.$root.$refs[this.obj.name][0].setCurrentValue(r.display);
                this.setElementValue(this.obj.name, r.display);
              }
              textResult = r.display ? r.display : "";
              // return textResult;
            } else if (r.equal && r.equal === valueNew) {
              this.obj.style = r.style;
              if (r.message) {
                console.log("rule:message", r.message);
                this.alertMessage = r.message + "";
                this.alertActived = true;
                this.currentRule = { ...r };
                // return;
              }
              // this.$refs[this.obj.name].$refs.input.style = this.obj.style;
              // 替换显示 r.display
              if (
                r.display &&
                this.$refs[this.obj.name] &&
                this.$refs[this.obj.name].hasOwnProperty("type") &&
                this.$refs[this.obj.name].type === "text"
              ) {
                this.$refs[this.obj.name].setCurrentValue(r.display);
                // this.$root.$refs[this.obj.name][0].setCurrentValue(r.display);
                this.setElementValue(this.obj.name, r.display);
              }
              textResult = r.display ? r.display : "";
              // return textResult;
            } else if (r.equals && r.equals.indexOf(valueNew) !== -1) {
              this.obj.style = r.style;
              // 替换显示 r.display
              if (
                r.display &&
                this.$refs[this.obj.name] &&
                this.$refs[this.obj.name].hasOwnProperty("type") &&
                this.$refs[this.obj.name].type === "text"
              ) {
                this.$refs[this.obj.name].setCurrentValue(r.display);
                // this.$root.$refs[this.obj.name][0].setCurrentValue(r.display);
                this.setElementValue(this.obj.name, r.display);
              }
              textResult = r.display ? r.display : "";
            } else if (r.scoreMin && r.scoreMax && valueNew) {
              let [scoreMin, scoreMax] = [
                Number(r.scoreMin),
                Number(r.scoreMax),
              ];
              let score = Number(valueNew.split("分")[0]);
              console.log(score,'score')
              scoreMin = scoreMin === NaN ? 0 : scoreMin;
              scoreMax = scoreMax === NaN ? 0 : scoreMax;
              score = score === NaN ? 0 : score;
              if (
                r.scoreMin &&
                r.scoreMax &&
                score >= scoreMin &&
                score < scoreMax
              ) {
                this.obj.style = r.style;
              }
              // this.obj.style = Object.assign({}, this.obj.style, r.style);
            } else if (r.indexOf) {
              if ((valueNew + "").indexOf(r.indexOf) > -1) {
                this.obj.style = r.style;
              }
            } else if (
              r.split &&
              valueNew &&
              valueNew.indexOf(r.split) > -1 &&
              ((r.agelevel &&
                ((r.agelevel.constructor == String && r.agelevel == agelevel) ||
                  (r.agelevel.constructor == Array &&
                    r.agelevel.indexOf(agelevel) > -1))) ||
                !r.agelevel)
            ) {
              if (r.maxs) {
                let arr = valueNew.split(r.split) || [];
                console.log(
                  "maxs:",
                  arr,
                  "arr",
                  r.split,
                  "split",
                  valueNew,
                  "valueNew"
                );
                if (r.maxs.length === arr.length) {
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i] && arr[i] > r.maxs[i]) {
                      this.obj.style = r.style;
                      if (r.message) {
                        console.log("rule:message", r.message);
                        this.alertMessage = r.message + "";
                        this.alertActived = true;
                        this.currentRule = { ...r };
                        // return;
                      }
                    }
                  }
                }
              }
              if (r.mins) {
                let arr = valueNew.split(r.split) || [];
                if (r.mins.length === arr.length) {
                  for (let i = 0; i <= arr.length; i++) {
                    if (arr[i] && arr[i] < r.mins[i]) {
                      this.obj.style = r.style;
                      if (r.message) {
                        console.log("rule:message", r.message);
                        this.alertMessage = r.message + "";
                        this.alertActived = true;
                        this.currentRule = { ...r };
                        // return;
                      }
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.log("---error", error);
          }
        });

        this.updateAlertBox(valueNew);
      }
      // if (this.$refs && this.$refs[this.obj.name]) {
      try {
        this.$refs[this.obj.name].$refs.input.style = this.obj.style;
      } catch (error) {}

      // this.$root.$refs[this.obj.name].$refs.input.style = this.obj.style;
      // }
      return textResult;
    },
    updateAlertBox(value) {
      //
      let alertMessageItems = [
        ...this.$root.$refs.tableOfContent.getAlertMessageItems(),
      ];

      // if(this.$root.$refs['tableOfContent']){
      // 未有预警
      if (this.alertActived) {
        // console.log('规则预警结果：SELECT:getAlertMessageItems:',this.alertActived,this.$root.$refs.tableOfContent.getAlertMessageItems())
        // this.currentRule = {...r};
        let hasAlertMessage = false;
        let title = this.obj.title || this.obj.label || "";
        let frequency = this.currentRule.frequency || "";
        let tips = `<span><span style="color:green">${title}</span>:${
          value || ""
        }<span style="color:chocolate">${
          this.obj.suffixDesc || ""
        }</span></span><br><span style="color:red">预警:${
          this.alertMessage
        }</span>`;
        console.log("this.currentRule", this.currentRule);
        if (frequency) {
          tips += `<br><span style="color:black">评估频率:${frequency}</span>`;
        }
        //
        for (let iterator of alertMessageItems) {
          if (iterator.name && iterator.name == this.obj.name) {
            iterator.message = this.alertMessage;
            iterator["value"] = value;
            iterator["tips"] = tips;
            iterator["frequency"] = frequency;
            hasAlertMessage = true;
            break;
          }
        }
        if (hasAlertMessage == false) {
          alertMessageItems = [
            ...alertMessageItems,
            {
              message: this.alertMessage,
              name: this.obj.name,
              title: title,
              obj: this.obj,
              value: value,
              tips: tips,
            },
          ];
        }
        this.$root.$refs.tableOfContent.updateAlertMessageItems(
          alertMessageItems
        );
      } else {
        // if(this.alertMessage){
        // console.log('规则预警结果：SELECT:getAlertMessageItems:',this.alertActived,this.alertMessage,this.$root.$refs.tableOfContent.getAlertMessageItems())
        alertMessageItems = alertMessageItems.filter((item) => {
          return item.name && item.name != this.obj.name;
        });
        this.$root.$refs.tableOfContent.updateAlertMessageItems(
          alertMessageItems
        );
        // }
      }
    },
    inputBlur(e) {
      console.log("inputBlur", e, this.formObj.model);
      console.log(this.formObj.model.I618007 == "否");
      setTimeout(() => {
        if (
          this.formObj.model.I618004 == "否" &&
          this.formObj.model.I618005 == "否" &&
          this.formObj.model.I618006 == "否" &&
          this.formObj.model.I618007 == "否"
        ) {
          this.formObj.model["evalScore"] = 0;
          //
          if (
            this.$root.$refs[this.formCode]["evalScore"] &&
            this.formObj.model.I618004
          ) {
            try {
              this.formObj.model["evalScore"] = 0;
              this.setElementValue("evalScore", 0);
              this.setElementValue("evalDesc", "无营养风险");
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          if (
            this.$root.$refs[this.formCode]["evalScore"] &&
            this.formObj.model.I618004
          ) {
            try {
              this.formObj.model["evalScore"] = "";
              this.setElementValue("evalScore", "");
              this.setElementValue("evalDesc", "");
            } catch (error) {
              console.log(error);
            }
          }
        }
      }, 300);

      // setTimeout(() => {
      //   if(this.$root.$refs.autoInput){
      this.$root.$refs.autoInput.close();
      //   }
      // }, 3000);
      // this.isShow = false
    },
    inputFocus(e, child) {
      // this.isShow = true
      let self = this;
      let xy = e.target.getBoundingClientRect();
      console.log(
        "inputFocus",
        e,
        child,
        this.formObj.model,
        this.inputValue,
        xy,
        this.$refs,
        this.$root.$refs
      );
      let delt = xy.height;

      if (this.$refs[this.obj.name]) {
        this.$refs[this.obj.name].$el.style.outline = "none";
        this.$refs[this.obj.name].$el.style.backgroundColor = "transparent";
      }

      // cancelSignOrAduit formSignOrAudit

      if (this.obj.name === "signerName") {
        // console.log('---',this.obj.name,this.$root.$refs.mainPage)
        if (
          this.$root.$refs.mainPage.formSignOrAudit &&
          this.formObj.model.status == "0"
        ) {
          this.$root.$refs.mainPage.formSignOrAudit();
        } else if (
          this.$root.$refs.mainPage.cancelSignOrAduit &&
          this.formObj.model.status == "1"
        ) {
          this.$root.$refs.mainPage.cancelSignOrAduit();
        }
      } else if (this.obj.name === "auditorName") {
        console.log(
          "---",
          this.obj.name,
          this.$root.$refs,
          this.$root.$refs.mainPage
        );
        if (
          this.$root.$refs.mainPage.formSignOrAudit &&
          this.formObj.model.status == "1"
        ) {
          this.$root.$refs.mainPage.formSignOrAudit({ type: "audit" });
        } else if (
          this.$root.$refs.mainPage.cancelSignOrAduit &&
          this.formObj.model.status == "2"
        ) {
          this.$root.$refs.mainPage.cancelSignOrAduit({ type: "audit" });
        }
      }

      //
      // let autoBox = this.$root.$refs.autoBox.getBoundingClientRect()
      // //
      // if (window.innerHeight - autoBox.bottom < delt) {
      //   delt = autoBox.height - 40
      // }
      //
      if (this.$root.$refs.autoInput) {
        this.$root.$refs.autoInput.close();
      }
      //
      if (this.obj.options) {
        let dataList = this.obj.options;
        let key = this.obj.name;
        let obj = this.formObj.model;
        let multiplechoice = this.obj.multiplechoice
          ? this.obj.multiplechoice
          : false;
        if (this.$root.$refs.autoInput) {
          this.$root.$refs.autoInput.open({
            obj: obj,
            multiplechoice: multiplechoice,
            parentEl: e.target,
            currentValue: this.inputValue,
            style: {
              top: `${xy.top + delt}px`,
              left: `${xy.left}px`,
              width: `${xy.width}px`,
              "min-width": "max-content",
            },
            selectedList: obj[key] ? (obj[key] + "").split(",") : [],
            data: dataList,
            callback: function (data) {
              // console.log('callback',obj,data,e)
              if (obj && data) {
                // 单选
                if (!multiplechoice || multiplechoice == false) {
                  // console.log('==callback',obj,data)
                  obj[key] = data.code;
                  self.inputValue = data.name;
                  self.checkValueRule(data.name);
                }

                // 多选
                if (multiplechoice === true) {
                  let values = obj[key] ? obj[key].split(",") : [];
                  console.log("==多选=callback", values, obj, key, e.target);
                  // 新增选项
                  if (!obj[key] || obj[key].indexOf(data.code) === -1) {
                    // values.push(data.code);
                    values = [...values, data.code];
                  } else if (obj[key] && obj[key].indexOf(data.code) > -1) {
                    // 反选选项
                    values = values.filter((v) => {
                      return v != data.code;
                    });
                  }
                  obj[key] = values + "";
                  self.inputValue = obj[key] + "";
                  // self.checkValueRule(obj[key], true);
                  e.target.focus();
                }

                if (e.target.tagName !== "INPUT") {
                  e.target.innerText = data.name;
                }
                if (e.target.tagName === "INPUT") {
                  e.target.value = data.name;
                }
              }
              // e.target.focus();
              return false;
            },
            id: key,
          });
        }
      }
    },
    inputChange(e, child) {
      console.log(
        "inputChange",
        [e],
        [child],
        [this.formObj.model, this.inputValue]
      );
      let valueNew = this.inputValue;
      // this.$store.commit("upFormObj", JSON.parse(JSON.stringify(this.formObj)));
      // property
      // model  development-model this.model === "development"
      if (
        this.model === "development" &&
        this.property &&
        this.obj.title &&
        typeof this.property[this.obj.title] === "string"
      ) {
        this.property[this.obj.title] = this.inputValue;
      }

      if (this.model === "normal") {
        this.formObj.model[this.obj.name] = valueNew + "";
        window.formObj.model[this.obj.name] = valueNew + "";
        this.checkValueRule(valueNew + "");
        this.obj.value = valueNew + "";
        console.log("obj:", this.obj);
      }

      // if (e.target.tagName !== "INPUT") {
      //   e.target.innerText = data.name;
      // }
      // if (e.target.tagName === "INPUT") {
      //   e.target.value = data.name;
      // }
      // this.setElementValue(child.name, this.inputValue||e.target.innerText)
      // this.getValueRule(child.name, this.inputValue||e.target.innerText)
    },
    inputClick(e, child) {
      console.log("inputClick", e, child, this.formObj.model, e.target.tagName);
      if (child.dialog) {
        console.log("child.dialog", child.dialog, this.$refs, this.$root.$refs);
        try {
          // this.$root.$refs.dialogBox.$el.draggable = true
          child.dialog["callback"] = (res) => {
            console.log("表单填写结果", res);
          };
          this.$root.$refs.dialogBox.openBox(child.dialog, this.inputValue); //$el draggable
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    inputKeyDown(e, child) {
      console.log(
        "inputKeyDown",
        e,
        child,
        e.target.tagName,
        e.keyCode,
        e.key,
        e.target.selectionStart,
        e.target.selectionEnd
      );

      if (
        e.keyCode == 37 &&
        (e.target.selectionStart == 0 ||
          (e.target.selectionStart == null && e.target.selectionEnd == null))
      ) {
        // ArrowLeft
        let leftNode = e.target.$leftNode;
        while (leftNode && leftNode.disabled === true) {
          leftNode = leftNode.$leftNode;
        }
        if (leftNode) {
          leftNode.focus();
        }
        console.log(
          "ArrowLeft",
          e,
          e.target,
          leftNode
          //  leftNode.disabled
        );
      } else if (
        e.keyCode == 39 &&
        (e.target.selectionEnd === e.target.value.length ||
          (e.target.selectionStart == null && e.target.selectionEnd == null))
      ) {
        // ArrowRight
        let rightNode = e.target.$rightNode;
        while (rightNode && rightNode.disabled === true) {
          rightNode = rightNode.$rightNode;
        }
        if (rightNode) {
          rightNode.focus();
        }
        // e.target.$rightNode.focus()
        console.log(
          "ArrowRight",
          e,
          e.target,
          e.target.$rightNode
          // e.target.$rightNode.disabled
        );
      } else if (e.keyCode === 13 && e.target.$rightNode) {
        // 13 Enter
        console.log("Enter", e.target, this.$root.$refs.autoInput.getStatus());
        if (!this.$root.$refs.autoInput.getStatus()) {
          e.target.$rightNode.focus();
        }
        // this.$root.$refs.autoInput.close()
      } else if (e.keyCode === 38) {
        // 38 ArrowUp
        try {
          // let upNode = e.target.$leftNode.$leftNode
          let upNode = e.target;
          for (let i = 0; i < this.col; i++) {
            upNode = upNode.$leftNode;
          }
          while (upNode && upNode.disabled === true) {
            for (let i = 0; i < this.col; i++) {
              upNode = upNode.$leftNode;
            }
            // upNode = upNode.$leftNode.$leftNode
          }
          if (upNode) {
            upNode.focus();
          }
          // e.target.$leftNode.$leftNode.focus()
          console.log("ArrowUp", e, e.target, upNode, this.col);
        } catch (error) {
          //
        }
      } else if (e.keyCode === 40) {
        // 40 ArrowDown
        try {
          // let downNode = e.target.$rightNode.$rightNode
          let downNode = e.target;
          for (let i = 0; i < this.col; i++) {
            downNode = downNode.$rightNode;
          }
          while (downNode && downNode.disabled === true) {
            for (let i = 0; i < this.col; i++) {
              downNode = downNode.$rightNode;
            }
            // downNode = downNode.$rightNode.$rightNode
          }
          if (downNode) {
            downNode.focus();
          }
          // e.target.$rightNode.$rightNode.focus()
          console.log("ArrowUp", e, e.target, downNode, this.col);
        } catch (error) {
          //
        }
      }

      // else if([38,40].indexOf(e.keyCode)===-1){
      //   this.inputFocus(e, child)
      // }
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    alertClick(event) {
      console.log("alertClick", event, this.obj);
    },
    setElementValue(key, value) {
      Object.keys(this.$root.$refs[this.formCode][key]).map((elkey) => {
        this.$root.$refs[this.formCode][key][elkey].setCurrentValue(value);
      });
    },
    setElementStyle(key, value) {
      Object.keys(this.$root.$refs[this.formCode][key]).map((elkey) => {
        Object.keys(this.$root.$refs[this.formCode][key][elkey].$refs).map(
          (ikey) => {
            if (this.$root.$refs[this.formCode][key][elkey].$refs[ikey]) {
              this.$root.$refs[this.formCode][key][elkey].$refs[ikey].style =
                value;
            }
          }
        );
      });
    },
    getElementValue(key) {
      let result = "";
      Object.keys(this.$root.$refs[this.formCode][key]).map((elkey) => {
        try {
          result = this.$root.$refs[this.formCode][key][elkey].currentValue;
        } catch (error) {}
      });
      return result;
    },
    getValueRule(key, value, repeat = true) {
      let textResult = "";
      Object.keys(this.$root.$refs[this.formCode][key]).map((elkey) => {
        try {
          textResult = this.$root.$refs[this.formCode][key][
            elkey
          ].checkValueRule(value, repeat);
        } catch (error) {}
      });
      return textResult;
    },
  },
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox, .el-select, .is-bordered, .el-checkbox--small, .el-input, .el-input--small, .el-input-group, .el-input-group--prepend {
  margin: 5px 0px;
  vertical-align: bottom;

  // width: 100%;
  &:hover {
    // outline: 1px solid #4baf8d;
    border: none;
  }

  &:focus {
    outline: none;
    border: 1px solid #4baf8d;
  }
}

>>>.el-input__inner.el-input__inner.el-input__inner {
  width: 100%;
  border-radius: 0px;
  color: blue;
  padding: 0px 8px !important;
  height: 22px !important;
  background: transparent;
  background: white;
  transition: all 0.3s;

  &:.selected {
    background: yellow;
  }

  &:focus {
    outline: none;
    border: 1px solid #4baf8d;
    // background #dfffdf
  }

  &:read-only {
    cursor: pointer;
  }

  &:placeholder {
    color: #dbe6e4;
  }
}

.el-input {
  width: 227px;

  &.development-model {
    width: 100% !important;
  }

  >>>.el-input-group__prepend {
    border-radius: 0 !important;
  }
}

.pre-text, .post-text, >>>.el-input-group__append {
  color: #486a62;
  background: white;
  border-radius: 0;
  border: 0px !important;
  background: transparent;
  background: white;
  font-size: 12px !important;
}

.el-input__icon {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 0;
  top: 0;
  text-align: center;
  color: rgb(191, 217, 210);
  transition: all 0.3s;
}

.el-input__icon {
  color: rgb(191, 217, 210);
  font-size: 12px;
  transition: transform 0.3s;
  -ms-transform: translateY(-50%) rotate(180deg);
  transform: translateY(-50%) rotateZ(180deg);
  line-height: 16px;
  top: 50%;
  cursor: pointer;
  width: 100%;
  height: auto;
}

.el-icon-caret-top:before {
  content: '\E607';
}

.el-input__icon:after {
  content: '';
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}

.post-text {
  // margin -8px -14px -9px -10px
  // padding 8px 14px 9px 3px
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 5px;
  background: transparent;
  // position: absolute;
  // left: 317px;
}

>>>.el-input:hover {
  .post-text {
    // border-left 1px solid #4baf8d
    background: #eef5f5;
  }
}

.el-input {
  width: 229px;
  width: auto;
}

>>>.el-input__inner:hover {
  border: 1px solid #4baf8d;
}

>>>.sweet-modal .sweet-content .sweet-content-content {
  color: red !important;

  /deep/.el-input {
    width: auto;
  }

  >>>.el-input {
    width: auto;
  }
}

.alert-message {
  cursor: pointer;
  color: red;
  font-size: 12px;
  position: absolute !important;
  margin-left: -10px !important;
  margin-top: 0px;
  z-index: 2;
}

.alert-message-post {
  cursor: pointer;
  color: red;
  font-size: 12px;
  position: absolute !important;
  margin-left: -10px !important;
  margin-top: 0px;
  z-index: 2;
}

>>>.red-border {
  border-color: red !important;
}
</style>

<style lang="scss">
.main-page {
  td:hover {
    .post-text {
      background: #eef5f5;
    }
  }
}
</style>
