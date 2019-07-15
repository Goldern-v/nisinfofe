<template>
  <div>
    <leftPart></leftPart>
    <div class="right-part" :style="{marginLeft: openLeft?'200px':'0'}">
      <!-- <topPart></topPart> -->
      <component :is="switchCompt()" />
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .right-part
    transition: all .4s cubic-bezier(.55, 0, .1, 1)
</style>
<script>
import topPart from "@/Page/patientInfo/supComponts/topPart"; // 东莞市厚街医院
import topPartWeiXian from "@/Page/patientInfo/supComponts/topPart_WeiXian"; // 威县人民医院
import leftPart from "@/Page/patientInfo/supComponts/leftPart";
export default {
  data() {
    return {
      open: false,
      url: "",
      refresh: false
    };
  },
  computed: {
    openLeft() {
      return this.$store.state.common.openLeft;
    }
  },
  created() {
    // 修改高度
    this.$store.commit("upWihInPatient");
    window.onresize = () => {
      this.$store.commit("upWihInPatient");
    };
  },
  methods: {
    // openNewFormBoxClean(box){
    //   this.$refs.openNewFormModal.open(box)
    // },
    // 依据医院名字，标题组件切换
    switchCompt(HisName = process.env.HOSPITAL_NAME) {
      let hisList = {
        威县人民医院: "topPartWeiXian",
        东莞市厚街医院: "topPart"
      };
      return hisList[HisName] || "topPart";
    }
  },
  mounted() {
    try {
      document.getElementById("hl-nav-con").style.display = "none";
    } catch (e) {}
    // this.bus.$on('openNewFormBoxClean', this.openNewFormBoxClean)
  },
  beforeDestroy() {
    try {
      document.getElementById("hl-nav-con").style.display = "block";
    } catch (e) {}
  },
  components: {
    topPart,
    topPartWeiXian,
    leftPart
  }
};
</script>
