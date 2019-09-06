<template>
  <div>
    <el-dialog ref="modal" size="small" v-model="dialogVisible" title="新建分娩记录" @close="handleClose" custom-class="puperant-record-create-modal">
      <div class="model-content">
        <div class="title-row">基本信息:</div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">住院号:</el-col>
          <el-col :span="5">
            <el-input size="small" :disabled="true" v-model="params.hospitalizationNumber"/>
          </el-col>
          <el-col :span="3">姓名:</el-col>
          <el-col :span="5">
            <el-select 
              v-model="params.hospitalizationNumber" 
              placeholder="产妇姓名/床号/住院号" 
              filterable
              :filter-method="patientsFilterMethod"
              @change="handlePatinentChange">
              <template  v-for="(item,idx) in patientListFiltered">
                <el-option
                  :key="idx"
                  v-if="patientOptionVisible(item,filterSearch)"
                  :label="item.name"
                  :value="item.patientId">
                  <div>
                    <div style="float: left;">{{item.name}}</div>
                    <div  style="float: right;">{{item.bedLabel}}床</div>
                  </div>
                </el-option>
              </template>
            </el-select>
          </el-col>
          <el-col :span="3">身份证号:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.femaleId"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">年龄:</el-col>
          <el-col :span="5">
            <el-input 
              size="small" 
              :value="params.femaleAge" 
              class="femaleAge-input"
              @change="(val)=>handleNumberChange(val,'femaleAge')"/>
          </el-col>
          <el-col :span="3">籍贯:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.femaleBrithPlace"/>
          </el-col>
          <el-col :span="3">职业:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.femaleJob"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">文化程度:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.femaleEdu"/>
          </el-col>
          <el-col :span="4">户口地址(市、镇、村):</el-col>
          <el-col :span="12">
            <el-input size="small" v-model="params.femaleBirthAddress"/>
          </el-col>
        </el-row>
        <div class="sub-title-row"> </div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">丈夫姓名:</el-col>
          <el-col :span="5">
            <el-input size="small"  v-model="params.man"/>
          </el-col>
          <el-col :span="3">丈夫身份证号:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.manId"/>
          </el-col>
          <el-col :span="3">丈夫年龄:</el-col>
          <el-col :span="5">
            <el-input 
              size="small" 
              :value="params.manAge" 
              class="manAge-input"
              @change="(val)=>handleNumberChange(val,'manAge')"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">丈夫籍贯:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.manBrithPlace"/>
          </el-col>
          <el-col :span="3">丈夫职业:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.manJob"/>
          </el-col>
          <el-col :span="3">丈夫文化程度:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.manEdu"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="10">
          <el-col :span="4">丈夫户口地址(市、镇、村):</el-col>
          <el-col :span="12">
            <el-input size="small" v-model="params.manBirthAddress"/>
          </el-col>
        </el-row>
        <div class="title-row">产妇情况:</div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">现住地址:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.nowAddress"/>
          </el-col>
          <el-col :span="3">高危情况:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.dangerousSituation"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">孕周:</el-col>
          <el-col :span="5">
            <el-input 
              size="small"
              :value="params.pregnancyWeek" 
              class="pregnancyWeek-input"
              @change="(val)=>handleNumberChange(val,'pregnancyWeek')"/>
          </el-col>
          <el-col :span="3">孕次:</el-col>
          <el-col :span="5">
            <el-input 
              size="small"
              :value="params.pregnancyTimes" 
              class="pregnancyTimes-input"
              @change="(val)=>handleNumberChange(val,'pregnancyTimes')"/>
          </el-col>
          <el-col :span="3">产次:</el-col>
          <el-col :span="5">
            <el-input 
              size="small"
              :value="params.birthTimes" 
              class="birthTimes-input"
              @change="(val)=>handleNumberChange(val,'birthTimes')"/>
          </el-col>
        </el-row>
        <div class="sub-title-row">破膜时间:</div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">人工:</el-col>
          <el-col :span="5">
            <el-date-picker type="datetime" size="small" v-model="params.artiBrokenMembraneTime"/>
          </el-col>
          <el-col :span="3">自然:</el-col>
          <el-col :span="5">
            <el-date-picker type="datetime" size="small" v-model="params.natureBrokenMenbraneTime"/>
          </el-col>
        </el-row>
        <div class="sub-title-row">产程时间(小时):</div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">一:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.productionProcess1"/>
          </el-col>
          <el-col :span="3">二:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.productionProcess2"/>
          </el-col>
          <el-col :span="3">三:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.productionProcess3"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">总产程:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.productionProcessCount"/>
          </el-col>
        </el-row>
        <div class="sub-title-row"> </div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="4">产前是否点滴催产素:</el-col>
          <el-col :span="4">
            <el-input size="small" v-model="params.hadOxytocin"/>
          </el-col>
          <el-col :span="3">分娩时间:</el-col>
          <el-col :span="5">
            <el-date-picker type="datetime" size="small" v-model="params.childBirthTime"/>
          </el-col>
          <el-col :span="3">分娩方式:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.childBirthWay"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
           <el-col :span="3">手术指征:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.surgicalIndication"/>
          </el-col>
        </el-row>
        <div class="sub-title-row">会阴情况：</div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">Ⅰ:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.perineumSituation1"/>
          </el-col>
          <el-col :span="3">Ⅱ:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.perineumSituation2"/>
          </el-col>
          <el-col :span="3">Ⅲ:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.perineumSituation3"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">切开:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.perineumSituation"/>
          </el-col>
        </el-row>
        <div class="sub-title-row"> </div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">产后2h出血量(ml):</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.birthBloodVolume"/>
          </el-col>
        </el-row>
        <div class="title-row">新生儿情况:</div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">性别:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.newBornSex"/>
          </el-col>
          <el-col :span="3">身长cm:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.newBornHeight"/>
          </el-col>
          <el-col :span="3">体重kg:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.newBornWeight"/>
          </el-col>
        </el-row>
        <div class="sub-title-row">阿氏评分:</div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">一分钟:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.aShiScore1"/>
          </el-col>
          <el-col :span="3">五分钟:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.aShiScore5"/>
          </el-col>
        </el-row>
        <div class="sub-title-row"></div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">早接触:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.earlyContact"/>
          </el-col>
          <el-col :span="3">早吮吸:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.earlySucking"/>
          </el-col>
          <el-col :span="3">死胎:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.deadBirth"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">死产:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.deadProduce"/>
          </el-col>
          <el-col :span="3">畸形:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.deformity"/>
          </el-col>
          <el-col :span="3">新生儿死亡:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.newBornDead"/>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">死因:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.deadReason"/>
          </el-col>
        </el-row>
        <div class="title-row">其他:</div>
        <el-row class="content-row" :gutter="20">
          <el-col :span="3">生育证号码:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.birthCertificateNum"/>
          </el-col>
          <el-col :span="3">出生医学证明号码:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.birthCertificateNumber"/>
          </el-col>
          <el-col :span="3">备注:</el-col>
          <el-col :span="5">
            <el-input size="small" v-model="params.remarks"/>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button @click="handleClose" :disabled="saveLoading">取消</el-button>
        <el-button @click="handleSave" type="primary" :disabled="saveLoading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonMixin from "./../../../common/mixin/common.mixin";
