
<template>
  <span :style="obj.style" :class="obj.class" class="input-elements">
    <!-- 页面正文 -->

    <!-- display: inline-grid;vertical-align: top; -->
    <span
      v-for="(child,cindex) in obj"
      :key="child.name+cindex+getUUID(child,cindex)"
      :style="child.elementStyle ? child.elementStyle : 'margin: 0 10px 0 0;'"
      class="input-element"
    >
      <!-- html -->
      <!-- <FormGroupTitle :obj="child" :formObj="formObj"/> -->
      <!-- <FormGroupHR :obj="child" :formObj="formObj"/> -->
      <FormGroupHTML :obj="child" :formObj="formObj"/>
      <!-- <FormGroupVerticalBox :obj="child" :formObj="formObj"/> -->
      <!-- <FormGroupHorizontalBox :obj="child" :formObj="formObj"/> -->
      <!-- <FormGroupColBox :obj="child" :formObj="formObj"/> -->

      <!-- 文字显示 -->
      <span
        v-if="child.type==='text'"
        :label="child.value||child.title"
        :class="child.class||''"
        :style="child.style||''"
      >{{formObj.model[child.name]||child.title||'空'}}{{child.name}}</span>

      <!-- 图片显示 -->
      <span>
        <img
          v-if="child.type==='help'"
          :src="helpImg"
          :alt="child.title"
          :class="child.class"
          :style="child.style"
          @click="helpClick($event,child)"
          width="16"
        >
      </span>

      <!-- 人体图按钮显示显示 -->
      <span>
        <span
          v-if="child.type==='bodyBtn'"
          :class="child.class"
          :style="'color:#0000FF;cursor:pointer;padding-top: 9px;display: block;' + child.style"
          @click="openBodyModal($event,child)"
          width="24"
        >人体图</span>
      </span>

      <!-- 人体图显示显示 -->
      <span>
        <Body v-if="child.type==='body'" :class="child.class" :obj="child" :formObj="formObj">人体图</Body>
      </span>

      <!-- 多选 -->
      <Checkbox
        v-if="child.type==='checkbox'"
        :obj="child"
        :formObj="formObj"
        class="checkbox-input"
      />

      <!-- 单选 -->
      <Radiobox
        v-if="child.type==='radio' && !child.tips"
        :obj="child"
        :formObj="formObj"
        class="radio-input"
      />

      <!-- <el-checkbox
        v-if="child.type==='radio' && !child.tips"
        v-model="radioValue"
        border
        :size="child.size ||'small'"
        :label="child.code ||child.title"
        :class="child.class||''"
        :style="child.style||''"
        class="radio-input"
        :ref="makeRefName(child,cindex)"
        @click.native.stop="radioClicked($event,child)"
      >{{child.title}}</el-checkbox>-->

      <el-tooltip
        class="item"
        effect="light"
        placement="top"
        v-if="child.type==='radio' && child.tips"
      >
        <div class="el-tooltip-content" slot="content">
          <div v-html="child.tips"></div>
        </div>
        <!-- 单选 -->
        <Radiobox v-if="child.type==='radio'" :obj="child" :formObj="formObj" class="radio-input"/>
        <!-- <el-checkbox
          v-if="child.type==='radio' && child.tips"
          v-model="radioValue"
          :ref="makeRefName(child,cindex)"
          border
          :size="child.size||'small'"
          :label="child.code||child.title"
          :class="child.class||''"
          :style="child.style||''"
          @click.native.stop="radioClicked($event,child)"
        >{{child.title}}</el-checkbox>-->
      </el-tooltip>

      <!-- 单选box -->
      <span v-if="child.type==='radioBox'" style="display: flex" :style="child.style">
        <span
          :style="{width: child.labelWidth}"
          style="text-align: right; padding-right: 10px;box-sizing: border-box"
        >{{child.label}}</span>
        <span>
          <InputElements v-if="child.children" :obj="child.children" :formObj="formObj"/>
        </span>
      </span>

      <!-- 下拉框 -->
      <!-- <SelectBox v-if="child.type==='select'"
      :obj="child"
      :formObj="formObj" />-->

      <!-- 下拉输入框 -->
      <SelectInputBox
        v-if="child.type==='select'"
        :obj="child"
        :formObj="formObj"
        :col="col"
        :getOtherText="''"
      />

      <!-- 输入框 -->
      <InputBox v-if="child.type==='input'" :obj="child" :formObj="formObj" :col="col"/>

      <!-- <el-input v-if="child.type==='input'"  placeholder="" v-model="formObj.model[child.name]" :class="child.class||''" :style="child.style||''" size="small" @click.native.stop="inputClick($event, child)" ><template v-if="child.title" slot="prepend">{{child.title}}</template></el-input>{{child.name}} -->

      <!-- 日期 -->
      <DatePicker v-if="child.type==='datePicker'" :obj="child" :formObj="formObj"/>

      <!-- 备注 -->
      <Mark v-if="child.type==='mark'" :obj="child" :formObj="formObj" :col="col"/>

      <!-- 子项递归 -->
      <span v-if="child && child.children && child.children.length>0 && child.type != 'radioBox'">
        <InputElements
          :obj="child.children"
          :formObj="formObj"
          :style="child.style"
          :class="child.class"
          :col="col"
        />
      </span>
      <!-- <span>{{child.dialog && child.dialog.title}}</span> -->
      <!-- <span class="tip" v-if="getOtherText(child)">{{ getOtherText(child)}}</span> -->
      <span
        class="tip"
        :style="child.name === 'I100001' && {position: 'absolute', left: '62px',top: '216px'}"
        v-if="getOtherText(child)"
        @click="openTip(child)"
      >{{ getOtherText(child)}}</span>
      <!-- <span>{{getOtherText(child)}}</span> -->
    </span>
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import FormGroupHTML from "./FormGroupHTML";
// import FormGroupTitle from "./FormGroupTitle";
// import FormGroupHR from "./FormGroupHR";
// import FormGroupHorizontalBox from "./FormGroupHorizontalBox";
// import FormGroupVerticalBox from "./FormGroupVerticalBox";
// import FormGroupColBox from "./FormGroupColBox";

