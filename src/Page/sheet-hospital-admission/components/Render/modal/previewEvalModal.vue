<template>
  <sweet-modal ref="modalName" title="标题" @close="onClose">
    <iframe v-if="url" :src="url" frameborder="0"></iframe>
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
import { groupList } from "@/api/patientInfo.js";
export default {
  props: {},
  mixins: [common],
  data() {
    return {
      url: ""
    };
  },
  computed: {},
  methods: {
    open(obj, onOkCallBack) {
      let { id, patientId, visitId } = obj;
      groupList(patientId, visitId).then(res => {
        for (let item of res.data.data) {
          for (let o of item.formInstanceDtoList) {
            if (o.id == id) {
              let { pageUrl } = item;
              let { formCode } = o;
              var appToken = "51e827c9-d80e-40a1-a95a-1edc257596e7";
              var authToken = this.authToken;
              var baseURL = this.isDev
                ? "http://120.25.105.45:9864/crNursing"
                : "/crNursing";
              this.url =
                baseURL +
                "/formUrl/" +
                pageUrl +
                "?id=" +
                id +
                "&patientId=" +
                patientId +
                "&visitId=" +
                visitId +
                "&formCode=" +
                formCode +
                "&showToolBar=false&isPrint=true" +
                "&token=" +
                "App-Token-Nursing%3D" +
                appToken +
                "%26Auth-Token-Nursing%3D" +
                authToken;
              break;
            }
          }
        }
      });
      // this.id = id;
      // this.onOkCallBack = onOkCallBack;
      this.$refs.modalName.open();
    },
    post() {
      this.onOkCallBack && this.onOkCallBack();
      this.$refs.modalName.close();
    },
    onClose() {
      this.url = "";
    }
  },
  components: {}
};
</script>
