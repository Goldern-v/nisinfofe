<template>
  <div>
    <div class="header">
      <span>历次就诊数：</span>
      <el-select
        v-model="visitIdValue"
        placeholder="请选择历次就诊数"
        @change="handleVisit(2)"
      >
        <el-option
          v-for="(item, index) in query.visitId"
          :key="index"
          :label="index + 1"
          :value="index + 1"
        >
        </el-option>
      </el-select>
    </div>
      <iframe
      frameborder="0"
      class="visit-iframe"
      v-if="url"
      :src="url"
      ref="iframeVisit"
      :style="{height: iframeHeight}"
    ></iframe>
  </div>
</template>
<script>
import common from "@/common/mixin/common.mixin.js";
export default {
  mixins:[common],
  props: {},
  data() {
    return {
      visitIdValue: this.$route.query.visitId,
      url:"",
    };
  },
  created() {
    this.query = this.$route.query;
    let { origin } = window.location
    this.url = `${origin}/nursingPreview?patientId=${this.$route.query.patientId}&visitId=${this.$route.query.visitId}&nursingPreviewIsShow=1`
  },
  computed: {
    query: {
      get() {
        let query = this.$route.query;
        return query;
      },
      set() {}
    },
    iframeHeight(){
      return this.wih - 210 + 'px'
    }
  },
  methods: {
    handleVisit(value) {
      this.url = '';
      this.visitIdValue = value;
      let { origin } = window.location
      this.url = `${origin}/nursingPreview?patientId=${this.query.patientId}&visitId=${value}&nursingPreviewIsShow=1`
      console.log(this.url);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  padding: 0 20px;
  display: flex;
  background-color: #fff;
  box-shadow: 1 1 1 1 #000;
  align-items: center;
}
.visit-iframe {
  width: 100%;
  // min-height: 600px;
  overflow: hidden;
}
</style>
