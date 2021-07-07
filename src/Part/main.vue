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
import HuaDuHeader from "@/components/HLheader/HuaDuHeader"; // 广州市花都区人民医院
import WuJingHeader from "@/components/HLheader/WuJingHeader"; // 广州市花都区人民医院
import FuYouHLheader from "@/components/HLheader/FuYouHLheader"; // 江门市妇幼保健院
import LiaoChengHeader from "@/components/HLheader/LiaoChengHeader"; // 聊城市第二人民医院
import ZhongShanQiHeader from "@/components/HLheader/ZhongShanQiHeader"; // 中山大学附属第七医院
import HengLiHeader from "@/components/HLheader/HengLiHeader"; // 东莞市横沥医院
import XieGangHeader from "@/components/HLheader/XieGangHeader"; // 东莞市谢岗医院
import ShanNanHeader from "@/components/HLheader/ShanNanHeader"; // 山南市人民医院
import BeiHaiRenYiHeader from "@/components/HLheader/BeiHaiRenYiHeader"; // 北海人医
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
        德州市陵城区人民医院: "LingChengHeader",
        广州市花都区人民医院: "HuaDuHeader",
        武警广东省总队医院: "WuJingHeader",
        江门市妇幼保健院: "FuYouHLheader",
        聊城市第二人民医院: "LiaoChengHeader",
        中山大学附属第七医院: "ZhongShanQiHeader",
        东莞市横沥医院: "HengLiHeader",
        东莞市谢岗医院: "XieGangHeader",
        山南市人民医院: "ShanNanHeader",
        北海市人民医院: "BeiHaiRenYiHeader",
      };
      return hisList[HisName] || "HLheader";
    }
  },
  components: {
    HLheader,
    WeiXianHeader,
    LingChengHeader,
    HuaDuHeader,
    WuJingHeader,
    FuYouHLheader,
    LiaoChengHeader,
    ZhongShanQiHeader,
    HengLiHeader,
    XieGangHeader,
    ShanNanHeader,
    BeiHaiRenYiHeader,
  }
};
</script>
