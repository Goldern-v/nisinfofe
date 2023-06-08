<template>
  <div>
    <div class="no-do-bg" v-show="show" @click="close"></div>
    <transition name="el-zoom-in-left">
      <div v-show="show" class="slide-con">
        <h1 class="title">{{ data.name }}</h1>
        <aside class="aside">{{ definition }}</aside>
        <div class="close-btn" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <div class="save-btn" @click="save" v-if="status === '0'">
          <div v-touch-ripple>保存</div>
        </div>
        <div class="save-btn" @click="save" v-if="status === '1'">
          <div v-touch-ripple>更新</div>
        </div>
        <div class="save-btn disabled" v-if="status === '2'">
          <div>已停止</div>
        </div>
        <div class="cancel-btn" @click="close">
          <div>取消</div>
        </div>
        <div class="contain">
          <div class="date-con">
            <span>开始时间：</span>
            <el-date-picker
              format="yyyy-MM-dd HH:mm"
              size="small"
              v-model="beginTime"
              type="datetime"
              placeholder="选择开始时间"
            ></el-date-picker>
          </div>
          <div class="do-box">
            <div class="label">
              <span>【护理措施】</span>
            </div>
            <div class="input-group">
              <el-input
                :value="measureStr"
                placeholder="请输入内容"
                type="textarea"
                resize="none"
                :autosize="{ minRows: 3, maxRows: 4 }"
                :maxlength="textInputMaxLength2"
                :show-word-limit="showWordLimit"
                @dblclick.native="openSlideRight()"
                @input="(newValue)=>changemeasureStr(newValue,'measure')"
              ></el-input>
              <span class="input-count"
                >{{ measureStr.length }}/{{ textInputMaxLength2 }}</span
              >
            </div>
          </div>
          <div class="do-box">
            <div class="label">
              <span>【预期目标】</span>
            </div>
            <div class="input-group">
              <el-input
                :value="targetStr"
                placeholder="请输入内容"
                type="textarea"
                resize="none"
                :autosize="{ minRows: 3, maxRows: 4 }"
                :maxlength="textInputMaxLength2"
                :show-word-limit="showWordLimit"
                @dblclick.native="openSlideRight()"
                @input="(newValue)=>changemeasureStr(newValue,'target')"
              ></el-input>
              <span class="input-count"
                >{{ targetStr.length }}/{{ textInputMaxLength2 }}</span
              >
            </div>
          </div>
          <div class="do-box"  v-if="HOSPITAL_ID !== 'zhzxy'">
            <div class="label">
              <span>【问题因素】</span>
            </div>
            <div class="input-group">
              <el-input
                :value="factorStr"
                placeholder="请输入内容"
                type="textarea"
                resize="none"
                :autosize="{ minRows: 3, maxRows: 4 }"
                :maxlength="textInputMaxLength2"
                :show-word-limit="showWordLimit"
                @dblclick.native="openSlideRight()"
                @input="(newValue)=>changemeasureStr(newValue,'factor')"
              ></el-input>
              <span class="input-count"
                >{{ factorStr.length }}/{{ textInputMaxLength2 }}</span
              >
            </div>
          </div>
          <div class="do-box"  v-if="HOSPITAL_ID == 'fuyou' && diagnose">
            <div class="label">
              <span>【护理评估】</span>
            </div>
            <div class="input-group">
              <el-select
                v-model="evalForm"
                filterable
                placeholder="请选择"
                size="small"
                style="width: 250px"
                autocomplete="off"
                @change="changeEvalForm"
              >
                <el-option
                  v-for="item in evalFormList"
                  :key="item.formCode"
                  :label="item.formName"
                  :value="item.formCode"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box {
  .el-checkbox__label {
    font-size: 12px;
    color: #687179;
    white-space: normal;
  }

  textarea {
    font-size: 12px;
    color: #687179;
  }

  .label {
    margin-bottom: 15px;
  }

  .checkAll-con {
    float: right;
    margin-right: 10px;

    .el-checkbox__label {
      position: relative;
      top: 2px;
    }
  }
  .input-group {
    position relative
    .input-count {
      color: #909399;
      background: #FFF;
      position: absolute;
      font-size: 12px;
      bottom: 5px;
      right: 10px;
    }
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.slide-con {
  width: 850px;
  height: 90%;
  padding: 50px 20px 100px;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform :translate(-50%,-50%)
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  z-index: 1000000;
  // background: #F7FAFA;
  z-index: 2002;

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 14px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;

    &:hover {
      background: #EDF2F3;
    }
  }
}

.no-do-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2001;
}

