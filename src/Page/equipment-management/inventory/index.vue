<template>
  <div class="critical-value">
    <div class="tab">
      <el-radio-group v-model="cut" size="small">
        <el-radio-button label="设备列表"></el-radio-button>
        <el-radio-button label="设备类别"></el-radio-button>
      </el-radio-group>
    </div>
    <component :is="table"></component>
  </div>
</template>

<script>
import EquipmentListTable from "./equipmentList/table";
import EquipmentTypeTable from "./equipmentType/table";

export default {
  components: {
    EquipmentListTable,
    EquipmentTypeTable
  },
  data() {
    return {
      cut: '设备列表',
    };
  },
  computed: {
    table() {
      if (this.cut === '设备列表')  return EquipmentListTable
      else return EquipmentTypeTable
    }
  }
};
</script>

<style lang="scss" scoped>
.critical-value {
  height: calc(100vh - 81px);
  margin: 10px;
  background-color: #fff;
}
.tab{
  padding: 10px 0 0 30px;
}
</style>
