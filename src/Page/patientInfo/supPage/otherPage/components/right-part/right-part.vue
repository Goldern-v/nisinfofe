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
    // this.bus.$on("openDoctorEmr", fileUrl => {
    //   this.fileUrl = fileUrl;
    //   this.show = false;
    // });
    // window.addEventListener("message", (data)=>{
    //   console.log(data);
    // }, false);
    let vid=window.app.$store.state.patient.currentPatient.inpNo
    if(this.HOSPITAL_ID && vid){
      this.show = false;
      //const personInfoUrl="http://172.16.8.41:5402";
      switch(this.HOSPITAL_ID){
        case "huadu":
          this.fileUrl = `/personInfoUrl/?vid=${vid}&vidType=02&appId=360&security=123#/personInfo`;
           //this.fileUrl = `http://172.16.8.41:5402/?vid=${vid}&vidType=02&appId=360&security=123#/personInfo`;
          break;
        case "fuyou":
          this.fileUrl = `http://192.168.19.198:8282/templates/medicalRecord/medicalRecordViewPreview.html?embedded-view=true&req_no=${vid}&type=2`;
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
    }
  },
  methods: {
    onload() {
      let wid = this.$refs.iframe.contentWindow;
      setTimeout(() => {
        wid.document.getElementById("toolbar").style.display = "none";
      }, 2000);
    },
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.emr-pdf {
  width: 100%;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
}
</style>

