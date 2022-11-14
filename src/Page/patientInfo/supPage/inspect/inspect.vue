<template>
  <div>
    <div class="content">
      <div class="left-part">
        <el-row class="header inspect-header" type="flex" align="middle">
          <span class="title" v-if="!isGuizhou">检查列表</span>
          <el-select v-model="value" v-if="!isGuizhou" placeholder="请选择" class="select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.label"
            ></el-option>
          </el-select>
          <span
            class="title"
            style="margin-left: 20px"
            v-if="HOSPITAL_ID == 'gy'"
            >住院标识</span
          >
          <span class="title" style="margin-left: 20px" v-else>住院次数</span>
          <el-select v-model="visitId" placeholder="请选择" class="select">
            <el-option
              v-for="item in visitList"
              :key="item.value"
              :value="item.label"
            ></el-option>
          </el-select>

          <el-button
            class="report-btn"
            type="text"
            v-if="HOSPITAL_ID == 'sdlj'"
            @click="checkOriginReport()"
          >
            查看原报告
          </el-button>
        </el-row>
        <div class="body" :style="{ height: height }">
          <div
            class="item"
            v-for="item in listByFilter"
            :key="item.examNo"
            @click="toRight(item)"
            :class="{ active: item.examNo == rightData.examNo }"
          >
            <div class="title">{{ item.examItem || item.reportName }}</div>
            <div class="aside">{{ item.reqDate || item.publishDate }}</div>
            <div class="result">
              <span
                v-if="!isGuizhou && item.resultStatus.indexOf('申请') == -1"
                style="color: green"
              >
                {{ item.resultStatus }}
                <!-- <img src="../../../../common/images/info/完成@2x.png" alt> -->
              </span>
              <span v-if="!isGuizhou && item.resultStatus.indexOf('申请') > -1">{{
                item.resultStatus
              }}</span>
            </div>
          </div>
          <div class="null-con" v-show="listByFilter.length == 0">
            <img src="../../../../common/images/task/nondata.png" alt />
            <p>没有相关检查数据～</p>
          </div>
        </div>
      </div>
      <div class="right-part">
        <inspectFormFuyou v-show="rightData.examNo" ref="inspectForm" v-if="HOSPITAL_ID=='fuyou'"></inspectFormFuyou>
        <inspectForm  ref="inspectForm" v-else></inspectForm>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.inspect-header .select .el-input__inner {
  width: 80px !important;
  min-width: 80px !important;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px;
}

.left-part {
  float: left;
  width: 36%;
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  .header {
    padding: 0 16px;
    background: #F7FAFA;
    height: 65px;
    border-bottom: 1px solid #EAEEF1;

    .title {
      font-size: 13px;
      color: #333333;
      font-weight: bold;
    }
  }

  .body {
    padding: 20px;
    background: #fff;
    overflow: auto;

    .item {
      padding: 11px 14px 11px 14px;
      margin-bottom: 10px;
      border: 1px solid #E4E8EB;
      border-radius: 2px;
      position: relative;
      cursor: pointer;

      &.active {
        background: #F2F2F2;
      }

      .title {
        font-size: 13px;
        color: #687179;
      }

      .aside {
        font-size: 12px;
        color: #999999;
        margin-top: 10px;
      }

      .result {
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 13px;
        color: #E72C2C;

        img {
          height: 22px;
        }
      }
    }
  }
  .report-btn {
    font-size: 12px;
    padding-right 0px;
  }
}

.right-part {
  float: right;
  width: 63%;
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
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
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.left-part .header .select .el-input__inner {
  height: 30px;
  width: 126px;
  margin-left: 16px;
  font-size: 12px;
  color: #333333;
}
</style>

<script>
import inspectForm from "./component/inspectForm";
import inspectFormFuyou from "./component/inspectForm_fuyou";
import { examList, getExamList } from "@/api/patientInfo";
export default {
  data() {
    return {
      list: [],
      rightData: {},

      value: "全部",
      visitList: [],
      visitId: "",
    };
  },
  computed: {
    options(){
      if(["zhzxy"].includes(this.HOSPITAL_ID)){
        return [
        {
          label: "全部",
        },
        {
          label: "CT",
        },
        {
          label: "MR",
        },
        {
          label: "磁共振",
        },
        {
          label: "心电图",
        },
        {
          label: "B超",
        },
      ]
      }else{
        return [
          {
            label: "全部",
          },
          {
            label: "CT",
          },
          {
            label: "MR",
          },
          {
            label: "磁共振",
          },
          {
            label: "心电图",
          },
        ]
      }
    },
    infoData() {
      return this.$route.query;
    },
    listByFilter() {
      if (this.isGuizhou) return this.list
      return this.list.filter((item) => {
        if (this.value == "全部") return true;
        return item.examClass == this.value;
      });
    },
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 255}px`;
    },
    isGuizhou() {
      return ['guizhou'].includes(process.env.HOSPITAL_ID)
    }
  },
  created() {
    if (this.infoData.visitId > 20) {
      this.visitList = [
        {
          label: this.infoData.visitId,
        },
      ];
    } else {
      for (let i = 0; i <= parseInt(this.infoData.visitId); i++) {
        this.visitList.push({
          label: i === 0 ? "门诊" : i,
        });
      }
    }

    this.visitId = this.infoData.visitId;
  },
  methods: {
    // 查看原报告
    checkOriginReport() {
      window.open(`http://192.168.100.26:8090/HkWebReport/ExaminePatientController/GetHistoryList.do?DataBase=ALL%22&exam_Pat_No=${this.infoData.inpNo}`)
    },
    toRight(data) {
      // console.log(data);
      if (!data) return;
      this.rightData = data;
      this.$nextTick(() => {
        this.$refs.inspectForm.open(data);
      })
      // if (data.resultStatus != "已出报告") {
      //   return this.$refs.inspectForm.open(null);
      // } else {
      //   return this.$refs.inspectForm.open(data);
      // }
    },
    getData() {
      if (this.isGuizhou) {
        getExamList(
          this.infoData.patientId,
          this.visitId == "门诊" ? 0 : this.visitId
        ).then(res => {
          this.list = res.data.data;
          this.toRight(this.list[0]);
        })
        return
      }
      examList(
        this.infoData.patientId,
        this.visitId == "门诊" ? 0 : this.visitId
      ).then((res) => {
        this.list = res.data.data;
        console.log(this.list , 'list');
        this.toRight(this.list[0]);
      });
    },
  },
  watch: {
    visitId() {
      this.getData();
    },
  },
  components: {
    inspectForm,
    inspectFormFuyou
  },
};
</script>
