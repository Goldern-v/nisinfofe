<template>
  <div class="diagnosis-table">
    <div class="edit-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :height="wih - 290"
        @row-click="selectedRow"
        :row-class-name="tableRowClassName"
        @cell-click="onCellClick"
      >
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            {{ scope.row.index }}
          </template>
        </el-table-column>

        <el-table-column
          prop="diagName"
          label="护理问题"
          min-width="100px"
          header-align="center"
        ></el-table-column>

        <el-table-column label="'护理措施计划'" min-width="150px" header-align="center">
          <template slot-scope="scope">
            <div>
              <div
                v-for="(item, index) in scope.row.measuresName"
                :key="index"
                v-show="scope.row.measuresName.length"
              >
                <p>{{item && item.measureDetail}}</p>
                <br v-if="index != scope.row.measuresName.length - 1" />
              </div>
              <div
                v-if="!scope.row.measuresName.length"
                v-html="scope.row.diagMeasures && (scope.row.diagMeasures.replace(/；/g,'；<br><br>'))"
              ></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="护理目标" min-width="150px" header-align="center">
          <template slot-scope="scope">
            <div>
              <span
                v-for="(item, index) in scope.row.targetsName"
                :key="index"
                v-show="scope.row.targetsName.length"
              >
                {{ item && item.parameter }}
              </span>
              <span
                v-if="!scope.row.targetsName.length"
                v-html="scope.row.diagTarget && (scope.row.diagTarget.replace(/\n/g,'<br><br>'))"
              ></span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="beginTime"
          label="开始时间"
          width="90"
          align="center"
        ></el-table-column>

        <el-table-column
          label="签名"
          width="80"
          align="center"
          prop="signerName"
        ></el-table-column>

        <el-table-column
          prop="endTime"
          label="停止时间"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.endTime }}
            <el-date-picker
              v-if="scope.row.endTime"
              v-model="endTime"
              :default-value="scope.row.endTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm"
              :clearable="false"
              @focus="() => choseId(scope.row)"
              @change="val => timeChange(val, scope.row, 'endTime')">
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column
          prop="evalType"
          label="护理评价"
          min-width="80px"
          header-align="center"
          align="center"
        ></el-table-column>

        <!-- <el-table-column
          prop="evalContent"
          label="评价说明"
          min-width="100px"
          header-align="center"
        ></el-table-column> -->
        <el-table-column
          label="评价签名"
          width="80"
          align="center"
          prop="evalContentSign"
        ></el-table-column>

        <el-table-column label="操作" width="95" header-align="center">
          <template slot-scope="scope">
            <div class="tool-con">
              <div
                v-if="scope.row.status == 1"
                class="tool-btn"
                style="color: blue"
                @click="stop(scope.row)"
              >停止</div>
              <div
                v-if="scope.row.status == 1"
                class="tool-btn"
                style="color: red"
                @click="del(scope.row)"
              >删除</div>
              <div class="tool-btn" @click="edit(scope.row)">查看详情</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="print-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @row-click="selectedRow"
        :row-class-name="tableRowClassName"
      >
        <el-table-column label="序号" width="40" align="center">
          <template slot-scope="scope">
            {{ scope.row.index }}
          </template>
        </el-table-column>

        <el-table-column
          prop="diagName"
          label="护理问题"
          min-width="100px"
          header-align="center"
        ></el-table-column>

        <el-table-column label="护理措施计划" min-width="300px" header-align="center">
          <template slot-scope="scope">
            <div>
              <div
                v-for="(item, index) in scope.row.measuresName"
                :key="index"
                v-show="scope.row.measuresName.length"
              >
                <p>{{item && item.measureDetail}}</p>
                <br v-if="index != scope.row.measuresName.length - 1" />
              </div>
              <div
                v-if="!scope.row.measuresName.length"
                v-html="scope.row.diagMeasures && scope.row.diagMeasures.replace(/\n/g,'<br><br>')"
              ></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="护理目标" min-width="150px" header-align="center">
          <template slot-scope="scope">
            <div>
              <span
                v-for="(item, index) in scope.row.targetsName"
                :key="index"
                v-show="scope.row.targetsName.length"
              >
                {{ item && item.parameter }}
              </span>
              <span
                v-if="!scope.row.targetsName.length"
                v-html="scope.row.diagTarget && scope.row.diagTarget.replace(/\n/g,'<br><br>')"
              ></span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="beginTime"
          label="开始时间"
          width="90"
          align="center"
        ></el-table-column>

        <el-table-column
          label="签名"
          width="80"
          align="center"
          prop="signerName"
        ></el-table-column>

        <el-table-column
          prop="endTime"
          label="停止时间"
          width="90"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="evalType"
          label="护理评价"
          min-width="40px"
          header-align="center"
          align="center"
        ></el-table-column>

        <!-- <el-table-column
          prop="evalContent"
          label="评价说明"
          min-width="100px"
          header-align="center"
        ></el-table-column> -->
        <el-table-column
          label="评价签名"
          width="80"
          align="center"
          prop="evalContentSign"
        ></el-table-column>
      </el-table>
    </div>
    <stopDiagnosisModal ref="stopDiagnosisModal"></stopDiagnosisModal>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import { model } from "../../diagnosisViewModel";
