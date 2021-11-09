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
      //更新用户基本数据
        updataeBaseUser(){
          this.$emit("updataeBaseUser",this.selectedPatientData[0])
        },
        open(){
            this.$refs.sweetModal.open();
        },
        close(){
          this.$refs.sweetModal.close();
        },
        retest(){
          console.log(this.$route.params.name)
            let findItem=formTypeList.find(item=>item.badEventName==this.$route.params.name);//查询当前不良事件类型
            (!findItem) && (findItem=formTypeList[0]);
            // switch(findItem.funType){
            //   case 'type0':
            //       this.setDataType0();
            //       break;
            //   case 'type1':
            //       this.setDataType1();
            //       break;
            //   default:
            //       this.setDataType0();
            //       break;
            // }
            this.updataeBaseUser(this.selectedPatientData[0]);
          this.close();
        },
    }
}
</script>

<style lang="stylus" scoped>
</style>
