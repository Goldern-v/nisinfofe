<template>
  <sweet-modal size="middle" ref="lcHealthContentModal" title="宣教信息" :modalWidth="760">
    <div class="healthContent health-page" ref="lcHealthContentPrintPage">
      <!-- 表单头部信息 -->
      <div class="health-education-head">
        <div class="hospital">德 州 市 陵 城 区 人 民 医 院</div>
        <div class="title">{{name}}</div>
        <div class="info">
          <span>病人姓名：{{patientInfo.name}}</span>
          <span>性别：{{patientInfo.sex}}</span>
          <span>年龄：{{patientInfo.age}}</span>
          <span>科室：{{patientInfo.deptName}}</span>
          <span>床号：{{patientInfo.bedLabel}}</span>
          <span>住院号：{{patientInfo.inpNo}}</span>
        </div>
      </div>
      <!-- 表单内容 -->
      <table>
        <colgroup>
          <col width="15%" />
          <col width="35%" />
          <col width="15%" />
          <col width="35%" />
        </colgroup>
        <tbody>
          <tr>
            <td>宣教时间</td>
            <td>{{data.教育时间}}</td>
            <td>宣教对象</td>
            <td>{{data.教育对象}}</td>
          </tr>
          <tr>
            <td>宣教方式</td>
            <td>{{data.教育方法}}</td>
            <td>宣教评估</td>
            <td>{{data.教育评估}}</td>
          </tr>
          <tr>
            <td colspan="4" style="height: 750px">
              <div class="content_title">宣教内容：</div>
              <div v-html="content" class="content"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.lcHealthContentModal.close()">关闭</el-button>
      <el-button class="modal-btn" @click="toPrint">打印</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
.healthContent {
  min-height: 1000px;
  width: 700px;
  padding: 10px 30px 20px 30px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.5);
  .health-education-head {
    padding: 10px;
    .hospital {
      font-size: 18px;
      text-align: center;
      font-weight: bold;
    }
    .title {
      font-size: 21px;
      padding: 5px 0 0px;
      text-align: center;
      font-weight: bold;
      margin-top: 5px;
    }
    .info {
      margin-top: 15px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 13px; // 小四
    }
  }
  table {
    width: 100%;
  }
  th,
  td {
    border: 1px solid #000;
    padding: 6px 10px;
    box-sizing: border-box;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
  }
  .health-table-page {
    font-size: 13px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
}
.content {
  width: 620px;
  padding: 0 20px 10px 20px;
  box-sizing: border-box;
}
.content_title {
  font-size: 18px;
  text-align: left;
  font-weight: 900;
  margin: 10px 0 0 10px;
}
</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    content: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    open() {
      this.$refs.lcHealthContentModal.open();
    },
    // 打印
    toPrint() {
      setTimeout(() => {
        window.localStorage.lcHealthContentPrintPage = $(
          this.$refs.lcHealthContentPrintPage
        ).html();
        if (process.env.NODE_ENV === "production") {
          let newWid = window.open();
          newWid.location.href = "/crNursing/print/lcHealth";
        } else {
          this.$router.push(`/print/lcHealth`);
        }
      }, 500);
    }
  },
  computed: {
    patientInfo() {
      return this.$route.query;
    }
  }
};
</script>
