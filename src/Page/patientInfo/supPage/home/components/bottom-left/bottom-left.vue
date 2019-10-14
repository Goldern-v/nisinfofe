<template>
  <div class="box-contain home-b-l-t">
    <el-table
      :height="boxHeight"
      :data="tableData"
      stripe
      v-loading="pageLoading"
      @row-click="toDetails"
      style="width: 100%"
    >
      <el-table-column prop="formName" label="项目" min-width="200px"></el-table-column>
      <el-table-column prop="evalUser" label="负责人" min-width="100px"></el-table-column>
      <el-table-column label="状态" min-width="100px">
        <template slot-scope="scope">
          <span>{{status(scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="evalScore" label="评分" min-width="80px"></el-table-column>
      <el-table-column label="危重等级" min-width="160px">
        <template slot-scope="scope">
          <span
            class="label-con"
            v-if="scope.row.hazardLevel"
            :style="{background: scope.row.hazardLevel.iconTextRgb}"
          >{{scope.row.hazardLevel.description}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.home-b-l-t {
  .el-table {
    border: 0;
  }

  .el-table::after {
    display: none;
  }

  .el-table::before {
    display: none;
  }

  .el-table th {
    background: #fff;
    font-size: 13px;
    color: #687179;
    font-weight: bold;

    .cell {
      background: #fff;
    }
  }

  td .cell {
    cursor: pointer;
  }
}
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.box-contain {
  padding: 15px 20px;
}

.label-con {
  border-radius: 2px;
  font-size: 13px;
  color: #FFFFFF;
  padding: 2px 10px;
}
</style>
<script>
import { getNote } from "@/api/home";
import moment from "moment";
import bus from "vue-happy-bus";
import { getFormConfig } from "@/Page/patientInfo/supPage/record/config/form-config.js";
export default {
  data() {
    return {
      tableData: [],
      bus: bus(this),
      pageLoading: false
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    boxHeight() {
      return this.wih - 385;
    }
  },
  created() {
    this.pageLoading = true;
    getNote(this.$route.query.patientId, this.$route.query.visitId).then(
      res => {
        this.tableData = res.data.data;
        this.pageLoading = false;
      }
    );
  },
  methods: {
    status(data) {
      let beginTime = new Date(data.beginTime).getTime();
      let expectedEndTime = new Date(data.expectedEndTime).getTime();
      let curTime = new Date().getTime();
      if (!beginTime) return "";
      if (beginTime > curTime) {
        return moment(beginTime).calendar() + "评估";
      }
      if (beginTime < curTime && !expectedEndTime) {
        return "未完成";
      }
      if (beginTime < curTime && expectedEndTime > curTime) {
        return (
          "剩余" +
          Math.ceil((expectedEndTime - curTime) / 1000 / 60 / 60) +
          "小时"
        );
      }
      if (beginTime < curTime && expectedEndTime < curTime) {
        let t = (curTime - expectedEndTime) / 1000 / 60 / 60;
        if (t > 24) {
          return "超时" + Math.ceil(t / 24) + "天";
        } else {
          return "超时" + Math.ceil(t) + "小时";
        }
      }
    },
    toDetails(row) {
      if (row.nooForm == "3") {
        if (row.formCode == "patSugar") {
          this.$router.push({
            path: "/bloodSugar",
            query: {
              patientId: this.$route.query.patientId,
              visitId: this.$route.query.visitId
            }
          });
        }
        return;
      }
      this.$router.push(
        {
          path: "/record",
          query: {
            patientId: this.$route.query.patientId,
            visitId: this.$route.query.visitId
          }
        },
        () => {
          this.$nextTick(() => {
            if (row.dataId) {
              // this.bus.$emit('openAssessment', {
              //   id: row.dataId,
              //   formCode: row.formCode,
              //   showCurve: row.showCurve,
              //   listPrint: row.listPrint
              // })
              // HisName = process.env.HOSPITAL_NAME;
              // let hisList = {
              //   威县人民医院: "openAssessmentBox",
              //   东莞市厚街医院: "openAssessment"
              // };
              // let emitCode = hisList[HisName] || "openAssessment";
              setTimeout(() => {
                this.bus.$emit(
                  "openAssessmentBox",
                  Object.assign({}, getFormConfig(row.formName), {
                    id: row.dataId,
                    formCode: row.formCode,
                    type: row.formType,
                    showCurve: row.showCurve,
                    creator: row.creator,
                    listPrint: row.listPrint,
                    nooForm: row.nooForm,
                    pageUrl: row.pageUrl
                  })
                );
              }, 200);
            }
          });
        }
      );
    }
  },
  components: {}
};
</script>
