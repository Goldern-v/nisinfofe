<template>
  <div>
    <boxBase
      :title="`留言板${isSave ? '': `<span style='color: red'>（未保存）</span>`}`"
      :icon="require('../images/留言板.png')"
    >
      <span slot="head-tool" @click.stop="saveData">保存</span>
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <el-input type="textarea" autosize v-model="data.message"></el-input>
      </div>
    </boxBase>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con {
  padding: 17px 22px 22px;
  box-sizing: border-box;
  // min-height 220px
  overflow: hidden;
  height: calc(100vh - 120px);

  >>> {
    textarea, .el-textarea {
      height: 100% !important;
      width: 100%;
      min-height: 150px !important;
      resize: none;
    }
  }
}
</style>
<script>
import boxBase from "../base/box-base.vue";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
export default {
  mixins: [common],
  props: {
    data: {
      type: Object,
      default: {}
    }
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
      this.pageLoading = true;
      this.update(this.data.message).then(res => {
        this.$message.success("保存成功");
        this.isSave = true;
        this.pageLoading = false;
      });
    }
  },
  computed: {
    message() {
      return this.data.message;
    }
  },
  watch: {
    'data.message'(newVal,oldVal) {
      if(newVal && oldVal){
        this.isSave = false;
      }
    }
  },
  components: {
    boxBase
  }
};
</script>
