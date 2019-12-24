<template>
  <sweet-modal ref="modalName" title="标题" @close="onClose" :modalWidth="1220">
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
      let path = this.isDev
        ? "http://localhost:4889/sheet-print.html"
        : "crNursing/sheet-print";
      return `${path}?id=${this.id}&showType=lastTowPage&appToken=51e827c9-d80e-40a1-a95a-1edc257596e7&token=${this.authToken}`;
    }
  },
  methods: {
    open(patientObj, onOkCallBack) {
      console.log(patientObj, "patientObj");
      blockList(
        patientObj.patientId,
        patientObj.visitId,
        patientObj.deptCode
      ).then(res => {
        if (res.data.data.list.length == 0)
          this.$message.warning("该患者没有护记");
        this.id = res.data.data.list[res.data.data.list.length - 1].id;
        this.onOkCallBack = onOkCallBack;
        this.$refs.modalName.open();
      });
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
