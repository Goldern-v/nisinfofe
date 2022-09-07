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
import FQFYHeader from "@/components/HLheader/FQFYHeader"; // 福清妇幼
import GuiZhouShengRenMingHeader from "@/components/HLheader/GuiZhouShengRenMing"; // 贵州省人民
import QuZhouXianHeader from "@/components/HLheader/QuZhouXianHeader.vue"; // 曲周县医院
import FoShanRenYiHeader from "@/components/HLheader/FoShanRenYiHeader.vue"; // 佛山市第一人民医院
import FSXTHeader from "@/components/HLheader/FSXTHeader.vue"; // 南方医科大学顺德医院附属杏坛医院
import NanFangZhongXiYiHeader from "@/components/HLheader/NanFangZhongXiYiHeader"; // 南方医科大学中西医结合医院
import LYXRMHeader from "@/components/HLheader/LYXRMHeader"; // 临邑县人民医院
import YangchunzhongyiHeader from "@/components/HLheader/YangchunzhongyiHeader"; // 南方医科大学中西医结合医院
import WuhanfeikeHeader from "@/components/HLheader/WuhanfeikeHeader"; // 武汉肺科
import WuhanYaxinHeader from "@/components/HLheader/WuhanYaxinHeader"; // 武汉亚心
import SdljHeader from "@/components/HLheader/SdljHeader";//顺德龙江
import GdtjHeader from "@/components/HLheader/GdtjHeader";//广东同江
import YtllHeader from "@/components/HLheader/YtllHeader";//广东同江
import LyyzHeader from "@/components/HLheader/LyyzHeader";//广东同江
import QhwyHeader from "@/components/HLheader/QhwyHeader";//广东同江
import WhslHeader from "@/components/HLheader/WhslHeader";//威海市立
import ZhzxyHeader from "@/components/HLheader/ZhzxyHeader";//珠海中西医
import WhhkHeader from "@/components/HLheader/WhhkHeader";

export default {
  data() {
    return {
      msg: "hello vue",
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
        福清妇幼保健院: "FQFYHeader",
        贵州省人民医院: "GuiZhouShengRenMingHeader",
        曲周县医院: "QuZhouXianHeader",
        南方医科大学中西医结合医院: "NanFangZhongXiYiHeader",
        临邑县人民医院:'LYXRMHeader',
        佛山市第一人民医院:"FoShanRenYiHeader",
        南方医科大学顺德医院附属杏坛医院: 'FSXTHeader',
        阳春中医院: 'YangchunzhongyiHeader',
        武汉市肺科医院: 'WuhanfeikeHeader',
        佛山市顺德区龙江医院:'SdljHeader',
        广东同江医院: 'GdtjHeader',
        玲珑英诚医院: 'YtllHeader',
        临沂沂州医院: 'LyyzHeader',
        青海省第五人民医院: 'QhwyHeader',
        威海市立医院: 'WhslHeader',
        珠海市中西医结合医院: 'ZhzxyHeader',
        武汉汉口医院: 'WhhkHeader',
      };
      return hisList[HisName] || "HLheader";
    },
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
    FQFYHeader,
    GuiZhouShengRenMingHeader,
    QuZhouXianHeader,
    FoShanRenYiHeader,
    NanFangZhongXiYiHeader,
    LYXRMHeader,
    FSXTHeader,
    YangchunzhongyiHeader,
    WuhanfeikeHeader,
    WuhanYaxinHeader,
    SdljHeader,
    GdtjHeader,
    YtllHeader,
    LyyzHeader,
    QhwyHeader,
    WhslHeader,
    ZhzxyHeader,
    WhhkHeader,
  },
};
</script>
