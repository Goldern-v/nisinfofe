
<template>
  <span
    :style="obj.elementsStyle"
    :class="obj.elementsClass"
    class="input-element"
  >
    <!-- 页面正文 -->

    <!-- display: inline-grid;vertical-align: top; -->
    <span
      v-for="(child, cindex) in obj"
      :key="child.name + cindex + getUUID(child, cindex)"
      :class="[
        child.elementClass,
        { 'result-text-display': child.type == 'select' },
        { 'full-text-width': ['input', 'datePicker'].indexOf(child.type) > -1 },
      ]"
      :style="child.elementStyle ? child.elementStyle : 'margin: 0 0px 0 0;'"
      class="input-element"
    >
      <!-- html -->
      <FormGroupHR :obj="child" :formObj="formObj" />
      <FormGroupHTML :obj="child" :formObj="formObj" />

      <!-- 文字显示 -->
      <span
        v-if="child.type === 'text'"
        :label="child.value || child.title"
        :class="child.class || ''"
        :style="child.style || ''"
        >{{ formObj.model[child.name] || child.title || "空"
        }}{{ child.name }}</span
      >

      <!-- 图片显示 -->
      <span>
        <img
          v-if="child.type === 'help'"
          :src="helpImg"
          :alt="child.title"
          :class="child.class"
          :style="child.style"
          @click="helpClick($event, child)"
          width="24"
        />
      </span>

      <!-- 人体图按钮显示显示 -->
      <span>
        <span
          v-if="child.type === 'bodyBtn'"
          :class="child.class"
          :style="
            'color:#0000FF;cursor:pointer;padding-left:5px;padding-top:9px;display: block;' +
            child.style
          "
          @click="openBodyModal($event, child)"
          width="24"
          >人体图</span
        >
      </span>

      <!-- 人体图显示显示 -->
      <span>
        <Body
          v-if="child.type === 'body'"
          :class="child.class"
          :obj="child"
          :formObj="formObj"
          >人体图</Body
        >
      </span>

      <!-- 多选 -->
      <Checkbox
        v-if="child.type === 'checkbox'"
        :obj="child"
        :formObj="formObj"
        class="checkbox-input"
      />

      <!-- 单选 -->
      <Radiobox
        v-if="child.type === 'radio' && !child.tips"
        :obj="child"
        :formObj="formObj"
        class="radio-input"
      />

      <el-tooltip
        class="item itemlist"
        effect="light"
        placement="right-start"
        v-if="child.type === 'radio' && child.tips"
        style="
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        "
      >
        <div class="el-tooltip-content" slot="content">
          <div v-html="child.tips"></div>
        </div>
        <!-- 单选 -->
        <Radiobox
          v-if="child.type === 'radio'"
          :obj="child"
          :formObj="formObj"
          class="radio-input"
        />
      </el-tooltip>

      <!-- 单选box -->
      <span
        v-if="child.type === 'radioBox'"
        style="display: flex"
        :style="child.style"
      >
        <span
          :style="{ width: child.labelWidth }"
          style="
            text-align: right;
            padding-right: 10px;
            padding-left: 4px;
            box-sizing: border-box;
          "
          >{{ child.label }}</span
        >
        <span>
          <InputElements
            v-if="child.children"
            :obj="child.children"
            :formObj="formObj"
          />
        </span>
      </span>

      <!-- 下拉框 -->
      <SelectBox
        v-if="child.type === 'selectOne'"
        :obj="child"
        :formObj="formObj"
      />

      <!-- :getOtherText="''" -->
      <!-- 下拉输入框 -->
      <SelectInputBox
        v-if="child.type === 'select'"
        :obj="child"
        :formObj="formObj"
        :col="col"
      />

      <!-- 输入框 -->
      <InputBox
        v-if="child.type === 'input'"
        :obj="child"
        :formObj="formObj"
        :col="col"
      />

      <!-- 日期 -->
      <DatePicker
        v-if="['datePicker', 'dateTime'].indexOf(child.type) > -1"
        :obj="child"
        :formObj="formObj"
      />

      <!-- 备注 -->
      <Mark
        v-if="child.type === 'mark'"
        :obj="child"
        :formObj="formObj"
        :col="col"
      />

      <!-- 子项递归 -->
      <span
        v-if="
          child &&
          child.children &&
          child.children.length > 0 &&
          child.type != 'radioBox'
        "
      >
        <InputElements
          :obj="child.children"
          :formObj="formObj"
          :style="child.style"
          :class="child.class"
          :col="col"
        />
      </span>
    </span>
  </span>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import FormGroupHTML from "./FormGroupHTML";
