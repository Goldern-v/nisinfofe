<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="700" title="标题" @close="onClose">
      <div>
        <template v-if="!['lyxrm', 'stmz'].includes(HOSPITAL_ID)">
          <div class="title" style="margin-bottom: 5px">本次评估内容同步至：</div>
          <el-checkbox v-if="!['foshanrenyi'].includes(HOSPITAL_ID)" label="护理记录单" v-model="tongbuzhi"></el-checkbox>
          <el-checkbox label="三测单" v-model="tongbuzhi"></el-checkbox>
          <el-checkbox label="ISBAR交班志" disabled v-model="tongbuzhi"></el-checkbox>
          <div style="height: 20px"></div>
        </template>
        <div class="part-2">
          <div class="title">根据本次评估内容分析，患者可能有以下{{diagnosisList.length}}个护理问题，请您确认：</div>
          <el-checkbox
            v-for="(item, index) in diagnosisList"
            :label="item.code"
            :key="index"
            @change="onClickBox(item)"
            v-model="item.checked"
          >{{item.name}}</el-checkbox>
        </div>
      </div>

      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='scss' scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}
.el-checkbox,
.is-bordered,
.el-checkbox--small,
.el-input,
.el-input--small,
.el-input-group,
.el-input-group--prepend {
  margin: 5px 0px;
}

.part-2 {
  .el-checkbox,
  .el-checkbox__input {
    white-space: inherit !important;
    display: flex;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
<script>
import {
  syncToRecord,
  syncVitalSign,
  nursingDiagsSaveList
} from "../../../api/index";
import bus from "vue-happy-bus";
export default {
  props: {
    formObj: Object,
  },
  data() {
    return {
      diagnosisList: [],
      selectedList: [],
      selectedListClone: [],
      tongbuzhi: [],
      isEditor:false,
      bus: bus(this),
    };
  },
  methods: {
    open(list,isEdit=false) {
      if(isEdit){
        this.isEdit=true
      }
      this.diagnosisList = list.map(item => {
        return Object.assign(item, {
          checked: false,
          _checked: false,
          obj: null
        });
      });
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    onClose() {
      this.$root.$refs.diagnosisSlide.close();
    },
    post() {
      let SigndataObj = {
        Patient_ID:this.patientInfo.patientId,
        Visit_ID:this.patientInfo.visitId,
        Document_Title:"",
        Document_ID: this.formCode,
        Section_ID:"",
        strSignData:JSON.stringify(this.formObj.model),
      };

       let verifySignObj = {
        patientId:this.patientInfo.patientId,
        visitId:this.patientInfo.visitId,
        formName:"",
        formCode: this.formCode,
        instanceId:"",
        recordId:"",
        signData:JSON.stringify(this.formObj.model),
      }
      window.openSignModal((password, empNo) => {
        let promistList = [];
        let objList = this.diagnosisList
          .filter(item => item._checked)
          .map(item => item.obj);
        if (objList.length > 0) {
          let obj = {
            creator: password,
            empNo,
            diagList: objList
          };
          promistList.push(nursingDiagsSaveList(obj));
        }
        this.tongbuzhi.forEach(item => {
          if (item == "护理记录单")
            promistList.push(syncToRecord(this.formObj.model.id));
          if (item == "三测单")
            promistList.push(syncVitalSign(this.formObj.model.id));
        });
        Promise.all(promistList).then(res => {
          this.$message.success("保存成功");
          if(this.isEdit){
            this.bus.$emit("closeDiagnosisSlide");
          }else{
            this.$root.$refs.diagnosisSlide.close();
          }
          this.close();
        });
      },"",undefined,undefined,undefined,undefined,undefined,undefined,undefined,SigndataObj,verifySignObj);
    },
    onClickBox(item) {
      item.checked = item._checked;
      if (item._checked) {
        this.$message.warning("你已经添加该诊断，请不要重复添加");
      } else {
        // 判断是否编辑器打开
        if(this.isEdit){
          this.bus.$emit("openDiagnosisSlide",item);
        }else{
          this.$root.$refs.diagnosisSlide.open(item);
        }
      }
    }
  },
  components: {},
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    }
  },
};
</script>
