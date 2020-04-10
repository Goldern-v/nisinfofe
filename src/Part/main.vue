<template>
  <div>
    <!-- <HLheader></HLheader> -->
    <component :is="switchCompt()" />
    <router-view></router-view>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped></style>
<script>
import HLheader from "@/components/HLheader/HLheader"; // 东莞市厚街医院
import WeiXianHeader from "@/components/HLheader/WeiXianHeader"; // 威县人民医院
import LingChengHeader from "@/components/HLheader/LingChengHeader"; // 威县人民医院
export default {
  data() {
    return {
      msg: "hello vue"
    };
  },
  created() {},
  methods: {
    // 依据医院名字，标题组件切换
    switchCompt(HisName = process.env.HOSPITAL_NAME) {
      let hisList = {
        威县人民医院: "WeiXianHeader",
        东莞市厚街医院: "HLheader",
        德州市陵城区人民医院: "LingChengHeader"
      };
      return hisList[HisName] || "HLheader";
    }
  },
  components: {
    HLheader,
    WeiXianHeader,
    LingChengHeader
  }
};
</script>