import FormGroupHR from "./FormGroupHR";
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
      default: 1,
    },
    objIndex: {
      type: Number,
      default: -1,
    },
  },
  components: {
    FormGroupHTML,
    // FormGroupTitle,
    FormGroupHR,
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
    Body,
  },
  data() {
    return {
      radioValue: "",
      helpImg: "",
      lightImg: "",
      elementName: "",
      element: {},
      childIndex: 0,
      indexArray: [],
      otherDialog,
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
        this.$root.$refs[this.formCode][refName],
        this.$root.$refs
      );
      if (this.$root.$refs[this.formCode][refName]) {
        this.$root.$refs[this.formCode][refName].value = value;
      }
    },
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
        return;
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            let element = object[key];

            let childObj = this.obj.find((item) => {
              return key.indexOf(item.type + item.name + item.title) > -1;
            });

            element[0]["childObject"] = childObj;

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

            this.$root.$refs[this.formCode][this.elementName].push(...element);
            // console.log('--key',key,'element',element,this.element,'this.$refs',this.$refs,this.$root.$refs,'object',object,this.obj,childObj,childObj.code,element[0].label,childObj.code===element[0].label)
          }
        }
      } else {
        if (this.$refs[refName]) {
          this.$refs[refName]["childObject"] = this.element;
          this.$root.$refs[this.formCode][refName] = this.$refs[refName];
        }
      }
    }
    //
  },
  created() {
    this.helpImg = require("./image/question.png");
    this.lightImg = require("./image/light.png");
  },
  methods: {
    getStringLen(str) {
      var l = str.length;
      var blen = 0;
      for (i = 0; i < l; i++) {
        if ((str.charCodeAt(i) & 0xff00) != 0) {
          blen++;
        }
        blen++;
      }
    },
    dialogResult(child, hasNewLine = false) {
      let isShow = false;
      let dialog = [];
      let html = "";
      let newLine = "<br/>";
      if (child.rule && child.rule.hasOwnProperty("dialog") > -1) {
        let d = child.rule.filter((item) => {
          return item.dialog;
        });
        if (d && d.length > 0) {
          dialog = [...d];
          isShow = true;
        }
      }
      if (child.dialog) {
        isShow = true;
        if (child.dialog.constructor === Array) {
          dialog = [...dialog, ...child.dialog];
        } else {
          dialog = [...dialog, child.dialog];
        }
      }
      if (isShow) {
        dialog.map((d) => {
          if (d) {
            let title = d.title || d.dialog.title || "";

            let obj = this.formObj.dialogs[title];

            if (obj) {
              if (obj.formSetting) {
                title = obj.formSetting.formTitle.formName;

                // VTE表单特殊处理
                if (
                  child.title.indexOf("VTE") > -1 &&
                  this.formObj.model[child.name] &&
                  this.formObj.model[child.name].indexOf(title) > -1
                ) {
                  html += `<span><span style='${obj.style}'>${
                    this.formObj.model[d.dialog.parentName] || ""
                  }${obj.suffixDesc || ""}</span></span>`;
                  hasNewLine ? (html += newLine) : (html = html);
                }
                let cleanKeyCheck = () => {
                  // console.log('===d.cleanKey',d.cleanKey,'child.title',child.title)
                  if (d.dialog && d.dialog.hasOwnProperty("cleanKey") > -1) {
                    if (typeof d.dialog.cleanKey === "object") {
                      return (
                        d.dialog.cleanKey.indexOf(
                          this.formObj.model[child.name]
                        ) > -1
                      );
                    } else if (typeof d.dialog.cleanKey === "string") {
                      return (
                        d.dialog.cleanKey ==
                        (this.formObj.model[child.name] || "")
                      );
                    }
                  }
                };
                // 表单结果显示
                if (
                  d.hasOwnProperty("dialog") > -1 &&
                  d.dialog &&
                  d.dialog.hasOwnProperty("parentName") > -1 &&
                  this.formObj.model[d.dialog.parentName] &&
                  child.title.indexOf("VTE") === -1 &&
                  !cleanKeyCheck()
                ) {

                  html += `<span><span style='${obj.style}'>${
                    this.formObj.model[d.dialog.parentName] || ""
                  }${obj.suffixDesc || ""}</span></span>`;
                  hasNewLine ? (html += newLine) : (html = html);
                }
              } else {
                title = child.postTitle || obj.aliasTitle || obj.title;
              }
              let objChildren = obj.body ? obj.body : obj.children;
              try {
                // 单组或多组选项结果分行显示
                if (
                  obj.hasOwnProperty("children") > -1 &&
                  obj.hasOwnProperty("type") > -1
                ) {
                  if (
                    obj.type &&
                    obj.type.indexOf("formGroup") > -1 &&
                    this.formObj.model[obj.name] &&
                    obj.children &&
                    obj.children.length > 0 &&
                    ["radio", "checkbox"].indexOf(obj.children[0].type) > -1
                  ) {
                    title = obj.aliasTitle || obj.label || obj.title;
                    console.log("formGroup:title", title);
                    html += `<span>${this.formObj.model[obj.name] || ""}${
                      obj.suffixDesc || ""
                    }</span>`;
                    hasNewLine ? (html += newLine) : (html = html);
                  }
                }

              } catch (e) {
                //
                console.log("error", e);
              }
              //
              let handleChild = (children) => {
                if (children) {
                  children.map((child, cindex) => {
                    title =
                      children.aliasTitle ||
                      child.aliasTitle ||
                      child.label ||
                      child.title;
                    if (
                      !title ||
                      (child.type && child.type === "formGroupHR")
                    ) {
                      return;
                    }
                    //
                    if (child.children) {
                      if (this.formObj.model[child.name]) {
                        html += `<span style='margin-right:5px'><span style='color:green'>!!!${title}</span>:<span>${
                          this.formObj.model[child.name] || ""
                        }${child.suffixDesc || ""}</span></span>`;
                        // hasNewLine?html+=newLine:html=html;
                        hasNewLine
                          ? (html += newLine)
                          : (html += children.length != cindex + 1 ? "," : "");
                      }
                      handleChild(child.children);
                      return;
                    }
                    //
                    if (
                      child.hasOwnProperty("children") > -1 &&
                      ["radio", "checkbox"].indexOf(child.type) === -1
                    ) {
                      if (
                        this.formObj.model[child.name] &&
                        child.name != "evalScore"
                      ) {
                        html += `<span><span style='color:green'>${title}</span>:<span style='${
                          child.style
                        }'>${this.formObj.model[child.name] || ""}${
                          child.suffixDesc || ""
                        }</span></span>`;
                        // hasNewLine?html+=newLine:html=html;
                        hasNewLine
                          ? (html += newLine)
                          : (html += children.length != cindex + 1 ? "," : "");
                      }
                    }
                    //
                  });
                }
              };

              handleChild(objChildren);
            }
          } else {
            // console.log('!!!!!!',d)
          }
        });
      }
      let result = {
        isShow: isShow,
        html: html,
      };

      return result;
    },

    radioClicked(e, child) {
      if (e.target.tagName !== "INPUT") {
        return;
      }
      let index = this.formObj.selectedItems.findIndex((c) => {
        return c.name === child.name && c.title === child.title;
      });
      if (index === -1) {
        this.formObj.selectedItems = this.formObj.selectedItems.filter((c) => {
          return c.name !== child.name;
        });
        this.formObj.selectedItems.push(child);
      }
      if (this.radioValue && this.radioValue == (child.code || child.title)) {
        this.radioValue = "";
        this.formObj.selectedItems = this.formObj.selectedItems.filter((c) => {
          return c.name !== child.name;
        });
        console.log("取消选中", "index", index, this.formObj.selectedItems);
      }
      let score = 0;
      // 计算总分
      this.formObj.selectedItems.map((item) => {
        score += ~~item.score;
      });
      //
      this.formObj.model["evalScore"] = score;
      if (this.$root.$refs[this.formCode]["evalScore"]) {
        this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(score);
        this.$root.$refs[this.formCode]["evalDesc"].setCurrentValue(score);
        this.$root.$refs[this.formCode]["evalDesc"].checkValueRule(score);
      }
      //
      // 评估得分：0-20分完全依赖；20-40分严重依赖；40-60分明显依赖；＞60分基本自理

    },
    helpClick(e, child) {
      if (child.dialog) {
        try {
          child.dialog["callback"] = (res) => {
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
        list: this.$root.$refs[this.formCode][child.name].currentValue || "",
        mode: 1,
        callback: (res) => {
          this.$root.$refs[this.formCode][child.name].setCurrentValue(res);
          this.formObj.model[child.name] = res;
        },
      };
      this.$root.$refs.bodyModal.openBox(config);
    },
    makeRefName(child = null, cindex = -1) {
      let refName = child.type + child.name + child.title + cindex;

      return refName;
    },
    getUUID(child = null, cindex = -1) {
      let uuid_ = uuid.v1();
      if (child) {
        this.childIndex = cindex;
        this.elementName = child.name;
        this.element = child;
      }
      return uuid_;
    },
    openTip(child) {
      let multiplechoice = child.multiplechoice ? child.multiplechoice : false;
      //
      let itemClick = null;
      let inputValue =
        this.$root.$refs[this.formCode][child.name].$parent.inputValue;
      // 多选
      if (multiplechoice === true) {
        itemClick = inputValue + "";
      }
      //
      console.log([multiplechoice, itemClick, child], "openTip");
      //
      this.$root.$refs[this.formCode][child.name].$parent.checkValueRule(
        inputValue,
        true,
        itemClick
      );
      //
      if (child.dialog) {
        this.$root.$refs.dialogBox.openBox(
          child.dialog,
          this.formObj.model[child.name]
        );
        if (this.$root.$refs.autoInput) {
          this.$root.$refs.autoInput.closeBox();
        }
      }
    },
  },
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox, .el-select, .is-bordered, .el-checkbox--small, .el-input, .el-input--small, .el-input-group, .el-input-group--prepend {
  margin: 5px 0px;
}

.el-radio {
  min-width: 100px;
  // padding 0px 0 0px 5px
  white-space: normal;
}

.el-radio-long {
  min-width: 130px;
  white-space: normal;
  margin: 0px 10px 0px 0px !important;
}

.el-input__inner.el-input__inner.el-input__inner {
  width: 100%;
  padding: 0px 5px !important;
  height: 22px !important;

  &:hover, :focus {
    border: 1px solid #4baf8d;
  }
}

.input-elements {
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
}

.input-elements-nowrap {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.vertical-top {
  display: inline-grid;
  vertical-align: top;
}

.help-image {
  padding-top: 7px;
  cursor: pointer;
  position: absolute;
}

.el-tooltip-content {
  max-width: 270px !important;
  text-align: justify;
  font-size: 14px;
  line-height: 1.5em;
  letter-spacing: 0px;
}

.tip {
  font-size: 12px;
  color: blue;
  // margin-bottom 4px
  display: inherit;
  cursor: pointer;
  position: relative;
  bottom: 8px;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.result-text-display {
  text-overflow: ellipsis;
  overflow: hidden;
  width: auto;
  white-space: nowrap;
  display: inline;
  color: black;
  font-size: 12px;
  max-width: 300px;

  &.align {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
  }
}

.el-input {
  width: 228px;
}

.result-text-noeffect {
  max-width: initial;
}
</style>
