<template>
  <div :class="{ hj: HOSPITAL_ID == 'hj' }">
    <component :is="witchLeft" v-if="inited"/>
    <!-- <leftPartHengli
      v-if="inited && HOSPITAL_ID=='hengli'"
      @handleInpatientSave="handleInpatientSave"
    ></leftPartHengli>
    <leftPartHuadu
      v-else-if="inited && HOSPITAL_ID=='huadu'"
      @handleInpatientSave="handleInpatientSave"
    ></leftPartHuadu>
    <leftPartFuyou
      v-else-if="inited && HOSPITAL_ID=='fuyou'"
      @handleInpatientSave="handleInpatientSave"
    ></leftPartFuyou>
    <leftPart
      v-else-if="inited"
      @handleInpatientSave="handleInpatientSave"
    ></leftPart> -->
    <div class="right-part" :style="{ marginLeft: openLeft ? '200px' : '0' }">
      <!-- <topPart></topPart> -->
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
import leftPart from "@/Page/patientInfo/supComponts/leftPart";
import leftPartHengli from "@/Page/patientInfo/supComponts/leftPart_Hengli";
import leftPartFuyou from "@/Page/patientInfo/supComponts/leftPart_Fuyou";
import leftPartHuadu from "@/Page/patientInfo/supComponts/leftPart_Huadu";
import leftPartFSXT from "@/Page/patientInfo/supComponts/leftPart_FSXT";
import { getPatientInfo } from "@/api/common.js";

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
    // openNewFormBoxClean(box){
    //   this.$refs.openNewFormModal.open(box)
    // },
    getPatientData() {
      this.inited = false;
      getPatientInfo(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then((res) => {
        this.inited = true;
        this.query = res.data.data;
        Object.assign(this.$route.query, this.query);
        console.log('获取患者信息接口===========>',this.query)
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
        武警广东省总队医院: "topPartWuJing",
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
        临沂沂州医院: "topPartLyyz",
      };
      return hisList[HisName] || "topPart";
    },
    handleInpatientSave() {
      this.getPatientData();
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
  },
};
</script>
