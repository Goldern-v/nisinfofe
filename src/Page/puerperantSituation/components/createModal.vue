<template lang="html" src="./createModal.html"></template>

<script>
import commonMixin from "./../../../common/mixin/common.mixin";
import {getPatientList,changeOrSaveForm,getPatientListNew,getFormChildbirth } from './../api/api'
import moment from 'moment';
import { getPatientInfo } from "@/api/common.js";
import { getCommonInfo } from './../api/api'
import {eduOptions,cbwOptions,sexOptions,hoOptions,bcnOptions,otherOptions} from './../data/options'

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
        patientId: '',
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
        perineumSituationFull: '',
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
        remarks: '',
        birthAttendantName1: '',
        birthAttendantId1: '',
        birthAttendantName2: '',
        birthAttendantId2: '',
      },
      patientName:'',
      patientList:[],
      patientListFiltered:[],
      filterSearch: '',
      eduOptions: eduOptions,
      childBirthWayOptions: cbwOptions,
      sexOptions: sexOptions,
      birthCertificateNumOptions:bcnOptions,
      hadOxytocinOptions: hoOptions,
      perineumSituationOptions: otherOptions
    };
  },
  mounted() {
    getPatientListNew().then(res=>{
      if(res.data.data){
        this.patientList=this.formatPatientList(res.data.data);
        this.patientListFiltered = this.patientList.concat();
      }
    })
  },
  methods: {
    patientsFilterMethod(search){
      this.patientName = search
      this.params.female = search

      this.filterSearch = search;
    },
    patientOptionVisible(item,search){
        if(!search)return true
        if(new RegExp(search).test(item.patientId))return true

        if(new RegExp(search).test(item.bedLabel))return true

        if(new RegExp(search).test(item.name))return true

        return false
    },
    formatPatientList(list){
      let newList = [];
      newList = list.filter((item)=>{
        if(!item.name||item.name=='')return false
        if(!item.patientId)return false
        if(item.bedLabel.includes('_')||item.patientId.includes('_'))return false
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

      if(!params.childBirthTime)errMsg = '分娩时间 不能为空'

      if(params.birthBloodVolume&&isNaN(Number(params.birthBloodVolume)))errMsg = '产后2h出血量 必须为数字'

      if(errMsg){
        this.$message({
          message: errMsg,
          type: 'warning'
        })
        return
      }
      
      // return console.log(params)
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
    handlePatinentChange(patientOptionVal){
      let patientName = patientOptionVal.split(' ')[0]
      let patientId = patientOptionVal.split(' ')[1]||null

      if(!patientId)return
      let target = this.patientList.find((item)=>item.patientId==patientId);
      if(target){
        //清除数据
        for(let x in this.params){
          if(x!=='patientName'&&x!=='patientId')this.params[x]=''
        }
        
        this.params.female=target.name
        this.params.hospitalizationNumber = target.inpNo
        this.params.patientId = target.patientId

        //获取数据并填充
        this.setPatientInfo(target.patientId)
      }
    },
    setPatientInfo(patientId){
      Promise.all([
        getPatientInfo(patientId,'1'),
        getCommonInfo({
          list:[{patientId:patientId,visitId:'1'}]
        }),
        getFormChildbirth({patientId})
      ])
      .then(res=>{
        let finallParams = {
          ...this.params,
          hadOxytocin: '否',
          perineumSituation1: '/',
          perineumSituation2: '/',
          perineumSituation3: '/',
          perineumSituation: '/',
          perineumSituationFull: '/',
          earlyContact: '/',
          earlySucking: '/',
          deadBirth: '/',
          deadProduce: '/',
          deformity: '/',
          newBornDead: '/',
          deadReason: '/',
          surgicalIndication: '/'
        }

        if(res[0].data.data){
          let re = res[0].data.data;
          let age = parseInt(re.age);
          if(isNaN(age))age=''
          finallParams = {
            ...finallParams,
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
          finallParams = {
            ...finallParams,
            man: re1.contactName||'',
            manBirthAddress: re1.contactAddr||'',
            femaleEdu: re1.whcd||'',
            pregnancyTimes:  re1.yy||'',
            birthTimes:  re1.cy||''
          }
        }

        if(res[2].data.data){
          let re2 = res[2].data.data

          if(re2.pageMap){
            let re2From = re2.pageMap
            let newParams = {...finallParams}
            let formCode = 'form_childbirth'

            //高危情况
            let bfzhhbz_explain = re2From[`${formCode}_bfzhhbz_explain`]

            //破膜时间
            let tmpl_explain = re2From[`${formCode}_tmpl_explain`]
            //胎膜破裂
            let tmp_option = re2From[`${formCode}_tmpl_option`]
            if(tmp_option=='人工'){
              newParams.artiBrokenMembraneTime = new Date(tmpl_explain)!=='Invalid Date'? tmpl_explain:''
            }else if(tmp_option=='自然'){
              newParams.natureBrokenMenbraneTime =  new Date(tmpl_explain)!=='Invalid Date'? tmpl_explain:''
            }

            //孕周
            let gnyz_explain =  re2From[`${formCode}_gnyz_explain`]||''

            //产程
            let ccsj_dycc = re2From[`${formCode}_ccsj_dycc`]||''
            let ccsj_decc = re2From[`${formCode}_ccsj_decc`]||''
            let ccsj_dscc = re2From[`${formCode}_ccsj_dscc`]||''
            let ccsj_zcc = re2From[`${formCode}_ccsj_zcc`]||''

            //分娩时间
            let temcsj_explain = re2From[`${formCode}_temcsj_explain`]
            if(new Date(temcsj_explain)=='Invalid Date'){
              temcsj_explain = ''
            }else{
              temcsj_explain = moment(temcsj_explain).format('YYYY-MM-DD HH:mm:ss')
            }

            //分娩方式
            let temcfs_option = re2From[`${formCode}_temcfs_option`]||''

            //会阴
            let hy_option = re2From[`${formCode}_hy_option`]
            //切开
            let hy_qk_option = '/'
            if(hy_option=='切开')hy_qk_option = re2From[`${formCode}_hy_qk_option`]||'/'

            //2h出血总量
            let ssss_ydfm_explain = re2From[`${formCode}_ssss_ydfm_explain`]||''

            //新生儿
            //性别
            let xb_explain = re2From[`${formCode}_xb_explain`]||''
            //体重
            let tz_explain = re2From[`${formCode}_tz_explain`]||''
            //身长
            let sc_explain = re2From[`${formCode}_sc_explain`]||''
            //阿氏评分
            //1min
            let zf_1min = re2From[`${formCode}_zf_1min`]||''
            //5min
            let zf_5min = re2From[`${formCode}_zf_5min`]||''
            //10min
            // let zf_10min = re2From[`${formCode}_zf_10min`]||''

            //接生者
            let deliver = re2From[`${formCode}_deliver`]||''
            let deliver_empno = re2From[`${formCode}_deliver_empno`]||''
            let deliver2 = re2From[`${formCode}_deliver2`]||''
            let deliver2_empno = re2From[`${formCode}_deliver2_empno`]||''

            newParams = {
              ...newParams,
              pregnancyWeek: gnyz_explain,
              productionProcess1: ccsj_dycc,
              productionProcess2: ccsj_decc,
              productionProcess3: ccsj_dscc,
              productionProcessCount: ccsj_zcc,
              childBirthTime: temcsj_explain,
              childBirthWay: temcfs_option,
              perineumSituation: hy_qk_option,
              birthBloodVolume:ssss_ydfm_explain,
              newBornSex: xb_explain,
              newBornWeight: tz_explain,
              newBornHeight: sc_explain,
              aShiScore1: zf_1min,
              aShiScore5: zf_5min,
              // aShiScore10: zf_10min,
              birthAttendantName1: deliver,
              birthAttendantId1: deliver_empno,
              birthAttendantName2: deliver2,
              birthAttendantId2: deliver2_empno,
              dangerousSituation: bfzhhbz_explain
            }

            finallParams = newParams
          }
        }

        this.params = finallParams

      },err=>{

      })
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
        this.patientName=''
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
}
</style>