
<template>
  <SweetModal
    ref="sweetModal"
    :titleIcon="getTitleIcon(title)"
    :title="title || ' '"
    :modal-width="modalWidth"
    :fullBtn="false"
    class="custom-sweet-modal"
  >
    <!-- dialog-loading -->
    <div v-loading="dialogLoading" :class="{ lock: lock }">
      <!-- <div class="dialog-loading-text">{{dialogLoadingText}}</div> -->

      <div class="form-select-con" v-show="formList.length > 1">
        <span>选择：</span>
        <el-radio-group
          v-model="selectedForm"
          @change="changeSelectForm"
          size="small"
        >
          <el-radio-button
            v-for="(item, index) in formList"
            :key="index"
            :label="index"
            >{{ item.title }}</el-radio-button
          >
        </el-radio-group>
      </div>

      <!-- <el-form> -->

      <span v-if="show">
        <!-- 片段内容组件显示 el-form-item :model="form"-->
        <span
          v-if="
            formBox &&
            (formBox.hasOwnProperty('children') !== -1 ||
              (formBox && formBox.hasOwnProperty('html') !== -1))
          "
        >
          <!-- 页面正文 -->
          <div v-if="formBox.children || formBox.html">
            <FormBody :obj="formBox.body || [formBox]" :formObj="formBox" />
          </div>
        </span>
        <!-- </el-form-item> -->

        <!-- 表单整页内容显示 -->
        <span v-if="formBox && formBox.schemes">
          <!-- 页面标题 -->
          <FormTitle
            v-if="formBox.formSetting && formConfig.showHead"
            :obj="formBox.formSetting"
            :formObj="formBox"
          />

          <!-- 页面头部 -->
          <FormHeader
            v-if="formBox.header"
            :obj="formBox.header"
            :formObj="formBox"
          />

          <!-- 页面正文 -->
          <FormBody
            v-if="formBox.body"
            :obj="formBox.body"
            :formObj="formBox"
          />

          <!-- 页面尾部 -->
          <FormFooter
            v-if="formBox.footer"
            :obj="formBox.footer"
            :formObj="formBox"
          />
        </span>
      </span>

      <!-- </el-form-item>
      </el-form>-->
    </div>

    <!-- <el-form-item> -->
    <!-- 弹框底部按钮 -->
    <el-button slot="button" v-if="hasCancel" @click="close">{{
      cancelText || "取消"
    }}</el-button>
    <el-button slot="button" v-if="hasOK" type="primary" @click="clickOK()">{{
      okText || "确认"
    }}</el-button>
    <el-button slot="button" v-if="isDev" @click="clickOK(true)">{{
      "开发确认按钮"
    }}</el-button>
  </SweetModal>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import FormBody from "./FormBody";
import InputElements from "./InputElements";
import FormTitle from "./FormTitle";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
// import FormGroupTitle from './FormGroupTitle'
// import FormGroupHR from './FormGroupHR'
// import FormGroupHorizontalBox from './FormGroupHorizontalBox'
// import FormGroupColBox from './FormGroupColBox'
// import draggable from 'vuedraggable'
import bus from 'vue-happy-bus';
import dayjs from "dayjs";

import comm, {
  saveForm,
  getFormDetail,
  cancelSignForm,
  getOldFormCode,
  getVTEInfo,
} from "@/Page/sheet-hospital-admission/components/Render/common.js";

