<template>
  <div class="select-bar">
    <el-radio-group v-model="type">
      <el-radio-button label="1" name="中医">中医</el-radio-button>
      <el-radio-button label="2" name="西医">西医</el-radio-button>
    </el-radio-group>
    <div class="select-bar__block"></div>
    <el-button
      type="warning"
      icon="setting"
      @click="openExportSetting"
    ></el-button>
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
  export default {
    props: {
      chineseOrWest: {
        type: String,
        default: "1"
      },
      tableOrChart: {
        type: String,
        default: () => 'table'
      },
      onSetting: {
        type: Function,
      }
    },
    data() {
      return {
        type: '',
      };
    },
    watch: {
      type(v) {
        this.$emit('change', v)
      },
      chineseOrWest(v) {
        this.type = v
      },
    },
    mounted() {
      this.type = this.chineseOrWest
    },
    methods: {
      openExportSetting() {
        this.onSetting && this.onSetting()
      }
    },
    components: {}
  };
</script>
