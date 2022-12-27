<template>
  <sweet-modal ref="modalName" title="检查报告" class="modal-con" >
    <!-- 佛山从护记进入是可以回填数据,去护记的特殊情况 -->
    <!-- 新医院注意 -->
     <template v-if="['foshanrenyi', 'lyxrm', 'whhk', '925','zhzxy', 'stmz'].includes(HOSPITAL_ID) && hasFeature">
      <inspectFSRY @closeSweet='close'></inspectFSRY>
    </template>
    <template v-else>
       <inspect></inspect>
    </template>

  </sweet-modal>
</template>
<style lang="stylus" scoped>
.modal-con
  >>>.sweet-content
    max-height 100vh
  >>>.content
    overflow hidden
    margin: 0 0 10px
  >>>.sweet-content
    background #F0f0f0
</style>
<script>
import inspect from "@/Page/patientInfo/supPage/inspect/inspect";
import inspectFSRY from "@/Page/patientInfo/supPage/inspect/inspectFSRY";
import bus from "vue-happy-bus";
export default {
  props: {},
  data() {
    return {
      hasFeature:false,
      bus: bus(this)
    };
  },
  methods: {
    open(feature) {
      if(feature){
        this.hasFeature=true
        this.$refs.modalName.setCloseCallback(()=>{
          this.bus.$emit("openclosePatientInfo",'',true)
        })
      }
      this.$refs.modalName.open();
    },
    post() {},
    close(){
       this.hasFeature=false
       this.$refs.modalName.close();
    }
  },
  components: {
    inspect,
    inspectFSRY
  }
};
</script>
