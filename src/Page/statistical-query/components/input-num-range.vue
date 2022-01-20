<template>
  <div class="input-num-range el-input__inner">
    <el-input-number v-bind="{...defProps, ...props}" v-model="editStart"/>
    <span>{{ rangeSeparator }}</span>
    <el-input-number v-bind="{...defProps, ...props}" v-model="editEnd"/>
  </div>
</template>
<style lang='scss' scoped>
.input-num-range {
  height: 30px;
  /deep/ .el-input-number {
    width: 44px;
    .el-input__inner {
      border: none;
      height: 22px;
      padding: 0px;
    }
  }
}
</style>
<script>
export default {
  name: 'InputNumRange',
  props: {
    rangeSeparator: {
      type: String,
      default: '-'
    },
    props: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Array,
      default: ()=> ([0, 0])
    }
  },
  computed: {
    editVal() {
      return [this.editStart, this.editEnd]
    }
  },
  watch: {
    value: {
      handler(v) {
        let [i0, i1] = v
       this.editStart = i0
       this.editEnd = i1
      },
      deep: true,
      immediate: true
    },
    editVal: {
      handler(v) {
        let [i0, i1] = v
        if (i0>i1) {
          this.$message({
            message: '起始数值不能大于结束数值',
            type: 'warning'
          })
          return
        }
        this.$emit('change', v)
      }
    }
  },
  data() {
    return {
      editStart: 0,
      editEnd: 0,
      defProps: {
        step: 1,
        size: 'small',
        controls: false,
        disabled: false,
        min: 0
      }
    };
  },
  methods: {
  },
  components: {}
};
</script>
