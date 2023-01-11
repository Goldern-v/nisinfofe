
<template>
  <span :style="obj.elementsStyle" :class="obj.class" class="input-elements">
    <!-- 页面正文 -->

    <!-- display: inline-grid;vertical-align: top; -->
    <span
      v-for="(child,cindex) in obj"
      :key="child.name+cindex+getUUID(child,cindex)"
      :class="[child.elementClass,(['select','input','selectInput'].indexOf(child.type)>-1?'result-text-display':'')]"
      :style="child.elementStyle ? child.elementStyle : 'margin: 0 0px 0 0;'"
      class="input-element"
    >
      <span :style="child.preTextStyle" :class="child.class" v-if="child.preText">{{child.preText}}</span>
      <!-- html -->
      <!-- <FormGroupTitle :obj="child" :formObj="formObj"/> -->
      <!-- <FormGroupHR :obj="child" :formObj="formObj"/> -->
      <FormGroupHTML :obj="child" :formObj="formObj" />
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
        <el-tooltip
          class="item"
          effect="light"
          placement="top"
          :enterable="false"
          v-if="child.type==='help'"
        >
          <div class="el-tooltip-content" slot="content">
            <div v-html="child.tips"></div>
          </div>
          <img
            v-if="child.type==='help'"
            :src="helpImg"
            :alt="child.title"
            :class="child.class"
            :style="child.style"
            @click="helpClick($event,child)"
            width="14"
          />
        </el-tooltip>
      </span>

      <!-- 人体图按钮显示显示 -->
      <span>
        <span
          v-if="child.type==='bodyBtn'"
          :class="child.class"
          :style="'color:#0000FF;cursor:pointer;padding-left:5px;padding-top:9px;display: block;' + child.style"
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
        class="item itemlist"
        effect="light"
        placement="right-start"
        :enterable="false"
        v-if="child.type==='radio' && child.tips"
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
        <Radiobox v-if="child.type==='radio'" :obj="child" :formObj="formObj" class="radio-input" />
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
          :style="child.lableStyle ? child.lableStyle : {width: child.labelWidth}"
          style="text-align: right; padding-right: 10px;box-sizing: border-box"
        >{{child.label}}</span>
        <span>
          <InputElements v-if="child.children" :obj="child.children" :formObj="formObj" />
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
      <InputBox v-if="child.type==='input'" :obj="child" :formObj="formObj" :col="col" />

      <!-- <el-input v-if="child.type==='input'"  placeholder="" v-model="formObj.model[child.name]" :class="child.class||''" :style="child.style||''" size="small" @click.native.stop="inputClick($event, child)" ><template v-if="child.title" slot="prepend">{{child.title}}</template></el-input>{{child.name}} -->

      <!-- 日期 -->
      <DatePicker v-if="child.type==='datePicker'" :obj="child" :formObj="formObj" />

      <!-- 备注 -->
      <Mark v-if="child.type==='mark'" :obj="child" :formObj="formObj" :col="col" />

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

      <!--  体温类型 -->
      <!-- <span
        class="tip-label"
        :style="child.name === 'I100001' && {position: 'absolute', left: '57px',top: '218px'}"
        v-if="child.name === 'I100001' && getOtherText(child)"
        @click="openTip(child)"
      >{{ getOtherText(child)}}</span>-->

      <!-- <span>{{getOtherText(child)}}</span> -->

      <!-- 对话框结果 -->
      <el-tooltip
        class="item"
        effect="light"
        :enterable="false"
        placement="left"
        v-if="(child.name != 'I100001' || !child.name )&& dialogResult(child).isShow"
      >
        <div slot="content" style="max-width:200px">
          <span v-html="dialogResult(child,true).html"></span>
        </div>
        <!-- <span style="outline:1px solid red;min-width:50px;min-height:10px;background-color:red;display:inline-block;"></span> -->
        <span>
          <span class="tip" v-html="dialogResult(child).html" @click="openTip(child)"></span>
        </span>
      </el-tooltip>
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
// import SelectBox from "./SelectBox";
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
    // SelectBox,
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
  computed: {
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0100";
    }
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
        this.$root.$refs[refName],
        this.$root.$refs
      );
      // if (this.$root.$refs[refName]) {
      //   this.$root.$refs[refName].value = value;
      // }
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
    let refNameTitle = this.obj.title || this.obj.label;
    //
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = new Object();
    }
    if (!this.$root.$refs[this.formCode][refName]) {
      this.$root.$refs[this.formCode][refName] = [];
    }

    if (this.$refs[refName]) {
      this.$refs[refName]["childObject"] = this.obj;
      this.$refs[refName]["checkValueRule"] = this.checkValueRule;
      // this.$root.$refs[refName] = [...this.$root.$refs[refName],this.$refs[refName]];
      //
      this.$root.$refs[this.formCode][refName][refNameTitle] = this.$refs[
        refName
      ];
    }

    // console.log(this.childIndex,'this.$refs:',this.$refs)
    //

    // if (this.$refs) {
    //   let object = this.$refs;
    //   if (this.element.type === "radio") {
    //     // if(!this.$root.$refs[this.elementName]){
    //     //   this.$root.$refs[this.elementName] = new Array()
    //     // }

    //     return;
    //     // for (const key in object) {
    //     //   if (object.hasOwnProperty(key)) {
    //     //     let element = object[key];

    //     //     let childObj = this.obj.find(item => {
    //     //       return key.indexOf(item.type + item.name + item.title) > -1;
    //     //     });

    //     //     element[0]["childObject"] = childObj;

    //     //     try {
    //     //       if (childObj.code === window.formObj.model[childObj.name]) {
    //     //         element[0].value = childObj.code;
    //     //         element[0].model = childObj.code;
    //     //       } else {
    //     //         // element[0].value = "" //
    //     //         element[0].model = "";
    //     //       }
    //     //     } catch (error) {
    //     //       //
    //     //     }

    //     //     this.$root.$refs[this.elementName].push(...element);
    //     //     // console.log('--key',key,'element',element,this.element,'this.$refs',this.$refs,this.$root.$refs,'object',object,this.obj,childObj,childObj.code,element[0].label,childObj.code===element[0].label)
    //     //   }
    //     // }
    //   } else {
    //     if (this.$refs[refName]) {
    //       // console.log(this.childIndex,'this.$refs:',this.$refs[refName])
    //       this.$refs[refName]["childObject"] = this.element;
    //       this.$root.$refs[refName] = this.$refs[refName];
    //     }
    //   }
    // }
    //
  },
  created() {
    this.helpImg = require("./image/说明@2x.png");
    this.lightImg = require("./image/light.png");
    this.alertImg = require("./image/预警@2x.png");
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
      let childrenArr = [];
      let fIndex = -1;

      if (child.rule && child.rule.hasOwnProperty("dialog") > -1) {
        let d = child.rule.filter(item => {
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
        // console.log('!!!dialogs',dialog[0].dialog.title,dialog)
        dialog.map(d => {
          if (d) {
            let title = d.title || d.dialog.title || "";
            // console.log("!!!==!!!", title, d, d.parentName, child);
            let obj = this.formObj.dialogs[title];

            // .find(
            //   item =>
            //     (item.title || item.formSetting.formTitle.formName) === title
            // );
            if (obj) {
              if (obj.formSetting) {
                title = obj.formSetting.formTitle.formName;

                // VTE表单特殊处理
                if (
                  child.title.indexOf("VTE") > -1 &&
                  this.formObj.model[child.name] &&
                  this.formObj.model[child.name].indexOf(title) > -1
                ) {
                  // console.log(
                  //   "!!!=vet=!!!",
                  //   title,
                  //   d,
                  //   d.dialog.parentName,
                  //   obj,
                  //   child,
                  //   child.title,
                  //   child.name,
                  //   this.formObj.model[child.name]
                  // );
                  html += `<span><span style='${obj.style}'>${this.formObj
                    .model[d.dialog.parentName] || ""}${obj.postText ||
                    obj.suffixDesc ||
                    ""}</span></span>`;
                  hasNewLine ? (html += newLine) : (html = html);
                }
                //
                // console.log('d.cleanKey',d,d.dialog.cleanKey,'child.title',child.title,this.formObj.model[child.name])
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
                  html += `<span><span style='${obj.style}'>${this.formObj
                    .model[d.dialog.parentName] || ""}${obj.postText ||
                    obj.suffixDesc ||
                    ""}</span></span>`;
                  hasNewLine ? (html += newLine) : (html = html);
                }
              } else {
                title = child.postTitle || obj.aliasTitle || obj.title;
              }
              let objChildren = obj.body ? obj.body : obj.children;
              // console.log('!!title!!',obj.title,obj,objChildren)
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
                    html += `<span style='color:green'>${title}:</span><span>${this
                      .formObj.model[obj.name] || ""}${obj.postText ||
                      obj.suffixDesc ||
                      ""}</span>`;
                    hasNewLine ? (html += newLine) : (html = html);
                  }
                }
                //

                //
                // if(d.parentName && this.formObj.model && this.formObj.model[d.parentName]){
                //     title = d.title || d.dialog.title || ""
                //     let value = this.formObj.model[d.parentName]
                //     console.log('!!parentName!!',title,obj,d.parentName,value)
                //     // if(value){
                //       html += `<p>表单${title}:<span style='${d.style}'>${value||""}${d.suffixDesc||""}??</span></p>`
                //     // }
                //   }
              } catch (e) {
                //
                console.log("error", e);
              }

              //
              let handleChild = children => {
                if (children) {
                  // console.log('!!!children',children.name,children,children.length)

                  children.map((mychild, cindex) => {
                    title =
                      children.aliasTitle ||
                      mychild.aliasTitle ||
                      mychild.label ||
                      mychild.title;
                    // console.log('!!mychild!!',title, mychild)
                    if (
                      !title ||
                      (mychild.type && mychild.type === "formGroupHR")
                    ) {
                      return;
                    }
                    if (childrenArr && childrenArr.length > 0) {
                      fIndex = childrenArr.findIndex(res => {
                        return (
                          res.name == mychild.name && res.type == mychild.type
                        );
                      });
                      if (fIndex != -1) {
                        return;
                      } else {
                        childrenArr = [...childrenArr, mychild];
                      }
                    } else {
                      childrenArr = [...childrenArr, mychild];
                    }

                    // console.log('childrenArr:',fIndex,mychild.name,childrenArr)

                    //
                    if (mychild.children) {
                      if (this.formObj.model[mychild.name]) {
                        // console.log('!!!!!mychild',mychild.name,mychild)
                        html += `<span style='margin-right:5px'><span style='color:green'>${title}</span>:<span>${this
                          .formObj.model[mychild.name] ||
                          ""}<span style='color:chocolate'>${child.postText ||
                          child.suffixDesc ||
                          ""}</span></span></span>`;
                        hasNewLine
                          ? (html += newLine)
                          : (html += children.length != cindex + 1 ? "," : "");
                      }
                      return handleChild(mychild.children);
                    }
                    //
                    if (
                      mychild.hasOwnProperty("children") > -1 &&
                      ["radio", "checkbox"].indexOf(mychild.type) === -1
                    ) {
                      if (
                        this.formObj.model[mychild.name] &&
                        mychild.name != "evalScore"
                      ) {
                        html += `<span><span style='color:green'>${title}</span>:<span style='${
                          mychild.style
                        }'>${this.formObj.model[mychild.name] ||
                          ""}<span style='color:chocolate'>${mychild.postText ||
                          mychild.suffixDesc ||
                          ""}</span>`;
                        hasNewLine
                          ? (html += newLine)
                          : (html += children.length != cindex + 1 ? "," : "");

                        //((cindex!=children.length)?html : html);
                      }
                      // else{
                      //   html += `<p style="color:red">${ title }:${this.formObj.model[mychild.name]||""}</p>`
                      // }
                    }
                    //
                  });
                }
              };

              handleChild(objChildren);
            }
            // else{
            // if(d.parentName){
            //   title = d.title || d.dialog.title || ""
            //   console.log('!!parentName!!',title,obj,d.parentName,this.formObj.model[d.parentName])
            //   html += `<p>表单${title}:<span style='${d.style}'>${this.formObj.model[d.parentName]||""}${d.suffixDesc||""}??</span></p>`
            // }
            // }
          } else {
            // console.log('!!!!!!',d)
          }
        });
        // html
      }
      let result = {
        isShow: isShow,
        html: html
      };

      return result;
    },
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
              // console.log(codeList, "codeListcodeListcodeListcodeList");
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
      if (this.$root.$refs[this.formCode]["evalScore"]) {
        this.$root.$refs[this.formCode]["evalScore"].setCurrentValue(score);
        this.$root.$refs[this.formCode]["evalDesc"].setCurrentValue(score);
        this.$root.$refs[this.formCode]["evalDesc"].checkValueRule(score);
      }
      //
      // 评估得分：0-20分完全依赖；20-40分严重依赖；40-60分明显依赖；＞60分基本自理
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
        list: this.$root.$refs[this.formCode][child.name].currentValue || "",
        mode: 1,
        callback: res => {
          this.setElementValue(child.name, res);
          this.formObj.model[child.name] = res;
        }
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
      console.log(child, "childchild", this.formObj.model, this.formObj);
      try {
        //
        //
        // this.$root.$refs[this.formCode][child.name].map(el=>{
        //
        Object.keys(this.$root.$refs[this.formCode][child.name]).map(elKey => {
          let el = this.$root.$refs[this.formCode][child.name][elKey];
          console.log("el", el);
          //
          el.$parent.checkValueRule(el.$parent.inputValue, true);
        });
      } catch (error) {
        console.log("openTip", error);
      }
      // this.$root.$refs[this.formCode][child.name].$parent.checkValueRule(
      //   this.$root.$refs[this.formCode][child.name].$parent.inputValue,
      //   true
      // );
      if (child.dialog) {
        this.$root.$refs.dialogBox.openBox(
          child.dialog,
          this.formObj.model[child.name]
        );
      }
    },
    isChineseChar(str) {
      var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      return reg.test(str);
    },
    setElementValue(key, value) {
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        this.$root.$refs[this.formCode][key][elkey].setCurrentValue(value);
      });
    },
    getElementValue(key) {
      let result = "";
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        result = this.$root.$refs[this.formCode][key][elkey].currentValue;
      });
      return result;
    },
    getValueRule(key, value) {
      let textResult = "";
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        textResult = this.$root.$refs[this.formCode][key][elkey].checkValueRule(
          value
        );
      });
      return textResult;
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
  // width: 100%;
  justify-content:center;

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
  max-width: 310px!important;
  text-align: justify;
  font-size: 13px;
  line-height: 1.5em;
  letter-spacing: 0px;
.tip
  font-size 12px
  color blue
  // margin-bottom 4px
  // display inherit
  cursor pointer
  position: relative;
  bottom: 8px;
  vertical-align: bottom;
.tip-label
  font-size 12px
  color blue
  margin-bottom 4px
  display inherit
  cursor pointer
.result-text-display
  text-overflow: ellipsis;
  overflow: hidden;
  width: auto;
  white-space: nowrap;
  display: inline;
  color: black;
  font-size: 12px;
  max-width: 320px;
  &.align
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
.el-input
  width 228px;
.result-text-noeffect
  max-width: initial;
// .post-text
//   color: #486a62;
//   background: white;
//   border-radius: 0;
//   border: 0px!important;
//   background: transparent;
//   font-size: 12px!important;
//   display: flex;
//   align-items: center;

</style>