import {getPatientList,changeOrSaveForm} from './../api/api'
import moment from 'moment';
import { setTimeout } from 'timers';
export default {
  mixins: [commonMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible:false,
      saveLoading: false,
      params:{
        hospitalizationNumber: '',
        female: '',
        femaleId: '',
        femaleAge: '',
        femaleBrithPlace: '',
        femaleBirthAddress: '',
        femaleJob: '',
        femaleEdu: '',
        man: '',
        manId: '',
        manAge: '',
        manBrithPlace: '',
        manJob: '',
        manEdu: '',
        manBirthAddress: '',
        nowAddress: '',
        dangerousSituation: '',
        pregnancyWeek: '',
        pregnancyTimes: '',
        birthTimes: '',
        artiBrokenMembraneTime: '',
        natureBrokenMenbraneTime: '',
        productionProcess1: '',
        productionProcess2: '',
        productionProcess3: '',
        productionProcessCount: '',
        hadOxytocin: '',
        childBirthTime: '',
        childBirthWay: '',
        surgicalIndication: '',
        perineumSituation1: '',
        perineumSituation2: '',
        perineumSituation3: '',
        perineumSituation: '',
        birthBloodVolume: '',
        newBornSex: '',
        newBornHeight: '',
        newBornWeight: '',
        aShiScore1: '',
        aShiScore5: '',
        earlyContact: '',
        earlySucking: '',
        deadBirth: '',
        deadProduce: '',
        deformity: '',
        newBornDead: '',
        deadReason: '',
        birthCertificateNum: '',
        remarks: ''
      },
      patientList:[],
      patientListFiltered:[],
      filterSearch: ''
    };
  },
  mounted() {
    getPatientList().then(res=>{
      if(res.data.data){
        this.patientList=this.formatPatientList(res.data.data);
        this.patientListFiltered = this.patientList.concat();
      }
    },err=>{

    })
  },
  methods: {
    patientsFilterMethod(search){
      this.filterSearch = search;
    },
    patientOptionVisible(item,search){
        if(!search)return true
        if(item.patientId.match(search)!==null)return true
        if(item.bedLabel.match(search)!==null)return true
        if(item.name.match(search)!==null)return true
        return false
    },
    formatPatientList(list){
      let newList = [];
      newList = list.filter((item)=>{
        if(!item.patientId)return false
        if(item.bedLabel.includes('_'))return false
        return true
      })

      return newList
    },
    handleClose() {
      this.$emit("update:visible", false);
      this.$emit("onCancel",false);
    },
    handleSave() {
      // console.log(this.value);
      // this.$emit("onOk", this.$refs.modal);
      let params = {...this.params};
      let errMsg = '';

      for(let x in params){
        if(Object.prototype.toString.call(params[x])=='[object Date]')
        params[x]=moment(params[x]).format('YYYY-MM-DD HH:mm:ss')
      }

      if(!params.hospitalizationNumber)errMsg = '未选择产妇'
      if(!params.childBirthTime)errMsg = '分娩时间不能为空'

      if(errMsg){
        this.$message({
          message: errMsg,
          type: 'warning'
        })
        return
      }

      this.saveLoading = true;
      changeOrSaveForm(params)
      .then(res=>{
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.saveLoading = false;
        this.$emit('onOk')
      },res=>{
         this.saveLoading = false;
      })
    },
    handlePatinentChange(patientId){
      let target = this.patientList.find((item)=>item.patientId==patientId);
      if(target)this.params.female=target.name
    },
    filterPatients(ipt){
      if(ipt){
        this.patientListFiltered = this.patientList.filter((item)=>{
          if(item.bedLabel.match(ipt)||item.patientId.match(ipt)||item.name.match(ipt))
          return true
          
          return false
        })
      }else{
        this.patientListFiltered = this.patientList.concat();
      }
      
    },
    handleNumberChange(val,name){
      if(!val){
        this.params[name] = ''
        return
      };

      let newVal = parseInt(val).toString();
      let targetChange = false;
      if(isNaN(Number(newVal))){
        newVal=this.params[name]
        targetChange = true;
      }

      if(newVal.length!==val.length)targetChange = true

      this.params[name] = newVal

      if(targetChange){
        setTimeout(_=>document.querySelector(`.${name}-input input`).value=newVal)
      }
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible=val;
      if(!val){
        for(let x in this.params){
          this.params[x]=''
        }
      }
    },
    value(val) {
      if (val !== this.editValue) this.editValue = val;
    }
  }
};
</script>

<style lang="scss">
.puperant-record-create-modal{
  width: 1200px;
  .el-select{
    width: 100%;
    .el-input{
      .el-input__inner{
        height: 32px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.model-content {
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 10px;
  .title-row{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    padding-top: 15px;
    padding-bottom: 7px;
    border-bottom: 1px dashed #aaa;
  }
  .sub-title-row{
    font-size: 14px;
    color: #999;
    font-weight: bold;
    margin-bottom: 15px;
    min-height: 14px;
  }
  .content-row{
    line-height: 30px;
    margin-bottom: 10px;
    .el-date-editor{
      width: 100%;
    }
    
  }
  .nurse-select {
    width: 100%;
  }
}
</style>