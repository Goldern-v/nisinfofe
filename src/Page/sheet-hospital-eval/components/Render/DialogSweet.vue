
<template>
  <SweetModal
    ref="sweetModal"
    :title="title || ' '"
    :modal-width="modalWidth"
    :fullBtn="true"
    class="custom-sweet-modal"
  >
    <!-- dialog-loading -->
    <div v-loading="dialogLoading">
      <!-- <div class="dialog-loading-text">{{dialogLoadingText}}</div> -->

      <div class="form-select-con" v-show="formList.length > 1">
        <span>量表选择：</span>
        <el-radio-group v-model="selectedForm" @change="changeSelectForm" size="small">
          <el-radio-button
            v-for="(item, index) in formList"
            :key="index"
            :label="index"
          >{{item.title}}</el-radio-button>
        </el-radio-group>
      </div>

      <span v-if="show">
        <!-- 片段内容组件显示 -->
        <el-form
          v-if="formBox
    && (formBox.hasOwnProperty('children')!==-1
     || formBox && formBox.hasOwnProperty('html')!==-1)"
          :model="form"
        >
          <!-- 页面正文 -->
          <div v-if="formBox.children||formBox.html">
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
          <FormHeader v-if="formBox.header" :obj="formBox.header" :formObj="formBox" />

          <!-- 页面正文 -->
          <FormBody v-if="formBox.body" :obj="formBox.body" :formObj="formBox" />

          <!-- 页面尾部 -->
          <FormFooter v-if="formBox.footer" :obj="formBox.footer" :formObj="formBox" />
        </el-form>
      </span>
    </div>
    <!-- 弹框底部按钮 -->
    <el-button slot="button" v-if="hasCancel" @click="close">{{cancelText||'取消'}}</el-button>
    <el-button slot="button" v-if="hasOK" type="primary" @click="clickOK()">{{okText||'确认'}}</el-button>
    <el-button slot="button" v-if="isDev" type="primary" @click="clickOK(true)">{{'开发确认按钮'}}</el-button>
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

import {
  saveForm,
  getFormDetail
} from "@/Page/sheet-hospital-eval/components/Render/common.js";
import { debug } from "util";

