
<template>

  <span>

    <!-- 警报icon -->
    <span v-if="['select','selectInput'].indexOf(obj.type)>-1 && alertMessage" :class="obj.suffixDesc?'alert-message-post':'alert-message'">
      <el-tooltip
        class="item"
        effect="light"
        :enterable="false"
        placement="top"
      >
        <div class="el-tooltip-content" slot="content">
          <div v-html="alertMessage"></div>
        </div>
      <img
          :src="alertImg"
          :alt="obj.title"
          :style="obj.tips?'margin-left:20px!important':''"
          :name="`${obj.name}_${obj.title}_${obj.label}_img`"
          @click="alertClick($event,obj)"
          width="14"
        >
        </el-tooltip>
      </span>


  <span style="margin: 0 0px 0 0;" class="input-box" :class="obj.suffixDesc?'postText':''">
    <!-- <autoComplete v-if="isShow" ref="autoInput" /> -->
    <!-- <el-input v-if="obj.type==='input'" v-model="checkboxValue" border size="small" :label="obj.title" :class="obj.class" :style="obj.style">{{obj.title}}</el-input> -->
    <span v-if="obj.label">
      <span style="font-size: 12px;" :style="obj.labelStyle" :class="obj.labelClass">{{obj.label}}:</span>
    </span>

    <!-- v-autoComplete="{dataList: obj.options, obj:formObj.model, key: obj.name}" -->
    <!-- :placeholder="obj.options && obj.options.length>0 ? (obj.options[0].name + '') : (obj.placeholder||'')" -->
    <el-input
      v-model="inputValue"
      :id="getUUID()"
      :ref="obj.name"
      v-if="['select','selectInput'].indexOf(obj.type)>-1 && !obj.children"
      placeholder="空"
      :class="obj.class||''"
      :style="[obj.style, obj.inputWidth && {width: obj.inputWidth}]"
      :size="obj.size||''"
      :type="obj.inputType||'text'"
      :disabled="obj.readOnly?true:false"
      @change="inputChange($event, obj)"
      @dblclick.native.stop="inputdbClick($event, obj)"
      @click.native.stop="inputClick($event, obj)"
      @focus="inputFocus($event, obj)"
      @keydown.native="inputKeyDown($event, obj)"
      :readonly="obj.selectOnly"
    >
      <span class="pre-text" v-if="obj.prefixDesc" slot="prepend">{{obj.prefixDesc}}</span>
      <!-- <span slot="append"> -->
      <!-- <i
        slot="append"
        v-if="obj.options&&!obj.suffixDesc"
        @click.prevent.stop="iconClick"
        class="el-input__icon el-icon-caret-top"
        :style="isShowDownList?'transform: translateY(-50%)!important;':''"
      ></i> -->
      <!-- <span slot="append" class="post-text" v-if="obj.suffixDesc">{{obj.suffixDesc}}</span> -->
      <!-- </span> -->
      <!-- <template slot="append" v-if="obj.options"> -->
      <!-- </template> -->
    </el-input>
    <!-- <span>{{obj.suffixDesc}}</span> -->
    <!-- <span class="post-text" v-if="obj.suffixDesc">{{obj.suffixDesc}}</span> -->
    </span>
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import { setTimeout } from "timers";
// import autoComplete from "./autoComplete.vue"

