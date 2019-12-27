<template>
  <sweet-modal ref="modalName" class="satisfy-modal-1577412732265" title="满意度调查表" @close="onClose" :modalWidth="415">
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
  height: calc(100vh - 260px);
  margin-bottom: -6px;
}
</style>
<style lang='scss'>
.satisfy-modal-1577412732265 .sweet-content{
  padding: 0;
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import { blockList } from "@/Page/sheet-page/api/index.js";
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
      return `http://dghjns.cr-health.com:9091/crNursing/missionPublicAccount/#/healthQuestionnaire?id=${this.id}&readonly=true`;
    }
  },
  methods: {
    open(id, onOkCallBack) {
      this.id = id;
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