import { nursingDiagsDel, doDiagsSign, nursingDiagsUpdate } from "../../api/index";
import stopDiagnosisModal from "../../modal/stopDiagnosisModal";
export default {
  mixins: [common],
  props: ["tableData"],
  inject: ["openSlideCon",'openSlideContant'],
  data() {
    return {
      model,
      endTime: '',
      choseID: '',
      choseName: '',
      choseCode: '',
      choseDiagFactor: '',
      measureStr2: '',
      factorStr2: '',
      data:''
    };
  },
  methods: {
    onCellClick(row, column, cell, event) {
      if (['signerName', 'evalContentSign'].includes(column.property)) {
        const type = column.property == 'signerName' ? '1' : '2';
        let text = row[column.property] ? '取消签名' : '签名';
        this.onSign({ id: row.id, type }, text);
      }
    },
    onSign(data = {}, text) {
      window.openSignModal((password, empNo) => {
        const params = { ...data, empNo, password }
        doDiagsSign(params).then(() => {
          this.$message.success(`${text}成功`);
          model.refreshTable();
        }).catch((error) => {
          this.$message.error(`${text}失败`)
        })
      }, text);
    },
    choseId(row) {
      this.choseID = row.id
      this.choseName = row.diagName
      this.choseCode = row.diagCode
      this.choseDiagFactor = row.diagFactor
      this.measureStr2 = (row.measuresName.length > 0 && row.measuresName.join(" ")) || row.diagMeasures
      this.factorStr2 = (row.targetsName.length > 0 && row.targetsName.join(" ")) || row.diagTarget
    },
    timeChange(val, row, type) {
      window.openSignModal((password, empNo) => {
        const params = {
          creator: password,
          empNo,
          id:this.choseID,
          patientId: this.$route.query.patientId,
          visitId: this.$route.query.visitId,
          patientName: this.$route.query.name,
          bedLabel: this.$route.query.bedLabel,
          code: this.choseCode,
          name: this.choseName,
          measureStr: this.measureStr2,
          targetStr: this.factorStr2,
          factorStr: this.choseDiagFactor,
          wardCode: model.selectedBlock.wardCode,
        };
        params.endTime = val
        nursingDiagsUpdate(params).then(res => {
          this.$message.success("保存成功");
          model.newDiagnosisModal.close();
          model.refreshTable();
          this.$store.commit("upMeasureGuizhou", {
            measure: "",
            target: ""
          });
        });
      })
    },
    selectedRow(row) {
      // model.selectedRow = row;
    },
    tableRowClassName(row) {
      // if (row.id == (this.model.selectedRow && this.model.selectedRow.id)) {
      //   return "selected-row";
      // }
    },
    edit(row) {
      // if (!this.verify()) return;
      model.selectedRow = row;
      this.openSlideCon({
        id: model.selectedRow.id,
        code: model.selectedRow.diagCode,
        name: model.selectedRow.diagName,
        definition: model.selectedRow.definition
      });
      this.openSlideContant({
        id: model.selectedRow.id,
        code: model.selectedRow.diagCode,
        name: model.selectedRow.diagName,
        definition: model.selectedRow.definition
      })
    },
    del(row) {
      // if (!this.verify()) return;
      model.selectedRow = row;
      let strSignData = ""
      if(model.selectedRow.measuresName.length>0) model.selectedRow.measuresName.forEach(item=>{
          strSignData += item.measureDetail+'/n'
        })
      else strSignData = model.selectedRow.diagMeasures
      this.data = model.selectedRow;
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
      this.data.patientName = this.$route.query.name;
      this.data.sex = this.$route.query.sex;
      this.data.age = this.$route.query.age;
      window.openSignModal((password, empNo) => {
        nursingDiagsDel(password, empNo, model.selectedRow.id).then(res => {
          this.$message.success("删除成功");
          model.refreshTable();
          model.selectedRow = null;
        });
      }, "你确定要删除诊断？",undefined,undefined,undefined,['zhzxy'].includes(process.env.HOSPITAL_ID)  ?  this.data : undefined,undefined,undefined,undefined,SigndataObj,verifySignObj,'planForm');
    },
    stop(row) {
      // if (!this.verify()) return;
      model.selectedRow = row;
      this.$refs.stopDiagnosisModal.open();
    }
  },
  created() {},
  components: {
    stopDiagnosisModal
  }
};
</script>

<style lang="scss" scoped>
.diagnosis-table {
  position: relative;
  overflow: hidden;
  /deep/ .el-table th {
    height: 30px;
    .cell {
      font-size: 12px;
      font-weight: 400;
      color: #000;
      background: #f4f2f4;
    }
  }
  /deep/ .el-table {
    border: 1px solid #000 !important;
    .el-date-editor--datetime{
      .el-input__icon{
        display: none;
      }
      .el-input__inner{
        width: 100%;
        padding-right: 0 !important;
      }
    }
    .el-date-editor.el-input{
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50% );
      opacity: 0;
    }
    th {
      border-left: 1px solid #000 !important;
      border-right: 1px solid #000 !important;
      border-bottom: 1px solid #000 !important;
    }
    td {
      border: 1px solid #000 !important;
    }
    .cell {
      padding: 0 5px;
    }
    .selected-row td {
      background: #fff8b1 !important;
    }
    .el-table__body-wrapper {
      margin-top: -1px;
    }
  }
  .print-table {
    /* visibility: hidden; */
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: 1500px;
  }
}

.tool-con {
  padding: 5px;
}
.tool-btn {
  text-align: center;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
}
</style>
