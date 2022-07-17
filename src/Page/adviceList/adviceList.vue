<template>
    <div class="advice-list body-con">
        <div class="left-part">
            <patientList
            toName="adviceItem"
            :callFunction="isSelectPatient"
            />
        </div>
        <div 
            class="right-part"
            :style="{ marginLeft: openLeft ? '200px' : '0' }"
        >
            <adviceGuizhou />
        </div>
    </div>
</template>
<style lang='scss' scoped>
.advice-list{
    height: calc(100vh - 60px);
}
.body-con {
    position: relative;

    .left-part {
      width: 199px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
</style>


<script>
import patientList from "@/components/patient-list/patient-list-make-guizhou.vue";
import adviceGuizhou from '@/Page/patientInfo/supPage/advice_guizhou/advice'
export default {
props: {},
data() {
return {};
},
methods: {
    isSelectPatient(item) {
      this.$store.commit("upPatientInfo", item);
    },
},
computed:{
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
},
components: {
    patientList,
    adviceGuizhou
}
};
</script>