.title {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  position: absolute;
  top: 20px;
  left: 20px;
}

.aside {
  font-size: 12px;
  color: #777;
}

.contain {
  overflow-y: auto;
  height: 100%;

  .do-box {
    background: #ffffff;
    box-sizing: border-box;
    padding: 15px 10px;
    // border: 1px solid #CBD5DD;
    // box-shadow: inset 0 1px 2px 0 rgba(129, 129, 129, 0.5);
    border-radius: 2px;
    // margin-top: 20px;
    margin-right :10px;
    .label {
      font-size: 13px;
      color: #687179;
    }

    .checkAll-con {
      margin:10px 0px 0px 10px;
      float:none;
      .shortCon{
        display:flex;
        >label{
          width: 80px;
          padding-top: 2px
        }
        .multi{
          .m-10{
            &:nth-of-type(1){
              margin-left:61.5px;
              margin-right:22px;
            }
            &:nth-of-type(8){
              margin-left:0px;
            }
          }
        }
      }
      .el-checkbox__label {
        position: relative;
        top: 2px;
      }
    }
    .conBottom{
      border:1px solid #cbd5dd;
      padding:0 10px 10px 0;
      min-height:100px;
      max-height:200px;
      overflow-y:auto;
      .m-10{
        display:block;
      }
    }
    .m-10 {
      display :inline;
      margin: 10px;
      font-size: 12px;
      color: #687179;
      letter-spacing: 0;
      line-height: 21px;
    }
  }
}
.save-btn {
  background: #4BB08D;
  border-radius: 2px;
  font-size: 13px;
  color: #FFFFFF;
  text-align: center;
  height: 35px;
  line-height: 35px;
  position: absolute;
  bottom: 35px;
  right: 30px;
  cursor: pointer;
  width:60px;

  &.disabled {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
  }
}
.cancel-btn{
  color: #333;
  background: #fff;
  border: 1px solid #cbd5dd;
  border-radius: 2px;
  font-size: 13px;
  text-align: center;
  height: 35px;
  line-height: 35px;
  position: absolute;
  bottom: 34px;
  right: 110px;
  cursor: pointer;
  width:60px;
}
.date-con {
  font-size: 14px;
  color: #333;
  margin: 10px 0 -10px;
}
</style>

