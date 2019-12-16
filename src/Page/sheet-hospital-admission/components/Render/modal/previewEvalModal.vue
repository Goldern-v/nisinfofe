<template>
  <sweet-modal ref="modalName" :title="title" @close="onClose">
    <div v-loading="loading">
      <iframe ref="previewModal" v-if="url" :src="url" frameborder="0"></iframe>
      <div v-if="loading == false && !url" class="aside">没有找到改患者的入院评估单</div>
    </div>

    <div slot="button">
      <el-button class="modal-btn" @click="print">打印</el-button>
      <el-button class="modal-btn" @click="$refs.modalName.close()">关闭</el-button>
      <!-- <el-button class="modal-btn" type="primary" @click="post">确认</el-button> -->
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
iframe {
  width: 100%;
  height: calc(100vh - 250px);
}
.aside {
  text-align: center;
  margin: 50px;
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import { groupList } from "@/api/patientInfo.js";
import { devFormUrl, formUrl } from "@/common/pathConfig/index.js";
import qs from "qs";
export default {
  props: {},
  mixins: [common],
  data() {
    return {
      url: "",
      loading: false,
      title: "预览"
    };
  },
  computed: {},
  methods: {
    open(obj, onOkCallBack) {
      // let patient = window.app.$store.getters.getCurrentPatient();
      let {
        id,
        patientId,
        visitId,
        name,
        sex,
        age,
        deptCode,
        deptName,
        diagnosis,
        bedLabel,
        inpNo,
        wardCode,
        wardName,
        admissionDate
      } = obj;
      let params = {
        id,
        patientId,
        visitId,
        name,
        sex,
        age,
        deptCode,
        deptName,
        diagnosis,
        bedLabel,
        inpNo,
        wardCode,
        wardName,
        admissionDate
      };
      this.loading = true;
      console.log("预览obj", [obj, params, onOkCallBack]);
      //
      this.title = this.isDev ? "预览 "+(id||''):"预览"
      //
      var appToken = "51e827c9-d80e-40a1-a95a-1edc257596e7";
      var authToken = this.authToken;
      var baseURL = this.isDev ? devFormUrl : formUrl;
      //
      groupList(patientId, visitId).then(res => {
        console.log("预览res", [res,res.data.data]);
        for (let item of res.data.data) {
          for (let o of item.formInstanceDtoList) {
            if (o.id == id) {
              let { pageUrl, formCode } = item;
              let {} = o;
              this.url =
                baseURL +
                "/" +
                pageUrl +
                "?" +
                qs.stringify(params) +
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
        this.loading = false;
      });
      // this.id = id;
      // this.onOkCallBack = onOkCallBack;
      this.$refs.modalName.open();
    },
    post() {
      this.onOkCallBack && this.onOkCallBack();
      this.$refs.modalName.close();
    },
    print(){
        // console.log('$refs.previewModal',[this.$refs.previewModal.contentWindow])
        this.$refs.previewModal.contentWindow.print()
    },
    onClose() {
      this.url = "";
    }
  },
  components: {}
};
</script>