export default {
  name: "SelectInputBox",
  props: {
    obj: Object,
    getOtherText: String,
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
      alertImg:"",
      isShow: true,
      isFirstClick: true,
      isShowDownList: false,
      readOnly: false,
      isClone: false,
      alertMessage:""
    };
  },
  computed: {},
  watch: {
    inputValue(valueNew, oldvaule) {
      console.log("inputValue:", valueNew, oldvaule);
      this.formObj.model[this.obj.name] = valueNew;
      this.checkValueRule(valueNew);
      console.log("obj:", this.obj, this.$refs);
      this.isShowDownList = false;

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

      return valueNew;
    }
  },
  mounted() {
    try {
      this.inputValue = this.formObj.model[this.obj.name];
    } catch (error) {}
    let refName = this.obj.name; //+this.obj.type.toUpperCase()+(this.obj.title||this.obj.label)
    this.readOnly = this.obj.readOnly ? this.obj.readOnly : false;
    if (this.$refs[refName]) {
      this.$refs[refName]["childObjct"] = this.obj;
      this.$refs[refName]["checkValueRule"] = this.checkValueRule;
      if (this.obj.isClone) {
        this.$root.$refs[refName + "_clone"] = this.$refs[refName];
        this.isClone = true;
      } else {
        this.$root.$refs[refName] = this.$refs[refName];
      }
    }

    // if(this.obj && this.obj.hasOwnProperty('value')>-1 && this.obj.value &&this.obj.value.constructor === Array){
    //   this.obj['options'] = this.obj.value
    // }
    // console.log('inputMounted',this.$refs,this.$root.$refs)
  },
  created() {
    let refName = this.obj.name + "";
    let dictionary = {};
    this.alertImg = require("./image/预警@2x.png");
    if (window.formObj && window.formObj.hasOwnProperty("dictionary")) {
      dictionary = window.formObj.dictionary;
    }
    if (this.formObj && this.formObj.hasOwnProperty("dictionary")) {
      dictionary = this.formObj.dictionary;
    }
    let options = dictionary[refName] ? dictionary[refName] : this.obj.options;
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
    if (
      !this.obj.hasOwnProperty("options") ||
      (this.obj.hasOwnProperty("options") &&
        this.obj.options.length === 0 &&
        !this.formObj.dictionary[refName])
    ) {
      this.obj["options"] = [{ name: "未测量", code: "未测量", pinyin: "wcl" }];
    }
  },
  methods: {
    checkValueRule(valueNew, isClick) {
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
            if(r.message){
              console.log('rule:message',r.message)
              this.alertMessage = r.message+"";
            }
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.equal && r.equal === valueNew) {
            this.obj.style = r.style;
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.equals && r.equals.indexOf(valueNew) !== -1) {
            this.obj.style = r.style;
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (
            valueNew &&
            r.diff &&
            (r.diff != valueNew || r.diff.indexOf(valueNew) == -1)
          ) {
            this.obj.style = r.style;
            if(r.message && valueNew){
              console.log('rule:message',r.message)
              this.alertMessage = r.message+"";
            }
            // this.obj.style = Object.assign({}, this.obj.style, r.style);
          } else if (r.scoreMin || r.scoreMax) {
            let [scoreMin, scoreMax] = [Number(r.scoreMin), Number(r.scoreMax)];
            let score = Number(valueNew.split("分")[0]);
            console.log(score, "scorescorescore");
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
          } else if (r.dialog && isClick) {
            if (
              valueNew == r.dialog.openKey ||
              r.dialog.openKey.indexOf(valueNew) > -1
            ) {
              this.$root.$refs.dialogBox.openBox(
                r.dialog.dialogList || r.dialog
              );
            }
            if (
              valueNew == r.dialog.cleanKey ||
              r.dialog.cleanKey.indexOf(valueNew) > -1
            ) {
              /** 清空 */
              let obj = this.formObj.dialogs.find(
                f => f.title == r.dialog.title
              );
              if (obj && obj.children) {
                obj.children.forEach(item => {
                  this.formObj.model[item.name] = "";
                });
              }
            }
          }
        });
      }
      try {
        this.$refs[this.obj.name].$refs.input.style = this.obj.style;
      } catch (error) {
        // console.log(error);
      }
      return textResult;
    },
    inputBlur(e) {
      console.log("inputBlur", e);
      // setTimeout(() => {
      // if(this.$root.$refs.autoInput){
      // this.$root.$refs.autoInput.closeBox()
      // this.isShowDownList = false
      // }
      // }, 1);
      // this.isShow = false
    },
    iconClick(e) {
      console.log(
        "iconClick",
        e,
        this.$refs,
        this.$refs[this.obj.name].$refs.input,
        this.isShowDownList
      );
      let target = this.$refs[this.obj.name].$refs.input;
      target.focus();
      // this.openAutoCompleteBox(target)
      // this.inputFocus(e, child)
      // this.isShowDownList = !this.isShowDownList
      if (this.isFirstClick) {
        this.isFirstClick = false;
      } else {
        this.isShowDownList = !this.isShowDownList;
      }
      setTimeout(() => {
        // this.$root.$refs.autoInput.switch()
        this.openAutoCompleteBox(target);
        // if (!this.isShowDownList) {
        //   this.openAutoCompleteBox(target);
        //   this.isShowDownList = true;
        // } else {
        //   this.$root.$refs.autoInput.close();
        //   this.isShowDownList = false;
        // }
      }, 100);
    },
    inputClick(e, child) {
      console.log(
        "inputClick",
        e,
        child,
        this.$root.$refs.autoInput.getInputElement(),
        this.$root.$refs.autoInput.getStatus(),
        this.isShowDownList
      );
      if (this.readOnly) {
        return;
      }
      let target = this.$refs[this.obj.name].$refs.input;
      // if(e.target.tagName!=='INPUT'){
      // target.focus()
      // this.openAutoCompleteBox(target)
      // return
      // }
      // this.$root.$refs.autoInput.switch()
      // setTimeout(() => {

      if (this.isFirstClick) {
        this.isFirstClick = false;
      } else {
        this.isShowDownList = !this.isShowDownList;
      }

      this.openAutoCompleteBox(target);
      // if (this.isShowDownList) {
      //   // this.inputFocus(e, child)
      //   this.openAutoCompleteBox(target);
      //   this.isShowDownList = true;
      // } else {
      //   this.$root.$refs.autoInput.close();
      // }

      // }, 1);
    },
    inputFocus(e, child) {
      console.log(
        "inputFocus",
        e,
        e.target.tagName,
        child,
        window.document.getSelection()
      );
      let target = this.$refs[this.obj.name].$refs.input;
      // if(e.target.tagName!=='INPUT'){
      //   let target = this.$refs[this.obj.name].$refs.input
      //   target.focus()
      //   return
      // }
      // if(e.target.parentNode.id === window.document.getSelection().focusNode.id){return}
      this.openAutoCompleteBox(target);
    },
    openAutoCompleteBox(target) {
      // let self = this
      if (this.readOnly) {
        return;
      }
      let xy = target.getBoundingClientRect();
      console.log(
        "openAutoCompleteBox",
        this.formObj.model,
        this.inputValue,
        xy,
        this.$refs,
        this.$root.$refs
      );
      let delt = xy.height;

      if (this.obj.options) {
        let dataList = this.obj.options;
        let key = this.obj.name;
        let obj = this.formObj.model;
        if (this.$root.$refs.autoInput) {
          this.isShowDownList = true;
          this.$root.$refs.autoInput.open({
            parentEl: target,
            currentValue: this.inputValue,
            style: {
              top: `${xy.top + delt}px`,
              left: `${xy.left}px`,
              width: `${xy.width}px`,
              "min-width": "max-content"
            },
            data: dataList,
            callback: data => {
              // console.log('callback',obj,data,e)
              if (data) {
                // console.log('==callback',obj,data)
                obj[key] = data.code;
                this.inputValue = data.name;
                this.checkValueRule(data.name, true);
                if (target.tagName !== "INPUT") {
                  target.innerText = data.name;
                }
                if (target.tagName === "INPUT") {
                  target.value = data.name;
                }
              }
              // target.focus();
              // this.isShowDownList = false
              return false;
            },
            id: key
          });
        }
      }
    },
    inputChange(e, child) {
      console.log("inputChange", e, child, this.formObj.model, this.inputValue);
    },
    inputdbClick(e, child) {
      console.log(
        "inputdbClick",
        e,
        child,
        this.formObj.model,
        e.target.tagName
      );
      if (child.dialog) {
        console.log("child.dialog", child.dialog, this.$refs, this.$root.$refs);
        try {
          // this.$root.$refs.dialogBox.$el.draggable = true
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
        // e.target.selectionStart,
        // e.target.selectionEnd
      );
      if (
        e.keyCode == 37 &&
        (e.target.selectionStart == 0 ||
          (e.target.selectionStart == null && e.target.selectionEnd == null))
      ) {
        // ArrowLeft
        if( e.target.$leftNode){
          e.target.$leftNode.focus();
        }

        this.isShowDownList = false;
        console.log(
          "ArrowLeft",
          e,
          e.target,
          e.target.$leftNode,
          // e.target.$leftNode.disabled
        );
      } else if (
            e.keyCode == 39 &&
            (e.target.selectionEnd === e.target.value.length || (e.target.selectionStart == null && e.target.selectionEnd == null))
          ) {
        if( e.target.$rightNode){
          e.target.$leftNode.focus();
        }
        // ArrowRight
        // e.target.$rightNode.focus();
        this.isShowDownList = false;
        console.log(
          "ArrowRight",
          e,
          e.target,
          e.target.$rightNode,
          // e.target.$rightNode.disabled
        );
      } else if (e.keyCode === 13) {
        // 13 Enter
        console.log("Enter", e.target, this.$root.$refs.autoInput.getStatus());
        // this.isShowDownList = false
        setTimeout(() => {
          if (!this.$root.$refs.autoInput.getStatus()) {
            e.target.$rightNode.focus();
            // this.openAutoCompleteBox(e.target.$rightNode)
          }
        }, 100);

        // this.$root.$refs.autoInput.close()
      }
      // else if([38,40].indexOf(e.keyCode)===-1){
      //   this.inputFocus(e, child)
      // }
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    alertClick(event){
      console.log('alertClick',event, this.obj)
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

.input-box
  font-size 13px
  &:focus,:ative
    outline none
    border 1px solid #4baf8d
  &.postText
    display: flex;
    align-items: center;

.el-checkbox,
.el-select,
.is-bordered,
.el-checkbox--small,
.el-input,
.el-input--small,
.el-input-group,
.el-input-group--prepend
  margin: 5px 0px;
  vertical-align: bottom;
  width: calc(100% - 2px);
  &:hover
    // outline 1px solid #4baf8d
    border none
  &:focus
    outline none
    border 1px solid #4baf8d
  &:placeholder
    color: #dbe6e4;

.select-box-small
  width 65px!important
  vertical-align super

.select-label
  margin-right: -4px;
  margin-left: 4px;
  vertical-align: super;

>>>.el-input__inner.el-input__inner.el-input__inner
  width 100%
  border-radius 0px
  cursor pointer
  color blue
  padding: 0px 5px!important;
  height: 22px!important;
  background: transparent;
  &:focus
    outline none
    border 1px solid #4baf8d
    // background #dfffdf
  &:placeholder
    color: #dbe6e4;

.el-input
  width: 227px;

.pre-text, .post-text, >>>.el-input-group__append
  color #486a62
  background: white;
  border-radius: 0;

  // i.el-input__icon.el-icon-caret-top.is-reverse

.el-input__icon
  position: absolute;
  width: 35px;
  height: 35px;
  right: 0;
  top: 0;
  text-align: center;
  color: rgb(191, 217, 210);
  transition: all .3s

.el-input__icon
  color: rgb(191, 217, 210);
  font-size: 12px;
  transition: transform .3s;
  -ms-transform: translateY(-50%) rotate(180deg);
  transform: translateY(-50%) rotateZ(180deg);
  line-height: 16px;
  top: 50%;
  cursor: pointer;
  width: 100%;
  height: auto;
  &.is-reverse
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);

.el-icon-caret-top:before
    content: "\E607";

.el-input__icon:after
    content: '';
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle;

i {
  background: transparent;
  .is-reverse{
    -ms-transform: translateY(-50%)!important;
    transform: translateY(-50%)!important;
  }
}

.post-text {
  // margin -8px -14px -8px -10px;
  // padding 8px 12px 8px 3px
  margin: 0px 0px 0px 0px
  padding: 0px 0px 0px 5px
  background #fff
}
>>>.el-input:hover {
  .post-text {
    // border-left 1px solid #4baf8d
    background #eef5f5
  }
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
