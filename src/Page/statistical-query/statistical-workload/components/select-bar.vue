<template>
<div class="select-bar">
  <el-radio-group v-model="type1">
    <el-radio-button v-for="(v, i) in type1List" :key="i" :label="v.key" :name="v.label">{{ v.label }}</el-radio-button>
  </el-radio-group>
  <div class="select-bar__block"></div>
  <el-radio-group v-show="type1 == searchKeyByCode(type1List, 'dept')" v-model="type2">
      <el-radio-button v-for="(v, i) in type2List" :key="i" :label="v.key" :name="v.label">{{ v.label }}</el-radio-button>
  </el-radio-group>
</div>
</template>
<style lang='scss' scoped>
.select-bar {
  display: flex;
  padding: 10px 15px 0px 15px;
  .select-bar__block {
    flex: 1
  }
}
</style>
<script>
import { WORKLOAD_BAR1, WORKLOAD_BAR2 } from '../../enums'
import { searchKeyByCode } from '@/utils/enums.js'
export default {
  props: {
    val1: {
      type: String,
      default: searchKeyByCode(WORKLOAD_BAR1, 'dept')
    },
    val2: {
      type: String,
      default: searchKeyByCode(WORKLOAD_BAR2, 'table')
    },
  },
  data() {
    return {
      type1: '',
      type2: '',
      type1List: WORKLOAD_BAR1,
      type2List: WORKLOAD_BAR2
    };
  },
  watch: {
    type1(v) {
      this.$emit('change',[v, this.type2])
    },
    type2(v) {
      this.$emit('change',[this.type1, v])
    },
    val1(v) {
      this.type1 = v
    },
    val2(v) {
      this.type2 = v
    },
  },
  mounted() {
    this.type1 = this.val1
    this.type2 = this.val2
  },
  methods: {
    searchKeyByCode,
  },
  components: {}
};
</script>