<script>
import {
  measure,
  nursingDiagsSave,
  nursingDiagsView,
  nursingDiagsUpdate,
  getMatchVital,
} from "@/Page/patientInfo/supPage/diagnosis/api/index.js";
import moment from "moment";
import { model } from "@/Page/patientInfo/supPage/diagnosis/diagnosisViewModel";
import { mapState } from "vuex";
import md5 from "md5";
import BusFactory from 'vue-happy-bus'
let bindData = {
  data: {},
  show: false,
  measures: [],
  targetList: [],
  factorList: [],
  target: "",
  factor:"",
  status: "0", // 0-未保存 1-正在进行 2-已停止 3-已删除
  isTypeIndeterminate: false,
  isTracheaIndeterminate: false,
  isSecurityIndeterminate: false,
  isDietaryIndeterminate: false,
  checkTypeAll: false,
  checkTracheaAll: false,
  checkSecurityAll: false,
  checkDietaryAll: false,
  definition: "",
  beginTime:"",
  showWordLimit: true,
  textInputMaxLength: 100,
  textInputMaxLength2: ['whsl'].includes(process.env.HOSPITAL_ID)?600:1000,
  evalFormList: [],
  evalForm: '',
  diagnose: null
};
let bindDataClone = { ...bindData };
export default {
  inject: ["openSlideCon"],
  data() {
    return {
      ...bindData,
      bus: BusFactory(this)
    } ;
  },
  computed: {
    ...mapState({
      measureStr: state => (state.formGuizhou.measureGuizhou ? state.formGuizhou.measureGuizhou : ""),
      targetStr: state => (state.formGuizhou.targetGuizhou ? state.formGuizhou.targetGuizhou : ""),
      factorStr: state => (state.formGuizhou.factorStrGuizhou ? state.formGuizhou.factorStrGuizhou : ""),
      patientInfo: state => state.sheet.patientInfo
    })
  },
  methods: {
    async open(item, diagnose) {
      this.diagnose = diagnose;
      Object.assign(bindData, bindDataClone);
      this.beginTime = moment().format("YYYY-MM-DD HH:mm");
      this.show = true;
      this.data = item;
      measure(item.code).then(res => {
        this.measures = res.data.data.measures;
        this.targetList = res.data.data.targetList;
        this.factorList = res.data.data.factorList;
        this.definition = res.data.data.definition;
        if (item.id) {
          nursingDiagsView(item.id).then(res => {
            this.beginTime = res.data.data.object.beginTime;
            this.status = res.data.data.object.status;
            this.factorList = res.data.data.factorList;
            this.$store.commit("upMeasureGuizhou", {
              measure: res.data.data.object.diagMeasures,
              target: res.data.data.object.diagTarget,
              factor:res.data.data.object.diagFactor
            });
          });
        }
      });
      // 体征关联对应评估单
      if (diagnose) {
        try {
          const result = await getMatchVital({
            patientId: diagnose.patientId,
            visitId: diagnose.visitId,
            vitalName: diagnose.vitalSigns,
            vitalValue: diagnose.vitalValue,
            wardCode: diagnose.wardCode,
          })
          const { data } = result.data
          if (data && data.length) {
            data.map(item => {
              if (item.formUrl) {
                Object.keys(item.formUrl).map(key => {
                  this.evalFormList = [
                    ...this.evalFormList,
                    {
                      formCode: key,
                      formName: item.formUrl[key].replace('江门妇幼', '').replace('.html', ''),
                      formHtml: item.formUrl[key]
                    }
                  ]
                })
              }
            })
          }
        } catch (error) {
          throw new Error(error)
        }
      }
    },
    close() {
      //关闭弹框取消关联输入框内容
      this.$store.commit('cleanMeasureGuizhouAll')
      this.show = false;
      this.evalFormList = []
      this.evalForm = ''
      this.status = '0'
    },
    changeEvalForm(value) {
      const form = this.evalFormList.find(item => item.formCode === value);
      if (form) {
        this.onEvalFormOpen(form);
      }
    },
    // 打开评估单
    onEvalFormOpen(form) {
      const token = `App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${JSON.parse(localStorage.getItem("user")).token}`
      const query = {
        id: '',
        formType: 'eval',
        formCode: form.formCode,
        showToolBar: false,
        relationFormModal: true,
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        name: this.patientInfo.name,
        patientName: this.patientInfo.name,
        sex: this.patientInfo.sex,
        age: this.patientInfo.age,
        onlyView: false,
        deptCode: this.patientInfo.deptCode,
        deptName: this.patientInfo.deptName,
        diagnosis: this.patientInfo.diagnosis,
        bedLabel: this.patientInfo.bedLabel,
        inpNo: this.patientInfo.inpNo,
        wardCode: this.patientInfo.wardCode,
        admissionDate: this.patientInfo.admissionDate,
        token,
        todo: '',
        title: '',
        isPrint: false,
      }
      this.$root.bus.$emit('showRelationFormModal', {
        query,
        formCode: form.formCode,
        formUrl: form.formHtml,
        showSignBtn: true,
        title: `江门妇幼${form.formName}`,
        noFetch: undefined,
        noFetchInfo: undefined,
      });
    },
    saveZhzxy(){
      let passWord = localStorage.getItem("ppp");
      let empNo =JSON.parse(localStorage.user).empNo
      let obj = {
        creator: md5(passWord),
        empNo,
        patientId: this.$route.query.patientId,
        visitId: this.$route.query.visitId,
        patientName: this.$route.query.name,
        bedLabel: this.$route.query.bedLabel,
        code: this.data.code,
        name: this.data.name,
        measureStr: this.measureStr,
        targetStr: this.targetStr,
        factorStr: this.factorStr||'',
        wardCode: !this.$route.path.includes('newSingleTemperatureChart') ? model.selectedBlock.wardCode : this.$store.state.sheet.patientInfo.wardCode,
        beginTime: moment(this.beginTime).format("YYYY-MM-DD HH:mm")
      };
      if (this.status === "1") {
        obj.id = this.data.id;
      }
      let promise =
          this.status === "0"
              ? nursingDiagsSave(obj)
              : this.status === "1"
                  ? nursingDiagsUpdate(obj)
                  : null;
      promise &&
      promise.then(res => {
        this.$message.success(!this.$route.path.includes('newSingleTemperatureChart')?"保存成功":"关联成功")
        model.newDiagnosisModal.close();
        this.close();
        model.refreshTable();
        this.$store.commit("upMeasureGuizhou", {
          measure:"",
          target:""
        });
      });
    },
    save() {
      if(process.env.HOSPITAL_ID === 'zhzxy'){
         return   this.saveZhzxy()
      }
      let strSignData = JSON.stringify({
          measureStr: this.measureStr,
          targetStr: this.targetStr,
          factorStr: this.factorStr||''
        })
        let SigndataObj = {
          Patient_ID:this.$route.query.patientId,
          Visit_ID:this.$route.query.visitId,
          Document_Title:"",
          Document_ID:!this.$route.path.includes('newSingleTemperatureChart') ? model.selectedBlock.wardCode : this.$store.state.sheet.patientInfo.wardCode,
          Section_ID:!this.$route.path.includes('newSingleTemperatureChart') ? model.selectedBlock.wardCode : this.$store.state.sheet.patientInfo.wardCode,
          strSignData: strSignData,
        };

        let verifySignObj = {
          patientId:this.$route.query.patientId,
          visitId:this.$route.query.visitId,
          formName:"",
          formCode:!this.$route.path.includes('newSingleTemperatureChart') ? model.selectedBlock.wardCode : this.$store.state.sheet.patientInfo.wardCode,
          instanceId:!this.$route.path.includes('newSingleTemperatureChart') ? model.selectedBlock.wardCode : this.$store.state.sheet.patientInfo.wardCode,
          recordId:"",
          signData:strSignData,
        }
        window.openSignModal((password, empNo) => {
        let obj = {
          creator: password,
          empNo,
          patientId: this.$route.query.patientId,
          visitId: this.$route.query.visitId,
          patientName: this.$route.query.name,
          bedLabel: this.$route.query.bedLabel,
          code: this.data.code,
          name: this.data.name,
          measureStr: this.measureStr,
          targetStr: this.targetStr,
          factorStr: this.factorStr||'',
          wardCode: !this.$route.path.includes('newSingleTemperatureChart') ? model.selectedBlock.wardCode : this.$store.state.sheet.patientInfo.wardCode,
          beginTime: moment(this.beginTime).format("YYYY-MM-DD HH:mm")
        };
        if (this.status === "1") {
          obj.id = this.data.id;
        }
        if(process.env.HOSPITAL_ID  == 'foshanrenyi'){
          obj.nursingClass=this.data.nursingClass?this.data.nursingClass : '';
          obj.catheterNursing=this.data.catheterNursing?this.data.catheterNursing : '';
          obj.positionNursing=this.data.positionNursing?this.data.positionNursing : '';
          obj.skinNursing=this.data.skinNursing?this.data.skinNursing : '';
          obj.tracheaNursingCodes=this.data.tracheaNursingCodes?this.data.tracheaNursingCodes : [];
          obj.securityNursingCodes=this.data.securityNursingCodes?this.data.securityNursingCodes : [];
          obj.dietaryGuidanceTypes=this.data.dietaryGuidanceTypes?this.data.dietaryGuidanceTypes : [];
        }
        let promise =
          this.status === "0"
            ? nursingDiagsSave(obj)
            : this.status === "1"
            ? nursingDiagsUpdate(obj)
            : null;
        promise &&
          promise.then(res => {
             this.$message.success(!this.$route.path.includes('newSingleTemperatureChart')?"保存成功":"关联成功")
            model.newDiagnosisModal.close();
            this.close();
            model.refreshTable();
            this.$store.commit("upMeasureGuizhou", {
                measure:"",
                target:""
      });
          });
      },undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,SigndataObj,verifySignObj);
    },
    openSlideRight() {
      this.openSlideCon({
        id: this.data.id,
        code: this.data.code,
        name: this.data.name,
        definition: this.data.definition
      });
    },
    changeStr() {
      this.$store.commit("upMeasureGuizhou", {
        measure: this.measureStr,
        target: this.targetStr,
        factor: this.factorStr
      });
    },
    changemeasureStr(e,type){
        if(type=="target"){
            this.$store.commit("upMeasureGuizhou", {
                measure: this.measureStr,
                target:e,
                factor: this.factorStr,
            });
        }else if(type == 'factor'){
           this.$store.commit("upMeasureGuizhou", {
                measure: this.measureStr,
                target: this.targetStr,
                factor: e,
            });
        }else{
            this.$store.commit("upMeasureGuizhou", {
                measure: e,
                target:this.targetStr,
                factor:this.factorStr
            });
        }
    }
  },
  components: {}
};
</script>
