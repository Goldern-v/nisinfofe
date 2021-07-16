<template>
  <SweetModal
    ref="sweetModal"
    :title="title || ' '"
    :modal-width="modalWidth"
    class="custom-sweet-modal"
  >
    <nursingDocumentation></nursingDocumentation>
    <el-button slot="button" type="primary" @click="retest">确定</el-button>
  </SweetModal>
</template>

<script>
import nursingDocumentation from '@/Page/nursing-documentation/nursing-documentation'
import bus from "vue-happy-bus";
export default {
    components: {
        nursingDocumentation
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

          if(wid.app.$root.$refs['inp_no'] && wid.app.$root.$refs['inp_no'].setCurrentValue){
            wid.app.$root.$refs['inp_no'].setCurrentValue(data.inpNo);
          }
          if(wid.app.$root.$refs['bed_no'] && wid.app.$root.$refs['bed_no'].setCurrentValue){
            wid.app.$root.$refs['bed_no'].setCurrentValue(data.bedLabel);
          }
          if(wid.app.$root.$refs['name'] && wid.app.$root.$refs['name'].setCurrentValue){
            wid.app.$root.$refs['name'].setCurrentValue(data.name);
          }
          if(wid.app.$root.$refs['sex'] && wid.app.$root.$refs['sex'].setCurrentValue){
            wid.app.$root.$refs['sex'].setCurrentValue(data.sex);
          }
          if(wid.app.$root.$refs['age'] && wid.app.$root.$refs['age'].setCurrentValue){
            wid.app.$root.$refs['age'].setCurrentValue(data.age);
          }
          if(wid.app.$root.$refs['hzzd'] && wid.app.$root.$refs['hzzd'].setCurrentValue){
            wid.app.$root.$refs['hzzd'].setCurrentValue(data.diagnosis);
          }

          if (
             data.admissionDate &&
            wid.app.$root.$refs['rysj_explain'] &&
            wid.app.$root.$refs['rysj_explain'].$parent
          ) {
            wid.app.$root.$refs['rysj_explain'].$parent.datePickerValue = data.admissionDate;
          }


          wid.formObj.model['patient_id'] = data.patientId;//病人id
          wid.formObj.model['visit_id'] = data.visitId;//住院次数

          let wardName = data.wardName,wardCode = data.wardCode;
          if(this.HOSPITAL_ID == 'nys' || this.HOSPITAL_ID == 'huadu'){
            // 读当前登录人的信息
            let user =localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : {};
            wardName = user.deptName;
            wardCode = user.deptCode;
          }

          if(wid.app.$root.$refs['ward_name'] && wid.app.$root.$refs['ward_name'].setCurrentValue){
            wid.app.$root.$refs['ward_name'].setCurrentValue(wardName);
          }
          wid.formObj.model['ward_code'] = wardCode;

          this.close();
        }
    }
}
</script>

<style lang="stylus" scoped>
</style>
