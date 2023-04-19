
<template>
  <span
    :style="[(obj.label||obj.suffixDesc || alertMessage || obj.marginLeft || obj.prefix) && {display: 'flex', alignItems: 'center', margin:'0 0 5px 0', marginLeft: obj.marginLeft},obj.outSpanStyle]"
    :ref="refName"
  >
  <!-- 警报icon -->
    <div
      v-if="obj.type === 'input' && alertMessage"
      class="alert-message"
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
          width="14"
        />
      </el-tooltip>
    </div>
    <span
      v-if="obj.label"
      :style="{width: obj.labelWidth, textAlign: 'right', paddingRight: '10px'}"
    >
      <span style="font-size: 12px;" :style="obj.labelStyle" :class="obj.labelClass">{{obj.label}}</span>
    </span>

    <span v-if="obj.prefix" style="font-size: 12px; width: 48px">{{obj.prefix}}</span>
    <el-input
      v-model="inputValue"
      :id="getUUID()"
      :style="[obj.style, obj.inputWidth && {width: obj.inputWidth}]"
      :ref="obj.name"
      :name="obj.name"
      v-if="obj.type==='input'"
      :placeholder="obj.dialog ? '点击评估' : (obj.placeholder?obj.placeholder:'空')"
      :class="model === 'development' ? 'development-model' : (obj.class||'')"
      :size="obj.size||''"
      :type="obj.inputType||'text'"
      :rows="reactiveRows(obj.name, 54, 2, 200)"
      :disabled="!!obj.disabled || isDisabled(obj)"
      :readonly="obj.readOnly?obj.readOnly:false"
      v-bind="obj.props"
      @change="inputChange($event, obj)"
      @dblclick.native.stop="inputClick($event, obj)"
      @click.stop="inputFocus($event, obj); obj.readOnly && inputClick($event, obj)"
      @focus="inputFocus($event, obj)"
      @blur.stop="inputBlur"
      @keydown.native="inputKeyDown($event, obj)"
    >
      <span slot="append" class="suffixDesc-text" v-if="obj.postText">!!!{{obj.postText}}</span>
    </el-input>
    <openFormSum @scoreListSum="scoreListsum" @changetableSum='changetablesum' @click="tableScoreSum()" :dialogTable='tableScore'></openFormSum>
    <faceForm @scoreListFace="scoreListFace" @changetableFace='changetableface' @click="tableScoreFace()" :dialogTableFace='tableScore1'></faceForm>
    <adultForm @scoreListAdult="scoreListAdult" @changetableAdult='changetableAdult' @click="tableScoreAdult()" :dialogTableAdult='tableScore2'></adultForm>
    <severForm @scoreListSever="scoreListSever" @changetableSever='changetableSever' @click="tableScoreSever()" :dialogTableSever='tableScore3'></severForm>
     <childForm @scoreListChild="scoreListChild" @changetableChild='changetableChild' @click="tableScoreChild()" :dialogTableChild='tableScore4'></childForm>
    <span
      :class="['post-text', obj.suffixclass]"
      v-if="obj.postText||obj.suffixDesc"
      v-html="obj.postText||obj.suffixDesc"
      :id="obj.name"
    ></span>
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import { setTimeout } from "timers";
// import autoComplete from "./autoComplete.vue"
import openFormSum from './modal/openFormsum/sumForm'
import faceForm from './modal/faceForm/index'
import adultForm from './modal/adultForm/index'
import severForm from './modal/severForm/index'
import childForm from './modal/childForm/index'
import moment from "moment";

