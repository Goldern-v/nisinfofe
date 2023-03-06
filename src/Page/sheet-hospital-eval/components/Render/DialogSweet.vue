
<template>
  <SweetModal
    ref="sweetModal"
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

      <span v-if="show">
        <!-- 片段内容组件显示 -->
        <el-form
          v-if="
            formBox &&
            (formBox.hasOwnProperty('children') !== -1 ||
              (formBox && formBox.hasOwnProperty('html') !== -1))
          "
          :model="form"
        >
          <!-- 页面正文 -->
          <div v-if="formBox.children || formBox.html">
            <FormBody :obj="[formBox]" :formObj="formBox" />
          </div>
        </el-form>

        <!-- 表单整页内容显示 -->
        <el-form v-if="formBox && formBox.schemes">
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
        </el-form>
      </span>
    </div>
    <!-- 弹框底部按钮 -->
    <el-button slot="button" v-if="hasCancel" @click="close">{{
      cancelText || "取消"
    }}</el-button>
    <el-button slot="button" v-if="hasOK" type="primary" @click="clickOK()">{{
      okText || "确认"
    }}</el-button>
    <el-button
      slot="button"
      v-if="isDev"
      type="primary"
      @click="clickOK(true)"
      >{{ "开发确认按钮" }}</el-button
    >
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
import dayjs from "dayjs";

