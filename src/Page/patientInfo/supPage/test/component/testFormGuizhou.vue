<template>
  <div style="position: relative">
    <div
      class="test-list"
      :style="{ height: height }"
    >
      <iframe
        :src="'http://192.168.8.68:8080/report/pdf' + item.expand1"
        frameborder="0"
      ></iframe>
    </div>

    <div v-if="!data1" class="form" :style="{ minHeight: height }">
      <div class="null-con">
        <img src="../../../../../common/images/task/nondata.png" alt />
        <p>数据为空</p>
      </div>
    </div>

  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.form {
  padding: 26px 20px 10px;
  box-sizing: border-box;
  width: 100%;

  .title {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    text-align: center;
  }

  .name {
    font-size: 15px;
    color: #333333;
    margin-top: 10px;
    text-align: center;
    margin-bottom: 16px;
  }
}

.info-class {
  font-size: 13px;
  color: #333333;
  margin-bottom: 10px;
}

.null-con {
  img {
    display: block;
    margin: 20% auto 20px;
    width: 120px;
  }

  p {
    text-align: center;
    font-size: 13px;
  }

  color: #666;
}

.redText {
  color: #E62C2C;
}

.test-list {
  overflow: auto;

  .page {
    width: 100%;
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.test-table {
  .el-table__row td, th {
    height: 34px;
    font-size: 13px;
    color: #333333;
    cursor: pointer;
  }
}

th {
  font-weight: bold;
}

.in-moadl {
  .el-dialog__wrapper, .v-modal {
    position: absolute;
  }

  .el-dialog--tiny {
    width: 60%;
  }

  .el-dialog__body {
    padding: 0 10px;
  }
}
</style>

<script>
import { testItems, getExamTestUrl } from "@/api/patientInfo";
import lineChart from "./lineChart";
export default {
  data() {
    return {
      data: {},
      loading: true,
      dialogVisible: false,
      chartData: {},
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 150}px`;
    },
    height1() {
      return this.wih - 310;
    },
  },
  methods: {
    compare(row) {
      try {
        if (row.abnormalIndicator == "H" || row.abnormalIndicator == "高")
          return "top";
        if (row.abnormalIndicator == "L" || row.abnormalIndicator == "低")
          return "down";
        if (row.abnormalIndicator == "") return false;
        if (!(row.abnormalIndicator == "N" || row.abnormalIndicator == "正常"))
          return true;
        return false;
      } catch (e) {
      } finally {
      }
    },
    openChart(data) {
      this.chartData = data;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.lineChart.open(data);
      });
    },
    closeChart() {
      this.dialogVisible = false;
    },
    open(data) {
      this.data = data;
      this.loading = true;
      this.data1 = [];
      this.closeChart();
      if (this.HOSPITAL_ID == "guizhou") {
        this.data1 = null;
        getExamTestUrl(
          this.$route.query.patientId,
          this.$route.query.visitId,
          this.data.testNo
        ).then((res) => {
          this.testList = res.data.data;
          this.loading = false;
        });
        return;
      }
      testItems(this.data.testNo)
        .then((res) => {
          this.data1 = res.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.data1 = false;
          this.loading = false;
        });
    },
  },
  mounted() {
    window.openChart = () => {
      this.openChart();
    };
  },
  filters: {
    dataForm(value) {
      let result = new Date(value).Format("yyyy-MM-dd");
      return !(result + "").includes("NaN") ? result : value || "没出报告";
    },
  },
  components: {
    lineChart,
  },
};
</script>
