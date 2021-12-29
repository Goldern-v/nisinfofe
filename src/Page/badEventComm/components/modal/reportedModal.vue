<template>
  <el-dialog
    title="事件提交"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form
      :model="data"
      :rules="rules"
      ref="reportedForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label-width="110px" label="是否匿名上报" prop="isAnonymity">
        <el-radio-group v-model="data.isAnonymity">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label-width="110px" label="院区" prop="area">
        <el-radio-group v-model="data.area">
          <el-radio label="本部">本部</el-radio>
          <el-radio label="华美">华美</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报告人类型" prop="reporterType">
        <el-select v-model="data.reporterType" placeholder="请选择报告人类型">
          <el-option label="临床医生" value="临床医生"></el-option>
          <el-option label="临床护士" value="临床护士"></el-option>
          <el-option label="门诊医技人员" value="门诊医技人员"></el-option>
          <el-option label="药学系统人员" value="药学系统人员"></el-option>
          <el-option label="行政后勤人员" value="行政后勤人员"></el-option>
          <el-option label="其他人员" value="其他人员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发生地点" prop="happenedPlace">
        <el-input v-model="data.happenedPlace"></el-input>
      </el-form-item>
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="门诊/住院号" prop="patientId">
            <el-input v-model="data.patientId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="患者姓名" prop="name">
            <el-input v-model="data.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-input v-model="data.sex" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="data.age" ></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发生时间" prop="happenedDate">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              v-model="data.happenedDate"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发生科室" prop="happenedDept">
            <el-input v-model="data.happenedDept" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="事件类别" prop="eventType">
            <el-radio-group v-model="data.eventType" :disabled="true">
              <el-radio label="跌倒">跌倒</el-radio>
              <el-radio label="非计划拔管">非计划拔管</el-radio>
              <el-radio label="压力性损伤">压力性损伤</el-radio>
              <el-radio label="药物应用">药物应用</el-radio>
              <el-radio label="其他类">其他类</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发生地点" prop="happenedPlace">
            <el-input v-model="data.happenedPlace"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->

      <!-- <el-form-item label="事情详情" prop="courseOfEvent">
        <el-input
          type="textarea"
          :rows="4"
          v-model="data.courseOfEvent"
        ></el-input>
      </el-form-item> -->
      <el-form-item class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">提 交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        isAnonymity: [
          { required: true, message: "请选择是否匿名上报", trigger: "change" }
        ],
        area: [
          { required: true, message: "请选择院区", trigger: "change" }
        ],
        reporterType: [
          { required: true, message: "请选择报告人类型", trigger: "change" }
        ],
        happenedDate: [
          {
            type: "date",
            required: true,
            message: "请选择发生日期",
            trigger: "change"
          }
        ],
        courseOfEvent: [
          { required: true, message: "请填写事件经过", trigger: "blur" }
        ]
      },
      deptList: []
    };
  },
  mounted() {
    let deptList = sessionStorage.getItem("deptList");
    try {
      deptList = JSON.parse(deptList);
    } catch (error) {
      //字符串
      deptList = [];
    }
    this.deptList = deptList;
  },
  methods: {
    close() {
      this.$refs["reportedForm"].resetFields();
      this.$emit("close", false);
    },
    confirm() {
      this.$refs["reportedForm"].validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .el-dialog--small {
  width: 50% !important;
  .el-dialog__title {
    font-size: 20px;
  }
}
/deep/ .el-dialog__header {
  text-align: center;
}
.dialog-footer {
  text-align: right;
}
</style>