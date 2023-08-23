<template>
  <div class="content" v-loading="pageLoading">

    <null-bg v-if="show"></null-bg>
    <!-- <iframe id="iframeId" src="https://www.jianshu.com/p/b8d45314a495" frameborder="0" class="emr-pdf" :style="{height:height}"></iframe> -->
    <iframe
      ref="iframe"
      :src="fileUrl"
      frameborder="0"
      class="emr-pdf"
      :style="{height:height}"
      v-else
      @load="onload" />
      <!-- 沙盒特性 -->
      <!-- sandbox="allow-scripts" -->
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import nullBg from "@/components/null/null-bg";
import { getPatient360View } from './../../api';
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {
      fileUrl: "",
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
    let vid=window.app.$store.state.patient.currentPatient.inpNo;
    const currentPatient=window.app.$store.state.patient.currentPatient;//patientId
    let cutInpNo = vid && vid.split('_')[0]
    if(this.HOSPITAL_ID && vid){
      this.show = false;
      //const personInfoUrl="http://172.16.8.41:5402";
      switch(this.HOSPITAL_ID){
        case "huadu":
          //this.fileUrl = `/newCrNursing/personInfoUrl/?vid=${vid}&vidType=02&appId=360&security=123#/personInfo`;
          //this.fileUrl = `http://172.16.8.41:5402/?vid=${vid}&vidType=02&appId=360&security=123#/personInfo`;
          this.fileUrl = `http://172.16.8.135:9092/?vid=${vid}&vidType=02&appId=360&security=123#/personInfo`;
          break;
        case "fuyou":
          this.fileUrl = `http://192.168.19.198:8282/templates/medicalRecord/medicalRecordViewPreview.html?embedded-view=true&req_no=${currentPatient.patientId}&type=2`;
          break;
        // case "foshanrenyi":
        //   this.fileUrl = `http://hz360.fsyyy.com:8081/cdr/personal/?patientId=${currentPatient.patientId}&visitNumber=1&systemcode=HLXT&doctorcode=${JSON.parse(localStorage.user).empNo}&oporIp=IP`;
        //   break;
        case "lyxrm":
        case "liaocheng":
        case "stmz":
        case "whhk":
          this.getUrl();
          break;
        case "nanfangzhongxiyi":
          this.fileUrl = `http://10.158.220.54:8081/view/#/timeline?patientNo=${this.$route.query.inpNo}&visitTypeCode=03&doctorCode=${this.$route.query.doctorCode}&doctorName=${this.$route.query.doctorName}`;
          break;
        case "nfyksdyy":
          this.fileUrl = `http://192.168.5.74:8000/cdr-c/cdrView.do?type=102&attribute=${cutInpNo}&emplCode=${this.empNo}&authCode=df10814b-fa20-4978-5782-587c6f54f8e7&module=`;
          break;
        default:
          break;
      }
    }
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return this.wih - 146 + "px";
    },
  },
  methods: {
    onload() {
      let wid = this.$refs.iframe.contentWindow;
      setTimeout(() => {
        wid.document.getElementById("toolbar").style.display = "none";
      }, 2000);
    },
    //获取url
    getUrl(){
      const currentPatient=window.app.$store.state.patient.currentPatient;//patientId
      console.log('currentPatient', currentPatient)
      getPatient360View(currentPatient.patientId, currentPatient.visitId).then(res=>{
        try {
          this.fileUrl=res.data.data.url;
        } catch (error) {
          console.log(error)
        }
      }).catch(error=>{
        console.log(error)
      })
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

