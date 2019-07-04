<template>
<div>
  <div class="form-modal">
    <sweet-modal ref="modal" size="record" :title="title" :fullBtn="true" @close="beforeClose">
      <div class="record-modal-con" flex="">
        <div flex-box="3" style="width:0" class="record-box" v-loading="modalLoading">
          <iframe id="fromBoxClean" ref="ifamme-modal" class="iframe-form-con" v-if="url" :src="url" frameborder="0" @load="onload"></iframe>
        </div>
        <div v-if="formListData" flex-box="1" style="width:0; overflow:visible; height:100%" >
          <div flex-box="3" style="width:100%; height:100%" v-loading="formListModalLoading">
            <formList :formCode="formCode" :formListData="formListData" ref="formList"></formList>
          </div>
        </div>
      </div>
      <div slot="button" style="text-align:center">
        <el-button class="modal-btn" @click="$refs.modal.close()">取消</el-button>
        <el-button class="modal-btn" @click="saveForm" type="primary">{{saveButtonText}}</el-button>
      </div>
    </sweet-modal>
  </div>
  <!-- 签名确认 -->
  <sweet-modal ref="modalName" size="small" title="签名确认">
    <p for="" class="name-title">请输入登录密码</p>
    <div action="" @keyup.13="saveFormbyPw">
      <el-input size="small" type="password" placeholder="请输入密码" v-model="password"></el-input>
    </div>
    <div slot="button">
      <el-button @click="$refs.modalName.close()">取消</el-button>
      <el-button type="primary"  @dblclick.stop="saveFormbyPw" @click.stop="saveFormbyPw">确认</el-button>
    </div>
  </sweet-modal>
  <!-- 提交弹窗组 -->
  <formModals></formModals>
  <!-- 人体图弹窗 -->
  <body-modal ref="bodyModal"></body-modal>
  <!-- 消息提示弹窗 -->
  <message-modal ref="messageModal"></message-modal>

  <signModal ref="signModal" title="签名确认"></signModal>
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.record-modal-con {
  height: 100%;
}

.record-box {
  height calc(100% - 1px)
}

.iframe-form-con {
  width: 100%;
  height: 100%;
}

.name-title {
  font-size: 14px;
  margin: 5px 0 10px;
  font-weight: bold;
}
.modal-btn
  width 88px

>>>.el-loading-mask {
  background: white !important;
}

</style>

