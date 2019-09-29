<template lang="html" src="./createModal.html"></template>

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
      perineumSituationOptions: ['/','√']
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