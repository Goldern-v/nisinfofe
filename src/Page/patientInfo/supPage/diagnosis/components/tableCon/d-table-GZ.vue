<template>
  <div class="diagnosis-table">
    <div class="edit-table">
      <el-table
        v-loading="diagnosisLoading"
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

        <el-table-column prop="diagName" label="护理问题" width="205" header-align="center"></el-table-column>
        <el-table-column prop="diagFactor" label="问题因素" width="180" header-align="center"></el-table-column>
        <!-- <el-table-column prop="diagMeasures" label="护理措施计划" min-width="150px" header-align="center" >
        </el-table-column> -->
        <el-table-column label="护理措施计划" width="305" header-align="center">
          <template slot-scope="scope">
            <div>
              <div v-for="(item, index) in scope.row.measuresName" :key="index"  v-show="scope.row.measuresName.length">
                <p>{{item && item.measureDetail}}</p>
                <br v-if="index != scope.row.measuresName.length - 1" />
              </div>
              <div v-if="!scope.row.measuresName.length" v-html="scope.row.diagMeasures&&scope.row.diagMeasures.replace(/\n/g,'<br><br>')"></div>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="diagTarget" label="护理目标" min-width="150px" header-align="center" >
        </el-table-column> -->
        <el-table-column label="护理目标" width="95" header-align="center">
          <template slot-scope="scope">
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
        <el-table-column prop="beginTime" label="开始时间" width="95" align="center">
          <template slot-scope="scope">
            {{scope.row.beginTime}}
            <el-date-picker
              v-model="beginTime"
              v-if="['guizhou','925'].includes(HOSPITAL_ID) && scope.row.beginTime"
              :default-value="scope.row.beginTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm"
              :clearable="false"
              @focus="()=>{choseId(scope.row)}"
              @change="val => {timeChange(val, scope.row,'beginTime');}">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="护士签名" width="90" header-align="center" align="center">
          <template slot-scope="scope">
            <!-- <div v-if="!scope.row.creatorName" class="tool-btn" @click="onSignOrCancel(scope.row)">
              点击签名
            </div> -->
            <div @click="onSignOrCancel(scope.row)">{{scope.row.creatorName}}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="evalType"
          label="护理评价"
          width="165"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column prop="evalContent" label="评价说明" width="325" header-align="center"></el-table-column>
        <el-table-column prop="endTime" label="停止时间" width="95" align="center">
          <template slot-scope="scope">
            {{scope.row.endTime}}
            <el-date-picker
              v-model="endTime"
              v-if="['guizhou','915'].includes(HOSPITAL_ID) && scope.row.endTime"
              :default-value="scope.row.endTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm"
              :clearable="false"
              @focus="()=>{choseId(scope.row)}"
              @change="val => {timeChange(val, scope.row,'endTime');}">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="护士签名" width="90" header-align="center" align="center">
          <template slot-scope="scope">
            <!-- <div v-if="!scope.row.signerName" class="tool-btn" @click="onSignOrCancel(scope.row)">
              点击签名
            </div> -->
            <div @click="onSignOrCancel(scope.row)">{{scope.row.operatorName}}</div>
          </template>
        </el-table-column>
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
                v-if="scope.row.status == 1 || ['guizhou','925'].includes(HOSPITAL_ID)"
                class="tool-btn"
                style="color: red"
                @click="del(scope.row)"
              >删除</div>
              <div class="tool-btn" @click="edit(scope.row)">查看详情</div>
              <div v-if="['huadu'].includes(HOSPITAL_ID)" :style="{textAlign:'center'}">{{scope.row.operatorName}}</div>
            </div>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="signTime" label="签名时间" width="95" align="center"></el-table-column> -->
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
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            {{
            scope.row.index
            }}
          </template>
        </el-table-column>

        <el-table-column prop="diagName" label="护理问题" width="205" header-align="center"></el-table-column>
        <!-- <el-table-column label="护理措施计划" width="305" header-align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.measuresName" :key="index"  v-show="scope.row.measuresName.length">
              <p>{{item && item.measureDetail}}</p>
              <br v-if="index != scope.row.measuresName.length - 1" />
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="护理措施计划" width="305" header-align="center">
          <template slot-scope="scope">
            <div>
              <div v-for="(item, index) in scope.row.measuresName" :key="index"  v-show="scope.row.measuresName.length">
                <p>{{item && item.measureDetail}}</p>
                <br v-if="index != scope.row.measuresName.length - 1" />
              </div>
              <div v-if="!scope.row.measuresName.length" v-html="scope.row.diagMeasures&&scope.row.diagMeasures.replace(/\n/g,'<br><br>')"></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="护理目标" width="95" header-align="center">
          <template slot-scope="scope">
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
        <el-table-column prop="beginTime" label="开始时间" width="95" align="center"></el-table-column>
        <el-table-column prop="endTime" label="停止时间" width="95" align="center"></el-table-column>
        <el-table-column
          prop="evalType"
          label="护理评价"
          width="165"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column prop="evalContent" label="评价说明" width="300" header-align="center"></el-table-column>
        <el-table-column label="护士签名" width="84" header-align="center">
          <template slot-scope="scope">
            <!-- <img class="signer-img" v-if="scope.row.signerNo" :src="`/crNursing/api/file/signImage/${scope.row.signerNo}?${token}`" alt=""> -->
            <div>{{scope.row.operatorName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="签名时间" width="95" header-align="center" align="center"></el-table-column>
      </el-table>
    </div>
    <stopDiagnosisModal ref="stopDiagnosisModal"></stopDiagnosisModal>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import { nursingDiagsPatient,planListGuiZhou } from "../../api/index";
import { model } from "../../diagnosisViewModel";
import { nursingDiagsDel, savePlanForm } from "../../api/index";
import stopDiagnosisModal from "../../modal/stopDiagnosisModal";
import Cookies from "js-cookie";
import { $params } from "@/pages/sheet-print/tool/tool";
import { mapGetters, mapState } from 'vuex';
import { nursingDiagsUpdate } from "@/Page/patientInfo/supPage/diagnosis/api/index.js";
export default {
  mixins: [common],
  props: ["tableData"],
  inject: ["openSlideCon",'openSlideContant'],
  data() {
    return {
      model,
      beginTime:"",
      endTime:"",
      choseID:"",
      choseName:"",
      choseCode:"",
      choseDiagFactor:"",
      measureStr2:"",
      factorStr2:"",
      diagnosisLoading:false
    };
  },
  methods: {
    choseId(row){
      this.choseID = row.id
      this.choseName = row.diagName
      this.choseCode = row.diagCode
      this.choseDiagFactor = row.diagFactor
      this.measureStr2 = (row.measuresName.length>0 && row.measuresName.join(" ")) || row.diagMeasures
      this.factorStr2 = (row.targetsName.length>0 && row.targetsName.join(" ")) || row.diagTarget

      console.log(row,this.choseID)
    },
    timeChange(val,row,type){
        window.openSignModal((password, empNo) => {
        let params = {
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
        if(type==="beginTime") params.beginTime=val
        else params.endTime=val
        nursingDiagsUpdate(params).then(res => {
          console.log(model, "modelmodel");
          this.$message.success("保存成功");
          model.newDiagnosisModal.close();
          model.refreshTable();
          this.$store.commit("upMeasureGuizhou", {
              measure:"",
              target:""
          });
        });
      })
    },
    onSignOrCancel(row){
      window.openSignModal((password,username)=>{
        this.diagnosisLoading = true
        planListGuiZhou(
          {
            empNo:username,
            password:password
          },
          row.id
        ).then(res=>{
          this.diagnosisLoading = false
          if(res.data.code=='200'){
            this.$message.success(res.data.desc)
            model.refreshTable();
            model.selectedRow = null;
          }else{
            this.$message.warning(res.data.desc)
          }
        })
      },'请确认签名')
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
      if ( row.status !== '1' && (!this.isHeadNurse && this.user.empNo !== row.creator)) {
        this.$message.warning('护士长以上或创建人支持删除')
        return
      }
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
  created() {
    this.$nextTick(()=>{
      console.log(this.tableData,"tableDatax")

    })
  },
  components: {
    stopDiagnosisModal
  },
  watch:{
    tableData(val,v){
      console.log(val,)
    }
  },
  computed:{
    token() {
      let token;
      try {
        if ($params.token) {
          token = $params.token;
        } else {
          token = Cookies.get("NURSING_USER").split("##")[1];
        }
      } catch (error) {
        token = $params.token;
      }
      let appToken = $params.appToken || '51e827c9-d80e-40a1-a95a-1edc257596e7'
      return `App-Token-Nursing=${appToken}&Auth-Token-Nursing=${token}`;
    },
    ...mapGetters('common', {
      isHeadNurse: 'isHeadNurse'
    }),
    ...mapState({
      user: state => state.common.user
    })
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
    .el-date-editor--datetime{
      .el-input__icon{
        display: none;
      }
      .el-input__inner{
        width: 100%;
        padding-right: 0 !important;
      }
    }
    th {
      border-left: 1px solid #000 !important;
      border-right: 1px solid #000 !important;
      border-bottom: 1px solid #000 !important;
    }
    td {
      border: 1px solid #000 !important;
    }
    .el-date-editor.el-input{
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50% );
      opacity: 0;
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
.signer-img{
  width: 70px;
}
</style>
