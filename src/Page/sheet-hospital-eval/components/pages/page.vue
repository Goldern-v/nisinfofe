<template>
  <div :class="fileJSON ? 'pages':'no-page'">
    <div
      v-if="isShowLoadingLayout"
      class="mask-layout"
      v-loading="loading"
      :element-loading-text="loadingText"
    ></div>
    <div :style="isShow?'display:block':'display:none'">
      <keep-alive exclude="page,RenderForm">
        <RenderForm :sourceObj="fileJSON" :updateFunc="updateFunc" :lock="status == 1" v-if="isNewPage"/>
      </keep-alive>
    </div>
    <div :style="isShow?'display:none':'display:block;backgroud:white;'">
      <div class="null-img" @click="message=='新建评估单'&&bus.$emit('createHEvalForm')">
        <img src="./image/分组.png" alt/>
        <aside>{{ message }}</aside>
      </div>
    </div>
    <!-- <div class="container"></div> -->
  </div>
</template>

<script>
import RenderForm from "@/Page/sheet-hospital-eval/components/Render/main.vue";

import BusFactory from "vue-happy-bus";

import {
  formUrl,
  devFormUrl,
  devFormUrl_p80
} from "@/common/pathConfig/index.js";
import common from "@/common/mixin/common.mixin.js";
import { getJSON } from "./api/index.js";

