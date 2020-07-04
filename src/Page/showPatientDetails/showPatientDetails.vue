<template>
  <div class="showPatientDetails">
    <!-- <leftPart v-if="inited"></leftPart> -->
    <div class="right-part">
      <router-view v-if="inited"></router-view>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.right-part {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

>>>.body {
  height: calc(100vh - 60px) !important;
}

>>>.form-contain {
  height: calc(100vh - 21px) !important;
}

>>>.new-btn, >>>.null-btn, >>>.tool-bar, >>>.fixed-icon, >>>.table-fixed-th {
  display: none !important;
}

>>>.tool-contain {
  .item-box {
    display: none !important;
  }

  .item-box.page-select {
    display: flex !important;
  }
}

.showPatientDetails {
  .right-part {
    >>> #sheet_body_con {
      height: calc(100vh - 64px) !important;
    }
  }
}

/* * 样式优化 */
</style>
<style lang="stylus">
.showPatientDetails, .test {
  iframe {
    // pointer-events: none !important;
  }

  .right-part {
    input, td, label {
      pointer-events: none !important;
    }
  }
}

.test {
  input, td, label {
    pointer-events: none !important;
  }
}

.contain {
  table {
    input {
      pointer-events: none !important;
    }
  }
}
</style>
<script>
import leftPart from "@/Page/patientInfo/supComponts/leftPart";
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
      deptValue: ""
    };
  },
  computed: {
    openLeft() {
      return this.$store.state.common.openLeft;
    }
  },
  created() {
    /** visitId必须要有值不然得去改请求接口的判断条件 */

    // this.$route.query.patientName = "测试";
    // this.$route.query.deptCode = "4003";

    // 修改高度
    this.$store.commit("upWihInPatient");
    window.onresize = () => {
      this.$store.commit("upWihInPatient");
    };
    getPatientInfo(this.$route.query.patientId, this.$route.query.visitId).then(
      res => {
        this.inited = true;
        this.query = res.data.data;
        Object.assign(this.$route.query, this.query);
      }
    );
    nursingUnit().then(res => {
      this.deptValue =
        localStorage.selectDeptValue ||
        this.$store.state.lesion.deptCode ||
        res.data.data.defaultDept ||
        res.data.data.deptList[0].code;
      this.$store.commit("upDeptCode", this.deptValue);
      localStorage.selectDeptValue = this.deptValue;
    });
  },
  mounted() {
    try {
      document.getElementById("hl-nav-con").style.display = "none";
    } catch (e) {}
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
    leftPart
  }
};
</script>
