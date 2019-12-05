<template>
  <sweet-modal ref="modalName" title="标题" @close="onClose">
    <iframe v-if="id" :src="url" frameborder="0"></iframe>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
iframe {
  width: 100%;
  height: calc(100vh - 250px);
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
export default {
  props: {},
  mixins: [common],
  data() {
    return {
      id: "",
      onOkCallBack: null
    };
  },
  computed: {
    url() {
      let path = this.isDev
        ? "http://localhost:4889/sheet-print.html"
        : "crNursing/sheet-print";
      return `${path}?previewId=${this.id}&appToken=51e827c9-d80e-40a1-a95a-1edc257596e7&token=${this.authToken}`;
    }
  },
  methods: {
    open(id, onOkCallBack) {
      this.id = id;
      this.onOkCallBack = onOkCallBack;
      this.$refs.modalName.open();
    },
    post() {
      this.onOkCallBack();
      this.$refs.modalName.close();
    },
    onClose() {
      this.id = "";
    }
  },
  components: {}
};
</script>