<script>
import {
  SweetModal,
  SweetModalTab
} from "@/plugin/sweet-modal-vue";
import formList from "./formList.vue";
import formModals from "./formModals";
import {
  initList
} from "./form.details";
  import {
  initNooForm
} from "./form.details.nooForm";
import {
  formField //表单护理字段
} from "@/api/form";
import {
  evalDetail
  // formPrintPage,
  // formInputPrint
} from "@/api/form_hj"
import qs from 'qs'
import formFill from "./form.fill"
import formFillDataset from "./form.fill.dataset"
import {
  eventInit
} from "./form.event";
import bodyModal from "../body-modal/body-modal.vue";
import messageModal from "../message-modal/message-modal.vue";
import signModal from '@/components/modal/sign.vue'
import $ from 'jquery'
import bus from 'vue-happy-bus'
import moment from 'moment'
import commonMixin from '@/common/mixin/common.mixin'
export default {
  mixins: [commonMixin],
  name: "Parent",
  provide: {
    activeTabName: "护理措施",
  },
  data() {
    return {
      controlBtn: "",
      password: "",
      url: "",
      formCode: "",
      title: "新建病历",
      noprint: true,
      callback: '',
      modalLoading: false,
      formListModalLoading: false,
      formListData: {},
      saveButtonText:"签名",
    };
  },
  mounted() {
    // window.closeModalName = () => {
    //   this.$refs.modalName.close();
    // };
    // window.openModalName = () => {
    //   this.password = "";
    //   this.$refs.modalName.open();
    // };
  },
  methods: {
    open(url, callback, title='') {
      console.log("----formBoxClean",url, this.activeTabName)
      this.activeTabName = "护理措施"
      this.$refs.formList.activeTab = "护理措施"

      this.callback = callback
      this.controlBtn = "";
      this.password = "";
      this.url = url;
      this.formListData = {}

      if(title) {
        this.title = title
      }else{
        if (this.url.indexOf("input") > -1) {
          this.title = "新建病历";
        }
        if (this.url.indexOf("view") > -1) {
          this.title = "修改病历";
        }
        if (this.url.indexOf("editForm") > -1) {
          this.title = "修改评估表";
        }
        // if (this.url.indexOf("openFormId") > -1) {
        //   query.id = "修改评估表";
        // }
        if (this.url.indexOf("print") > -1) {
          this.title = "打印病历";
        }
      }


      if (this.url.indexOf("print") > -1) {
        this.noprint = false;
      } else {
        this.noprint = true;
      }
      this.$refs.modal.open();
      this.modalLoading = true
      this.formListModalLoading = true
    },
    onmessage(e) {
        let wid = this.$refs["ifamme-modal"].contentWindow;
        if (e.data.type == 'loaded') {
          try {
            if (wid.getFormListData) {
              this.formListData = JSON.parse(JSON.stringify(wid.getFormListData()))
              window.getFormListData = () => {
                return JSON.parse(JSON.stringify(this.formListData))
              }
            }
          } catch (e) {}
        }
        let query = qs.parse(this.url.split('?')[1])
        // console.log(query, 'query')
        if (query.id) {
          this.status = '1'
          this.saveButtonText = "保存"
          this.title = "修改评估表"
        } else {
          this.status = '0'
          this.saveButtonText = "签名"
          this.title = "创建评估表"
        }
        // 数据加载完成后 关闭隐藏 预加载 动画
        this.modalLoading = false
        this.formListModalLoading = false
      },
    onload() {

      let wid = this.$refs["ifamme-modal"].contentWindow;
      // this.formCode = jQuery('[name="formCode"]', wid.document).val();
      window.wid = wid
        // 修改医院名称
        try {
          window.wid.document.querySelector('.hospital').innerText = this.hospitalNameSpace
        } catch (error) {
          //
        }

      // 如果是新表单
      try {
        if (wid.formInfo.nooForm == '1') {
          wid.onmessage = this.onmessage
          initNooForm(wid)
          return
        }
      } catch (e) {
        console.log('新表报错',e)
      }

      try {
          this.formCode = jQuery('[name="formCode"]', wid.document).val();
        } catch (error) {
          // 新表报错
          this.modalLoading = false
          this.formListModalLoading = false
          return
        }

      initList(wid);

      if (this.formCode === 'form_swallowing') {
        this.saveButtonText = "保存"
      }

      try {
        this.formListData = {}
        this.formListData = wid.getFormListData()||{}
        if (this.formListData) {
          console.log("-------this.formListData", this.formListData);
        } else {
          this.formListData = {}
        }
      } catch (e) {
        this.formListData = {}
      }


      // 按下编辑按钮后进入编辑已有数据表单模式
      if (this.url.indexOf("editForm") > -1) {
        // var forFilledData = this.$store.state.form.formFilledData;
        var urlstr = this.url.split('?')[1]
        var urlObj = qs.parse(urlstr)
        var formTableId = urlObj.openFormId;
        this.$route.query.id = formTableId
        // this.url+='&id='+formTableId
        console.log("获取表单存储数据元","id",urlObj, formTableId, "url", this.url);
        if(formTableId!=='NaN'){
          // 获取 表单存储数据元 回填数据入表中
          evalDetail(
            formTableId
          ).then(res => {
            console.log("!!!!!onload_formField", res);
            // eventInit(res.data.data, wid);
            formFill.fill(res.data.data, wid,false);
            formFillDataset.fill(res.data.data, this.formListData);
            this.$refs.formList.setDataFormPost(this.formListData);
            console.log("----formListData", this.formListData);
            this.formStatus = res.data.data.status;
            if (res.data.data.status === '1' || res.data.data.status === "2") {
              this.saveButtonText = "保存"
            }

            // 数据加载完成后 关闭隐藏 预加载 动画
            this.modalLoading = false
            this.formListModalLoading = false

          });
        }else{
          // 关闭隐藏 预加载 动画
        this.modalLoading = false
        this.formListModalLoading = false
        }
      } else {
        // 关闭隐藏 预加载 动画
        this.modalLoading = false
        this.formListModalLoading = false
      }


      if (wid) {
        this.controlBtn = wid.formApp.controlBtn().join("");
        // 表单护理字段
        formField(
          this.formCode,
          this.$route.query.patientId,
          this.$route.query.visitId
        ).then(res => {
          // eventInit(res.data.data, wid);
        });
      }
    },
    close() {

      this.beforeClose();
      this.$refs.modal.close();
    },
    beforeClose() {
      this.controlBtn = "";
      this.password = "";
      this.url = "";
    },
    saveForm() {
      let wid = this.$refs["ifamme-modal"].contentWindow;




      if (wid.validateForm) {
        let obj = wid.validateForm();
        if (obj.ok) {
          this.saveFormbyPw()
        } else {
          this.$notify({
            title: "警告",
            message: obj.msg,
            type: "warning"
          });
        }
      } else {
        if (
          (jQuery("input[name$='eval_score']", wid.document).length &&
            jQuery("input[name$='eval_score']", wid.document).val()) ||
          jQuery("input[name$='eval_score']", wid.document).length == 0
        ) {
          this.saveFormbyPw()
        } else {
          this.$notify({
            title: "警告",
            message: "评估表分数不能为空",
            type: "warning"
          });
        }
      }
    },
    printClick() {
      let wid = this.$refs["ifamme-modal"].contentWindow;
      wid.formApp.printClick();
    },
    saveFormbyPw() {
      // bus.$emit('assessmentSignSave');

      this.$refs.signModal.open((password, empNo) => {
        let postData = {};
        let result = [];




        this.$nextTick(() => {
          let wid = this.$refs["ifamme-modal"].contentWindow;
          console.log('保存表单===',wid,wid.formInfo)

          if (wid.formInfo && wid.formInfo.nooForm==='1'){
            // signForm  saveForm
            // wid.saveForm().then(res => {
            wid.signForm(empNo,password).then(res => {
              this.$notify({
                title: '成功',
                message: '签名成功',
                type: 'success'
              });
              if (res){
                let evalScoreAndUnit = res.data.evalScoreAndUnit
                let id = res.data.id||this.$route.query.id
                // _this.bus.$emit('openAssessment', {
                //   id: item.id,
                // })
                // console.log(res)
                this.callback(res,wid.formInfo)
              }
              this.$refs.modal.close()
              bus.$emit('refreshTree')
            })

            return
          }




          console.log(this.$refs, 1231)
          console.log('empNo:', empNo, 'password:', password)
          postData['empNo'] = empNo
          // if (this.formStatus === '2') {
          // postData['auditSign'] = password
          // } else {
          let oneSignForms = ['form_fall','form_dvt_pte','form_pressure_risk','form_selfcare','form_pain_assessment','form_caprini','form_padua']

            if (oneSignForms.indexOf(this.formCode)> -1) {
            postData['auditSign'] = password;
            postData['createSign'] = password
          }

          // }

          // let wid = this.$refs["ifamme-modal"].contentWindow;
          let list = this.$store.state.form.measure;
          let select = this.$store.state.form.select;

          for (let item of list) {
            if (this.$_.indexOf(select, item.code) > -1) {
              result.push(item);
            }
          }
          let all = [];
          for (let item of result) {
            let allItem = "";
            let code = `${item.code}`;
            let measure = [];
            for (let option of item.measure) {
              measure.push(option);
            }
            let factor = `${item.factor}`;
            allItem = `${code}/${measure.join("_")}/${factor}`;
            all.push(allItem);
          }
          // postData = `&diags=${all.join(",")} + &empNo=${empNo}`;
          console.log("allItem", all);
          // let postData = `&diags=${all.join(",")}`;
          postData["diags"] = all.join(",");
          var formTableName = jQuery(`input[name*='formCode']`, wid.document).val();
          var selectString = `input[name*='${formTableName}']:checked,input[name*='${formTableName}']:text,input[type*='date'],input[type*='time'],textarea[name*='${formTableName}']`;
          var splitMark = ",";
          console.log("FormBoxwid.document", formTableName, wid, wid.document);
          console.log("jQuery_formCode)", jQuery(`input[name*='formCode']`, wid.document));



          // 侧边栏 护理措施 和 入院情况 字段数据获取
          try {
            let tabs = this.formListData.tabs;
            let formCode = formTableName; //this.formListData.smartForm.formCode;
            console.log("--tabs", tabs);
            tabs.forEach((tab, index) => {
              tab.items.forEach((item, index) => {
                console.log("--getDataToPost", formCode, item.result, item);
                if (item.group != undefined && item.name.indexOf(formCode) > -1) {
                  if (item.result.length > 0) {
                    postData[item.name] = item.result
                    return;
                  }
                }
                if (item.group === undefined && item.name.indexOf(formCode) > -1) {
                  postData[item.name] = item.result
                  return;
                }
                if (item.child != undefined) {
                  item.child.forEach((kid, index) => {
                    if (kid.name.indexOf(formCode) > -1) {


                      if (kid.type === "datetime" && kid.result != "") {
                        console.log("--datetime", formCode, kid.name, typeof(kid.result), moment(kid.result), kid);
                        postData[kid.name] = moment(kid.result).format("YYYY/MM/DD HH:mm:ss");
                        return;
                      }
                      if(kid.hasOwnProperty('results')){
                        kid.result = kid.results.toString()
                      }
                      if(typeof(kid.result)==='object'){
                      postData[kid.name] = kid.result.toString()
                      }
                      // if(typeof(kid.result)==='string'){
                        postData[kid.name] = kid.result
                      // }
                    }
                  });
                }
              });
            });
            console.log("++++++++getDataToPost", postData);
          } catch (e) {
            console.info("++++ERROR++++getDataToPost", e);
          }

          // alert("formTableName:"+formTableName);

          if (this.url.indexOf("editMode") > -1 || this.url.indexOf("openFormId") > -1 ) {
            var formId =  this.$route.query.id||this.$store.state.form.formFilledData.id;
            postData['id'] = formId;
            console.log("----id", formId, "url", this.url, postData);
          }

          // if(this.$route.query.id){
          //   postData['id'] = this.$route.query.id
          // }

          $(selectString, wid.document).each(function() {
            // var item = {[this.name]:this.value};
            // console.log(this.name);
            if (this.id.indexOf("CRS") > -1 ||
              this.name.indexOf("eval_auth") > -1 ||
              this.name.indexOf("creator") > -1 ||
              this.name.indexOf("signDate") > -1 ||
              this.name.indexOf("auditor") > -1 ||
              this.name.indexOf("auditDate") > -1
            ) {
              return;
            }
            // textarea
            if ((this.tagName === "TEXTAREA")) {
              postData[this.name] = this.value;
            }
            // input
            if ((this.type === "text")) {
              // console.log("text:", this.name, ",", this.value);
              if (this.value) {
                postData[this.name] = this.value;
              } else {
                postData[this.name] = "";
              }
            }
            if (this.type === "radio" || this.type === "date" || this.type === "time" || this.type === "number") {
              // console.log(this.type, this.name, ",", this.value);
              postData[this.name] = this.value;
            }
            if (this.type === "checkbox") {
              // console.log("checkbox:", this.name, ",", this.value);
              if (!postData[this.name]) {
                postData[this.name] = "";
              }
              postData[this.name] += this.value + splitMark;
            }
          });



          let evalDateInput = jQuery(`[name*='${formTableName}_eval_date']`, wid.document);
          console.log("_______evalDateInput", evalDateInput);


          try {
            // if (postData[formTableName + '_eval_date'] === undefined || postData[formTableName + '_eval_date'] === "") {
            if (evalDateInput.length === 0) {
              let evalData = postData[formTableName + '_record_date'] + " " + postData[formTableName + '_record_time'];
              postData[formTableName + '_eval_date'] = moment(evalData).format('YYYY-MM-DD HH:mm');
            } else {
              postData[formTableName + '_eval_date'] = moment(evalDateInput[0].value).format('YYYY-MM-DD HH:mm')
            }
            if (postData[formTableName + '_eval_date'] === "Invalid date") {
              postData[formTableName + '_eval_date'] = moment().format('YYYY-MM-DD HH:mm')
            }

          } catch (e) {
            console.log(e);
          }



          console.log("FormBoxpostData", postData);

          // let dataJQ = jQuery(`[name$=${formTableName}]`, wid.document);
          //
          // console.log("jQueryFormTableName", dataJQ, dataJQ.serialize());

          wid.formApp.postForm(this.password, postData, (callbackData) => {
            this.callback(
              postData,
              callbackData
              // jQuery("#smartform", wid.document).serialize()
              // formTableName
            )
            // this.close()
          });

        }) // nexttick
      }) // signModal.open
    }
  },
  components: {
    SweetModal,
    SweetModalTab,
    formList,
    formModals,
    bodyModal,
    messageModal,
    signModal,
  }
};
</script>
