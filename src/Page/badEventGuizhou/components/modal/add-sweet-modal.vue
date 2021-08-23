<template>
  <SweetModal
    ref="sweetModal"
    :title="title || ' '"
    :modal-width="modalWidth"
    class="custom-sweet-modal"
  >
  <div>辅导辅导</div>
    <!-- <nursingDocumentation></nursingDocumentation> -->
    <patientDist></patientDist>
    <el-button slot="button" type="primary" @click="retest">确定</el-button>
  </SweetModal>
</template>

<script>
import nursingDocumentation from '@/Page/nursing-documentation/nursing-documentation'
import patientDist from "@/containers/patient-list/patient-list"
import bus from "vue-happy-bus";
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
            wid.app.$root.$refs['B0002005'][data.nursingClass].$parent.checkboxValue=true
          }
          //性别
          (!data.sex || data.sex=='') && (data.sex='无');
          if(wid.app.$root.$refs['B0002006'] && wid.app.$root.$refs['B0002006'][data.sex]){
           wid.app.$root.$refs['B0002006'][data.sex].$parent.checkboxValue=true
          }
          //wid.app.$root.$refs['B0002006']['无'].$parent.checkboxValue=true

          this.close();
        }
    }
}
</script>

<style lang="stylus" scoped>
</style>
