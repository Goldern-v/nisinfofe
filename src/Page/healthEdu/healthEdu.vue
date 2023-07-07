
<template>
  <div class="contain">
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <div class="left-part">
        <!-- <patientList :data="data.bedList" :isSelectPatient="isSelectPatient" v-loading="patientListLoading"></patientList> -->
        <patientList toName="healthEdu" :callFunction="isSelectPatient" />
      </div>
      <div class="right-part" :style="{ marginLeft: openLeft ? '200px' : '0' }">
        <component v-bind:is="current" ref="healthEducation"></component>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 0;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  &.fullpage {
    position: fixed !important;
    z-index: 10000;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0;
  }

  .head-con {
    height: 41px;
  }

  .body-con {
    position: relative;

    .left-part {
      width: 199px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
}
</style>

<script>
import patientList from "@/components/patient-list/patient-list-router-link.vue";
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
import healthEducation from "@/Page/patientInfo/supPage/healthEducation/healthEducation";
import healthEducationGuizhou from "@/Page/patientInfo/supPage/healthEducationGuizhou/healthEducation";
import healthEducationHengLi from "@/Page/patientInfo/supPage/healthEducationHengLi/healthEducation";
import healthEducationBeihairenyi from "@/Page/patientInfo/supPage/healthEducationBeihairenyi/healthEducation";
import healthEducationNfyksdyy from "@/Page/patientInfo/supPage/healthEducationNfyksdyy/healthEducation";

export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: [],
      },
      patientListLoading: false,
      bus: bus(this),
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    containHeight() {
      return this.wih - 62 + "px";
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
    current() {
      switch (this.HOSPITAL_ID) {
        case "guizhou":
          return "healthEducationGuizhou";
        case "hengli":
          return "healthEducationHengLi";
        case "beihairenyi":
          return "healthEducationBeihairenyi";
        case "nfyksdyy":
          return "healthEducationNfyksdyy";
        default:
          return "healthEducation";
      }
    },
  },
  methods: {
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode).then((res) => {
          this.data.bedList = res.data.data.filter((item) => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    },
    isSelectPatient(item) {
      this.$router.replace(
        {
          path: "/healthEdu",
          query: item,
        },
        () => {
          this.$refs.healthEducation.init();
        }
      );
    },
  },
  created() {
    this.$store.commit("upPatientInfo", {});
    // 初始化
    if (this.deptCode) {
      this.getDate();
    }

    this.bus.$on("refreshFormPagePatientList", this.getDate);
  },
  watch: {
    deptCode(val, oldValue) {
      console.log(oldValue, val, "oldValue");
      if (oldValue && val) {
        this.$router.replace(
          {
            path: "/healthEdu",
            query: {},
          },
          () => {
            this.$refs.healthEducation.init();
          }
        );
      }
      this.getDate();
    },
  },
  components: {
    patientList,
    healthEducation,
    healthEducationGuizhou,
    healthEducationHengLi,
    healthEducationBeihairenyi,
    healthEducationNfyksdyy
  },
};
</script>
