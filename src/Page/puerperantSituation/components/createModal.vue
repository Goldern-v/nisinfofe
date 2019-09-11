<template>
  <div>
    <sweet-modal 
      ref="modal" 
      size="small" 
      v-model="dialogVisible" 
      :modalWidth="1200" 
      title="新建分娩记录" 
      @close="handleClose" 
      class="puperant-record-create-modal">
      <div class="model-content">
        <div class="title-row">基本信息:</div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc3">住</span>
              <span class="lc3">院</span>
              <span>号:</span>
            </div>
            <div class="content">
              <el-input size="small" :disabled="true" v-model="params.hospitalizationNumber"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">姓</span>
              <span>名:</span>
            </div>
            <div class="content">
              <el-select
                v-model="patientId"
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
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">身份证号:</div>
            <div class="content">
              <el-input size="small" v-model="params.femaleId"/>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc2">年</span>
              <span>龄:</span>
            </div>
            <div class="content">
              <el-input 
              size="small" 
              :value="params.femaleAge" 
              class="femaleAge-input"
              @change="(val)=>handleNumberChange(val,'femaleAge')"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">籍</span>
              <span>贯:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.femaleBrithPlace"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">职</span>
              <span>业:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.femaleJob"/>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">文化程度:</div>
            <div class="content">
              <el-select size="small" v-model="params.femaleEdu">
                <el-option v-for="(item,idx) in eduOptions" :key="idx" :value="item" :label="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="label">户口地址(市、镇、村):</div>
            <div class="content">
              <el-input size="small" v-model="params.femaleBirthAddress"/>
            </div>
          </el-col>
        </el-row>
        <div class="sub-title-row"> </div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">丈夫姓名:</div>
            <div class="content">
              <el-input size="small"  v-model="params.man"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">丈夫身份证号:</div>
            <div class="content">
              <el-input size="small" v-model="params.manId"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">丈夫年龄:</div>
            <div class="content">
              <el-input 
              size="small" 
              :value="params.manAge" 
              class="manAge-input"
              @change="(val)=>handleNumberChange(val,'manAge')"/>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">丈夫籍贯:</div>
            <div class="content">
              <el-input size="small" v-model="params.manBrithPlace"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">丈夫职业:</div>
            <div class="content">
              <el-input size="small" v-model="params.manJob"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">丈夫文化程度:</div>
            <div class="content">
              <el-select size="small" v-model="params.manEdu">
                <el-option v-for="(item,idx) in eduOptions" :key="idx" :value="item" :label="item"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="16">
            <div class="label">丈夫户口地址(市、镇、村):</div>
            <div class="content">
              <el-input size="small" v-model="params.manBirthAddress"/>
            </div>
          </el-col>
        </el-row>
        <div class="title-row">产妇情况:</div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">现住地址:</div>
            <div class="content">
              <el-input size="small" v-model="params.nowAddress"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">高危情况:</div>
            <div class="content">
              <el-input size="small" v-model="params.dangerousSituation"/>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc2">孕</span>
              <span>周:</span>
            </div>
            <div class="content">
              <el-input 
              size="small"
              :value="params.pregnancyWeek" 
              class="pregnancyWeek-input"
              @change="(val)=>handleNumberChange(val,'pregnancyWeek')"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">孕</span>
              <span>次:</span>
            </div>
            <div class="content">
              <el-input 
              size="small"
              :value="params.pregnancyTimes" 
              class="pregnancyTimes-input"
              @change="(val)=>handleNumberChange(val,'pregnancyTimes')"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">产</span>
              <span>次:</span>
            </div>
            <div class="content">
              <el-input 
              size="small"
              :value="params.birthTimes" 
              class="birthTimes-input"
              @change="(val)=>handleNumberChange(val,'birthTimes')"/>
            </div>
          </el-col>
        </el-row>
        <div class="sub-title-row">破膜时间:</div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc2">人</span>
              <span>工:</span>
            </div>
            <div class="content">
              <el-date-picker type="datetime" size="small" v-model="params.artiBrokenMembraneTime"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">自</span>
              <span>然:</span>
            </div>
            <div class="content">
              <el-date-picker type="datetime" size="small" v-model="params.natureBrokenMenbraneTime"/>
            </div>
          </el-col>
        </el-row>
        <div class="sub-title-row">产程时间(小时):</div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc1">一</span>
              <span>:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.productionProcess1"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc1">二</span>
              <span>:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.productionProcess2"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc1">三</span>
              <span>:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.productionProcess3"/>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc3">总</span>
              <span class="cl3">产</span>
              <span>程:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.productionProcessCount"/>
            </div>
          </el-col>
        </el-row>
        <div class="sub-title-row"> </div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">产前是否点滴催产素:</div>
            <div class="content">
              <el-select size="small" v-model="params.hadOxytocin">
                <el-option v-for="(item,idx) in hadOxytocinOptions" :key="idx" :value="item" :label="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">分娩时间:</div>
            <div class="content">
              <el-date-picker type="datetime" size="small" v-model="params.childBirthTime"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">分娩方式:</div>
            <div class="content">
              <el-select size="small" v-model="params.childBirthWay">
                <el-option v-for="(item,idx) in childBirthWayOptions" :key="idx" :value="item" :label="item"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
           <el-col :span="8">
            <div class="content">手术指征:</div>
            <div class="content">
              <el-input size="small" v-model="params.surgicalIndication"/>
            </div>
          </el-col>
        </el-row>
        <div class="sub-title-row">会阴情况：</div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc1">Ⅰ</span>
              <span>:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.perineumSituation1"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc1">Ⅱ</span>
              <span>:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.perineumSituation2"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc1">Ⅲ</span>
              <span>:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.perineumSituation3"/>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc2">切</span>
              <span>开:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.perineumSituation"/>
            </div>
          </el-col>
        </el-row>
        <div class="sub-title-row"> </div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">产后2h出血量(ml):</div>
            <div class="content">
              <el-input size="small" v-model="params.birthBloodVolume"/>
            </div>
          </el-col>
        </el-row>
        <div class="title-row">新生儿情况:</div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc2">性</span>
              <span>别:</span>
            </div>
            <div class="content">
              <el-select size="small" v-model="params.newBornSex">
                <el-option v-for="(item,idx) in sexOptions" :key="idx" :value="item" :label="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">身长(cm):</div>
            <div class="content">
              <el-input size="small" v-model="params.newBornHeight"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">体重(kg):</div>
            <div class="content">
              <el-input size="small" v-model="params.newBornWeight"/>
            </div>
          </el-col>
        </el-row>
        <div class="sub-title-row">阿氏评分:</div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc3">一</span>
              <span class="lc3">分</span>
              <span>钟:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.aShiScore1"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc3">五</span>
              <span class="lc3">分</span>
              <span>钟:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.aShiScore5"/>
            </div>
          </el-col>
        </el-row>
        <div class="sub-title-row"></div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc3">早</span>
              <span class="lc3">接</span>
              <span>触:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.earlyContact"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc3">早</span>
              <span class="lc3">吮</span>
              <span>吸:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.earlySucking"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">死</span>
              <span>胎:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.deadBirth"/>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc2">死</span>
              <span>产:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.deadProduce"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">畸</span>
              <span>形:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.deformity"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">新生儿死亡:</div>
            <div class="content">
              <el-input size="small" v-model="params.newBornDead"/>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">
              <span class="lc2">死</span>
              <span>因:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.deadReason"/>
            </div>
          </el-col>
        </el-row>
        <div class="title-row">其他:</div>
        <el-row class="content-row" :gutter="8">
          <el-col :span="8">
            <div class="label">生育证号码:</div>
            <div class="content">
              <el-select size="small" v-model="params.birthCertificateNum">
                <el-option v-for="(item,idx) in birthCertificateNumOptions" :key="idx" :value="item" :label="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">出生医学证明号码:</div>
            <div class="content">
              <el-input size="small" v-model="params.birthCertificateNumber"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label">
              <span class="lc2">备</span>
              <span>注:</span>
            </div>
            <div class="content">
              <el-input size="small" v-model="params.remarks"/>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="button">
        <el-button @click="handleClose" :disabled="saveLoading">取消</el-button>
        <el-button @click="handleSave" type="primary" :disabled="saveLoading">确认</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import commonMixin from "./../../../common/mixin/common.mixin";
