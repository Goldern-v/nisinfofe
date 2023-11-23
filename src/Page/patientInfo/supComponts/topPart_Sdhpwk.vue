<template>
  <div class="patient-info-head">
    <div class="nav-con">
      <router-link
        :to="{
          path: '/home',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">首页</div>
      </router-link>

      <router-link
        :to="{
          path: '/record',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理文书</div>
      </router-link>

      <div
        class="nav-item"
        v-if="['nfyksdyy'].includes(HOSPITAL_ID)"
        @click="openNewPage('onnfyksdyyEmrWeb')"
      >
        病历
      </div>

      <router-link
        :to="{
          path: '/sheetNursingOrder',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护嘱单</div>
      </router-link>
      <router-link
        :to="{
          path: '/sheet',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理记录单</div>
      </router-link>
      <router-link
        :to="{
          path: '/temperature',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">体温单</div>
      </router-link>

      <!-- <router-link
        :to="{
          path: '/diagnosis',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理计划</div>
      </router-link> -->
      <router-link
        :to="{
          path: '/bloodSugar',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">血糖</div>
      </router-link>

      <router-link
        :to="{
          path: '/healthEducation',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">健康教育单</div>
      </router-link>
      <router-link
        :to="{
          path: '/cost',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">费用信息</div>
      </router-link>
      <router-link
        :to="{
          path: '/information',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">基本信息</div>
      </router-link>
      <router-link
        :to="{
          path: '/advice',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">医嘱</div>
      </router-link>

      <router-link
        :to="{
          path: '/inspect',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">检查</div>
      </router-link>
      <router-link
        :to="{
          path: '/test',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">检验</div>
      </router-link>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.logo-con {
  width: 200px;
  min-width: 200px;
  height: 50px;
  background: #4bb08d;
  position: fixed;
  left: 0;
  top: 0;
  padding-left: 10px;

  img {
    width: 36px;
    height: 36px;
  }

  span {
    margin-left: 6px;
    font-size: 14px;
    color: #EFF2F9;
    letter-spacing: 0;
    line-height: 16px;
  }
}

.nav-con {
  height: 50px;
  min-width: 1030px;
  background-image: linear-gradient(-180deg, #F7F7F9 0%, #EAEBEF 100%);
  padding-top: 12px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #CBD5DD;
  position: fixed;
  width: 100%;
  z-index: 10;
}

.nav-item {
  height: 37px;
  line-height: 37px;
  padding: 0 10px;
  font-size: 13px;
  color: #000;
  font-weight: 700;
  letter-spacing: 0.26px;
  float: left;
  cursor: pointer;
}

.router-link-active {
  .nav-items,.nav-item {
    background: #F2F2F2;
    border: 1px solid #CBD5DD;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
  }
}
.nav-item-shouma {
  height: 37px;
  line-height: 37px;
  padding: 0 10px;
  font-size: 13px;
  color: #687179;
  letter-spacing: 0.26px;
  float: left;
  cursor: pointer;
}

.no-under-link{
  text-decoration: none;
}
.menu-item {
  height: 38px;
  padding: 0 0px;
  text-align: center;
  font-size: 13px;
  color: #333;
  letter-spacing: 0;
  cursor: pointer;
  i {
    display: inline-block;
    width: 28px;
    height: 28px;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;

    &.sheetHospitalAdmission {
      background-image: url('../../../common/images/index/入院评估.png');
    }

    &.sheetHospitalEval {
      background-image: url('../../../common/images/index/住院评估.png');
    }

    &.nursingAssessment {
      background-image: url('../../../common/images/index/护理评估.png');
    }

    &.bloodSugar {
      background-image: url('../../../common/images/index/血糖.png');
    }

    &.healthEdu {
      background-image: url('../../../common/images/index/健康教育单.png');
    }
  }
}
.active{
   background-color: #F8F8FA;

  .menu-item {
    color: #333;
    font-weight: bold;
  }
}
</style>
<script>
import common from "@/common/mixin/common.mixin";
import md5 from "md5";
import qs from "qs";
import { mapState } from "vuex";
import { getLink } from "@/api/lesion";

export default {
  mixins: [common],
  data() {
    return {
      msg: "hello vue"
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    ...mapState({
      patient: state => state.patient.currentPatient
    }),
    isNursing() {

      let path = this.$route.path;
      let istPath = [
        "admissionPageAdult2",
        "sheet",
        "record",
        "bloodSugar",
        "healthEducation",
        "diagnosis"
      ].some(item => path.includes(item) && path != '/sheetNursingOrder');
      return istPath;
    }
  },
  components: {},
  methods: {
    openNewPage(key) {
      if (key) {
        this[key]();
      }
    },
    getPushLink() {
      let { patientId, visitId, wardCode } = this.query;
      let empNo = JSON.parse(localStorage.user).empNo;
      getLink(patientId, visitId, empNo, wardCode).then(res => {
        this.copy(res.data.data.link);
      });
    },
    copy(text) {
      console.log("text", text);
      this.$confirm("即将跳转至外部链接", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let a = document.createElement("a");
        a.setAttribute("href", `openIE:${text}`);
        a.setAttribute("target", "_blank");
        a.setAttribute("id", "startTelMedicine");
        // 防止反复添加
        if (document.getElementById("startTelMedicine")) {
          document.body.removeChild(
            document.getElementById("startTelMedicine")
          );
        }
        document.body.appendChild(a);
        a.click();
      });
    },

    formatValue(value, obj) {
      return obj[value] || obj["default"];
    }
  }
};
</script>
