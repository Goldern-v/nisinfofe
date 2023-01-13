<template>
  <SweetModal
    ref="sweetModal"
    :title="title || ' '"
    :modal-width="modalWidth"
    class="custom-sweet-modal"
  >
    <!-- <nursingDocumentation></nursingDocumentation> -->
    <patientDist></patientDist>
    <el-button slot="button" type="primary" @click="retest">确定</el-button>
  </SweetModal>
</template>

<script>
import nursingDocumentation from '@/Page/nursing-documentation/nursing-documentation'
import patientDist from "@/containers/patient-list/patient-list"
import bus from "vue-happy-bus";
import {formTypeList} from "./../../units/formType"
export default {
    components: {
        nursingDocumentation,
        patientDist
    },
    data(){
        return {
            title: "",
            modalWidth: 1300,
            bus: bus(this),
            selectedPatientData: {}
        }
    },
    created(){
      this.bus.$on('selectedPatient',(data)=>{
        this.selectedPatientData = data;
      });
    },
    mounted(){},
    methods: {
        open(){
            this.$refs.sweetModal.open();
        },
        close(){
          this.$refs.sweetModal.close();
        },
        retest(){
          console.log(this.$route.params.name)
            let findItem=formTypeList.find(item=>item.childType==this.$route.params.name);//查询当前不良事件类型
            (!findItem) && (findItem=formTypeList[0]);
            switch(findItem.funType){
              case 'type0':
                  this.setDataType0();
                  break;
              case 'type1':
                  this.setDataType1();
                  break;
              default:
                  this.setDataType0();
                  break;
            }

          this.close();
        },
        //旧版压力性损伤等一批不良事件 带入患者基本信息
        setDataType0(){
           console.log(this.selectedPatientData);
          let data = this.selectedPatientData[0];
          //inp_no 住院号
          if(wid.app.$root.$refs['B0002002'] && wid.app.$root.$refs['B0002002'].setCurrentValue){
            wid.app.$root.$refs['B0002002'].setCurrentValue(data.inpNo);
          }
          //床位号
          if(wid.app.$root.$refs['B0002001'] && wid.app.$root.$refs['B0002001'].setCurrentValue){
            wid.app.$root.$refs['B0002001'].setCurrentValue(data.bedLabel);
          }
          //姓名
          if(wid.app.$root.$refs['B0002003'] && wid.app.$root.$refs['B0002003'].setCurrentValue){
            wid.app.$root.$refs['B0002003'].setCurrentValue(data.name);
          }
          //性别
          // if(wid.app.$root.$refs['B0002006'] && wid.app.$root.$refs['B0002006'].setCurrentValue){
          //   wid.app.$root.$refs['B0002006'].setCurrentValue(data.sex);
          // }
          //年龄
          if(wid.app.$root.$refs['B0002004'] && wid.app.$root.$refs['B0002004'].setCurrentValue){
            wid.app.$root.$refs['B0002004'].setCurrentValue(data.age);
          }
          //诊断
          if(wid.app.$root.$refs['B0002009'] && wid.app.$root.$refs['B0002009'].setCurrentValue){
            wid.app.$root.$refs['B0002009'].setCurrentValue(data.diagnosis);
          }
          //职业
          if(wid.app.$root.$refs['B0002007'] && wid.app.$root.$refs['B0002007'].setCurrentValue){
            wid.app.$root.$refs['B0002007'].setCurrentValue(data.occupation);
          }
          //护理级别
          (!data.nursingClass || data.nursingClass=='') && (data.nursingClass='无');
          if(wid.app.$root.$refs['B0002005'] && wid.app.$root.$refs['B0002005'][data.nursingClass]){
            // wid.app.$root.$refs['B0002005'][data.nursingClass].$parent.checkboxValue=true
            wid.app.$root.$refs['B0002005'][data.nursingClass].setCheckboxValue(data.nursingClass)
            wid.app.$root.$refs['B0002005'][data.nursingClass].model = [data.nursingClass];
            wid.app.$root.$refs['B0002005'][data.nursingClass].$parent.checkboxValue = [data.nursingClass];
          }
          //性别
          (!data.sex || data.sex=='') && (data.sex='无');
          if(wid.app.$root.$refs['B0002006'] && wid.app.$root.$refs['B0002006'][data.sex]){
           wid.app.$root.$refs['B0002006'][data.sex].$parent.checkboxValue=true;
           wid.app.$root.$refs['B0002006'][data.sex].setCheckboxValue(data.sex)
          wid.app.$root.$refs['B0002006'][data.sex].model = [data.sex];
          }
           window.deptData = {wardName:data.wardName,wardCode:data.wardCode}
        },
        ///**烫伤等一批不良事件
        setDataType1(){
           console.log(this.selectedPatientData);
          let data = this.selectedPatientData[0];
          //inp_no 住院号
          if(wid.app.$root.$refs['B0017002'] && wid.app.$root.$refs['B0017002'].setCurrentValue){
            wid.app.$root.$refs['B0017002'].setCurrentValue(data.inpNo);
          }
          //床位号
          if(wid.app.$root.$refs['B0017001'] && wid.app.$root.$refs['B0017001'].setCurrentValue){
            wid.app.$root.$refs['B0017001'].setCurrentValue(data.bedLabel);
          }
          //姓名
          if(wid.app.$root.$refs['B0017003'] && wid.app.$root.$refs['B0017003'].setCurrentValue){
            wid.app.$root.$refs['B0017003'].setCurrentValue(data.name);
          }
          //性别
          // if(wid.app.$root.$refs['B0017025'] && wid.app.$root.$refs['B0017025'].setCurrentValue){
          //   wid.app.$root.$refs['B0017025'].setCurrentValue(data.sex);
          // }
          //年龄
          if(wid.app.$root.$refs['B0002004'] && wid.app.$root.$refs['B0002004'].setCurrentValue){
            wid.app.$root.$refs['B0002004'].setCurrentValue(data.age);
          }
          //诊断
          if(wid.app.$root.$refs['B0017008'] && wid.app.$root.$refs['B0017008'].setCurrentValue){
            wid.app.$root.$refs['B0017008'].setCurrentValue(data.diagnosis);
          }
          //职业
          if(wid.app.$root.$refs['B0017006'] && wid.app.$root.$refs['B0017006'].setCurrentValue){
            wid.app.$root.$refs['B0017006'].setCurrentValue(data.occupation);
          }
          //护理级别
          (!data.nursingClass || data.nursingClass=='') && (data.nursingClass='无');
          if(wid.app.$root.$refs['B0002005'] && wid.app.$root.$refs['B0002005'][data.nursingClass]){
            // wid.app.$root.$refs['B0017005'][data.nursingClass].$parent.checkboxValue=true
            //  wid.app.$root.$refs['B0017005'].checkValueRule(data.nursingClass);
            wid.app.$root.$refs['B0002005'][data.nursingClass].setCheckboxValue(data.nursingClass)
            wid.app.$root.$refs['B0002005'][data.nursingClass].model = [data.nursingClass];
            wid.app.$root.$refs['B0002005'][data.nursingClass].$parent.checkboxValue = [data.nursingClass];
          }
          //性别
          (!data.sex || data.sex=='') && (data.sex='无');
          if(wid.app.$root.$refs['B0002006'] && wid.app.$root.$refs['B0002006'][data.sex]){
           wid.app.$root.$refs['B0002006'][data.sex].$parent.checkboxValue=true;
           wid.app.$root.$refs['B0002006'][data.sex].setCheckboxValue(data.sex)
          wid.app.$root.$refs['B0002006'][data.sex].model = [data.sex];
          }
          window.deptData = {wardName:data.wardName,wardCode:data.wardCode}
        }
    }
}
</script>

<style lang="stylus" scoped>
</style>
