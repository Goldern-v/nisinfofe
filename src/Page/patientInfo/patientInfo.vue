<template>
  <div :class="{ hj:  ['hj','sdlj','fuyou'].includes(HOSPITAL_ID) }" >
    <component :is="witchLeft" v-if="inited"/>
    <div class="right-part" :style="[{ marginLeft: openLeft ? '200px' : '0' },...heightFun()]">
      <component :is="switchCompt()" v-if="inited" />
      <router-view v-if="inited"></router-view>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.hj {
  >>> .left-part {
    .content {
      top: 50px;
    }
  }

  > .right-part {
    >>> .patient-info-head {
      height: 50px;

      .nav-con {
        top: 0;

        + div {
          display: none;
        }
      }
    }
  }
}

.right-part {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
<script>
import topPart from "@/Page/patientInfo/supComponts/topPart"; // 东莞市厚街医院
import topPartWeiXian from "@/Page/patientInfo/supComponts/topPart_WeiXian"; // 威县人民医院
import topPartLingCheng from "@/Page/patientInfo/supComponts/topPart_LingCheng"; // 德州市陵城区人民医院
import topPartHuaDu from "@/Page/patientInfo/supComponts/topPart_HuaDu"; // 广州市花都区人民医院
import topPartWuJing from "@/Page/patientInfo/supComponts/topPart_WuJing"; // 武警广东省总队医院
import topPartLiaoCheng from "@/Page/patientInfo/supComponts/topPart_LiaoCheng"; // 聊城市第二人民医院
import topPartLYXRM from "@/Page/patientInfo/supComponts/topPart_LYXRM"; // 临邑县人民医院
import topPartShanNan from "@/Page/patientInfo/supComponts/topPart_ShanNan"; // 山南市人民医院
import topPartZhongShanQi from "@/Page/patientInfo/supComponts/topPart_ZhongShanQi"; // 武警广东省总队医院
import topPartGuiZhou from "@/Page/patientInfo/supComponts/topPart_GuiZhou"; // 贵州省人民医院
import topPartQuZhou from "@/Page/patientInfo/supComponts/topPart_QuZhou.vue"; // 曲周县医院
import topPartNFZXY from "@/Page/patientInfo/supComponts/topPart_NFZXY.vue"; // 南方中西医院医院
import topPartXiegang from "@/Page/patientInfo/supComponts/topPart_xiegang.vue"; // 谢岗医院
import topPartWHFK from "@/Page/patientInfo/supComponts/topPart_WHFK.vue"; // 武汉肺科
import topPartJmfy from "@/Page/patientInfo/supComponts/topPart_Jmfy.vue";
import topPartFSSY from "@/Page/patientInfo/supComponts/topPart_FSSY.vue";//佛山市一
import topPartLyyz from "@/Page/patientInfo/supComponts/topPart_Lyyz.vue";//佛山市一
import topPartYC from "@/Page/patientInfo/supComponts/topPart_YC.vue";//阳春中医
import topPartSdlj from "@/Page/patientInfo/supComponts/topPart_Sdlj.vue";//顺德龙江
import topPartQhwy from "@/Page/patientInfo/supComponts/topPart_Qhwy.vue";//青海五院
import topPartWhhk from "@/Page/patientInfo/supComponts/topPart_Whhk.vue";
import topPartZhzxy from "@/Page/patientInfo/supComponts/topPart_Zhzxy.vue"; // 珠海中西医
import topPartNfyksdyy from "@/Page/patientInfo/supComponts/topPart_Nfyksdyy.vue"; // 珠海中西医
import topPartWhsl from "@/Page/patientInfo/supComponts/topPart_whsl" // 威海市立
import topPartSdhpwk from "@/Page/patientInfo/supComponts/topPart_Sdhpwk" // 顺德和平外科
import leftPart from "@/Page/patientInfo/supComponts/leftPart";
import leftPartHengli from "@/Page/patientInfo/supComponts/leftPart_Hengli";
import leftPartFuyou from "@/Page/patientInfo/supComponts/leftPart_Fuyou";
import leftPartHuadu from "@/Page/patientInfo/supComponts/leftPart_Huadu";
import leftPartFSXT from "@/Page/patientInfo/supComponts/leftPart_FSXT";
import { getPatientInfo } from "@/api/common.js";

import { nursingUnit } from "@/api/lesion";
export default {
  data() {
    return {
      open: false,
      url: "",
      refresh: false,
      inited: false,
      query: {},
    };
  },
  computed: {
    witchLeft(){
      let HOSPITAL_ID_Obj = {
        hengli:'leftPartHengli',
        huadu:'leftPartHuadu',
        fuyou:'leftPartFuyou',
        fsxt:'leftPartFSXT',
        default:'leftPart'
      }
      return HOSPITAL_ID_Obj[this.HOSPITAL_ID] || HOSPITAL_ID_Obj.default
    },
    openLeft() {
      return this.$store.state.common.openLeft;
    },
  },
  created() {
    // 修改高度
    this.$store.commit("common/upWihInPatient");
    window.onresize = () => {
      this.$store.commit("common/upWihInPatient");
    };
    this.getPatientData();
  },
  methods: {
    heightFun(){
      if(['/admissionPageAdult2','/admissionPageChild2'].includes(this.$route.path)) return [
        {'height': '100vh',},
        {'overflow': 'hidden'}
      ]
    },
    // openNewFormBoxClean(box){
    //   this.$refs.openNewFormModal.open(box)
    // },
    getPatientData() {
      this.inited = false;
      getPatientInfo(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then((res) => {
        if(this.HOSPITAL_ID==='zhzxy'){
          /*
           床位一览卡进入护记。
           vuex不能跨页面，所以拿接口保存deptList，
           src\Page\sheet-page\components\sheet-tool\sheet-tool.vue中的readOnly才为false。
          */
          nursingUnit().then(res=>{
            this.$store.commit("upDeptList", res.data.data.deptList);
          })
        }
        this.inited = true;
        console.log(this.query,'this.query');
        this.query = res.data.data;
        if(this.$route.path != '/previousHistory/nursingPreview'){
          Object.assign(this.$route.query, this.query);
        }
        // getPatientInfo
        window.app.$store.commit(
          "upCurrentPatientObj",
          JSON.parse(JSON.stringify(this.query))
        );
        if (this.query.deptCode && this.query.deptName) {
          this.$store.commit("upDeptCode", this.query.wardCode);
          localStorage.selectDeptValue = this.query.deptCode;
          this.$store.commit("upDeptName", this.query.wardName);
        }
      });
    },
    // 依据医院名字，标题组件切换
    switchCompt(HisName = process.env.HOSPITAL_NAME) {
      let hisList = {
        德州市陵城区人民医院: "topPartLingCheng",
        威县人民医院: "topPartWeiXian",
        东莞市厚街医院: "topPart",
        广州市花都区人民医院: "topPartHuaDu",
        武警广东总队医院: "topPartWuJing",
        中山大学附属第七医院: "topPartZhongShanQi",
        聊城市第二人民医院: "topPartLiaoCheng",
        山南市人民医院: "topPartShanNan",
        贵州省人民医院: "topPartGuiZhou",
        曲周县医院: "topPartQuZhou",
        江门市妇幼保健院: "topPartJmfy",
        南方医科大学中西医结合医院: "topPartNFZXY",
        东莞市谢岗医院: "topPartXiegang",
        佛山市第一人民医院:"topPartFSSY",
        阳春中医院:"topPartYC",
        武汉市肺科医院:"topPartWHFK",
        临邑县人民医院:"topPartLYXRM",
        松桃苗族自治县人民医院:"topPartLYXRM",
        临沂沂州医院: "topPartLyyz",
        佛山市顺德区龙江医院:"topPartSdlj",
        武汉市汉口医院: 'topPartWhhk',
        青海省第五人民医院:'topPartQhwy',
        中国人民解放军联勤保障部队第九二五医院: 'topPartGuiZhou',
        珠海市中西医结合医院: 'topPartZhzxy',
        南方医科大学顺德医院: 'topPartNfyksdyy',
        威海市立医院: 'topPartWhsl',
        顺德和平外科医院: 'topPartSdhpwk',

      };
      return hisList[HisName] || "topPart";
    },
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
  beforeRouteUpdate(to, from, next) {
    next(true);
    this.inited = false;
    Object.assign(this.$route.query, this.query);
    this.$nextTick(() => {
      this.inited = true;
    });
  },
  components: {
    topPart,
    topPartWeiXian,
    topPartLingCheng,
    topPartHuaDu,
    topPartWuJing,
    topPartLiaoCheng,
    topPartLYXRM,
    topPartZhongShanQi,
    topPartShanNan,
    topPartFSSY,
    topPartGuiZhou,
    topPartQuZhou,
    topPartJmfy,
    topPartNFZXY,
    topPartXiegang,
    leftPart,
    leftPartHengli,
    leftPartFuyou,
    leftPartHuadu,
    topPartYC,
    leftPartFSXT,
    topPartWHFK,
    topPartLyyz,
    topPartSdlj,
    topPartWhhk,
    topPartQhwy,
    topPartZhzxy,
    topPartNfyksdyy,
    topPartWhsl,
    topPartSdhpwk
  },
};
</script>
