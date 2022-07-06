<template>
  <div>
    <div
      class="exam-list"
      v-if="HOSPITAL_ID == 'guizhou'"
      v-show="dataGz.reportUrl"
      :style="{ height: height }"
    >
      <div class="page">
        <iframe
          :src="'http://192.168.8.68:8080/report/pdf' + dataGz.reportUrl"
          frameborder="0"
        ></iframe>
      </div>
    </div>
    <div v-else-if="data1">
      <el-row v-loading="loading" class="form" :style="{ height: height }">
        <div class="title">{{ HOSPITAL_NAME }}</div>
        <div class="name">{{ data.examItem }}报告单</div>
        <table>
          <tr>
            <td class="key">检查号</td>
            <td class="value">{{ data1.examNo ? data1.examNo : "" }}</td>
            <td class="key">病人ID</td>
            <td class="value" v-if="HOSPITAL_ID == 'huadu'">{{ $route.query.inpNo }}</td>
            <td class="value" v-else>{{ data.patientId }}</td>
            <td class="key">住院号</td>
            <td class="value" v-if="HOSPITAL_ID == 'huadu'">{{ data.patientId }}</td>
            <td class="value" v-else>{{ $route.query.inpNo }}</td>
          </tr>
          <tr>
            <td class="key">姓名</td>
            <td class="value">{{ data.name }}</td>
            <td class="key">性别</td>
            <td class="value">{{ data.sex }}</td>
            <td class="key">年龄</td>
            <td class="value">{{ routeQuery.age }}</td>
          </tr>
          <tr>
            <td class="key">科室</td>
            <td class="value">{{ data.deptName }}</td>
            <td class="key">申请日期</td>
            <td class="value">{{ data.reqDate | dataForm }}</td>
            <td class="key">申请医生</td>
            <td class="value">{{ data.reqDoctor }}</td>
          </tr>
          <tr>
            <td class="key">报告日期</td>
            <td class="value">{{ data.reportDate | dataForm }}</td>
            <td class="key">报告医生</td>
            <td class="value" colspan="3">{{ data.reporter }}</td>
          </tr>
          <tr>
            <td class="key">临床诊断</td>
            <td colspan="5">{{ $route.query.diagnosis }}</td>
          </tr>
          <tr style="height: 112px">
            <td class="key">检查所见</td>
            <td colspan="5">{{ data1.description }}</td>
          </tr>
          <tr style="height: 112px">
            <td class="key">印象</td>
            <td colspan="5">{{ data1.impression }}</td>
          </tr>
        </table>
        <div>
          <!-- <el-button type="text" @click="toShowImg" style="margin-top: 20px" v-show="picNum">
            点击查看本次检查图像 ({{picNum}}张)
          </el-button>-->
        </div>
      </el-row>
    </div>
    <div v-else>
      <el-row v-loading="loading" class="form" :style="{ height: height }">
        <div class="title">{{ HOSPITAL_NAME }}</div>
        <div class="name">{{ data.examItem }}报告单</div>
        <table>
          <tr>
            <td class="key">检查号</td>
            <td class="value">{{ data.examNo ? data.examNo : "" }}</td>
            <td class="key">病人ID</td>
            <td class="value" v-if="HOSPITAL_ID == 'huadu'">{{ $route.query.inpNo }}</td>
            <td class="value" v-else>{{ data.patientId }}</td>
            <td class="key">住院号</td>
            <td class="value" v-if="HOSPITAL_ID == 'huadu'">{{ data.patientId }}</td>
            <td class="value" v-else>{{ $route.query.inpNo }}</td>
          </tr>
          <tr>
            <td class="key">姓名</td>
            <td class="value">{{ data.name }}</td>
            <td class="key">性别</td>
            <td class="value">{{ data.sex }}</td>
            <td class="key">年龄</td>
            <td class="value">{{ routeQuery.age }}</td>
          </tr>
          <tr>
            <td class="key">科室</td>
            <td class="value">{{ data.deptName }}</td>
            <td class="key">申请日期</td>
            <td class="value">{{ data.reqDate | dataForm }}</td>
            <td class="key">申请医生</td>
            <td class="value">{{ data.reqDoctor }}</td>
          </tr>
          <tr>
            <td class="key">报告日期</td>
            <td class="value">{{ data.reportDate | dataForm }}</td>
            <td class="key">报告医生</td>
            <td class="value" colspan="3">{{ data.reporter }}</td>
          </tr>
          <tr>
            <td class="key">临床诊断</td>
            <td colspan="5">{{ $route.query.diagnosis }}</td>
          </tr>
          <tr style="height: 112px">
            <td class="key">检查所见</td>
            <td colspan="5">{{ data.description }}</td>
          </tr>
          <tr style="height: 112px">
            <td class="key">印象</td>
            <td colspan="5">{{ data.impression }}</td>
          </tr>
        </table>
        <div>
          <!-- <el-button type="text" @click="toShowImg" style="margin-top: 20px" v-show="picNum">
            点击查看本次检查图像 ({{picNum}}张)
          </el-button>-->
        </div>
      </el-row>
    </div>
    <div
      v-if="(!data1 && data.examNo == '') || (HOSPITAL_ID == 'guizhou' && !dataGz.reportUrl)"
      class="form"
      :style="{ height: height }"
    >
      <div class="null-con">
        <img src="../../../../../common/images/task/nondata.png" alt />
        <p>数据为空</p>
      </div>
    </div>
    <!-- <imgModal ref="imgModal"></imgModal> -->
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.form {
  padding: 26px 20px;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;

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

  table, table tr th, table tr td {
    border: 1px solid #979797;
  }

  table {
    width: 100%;
    background: #fff;
    text-align: left;
    border-collapse: collapse;
  }
}

