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
         <el-table-column prop="nursingClass" label="护理等级"  width="100" header-align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.nursingClass" placeholder="">
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="diagName" label="护理诊断" width="205" header-align="center"></el-table-column>
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
         <el-table-column prop="catheterNursing" label="导管护理"  width="100" header-align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.catheterNursing" type="textarea" autosize></el-input>
          </template>
        </el-table-column>
         <el-table-column prop="positionNursingCodes" label="体位护理"  width="100" header-align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.positionNursingCodes" multiple placeholder="">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
         <el-table-column prop="skinNursing" label="皮肤护理"  width="100" header-align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skinNursing" type="textarea" autosize></el-input>
          </template>
        </el-table-column>
         <el-table-column prop="tracheaNursingCodes" label="气管护理"  width="100" header-align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.tracheaNursingCodes" multiple placeholder="">
              <el-option
                v-for="item in tracheaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
         <el-table-column prop="securityNursingCodes" label="安全护理"  width="100" header-align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.securityNursingCodes" multiple placeholder="">
              <el-option
                v-for="item in securityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
         <el-table-column prop="dietaryGuidanceTypes" label="饮食指导"  width="100" header-align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.dietaryGuidanceTypes" multiple placeholder="">
              <el-option
                v-for="item in dietaryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间" width="95" align="center">
          <template slot-scope="scope">
            {{scope.row.beginTime}}
            <el-date-picker
              v-model="scope.row.beginTime"
              :default-value="scope.row.beginTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm"
              :clearable="false"
              @change="val => {timeChange(val, scope.row,'beginTime')}">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="开始护士" width="90" header-align="center" align="center">
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
              v-model="scope.row.endTime"
              :default-value="scope.row.endTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm"
              :clearable="false"
              @change="val => {timeChange(val, scope.row,'endTime')}">
            </el-date-picker>
           </template>
        </el-table-column>
         <el-table-column label="停止护士" width="90" header-align="center" align="center" fixed="right">
          <template slot-scope="scope">
            <!-- <div v-if="!scope.row.signerName" class="tool-btn" @click="onSignOrCancel(scope.row)">
              点击签名
            </div> -->
            <div style="min-height:24px"  @click="onSignOrCancel(scope.row)">{{scope.row.operatorName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="95" header-align="center" fixed="right">
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
              <div class="tool-btn" @click="save(scope.row)">保存</div>
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
        <el-table-column label="序号" width="30" align="center">
          <template slot-scope="scope">
            {{
            scope.row.index
            }}
          </template>
        </el-table-column>
         <el-table-column label="护理等级" width="60" header-align="center" prop="nursingClass">
        </el-table-column>
        <el-table-column prop="diagName" label="护理诊断" width="70" header-align="center"></el-table-column>
        <el-table-column label="护理措施计划" width="100" header-align="center">
          <template slot-scope="scope">
            <!-- <div v-for="(item, index) in scope.row.measuresName" :key="index">
              <p>{{item && item.measureDetail}}</p>
              <br v-if="index != scope.row.measuresName.length - 1" />
            </div> -->
            <div v-for="(item, index) in scope.row.measuresName" :key="index"  v-show="scope.row.measuresName.length">
                <p>{{item && item.measureDetail}}</p>
                <br v-if="index != scope.row.measuresName.length - 1" />
              </div>
              <div v-if="!scope.row.measuresName.length" v-html="scope.row.diagMeasures&&scope.row.diagMeasures.replace(/\n/g,'<br><br>')"></div>
          </template>
        </el-table-column>
        <el-table-column label="护理目标" width="60" header-align="center">
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
         <el-table-column prop="catheterNursing" label="导管护理"  width="60" header-align="center"></el-table-column>
         <el-table-column prop="positionNursingCodes" label="体位护理" :formatter="positionFormatter"  width="60" header-align="center"></el-table-column>
         <el-table-column prop="skinNursing" label="皮肤护理"  width="60" header-align="center"></el-table-column>
         <el-table-column prop="tracheaNursingCodes" :formatter='tracheaFormatter' label="气管护理"  width="70" header-align="center"></el-table-column>
         <el-table-column prop="securityNursingCodes" :formatter='securityFormatter' label="安全护理"  width="70" header-align="center"></el-table-column>
         <el-table-column prop="dietaryGuidanceTypes" :formatter='dietaryFormatter' label="饮食指导"  width="70" header-align="center"></el-table-column>
        <el-table-column prop="beginTime" label="开始时间" width="75" align="center"></el-table-column>
        <el-table-column prop="endTime" label="停止时间" width="75" align="center"></el-table-column>
        <el-table-column
          prop="evalType"
          label="护理评价"
          width="70"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column prop="evalContent" label="评价说明" width="70" header-align="center"></el-table-column>
        <el-table-column label="护士签名" width="60" header-align="center" >
          <template slot-scope="scope">
            <!-- <img class="signer-img" v-if="scope.row.operatorName" :src="`/crNursing/api/file/signImage/${scope.row.operatorName}?${token}`" alt=""> -->
            {{scope.row.operatorName}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="endTime" label="签名时间" width="85" header-align="center" align="center"></el-table-column> -->
      </el-table>
    </div>
    <stopDiagnosisModal ref="stopDiagnosisModal"></stopDiagnosisModal>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import { nursingDiagsPatient,planListGuiZhou,nursingDiagsUpdate } from "../../api/index";
import { model } from "../../diagnosisViewModel";
import { nursingDiagsDel, savePlanForm } from "../../api/index";
import stopDiagnosisModal from "../../modal/stopDiagnosisModal";
import Cookies from "js-cookie";
import moment from 'moment';
import { $params } from "@/pages/sheet-print/tool/tool";
export default {
  mixins: [common],
  props: ["tableData"],
  inject: ["openSlideCon",'openSlideContant'],
  data() {
    return {
      model,
      diagnosisLoading:false,
      classOptions:[
        {label:'特级护理',value:'特级护理'},
        {label:'一级护理',value:'一级护理'},
        {label:'二级护理',value:'二级护理'},
        {label:'三级护理',value:'三级护理'},
      ],
      tracheaOptions:[
        {label:'翻身拍背',value:'翻身拍背'},
        {label:'雾化吸入',value:'雾化吸入'},
        {label:'吸痰',value:'吸痰'},
      ],
      securityOptions:[
        {label:'勤巡视病房',value:'勤巡视病房'},
        {label:'加床档',value:'加床档'},
        {label:'约束四肢',value:'约束四肢'},
        {label:'安全转运护理',value:'安全转运护理'},
        {label:'防跌倒/坠床护理',value:'防跌倒/坠床护理'},
        {label:'防烫伤护理',value:'防烫伤护理'},
        {label:'防走失护理',value:'防走失护理'},
        {label:'安全约束护理',value:'安全约束护理'},
        {label:'入院护理',value:'入院护理'},
        {label:'出院护理',value:'出院护理'},
        {label:'放呛噎护理',value:'放呛噎护理'},
      ],
      dietaryOptions:[
        {label:'普通饮食',value:'普通饮食'},
        {label:'软食',value:'软食'},
        {label:'半流食',value:'半流食'},
        {label:'流食',value:'流食'},
        {label:'禁食',value:'禁食'},
        {label:'禁食水',value:'禁食水'},
        {label:'鼻饲饮食',value:'鼻饲饮食'},
        {label:'低盐低脂饮食',value:'低盐低脂饮食'},
        {label:'糖尿病饮食',value:'糖尿病饮食'},
        {label:'其他',value:'其他'},
      ],
      positionOptions:[
        {label:'头低脚高位',value:'头低脚高位'},
        {label:'半卧位',value:'半卧位'},
        {label:'抬高床头15-30°',value:'抬高床头15-30°'},
        {label:'抬高床头30-45°',value:'抬高床头30-45°'},
        {label:'抬高左下肢25CM',value:'抬高左下肢25CM'},
        {label:'抬高右下肢25CM',value:'抬高右下肢25CM'},
        {label:'抬高左上肢',value:'抬高左上肢'},
        {label:'抬高右上肢',value:'抬高右上肢'},
        {label:'外展中立位',value:'外展中立位'},
        {label:'头高脚低位',value:'头高脚低位'},
        {label:'去枕平卧位',value:'去枕平卧位'},
      ],
      test: [],
    };
  },

  methods: {
    timeChange(val,row,type){
      row[type] = moment(val).format("YYYY-MM-DD HH:mm")
    },
    tracheaFormatter(row) {
      return row.tracheaNursingCodes.join(', ')
    },
    securityFormatter(row) {
      return row.securityNursingCodes.join(', ')
    },
    dietaryFormatter(row) {
      return row.dietaryGuidanceTypes.join(', ')
    },
    positionFormatter(row) {
      return row.positionNursingCodes.join(', ')
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
    save(row) {
      // 后端新增加的字段 用多选数组形式 佛一需求
      // 气管护理：tracheaNursingCodes
      // 安全护理：securityNursingCodes
      // 饮食指导：dietaryGuidanceTypes
      // 体位护理：positionNursingCodes
      model.selectedRow = row;
      let strSignData = JSON.stringify({
        measureStr: row.measuresName.length ?row.measuresName :row.diagMeasures,
        targetStr: row.targetsName.length ? row.targetsName : row.diagTarget,
        factorStr: row.diagFactor,
      })
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
        instanceId:row.id,
        recordId:"",
        signData:strSignData,
      }
      window.openSignModal((password, empNo) => {
        let obj = {
          creator: password,
          empNo,
          id: row.id,
          patientId: this.$route.query.patientId,
          visitId: this.$route.query.visitId,
          patientName: this.$route.query.name,
          bedLabel: this.$route.query.bedLabel,
          code: row.code,
          name: row.name,
          measureStr: row.measuresName.length ?row.measuresName :row.diagMeasures,
          targetStr: row.targetsName.length ? row.targetsName : row.diagTarget,
          factorStr: row.diagFactor,
          nursingClass:row.nursingClass,
          catheterNursing:row.catheterNursing,
          positionNursingCodes:row.positionNursingCodes,
          skinNursing:row.skinNursing,
          tracheaNursingCodes:row.tracheaNursingCodes,
          securityNursingCodes:row.securityNursingCodes,
          dietaryGuidanceTypes:row.dietaryGuidanceTypes,
          wardCode: model.selectedBlock.wardCode,
          beginTime: moment(row.beginTime).format("YYYY-MM-DD HH:mm"),
          endTime: moment(row.endTime).format("YYYY-MM-DD HH:mm")
        };
        nursingDiagsUpdate(obj).then(res => {
          this.$message.success("保存成功");
          // model.newDiagnosisModal.close();
          // this.close();
          model.refreshTable();
        });
      }, undefined,undefined,undefined,undefined,{},undefined,undefined,undefined,SigndataObj,verifySignObj);
    },
    edit(row) {
      // if (!this.verify()) return;
      model.selectedRow = row;
      this.openSlideCon({
        id: model.selectedRow.id,
        code: model.selectedRow.diagCode,
        name: model.selectedRow.diagName,
        definition: model.selectedRow.definition,
        nursingClass:row.nursingClass,
        catheterNursing:row.catheterNursing,
        positionNursingCodes:row.positionNursingCodes,
        skinNursing:row.skinNursing,
        tracheaNursingCodes:row.tracheaNursingCodes,
        securityNursingCodes:row.securityNursingCodes,
        dietaryGuidanceTypes:row.dietaryGuidanceTypes,
      });
      this.openSlideContant({
        id: model.selectedRow.id,
        code: model.selectedRow.diagCode,
        name: model.selectedRow.diagName,
        definition: model.selectedRow.definition,
        nursingClass:row.nursingClass,
        catheterNursing:row.catheterNursing,
        positionNursingCodes:row.positionNursingCodes,
        skinNursing:row.skinNursing,
        tracheaNursingCodes:row.tracheaNursingCodes,
        securityNursingCodes:row.securityNursingCodes,
        dietaryGuidanceTypes:row.dietaryGuidanceTypes,
      })
    },
    del(row) {
      // if (!this.verify()) return;
      model.selectedRow = row;
     let strSignData = ""
     if(row.measuresName.length>0) row.measuresName.forEach(item=>{
      strSignData += item.measureDetail+'/n'
     })
     else strSignData = row.diagMeasures
      let SigndataObj = {
        Patient_ID:this.$route.query.patientId,
        Visit_ID:this.$route.query.visitId,
        Document_Title:"",
        Document_ID:model.selectedRow.diagCode,
        Section_ID:model.selectedRow.diagCode,
        strSignData: strSignData || model.selectedRow.diagCode,
      };

       let verifySignObj = {
        patientId:this.$route.query.patientId,
        visitId:this.$route.query.visitId,
        formName:"",
        formCode:model.selectedRow.diagCode,
        instanceId:row.id,
        recordId:"",
        signData:strSignData || model.selectedRow.diagCode,
      }
      window.openSignModal((password, empNo) => {
        nursingDiagsDel(password, empNo, model.selectedRow.id).then(res => {
          this.$message.success("删除成功");
          model.refreshTable();
          model.selectedRow = null;
        });
      }, "你确定要删除诊断？",undefined,undefined,undefined,undefined,undefined,undefined,undefined,SigndataObj,verifySignObj);
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
       .gutter{
        border: none !important;
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
    /* th:last-child{
      border:none !important;
      border-left: 1px solid #000 !important;
    }
    th:nth-last-child(2){
      border:none !important;

    } */
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
    .el-table__fixed-body-wrapper{
      top:30px !important;
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
/deep/ .el-select .el-input .el-input__icon{
  display: none;
  background-color: transparent;
}
/deep/ .el-select .el-input__inner{
  padding-right: 10px;
  text-align: center;
  border: none;
  background-color: transparent;
}
/deep/.el-input__icon + .el-input__inner{
  padding-right: 10px;
}
/deep/ .el-textarea__inner{
  border:none;
  resize: none;
  background-color: transparent;
}

/deep/ *::-webkit-scrollbar{
  width: 7px;
  height: 10px;
  background-color: #eaeaea;
}
</style>
