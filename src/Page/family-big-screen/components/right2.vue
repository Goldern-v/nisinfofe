<template>
  <div>
    <boxBase
      :title="`温馨提示：${isSave ? '': `<span style='color: red'>（未保存）</span>`}`"
    >
      <span slot="head-tool" @click.stop="saveData">保存</span>
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <el-input type="textarea" autosize v-model="data.message"></el-input>
      </div>
    </boxBase>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  padding 17px 22px 22px
  box-sizing border-box
  // min-height 220px
  overflow hidden
  height calc(100vh - 120px)
  >>>
    textarea, .el-textarea
      height 100% !important
      width 100%
      min-height 150px !important
      resize none
</style>
<script>
import boxBase from "../base/box-base.vue";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
export default {
  mixins: [common],
  props: {
    data: Object
  },
  inject: ["update"],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      isSave: true
    };
  },
  created() {},
  methods: {
    saveData() {
      this.update(this.data.message).then(res => {
        this.$message.success("保存成功");
        this.isSave = true;
      });
    }
    // blur() {
    //   setTimeout(() => {
    //     this.$message.warning("记事本未保存，注意保存，以免数据丢失");
    //   }, 100);
    // }
  },
  computed: {
    message() {
      return this.data.message;
    }
  },
  watch: {
    message() {
      this.isSave = false;
    }
  },
  components: {
    boxBase
  }
};
</script>