td {
  height: 26px;
  padding: 4px 13px;
  vertical-align: middle;
  font-size: 13px;
  line-height: 18px;
  word-break: break-all;
}

.key {
  width: 14%;
  color: #687179;
}

.value {
  width: 19%;
  color: #333333;
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

.exam-list {
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

<script>
import { examResult, pic, picNum, getExamTestUrl } from "@/api/patientInfo";
// import imgModal from '../modal/imgModal.vue'
export default {
  data() {
    return {
      data: {},
      data1: {},
      loading: true,
      showImg: false,
      picNum: 0,
      // 贵州数据
      dataGz: {},
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 150}px`;
    },
    routeQuery() {
      if(this.$route.query.age){
        return this.$route.query
      }else if(this.$route.params.age){
        return this.$route.params;
      }else{
        return this.$store.state.sheet.patientInfo
      }
    },
  },
  filters: {
    dataForm(value) {
      let result = value ? new Date(value).Format("yyyy-MM-dd hh:mm") : "";
      return result;
    },
  },
  methods: {
    toShowImg() {
      console.log(this.data);
      let examNo = this.data.examNo;
      let name = this.data.name;
      window.open(`/crNursing/imageView?examNo=${examNo}&name=${name}`);
      // this.$router.push('/imageView', {query: {examNo, name}})
      // this.$refs.imgModal.open(examNo, name)
    },
    open(data) {
      console.log('test-data', data)
      if (data) {
        this.data = data;
        this.data.name = this.$route.query.name || this.$store.state.sheet.patientInfo.name
        this.loading = true;
        this.data1 = {};
        this.showImg = false;
        if (this.HOSPITAL_ID == "guizhou") {
          this.data1 = null;
          this.data == null
          this.dataGz = data
          // getExamTestUrl(
          //   this.$route.query.patientId,
          //   this.$route.query.visitId,
          //   this.data.examNo
          // ).then((res) => {
          //   this.examList = res.data.data;
          //   this.loading = false;
          // }).catch(e => {
          //   this.loading = false;
          // });
          return;
        }
        // console.log(this.data.examNo);
        if (this.data.examNo !== "") {
          examResult(this.data.examNo)
            .then((res) => {
              this.data1 = res.data.data;
              console.log(this.data1);
              this.loading = false;
              // picNum(this.data.examNo, this.data.name).then(res => {
              //     this.picNum = res.data.data.picNum
              // })
            })
            .catch(() => {
              this.data1 = false;
              this.loading = false;
            });
        }
      } else {
        this.data1 = false;
        this.dataGz = {}
        this.loading = false;
      }
    },
  },
  components: {
    // imgModal
  },
};
</script>
