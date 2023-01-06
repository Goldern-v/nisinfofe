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
      <el-table-column prop="evalScore" label="评分" min-width="80px" v-if="HOSPITAL_ID == 'lingcheng'">
         <template slot-scope="scope">
          <div v-for="item in scope.row.hazardLevelList" :key="item.id">{{item.evalScore}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="evalScore" label="评分" min-width="80px" v-else></el-table-column>
      <el-table-column label="危重等级" min-width="160px" v-if="HOSPITAL_ID == 'lingcheng'">
        <template slot-scope="scope">
          <div
            class="label-con label-con-lc"
            :style="{background: item.iconTextRgb}"
            v-for="item in scope.row.hazardLevelList"
            :key="item.id"
          >{{item.description}}</div>
        </template>
      </el-table-column>
      <el-table-column label="危重等级" min-width="160px" v-else>
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
.label-con-lc {
  padding: 0 10px;
  margin-top: 5px;
  margin-bottom: 5px;
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

        if (this.$route.query.formId || this.$route.query.formCode) {
          let formData = this.tableData.find(f => {
            return (
              f.dataId == this.$route.query.formId ||
              f.formCode == this.$route.query.formCode
            );
          });
          if (formData) {
            this.toDetails(formData);
          }
        }
        //
      }
    ).catch(()=>{
      this.pageLoading = false;
    });
  },
  methods: {
    status(data) {
      let beginTime = new Date(data.beginTime).getTime();
      let expectedEndTime = new Date(data.expectedEndTime).getTime();
      let curTime = new Date().getTime();
      if (!beginTime) return "";
      if (beginTime > curTime) {
        if(['fuyou'].includes(this.HOSPITAL_ID)){
          return moment(data.beginTime).format("YYYY-MM-DD hh:mm") + " 评估";
        }else{
          return moment(beginTime).calendar() + "评估";
        }

      }
      //聊城状态只有复评的才会显示
      if(["liaocheng"].includes(this.HOSPITAL_ID)){
        //状态只有复评的才会显示
        if(!expectedEndTime){
          return "";
        }
        if (beginTime < curTime && expectedEndTime) {
          return "未完成";
        }
      }else {
        if (beginTime < curTime && !expectedEndTime) {
          return "未完成";
        }
      }
      // if (beginTime < curTime && !expectedEndTime) {
      //   return "未完成";
      // }
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
      console.log("toDetails:", row);
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