export default {
  name: "InputBox",
  props: {
    obj: Object,
    formObj: Object,
    col: {
      type: Number,
      default: 1
    },
    model: {
      type: String,
      default: "normal"
    },
    property: {
      type: Object,
      default: () => new Object()
    }
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
      tableScore:false,
      tableScore1:false,
      tableScore2:false,
      tableScore3:false,
      tableScore4:false,
      alertMessage: "",
      alertImg: require("@/assets/img/预警@2x.png"),
      alertActivated: false,
      currentRule: {},
      refName: 'inputBox' + this.obj.name + this.obj.title
      
    };
  },
  computed: {
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0001";
    }
  },
  watch: {
    inputValue(valueNew, oldvaule) {
      if(valueNew == 'NRS(数字疼痛分级法)'){
        this.tableScoreSum();
      }else if(valueNew == 'WONG_BAKER(面部表情评分法)'){
        this.tableScoreFace();
      }else if(valueNew == '成人疼痛行为评估量表'){
        this.tableScoreAdult();
      }else if(valueNew == '重症监护患者疼痛观察工具'){
        this.tableScoreSever();
      }else if(valueNew == '小儿疼痛行为评估量表'){
        this.tableScoreChild();
      }

      if (this.model === "normal") {
        this.formObj.model[this.obj.name] = valueNew;
        this.checkValueRule(valueNew);
        this.obj.value = valueNew;
      }
      /** 如果存在clone ref */
      return valueNew;
    },
    obj: {
      handler(curVal, oldVal) {
        if (
          this.obj &&
          this.obj.hasOwnProperty("value") > -1 &&
          curVal.value != undefined
        ) {
          this.inputValue = curVal.value + "";
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.$refs[this.refName]) {
      this.$root.$refs[this.formCode][this.refName] = this.$refs[this.refName];
    }

    let refName = this.obj.name;
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = new Array();
    }

    if (!this.$root.$refs[this.formCode][this.obj.name]) {
      this.$root.$refs[this.formCode][this.obj.name] = new Array();
    }

    if (this.$refs[refName]) {
      this.$refs[refName]["childObject"] = this.obj;
      this.$refs[refName]["checkValueRule"] = this.checkValueRule;
      if (this.obj.isClone) {
        this.$root.$refs[this.formCode][refName + "_clone"] = this.$refs[
          refName
        ];
        this.isClone = true;
      } else {
        this.$root.$refs[this.formCode][refName] = this.$refs[refName];
      }
    }
    if (
      this.obj &&
      this.obj.hasOwnProperty("value") > -1 &&
      this.obj.value &&
      this.obj.value.constructor === Array
    ) {
      this.inputValue = this.obj.value.toString();
    }
    if (this.model === "development") {
      this.obj.class = "development-model";
    }
    if (this.obj.hasOwnProperty("focus") && this.obj.focus === true) {
      this.$refs[refName].$refs.input.focus();
    }
  },
  created() {
    if(this.obj.name == "I385031" && (this.formObj.model.I385031 == '' || this.formObj.model.I385031 == null)){
      this.formObj.model.I385031 = '_'
    }
    let refName = this.obj.name + "";
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
      if (options && options.length > 0) {
        if (options[0].constructor === Object) {
          this.obj.options = options;
        } else {
          this.obj.options = [];
          options.map(item => {
            this.obj.options.push({ name: item, code: item, pinyin: "" });
          });
        }
      }
    } catch (error) {
      //
      console.log(error);
    }
  },
  methods: {
    reactiveRows(key, maxLength, minRows, maxRows) {
      if (this.formObj.model[key]) {
        let number = this.formObj.model[key].replace(/[^0-9]/ig,""); 
        let word = this.formObj.model[key].replace(/[^a-z]+/ig,"");
        let char = this.formObj.model[key].split('').filter(i => i == ',').join('')
        let curLength = (this.formObj.model[key].length - number.length - word.length - char.length) + ((number.length + word.length + char.length) / 2)
        if(Math.ceil(curLength / maxLength) > minRows) {
          if(maxRows) {
            return (Math.ceil(curLength / maxLength) >= maxRows ? maxRows : Math.ceil(curLength / maxLength))
          } else {
            return Math.ceil(curLength / maxLength)
          }
        } else {
          return minRows
        }
      } else {
        return minRows
      }
    },
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
       this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    scoreListFace(val){
       this.formObj.model["evalScore"] = val;
       this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    scoreListAdult(val){
       this.formObj.model["evalScore"] = val;
       this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    scoreListSever(val){
       this.formObj.model["evalScore"] = val;
       this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    scoreListChild(val){
       this.formObj.model["evalScore"] = val;
       this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(val);
    },
    checkValueRule(valueNew) {
      let textResult = valueNew;
      // 初始化
      this.obj.style = "";
      this.alertMessage = "";
      this.currentRule = {};
      if (
        this.obj.hasOwnProperty("rule") !== -1 &&
        this.obj.rule &&
        this.obj.rule.constructor === Array
      ) {
        // console.log("rule:", this.obj.rule);
        // 遍历规则
        this.obj.rule.map(r => {
          let [min, max] = [Number(r.min), Number(r.max)];
          let value = Number(valueNew);
          min = isNaN(min) ? 0 : min;
          max = isNaN(max) ? 0 : max;
          value = value === NaN ? 0 : value;

          // 计算BMI
          if (r.name === "计算BMI") {
            if (
              this.$root.$refs[this.formCode][r.height] &&
              this.$root.$refs[this.formCode][r.weight] &&
              this.$root.$refs[this.formCode][r.result]
            ) {
              let height =
              this.formObj.model[r.height] ||
                ~~this.$root.$refs[this.formCode][r.height].currentValue ||
                0;
              let weight =
                ~~this.$root.$refs[this.formCode][r.weight].currentValue ||
                this.formObj.model[r.weight] ||
                0;
              if (
                r.weight2 &&
                this.$root.$refs[this.formCode][r.weight2] &&
                ["NaN", "0"].indexOf(
                  Number(
                    this.$root.$refs[this.formCode][r.weight2].currentValue
                  ) + ""
                ) == -1
              ) {
                weight =
                  ~~this.$root.$refs[this.formCode][r.weight2].currentValue ||
                  this.formObj.model[r.weight2] ||
                  ~~this.$root.$refs[this.formCode][r.weight].currentValue ||
                  this.formObj.model[r.weight] ||
                  0;
              }
              let result = '';
              if(isNaN(Number(height)) && isNaN(Number(weight)) ){
                result = this.formObj.model[r.result]
                this.$root.$refs[this.formCode][r.result].setCurrentValue(
                result
                );
                this.formObj.model[r.result] = result
                }else{
                result = weight / Math.pow(height / 100, 2).toFixed(2);
                result = isNaN(Number(result)) || !isFinite(result) ? 0 : result;
                this.$root.$refs[this.formCode][r.result].setCurrentValue(
                result ? result.toFixed(2) : ""
                );
                this.formObj.model[r.result] = result ? result.toFixed(2) : "";
              }

            }
          }
          this.checkSlashValue(valueNew, r)
          // 判断规则
          if (r.min && r.max && (value >= min && value < max)) {
            this.obj.style = r.style;
            if (r.message) {
              this.alertMessage = r.message + "";
              this.alertActivated = true;
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
              this.$root.$refs[this.formCode][this.obj.name].setCurrentValue(
                r.display
              );
            }
            textResult = r.display ? r.display : "";
            // return textResult;
          } else if (r.equal && r.equal === valueNew) {
            this.obj.style = r.style;
            // this.$refs[this.obj.name].$refs.input.style = this.obj.style;
            // 替换显示 r.display
            if (
              r.display &&
              this.$refs[this.obj.name] &&
              this.$refs[this.obj.name].hasOwnProperty("type") &&
              this.$refs[this.obj.name].type === "text"
            ) {
              this.$refs[this.obj.name].setCurrentValue(r.display);
              this.$root.$refs[this.formCode][this.obj.name].setCurrentValue(
                r.display
              );
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
              this.$root.$refs[this.formCode][this.obj.name].setCurrentValue(
                r.display
              );
            }
            textResult = r.display ? r.display : "";
          } else if (r.scoreMin && r.scoreMax && valueNew) {
            let [scoreMin, scoreMax] = [Number(r.scoreMin), Number(r.scoreMax)];
            let score = Number(valueNew.split("分")[0]);
            scoreMin = scoreMin === NaN ? 0 : scoreMin;
            scoreMax = scoreMax === NaN ? 0 : scoreMax;
            score = score === NaN ? 0 : score;
            if (
              r.scoreMin &&
              r.scoreMax &&
              (score >= scoreMin && score < scoreMax)
            ) {
              this.obj.style = r.style;
            }
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.indexOf) {
            if ((valueNew + "").indexOf(r.indexOf) > -1) {
              this.obj.style = r.style;
            }
          } else if (r.split && valueNew && valueNew.indexOf(r.split) > -1) {
            if (r.maxs) {
              let arr = valueNew.split(r.split) || [];
              // console.log(arr, "arr", r.split, "split", valueNew, "valueNew");
              if (r.maxs.length === arr.length) {
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i] && arr[i] > r.maxs[i]) {
                    this.obj.style = r.style;
                  }
                }
              }
            }
            if (r.mins) {
              let arr = valueNew.split(r.split) || [];
              if (r.mins.length === arr.length) {
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i] && arr[i] <= r.mins[i]) {
                    this.obj.style = r.style;
                  }
                }
              }
            }
          }
          /**回显光标定位*/
          else if(r.cursorReposition && isClick) {
            let positionList = r.cursorReposition.find(item => {return item.value === valueNew })
            let target = this.$refs[this.obj.name].$refs.input
            if(positionList) {
              target.focus();
              this.$nextTick(()=>{
                target.setSelectionRange(positionList.position, positionList.position);
              })
            }
          }
        });
      }
      // if (this.$refs && this.$refs[this.obj.name]) {
      try {
        this.$refs[this.obj.name].$refs.input.style = this.obj.style;
      } catch (error) {}

      // this.$root.$refs[this.formCode][this.obj.name].$refs.input.style = this.obj.style;
      // }
      return textResult;
    },
    inputBlur(e) {
      // console.log("inputBlur", e);
      // console.log(this.formObj.model);
       setTimeout(() => {
        if (
          this.formObj.model.I618004 == "否" &&
          this.formObj.model.I618005 == "否" &&
          this.formObj.model.I618006 == "否" &&
          this.formObj.model.I618007 == "否"
        ) {
      //
        if (this.$root.$refs[this.formCode]["evalScore"] && this.formObj.model.I618004) {
          try {
            this.formObj.model["evalScore"] = 0;
            this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(0);
            let textResult = this.$root.$refs[this.formCode][
              "evalDesc"
              ].checkValueRule(0);

            this.formObj.model["evalDesc"] = "无营养风险";
            this.$root.$refs[this.formCode]["evalDesc"].setCurrentValue(
              "无营养风险"
            );
            this.$root.$refs[this.formCode]["evalDesc"].checkValueRule(
              "无营养风险"
            );
          } catch (error) {
            console.log(error);
          }
        }
      }else {
           if (this.$root.$refs[this.formCode]["evalScore"]&& this.formObj.model.I618004) {
          try {
            this.formObj.model["evalScore"] = ' ';
            this.$root.$refs[this.formCode]["evalScore"].setCurrentValue('');

            this.formObj.model["evalDesc"] = "";
            this.$root.$refs[this.formCode]["evalDesc"].setCurrentValue(
              ""
            );
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
      if (child.dateTimeType && child.dateTimeType === "date") {
        this.inputValue = moment().format("YYYY/MM/DD")
      } else if (child.dateTimeType && child.dateTimeType === "datetime") {
        this.inputValue = moment().format("YYYY-MM-DD HH:mm")
      } else if (child.dateTimeType && child.dateTimeType === "date2") {
        this.inputValue = moment().format("YYYY-MM-DD")
      }

      let self = this;
      let xy = e.target.getBoundingClientRect();
      let delt = xy.height;

      if (this.$refs[this.obj.name]) {
        this.$refs[this.obj.name].$el.style.outline = "none";
        this.$refs[this.obj.name].$el.style.backgroundColor = "transparent";
      }

      if (this.obj.name === "signerName") {
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
              "min-width": "max-content"
            },
            data: dataList,
            callback: function(data) {
              if (data) {
                // 单选
                if (!multiplechoice || multiplechoice == false) {
                  obj[key] = data.code;
                  self.inputValue = data.name;
                  self.checkValueRule(data.name);
                }
                //
                // 多选
                if (multiplechoice === true) {
                  let values = obj[key] ? obj[key].split(",") : [];
                  // 新增选项
                  if (!obj[key] || obj[key].indexOf(data.code) === -1) {
                    // values.push(data.code);
                    values = [...values, data.code];
                  } else if (obj[key] && obj[key].indexOf(data.code) > -1) {
                    // 反选选项
                    values = values.filter(v => {
                      return v != data.code;
                    });
                  }
                  obj[key] = values + "";
                  self.inputValue = obj[key] + "";
                  e.target.focus();
                }
                //
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
            id: key
          });
        }
      }
    },
    inputChange(e, child) {
      if (
        this.model === "development" &&
        this.property &&
        this.obj.title &&
        typeof this.property[this.obj.title] === "string"
      ) {
        this.property[this.obj.title] = this.inputValue;
      }
    },
    inputClick(e, child) {
      if (child.dialog) {
        try {
          child.dialog["callback"] = res => {
          };
          this.$root.$refs.dialogBox.openBox(child.dialog, this.inputValue); //$el draggable
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    inputKeyDown(e, child) {

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
      } else if (e.keyCode === 13 && e.target.$rightNode) {
        if (!this.$root.$refs.autoInput.getStatus()) {
          e.target.$rightNode.focus();
        }
      } else if (e.keyCode === 38) {
        // 38 ArrowUp
        try {
          let upNode = e.target;
          for (let i = 0; i < this.col; i++) {
            upNode = upNode.$leftNode;
          }
          while (upNode && upNode.disabled === true) {
            for (let i = 0; i < this.col; i++) {
              upNode = upNode.$leftNode;
            }
          }
          if (upNode) {
            upNode.focus();
          }
        } catch (error) {
          //
        }
      } else if (e.keyCode === 40) {
        // 40 ArrowDown
        try {
          let downNode = e.target;
          for (let i = 0; i < this.col; i++) {
            downNode = downNode.$rightNode;
          }
          while (downNode && downNode.disabled === true) {
            for (let i = 0; i < this.col; i++) {
              downNode = downNode.$rightNode;
            }
          }
          if (downNode) {
            downNode.focus();
          }
        } catch (error) {
          //
        }
      }

    },

    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    /**通过配置
     * isDisabledRules:
     * [{
     *   type: 'equal'||'notequal',
     *   reqCode:'',
     *   valList: [],
     *   whiteList: []
     * }]
     * 动态修改属性disabled*/
    isDisabled(obj) {
      if(obj.isDisabledRules) {
        if(obj.isDisabledRules.some(rule => {
          //当 绑定值(this.formObj.model[rule.key]) 在valList内 [valist.includes(this.formObj.model[rule.key])]时禁用
          if(rule.type === 'equal') {
            //不存在值，默认不禁用
            if(!this.formObj.model[rule.key]) return false
            //有禁用白名单，优先先判断
            if(rule.whiteList) {
              if(rule.whiteList.some(val => {
                return this.formObj.model[rule.key] && this.formobj.model[rule.key].includes(val)
              })) return false
            }
            return rule.valList.some(val => { return this.formObj.model[rule.key].includes(val) })
          }
          //当 绑定值(this.formObj.model[rule.key])不在valList内 [!valist.includes(this.formObj.model[rule.key])]时禁用
          else if(rule.type === 'notEqual') {
            //不存在值，默认禁用
            if(!this.formObj.model[rule.key]) return true
            //有’非‘禁用白名单，优先先判断
            if(rule.whiteList) {
              if(rule.whiteList.some(val => {
                return this.formObj.model[rule.key] && this.formObj.model[rule.key].includes(val)
              })){ return true }
            }
            return !rule.valList.some(val => { return this.formObj.model[rule.key].includes(val) })
          }else {
            console.warn(`isDisabledRules no Types! ${rule.key}`);
          }
        }))
          return true;
      }
      return false;
    },
    /**有斜杠的值，一般有两个数据 */
    checkSlashValue(value, r) {
      if (!(r.min && r.max && value)) return
      if (r.min.indexOf('/') > -1 && r.max.indexOf('/') > -1) {
        let [min0,min1] = r.min.split('/')
        let [max0,max1] = r.max.split('/')
        let [nv0, nv1 = ''] = (value || '').split('/')
        let v0 = Number(nv0)
        let v1 = Number(nv1)
        min0 = isNaN(min0) ? 0 : min0;
        max0 = isNaN(max0) ? 0 : max0;
        min1 = isNaN(min1) ? 0 : min1;
        max1 = isNaN(max1) ? 0 : max1;
        let showM0 = v0 >= min0 && v0 < max0
        let showM1 =  nv1 && v1 >= min1 && v1 < max1
        if (r.message && (showM0 || showM1) ) {
          const mArr = r.message.split('/')

          this.alertMessage = mArr.filter((v, i) => [showM0, showM1][i]).join('\n');
          this.alertActivated = true;
          this.currentRule = { ...r };
        }
      }
    }
  },
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox, .el-select, .is-bordered, .el-checkbox--small, .el-input, .el-input--small, .el-input-group, .el-textarea__inner {
  // margin: 5px 0px;
  vertical-align: middle;
  // width: 100%;

  &:hover {
    outline: 1px solid #4baf8d;
    border: none;
  }

  &:focus {
    outline: none;
    border: 1px solid #4baf8d;
  }

  &:read-only{
    cursor: no-drop!important;
    color: black!important;
  }

  >>>.is-disabled{
      cursor: no-drop!important;
      color: black!important;
  }
}

>>>.el-textarea textarea {
  margin-top: 8px;
  margin-bottom: 10px;
  resize: none;
}

>>>.el-textarea__inner {
  border-radius: 0px!important;
}

>>>.el-input__inner {
  width: 100%;
  border-radius: 0px;
  color: blue!important;
  padding: 0px 5px!important;
  height: 22px!important;
  background: transparent;

  &:focus {
    outline: none;
    border: 1px solid #4baf8d;
    // background #dfffdf
  }
  &:read-only{
    cursor: no-drop!important;
    color: black!important;
  }
  &:placeholder{
    color: #dbe6e4;
  }

  >>>.is-disabled{
      cursor: no-drop!important;
      color: black!important;
  }
}

.el-input {
  // width: 172px;

  &.development-model {
    width: 100% !important;
  }

  &.text-margin-0{
    margin: 0px!important
  }

  >>>.el-input-group__prepend {
    border-radius: 0 !important;
    border: 0px!important;
    background: transparent;
    outline: 0px;
    &:hover {
      outline: 0px solid #4baf8d;
      border: none;
    }
  }
}

.pre-text, .post-text,.suffixDesc-text, >>>.el-input-group__append {
  color: #486a62;
  // background: white;
  border-radius: 0;
  // border: 0px!important;
  // border: 1px solid green;
  // margin-left:2px;
  // background: transparent;
  font-size: 12px!important;
}
.suffixClass {
  display: inline-block;
  width: 120px
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
  // margin -8px -10px -9px -10px
  padding 0px 0px 0 5px
  // border 1px solid green
  // padding 8px 14px 9px 10px
  // background #fff
  font-size 12px!important
}

>>>.el-input:hover {
  .post-text {
    // border-left 1px solid #4baf8d
    background #eef5f5
  }
}
.alert-message {
  cursor: pointer;
  color: red;
  font-size: 12px;
  // position: absolute !important;
  // margin-left: -10px !important;
  position: relative;
  left: 3px;
  margin-top: 0px;
  z-index: 2;
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
.elseFillInput{
  .input-element{
    float: left;
  }
}
</style>
