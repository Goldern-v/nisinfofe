<template>
  <div class="contain">
    <topPart v-if="isNewPage"></topPart>
    <bottomPart></bottomPart>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 20px 20px 0
</style>
<script>
import topPart from './components/top-part/top-part'
import bottomPart from './components/bottom-part/bottom-part'
import { getPatientInfo } from "@/api/common.js";
  export default {
    data() {
      return {
        msg: 'hello vue',
        isNewPage:true,
      }
    },
    created(){
      getPatientInfo(this.$route.query.patientId,
        this.$route.query.visitId).then((res)=>{
          this.query = res.data.data;
        Object.assign(this.$route.query, this.query);
        // getPatientInfo
        window.app.$store.commit(
          "upCurrentPatientObj",
          JSON.parse(JSON.stringify(this.query))
        );
        if (this.query.wardCode && this.query.deptName) {
          this.$store.commit("upDeptCode", this.query.wardCode);
          localStorage.selectDeptValue = this.query.wardCode;
          this.$store.commit("upDeptName", this.query.wardName);
        }
        this.isNewPage = false
        setTimeout(()=>{
          this.isNewPage = true
        })
      })
    },
    components: {
      topPart, bottomPart
    }
  }
</script>
