
<template>
  <span>
    <!-- 警报icon -->
    <div
      v-if="obj.type==='input' && alertMessage"
      :class="obj.suffixDesc?'alert-message-post':'alert-message'"
    >
      <el-tooltip class="item" effect="light" :enterable="false" placement="top">
        <div class="el-tooltip-content" slot="content">
          <div v-html="alertMessage||''"></div>
        </div>
        <img
          :src="alertImg"
          :alt="obj.title"
          :style="obj.tips?'margin-left:28px!important':''"
          :name="`${obj.name}_${obj.title}_${obj.label}_img`"
          @click="alertClick($event,obj)"
          width="14"
        />
      </el-tooltip>
    </div>

    <span
      style="margin: 0 0px 0 0;display: inline-flex;align-items: center;"
      :style="obj.label  && {display: 'flex', alignItems: 'center' }"
    >
      <!-- <autoComplete v-if="isShow" ref="autoInput" /> -->
      <!-- <el-input v-if="obj.type==='input'" v-model="checkboxValue" border size="small" :label="obj.title" :class="obj.class" :style="obj.style">{{obj.title}}</el-input> -->
      <span
        v-if="obj.label"
        :style="[obj.spanStyle, {width: obj.labelWidth, textAlign: 'right', paddingRight: '0px', marginBottom:obj.marginBottom}]"
      >
        <span
          style="font-size: 12px;padding:0px 0px;"
          :style="obj.labelStyle"
          :class="obj.labelClass"
        >{{obj.label}}:</span>
      </span>
      <!-- v-autoComplete="{dataList: obj.options, obj:formObj.model, key: obj.name}" -->
      <el-input
        v-model="inputValue"
        :id="getUUID()"
        :style="[obj.style, obj.inputWidth && {width: obj.inputWidth}]"
        :ref="obj.name"
        v-if="obj.type==='input'"
        :placeholder="obj.dialog ? '点击评估' : '空'"
        :class="[model === 'development' ? 'development-model' : (obj.class||''),obj.tips?'red-border':'']"
        :size="obj.size||''"
        :type="obj.inputType||'text'"
        :disabled="obj.disabled?true:false"
        :readonly="obj.readOnly?obj.readOnly:false"
        @change="inputChange($event, obj)"
        @dblclick.native.stop="inputClick($event, obj)"
        @click.native.stop="inputFocus($event, obj); obj.readOnly && inputClick($event, obj)"
        @focus="inputFocus($event, obj)"
        @blur.native.stop="inputBlur"
        @keydown.native="inputKeyDown($event, obj)"
      >
        <span class="pre-text" v-if="obj.prefixDesc" slot="prepend">{{obj.prefixDesc}}</span>
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
      <span class="post-text" v-if="obj.postText">{{obj.postText}}</span>
    </span>
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
  },
  data() {
    return {
      inputValue: "",
      alertImg: require("./image/预警@2x.png"),
      isShow: true,
      isClone: false,
      alertMessage: ""
    };
  },
  computed: {},
  watch: {
    inputValue(valueNew, oldvaule) {
      console.log("inputValue:", valueNew, oldvaule);
      if (this.model === "normal") {
        this.formObj.model[this.obj.name] = valueNew;
        this.checkValueRule(valueNew);
        this.obj.value = valueNew;
        console.log("obj:", this.obj);
      }
      /** 如果存在clone ref */
      setTimeout(() => {
        if (this.isClone) {
          this.$root.$refs[this.obj.name].setCurrentValue(valueNew);
          this.$root.$refs[this.obj.name].$parent.checkValueRule(valueNew);
        } else if (this.$root.$refs[this.obj.name + "_clone"]) {
          this.$root.$refs[this.obj.name + "_clone"].setCurrentValue(valueNew);
          this.$root.$refs[this.obj.name + "_clone"].$parent.checkValueRule(
            valueNew
          );
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
        // console.log("handler", curVal, oldVal);
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
      deep: true
    }
  },
  mounted() {
    // try {
    //   this.inputValue = this.formObj.model[this.obj.name];
    // } catch (error) {}
    this.alertMessage = "";
    let refName = this.obj.name; //+this.obj.type.toUpperCase()+(this.obj.title||this.obj.label)
    if (this.$refs[refName]) {
      this.formObj.model[this.obj.name] = this.$refs[refName].currentValue;
      this.$refs[refName]["childObject"] = this.obj;
      this.$refs[refName]["checkValueRule"] = this.checkValueRule;
      if (this.obj.isClone) {
        this.$root.$refs[refName + "_clone"] = this.$refs[refName];
        this.isClone = true;
      } else {
        this.$root.$refs[refName] = this.$refs[refName];
      }
    }
    if (
      this.obj &&
      this.obj.hasOwnProperty("value") > -1 &&
      this.obj.value &&
      this.obj.value.constructor !== Array
    ) {
      // console.log(this.obj, this.obj.value, "aaaaaaaaaaa");
      // setTimeout(() => {
      //   this.inputValue = this.obj.value;
      //   this.$refs[refName].setCurrentValue(this.obj.value + "");
      // }, 1000);
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
          options.map(item => {
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
    checkValueRule(valueNew) {
      let textResult = valueNew;
      this.obj.style = "";
      this.alertMessage = "";
      if (
        this.obj.hasOwnProperty("rule") !== -1 &&
        this.obj.rule &&
        this.obj.rule.constructor === Array
      ) {
        console.log("rule:", this.obj.rule);
        // 遍历规则
        this.obj.rule.map(r => {
          let [min, max] = [Number(r.min), Number(r.max)];
          let value = Number(valueNew);
          min = min === NaN ? 0 : min;
          max = max === NaN ? 0 : max;
          value = value === NaN ? 0 : value;

          // 判断规则
          if (r.min && r.max && (value >= min && value < max)) {
            this.obj.style = r.style;
            // 替换显示 r.display
            if (r.message) {
              console.log("rule:message", r.message);
              this.alertMessage = r.message + "";
            }
            if (
              r.display &&
              this.$refs[this.obj.name] &&
              this.$refs[this.obj.name].hasOwnProperty("type") &&
              this.$refs[this.obj.name].type === "text"
            ) {
              this.$refs[this.obj.name].setCurrentValue(r.display);
              this.$root.$refs[this.obj.name].setCurrentValue(r.display);
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
              this.$root.$refs[this.obj.name].setCurrentValue(r.display);
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
              this.$root.$refs[this.obj.name].setCurrentValue(r.display);
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
              (score >= scoreMin && score <= scoreMax)
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
              console.log(arr, "arr", r.split, "split", valueNew, "valueNew");
              if (r.maxs.length === arr.length) {
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i] && arr[i] > r.maxs[i]) {
                    this.obj.style = r.style;
                    if (r.message) {
                      console.log("rule:message", r.message);
                      this.alertMessage = r.message + "";
                    }
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
                    if (r.message) {
                      console.log("rule:message", r.message);
                      this.alertMessage = r.message + "";
                    }
                  }
                }
              }
            }
          }
        });
      }
      // if (this.$refs && this.$refs[this.obj.name]) {
      try {
        this.$refs[this.obj.name].$refs.input.style = this.obj.style;
      } catch (error) {}

      // this.$root.$refs[this.obj.name].$refs.input.style = this.obj.style;
      // }
      return textResult;
    },
    inputBlur(e) {
      console.log("inputBlur", e);
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
        if (
          this.$root.$refs &&
          this.$root.$refs.autoInput &&
          this.$root.$refs.autoInput.open
        ) {
          this.$root.$refs.autoInput.open({
            obj: obj,
            multiplechoice: this.obj.multiplechoice,
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
              // console.log('callback',obj,data,e)
              if (data) {
                // console.log('==callback',obj,data)
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
            id: key
          });
        }
      }
    },
    inputChange(e, child) {
      console.log("inputChange", e, child, this.formObj.model, this.inputValue);
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
    },
    inputClick(e, child) {
      console.log("inputClick", e, child, this.formObj.model, e.target.tagName);
      if (child.dialog) {
        console.log("child.dialog", child.dialog, this.$refs, this.$root.$refs);
        try {
          // this.$root.$refs.dialogBox.$el.draggable = true
          child.dialog["callback"] = res => {
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
        console.log("ArrowLeft", e, e.target, leftNode, leftNode.disabled);
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
          e.target.$rightNode,
          e.target.$rightNode.disabled
        );
      } else if (e.keyCode === 13) {
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
    }
  }
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
  padding: 0px 8px!important;
  height: 22px!important;
  background: transparent;
  background: white;

  &:focus {
    outline: none;
    border: 1px solid #4baf8d;
    // background #dfffdf
  }
  &:read-only{
    cursor: pointer;
  }
  &:placeholder{
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
  border: 0px!important;
  background: transparent;
  background: white;
  font-size: 12px!important;
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
  margin: 0px 0px 0px 0px
  padding: 0px 0px 0px 5px
  background #fff
  position: absolute;
  left: 322px;
}

>>>.el-input:hover {
  .post-text {
    // border-left 1px solid #4baf8d
    background #eef5f5
  }
}

.el-input {
  width: 227px;
}

>>>.el-input__inner:hover {
    border: 1px solid #4baf8d;
}

.alert-message {
  cursor: pointer;
  color:red;
  font-size:12px;
  // position: absolute;
  // margin-top: 7px;
  // margin-left: 8px;
}

.alert-message-post {
  cursor: pointer;
  color:red;
  font-size:12px;
  position: absolute;
  margin-left: -10px!important;
  margin-top: 0px;
  z-index: 2;
}

>>>.red-border {
  border-color: red!important;
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
