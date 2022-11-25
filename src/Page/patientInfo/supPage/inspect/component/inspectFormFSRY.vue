<template>
  <div>
    <div v-if="data">
      <el-row class="form" :style="{ height: height }">
        <div class="title">{{ HOSPITAL_NAME }}</div>
        <div class="name">{{ data.examItem }}报告单</div>
        <table>
          <tr>
            <td class="key">检查号</td>
            <td class="value">{{ data.examNo}}</td>
            <td class="key">病人ID</td>
            <td class="value">{{ data.patientId }}</td>
            <td class="key">住院号</td>
            <td class="value">{{ $route.query.inpNo }}</td>
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
            <td class="value">{{ data.examResult&&data.examResult.reportDateTime ||'未出报告'}}</td>
            <td class="key">报告医生</td>
            <td class="value" colspan="3">{{ data.examResult&&data.examResult.reportDoctor||'未出报告'  }}</td>
          </tr>
          <tr>
            <td class="key">临床诊断</td>
            <td colspan="5">{{ $route.query.diagnosis }}</td>
          </tr>
          <tr style="height: 112px">
            <td class="key">检查所见</td>
            <td colspan="5">{{ data.examResult&&data.examResult.description || '暂无' }}</td>
          </tr>
          <tr style="height: 112px">
            <td class="key">印象</td>
            <td colspan="5">{{ data.examResult&&data.examResult.impression || '暂无' }}</td>
          </tr>
        </table>
        <div>
        </div>
      </el-row>
    </div>
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
    open(data) {
      if (data) {
        this.data = data;
        this.data.name = this.$route.query.name || this.$store.state.sheet.patientInfo.name
      }
    },
  },
};
</script>
