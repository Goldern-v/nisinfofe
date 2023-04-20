<template>
  <div>
    <div class="header">
      <span>历次就诊数：</span>
      <el-select
        v-model="visitIdValue"
        placeholder="请选择历次就诊数"
        @change="handleVisit"
      >
        <el-option
          v-for="(item, index) in list"
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
      visitIdValue: parseInt(this.$route.query.visitId),
      list: parseInt(this.$route.query.visitId),
      url:"",
    };
  },
  created() {
    let { origin } = window.location
    this.url = `${origin}/crNursing/nursingPreview?patientId=${this.$route.query.patientId}&visitId=${this.$route.query.visitId}&nursingPreviewIsShow=1`
  },
  computed: {
    iframeHeight(){
      return this.wih - 160 + 'px'
    }
  },
  methods: {
    handleVisit(value) {
      this.url = '';
      this.visitIdValue = value;
      let { origin } = window.location
      this.url = `${origin}/crNursing/nursingPreview?patientId=${this.$route.query.patientId}&visitId=${value}&nursingPreviewIsShow=1`
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
