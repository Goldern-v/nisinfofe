<template>
  <div>
    <schedulingTool></schedulingTool>
    <patientList></patientList>
    <div class="main-content">
      <schecdulingTable v-if="inited"></schecdulingTable>
    </div>
    <editPatientModal ref="editPatientModal"></editPatientModal>
    <editShortTimeModal ref="editShortTimeModal"></editShortTimeModal>
  </div>
</template>

<script>
import schedulingTool from "./components/scheduling-tool/scheduling-tool";
import patientList from "./components/patient-list/patient-list";
import schecdulingTable from "./components/schecdulingTable/schecdulingTable";
import editPatientModal from "./modal/edit-patient-modal";
import editShortTimeModal from "./modal/edit-shortTime-modal";
import { model } from "./viewModel/model";
import { dataModel } from "./components/schecdulingTable/viewModel/dataModel";
import { layoutModel } from "./components/schecdulingTable/viewModel/layoutModel";
export default {
  data() {
    return {
      model,
      inited: false
    };
  },
  methods: {},
  async created() {
    await dataModel.initData();
    layoutModel.init();
    this.inited = true;
  },
  mounted() {
    model.editPatientModal = this.$refs.editPatientModal;
    model.editShortTimeModal = this.$refs.editShortTimeModal;
  },
  update() {
    model.editPatientModal = this.$refs.editPatientModal;
    model.editShortTimeModal = this.$refs.editShortTimeModal;
  },
  components: {
    schedulingTool,
    patientList,
    schecdulingTable,
    editPatientModal,
    editShortTimeModal
  }
};
</script>

<style lang='scss' scoped>
.main-content {
  position: fixed;
  top: 100px;
  left: 200px;
  bottom: 0;
  right: 0;
  overflow: auto;
}
</style>
