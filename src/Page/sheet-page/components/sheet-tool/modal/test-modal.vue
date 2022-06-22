<template>
  <sweet-modal ref="modalName" title="检验报告" class="modal-con" >
    <!-- 佛山从护记进入是可以回填数据,去护记的特殊情况 -->
    <template v-if="HOSPITAL_ID == 'foshanrenyi'&& hasFeature">
       <testFSRY></testFSRY>
    </template>
    <template v-else>
       <test></test>
    </template>
    <!-- <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()"
        >取消</el-button
      >
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div> -->
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
  >>>.body
    padding: 20px 20px 40px !important
</style>
<script>
import test from "@/Page/patientInfo/supPage/test/test";
import testFSRY from "@/Page/patientInfo/supPage/test/testFSRY";
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
    test,
    testFSRY
  }
};
</script>
