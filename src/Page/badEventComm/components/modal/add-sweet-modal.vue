<template>
  <SweetModal
    ref="sweetModal"
    :title="title || ' '"
    :modal-width="modalWidth"
    class="custom-sweet-modal"
  >
    <patientDist></patientDist>
    <el-button slot="button" type="primary" @click="retest">确定</el-button>
  </SweetModal>
</template>

<script>
import patientDist from "@/containers/patient-list/patient-list"
import bus from "vue-happy-bus";
export default {
  components: {
    patientDist
  },
  data() {
    return {
      title: "",
      modalWidth: 1300,
      bus: bus(this),
      selectedPatientData: {}
    };
  },
  created() {
    this.bus.$on("selectedPatient", (data) => {
      this.selectedPatientData = data;
    });
  },
  mounted() {},
  methods: {
    open() {
      this.$refs.sweetModal.open();
    },
    close() {
      this.$refs.sweetModal.close();
    },
    retest() {
      let data = this.selectedPatientData[0];
      const itemDataMap = {
        wardCode: data.wardCode,
        wardName: data.wardName,
        name: data.name,
        sex: data.sex,
        bedNo: data.bedNo || data.bedLabel,
        inpNo: data.inpNo
      };
      this.$emit("updataeBaseUser", itemDataMap);
      this.close();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
