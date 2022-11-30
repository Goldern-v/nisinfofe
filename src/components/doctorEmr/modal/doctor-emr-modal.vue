<template>
  <sweet-modal ref="modalName" title="病历" class="modal-con" :colseShadow="['zhzxy','fsxt'].includes(HOSPITAL_ID)"  :modalWidth="['zhzxy','fsxt'].includes(HOSPITAL_ID) ? 1200 : 0" v-dialogDrag>
    <doctorEmr></doctorEmr>
    <!-- <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()"
        >取消</el-button
      >
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>-->
  </sweet-modal>
</template>
<style lang="stylus" scoped>
.modal-con {
  >>>.sweet-content {
    max-height: 90vh;
  }

  >>>.content {
    overflow: hidden;
    margin: 0 0 10px;
  }

  >>>.sweet-content {
    background: #F0f0f0;
  }

  >>>.body {
    padding: 20px 20px 40px !important;
  }
}
</style>
<script>
import doctorEmr from "@/Page/patientInfo/supPage/doctorEmr/doctorEmr";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    open() {
      this.$refs.modalName.open();
    },
    post() {}
  },
  components: {
    doctorEmr
  }
};
</script>
