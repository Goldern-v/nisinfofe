<template>
  <div>
    <div v-if="(JSON.stringify(data) !== '{}')">
      <el-row v-loading="loading" class="form" :style="{ height: height }">
        <div class="title">{{ HOSPITAL_NAME }}</div>
        <div class="name">{{ data.operName }}</div>
        <table>
          <tr>
            <td class="key">检查号</td>
            <td class="value">{{ data.operId }}</td>
            <td class="key">病人ID</td>
            <td class="value">{{ data.patientId }}</td>
            <td class="key">住院号</td>
            <td class="value">{{ data.inpNo }}</td>
          </tr>
          <tr>
            <td class="key">姓名</td>
            <td class="value">{{ data.patientname }}</td>
            <td class="key">性别</td>
            <td class="value">{{ data.sex }}</td>
            <td class="key">年龄</td>
            <td class="value">{{ data.age }}</td>
          </tr>
          <tr>
            <td class="key">科室</td>
            <td class="value">{{ data.deptStayed }}</td>
            <td class="key">申请日期</td>
            <td class="value">{{ data.reqDateTime | dataForm }}</td>
            <td class="key">复苏时间</td>
            <td class="value">{{ data.anesendTime }}</td>
          </tr>
          <tr>
            <td class="key">手术开始时间</td>
            <td class="value">{{ data.startDateTime | dataForm }}</td>
            <td class="key">手术结束时间</td>
            <td class="value">{{ data.endDateTime | dataForm }}</td>
            <td class="key">手术等级</td>
            <td class="value" colspan="3">{{ data.operClass }}</td>
          </tr>
          <tr>
            <td class="key">诊断</td>
            <td colspan="5">{{ data.diagnosis }}</td>
          </tr>
          <tr>
            <td class="key">主刀医生</td>
            <td class="value">{{ data.operDoctor }}</td>
            <td class="key">助手</td>
            <td class="value">{{ data.assisant }}</td>
            <td class="key">巡回护士</td>
            <td class="value" colspan="3">{{ data.aroundNurse }}</td>
          </tr>
          <tr>
            <td class="key">洗手护士</td>
            <td class="value">{{ data.nurse }}</td>
            <td class="key">麻醉医生</td>
            <td class="value">{{ data.anesthesiaDoctor }}</td>
            <td class="key">麻醉助手</td>
            <td class="value" colspan="3">{{ data.anesthesiaAssisant }}</td>
          </tr>
          <tr>
            <td class="key">麻醉方式</td>
            <td class="value">{{ data.anesthesiaMethod }}</td>
            <td class="key">出手术室时间</td>
            <td class="value">{{ data.outDateTime }}</td>
            <td class="key">手术室</td>
            <td class="value" colspan="3">{{ data.operRoom }}</td>
          </tr>
        </table>
        <div>
        </div>
      </el-row>
    </div>
    <div
      v-else
      class="form"
      :style="{ height: height }"
    >
      <div class="null-con">
        <img src="../../../../common/images/task/nondata.png" alt />
        <p>数据为空</p>
      </div>
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
      loading: true,
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 150}px`;
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
      this.data = data;
      this.loading = false;
    },
  },
  components: {
  },
};
</script>
