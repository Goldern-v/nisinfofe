<template>
  <div>
    <div class="form-modal">
      <sweet-modal ref="modal" size="record" :title="title" :fullBtn="true" @close="beforeClose">
        <div class="record-modal-con" flex>
          <div flex-box="3" style="width:0" class="record-box" v-loading="modalLoading">
            <iframe
              ref="iframeModal"
              class="iframe-form-con"
              v-if="url"
              :src="url"
              frameborder="0"
              @load="onload"
            ></iframe>
          </div>
          <div v-if="formListData" flex-box="1" style="width:0; overflow:visible; height:100%">
            <div flex-box="3" style="width:100%; height:100%" v-loading="formListModalLoading">
              <formList :formCode="formCode" :formListData="formListData" ref="formList"></formList>
            </div>
          </div>
        </div>
        <div slot="button" style="text-align:center">
          <el-button class="modal-btn" @click="$refs.modal.close()">取消</el-button>
          <el-button
            class="modal-btn"
            v-show="controlBtn.indexOf('signSave') > -1 || true"
            @click="saveForm"
            type="primary"
          >{{saveButtonText}}</el-button>
        </div>
      </sweet-modal>
    </div>
    <!-- 签名确认 -->
    <signModal ref="signModal"></signModal>
    <sweet-modal ref="modalName" size="small" title="签名确认">
      <p for class="name-title">请输入登录密码</p>
      <div action @keyup.13="saveFormbyPw">
        <el-input size="small" type="password" placeholder="请输入密码" v-model="password"></el-input>
      </div>
      <div slot="button">
        <el-button @click="$refs.modalName.close()">取消</el-button>
        <el-button type="primary" @dblclick.stop="saveFormbyPw" @click.stop="saveFormbyPw">确认</el-button>
      </div>
    </sweet-modal>
    <!-- 提交弹窗组 -->
    <formModals></formModals>
    <!-- 人体图弹窗 -->
    <body-modal ref="bodyModal"></body-modal>
    <!-- 消息提示弹窗 -->
    <message-modal ref="messageModal"></message-modal>

    <!-- 打开新建弹框 -->
    <openNewFormModal ref="openNewFormModal"></openNewFormModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.record-modal-con
  height 100%
  // border: 1px solid #ddd;
.record-box
  border-right 1px solid #ddd
  height 100%
.iframe-form-con
  width 100%
  height 100%
.name-title
  font-size 14px
  margin 5px 0 10px
  font-weight bold
.modal-btn
  width 88px
.form-modal
  >>>.sweet-buttons
    padding-right 310px

>>>.el-loading-mask {
  background: white !important;
}

</style>

