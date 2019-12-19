<template>
  <div class="content">
    <null-bg v-if="show"></null-bg>
    <!-- <iframe id="iframeId" src="http://119.145.71.86:9801/hcres/emr_pdf/1342087_1/A.17.pdf" frameborder="0" class="emr-pdf" :style="{height:height}" v-if="!show"></iframe> -->
    <iframe
      ref="iframe"
      :src="fileUrl"
      frameborder="0"
      class="emr-pdf"
      :style="{height:height}"
      v-if="!show"
      @load="onload"
    ></iframe>
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import nullBg from "@/components/null/null-bg";
export default {
  data() {
    return {
      fileUrl: null,
      bus: bus(this),
      show: true
    };
  },
  props: {
    regions: Array
  },
  components: {
    nullBg
  },
  created() {
    this.bus.$on("openDoctorEmr", fileUrl => {
      this.fileUrl = fileUrl;
      this.show = false;
    });
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return this.wih - 146 + "px";
    }
  },
  methods: {
    onload() {
      let wid = this.$refs.iframe.contentWindow;
      setTimeout(() => {
        wid.document.getElementById("toolbar").style.display = "none";
      }, 2000);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.emr-pdf {
  width: 100%;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
}
</style>

