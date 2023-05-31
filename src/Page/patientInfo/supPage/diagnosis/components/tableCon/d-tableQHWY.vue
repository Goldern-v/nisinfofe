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
      >
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            {{
            scope.row.index
            }}
          </template>
        </el-table-column>

        <el-table-column prop="diagName" label="护理问题" min-width="100px" header-align="center"></el-table-column>
        <el-table-column prop="diagFactor" label="问题因素" min-width="100px" header-align="center"></el-table-column>
        <!-- <el-table-column prop="diagMeasures" label="护理措施计划" min-width="150px" header-align="center" >
        </el-table-column> -->
        <el-table-column label="护理目标" min-width="150px" header-align="center">
          <template slot-scope="scope">
            <div>
              <span v-for="(item, index) in scope.row.targetsName" :key="index" v-show="scope.row.targetsName.length">
                {{
                item && item.parameter
                }}
              </span>
              <span v-if="!scope.row.targetsName.length" v-html="scope.row.diagTarget&&(scope.row.diagTarget.replace(/\n/g,'<br><br>')) "></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="HOSPITAL_ID=='liaocheng'?'护理措施':'护理措施计划'" min-width="150px" header-align="center">
          <template slot-scope="scope">
            <div>
              <div v-for="(item, index) in scope.row.measuresName" :key="index"  v-show="scope.row.measuresName.length">
                <p>{{item && item.measureDetail}}</p>
                <br v-if="index != scope.row.measuresName.length - 1" />
              </div>
              <div v-if="!scope.row.measuresName.length" v-html="scope.row.diagMeasures&&( scope.row.diagMeasures.replace(/；/g,'；<br><br>')) "></div>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="diagTarget" label="护理目标" min-width="150px" header-align="center" >
        </el-table-column> -->

        <el-table-column prop="beginTime" label="开始时间" width="90" align="center"></el-table-column>
        <el-table-column v-if="HOSPITAL_ID=='fuyou'"  prop="creatorName" label="评估人" width="90" align="center"></el-table-column>
        <el-table-column prop="endTime" label="停止时间" width="90" align="center"></el-table-column>
        <el-table-column v-if="HOSPITAL_ID=='fuyou'"  prop="operatorName" label="停止人" width="90" align="center"></el-table-column>
        <el-table-column
          prop="evalType"
          label="护理评价"
          min-width="80px"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column prop="evalContent" label="评价说明" min-width="100px" header-align="center"></el-table-column>

        <el-table-column label="操作" width="95" header-align="center">
          <template slot-scope="scope">
            <div class="tool-con">
              <div
                v-if="scope.row.status == 1"
                class="tool-btn"
                style="color: blue"
                @click="stop(scope.row)"
              >停止</div>
<!--                v-if="scope.row.status == 1"  去掉状态判断-->
              <div
                class="tool-btn"
                style="color: red"
                @click="del(scope.row)"
              >删除</div>
              <div class="tool-btn" @click="edit(scope.row)">查看详情</div>
              <div v-if="['huadu'].includes(HOSPITAL_ID)" :style="{textAlign:'center'}">{{scope.row.operatorName}}</div>
            </div>
          </template>
        </el-table-column>
        <!--
      <el-table-column
        prop="creatorName"
        label="护士"
        width="100"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="operatorName"
        label="结束护士签名"
        width="120"
        align="center"
        ></el-table-column>-->
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
            {{
            scope.row.index
            }}
          </template>
        </el-table-column>

        <el-table-column prop="diagName" label="护理问题" min-width="100px" header-align="center"></el-table-column>
        <el-table-column label="护理措施计划" min-width="300px" header-align="center">
          <template slot-scope="scope">
            <!-- <div v-for="(item, index) in scope.row.measuresName" :key="index">
              <p>{{item && item.measureDetail}}</p>
              <br v-if="index != scope.row.measuresName.length - 1" />
            </div> -->

            <div>
              <div v-for="(item, index) in scope.row.measuresName" :key="index"  v-show="scope.row.measuresName.length">
                <p>{{item && item.measureDetail}}</p>
                <br v-if="index != scope.row.measuresName.length - 1" />
              </div>
              <div v-if="!scope.row.measuresName.length" v-html="scope.row.diagMeasures&&scope.row.diagMeasures.replace(/\n/g,'<br><br>')"></div>
            </div>

          </template>

        </el-table-column>
        <el-table-column label="护理目标" min-width="150px" header-align="center">
          <template slot-scope="scope">
            <!-- <span v-for="(item, index) in scope.row.targetsName" :key="index">
              {{
              item && item.parameter
              }}
            </span> -->
            <div>
              <span v-for="(item, index) in scope.row.targetsName" :key="index" v-show="scope.row.targetsName.length">
                {{
                item && item.parameter
                }}
              </span>
              <span v-if="!scope.row.targetsName.length" v-html="scope.row.diagTarget&&scope.row.diagTarget.replace(/\n/g,'<br><br>')">{{scope.row.diagTarget}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间" width="90" align="center"></el-table-column>
        <el-table-column v-if="HOSPITAL_ID=='fuyou'"  prop="creatorName" label="评估人" width="90" align="center"></el-table-column>
        <el-table-column prop="endTime" label="停止时间" width="90" align="center"></el-table-column>
        <el-table-column v-if="HOSPITAL_ID=='fuyou'"  prop="operatorName" label="停止人" width="90" align="center"></el-table-column>
        <el-table-column
          prop="evalType"
          label="护理评价"
          min-width="40px"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column prop="evalContent" label="评价说明" min-width="100px" header-align="center"></el-table-column>
      </el-table>
    </div>
    <stopDiagnosisModal ref="stopDiagnosisModal"></stopDiagnosisModal>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import { nursingDiagsPatient } from "../../api/index";
import { model } from "../../diagnosisViewModel";
import { nursingDiagsDel, savePlanForm } from "../../api/index";
import stopDiagnosisModal from "../../modal/stopDiagnosisModal";
export default {
  mixins: [common],
  props: ["tableData"],
  inject: ["openSlideCon",'openSlideContant'],
  data() {
    return {
      model
    };
  },
  methods: {
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
      window.openSignModal((password, empNo) => {
        nursingDiagsDel(password, empNo, model.selectedRow.id).then(res => {
          this.$message.success("删除成功");
          model.refreshTable();
          model.selectedRow = null;
        });
      }, "你确定要删除诊断？");
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
  /* /deep/ *::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: #eaeaea;
  }
  /deep/ *::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
    background-color: #eaeaea;
  }
  /deep/ *::-webkit-scrollbar-thumb {
    border-radius: 50px; // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #c2c2c2;
  } */
  /deep/ .el-table {
    border: 1px solid #000 !important;
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