<script>
import $ from "jquery";
import { SweetModal, SweetModalTab } from "@/plugin/sweet-modal-vue";
import formList from "./formList.vue";
import formModals from "./formModals";
import { initList } from "./form.details";
import { initNooForm } from "./form.details.nooForm";
import { formField } from "@/api/form";
import { evalDetail } from "@/api/form_hj";
import { findAllRecord } from "@/api/form_hj";
import { eventInit } from "./form.event";
import formFill from "./form.fill";
import formFillDataset from "./form.fill.dataset";
import bodyModal from "../body-modal/body-modal.vue";
import signModal from "@/components/modal/sign.vue";
import openNewFormModal from "@/Page/patientInfo/supPage/record/modal/open-form.vue";
import messageModal from "../message-modal/message-modal.vue";
import moment from "moment";
import qs from "qs";
import { saveByJson } from "../../supPage/record/api/index.js";
import bus from "vue-happy-bus";
import commonMixin from "@/common/mixin/common.mixin";
export default {
  mixins: [commonMixin],
  name: "Parent",
  provide: {
    activeTabName: "护理措施"
  },
  data() {
    return {
      controlBtn: "",
      password: "",
      url: "",
      formCode: "",
      title: "新建病历",
      modalLoading: false,
      formListModalLoading: false,
      wid: {},
      formListData: {},
      saveButtonText: "保存",
      formStatus: "0",
      bus: bus(this),
      status: "0" //表单状态
    };
  },
  created() {},
  mounted() {
    window.closeModalName = () => {
      this.formListData = {};
      this.$refs.modalName.close();
      // this.$refs.signModal.post();
    };
    window.openModalName = () => {
      this.password = "";
      this.formListData = {};
      this.$refs.modalName.open();
      // 开启签名
      // this.$refs.signModal.open(this.saveFormbyPw);
    };
    this.bus.$on("openNewFormBoxModal", this.openNewFormBoxModal);
  },
  methods: {
    openNewFormBoxModal(box) {
      this.$refs.openNewFormModal.open(box);
    },
    open(url) {
      this.formListData = {};
      this.$refs.formList.activeTab = "护理措施";
      this.controlBtn = "";
      this.password = "";
      this.url = url;
      console.log("formBox-URL", this.url);
      if (this.url.indexOf("input") > -1) {
        this.title = "新建评估表";
      }
      if (this.url.indexOf("editMode") > -1) {
        this.title = "修改评估表";
      }
      this.$refs.modal.open();
      // if (this.url.indexOf("form_ry") > -1) {
      if (this.url.indexOf("_first") > -1) {
        console.log(this.$refs.modal);
        this.$refs.modal.infull = true;
      }
      this.modalLoading = true;
      this.formListModalLoading = true;
    },
    onmessage(e) {
      let wid = this.$refs["iframeModal"].contentWindow;
      if (e.data.type == "loaded") {
        try {
          if (wid.getFormListData) {
            this.formListData = JSON.parse(
              JSON.stringify(wid.getFormListData())
            );
            window.getFormListData = () => {
              return JSON.parse(JSON.stringify(this.formListData));
            };
          }
        } catch (e) {}
      }
      let query = qs.parse(this.url.split("?")[1]);
      // console.log(query, 'query')
      if (query.id) {
        this.status = "1";
        this.saveButtonText = "保存";
        this.title = "修改评估表";
      } else {
        this.status = "0";
        this.saveButtonText = "签名";
        this.title = "创建评估表";
      }
      // 数据加载完成后 关闭隐藏 预加载 动画
      this.modalLoading = false;
      this.formListModalLoading = false;
    },
    onload() {
      // this.modalLoading = false
      // this.formListModalLoading = false
      let wid = this.$refs["iframeModal"].contentWindow;
      this.$route.query["id"] = null;
      window.wid = wid;
      // 修改医院名称
      try {
        window.wid.document.querySelector(
          ".hospital"
        ).innerText = this.hospitalNameSpace;
      } catch (error) {
        //
      }
      // 如果是新表单
      try {
        if (wid.formInfo && wid.formInfo.nooForm == "1") {
          wid.onmessage = this.onmessage;
          this.formListData = wid.getFormListData() || {};
          initNooForm(wid);
          return;
        }
      } catch (e) {
        console.log("新表报错", e);
      }

      try {
        this.formCode = jQuery('[name="formCode"]', wid.document).val();
      } catch (error) {
        // 新表报错
        this.modalLoading = false;
        this.formListModalLoading = false;
        return;
      }

      // this.$refs.newForm.open()

      this.saveButtonText = "签名";
      this.formStatus = "-1";
      wid["formBoxUI"] = {};
      wid["formBoxUI"]["saveButtonText"] = this.saveButtonText;
      if (this.formCode === "form_swallowing") {
        this.saveButtonText = "保存";
      } else {
        this.saveButtonText = "签名";
      }
      // let datepickerInput = this.$refs.datepicker
      // var evaldateInput = jQuery(`input[name*='${this.formCode}_eval_date']`, wid.document);
      //
      // console.log("----datepickerInput", datepickerInput);
      //
      // evaldateInput.prop('outerHTML', datepickerInput.$el.outerHTML)
      initList(wid);
      this.wid = wid;

      try {
        console.log("onload_initList", wid, wid.getFormListData());
      } catch (error) {
        //
      }

      try {
        this.formListData = {};
        this.formListData = wid.getFormListData() || {};
        if (this.formListData) {
          console.log("-------this.formListData", this.formListData);
        } else {
          this.formListData = {};
        }
      } catch (e) {
        this.formListData = {};
      }
      // this.$refs.modal.infull = true;
      // // check input initial value;
      // var inputs = jQuery(`[name*="${this.formCode}"]`,wid.document)
      // console.log("#######inputs#######",inputs);
      // 按下编辑按钮后进入编辑已有数据表单模式
      if (this.url.indexOf("editMode") > -1) {
        var forFilledData = this.$store.state.form.formFilledData;
        var formTableId = forFilledData.id;
        // this.url+='&id='+formTableId
        console.log("id", formTableId, "url", this.url, forFilledData);
        // 获取 表单存储数据元 回填数据入表中
        evalDetail(formTableId).then(res => {
          console.log("!!!!!onload_formField", res);

          // eventInit(res.data.data, wid);
          formFill.fill(res.data.data, wid);
          formFillDataset.fill(res.data.data, this.formListData);
          this.$refs.formList.setDataFormPost(this.formListData);

          // 加载第一张疼痛表 "form_pain_assessment"
          if (this.formCode === "form_pain_assessment") {
            formTableId =
              localStorage["firtPainFormID" + this.$route.query.patientId] ||
              "";
            console.log("!!!加载第一张疼痛表!!formTableId", formTableId);
            if (formTableId) {
              evalDetail(formTableId).then(resData => {
                console.log("!!!加载第一张疼痛表!!onload_formField", resData);
                let pageMap = resData.data.data.pageMap;
                res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_A"] = res.data
                  .data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_A"]
                  ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_A"]
                  : pageMap["FORM_PAIN_ASSESSMENT_TTBW_A"]; //疼痛部位
                res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_B"] = res.data
                  .data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_B"]
                  ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_B"]
                  : pageMap["FORM_PAIN_ASSESSMENT_TTBW_B"];
                res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_C"] = res.data
                  .data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_C"]
                  ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_C"]
                  : pageMap["FORM_PAIN_ASSESSMENT_TTBW_C"];
                res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_D"] = res.data
                  .data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_D"]
                  ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_D"]
                  : pageMap["FORM_PAIN_ASSESSMENT_TTBW_D"];
                res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTFL"] = res.data
                  .data.pageMap["FORM_PAIN_ASSESSMENT_TTFL"]
                  ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTFL"]
                  : pageMap["FORM_PAIN_ASSESSMENT_TTFL"]; //疼痛分类
                res.data.data.pageMap["FORM_PAIN_ASSESSMENT_RYSTTQK"] = res.data
                  .data.pageMap["FORM_PAIN_ASSESSMENT_RYSTTQK"]
                  ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_RYSTTQK"]
                  : pageMap["FORM_PAIN_ASSESSMENT_RYSTTQK"]; //入院时疼痛情况

                formFill.fill(res.data.data, wid);
                formFillDataset.fill(res.data.data, this.formListData);
                this.$refs.formList.setDataFormPost(this.formListData);

                //
                if (this.wid && this.wid.setPainList) {
                  let painList = {};
                  painList["FORM_PAIN_ASSESSMENT_TTBW_A".toLowerCase()] = res
                    .data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_A"]
                    ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_A"]
                    : pageMap["FORM_PAIN_ASSESSMENT_TTBW_A"]; //疼痛部位
                  painList["FORM_PAIN_ASSESSMENT_TTBW_B".toLowerCase()] = res
                    .data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_B"]
                    ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_B"]
                    : pageMap["FORM_PAIN_ASSESSMENT_TTBW_B"];
                  painList["FORM_PAIN_ASSESSMENT_TTBW_C".toLowerCase()] = res
                    .data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_C"]
                    ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_C"]
                    : pageMap["FORM_PAIN_ASSESSMENT_TTBW_C"];
                  painList["FORM_PAIN_ASSESSMENT_TTBW_D".toLowerCase()] = res
                    .data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_D"]
                    ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTBW_D"]
                    : pageMap["FORM_PAIN_ASSESSMENT_TTBW_D"];
                  painList["FORM_PAIN_ASSESSMENT_TTFL".toLowerCase()] = res.data
                    .data.pageMap["FORM_PAIN_ASSESSMENT_TTFL"]
                    ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_TTFL"]
                    : pageMap["FORM_PAIN_ASSESSMENT_TTFL"]; //疼痛分类
                  painList["FORM_PAIN_ASSESSMENT_RYSTTQK".toLowerCase()] = res
                    .data.data.pageMap["FORM_PAIN_ASSESSMENT_RYSTTQK"]
                    ? res.data.data.pageMap["FORM_PAIN_ASSESSMENT_RYSTTQK"]
                    : pageMap["FORM_PAIN_ASSESSMENT_RYSTTQK"]; //入院时疼痛情况
                  this.wid.setPainList(painList);
                }
              });
            }
          }

          console.log("----formListData", this.formListData);
          this.formStatus = res.data.data.status;
          if (res.data.data.status === "1" || res.data.data.status === "2") {
            this.saveButtonText = "保存";
          }
          // 数据加载完成后 关闭隐藏 预加载 动画
          this.modalLoading = false;
          this.formListModalLoading = false;
        });
      } else {
        // 加载第一张疼痛表 "form_pain_assessment"
        if (this.formCode === "form_pain_assessment") {
          formTableId =
            localStorage["firtPainFormID" + this.$route.query.patientId] || "";
          console.log(
            "!!新建疼痛表!加载第一张疼痛表!!formTableId",
            formTableId
          );
          if (formTableId) {
            evalDetail(formTableId).then(resData => {
              console.log(
                "!!新建疼痛表!加载第一张疼痛表!!onload_formField",
                resData
              );
              let pageMap = resData.data.data.pageMap;
              let newpageMap = {};
              let painList = {};
              painList["FORM_PAIN_ASSESSMENT_TTBW_A".toLowerCase()] =
                pageMap["FORM_PAIN_ASSESSMENT_TTBW_A"]; //疼痛部位
              painList["FORM_PAIN_ASSESSMENT_TTBW_B".toLowerCase()] =
                pageMap["FORM_PAIN_ASSESSMENT_TTBW_B"];
              painList["FORM_PAIN_ASSESSMENT_TTBW_C".toLowerCase()] =
                pageMap["FORM_PAIN_ASSESSMENT_TTBW_C"];
              painList["FORM_PAIN_ASSESSMENT_TTBW_D".toLowerCase()] =
                pageMap["FORM_PAIN_ASSESSMENT_TTBW_D"];
              painList["FORM_PAIN_ASSESSMENT_TTFL".toLowerCase()] =
                pageMap["FORM_PAIN_ASSESSMENT_TTFL"]; //疼痛分类
              painList["FORM_PAIN_ASSESSMENT_RYSTTQK".toLowerCase()] =
                pageMap["FORM_PAIN_ASSESSMENT_RYSTTQK"]; //入院时疼痛情况
              newpageMap["pageMap"] = painList;

              console.log(
                "!!!加载第一张疼痛表!!painList",
                painList,
                this.formListData
              );

              // formFill.fill(painList, wid);
              formFillDataset.fill(newpageMap, this.formListData);
              this.$refs.formList.setDataFormPost(this.formListData);

              //
              if (this.wid && this.wid.setPainList) {
                this.wid.setPainList(painList);
              }
            });
          }
        }

        // 关闭隐藏 预加载 动画
        this.modalLoading = false;
        this.formListModalLoading = false;
      }

      // 获取诊断数据包
      // findAllRecord(formCode,deptCode)  this.formCode deptCode  wardCode
      // console.log("发送——获取诊断数据包", this.formCode, this.$route.query.wardCode);
      // try {
      //   findAllRecord(
      //     this.formCode,
      //     this.$route.query.wardCode
      //   ).then(res => {
      //     console.log("!!!!!findAllRecord", res);
      //     if (res !== undefined && res.data.data) {
      //       eventInit(res.data.data, wid);
      //     }
      //     // formFill.fill(res.data.data, wid);
      //   }, (err) => {
      //     console.log('获取诊断数据包,错误Error', err);
      //   });
      // } catch (e) {
      //   //
      //   console.log('获取诊断数据包,错误', e)
      // }
      // 南医三旧接口  绑定诊断 点击选项 事件
      // console.log("route.query",this.$route.query);
      // if (wid.jQuery) {
      //   console.log("获取诊断数据包route.query",wid.jQuery);
      //   this.controlBtn = wid.formApp.controlBtn().join("");
      //   this.formCode = wid.jQuery('[name="formCode"]').val();
      //   formField(
      //     this.formCode,
      //     this.$route.query.patientId,
      //     this.$route.query.visitId
      //   ).then(res => {
      //     console.log("onload_formField",res);
      //     eventInit(res.data.data, wid);
      //   });
      // }
    },
    close() {
      this.beforeClose();
      this.$refs.modal.close();
    },
    beforeClose() {
      this.controlBtn = "";
      this.password = "";
      this.url = "";
      this.$refs.modal.infull = false;
    },
    saveForm() {
      let wid = this.$refs["iframeModal"].contentWindow;
      if (!wid) {
        return;
      }
      // 如果是新表单
      try {
        if (wid.formInfo.nooForm == "1") {
          if (this.status == "1") {
            wid.saveForm().then(res => {
              console.log("saveForm", res);
              let resData = res.data.data;
              this.$notify({
                title: "保存成功",
                message: resData.reminder || "",
                type: "success"
              });
              this.bus.$emit("openAssessment", {
                id: resData.id,
                formCode: resData.formCode,
                showCurve: resData.showCurve,
                creator: resData.creator,
                listPrint: resData.listPrint,
                nooForm: resData.nooForm,
                pageUrl: resData.pageUrl
              });
              this.bus.$emit("refreshTree");
              this.close();
            });
          } else {
            console.log('ddddddddddddddddddddddd');
            this.$refs.signModal.open((password, empNo) => {
              wid.signForm(empNo, password).then(res => {
                console.log("signForm", res);
                let resData = res.data.data;
                this.$notify({
                  title: "签名成功",
                  message: resData.reminder || "",
                  type: "success"
                });
                this.bus.$emit("openAssessment", {
                  id: resData.id,
                  formCode: resData.formCode,
                  showCurve: resData.showCurve,
                  creator: resData.creator,
                  listPrint: resData.listPrint,
                  nooForm: resData.nooForm,
                  pageUrl: resData.pageUrl
                });
                this.bus.$emit("refreshTree");
                this.close();
              });
            },  "", false, null ,"" ,{});
          }
          return;
        }
      } catch (e) {
        console.log(e);
      }
      // alert(22)
      // 如果要修改 启动签名
      // window.openModalName
      if (
        this.formStatus === "1" ||
        this.formStatus === "2" ||
        this.formCode === "form_swallowing"
      ) {
        //  && this.saveButtonText === "签名"
        this.saveButtonText = "保存";
        // this.password = "";
        // this.$refs.signModal.open(this.saveFormbyPw);
        // return;
        this.saveFormbyPw();
        return;
      } else {
        this.saveButtonText = "签名";
      }
      if (wid.validateForm) {
        let obj = wid.validateForm();
        console.log("saveForm obj", obj);
        if (obj.ok) {
          // this.$refs.modalName.open();
          // this.saveFormbyPw()
        } else {
          this.$notify({
            title: "警告",
            message: obj.msg,
            type: "warning"
          });
        }
      } else {
        // var len = wid.document.querySelector("input[name$='eval_score']").length;
        var eval_score_input = wid.document.querySelector(
          "input[name$='eval_score']"
        );
        // // check input current value;
        // var inputs = jQuery(`[name*="${this.formCode}"]`,this.wid.document)
        // console.log("#######inputs#######",inputs);
        var val = "";
        if (eval_score_input) {
          // 评估单
          val = wid.document.querySelector("input[name$='eval_score']").value;
          console.log("saveForm len", val, wid.document);
          if (val) {
            // this.$refs.modalName.open();
            this.$refs.signModal.open((password, empNo) => {
              console.log("saveFormbyPw:", this.$refs);
              this.$nextTick(() => {
                this.saveFormbyPw(password, empNo);
              });
            });
          } else {
            this.$notify({
              title: "警告",
              message: "评估表分数不能为空",
              type: "warning"
            });
          }
        } else {
          // 记录单
          this.$refs.signModal.open((password, empNo) => {
            console.log("saveFormbyPw:", this.$refs);
            this.$nextTick(() => {
              this.saveFormbyPw(password, empNo);
            });
          });
        }
        //wid.$("input[name$='eval_score']").length wid.$("input[name$='eval_score']").length
        // wid.$("input[name$='eval_score']").val()
        // if ((len && val) || len == 0 ) {
      }
    },
    saveFormbyPw() {
      // if (!this.password) {
      //   return this.$notify({
      //     title: "警告",
      //     message: "密码不能为空",
      //     type: "warning"
      //   });
      // }
      // this.$refs.signModal.open((password, empNo) => {
      // 初始化数据包
      let postData = {};
      let result = [];
      let password = "";
      let wid = this.wid;
      if (!this.formCode) {
        this.formCode = wid.CRForm.formInfo.formCode;
      }
      //   console.log("saveFormbyPw:", this.$refs)
      //   this.$nextTick(() => {
      // this.$refs.password  this.$refs.username
      if (arguments.length == 2) {
        console.log(this.$refs, 1231);
        password = arguments[0];
        let empNo = arguments[1];
        console.log("empNo:", empNo, "password:", password);
        postData["empNo"] = empNo;
        //
        console.log("this.info", this.info, this.formCode, this.formStatus);
        if (
          this.formStatus == "-1" ||
          this.formStatus == "0" ||
          this.formStatus == "1"
        ) {
          // postData['id'] = this.info.id;
          // postData['createSign'] = password;
          // 无审核人的表单，自动附带审核人签名密码
          if (
            this.formCode === "form_fall" ||
            this.formCode === "form_dvt_pte" ||
            this.formCode === "form_pressure_risk" ||
            this.formCode === "form_selfcare" ||
            this.formCode === "form_pain_assessment"
            // formCode.indexOf('form_swallowing') > -1 ||
          ) {
            postData["createSign"] = password;
            postData["auditSign"] = password;
          }
          // }
          // else if (this.info.status == 2) {
          //   postData['id'] = this.info.id;
          //   postData['auditSign'] = password;
          // }
          //
          if (this.formStatus === "2") {
            postData["auditSign"] = password;
          } else {
            postData["createSign"] = password;
          }
        }
      }

      console.log("-------------获取护理诊断详情---------------");
      let list = this.$store.state.form.measure;
      let select = this.$store.state.form.select;
      console.log("FormBoxsaveFormbyPw", wid, list, select);
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
      postData["diags"] = all.join(",");
      var formTableName = jQuery(`input[name*='formCode']`, wid.document).val();
      var selectString = `input[name*='${formTableName}']:checked,input[name*='${formTableName}']:text,input[type*='date'],input[type*='time'],textarea[name*='${formTableName}']`;
      // var selectString = `input[name*='${formTableName}']:checked,input[name*='${formTableName}'][checked='false'],input[name*='${formTableName}']:text,input[type*='date'],input[type*='time']`;
      var splitMark = ",";
      // console.log("FormBoxwid.document", formTableName, wid, wid.document);
      // console.log("jQuery_formCode)", jQuery(`input[name*='formCode']`, wid.document));
      // alert("formTableName:"+formTableName);
      // 侧边栏 护理措施 和 入院情况 字段数据获取

      let formCode = formTableName;
      //
      if (!formCode || formCode == "undefined") {
        formCode = wid.CRForm.formInfo.formCode;
        formTableName = wid.CRForm.formInfo.formCode;
      }

      try {
        let tabs = this.formListData.tabs;
        this.formListData.smartForm.formCode;
        console.log("--tabs", tabs);

        tabs.forEach((tab, index) => {
          // for (var i = 0; i < tabs.length; i++) {
          // let tab = tabs[i];
          // for (var index = 0; index < tab.length; index++) {
          // let item = tab[index];
          tab.items.forEach((item, index) => {
            console.log("--getDataToPost", formCode, item.result, item);
            if (item.group != undefined && item.name.indexOf(formCode) > -1) {
              if (typeof item.result === "object") {
                postData[item.name] = item.result.toString();
              }
              if (typeof item.result === "string" && item.result.length > 0) {
                postData[item.name] = item.result;
                return;
              }
            }
            if (item.group === undefined && item.name.indexOf(formCode) > -1) {
              postData[item.name] = item.result;
              return;
            }
            if (item.child != undefined) {
              // for (var k = 0; k < item.length; k++) {
              //   let kid = item[k];
              item.child.forEach((kid, index) => {
                if (kid.name.indexOf(formCode) > -1) {
                  if (kid.type === "datetime" && kid.result != "") {
                    console.log(
                      "--datetime",
                      formCode,
                      kid.name,
                      typeof kid.result,
                      moment(kid.result),
                      kid
                    );
                    postData[kid.name] = moment(kid.result).format(
                      "YYYY/MM/DD HH:mm:ss"
                    );
                    return;
                  }
                  if (kid.hasOwnProperty("results")) {
                    kid.result = kid.results.toString();
                  }
                  if (typeof kid.result === "object") {
                    postData[kid.name] = kid.result.toString();
                  }
                  // if(typeof(kid.result)==='string'){
                  postData[kid.name] = kid.result;
                  // }
                }
              });
              // } // for
            }
          });
          // } // for
        });
        // } // for
        console.log("侧边栏护理措施+++getDataToPost", postData);
      } catch (e) {
        console.info("侧边栏护理措施++ERROR++++getDataToPost", e);
      }
      // 文书数据编辑修改模式
      if (this.url.indexOf("editMode") > -1) {
        var formId = this.$store.state.form.formFilledData.id;
        postData["id"] = formId;
        console.log("----id", formId, "url", this.url, postData);
      }
      let selectedInputs = [];
      // 抽选INPUT
      $(selectString, wid.document).each(function(index, array) {
        // var item = {[this.name]:this.value};
        // console.log(this.name);
        let self = this;
        selectedInputs.push(self.name);
        if (
          self.id.indexOf("CRS") > -1 ||
          self.name.indexOf("eval_auth") > -1 ||
          self.name.indexOf("creator") > -1 ||
          self.name.indexOf("signDate") > -1 ||
          self.name.indexOf("auditor") > -1
          // self.name.indexOf("auditDate") > -1
        ) {
          return;
        }
        //
        if (
          self.name.indexOf("auditDate") > -1 &&
          postData["auditDate"] != self.value
        ) {
          postData["auditDate"] = self.value;
          return;
        }
        // textarea
        if (self.tagName === "TEXTAREA") {
          postData[self.name] = self.value;
        }
        // input
        if (self.type === "text") {
          // console.log("text:", self.name, ",", self.value);
          if (self.value) {
            postData[self.name] = self.value;
          } else {
            postData[self.name] = "";
          }
        }
        if (
          self.type === "radio" ||
          self.type === "date" ||
          self.type === "time" ||
          self.type === "number"
        ) {
          // console.log(self.type, self.name, ",", self.value);
          postData[self.name] = self.value;
        }
        if (self.type === "checkbox") {
          // console.log("checkbox:", this.name, ",", this.value);
          if (!postData[self.name]) {
            postData[self.name] = "";
          }
          postData[self.name] += self.value + splitMark;
        }
      }); //   jquery
      let evalDateInput = jQuery(
        `[name*='${formTableName}_eval_date']`,
        wid.document
      );
      console.log("_______evalDateInput", evalDateInput);
      try {
        // if (postData[formTableName + '_eval_date'] === undefined || postData[formTableName + '_eval_date'] === "") {
        if (evalDateInput.length === 0) {
          let evalData =
            postData[formTableName + "_record_date"] +
            " " +
            postData[formTableName + "_record_time"];
          postData[formTableName + "_eval_date"] = moment(evalData).format(
            "YYYY-MM-DD HH:mm"
          );
        } else {
          postData[formTableName + "_eval_date"] = moment(
            evalDateInput[0].value
          ).format("YYYY-MM-DD HH:mm");
        }
        if (postData[formTableName + "_eval_date"] === "Invalid date") {
          postData[formTableName + "_eval_date"] = moment().format(
            "YYYY-MM-DD HH:mm"
          );
        }
        // 吐咽评估表
        // if (formCode === "form_swallowing") {
        //
        // }
      } catch (e) {
        console.log(e);
      }
      // 获取所有INPUTS
      let allInputs = jQuery(`[name*='${formTableName}']`, wid.document);
      // console.log("=======selectedInputs)", formTableName, selectedInputs);
      let allInputss = [];
      for (var item in allInputs) {
        if (allInputs.hasOwnProperty(item)) {
          if (
            allInputss.indexOf(allInputs[item].name) > -1 ||
            selectedInputs.indexOf(allInputs[item].name) > -1
          ) {
            continue;
          }
          if (
            (allInputs[item].type === "radio" ||
              allInputs[item].type === "checkbox") &&
            allInputs[item].result !== true
          ) {
            // allInputss.push(allInputs[item].name);
            postData[allInputs[item].name] = "";
          }
        }
      }
      if (
        !formCode ||
        formCode == "undefined" ||
        (wid.CRForm &&
          wid.CRForm.formInfo &&
          wid.CRForm.formInfo.version == "2")
      ) {
        console.log("===formCode", formCode);
        formCode = wid.CRForm.formInfo.formCode;
        formTableName = wid.CRForm.formInfo.formCode;
        let formAllData = wid.CRForm.controller.getFormData();
        let paramMap = formAllData.paramMap;
        postData = { ...postData, ...paramMap, formCode };
      }
      // wid.CRForm.controller.getFormData()
      // console.log("=======all_Inpust)", allInputss);
      console.log("FormBoxpostData", postData);
      this.wid.formApp.postForm(password, postData);
      //   })
      // }) // signModal.open
    }
  },
  components: {
    SweetModal,
    SweetModalTab,
    formList,
    formModals,
    bodyModal,
    signModal,
    messageModal,
    openNewFormModal
  }
};
</script>