import common from "@/common/mixin/common.mixin.js";
import mergeDefaultValue from "../data/defalutValue/utils";
export default {
  name: "DialogSweet",
  mixins: [common],
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    FormTitle,
    FormHeader,
    FormBody,
    FormFooter,
    InputElements
    // FormGroupTitle,
    // FormGroupHR,
    // FormGroupHorizontalBox,
    // FormGroupColBox,
    // draggable,
  },
  data() {
    return {
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
        desc: ""
      },
      formList: [],
      selectedForm: "",
      formConfig: {},
      parentFormCode: "",
      dialogFormCode: "",
      show: true
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

      // delete this.$root.$refs['status']
      // delete this.$root.$refs['signerName']
      // delete this.$root.$refs['evalDate']
      // delete this.$root.$refs['evalScore']
      // delete this.$root.$refs['evalDesc']
      // if(this.$root.$refs[key]){
      //   console.log('---this.$root.$refs[key]:',this.$root.$refs[key])
      //   if(this.$root.$refs[key].type === 'text'){
      //     this.$root.$refs[key].setCurrentValue(value)
      //     this.$root.$refs[key].checkValueRule(value)
      //   }
      // }
    },
    inital() {
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

      // todo
      if (this.type === "dependent") {
        console.log(
          "根据ID表单dependent",
          id,
          this.formBox,
          this.formObj,
          this.$root.$refs
        );
        if (
          this.formBox.hasOwnProperty("children") &&
          this.formBox.children.length > 0
        ) {
          this.formBox.model = {};
          this.formBox.children.map(child => {
            if (child.name) {
              if (window.formObj.model[child.name]) {
                this.formBox.model[child.name] =
                  window.formObj.model[child.name];
              } else {
                this.formBox.model[child.name] = "";
              }
            }
          });
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
        this.clearUIFormData(this.formBox.model);
      }
      // this.$forceUpdate();

      // 根据ID获取表单数据
      // this.formBox.model.id
      let id =
        this.formObj.model[this.dialogFormCode] || this.formBox.model.id || "";
      console.log("根据ID表单", id, this.formBox, this.formObj);
      if (id) {
        id = ~~id;
        getFormDetail(id, res => {
          console.log("根据ID获取表单数据", res);
          let {
            data: {
              data: { itemData: itemData, master: master }
            }
          } = res;
          // for (let key in itemData) {
          //   if (itemData.hasOwnProperty(key)) {
          //     if (
          //       this.$root.$refs[key] &&
          //       this.$root.$refs[key].constructor === Array
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
            ...master
          };
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
      console.log("fillFormData", model, this.formBox);
      this.formBox["selectedItems"] = [];
      for (const key in model) {
        if (model.hasOwnProperty(key)) {
          let value = model[key];
          console.log(
            "===fillFormData:value",
            value,
            key,
            this.$root.$refs[key]
          );

          if (!value || !this.$root.$refs[key]) {
            continue;
          }

          // text
          try {
            if (this.$root.$refs[key]) {
              console.log(
                "---this.$root.$refs[key]:",
                key,
                this.formBox.model[key],
                this.$root.$refs[key]
              );
              if (this.$root.$refs[key].type === "text") {
                let refObj = this.$root.$refs[key];
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
              } else if (this.$root.$refs[key].type === "datetime") {
                // if (key === "datePicker") {
                if (this.$root.$refs[key].$parent.obj.name_date) {
                  let name_date = this.$root.$refs[key].$parent.obj.name_date;
                  let name_time = this.$root.$refs[key].$parent.obj.name_time;
                  this.$root.$refs[key].$parent.datePickerValue =
                    model[name_date] + " " + model[name_time];
                } else {
                  this.$root.$refs[key].$parent.datePickerValue = value;
                }

                // }
              }
            }
          } catch (error) {
            //
            console.log("error", error);
          }

          if (
            this.$root.$refs.hasOwnProperty(key) > -1 &&
            this.$root.$refs[key].hasOwnProperty("constructor") > -1
          ) {
            console.log(
              "===constructor",
              this.$root.$refs[key].constructor === Array
            );
          }

          // this.$root.$refs[key].hasOwnProperty('constructor)

          // if(!this.$root.$refs[key]){return}
          // if (value && this.$root.$refs[key]) {
          if (value && this.$root.$refs[key].constructor === Array) {
            let items = this.$root.$refs[key];
            // console.log('--items-this.$root.$refs[key]:',this.$root.$refs[key])

            // items = [...items]

            // let rootRefs = this.$root.$refs[this.obj.name]
            console.log(
              "--obj.name:",
              this.obj,
              items,
              items.length,
              this.$root.$refs[key],
              value
            );

            let name = key;
            for (let k in items) {
              if (items.hasOwnProperty(k)) {
                let item = items[k];
                let code = item.childObjct.code || item.childObjct.title;
                // console.log('-----',item.childObjct.title ,item,item.childObjct.code,value,item.childObjct.code == value,item.childObjct.title == value,code)
                // || item.childObjct.title == value
                if (code == value) {
                  // console.log('---++',item.childObjct.title ,item)
                  this.formBox["selectedItems"].push(item.childObjct);
                  // item.model = []
                  // if (item.model.length == 0) {
                  //   item.model.push(value);
                  //   this.$root.$refs[key][k].model.push(value);
                  // }
                  if (this.$root.$refs[key][k].model.length == 0) {
                    this.$root.$refs[key][k].model.push(value);
                  }
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

                console.log("多选项", item, "code", code);
              }
            }

            // items.map(item => {
            //   // console.log('item.childObjct',item,item.label == value,item.childObjct.code == value,value,item.label,item.childObjct.code,item.childObjct,item.childObjct.title,item.childObjct.name)
            //   if(item.label == value && item.hasOwnProperty('childObjct') ){
            //     // item.value = value
            //     item.model = value
            //     // childObjct
            //     // console.log('item.childObjct',item,value,item.label,item.childObjct.code,item.childObjct,item.childObjct.title,item.childObjct.name)
            //     // console.table(item.childObjct)
            //     this.formBox["selectedItems"].push(item.childObjct);
            //     // this.$forceUpdate();
            //   }
            // });
            // } else {
            // }

            // text
            // try {
            //   if (this.$root.$refs[key]) {
            //     console.log(
            //       "---this.$root.$refs[key]:",
            //       key,
            //       this.formBox.model[key],
            //       this.$root.$refs[key]
            //     );
            //     if (this.$root.$refs[key].type === "text") {
            //       this.$root.$refs[key].setCurrentValue(value + "");
            //       this.$root.$refs[key].checkValueRule(value + "");
            //     }
            //   }
            // } catch (error) {
            //   //
            //   console.log("error", error);
            // }
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
      for (const key in model) {
        if (model.hasOwnProperty(key)) {
          let value = model[key];
          if (value && this.$root.$refs[key]) {
            if (this.$root.$refs[key].constructor === Array) {
              this.$root.$refs[key].map(item => {
                item.model = [];
                // item.value = "";
              });
            }
          }
          if (this.$root.$refs[key]) {
            console.log(
              "---this.$root.$refs[key]:",
              key,
              this.formBox.model[key],
              this.$root.$refs[key]
            );
            if (this.$root.$refs[key].type === "text") {
              this.$root.$refs[key].setCurrentValue(value + "");
              this.$root.$refs[key].checkValueRule(value + "");
            }
          }
          // try {

          // } catch (error) {

          // }
          console.log(
            "clearUIFormData:end",
            model,
            this.formBox,
            this.$root.$refs
          );
        }
      }
    },
    open() {
      console.log("sweetModalOpen", this.$refs, this.$root.$refs);
      this.$refs.sweetModal.open();
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
      console.log("clearUIFormData:end", model, this.formBox, this.$root.$refs);
    },
    open() {
      console.log("sweetModalOpen", this.$refs, this.$root.$refs);
      this.$refs.sweetModal.open();
      // this.dialogLoading = true;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        if (this.type === "dependent") {
          setTimeout(() => {
            this.fillUIFormData();
            this.dialogLoading = false;
          }, 100);
        }
      });
    },
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
          console.log(key, "keykeykeykeykeykeykeykeykey");
          if (this.formBox.model.hasOwnProperty(key)) {
            if (key.indexOf("CLONE_") > -1) {
              let newKey = key.split("CLONE_")[1];
              this.formBox.model[newKey] = this.formBox.model[key];
              console.log(newKey, "newKeynewKeynewKeynewKeynewKey");
              this.$root.$refs[newKey].$parent.inputValue = this.formBox.model[
                newKey
              ];
              delete this.formBox.model[key];
            }
          }
        }
        this.formObj.model = { ...this.formObj.model, ...this.formBox.model };
        window.formObj.model = {
          ...window.formObj.model,
          ...this.formBox.model
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
        this.formBox.model.parentId = window.formObj.model.formId|| window.formObj.model.id;
        saveForm({ ...this.formBox }, res => {
          let {
            data: {
              data: {
                formResult: { id: id }
              }
            }
          } = res;
          this.formObj.model[this.dialogFormCode] = id;
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
              this.$root.$refs[this.parentName].setCurrentValue(result);
              this.$root.$refs[this.parentName].checkValueRule(result);
              this.formObj.model.I100028 = result;
              this.$root.$refs[this.parentName + "_clone"].setCurrentValue(
                result
              );
              this.$root.$refs[this.parentName + "_clone"].checkValueRule(
                result
              );
            } else {
              let score = this.formBox.model.evalScore;
              let desc = this.formBox.model.evalDesc || "";
              let result = score + "分 " + desc;
              this.formObj.model[this.parentName] = result;
              this.$root.$refs[this.parentName].setCurrentValue(result);
              this.$root.$refs[this.parentName].checkValueRule(result);

              /** GCS评估特殊处理 */
              if (this.parentName == "I100020") {
                let result = this.formBox.model.evalDesc;
                this.$root.$refs["I100019"].setCurrentValue(result);
                this.$root.$refs["I100019"].checkValueRule(result);
              }
            }
          }

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
            this.close();
          }
        });
      }
      console.log(this.callback, "aaaaaaaaa");
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
      //
      if (
        config.parentName &&
        this.formObj.model[config.parentName] &&
        config.type === "dependent"
      ) {
        // config.title = this.formObj.model[config.parentName] || config.title;
      }

      this.formBox = JSON.parse(
        JSON.stringify(
          this.formObj.dialogs.find(
            f => (f.title || f.formSetting.formTitle.formName) == config.title
          )
        )
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
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox,
.is-bordered,
.el-checkbox--medium,
.el-input,
.el-input--medium,
.el-input-group,
.el-input-group--prepend
  margin: 5px 0px;


.custom-sweet-modal
  width: 100%!important;
  min-height: 50%;
  >>>.sweet-content
      padding:10px!important

.form-select-con {
  text-align left
  margin 5px 8px
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
  z-index: 20005!important;
}
</style>
