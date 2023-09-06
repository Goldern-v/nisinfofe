<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="420" title="停止护理计划">
      <div class="title">{{ data.diagName }}</div>
      <div class="line"></div>
      <div class="label">【护理评价】</div>
      <div class="select-box" flex="cross:center">
        <span class="key">护理目标</span>
        <div class="value" flex="cross:stretch" flex-box="1">
          <div class="select-item" flex="cross:center main:center" flex-box="1">
            <el-radio class="radio" v-model="radio" label="达到" size="small"
              >达到</el-radio
            >
          </div>
          <div
            class="select-item"
            flex="cross:center main:center"
            flex-box="1"
            style="border-left:1px solid #C2CBD2;border-right: 1px solid #C2CBD2"
          >
            <el-radio
              class="radio"
              v-model="radio"
              label="部分达到"
              size="small"
              >部分达到</el-radio
            >
          </div>
          <div class="select-item" flex="cross:center main:center" flex-box="1">
            <el-radio class="radio" v-model="radio" label="未达到" size="small"
              >未达到</el-radio
            >
          </div>
        </div>
      </div>

      <div class="select-box" flex>
        <span class="key" style="margin-top: 5px">
          说
          <span style="opacity: 0">空格</span>明
        </span>
        <div class="text-con" flex="cross:stretch" flex-box="1">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="evalContent"
          ></el-input>
        </div>
      </div>

      <div slot="button" style="text-align: center">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post"
          >停止护理计划</el-button
        >
      </div>
    </sweet-modal>
    <signModal ref="signModal"></signModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title
  font-size: 16px;
  color: #333333;
.aside
  font-size: 14px;
  color: #687179;
.line
  border-top: 1px dashed #A09D9D;
  margin-top 15px
.label
  font-size: 14px;
  color: #687179;
  margin-top 11px
  position relative
  left -7px
.select-box
  margin-top 10px
.key
  font-size: 14px;
  color: #687179;
  width 75px
.value
  width 0
  width 210px
  height 37px
  background: #FFFFFF;
  border: 1px solid #C2CBD2;
  border-radius: 2px;
.select-item
  width 0
  font-size: 14px;
  color: #333333
.text-con
  width 0
  >>> textarea
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 2px;
    height 80px
    resize none
</style>
<script>
import signModal from "../../../../../components/modal/sign";
import { nursingDiagsStop } from "../api/index";
import { model } from "../diagnosisViewModel";
export default {
  data() {
    return {
      radio: "达到",
      evalContent: "",
      data: {}
    };
  },
  methods: {
    open() {
      this.radio = "达到";
      this.evalContent = "";
      this.data = model.selectedRow;
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let strSignData = ""
      if(model.selectedRow.measuresName.length>0) model.selectedRow.measuresName.forEach(item=>{
          strSignData += item.measureDetail+'/n'
        })
      else strSignData = model.selectedRow.diagMeasures
      let SigndataObj = {
        Patient_ID:this.$route.query.patientId,
        Visit_ID:this.$route.query.visitId,
        Document_Title:"",
        Document_ID:model.selectedRow.diagCode,
        Section_ID:model.selectedRow.diagCode,
        strSignData: strSignData,
      };

       let verifySignObj = {
        patientId:this.$route.query.patientId,
        visitId:this.$route.query.visitId,
        formName:"",
        formCode:model.selectedRow.diagCode,
        instanceId:model.selectedRow.id,
        recordId:"",
        signData:strSignData,
      }
      window.openSignModal((password, username) => {
        nursingDiagsStop(
          password,
          username,
          this.data.id,
          this.radio,
          this.evalContent
        ).then(res => {
          this.$message({
            showClose: true,
            message: "停止成功",
            type: "success"
          });
          model.refreshTable();
          this.close();
        });
      },undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,SigndataObj,verifySignObj);
    }
  },
  mounted() {},
  computed: {
    title() {
      // return `${this.data.seqNo ? "P" : ""}${this.data.seqNo || ""}${
      //   this.data.seqNo ? "：" : ""
      // }${this.data.diagName || ""}`;
    }
  },
  components: {
    signModal
  }
};
</script>
