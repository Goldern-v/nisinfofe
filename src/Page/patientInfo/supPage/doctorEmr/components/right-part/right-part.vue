<template>
  <div class="content" v-loading="pageLoading">
    <null-bg v-if="show && !content"></null-bg>
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
    <div v-if="content" v-html="content" style="text-align: justify;line-height: 1.5;"></div>
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import nullBg from "@/components/null/null-bg";
import { getDoctorEmr } from "../../api/index";
export default {
  data() {
    return {
      fileUrl: null,
      content:"",
      bus: bus(this),
      show: true,
      pageLoading: false
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

    if(this.HOSPITAL_ID == 'huadu'){
      this.show = false;
      console.log(this.$route.query)
      console.log("this.$route.query")
      // this.fileUrl = `http://172.16.4.53/EmrView/Index.aspx?hospital_no=45539427X44011411A1001&patient_id=${this.$route.query.inpNo}`;
      this.fileUrl = `http://172.16.4.53/EmrView/Index.aspx?hospital_no=45539427X44011411A1001&patient_id=${this.$route.query.inpNo}&visitId=${this.$route.query.visitId}`;
      // this.getTreeData();
    }
    if(this.HOSPITAL_ID == 'hj'){
      this.bus.$on("openContent", content => {
        this.content =content
      })
    }
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
    },
     getTreeData() {
      this.pageLoading = true;
      Promise.all([
        // getDoctorEmr(this.$route.query.patientId, this.$route.query.visitId)
      ])
        .then(res => {
          let data = res[0].data.data;
          if(data['其他记录'] && data['其他记录'][0]){
            this.fileUrl = data['其他记录'][0]['expand1'];
          }
          this.pageLoading = false;
        })
        .then(res => {
        });
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

