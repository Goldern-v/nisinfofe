<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="700" title="住院评估内容确认" @close="onClose">
      <div>
        <div class="title" style="margin-bottom: 5px">本次评估内容同步至：</div>
        <el-checkbox label="护理记录单" v-model="tongbuzhi"></el-checkbox>
        <span class="preview-aside" @click="onPreview">预览护记</span>
        <el-checkbox v-if="HOSPITAL_NAME !== '聊城市第二人民医院'" label="三测单" v-model="tongbuzhi"></el-checkbox>
        <el-checkbox label="ISBAR交班志"  v-model="tongbuzhi"></el-checkbox>

        <!-- <el-checkbox label="签名此住院评估单" v-model="signEval" style="margin-left: 50px;"></el-checkbox> -->
        <div style="height: 20px"></div>
        <div class="part-2">
          <div class="title">根据本次评估内容分析，患者可能有以下{{diagnosisList.length}}个护理问题，请您确认：</div>
          <el-checkbox
            v-for="(item, index) in diagnosisList"
            :label="item.code"
            :key="index"
            @change="onClickBox(item)"
            v-model="item.checked"
          >{{item.matchDiagNames||item.name}}</el-checkbox>
        </div>
      </div>

      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
    <previewSheetModal ref="previewSheetModal"></previewSheetModal>
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
.preview-aside {
  text-decoration: underline;
  cursor: pointer;
  color: blue;
  margin-right: 10px;
}
</style>
<script>
import {
  syncToRecord,
  syncVitalSign,
  nursingDiagsSaveList
} from "../../../api/index";
import { save } from "@/Page/sheet-hospital-eval/api/index.js";
import previewSheetModal from "./previewSheetModal";
export default {
  props: {
    formObj: Object
  },
  data() {
    return {
      diagnosisList: [],
      selectedList: [],
      selectedListClone: [],
      tongbuzhi: [],
      formCode: "E0100",
      signEval: true
    };
  },
  methods: {
    open(list) {
      this.tongbuzhi = [];
      this.diagnosisList = list.map(item => {
        return Object.assign(item, {
          checked: false,
          _checked: false,
          obj: null
        });
      });
      this.signEval = false;
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
        strSignData:this.formObj.model.measureStr,
      };

       let verifySignObj = {
        patientId:this.patientInfo.patientId,
        visitId:this.patientInfo.visitId,
        formName:"",
        formCode: this.formCode,
        instanceId:"",
        recordId:"",
        signData:this.formObj.model.measureStr,
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
          promistList.push(() => nursingDiagsSaveList(obj));
        }
        if (this.signEval) {
          promistList.push(() => this.sign(password, empNo));
        }

        this.tongbuzhi.forEach(item => {
          if (item == "护理记录单")
            promistList.push(() => syncToRecord(this.formObj.model.id));
          if (item == "三测单")
            promistList.push(() => syncVitalSign(this.formObj.model.id));
        });
        (async () => {
          for (let i = 0; i < promistList.length; i++) {
            await promistList[i]();
          }
          this.$message.success("保存成功");
          this.$root.$refs.diagnosisSlide.close();
          this.close();
        })();
        // Promise.all(promistList).then(res => {
        //   this.$message.success("保存成功");
        //   this.$root.$refs.diagnosisSlide.close();
        //   this.close();
        // });
      },"",undefined,undefined,undefined,undefined,undefined,undefined,undefined,SigndataObj,verifySignObj);
    },
    sign(password, empNo) {
      let post = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        formType: "eval",
        formCode: this.formCode,
        sign: true,
        empNo,
        password
      };
      this.formObj.model.formCode = this.formCode;

      post = Object.assign({}, this.formObj.model, post);
      //
      let postData = new Object();
      for (const key in post) {
        if (post.hasOwnProperty(key)) {
          if (!key) {
            continue;
          }
          if (post[key] === null || post[key] === "null") {
            postData[key] = "";
            continue;
          }
          postData[key] = post[key] + "";
        }
      }
      console.log("签名post", post, postData);
      //
      return save(postData).then(res => {
        this.$root.$refs.sheetHospitalEvalTool.selectBlock.status = "1";
        this.$root.$refs.sheetHospitalEvalTool.changeSelectBlock(
          this.$root.$refs.sheetHospitalEvalTool.selectBlock
        );
      });
    },
    onClickBox(item) {
      console.log(item, "itemitem");
      item.checked = item._checked;
      // if (item._checked) {
      //   this.$message.warning("你已经添加该诊断，请不要重复添加");
      // } else {
      this.$root.$refs.diagnosisSlide.open(item, item.obj);
      // }
    },
    onPreview() {
      this.$refs.previewSheetModal.open(this.formObj.model.id, () => {
        if (!this.tongbuzhi.includes("护理记录单")) {
          this.tongbuzhi.push("护理记录单");
        }
      });
    }
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    }
  },
  components: {
    previewSheetModal
  }
};
</script>
