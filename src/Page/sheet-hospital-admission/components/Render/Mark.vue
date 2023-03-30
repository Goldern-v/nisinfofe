
<template>
  <span
    :style="[{ display: 'flex', alignItems: 'start', alignItems: 'center'}]"
    :class="obj.class"
  >
    <!-- <autoComplete v-if="isShow" ref="autoInput" /> -->
    <!-- <el-input v-if="obj.type==='input'" v-model="checkboxValue" border size="small" :label="obj.title" :class="obj.class" :style="obj.style">{{obj.title}}</el-input> -->
    <span
      v-if="obj.label"
      :style="{
        width: obj.labelWidth,
        textAlign: `${obj.textAlign || 'right'} `,
        paddingRight: '10px',
      }"
    >
      <span
        style="font-size: 13px; font-weight: normal"
        :style="obj.labelStyle"
        :class="obj.labelClass"
        >{{ obj.label }}</span
      >
    </span>
    <!-- v-autoComplete="{dataList: obj.options, obj:formObj.model, key: obj.name}" -->
    <el-input
      type="textarea"
      v-model="inputValue"
      :id="getUUID()"
      :style="[obj.style, obj.inputWidth && { width: obj.inputWidth }]"
      :ref="obj.name"
      :name="obj.name"
      :rows="reactiveRows(obj.name, obj.lineFeedFize || 50, 2, 200)"
      :placeholder="'空'"
      :class="model === 'development' ? 'development-model' : obj.class || ''"
      :size="obj.size || ''"
      :disabled="obj.disabled ? true : false"
      :readonly="obj.readOnly ? obj.readOnly : false"
      @change="inputChange($event, obj)"
      @dblclick.native.stop="inputClick($event, obj)"
      @click.native.stop="
        inputFocus($event, obj);
        obj.readOnly && inputClick($event, obj);
      "
      @focus="inputFocus($event, obj)"
      @blur.native.stop="inputBlur"
      @keydown.native="inputKeyDown($event, obj)"
    >
      <span class="pre-text" v-if="obj.prefixDesc" slot="prepend">{{
        obj.prefixDesc
      }}</span>
      <!-- <span slot="append"> -->
      <i
        slot="append"
        v-if="obj.options && !obj.suffixDesc"
        @click.prevent.stop="() => {}"
        class="el-input__icon el-icon-caret-top"
      ></i>
      <span slot="append" class="post-text" v-if="obj.suffixDesc">{{
        obj.suffixDesc
      }}</span>
      <!-- </span> -->
      <!-- <template slot="append" v-if="obj.options"> -->
      <!-- </template> -->
    </el-input>
    <span class="muban" @click="openTemplateModal">+模板</span>
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import { setTimeout } from "timers";
// import autoComplete from "./autoComplete.vue"

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
  },
  data() {
    return {
      inputValue: "",
      isShow: true,
      isClone: false,
    };
  },
  computed: {
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0001";
    },
  },
  watch: {
    inputValue(valueNew, oldvaule) {
      if (this.model === "normal") {
        this.formObj.model[this.obj.name] = valueNew;
        this.checkValueRule(valueNew);
        this.obj.value = valueNew;
        console.log("obj:", this.obj);
      }
      /** 如果存在clone ref */
      setTimeout(() => {
        if (this.isClone) {
          this.$root.$refs[this.formCode][this.obj.name].setCurrentValue(
            valueNew
          );
          this.$root.$refs[this.formCode][this.obj.name].$parent.checkValueRule(
            valueNew
          );
        } else if (this.$root.$refs[this.formCode][this.obj.name + "_clone"]) {
          this.$root.$refs[this.formCode][
            this.obj.name + "_clone"
          ].setCurrentValue(valueNew);
          this.$root.$refs[this.formCode][
            this.obj.name + "_clone"
          ].$parent.checkValueRule(valueNew);
        }
      }, 100);

      /** 如果是身高体重，自动计算bmi指数 */
      if (this.obj.name == "I100009" || this.obj.name == "I100010") {
        let sg = Number(this.$root.$refs.I100009.$parent.inputValue) / 100;
        let tz = this.$root.$refs.I100010.$parent.inputValue;
        let result = tz / (sg * sg);
        result &&
          (this.$root.$refs.I100011.$parent.inputValue = result.toFixed(2));
      }
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
        // if(this.obj && this.obj.hasOwnProperty('value')>-1 && curVal.value!=undefined &&curVal.value.constructor === Array){
        //   this.inputValue = curVal.value + ''
        // }
      },
      deep: true,
    },
  },
  mounted() {
    // try {
    //   this.inputValue = this.formObj.model[this.obj.name];
    // } catch (error) {}
    let refName = this.obj.name; //+this.obj.type.toUpperCase()+(this.obj.title||this.obj.label)
    if (this.$refs[refName]) {
      this.formObj.model[this.obj.name] = this.$refs[refName].currentValue;
      this.$refs[refName]["childObject"] = this.obj;
      this.$refs[refName]["checkValueRule"] = this.checkValueRule;
      if (this.obj.isClone) {
        this.$root.$refs[this.formCode][refName + "_clone"] =
          this.$refs[refName];
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
      console.log("focus", this.$refs[refName]);
    }
  },
  created() {
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
      this.obj.options.length === 0 &&
      !this.formObj.dictionary[refName]
    ) {
      this.obj["options"] = [{ name: "未测量", code: "未测量", pinyin: "wcl" }];
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
    checkValueRule(valueNew) {
      let textResult = valueNew;
      this.obj.style = "";
      if (
        this.obj.hasOwnProperty("rule") !== -1 &&
        this.obj.rule &&
        this.obj.rule.constructor === Array
      ) {
        // 遍历规则
        this.obj.rule.map((r) => {
          let [min, max] = [Number(r.min), Number(r.max)];
          let value = Number(valueNew);
          min = min === NaN ? 0 : min;
          max = max === NaN ? 0 : max;
          value = value === NaN ? 0 : value;

          // 判断规则
          if (r.min && r.max && value >= min && value < max) {
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
            // return textResult;
          } else if (r.equal && r.equal === valueNew) {
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
              score >= scoreMin &&
              score <= scoreMax
            ) {
              this.obj.style = r.style;
            }
          } else if (r.indexOf) {
            if ((valueNew + "").indexOf(r.indexOf) > -1) {
              this.obj.style = r.style;
            }
          } else if (r.split && valueNew && valueNew.indexOf(r.split) > -1) {
            if (r.maxs) {
              let arr = valueNew.split(r.split) || [];
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
                  if (arr[i] && arr[i] < r.mins[i]) {
                    this.obj.style = r.style;
                  }
                }
              }
            }
          }
        });
      }
      try {
        this.$refs[this.obj.name].$refs.input.style = this.obj.style;
      } catch (error) {}

      return textResult;
    },
    inputBlur(e) {
      this.$root.$refs.autoInput.close();
    },
    inputFocus(e, child) {
      if (this.HOSPITAL_ID === 'foshanrenyi') {
        this.$root.$refs.templateSlideFoshanshiyi.open(this.obj.name, false);
      }
      let self = this;
      let xy = e.target.getBoundingClientRect();
      let delt = xy.height;

      if (this.$refs[this.obj.name]) {
        this.$refs[this.obj.name].$el.style.outline = "none";
        this.$refs[this.obj.name].$el.style.backgroundColor = "transparent";
      }
      if (this.$root.$refs.autoInput) {
        this.$root.$refs.autoInput.close();
      }
      //
      if (this.obj.options) {
        let dataList = this.obj.options;
        let key = this.obj.name;
        let obj = this.formObj.model;
        if (this.$root.$refs.autoInput) {
          this.$root.$refs.autoInput.open({
            parentEl: e.target,
            currentValue: this.inputValue,
            style: {
              top: `${xy.top + delt}px`,
              left: `${xy.left}px`,
              width: `${xy.width}px`,
              "min-width": "max-content",
            },
            data: dataList,
            callback: function (data) {
              if (data) {
                obj[key] = data.code;
                self.inputValue = data.name;
                self.checkValueRule(data.name);
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
          this.$root.$refs.dialogBox.openBox(child.dialog, this.inputValue); //$el draggable
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    inputKeyDown(e, child) {
      if (e.keyCode === 37 && e.target.selectionStart === 0) {
        let leftNode = e.target.$leftNode;
        while (leftNode && leftNode.disabled === true) {
          leftNode = leftNode.$leftNode;
        }
        if (leftNode) {
          leftNode.focus();
        }
      } else if (
        e.keyCode === 39 &&
        e.target.selectionEnd === e.target.value.length
      ) {
        let rightNode = e.target.$rightNode;
        while (rightNode && rightNode.disabled === true) {
          rightNode = rightNode.$rightNode;
        }
        if (rightNode) {
          rightNode.focus();
        }
      } else if (e.keyCode === 13) {
        if (!this.$root.$refs.autoInput.getStatus()) {
          e.target.$rightNode.focus();
        }
      } else if (e.keyCode === 38) {
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
    openTemplateModal() {
      if (this.HOSPITAL_ID === 'foshanrenyi')
      {
        this.$root.$refs.templateSlideFoshanshiyi.open(this.obj.name);

      } else {
        this.$root.$refs.templateSlide.open(this.obj.name);
      }
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
    outline: 1px solid #4baf8d;
    border: none;
  }

  &:focus {
    outline: none;
    border: 1px solid #4baf8d;
  }
}

>>>.el-textarea__inner.el-textarea__inner.el-textarea__inner {
  // width: 100%;
  border-radius: 0px;

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
  // width: 172px;
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
  margin: -8px -14px -9px -10px;
  padding: 8px 14px 9px 10px;
  background: #fff;
}

>>>.el-input:hover {
  .post-text {
    border-left: 1px solid #4baf8d;
    background: #eef5f5;
  }
}

>>>.el-textarea textarea {
  width: 633px;
  margin-top: 8px;
  margin-bottom: 10px;
  resize: none;
}
.mark >>>.el-textarea textarea {
  width: 100%;
}

.muban {
  color: rgb(40, 79, 194);
  cursor: pointer;
  white-space: nowrap;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
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