import {
  saveForm,
  getFormDetail,
} from "@/Page/sheet-hospital-eval/components/Render/common.js";
//
import comm, {
  cancelSignForm,
  getVTEInfo,
} from "@/Page/sheet-hospital-admission/components/Render/common.js";
//
import { debug } from "util";
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
      formDialogObj: {},
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
    };
  },
  computed: {
    formCode() {
      try {
        return (
          this.dialogFormCode ||
          this.parentFormCode ||
          window.formObj.formSetting.formInfo.formCode ||
          "E0100"
        );
      } catch (error) {}
      return "";
    },
  },
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

      // delete this.$root.$refs['status']
      // delete this.$root.$refs['signerName']
      // delete this.$root.$refs['evalDate']
      // delete this.$root.$refs['evalScore']
      // delete this.$root.$refs['evalDesc']
      // if(this.$root.$refs[this.formCode][key]){
      //   console.log('---this.$root.$refs[this.formCode][key]:',this.$root.$refs[this.formCode][key])
      //   if(this.$root.$refs[this.formCode][key].type === 'text'){
      //     this.$root.$refs[this.formCode][key].setCurrentValue(value)
      //     this.$root.$refs[this.formCode][key].checkValueRule(value)
      //   }
      // }
    },
    inital() {
      this.lock = false;
      // this.formBox = {};
      this.formDialogObj = JSON.parse(JSON.stringify(this.formObj));
      this.formDialogObj.model = {};
      //

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

      let diagModel = {};
      let handleChildren = (c) => {
        if (c.constructor == Array) {
          [...c].map((n, i) => {
            if (n.name) {
              diagModel[n.name] = this.formObj.model[n.name] || "";
              // console.log("handleChildren",i,n,c,n.name,diagModel[n.name],diagModel)
              this.formBox.model[n.name] = diagModel[n.name] || "";
            }
            if (n.children) {
              return handleChildren([...n.children]);
            }
          });
        }
        return diagModel;
      };

      // todo
      if (this.type === "dependent") {
        console.log(
          "根据ID表单dependent",
          id,
          this.formBox,
          this.formObj,
          this.$root.$refs
        );
        //
        if (
          this.formBox.hasOwnProperty("children") &&
          this.formBox.children.length > 0
        ) {
          this.formBox.model = {};
          //
          handleChildren([...this.formBox.children]);
          //
          // this.formBox.children.map(child => {
          //   if (child.name) {
          //     if (window.formObj.model[child.name]) {
          //       this.formBox.model[child.name] =
          //         window.formObj.model[child.name];
          //     } else {
          //       this.formBox.model[child.name] = "";
          //     }
          //   }
          // });
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
        // this.clearUIFormData(this.formBox.model);
        console.log("根据ID表单independent", [
          id,
          this.formBox,
          this.formObj,
          this.$root.$refs,
        ]);
        this.clearUIFormData(this.formBox.model);
        // 初始化 评估时间 评估人 状态
        // const initialKeys = ['evalDate','signerName','status']
        // if (!this.formBox.model["evalDate"]) {
        //   this.formBox.model["evalDate"] = dayjs().format("YYYY-MM-DD HH:mm");
        // }
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
          // for (let key in itemData) {
          //   if (itemData.hasOwnProperty(key)) {
          //     if (
          //       this.$root.$refs[this.formCode][key] &&
          //       this.$root.$refs[this.formCode][key].constructor === Array
          //     ) {
          //       if (itemData[key]) {
          //         itemData[key] = itemData[key].split(",");
          //       } else {
          //         itemData[key] = [];
          //       }
          //     }
          //   }
          // }
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
          // if (!this.formBox.model.signerName) {
          //   this.formBox.model.signerName = this.empName || "";
          //   this.$root.$refs[this.formCode]["signerName"].setCurrentValue(
          //     this.empName
          //   );
          // }

          console.log(
            "根据ID获取表单数据formBox",
            this.formBox,
            this.$root.$refs
          );
          this.fillUIFormData(this.formBox.model);
          this.dialogLoading = false;
        });
      } else {
        this.dialogLoading = false;
      }

      //
    },
    fillUIFormData(model = this.formBox.model) {
      //
      // console.log("fillFormData", model, this.formBox);
      //
      this.formBox["selectedItems"] = [];
      for (const key in model) {
        if (model.hasOwnProperty(key)) {
          let value = model[key];
          //
          //
          // console.log(
          //   "===fillFormData:value",
          //   [value],
          //   [key],
          //   [this.$root.$refs[this.formCode][key]],
          //   // this.$root.$refs[this.formCode][key].type||''
          // );
          //
          if (key == "evalDesc" && model["evalScore"]) {
            // checkValueRule
            value = this.getValueRule(key, model["evalScore"]);
            model[key] = value;
            this.setElementValue("evalDesc", value);
            console.log(
              "!!!结果程度",
              key,
              model,
              model[key],
              model["evalScore"]
            );
          }

          if (!value || !this.$root.$refs[this.formCode][key]) {
            continue;
          }

          // if (
          //   this.$root.$refs.hasOwnProperty(key) > -1 &&
          //   this.$root.$refs[this.formCode][key].hasOwnProperty("constructor") > -1
          // ) {
          //   console.log(
          //     "===constructor",
          //     this.$root.$refs[this.formCode][key].constructor === Array
          //   );
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

            // items.map(itemObj=>{

            Object.keys(items).map((iKey) => {
              let itemObj = items[iKey];
              // text
              try {
                if (itemObj) {
                  // console.log(
                  //   "---itemObj:",
                  //   key,
                  //   itemObj.type,
                  //   this.formBox.model[key],
                  //   itemObj
                  // );
                  // if (itemObj.type === "text") {
                  if (["text", "textarea"].indexOf(itemObj.type) > -1) {
                    let refObj = itemObj;
                    // let resultText = refObj.checkValueRule(value);
                    // refObj.setCurrentValue(resultText);
                    if (key === "status") {
                      let textResult = refObj.checkValueRule(value + "");
                      // console.log("----refObj", refObj, key, textResult);
                      refObj.setCurrentValue(textResult + "");
                    } else {
                      refObj.setCurrentValue(value);
                      refObj.checkValueRule(value);
                    }
                    //
                    // console.log('childObjectText',refObj.childObject.title||refObj.childObject.label||'--',refObj.childObject.name,refObj.childObject)
                    // //
                  } else if (itemObj.type === "datetime") {
                    // if (key === "datePicker") {
                    if (itemObj.$parent.obj.name_date) {
                      let name_date = itemObj.$parent.obj.name_date;
                      let name_time = itemObj.$parent.obj.name_time;
                      itemObj.$parent.datePickerValue =
                        model[name_date] + " " + model[name_time];
                    } else {
                      itemObj.$parent.datePickerValue = value;
                    }

                    // }
                  }
                }
              } catch (error) {
                //
                console.log("error", error);
              }

              // let rootRefs = this.$root.$refs[this.obj.name]
              // console.log(
              //   "--obj.name:",
              //   this.obj,
              //   items,
              //   items.length,
              //   this.$root.$refs[this.formCode][key],
              //   value
              // );
            });
            let name = key;
            for (let k in items) {
              if (items.hasOwnProperty(k) > -1) {
                let item = items[k];
                //
                if (!item || typeof item != "object") {
                  continue;
                }
                // console.log('####item',item)
                //
                let title =
                  item.childObject.label || item.childObject.title || "";
                let code = item.childObject.code || title;
                // console.log('-----',item.childObject.title ,item,item.childObject.code,value,item.childObject.code == value,item.childObject.title == value,code)
                // || item.childObject.title == value
                let valueArr = value.split(",");
                // console.log("选项:", item, [code], [value], [valueArr]);
                if (
                  code == value ||
                  title == value ||
                  valueArr.indexOf(code) > -1 ||
                  valueArr.indexOf(title) > -1
                ) {
                  // console.log('---++',item.childObject.title ,item)
                  this.formBox["selectedItems"].push(item.childObject);
                  // item.model = []
                  // if (item.model.length == 0) {
                  //   item.model.push(value);
                  //   this.$root.$refs[this.formCode][key][k].model.push(value);
                  // }
                  if (
                    this.$root.$refs[this.formCode][key][k] &&
                    this.$root.$refs[this.formCode][key][k].model &&
                    this.$root.$refs[this.formCode][key][k].model.length == 0
                  ) {
                    this.$root.$refs[this.formCode][key][k].model.push(value);
                  }
                  //
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
            // })
          }
        }
        //
        console.log("fillFormData:END", model, this.formBox, this.$root.$refs);
        // this.$root.$refs[]
        // this.dialogLoading = false;
      } // for
    },
    clearUIFormData(model = this.formBox.model) {
      console.log("clearUIFormData", model, this.formBox);
      this.formBox["selectedItems"] = [];
      return;
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
          if (
            this.$root.$refs[this.formCode][key] &&
            this.$root.$refs[this.formCode][key].constructor != Array
          ) {
            // console.log(
            //   "---this.$root.$refs[this.formCode][key]:",
            //   key,
            //   this.formBox.model[key],
            //   this.$root.$refs[this.formCode][key]
            // );
            if (this.$root.$refs[this.formCode][key].type === "text") {
              this.$root.$refs[this.formCode][key].setCurrentValue(value + "");
              this.$root.$refs[this.formCode][key].checkValueRule(value + "");
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
      this.$refs.sweetModal.open();
      //
      try {
        window.app.$refs.autoBox.closeAutoBox();
      } catch (error) {}
      // this.dialogLoading = true;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        if (this.type === "dependent") {
          console.log("formBox", this.formBox, this.$root.$refs);
          setTimeout(() => {
            // this.fillUIFormData(this.formBox.model);
            this.dialogLoading = false;
          }, 100);
        }
      });
      // console.log("clearUIFormData:end", model, this.formBox, this.$root.$refs);
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
        // this.saveEvalForm()
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
        // for (let key in this.formBox.model) {
        //   console.log(key, "keykeykeykeykeykeykeykeykey");
        //   if (this.formBox.model.hasOwnProperty(key)) {
        //     if (key.indexOf("CLONE_") > -1) {
        //       let newKey = key.split("CLONE_")[1];
        //       this.formBox.model[newKey] = this.formBox.model[key];
        //       console.log(newKey, "newKeynewKeynewKeynewKeynewKey");
        //       this.$root.$refs[newKey].$parent.inputValue = this.formBox.model[
        //         newKey
        //       ];
        //       delete this.formBox.model[key];
        //     }
        //   }
        // }
        //
        // this.formObj.model = { ...this.formObj.model, ...this.formBox.model };
        // //
        // window.formObj.model = {
        //   ...window.formObj.model,
        //   ...this.formBox.model
        // };
        Object.keys(this.formBox.model).map((bKeys) => {
          this.formObj.model[bKeys] = this.formBox.model[bKeys] + "";
        });
        //
        console.log(this.formBox.model, " this.formBox.model");
        console.log(this.formObj.model, " this.formObj.model");

        !isDev && this.close();
        // return;
      }

      if (this.type === "help") {
        this.close();
      }

      this.formDialogObj = JSON.parse(JSON.stringify(this.formBox));

      // 15-18分轻度危险；13-14分中度危险；10-12分高度危险；＜9分极度危险
      console.log(this.dialogFormCode,'this.dialogFormCode');
      if (this.dialogFormCode) {
        this.formBox.model.parentId =
          window.formObj.model.formId || window.formObj.model.id;
        //
        //
        // signTime: ""
        // signerName: ""
        // signerNo: ""
        // auditTime: ""
        // auditorName: ""
        // auditorNo: ""
        // updateTime: "2019-10-23 16:56"
        // updaterName: "管理员"
        // updaterNo: "admin"
        //
        window.openSignModal((password, empNo) => {
          // this.$nextTick(()=>{
          // this.formBox.model = {
          //   ...this.formBox.model,
          //   sign: true,
          //   empNo,
          //   password
          // };
          // })
          //
          let postData = {
            id: this.formBox.model.id || "",
            empNo: empNo,
            sign: true,
            // "audit": true,
            password: password,
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
            saveForm({ ...this.formBox }, (res) => {
              console.log("弹框内容保存res", this.formBox, res);

              let {
                data: {
                  data: {
                    master: {
                      id: id,
                      evalDesc: evalDesc,
                      evalScore: evalScore,
                      syncToRecordDesc: syncToRecordDesc,
                    },
                  },
                },
              } = res;
              // 弹框内容保存
              console.log("弹框内容保存", res, evalDesc, evalScore);
              this.formObj.model[this.dialogFormCode] = id || "";
              // parentName
              if (this.parentName) {
                if (this.parentName == "I100028") {
                  // 吞咽评估特殊处理
                  let result = "";
                  if (this.formBox.model.I047012) {
                    result += "吞水：" + this.formBox.model.I047012 + " " + ";";
                  }
                  if (this.formBox.model.I047024) {
                    result += "吞糊：" + this.formBox.model.I047024 + " " + ";";
                  }
                  this.setElementValue(this.parentName, result);
                  this.getValueRule(this.parentName, result);
                  this.formObj.model.I100028 = result;
                } else {
                  //
                  let score = evalScore || this.formBox.model.evalScore || "";
                  //
                  let desc = evalDesc || this.formBox.model.evalDesc || "";
                  //
                  console.log(this.formBox.model["I385031"])
                   if(this.formBox.model.formCode == 'E0616'){
                     console.log(score.indexOf('分') != -1)
                     let result = ''
                     if(score.indexOf('分') != -1){
                       result = syncToRecordDesc || score + " " + this.formBox.model["I385031"] || "";
                     } else{
                       result = syncToRecordDesc || score + "分 " + this.formBox.model["I385031"] || "";
                     }
                    
                      result = result.replace(/null/g, "");
                      result = result.replace(/undefined/g, "");
                      this.setElementValue(this.parentName, result + "");
                      this.formObj.model[this.parentName] = result || "";
                      this.getValueRule(this.parentName, result);
                  }else{
                    let result = syncToRecordDesc || score + "分 " + desc || "";
                    result = result.replace(/null/g, "");
                    result = result.replace(/undefined/g, "");
                    this.setElementValue(this.parentName, result + "");
                    this.formObj.model[this.parentName] = result || "";
                    this.getValueRule(this.parentName, result);
                  }
                 
                  // console.log('评估结果：',result,this.parentName,this.formObj.model[this.parentName])
                }
              }

              // 更新住院单
              window.formTool.fillForm();

              console.log(
                "===saveForm:res",
                res,
                isDev,
                this.formBox,
                this.formObj,
                this.parentName,
                this.$root.$refs[this.parentName]
              );
              if (!isDev) {
                console.log('12344556754790432745235');
                // this.saveEvalForm();
                this.close();
              }
            });
          }
        });
      }

      if (this.callback) {
        // formBox
        this.callback(this.formDialogObj);
      }
      console.log("formDialogObj", this.formBox, isDev);
    },
    initForm(config, value = null) {
      console.log("initForm", config, value, this.obj, this.formObj);
      this.title = config.aliasTitle || config.title || "";
      this.size = config.size || "";
      this.top = config.top || "";
      this.okText = config.okText || "";
      this.cancelText = config.cancelText || "";
      this.hasCancel = config.hasCancel === false ? false : true;
      this.hasOK = config.hasOK === false ? false : true;
      this.type = config.type || "dependent";
      this.callback = config.callback || null;
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
      //     )
      //   )
      // );

      this.formBox = JSON.parse(
        JSON.stringify(this.formObj.dialogs[config.title])
      );

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

      if (!this.formBox) {
        return console.error("弹窗配置为空");
      }
      //
      this.formBox.model = this.formBox.model ? this.formBox.model : {};
      //

      //
      try {
        this.parentName = config.parentName || "";
        this.parentFormCode = config.parentFormCode
          ? config.parentFormCode
          : this.formObj.formSetting.formInfo.formCode;
        this.dialogFormCode = this.formBox.formSetting.formInfo.formCode;
      } catch (error) {
        //
        this.dialogFormCode = "";
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
      console.log(config, "openBox");
      //
      this.$root.$refs["evalScore"] = null;
      this.$root.$refs["evalDesc"] = null;
      this.$root.$refs["status"] = null;
      this.$root.$refs["signerName"] = null;
      //

      //
      this.formList = [];
      this.selectedForm = null;
      if (config.constructor == Array) {
        if (config.length > 1) {
          this.formList = config;
          this.selectedForm = this.autoSelectForm();
          //
          console.log("!!==多表切换", this.selectedForm, this.formList);
          //
          this.initForm(this.formList[this.selectedForm]);
        } else {
          this.initForm(config[0]);
        }
      } else {
        this.initForm(config);
      }
    },
    autoSelectForm(formList = []) {
      // window.app.$store.getters.getCurrentPatient()
      let result = 0;
      let age = 0,
        manAge = 16;
      let formNames = ["跌倒评估单(成人)"];
      try {
        age = ~~(
          window.app.$store.getters.getCurrentPatient().age || 0
        ).replace(/[^0-9]/g, "");
        //
        console.log("autoSelectForm:patient", age);
        if (this.formList && this.formList.length > 0) {
          result = this.formList.findIndex((ret) => {
            return formNames.indexOf(ret.title) > -1 && age > manAge;
          });
        }
        result == -1 ? (result = 0) : (result = result);
        return result;
      } catch (error) {
        console.log("autoSelectForm:error", error);
      }
      return result;
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
    setElementValue(key, value) {
      try {
        Object.keys(this.$root.$refs[this.formCode][key]).map((elkey) => {
          this.$root.$refs[this.formCode][key][elkey].setCurrentValue(value);
        });
      } catch (error) {}
    },
    getValueRule(key, value) {
      let textResult = "";
      try {
        Object.keys(this.$root.$refs[this.formCode][key]).map((elkey) => {
          textResult =
            this.$root.$refs[this.formCode][key][elkey].checkValueRule(value);
        });
      } catch (error) {}
      return textResult;
    },
    saveEvalForm() {
      // this.parentFormCode
      // window.formTool.formSave({showMeasure:false,showLoading:false,message:""})
      window.formTool.formSave({ showMeasure: false });
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

>>>.el-loading-mask, .is-fullscreen {
  z-index: 20005 !important;
}

>>>.sweet-modal, .sweet-content, .sweet-content-content {
  // color:red!important
  /deep/.el-input {
    color: cyan !important;
    width: auto;
  }

  >>>.el-input {
    color: red !important;
    width: auto;
  }

  >>>.input-elements, .vertical-box {
    justify-content: center;
  }

  >>>&.lock {
    cursor: not-allowed !important;
  }
}

>>>.el-radio-button__inner {
  border-radius: 0px !important;
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
</style>
