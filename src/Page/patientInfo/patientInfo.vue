<template>
  <div :class="{ hj: HOSPITAL_ID == 'hj' }">
    <leftPart
      v-if="inited"
      @handleInpatientSave="handleInpatientSave"
    ></leftPart>
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
import topPartZhongShanQi from "@/Page/patientInfo/supComponts/topPart_ZhongShanQi"; // 武警广东省总队医院
import leftPart from "@/Page/patientInfo/supComponts/leftPart";
import { getPatientInfo } from "@/api/common.js";

export default {
  data() {
    return {
      open: false,
      url: "",
      refresh: false,
      inited: false,
      query: {}
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
      ).then(res => {
        this.inited = true;
        this.query = res.data.data;
        Object.assign(this.$route.query, this.query);
        // getPatientInfo
        window.app.$store.commit(
          "upCurrentPatientObj",
          JSON.parse(JSON.stringify(this.query))
        );
        if (this.query.deptCode && this.query.deptName) {
          this.$store.commit("upDeptCode", this.query.wardCode);
          localStorage.selectDeptValue = value;
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
        聊城市第二人民医院: "topPartLiaoCheng"
      };
      return hisList[HisName] || "topPart";
    },
    handleInpatientSave() {
      this.getPatientData();
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
    topPartZhongShanQi,
    leftPart
  }
};
</script>