import { debug } from "util";
// src/Page/sheet-hospital-admission/components/Render/common.js
import common from "@/common/mixin/common.mixin.js";
import mergeDefaultValue from "../data/defalutValue/utils";
export default {
  name: "DialogSweet",
  mixins: [common],
  props: {
    obj: Object,
    formObj: Object,
  },
  components: {
    FormTitle,
    FormHeader,
    FormBody,
    FormFooter,
    InputElements,
    // FormGroupTitle,
    // FormGroupHR,
    // FormGroupHorizontalBox,
    // FormGroupColBox,
    // draggable,
  },
  data() {
    return {
      lock: false,
      dialogFormVisible: false,
      formLabelWidth: "220px",
      modalWidth: 780,
      title: "",
      size: "",
      top: "",
      okText: "",
      cancelText: "",
      hasCancel: false,
      hasOK: false,
      dialogLoading: false,
      dialogLoadingText: "数据载入中...",
      type: "independent",
      formBox: null /** 弹窗的数据 */,
      callback: null,
      callbackInfo: null,/** JSON配置中替代callback*/
      formDialogObj: {},
      formCode: "E0001",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formList: [],
      selectedForm: "",
      formConfig: {},
      parentFormCode: "",
      dialogFormCode: "",
      show: true,
      bus: bus(this),
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  // beforeMount(){
  //   this.clearFormBox();
  // },
  created() {
    this.clearFormBox();
  },
  methods: {
    clearFormBox() {
      // this.formObj.model[this.dialogFormCode] = ""

      this.formBox = {};
      this.formBox["model"] = {};
      this.formBox["selectedItems"] = [];
      this.formDialogObj = JSON.parse(JSON.stringify(this.formObj));
      this.formDialogObj.model = {};
      this.formList = [];
      this.selectedForm = "";
      this.formConfig = {};
      this.parentFormCode = "";
      this.dialogFormCode = "";
      this.callbackInfo = null;
    },
    inital() {
      this.lock = false;
      // this.formBox = {};
      this.formDialogObj = JSON.parse(JSON.stringify(this.formObj));
      this.formDialogObj.model = {};

      // 初始化清空数据
      let object = this.formBox.schemesObj;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          this.formDialogObj.model[key] = "";
          this.formBox.model[key] = "";
        }
      }

      /** 设置默认值 */
      mergeDefaultValue(this.formDialogObj.model);
      mergeDefaultValue(this.formBox.model);

      this.formBox["selectedItems"] = [];

      // todo
      if (this.type === "dependent") {
        this.formCode = "E0001";
        console.log(
          "根据ID表单dependent",
          id,
          this.formBox,
          this.formObj,
          this.$root.$refs
        );
        if (
          this.formBox.hasOwnProperty("children") &&
          (this.formBox.children.length > 0 ||
            (this.formBox.hasOwnProperty("body") &&
              this.formBox.body.length > 0))
        ) {
          this.formBox.model = {};
          this.formBox.children.map((child) => {
            if (child.name) {
              if (window.formObj.model[child.name]) {
                this.formBox.model[child.name] =
                  window.formObj.model[child.name];
              } else {
                this.formBox.model[child.name] = "";
              }
            }
          });

          if (this.formBox.hasOwnProperty("body")) {
            this.formBox.body.map((b) => {
              if (b.hasOwnProperty("children")) {
                b.children.map((child) => {
                  if (window.formObj.model[child.name]) {
                    this.formBox.model[child.name] =
                      window.formObj.model[child.name];
                  } else {
                    this.formBox.model[child.name] = "";
                  }
                });
              }
            });
          }

          // for (const key in this.formBox.model) {
          //   if (this.formBox.model.hasOwnProperty(key)) {
          //     this.formBox.model[key] = window.formObj.model[key] + ''
          //   }
          // }
          console.log(
            "根据ID表单formBox.model",
            this.formBox.model,
            this.$refs
          );
          setTimeout(() => {
            this.fillUIFormData(this.formBox.model);
          }, 100);
          return;
        }
      }

      if (this.type !== "dependent") {
        console.log("根据ID表单independent", [
          id,
          this.formBox,
          this.formObj,
          this.$root.$refs,
        ]);
        this.clearUIFormData(this.formBox.model);
        // 初始化 评估时间 评估人 状态
        // const initialKeys = ['evalDate','signerName','status']
        if (!this.formBox.model["evalDate"]) {
          this.formBox.model["evalDate"] = dayjs().format("YYYY-MM-DD HH:mm");
        }
      }
      // this.$forceUpdate();

      // 根据ID获取表单数据
      // this.formBox.model.id
      let id =
        this.formObj.model[this.dialogFormCode] || this.formBox.model.id || "";
      console.log("根据ID表单", id, this.formBox, this.formObj);
      if (id) {
        id = ~~id;
        getFormDetail(id, (res) => {
          console.log("根据ID获取表单数据", res);
          let {
            data: {
              data: { itemData: itemData, master: master },
            },
          } = res;
          //
          this.formBox.model = {
            ...itemData,
            ...master,
          };
          //
          if (this.formBox.model.status) {
            this.okText =
              this.formBox.model.status != "0" ? "取消签名" : "签名";
            //
            if (this.okText == "取消签名") {
              this.lock = true;
            }
          }

          // signerName = this.empName()
          if (!this.formBox.model.signerName) {
            this.formBox.model.signerName = this.empName || "";
            this.$root.$refs[this.formCode]["signerName"].setCurrentValue(
              this.empName
            );
          }

          console.log(
            "根据ID获取表单数据formBox",
            this.formBox,
            this.$root.$refs,
            this.empName
          );
          this.fillUIFormData(this.formBox.model);
          this.dialogLoading = false;
        });
      } else {
        this.dialogLoading = false;
      }

      // signerName = this.empName()
      if (!this.formBox.model.signerName) {
        this.formBox.model.signerName = this.empName || "";
        console.log(
          "根据ID获取表单数据signerName",
          this.formBox,
          this.$root.$refs,
          this.empName
        );
        if (this.$root.$refs[this.formCode]["signerName"]) {
          this.$root.$refs[this.formCode]["signerName"].setCurrentValue(
            this.empName
          );
        }
      }

      //
    },
    fillUIFormData(model = this.formBox.model) {
      console.log("fillFormData", model, this.formBox);
      this.formBox["selectedItems"] = [];
      for (const key in model) {
        if (model.hasOwnProperty(key)) {
          let value = model[key];

          if (!value || !this.$root.$refs[this.formCode][key]) {
            continue;
          }

          // text
          try {
            if (this.$root.$refs[this.formCode][key]) {
              // text
              if (
                ["text", "textarea"].indexOf(
                  this.$root.$refs[this.formCode][key].type
                ) > -1
              ) {
                let refObj = this.$root.$refs[this.formCode][key];
                let textResult = "";
                // let resultText = refObj.checkValueRule(value);
                // refObj.setCurrentValue(resultText);
                console.log("text!!!", key, refObj);
                if (key === "status") {
                  textResult = refObj.checkValueRule(value + "");
                  // console.log("----refObj", refObj, key, textResult);
                  refObj.setCurrentValue(textResult + "");
                } else if (key === "evalDesc") {
                  let evalScore = model["evalScore"];
                  console.log("---evalDesc", evalScore, this.$root.$refs);
                  if (evalScore) {
                    textResult = refObj.checkValueRule(evalScore + "");
                    refObj.setCurrentValue(textResult + "");
                  }
                } else {
                  refObj.setCurrentValue(value);
                  refObj.checkValueRule(value);
                }
              }
              // datetime
              if (this.$root.$refs[this.formCode][key].type === "datetime") {
                // if (key === "datePicker") {
                console.log(
                  "datePicker:",
                  this.$root.$refs[this.formCode][key],
                  key,
                  value
                );
                if (
                  this.$root.$refs[this.formCode][key].$parent &&
                  this.$root.$refs[this.formCode][key].$parent.obj.name_date
                ) {
                  let name_date =
                    this.$root.$refs[this.formCode][key].$parent.obj.name_date;
                  let name_time =
                    this.$root.$refs[this.formCode][key].$parent.obj.name_time;
                  this.$root.$refs[this.formCode][key].$parent.datePickerValue =
                    model[name_date] + " " + model[name_time];
                } else {
                  this.$root.$refs[this.formCode][key].$parent.datePickerValue =
                    value;
                }

                // }
              }
            }
          } catch (error) {
            //
            console.log("error", error);
          }

          // if (
          //   this.$root.$refs.hasOwnProperty(key) > -1 &&
          //   this.$root.$refs[this.formCode][key].hasOwnProperty("constructor") > -1
          // ) {
          //   // console.log(
          //   //   "===constructor",
          //   //   this.$root.$refs[this.formCode][key].constructor === Array
          //   // );
          // }

          // this.$root.$refs[this.formCode][key].hasOwnProperty('constructor)

          // if(!this.$root.$refs[this.formCode][key]){return}
          // if (value && this.$root.$refs[this.formCode][key]) {
          if (
            value &&
            this.$root.$refs[this.formCode][key].constructor === Array
          ) {
            let items = this.$root.$refs[this.formCode][key];
            // console.log('--items-this.$root.$refs[this.formCode][key]:',this.$root.$refs[this.formCode][key])

            // items = [...items]

            // let rootRefs = this.$root.$refs[this.formCode][this.obj.name]
            // console.log(
            //   "-Array-obj.name:",
            //   this.obj,
            //   items,
            //   items.length,
            //   this.$root.$refs[this.formCode][key],
            //   value
            // );

            let name = key;
            for (let k in items) {
              if (items.hasOwnProperty(k)) {
                let item = items[k];
                let title = item.childObject.title || "";
                let code = item.childObject.code || title;
                if (!item.$parent) {
                  continue;
                }

                // console.log('-----',item.childObject.title ,item,item.childObject.code,value,item.childObject.code == value,item.childObject.title == value,code)
                // || item.childObject.title == value
                let valueArr = value.split(",");
                console.log("选项:", item, [code], [value], [valueArr]);
                if (
                  code == value ||
                  title == value ||
                  valueArr.indexOf(code) > -1 ||
                  valueArr.indexOf(title) > -1
                ) {
                  // this.okText == "取消签名" disabled
                  // console.log('---++',item.childObject.title ,item)
                  this.formBox["selectedItems"].push(item.childObject);
                  // item.model = []
                  // if (item.model.length == 0) {
                  //   item.model.push(value);
                  //   this.$root.$refs[this.formCode][key][k].model.push(value);
                  // }
                  if (
                    this.$root.$refs[this.formCode][key][k].model.length == 0
                  ) {
                    this.$root.$refs[this.formCode][key][k].model.push(value);
                  }
                  console.log("selectedItems", this.formBox["selectedItems"]);
                }
                if (value == "on,") {
                  item.$parent.checkboxValue = [code];
                } else {
                  let data = model[name].split(",");
                  if (data.indexOf(code) > -1) {
                    item.$parent.checkboxValue = [code];
                  } else {
                    item.$parent.checkboxValue = [];
                  }
                }

                // console.log("多选项", item, "code", code);
              }
            }

            // items.map(item => {
            //   // console.log('item.childObject',item,item.label == value,item.childObject.code == value,value,item.label,item.childObject.code,item.childObject,item.childObject.title,item.childObject.name)
            //   if(item.label == value && item.hasOwnProperty('childObject') ){
            //     // item.value = value
            //     item.model = value
            //     // childObject
            //     // console.log('item.childObject',item,value,item.label,item.childObject.code,item.childObject,item.childObject.title,item.childObject.name)
            //     // console.table(item.childObject)
            //     this.formBox["selectedItems"].push(item.childObject);
            //     // this.$forceUpdate();
            //   }
            // });
            // } else {
            // }

            // text
            // try {
            //   if (this.$root.$refs[this.formCode][key]) {
            //     console.log(
            //       "---this.$root.$refs[this.formCode][key]:",
            //       key,
            //       this.formBox.model[key],
            //       this.$root.$refs[this.formCode][key]
            //     );
            //     if (this.$root.$refs[this.formCode][key].type === "text") {
            //       this.$root.$refs[this.formCode][key].setCurrentValue(value + "");
            //       this.$root.$refs[this.formCode][key].checkValueRule(value + "");
            //     }
            //   }
            // } catch (error) {
            //   //
            //   console.log("error", error);
            // }
          }
        }
        //
        // console.log("fillFormData:END", model, this.formBox, this.$root.$refs);
        // this.$root.$refs[this.formCode][]
        // this.dialogLoading = false;
      } // for
    },
    clearUIFormData(model = this.formBox.model) {
      // console.log("clearUIFormData", model, this.formBox);
      this.formBox["selectedItems"] = [];
      for (const key in model) {
        if (model.hasOwnProperty(key)) {
          let value = model[key];
          if (value && this.$root.$refs[this.formCode][key]) {
            if (this.$root.$refs[this.formCode][key].constructor === Array) {
              this.$root.$refs[this.formCode][key].map((item) => {
                item.model = [];
                // item.value = "";
              });
            }
          }
          if (this.$root.$refs[this.formCode][key]) {
            // console.log(
            //   "---this.$root.$refs[this.formCode][key]:",
            //   key,
            //   this.formBox.model[key],
            //   this.$root.$refs[this.formCode][key]
            // );
            if (
              ["text", "textarea"].indexOf(
                this.$root.$refs[this.formCode][key].type
              ) > -1
            ) {
              this.$root.$refs[this.formCode][key].setCurrentValue(value + "");
              this.$root.$refs[this.formCode][key].checkValueRule(value + "");
            }
            //
            // "datetime"
            if (
              ["datetime"].indexOf(this.$root.$refs[this.formCode][key].type) >
                -1 &&
              this.$root.$refs[this.formCode] &&
              this.$root.$refs[this.formCode][key].setCurrentValue
            ) {
              this.$root.$refs[this.formCode][key].setCurrentValue(
                dayjs().format("YYYY-MM-DD HH:mm")
              );
              // this.$root.$refs[this.formCode][key].checkValueRule(dayjs().format("YYYY-MM-DD HH:mm"));
            }
          }
          // try {

          // } catch (error) {

          // }
          // console.log(
          //   "clearUIFormData:end",
          //   model,
          //   this.formBox,
          //   this.$root.$refs
          // );
        }
      }
    },
    open() {
      console.log("sweetModalOpen", this.$refs, this.$root.$refs);
      if (this.$refs.sweetModal) {
        this.$refs.sweetModal.open();
      }

      // this.dialogLoading = true;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        if (this.type === "dependent") {
          console.log("formBox", this.formBox, this.$root.$refs);
          setTimeout(() => {
            this.fillUIFormData(this.formBox.model);
            this.dialogLoading = false;
          }, 100);
        }
      });
      console.log("clearUIFormData:end", this.formBox, this.$root.$refs);
    },
    // open() {
    //   console.log("sweetModalOpen", this.$refs, this.$root.$refs);
    //   this.$refs.sweetModal.open();
    //   // this.dialogLoading = true;
    //   this.show = false;
    //   this.$nextTick(() => {
    //     this.show = true;
    //     if (this.type === "dependent") {
    //       setTimeout(() => {
    //         this.fillUIFormData();
    //         this.dialogLoading = false;
    //       }, 100);
    //     }
    //   });
    // },
    close() {
      this.$refs.sweetModal.close();
      if (this.type !== "dependent") {
        this.clearUIFormData();
        // setTimeout(() => {
        this.formBox = {};
        // }, 1000);
      }
    },
    onClose() {
      this.close();
    },
    clickOK(isDev = false) {
      if (isDev) {
        this.dialogLoading = !this.dialogLoading;
      }
      console.log(
        "clickOK",
        this.type,
        "formBox",
        this.formBox,
        "formObj",
        this.formObj,
        "formDialogObj",
        this.formDialogObj
      );

      if (this.type === "dependent") {
        for (let key in this.formBox.model) {
          // console.log(key, "keykeykeykeykeykeykeykeykey");
          if (this.formBox.model.hasOwnProperty(key)) {
            if (key.indexOf("CLONE_") > -1) {
              let newKey = key.split("CLONE_")[1];
              this.formBox.model[newKey] = this.formBox.model[key];
              // console.log(newKey, "newKeynewKeynewKeynewKeynewKey");
              if (
                this.$root.$refs[this.formCode][newKey] &&
                this.$root.$refs[this.formCode][newKey].$parent
              ) {
                this.$root.$refs[this.formCode][newKey].$parent.inputValue =
                  this.formBox.model[newKey];
                // delete this.formBox.model[key];
              }
            }
          }
        }
        this.formObj.model = { ...this.formObj.model, ...this.formBox.model };

        window.formObj.model = {
          ...window.formObj.model,
          ...this.formBox.model,
        };

        console.log(this.formObj.model, " this.formObj.model");
        !isDev && this.close();
        // return;
      }

      if (this.type === "help") {
        this.close();
      }

      this.formDialogObj = JSON.parse(JSON.stringify(this.formBox));

      // 15-18分轻度危险；13-14分中度危险；10-12分高度危险；＜9分极度危险

      if (this.dialogFormCode) {
        // this.formBox.model.parentId = this.formObj.model.id;
        this.formBox["formCode"] = this.dialogFormCode;
        this.formBox.model.parentId =
          window.formObj.model.formId || window.formObj.model.id;
        // this.formBox.model.status = window.formObj.model.status

        let signBoxTitle = this.okText + "确认";

        let postData = {
          id: this.formBox.model.id || "",
          // empNo: empNo,
          sign: true,
          // "audit": true,
          // password: password,
        };
        // cancelSignForm
        if (this.okText == "取消签名") {
          cancelSignForm(postData, (res) => {
            console.log("取消签名", [postData, cancelSignForm, comm]);
            this.inital();
          });
        } else {
          //
          this.formBox.model = {
            ...this.formBox.model,
            ...postData,
            // sign: true,
            // empNo,
            // password
          };
          //
          //
          saveForm({ ...this.formBox }, (res) => {
            this.dialogLoading = false;
            let {
              data: {
                data: {
                  formResult: { id: id },
                },
              },
            } = res;
            this.formObj.model[this.dialogFormCode] = id;

            let getYinYang = (str) => {
              return str === "+" ? "阳性" : "阴性";
            };

            try {
              console.log("root.refs", this.$root.$refs);
              // parentName
              if (this.parentName) {
                if (this.parentName == "I100028") {
                  // 吞咽评估特殊处理
                  let result = "";
                  if (this.formBox.model.I047012) {
                    result +=
                      "吞水:" + getYinYang(this.formBox.model.I047012) + " ";
                  }
                  if (this.formBox.model.I047024) {
                    result +=
                      "吞糊:" + getYinYang(this.formBox.model.I047024) + " ";
                  }
                  this.formBox.model.evalDesc = result;
                  this.formObj.model.I100028 = result;

                  if (
                    this.$root.$refs[this.formCode][this.parentName + "_clone"]
                  ) {
                    this.$root.$refs[this.formCode][
                      this.parentName + "_clone"
                    ].setCurrentValue(result);
                    this.$root.$refs[this.formCode][
                      this.parentName + "_clone"
                    ].checkValueRule(result);
                  }
                  if (this.$root.$refs[this.formCode][this.parentName]) {
                    log
                    this.$root.$refs[this.formCode][
                      this.parentName
                    ].setCurrentValue(result);
                    this.$root.$refs[this.formCode][
                      this.parentName
                    ].checkValueRule(result);
                    this.formObj.model[this.parentName] = result;
                    this.formBox.model[this.parentName] = result;
                    console.log("parentName:", this.parentName, result);
                  }
                  console.log("--parentName:", this.parentName, result);
                } else {
                  let score = this.formBox.model.evalScore;
                  let desc = this.formBox.model.evalDesc || "";
                  if(this.formBox.model.formCode == 'E0616'){
                    console.log(this.formBox.model["I385031"],'11111111111111111')
                    if(this.formBox.model["I385031"] == null){
                      this.formBox.model["I385031"] = '_'
                    }
                     if(score.indexOf('分') != -1){
                       let result = score + " " + this.formBox.model["I385031"];
                       this.formObj.model[this.parentName] = result;
                     }else{
                       let result = score + "分 " + this.formBox.model["I385031"];
                       this.formObj.model[this.parentName] = result;
                     }
                  }else{
                    let result = score + "分 " + desc;
                    this.formObj.model[this.parentName] = result;
                  }


                  if (this.$root.$refs[this.formCode][this.parentName]) {
                    console.log("parentName", this.parentName);
                    this.$root.$refs[this.formCode][
                      this.parentName
                    ].setCurrentValue(result);
                    this.$root.$refs[this.formCode][
                      this.parentName
                    ].checkValueRule(result);
                  }

                  /** GCS评估特殊处理 */
                  if (this.parentName == "I100020") {
                    let result = this.formBox.model.evalDesc;
                    this.$root.$refs[this.formCode]["I100019"].setCurrentValue(
                      result
                    );
                    this.$root.$refs[this.formCode]["I100019"].checkValueRule(
                      result
                    );
                  }
                }
              }
            } catch (e) {
              console.log("saveError:", e);
            }

            console.log(
              "===saveForm:res",
              res,
              isDev,
              this.formBox,
              this.formObj,
              this.parentName,
              this.$root.$refs[this.formCode][this.parentName]
            );
            //
            try {
              window.formTool.formSave();
              // window.rundev();
             this.$root.$refs["sheetPage"].fillForm();
            } catch (err) {
              console.log("formSave", err, window.formTool);
            }

            //
            if (!isDev) {
              this.close();
            }
          });
        }
        // window.openSignModal((password, empNo) => {

        // }, signBoxTitle);
      }

      /**回传弹窗的某一个值*/
      if(this.callbackInfo) {
        let resVal = this.formObj.model[this.callbackInfo.reqCode];
        if(this.callbackInfo.prefix) {
          resVal = this.callbackInfo.prefix + resVal;
        }
        if(this.callbackInfo.suffix) {
          resVal = resVal + this.callbackInfo.suffix;
        }
        if(this.callbackInfo.openKey) {
          resVal = this.formObj.model[this.callbackInfo.openKey] + "：" + resVal;
        }
        this.formObj.model[this.callbackInfo.respCode] = resVal;
        /**bus发送方法 `updateValue${this.obj.name}` **/
        this.bus.$emit(`updateValue${this.callbackInfo.respCode}`);
      }

      // console.log(this.callback, "aaaaaaaaa");
      if (this.callback) {
        // formBox
        this.callback(this.formDialogObj);
      }
      console.log("formDialogObj", this.formBox, isDev);
    },
    initForm(config, value = null) {
      console.log("openBox", config, value, this.obj, this.formObj);
      this.title = config.aliasTitle || config.title || "";
      this.size = config.size || "";
      this.top = config.top || "";
      this.okText = config.okText || "";
      this.cancelText = config.cancelText || "";
      this.hasCancel = config.hasCancel === false ? false : true;
      this.hasOK = config.hasOK === false ? false : true;
      this.type = config.type || "dependent";
      this.callback = config.callback || null;
      this.callbackInfo = config.callbackInfo || null;//JSON配置无法使用callback导入函数，用calbackInfo操纵关键变量

      //
      if (config.type === "independent") {
        this.okText = "签名";
      }
      //
      if (
        config.parentName &&
        this.formObj.model[config.parentName] &&
        config.type === "dependent"
      ) {
        // config.title = this.formObj.model[config.parentName] || config.title;
      }

      // this.formBox = JSON.parse(
      //   JSON.stringify(
      //     this.formObj.dialogs.find(
      //       f => (f.title || f.formSetting.formTitle.formName) == config.title
      //     )||null
      //   )
      // );

      this.formBox = JSON.parse(
        JSON.stringify(this.formObj.dialogs[config.title] || {})
      );

      if (!this.formBox) {
        return;
      }

      //
      if (config.otherDialog) {
        this.formBox.name = config.otherDialog.name || "";
        this.formBox.children.map((c) => {
          c.name = config.otherDialog.name || "";
        });
        this.formBox.aliasTitle = config.otherDialog.title || "";
      }

      // try {
      //   this.formBox = JSON.parse(JSON.stringify(formBoxModal));
      // } catch (error) {
      //   //
      // }

      if (!this.formBox) {
        return console.error("弹窗配置为空");
      }
      //
      // }

      // if (!this.formBox) {
      //   return console.error("弹窗配置为空");
      // }
      //
      this.formBox.model = this.formBox.model ? this.formBox.model : {};

      //
      try {
        this.parentName = config.parentName || "";
        this.parentFormCode = config.parentFormCode
          ? config.parentFormCode
          : this.formObj.formSetting.formInfo.formCode;
        this.dialogFormCode = this.formBox.formSetting.formInfo.formCode;
        //
        this.formCode = this.dialogFormCode || "E0001";
      } catch (error) {
        //
        this.dialogFormCode = "";
        this.formCode = "E0001";
      }
      // modalWidth
      this.modalWidth = this.formBox.hasOwnProperty("modalWidth")
        ? this.formBox.modalWidth
        : 780;
      //
      this.formConfig = config;
      console.log(
        "=====formBox",
        this.formBox,
        config.title,
        "parentFormCode:",
        this.parentFormCode,
        "dialogFormCode:",
        this.dialogFormCode
      );

      this.open();
      setTimeout(() => {
        this.inital();
        // this.dialogLoading = false;
      }, 100);
    },
    openBox(config, value = null) {
      console.log(config, "configconfigconfigconfig");
      this.formList = [];
      this.selectedForm = null;
      if (config.constructor == Array) {
        if (config.length > 1) {
          this.formList = config;
          this.selectedForm = 0;
          this.initForm(this.formList[this.selectedForm]);
        } else {
          this.initForm(config[0]);
        }
      } else {
        this.initForm(config);
      }
    },
    changeSelectForm() {
      console.log(
        this.formList[this.selectedForm],
        " this.formList[this.selectedForm] "
      );
      this.formList[this.selectedForm] &&
        this.initForm(this.formList[this.selectedForm]);
    },
    closeBox() {
      this.close();
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    getTitleIcon(title) {
      let icon = null;
      try {
        icon = require("./image/icons/" + title + "@2x.png");
        return icon;
      } catch (error) {
        console.log("icon:error", error);
      }
      return "";
    },
  },
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox, .is-bordered, .el-checkbox--medium, .el-input, .el-input--medium, .el-input-group, .el-input-group--prepend {
  margin: 5px 0px;
}

.custom-sweet-modal {
  width: 100% !important;
  min-height: 50%;

  >>>.sweet-content {
    padding: 10px !important;
  }
}

.sweet-modal .sweet-content .sweet-content-content {
  >>>&.lock {
    cursor: not-allowed !important;
  }
}

.form-select-con {
  text-align: left;
  margin: 5px 8px;
}

.dialog-loading {
  width: 100%;
  height: calc(100% - 95px);
  background: #fff;
  position: absolute;
  z-index: 9;
  margin-left: -10px;
  margin-top: -10px;
}

.dialog-loading-text {
  text-align: center;
  margin-top: 45%;
  color: #2e8b57;
}

.lock {
  pointer-events: none;

  /deep/ input, /deep/ .el-checkbox__inner {
    background: #f5f7faff !important;
  }

  /deep/ .el-checkbox__inner::after {
    border-color: black !important;
  }
}

>>>.el-loading-mask, .is-fullscreen {
  z-index: 20005 !important;
}
</style>