export default {
  name: "page",
  mixins: [common],
  components: {
    RenderForm
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      bus: BusFactory(this),
      fileJSON: new Object(),
      loadingText: "数据载入中...",
      loading: false,
      isShow: false,
      isShowLoadingLayout: true,
      message: "请选择左侧患者~",
      status: 0,
      isNewPage:true,
      isRouterAlive:true
    };
  },
  computed: {
    formCode() {
      // return "E0100";
      try {
        return this.fileJSON.formSetting.formInfo.formCode;
      } catch (error) {
      }
      return "";
    }
  },
  watch: {
    loading(newVal, oldVal) {
      // console.log("loading", newVal, oldVal, this.isShowLoadingLayout);
      this.isShowLoadingLayout = newVal;
    },
    "$route.path"(){
      this.isNewPage = false
      setTimeout(()=>{
        this.isNewPage = true
      })
    }
  },
  async created() {
    this.bus.$on("openHosptialEvalForm", this.openForm);
    this.bus.$on("closeHosptialEvalForm", this.closeForm);
    this.bus.$on("setHosptialEvalPageMessage", this.setMessage);

    // this.bus.$on("updateFormUIData", res => {
    //   // itemData  master
    //   let {
    //     data: {
    //       data: { itemData: itemData, master: master }
    //     }
    //   } = res;
    //   let model = { ...itemData, ...master };
    //   window.formObj.model = { ...model };
    //   this.fillForm();
    // });

    this.bus.$on("setHosptialEvalLoading", config => {
      if (typeof config === "object") {
        if (config.hasOwnProperty("status")) {
          this.loading = config.status;
        }
        if (config.hasOwnProperty("msg")) {
          this.loadingText = config.msg;
        } else {
          this.loadingText = "数据载入中...";
        }
      } else {
        this.loading = config;
        this.loadingText = "数据载入中...";
      }
    });

    this.initial();
    this.clearAll();
    //
    let fileInitialFormServer = await this.initialFormServer().catch(err => {
      console.log("!!!!fileInitialFormServer:err", err);
    });

    if (!fileInitialFormServer) {
      this.loading = false;
      return;
    }
    // .then(res=>{
    console.log("openForm:initialFormServer", fileInitialFormServer);
    this.fileJSON = JSON.parse(JSON.stringify(fileInitialFormServer));
    // this.fileJSON.formSetting.updateInfo = window.formObj.formSetting.updateInfo
    // //
    // window.formObj = JSON.parse(JSON.stringify(this.fileJSON))
    //
    // this.fileJSON.model = JSON.parse(JSON.stringify(formObj));
    // window.formObj = {...window.formObj,...this.fileJSON}
    //
    window.formObj.body = this.fileJSON.body;
    window.formObj.dialogs = this.fileJSON.dialogs;
    window.formObj.dictionary = this.fileJSON.dictionary;
    // window.formObj.formSetting = this.fileJSON.formSetting
    window.formObj.header = this.fileJSON.header;
    window.formObj.model = {...window.formObj.model, ...this.fileJSON.model};
    window.formObj.pageSetting = this.fileJSON.pageSetting;
    //
    this.loading = false;
  },
  mounted() {
    //
    window.formTool = {
      ...window.formTool,
      fillForm: this.fillForm
    };
  },
  methods: {
    reload () {
      this.isNewPage = false
      this.$nextTick(function () {
        this.isNewPage = true
      })
    },
    getFilePath(fileName, path) {
      let urldevForm = `${devFormUrl}/${path}/${fileName}`;
      let urlForm = `${formUrl}/${path}/${fileName}`;
      let url = urlForm;
      if (this.isDev) {
        url = urldevForm;
      }
      return url;
    },
    async initialFormServer(patient = null, formObj = window.formObj || {}) {
      this.loading = true;
      // 清空
      // this.$root.$refs[this.formCode] = {}
      this.clearAll();
      //
      let rootDir = "sheet-hospital-eval";
      // remote
      // let url = this.getFilePath("住院评估.index.json", rootDir);
      let url = null
      if (['liaocheng'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.index.liaoc.json", rootDir);
      } else if (['lyxrm'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.index.lyxrm.json", rootDir);
      } else if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.index.foshanrenyi.json", rootDir);
      } else {
        url = this.getFilePath("住院评估.index.json", rootDir);
      }
      //
      console.log("==loadingJSON==", this.isDev, url);
      //
      let jsonIndex = await getJSON(url).catch(err => {
        console.log("getJSON:err", err);
      });
      //
      //
      if (!jsonIndex) {
        return jsonIndex;
      }
      console.log("==jsonIndex==", [url], jsonIndex, jsonIndex.data, patient);

      //
      // main json file
      // url = this.getFilePath("住院评估.form.json", `${rootDir}/main`);
      if (['liaocheng'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.form.liaoc.json", `${rootDir}/main`);
      } else if (['lyxrm'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.form.lyxrm.json", `${rootDir}/main`);
      } else if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.form.foshanrenyi.json", `${rootDir}/main`);
      } else {
        url = this.getFilePath("住院评估.form.json", `${rootDir}/main`);
      }
      let jdata = await getJSON(url).catch(err => {
        console.log("getJSON:err", err);
        return;
      });
      // console.log('file',file,jdata)
      // 主表结构
      let file = JSON.parse(JSON.stringify(jdata.data));
      try {
        file.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
      } catch (error) {
      }
      //

      // 主表字段对照表
      // url = this.getFilePath("住院评估.schemes.json", `${rootDir}/main`);
      if (['liaocheng'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.schemes.liaoc.json", `${rootDir}/main`);
      } else if (['lyxrm'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.schemes.lyxrm.json", `${rootDir}/main`);
      } else if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        url = this.getFilePath("住院评估.schemes.foshanrenyi.json", `${rootDir}/main`);
      } else {
        url = this.getFilePath("住院评估.schemes.json", `${rootDir}/main`);
      }

      jdata = await getJSON(url).catch(err => {
        console.log("getJSON:err", err);
        return;
      });
      // let schemes = JSON.parse(JSON.stringify(jdata));
      console.log("schemes", jdata);
      file.schemes = JSON.parse(JSON.stringify(jdata.data));
      file.schemesObj = {};
      file.schemes.map(key => {
        file.schemesObj[key.name] = key.title;
      });

      //
      // file.dialogs = new Array()
      file.dialogs = new Object();

      // await (async()=>{

      const promises = await Object.keys(jsonIndex.data).map(async key => {
        // console.log('key',key,'value',jsonIndex.data[key])
        if (key && ["other", "main", "formSchemes"].indexOf(key) > -1) {
          return;
        }
        let path = `${rootDir}/${key}`;
        let files = [...jsonIndex.data[key]];

        //
        // console.log('files',files,'path',path,files)
        const filesPromises = await files.map(async fname => {
          // console.log('--fname',fname,key)
          url = `${rootDir}/${key}`;
          url = this.getFilePath(fname, url);
          // console.log('--url',url)
          // jdata = new Object()
          let djson = new Object();
          let title = "";

          const JSONdata = await getJSON(url).catch(err => {
            console.log("getJSON:err", err);
            return;
          });

          if (JSONdata) {
            djson = JSON.parse(JSON.stringify(JSONdata.data));
            // console.log('fname',fname,JSONdata)
          }
          //
          if (key == "formDictionary") {
            // 下拉框选项字典表
            // let dictionary = djson;
            //
            file.dictionary = {...file.dictionary, ...djson};
            return JSONdata;
          }
          //
          // formDialog
          if (key == "formDialog") {
            console.log(
              "formDialog:fname",
              fname,
              JSONdata,
              djson,
              djson.constructor,
              [typeof djson]
            );
            // let djson = JSONdata;
            //

            if (djson.constructor == Array) {
              // console.log('!!Array!!formDialog:fname',fname,JSONdata,djson)
              djson.map(d => {
                title = d.title;
                if (title) {
                  file.dialogs[title] = {...d};
                }
              });
              return JSONdata;
            }

            if (
              djson.constructor == Object &&
              djson.formSetting &&
              djson.formSetting.formTitle
            ) {
              // console.log('!!!formDialog:fname',fname,JSONdata,djson)

              try {
                djson.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
                //
                title = djson.formSetting.formTitle.formName;

                //

                // if (!djson.schemes){
                //   djson.schemes=[]
                // }
                // if (djson.schemes) {
                let fromName =
                  fname.replace("./", "").replace(".json", "") + ".txt.json";
                console.log("----fromName", fromName);

                let surl = this.getFilePath(fromName, `${rootDir}/formSchemes`);
                console.log("----surl", surl);
                //
                let dschemes = await getJSON(surl).catch(err => {
                  console.log("getJSON:err", err);
                  return;
                });
                console.log("----dschemes", dschemes, [surl]);
                //JSON.parse(
                //   JSON.stringify(require(`../data/formSchemes/${fromName}.txt.json`))
                // );
                //
                if (dschemes && dschemes.data) {
                  djson.schemes = JSON.parse(JSON.stringify(dschemes.data));
                  djson.schemesObj = {};
                  djson.schemes.map(key => {
                    djson.schemesObj[key.name] = key.title;
                  });
                }

                // } catch (error) {}

                // try {
                // if(!file.dialogs[title+""]){
                file.dialogs[title + ""] = JSON.parse(JSON.stringify(djson));
                //   console.error('~~~~file.dialogs',title,file.dialogs[title])
                // }
                // file.dialogs.push(JSON.parse(JSON.stringify(djson)))

                //
              } catch (error) {
                console.error("~~~~error", error, djson);
                // file.dialogs[djson.title] = {...djson}
              }

              // }

              //

              if (patient) {
                // console.log(patient, "patientpatientpatientpatient");
                this.setPatientInfo(djson, patient);
              }
            }
            //
          }
          // formDialog
          return JSONdata;
        });
        const numPromise = await Promise.all(filesPromises);
        return numPromise;
      });
      // files loop
      const numFiles = await Promise.all(promises);
      console.log(numFiles);
      console.log("初始化结果loop", file, promises);

      console.log("====initialFormServer:file", file);
      //
      if (patient) {
        // model
        file.model["id"] = patient.id + "" || "";
        this.setPatientInfo(file, patient);
        this.setPatientInfo(formObj, patient);
      }
      // file.model = formObj
      console.log("file", file, formObj);
      //
      // return file
      return new Promise((res, rej) => {
        res(file);
      });
      // this.fileJSON = file; //JSON.stringify(file,null,4)
      // console.log(this.fileJSON, "fileJSON");
    },
    clearAll() {
      if (this.$root.$refs && this.$root.$refs[this.formCode]) {
        Object.keys(this.$root.$refs[this.formCode]).map(rkey => {
          if (
            this.$root.$refs[this.formCode][rkey] &&
            this.$root.$refs[this.formCode][rkey].constructor == Array
          ) {
            // this.$root.$refs[this.formCode][rkey]=[]
            // delete this.$root.$refs[this.formCode][rkey]
            Object.keys(this.$root.$refs[this.formCode][rkey]).map(ekey => {
              try {
                this.$root.$refs[this.formCode][rkey][ekey].setCurrentValue("");
                //
                this.$root.$refs[this.formCode][rkey][ekey].checkValueRule("");
                //
                // this.$root.$refs[this.formCode][rkey][ekey].childObject.style = ""
              } catch (error) {
              }
            });
          }
        });
      }
    },
    initial(patient = null, formObj = window.formObj || {}) {
      this.loading = true;
      // 清空
      // this.$root.$refs[this.formCode] = {}
      this.clearAll();
      //
      // this.loadingJSON();
      // if(window.formObj && window.formObj.model){
      //   Object.keys(window.formObj.model).map(k=>{
      //     if(!window.formObj.model[k]){
      //       window.formObj.model[k] = ""
      //     }
      //   })
      // }
      //
      // 主表结构
      let file = null
      if (['liaocheng'].includes(this.HOSPITAL_ID)) {
        file = JSON.parse(
          JSON.stringify(require("../data/住院评估.form.liaoc.json"))
        )
      } else if (['lyxrm'].includes(this.HOSPITAL_ID)) {
        file = JSON.parse(
          JSON.stringify(require("../data/住院评估.form.lyxrm.json"))
        )
      } else if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        file = JSON.parse(
          JSON.stringify(require("../data/住院评估.form.foshanrenyi.json"))
        )
      } else {
        file = JSON.parse(
          JSON.stringify(require("../data/住院评估.form.json"))
        )
      }
      try {
        file.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
      } catch (error) {
      }
      // 主表字段对照表
      let schemes = JSON.parse(
        JSON.stringify(require("../data/formSchemes/住院评估.schemes.json"))
      );
      // 主表下拉框选项字典表
      let dictionary = null
      if (['liaocheng'].includes(this.HOSPITAL_ID)) {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/住院评估.dictionary.liaoc.json")))
      } else if (['lyxrm'].includes(this.HOSPITAL_ID)) {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/住院评估.dictionary.lyxrm.json")))
      } else if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/住院评估.dictionary.foshanrenyi.json")))
      } else {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/住院评估.dictionary.json")))
      }
      //
      // 其他下拉框选项字典表
      let otherDictionary = null
      if (['liaocheng'].includes(this.HOSPITAL_ID)) {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/other.dictionary.liaoc.json")))
      } else if (['lyxrm'].includes(this.HOSPITAL_ID)) {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/other.dictionary.lyxrm.json")))
      } else if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/other.dictionary.foshanrenyi.json")))
      } else {
        dictionary = JSON.parse(JSON.stringify(require("../data/formDictionary/other.dictionary.json")));
      }
      //
      file.dictionary = {...dictionary, ...otherDictionary};
      //
      file.schemes = schemes;
      file.schemesObj = {};
      file.schemes.map(key => {
        file.schemesObj[key.name] = key.title;
      });

      /** 自动获取弹窗配置 */
      const contexts = require.context("../data/formDialog", true, /\.json$/);
      contexts.keys().forEach((context, b, c, d) => {
        let djson = contexts(context);
        let title = "";
        try {
          djson.formSetting.formTitle.hospitalName = this.HOSPITAL_NAME;
        } catch (error) {
        }
        if (djson.schemes) {
          let fromName = context.replace("./", "").replace(".json", "");

          let schemes = JSON.parse(
            JSON.stringify(require(`../data/formSchemes/${fromName}.txt.json`))
          );

          djson.schemes = schemes;
          djson.schemesObj = {};
          djson.schemes.map(key => {
            djson.schemesObj[key.name] = key.title;
          });
        }

        if (patient) {
          // console.log(patient, "patientpatientpatientpatient");
          this.setPatientInfo(djson, patient);
        }
        if (djson.constructor === Array) {
          // file.dialogs.push(...djson);
          djson.map(d => {
            title = d.title;
            if (title) {
              file.dialogs[title] = {...d};
            }
          });
        } else {

          try {
            title = djson.formSetting.formTitle.formName;
            // file.dialogs.push(djson);
            file.dialogs[title + ""] = JSON.parse(JSON.stringify(djson));
          } catch (error) {
          }
        }
      });

      if (patient) {
        // model
        file.model["id"] = patient.id + "" || "";
        this.setPatientInfo(file, patient);
        this.setPatientInfo(formObj, patient);
      }
      console.log("file", file, formObj);
      //
      this.fileJSON = file; //JSON.stringify(file,null,4)
      // console.log(this.fileJSON, "fileJSON");
      return new Promise((res, rej) => {
        res(file);
      });
      // window.file = this.fileJSON;
    },
    //
    setMessage(msg) {
      this.message = msg; // "请选择左侧患者~"
    },
    closeForm() {
      this.isShow = false;
      // this.initial();
      this.clearAll();
      this.loading = false;
    },
    openForm(config) {
      let isDevMode = config.isDevMode || false;
      let patient = config.patient;
      let formObj = config.formObj;
      this.status = config.patient.status;
      // alert(status);
      window.formObj.model = JSON.parse(JSON.stringify(formObj));
      //
      //
      this.isShow = true;
      console.log("openForm!!", config, patient, formObj);
      //
      // 滚动到顶端
      document.querySelector(".sheetTable-contain").scrollTop = 0;
      document.querySelector(".sheetTable-contain").style.background =
        "#DFDFDF";

      //
      // ( async ()=>{
      // let fileInitial = await this.initial(patient)
      // .then(res=>{
      // console.log('openForm:initial',res)
      // });
      // console.log('openForm:initial',fileInitial)
      //

      // });
      this.$nextTick(() => {
        this.fillForm(formObj);
        this.loading = false;
      });
      //
      // })()

      // this.fileJSON = file;

      // this.loading = false;

      // this.$nextTick(()=>{
      //   // console.log("fillForm", formObj);
      //   // setTimeout(() => {
      //   //数据回填表单
      //   this.fillForm(formObj);
      //   // }, 500);
      // })
      //
      console.log("数据回填表单", this.$root.$refs[this.formCode]);
    },
    updateFunc(value) {
      console.log("updateFunc!!", value);
    },
    setPatientInfo(json, patient) {
      //
      // console.log('setPatientInfo',patient,this.$store.getters.getAgeLevel())
      // 设置 formHeads
      try {
        json.formSetting.formHeads.map(h => {
          if (patient[h.name]) {
            if (h.name == "age") {
              h.value = `${
                patient[h.name]
              }(${this.$store.getters.getAgeLevel()})`;
            } else {
              h.value = patient[h.name];
            }
          }
        });
      } catch (error) {
        //
      }
    },
    fillForm(formObj = window.formObj.model || null) {
      // this.clearAll()
      if (formObj) {
        console.log("fillForm", formObj);
        for (const key in formObj) {
          if (formObj.hasOwnProperty(key)) {
            let element = formObj[key] || "";
            // let refObj = this.$root.$refs[this.formCode][key];
            // console.log(
            //   "!!!!!!",
            //   [key, this.formCode, element],
            //   this.$root.$refs,
            //   this.$root.$refs[this.formCode]
            // );
            // console.log(
            //   "!!!!!!",
            //   this.$root.$refs[this.formCode],
            //   this.$root.$refs[this.formCode][key]
            // );
            //
            if (
              this.$root.$refs[this.formCode] &&
              this.$root.$refs[this.formCode][key] &&
              this.$root.$refs[this.formCode][key].constructor == Array
            ) {
              //

              Object.keys(this.$root.$refs[this.formCode][key]).map(elKey => {
                //
                let el = this.$root.$refs[this.formCode][key][elKey];
                //
                if (el && (el.type === "text" || el.type === "textarea")) {
                  // el.setCurrentValue(textResult);
                  if (key === "status") {
                    let textResult = el.checkValueRule(formObj[key] + "");
                    // console.log(
                    //   "----el",
                    //   el,
                    //   key,
                    //   textResult
                    // );
                    el.setCurrentValue(textResult + "");
                    el.checkValueRule(textResult + "");
                  } else {
                    el.setCurrentValue(element);
                    // if(element){
                    el.checkValueRule(element + "");
                    // }else{
                    //   el.checkValueRule("")
                    // }
                    // el.checkValueRule(formObj[key]||"");
                  }
                }
                if (el && el.type === "datetime") {
                  el.currentValue = formObj[key] || "";
                  // el.setCurrentValue(formObj[key]+"");
                  console.log("datetime", el, key, element);
                }
                if (el && el.type === "radio") {
                  if (formObj[key]) {
                    if (formObj[key] === el.label) {
                      el.model = [formObj[key]]
                      el.runTasks && el.runTasks()
                    } else {
                      el.model = []
                      el.checked = false
                    }
                  } else {
                    if (el.defaultValue) {
                      el.model = [el.label]
                      el.runTasks && el.runTasks()
                    } else {
                      el.model = []
                      el.checked = false
                    }
                  }
                }
              });
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.pages
  width: 100%;

.no-page
  background: white;
  width: 100%;
  height: 100%;
  margin: -15px -5px 0 -15px;
  padding: 0px 5px 15px 15px;

.container
  width: 100%;
  height: 100%;
  padding: 5mm;
  background: white;
  margin: auto auto;
  background: rgba(255, 255, 255, 1);

/* box-shadow:0px 5px 10px 0px rgba(0,0,0,0.5); */

.null-img
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  margin auto
  width 200px
  height 240px
  padding 20px
  background white
  border 1px solid #ADB4BA
  border-radius 0px
  cursor pointer

  aside
    color: #cecece;
    font-size 16px
    margin-top 10px
    text-align center

  // font-weight bold

  &:hover
    box-shadow: 0px 0px 10px #888

.mask-layout
  // border 1px solid red
  position: fixed !important;
  width: calc(100% - 200px);
  height: 100%;
  top: 100px;
  left: 200px;
  z-index: 999;
</style>
