<template>
<div class="select-bar">
  <el-radio-group v-model="type1">
    <el-radio-button v-for="(v) in type1List" :key="v.key" :label="v.code" :name="v.code">{{ v.label }}</el-radio-button>
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
import { INCREASE_SELECT } from '../../enums'
import { searchKeyByCode } from '@/utils/enums.js'
export default {
  props: {
    val1: {
      type: String,
      default: searchKeyByCode(INCREASE_SELECT, 'order_execution')
    },
  },
  data() {
    return {
      type1: 'order_execution',
      type1List: INCREASE_SELECT
    };
  },
  watch: {
    type1(v) {
      this.$emit('change',v)
    },
    val1(v) {
      this.type1 = v
    },
  },
  mounted() {
    this.type1 = this.val1
  },
  methods: {
    searchKeyByCode,
  },
  components: {}
};
</script>