import Radiobox from "./Radiobox";
import Checkbox from "./Checkbox";
import InputBox from "./InputBox";
import Mark from "./Mark";
import SelectInputBox from "./SelectInputBox";
import SelectBox from "./SelectBox";
import DatePicker from "./DatePicker";
import Body from "../Render/modal/body-modal/body";
import otherDialog from "../data/formDialog/other.dialog";
export default {
  name: "InputElements",
  props: {
    obj: Array,
    formObj: Object,
    col: {
      type: Number,
      default: 1
    },
    objIndex: {
      type: Number,
      default: -1
    }
  },
  components: {
    FormGroupHTML,
    // FormGroupTitle,
    // FormGroupHR,
    // FormGroupHorizontalBox,
    // FormGroupVerticalBox,
    // FormGroupColBox,
    Radiobox,
    Checkbox,
    InputBox,
    Mark,
    SelectBox,
    SelectInputBox,
    DatePicker,
    Body
  },
  data() {
    return {
      radioValue: "",
      helpImg: "",
      lightImg: "",
      alertImg: "",
      elementName: "",
      element: {},
      childIndex: 0,
      indexArray: [],
      otherDialog
    };
  },
  computed: {},
  watch: {
    radioValue(valueNew, oldvaule) {
      let value = valueNew.toString();
      this.formObj.model[this.elementName] = value;
      // let index = this.formObj.model[this.elementName].indexOf(this.child.title)
      let refName =
        this.element.type +
        this.element.name +
        this.element.title +
        this.childIndex; // + this.element.type.toUpperCase() + (this.element.title||this.element.label)
      console.log(
        "radioValue-1:",
        valueNew,
        oldvaule,
        this.formObj.model,
        refName,
        this.$root.$refs[refName],
        this.$root.$refs
      );
      if (this.$root.$refs[refName]) {
        this.$root.$refs[refName].value = value;
      }
    }
  },
  mounted() {
    if (!this.formObj.model[this.elementName]) {
      this.formObj.model[this.elementName] = "";
    }
    // if (this.formObj && this.formObj.model[this.elementName]) {
    //   this.radioValue = this.formObj.model[this.elementName];
    // }

    let refName = this.element.name; //this.element.type + this.element.name + this.element.title+this.childIndex;

    // console.log(this.childIndex,'this.$refs:',this.$refs)
    if (this.$refs) {
      let object = this.$refs;
      if (this.element.type === "radio") {
        // if(!this.$root.$refs[this.elementName]){
        //   this.$root.$refs[this.elementName] = new Array()
        // }

        return;
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            let element = object[key];

            let childObj = this.obj.find(item => {
              return key.indexOf(item.type + item.name + item.title) > -1;
            });

            element[0]["childObjct"] = childObj;

            try {
              if (childObj.code === window.formObj.model[childObj.name]) {
                element[0].value = childObj.code;
                element[0].model = childObj.code;
              } else {
                // element[0].value = "" //
                element[0].model = "";
              }
            } catch (error) {
              //
            }

            this.$root.$refs[this.elementName].push(...element);
            // console.log('--key',key,'element',element,this.element,'this.$refs',this.$refs,this.$root.$refs,'object',object,this.obj,childObj,childObj.code,element[0].label,childObj.code===element[0].label)
          }
        }
      } else {
        if (this.$refs[refName]) {
          // console.log(this.childIndex,'this.$refs:',this.$refs[refName])
          this.$refs[refName]["childObjct"] = this.element;
          this.$root.$refs[refName] = this.$refs[refName];
        }
      }
    }
    //
  },
  created() {
    this.helpImg = require("./image/说明@2x.png");
    this.lightImg = require("./image/light.png");
    this.alertImg = require("./image/预警@2x.png");
  },
  methods: {
    getOtherText(child) {
      if (child.dialog || child.rule) {
        try {
          let dialog = [];
          let text = [];
          let code = [];
          if (child.dialog) {
            dialog.push(child.dialog);
          }
          if (child.rule) {
            child.rule.forEach(item => {
              if (item.dialog) {
                dialog.push(item.dialog);
              }
            });
          }

          dialog.forEach(d => {
            let obj = otherDialog.find(item => item.title === d.title);
            if (obj) {
              let codeList = obj.children
                ? Array.from(new Set(obj.children.map(item => item.name)))
                : [];
              codeList.forEach(c => {
                code.push(c);
                // text.push(c);
              });
              console.log(codeList, "codeListcodeListcodeListcodeList");
            }
          });
          return Array.from(new Set(code.map(c => this.formObj.model[c]))).join(
            " "
          );
          // return codeList.join(" ");
        } catch (error) {
          console.error(error, "error");
        }
      }
    },
    radioClicked(e, child) {
      if (e.target.tagName !== "INPUT") {
        return;
      }
      let index = this.formObj.selectedItems.findIndex(c => {
        return c.name === child.name && c.title === child.title;
      });
      if (index === -1) {
        this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
          return c.name !== child.name;
        });
        this.formObj.selectedItems.push(child);
      }
      if (this.radioValue && this.radioValue == (child.code || child.title)) {
        this.radioValue = "";
        this.formObj.selectedItems = this.formObj.selectedItems.filter(c => {
          return c.name !== child.name;
        });
        console.log("取消选中", "index", index, this.formObj.selectedItems);
      }
      let score = 0;
      // 计算总分
      this.formObj.selectedItems.map(item => {
        score += ~~item.score;
      });
      //
      this.formObj.model["evalScore"] = score;
      if (this.$root.$refs["evalScore"]) {
        this.$root.$refs["evalScore"].setCurrentValue(score);
        this.$root.$refs["evalDesc"].setCurrentValue(score);
        this.$root.$refs["evalDesc"].checkValueRule(score);
      }
      //
      // 评估得分：0-20分完全依赖；20-40分严重依赖；40-60分明显依赖；＞60分基本自理
      //
      console.log(
        "radioClicked",
        e,
        "child:",
        child,
        "formObj:",
        this.formObj,
        "selectedItems",
        this.formObj.selectedItems,
        this.formObj.model,
        e.target.tagName,
        e.target.checked,
        "index",
        index,
        "score",
        score
      );
    },
    helpClick(e, child) {
      console.log("helpClick", e, child, this.formObj.model, e.target.tagName);
      if (child.dialog) {
        console.log("child.dialog", child.dialog, this.$refs, this.$root.$refs);
        try {
          // this.$root.$refs.dialogBox.$el.draggable = true
          child.dialog["callback"] = res => {
            console.log("表单填写结果", res);
          };
          this.$root.$refs.dialogBox.openBox(child.dialog); //$el draggable
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    openBodyModal(e, child) {
      let config = {
        list: this.$root.$refs[child.name].currentValue || "",
        mode: 1,
        callback: res => {
          console.log("人体图结果:", res);
          // this.$root.$refs[child.name].$refs.input.value = res;
          this.$root.$refs[child.name].setCurrentValue(res);
          this.formObj.model[child.name] = res;
          // this.$root.$refs[child.name].value = res;
        }
      };
      this.$root.$refs.bodyModal.openBox(config);
    },
    makeRefName(child = null, cindex = -1) {
      // child.type+child.name+child.title+cindex
      let refName = child.type + child.name + child.title + cindex;

      // let refName = this.element.type + this.element.name + this.element.title+this.childIndex;
      console.log("---makeRefName", refName);
      // if (this.$refs[refName]) {
      //   this.$root.$refs[refName] = this.$refs[refName];
      // }
      return refName;
    },
    getUUID(child = null, cindex = -1) {
      let uuid_ = uuid.v1();
      // console.log(uuid_)
      if (child) {
        this.childIndex = cindex;
        this.elementName = child.name;
        this.element = child;
      }
      return uuid_;
    },
    openTip(child) {
      console.log(child, "childchild");
      this.$root.$refs[child.name].$parent.checkValueRule(
        this.$root.$refs[child.name].$parent.inputValue,
        true
      );
      if (child.dialog) {
        this.$root.$refs.dialogBox.openBox(
          child.dialog,
          this.formObj.model[child.name]
        );
      }
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

.el-checkbox,
.el-select,
.is-bordered,
.el-checkbox--small,
.el-input,
.el-input--small,
.el-input-group,
.el-input-group--prepend
  margin: 5px 0px;


.el-radio
  min-width: 100px;
  padding 0px 0 0px 5px
  white-space normal

.el-input__inner.el-input__inner.el-input__inner
  width: 100%;
  &:hover,:focus
    border 1px solid #4baf8d

.input-elements
  display: inline-flex;
  flex-wrap: wrap;

.input-elements-nowrap
  display: flex;
  flex-wrap: nowrap;

.vertical-top
  display: inline-grid;
  vertical-align: top;

.help-image
  padding-top: 7px;
  cursor: pointer;
  position: absolute;

.el-tooltip-content
  max-width: 270px!important;
  text-align: justify;
  font-size: 14px;
  line-height: 1.5em;
  letter-spacing: 0px;
.tip
  font-size 12px
  color blue
  margin-bottom 4px
  display inherit
  cursor pointer
.el-input
  width 227px;

</style>