import {getPatientList,changeOrSaveForm} from './../api/api'
import moment from 'moment';
import { setTimeout } from 'timers';
import { getPatientInfo } from "@/api/common.js";
import { getCommonInfo } from './../api/api'

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
      patientId:'',
      patientList:[],
      patientListFiltered:[],
      filterSearch: '',
      eduOptions:['文盲','小学','中学','大专','大专以上'],
      childBirthWayOptions:['顺产','吸引产','钳产','剖宫产','臀助产','臀牵引'],
      sexOptions:['男','女'],
      birthCertificateNumOptions:['有','无'],
      hadOxytocinOptions: ['是','否'],
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
      if(!patientId)return
      let target = this.patientList.find((item)=>item.patientId==patientId);
      if(target)this.params.female=target.name
      this.params.hospitalizationNumber = target.inpNo
      this.setPatientInfo()
    },
    setPatientInfo(){
      Promise.all([
        getPatientInfo(this.patientId,'1'),
        getCommonInfo({
          list:[{patientId:this.patientId,visitId:'1'}]
        })
      ])
      .then(res=>{
        if(res[0].data.data){
          let re = res[0].data.data;
          let age = parseInt(re.age);
          if(isNaN(age))age=''
          this.params = {
            ...this.params,
            femaleId: re.idNo||'',
            femaleAge: age,
            femaleBrithPlace: re.nativePlace||'',
            femaleBirthAddress: re.birthPlace||'',
            nowAddress: re.address||'',
            femaleJob: re.occupation||''
          }
        }
        if(res[1].data.data&&res[1].data.data[0]){
          let re1 = res[1].data.data[0]
          this.params = {
            ...this.params,
            man: re1.contactName||'',
            manBirthAddress: re1.contactAddr||'',
            femaleEdu: re1.whcd||'',
            pregnancyTimes:  re1.yy||'',
            birthTimes:  re1.cy||''
          }
        }

      },err=>{

      })
    },
    filterPatients(ipt){
      if(ipt){
        this.patientListFiltered = this.patientList.filter((item)=>{
          if(item.bedLabel.match(ipt)||item.inpNo.match(ipt)||item.name.match(ipt))
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
        if(this.$refs.modal.is_open)this.$refs.modal.close()
        this.patientId=''
        for(let x in this.params){
          this.params[x]=''
        }
      }else{
        this.$refs.modal.open();
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
  // max-height: 400px;
  // overflow-x: hidden;
  // overflow-y: auto;
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
    color: #333;
    font-weight: bold;
    margin-bottom: 15px;
    min-height: 10px;
    border-bottom: 1px dotted #bbb;
  }
  .content-row{
    line-height: 30px;
    margin-bottom: 10px;
    &>div{
      display: flex;
      padding-right: 30px!important;
      &>.label{
        display: inline-block;
        padding-right: 8px;
        span{
          vertical-align: middle;
        }
        .lc3{
          letter-spacing: 0px;
        }
        .lc2{
          letter-spacing: 20px;
        }
        .lc1{
          letter-spacing: 34px;
        }
      }
      &>.content{
        flex:1; 
      }
    }
    .el-date-editor{
      width: 100%;
    }
    
  }
  .nurse-select {
    width: 100%;
  }
}
</style>