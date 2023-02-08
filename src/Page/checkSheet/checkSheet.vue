<template>
  <div class="content-main">
    <div class="table-mian">
    <top :deptCode="deptCode"></top>
    <checkSheetTable v-if="!isEmpty"></checkSheetTable>
    <Placeholder v-else icon="el-icon-plus"  @click="onCreateModalOpen($route.params.code)">创建医嘱查对登记表</Placeholder>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-main {
    height: 100vh;
  display: flex;
  .table-mian{
    width: 100%;
  }
  .left{
    width: 200px;
    height: 100%;
  }
}
</style>
<script>
import checkSheetTable from "./components/checkSheetTable.vue";
import Placeholder from "./components/placeholder.vue";
import top from "./components/top.vue";
export default {
  inject: [
    "getFullPage",
    "reloadSideList",
    "onCreateModalOpen",
    "onToggleFullPage"
  ],
  props: {},
  data() {
    return {
      isEmpty: true
    };
  },
  computed:{
    deptCode(){
        return this.$store.state.lesion.deptCode;
    }
  },
  methods: {
  },
  components: {
    checkSheetTable,
    Placeholder,
    top,
  }
};
</script>
