<template>
  <section class="newFormDialog">
    <el-dialog
      title="护理会诊单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form>
        <div class="form-header">
          <span>床号：{{ bedNo }}</span>
          <span>姓名：{{ name }}</span>
          <span>性别：{{ sex }}</span>
          <span>年龄：{{ age }}</span>
          <span>科室：{{ department }}</span>
        </div>
        <el-form-item label="会诊类型" :label-width="formLabelWidth">
          <el-select
            v-model="form.type"
            placeholder="请选择活动区域"
            class="form-item"
          >
            <el-option label="普通" value="普通"></el-option>
            <el-option label="紧急" value="紧急"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="临床诊断" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.nursingDiagnosis"
          />
        </el-form-item>

        <el-form-item label="邀请会诊科室" :label-width="formLabelWidth">
          <el-select
            v-model="form.consultationDeptCode"
            placeholder="选择或输入关键词搜索"
            filterable
            multiple
          >
            <el-option
              v-for="item in applyDepartmentOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="邀请会诊护士" :label-width="formLabelWidth">
          <el-select
            multiple
            filterable
            v-model="form.members"
            placeholder="请选择"
          >
            <el-option
              v-for="item in members"
              :key="item.empNo"
              :label="item.empName"
              :value="item.empNo"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简要病史" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.consultationPurposes"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="主要护理问题" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.mainNursingMessage"
          />
        </el-form-item>
        <el-form-item label="申请会诊类别" :label-width="formLabelWidth">
          <el-input v-model="form.consultationType" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" center>
        <!-- <el-button type="info" @click="postData('暂存')" :loading="saveLoading"
          >暂存</el-button
        > -->
        <el-button
          type="primary"
          @click="postData('等待确认')"
          :loading="postLoading"
          >提交</el-button
        >
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  addConsultation,
  getAllDept,
  listConsultationNurseNew,
  patDiag,
} from "@/api/consultation";
// import multiselect from "@/plugin/vue-multiselect/src/index";
import BusFactory from "vue-happy-bus";
export default {
  name: "newFormDialog",
  // components: {
  //   multiselect,
  // },
  data() {
    return {
      bus: BusFactory(this),
      inDel: false,
      dialogFormVisible: false,
      formLabelWidth: "85px",
      // saveLoading: false,
      postLoading: false,
      // diagnosisList: [],
      bedNo: this.$route.query.bedLabel,
      name: this.$route.query.name,
      sex: this.$route.query.sex,
      age: this.$route.query.age,
      department: this.$route.query.wardName,
      form: {
        type: "普通",
        nursingDiagnosis: "",
        consultationDeptCode: [],
        members: [],
        consultationPurposes: "",
        mainNursingMessage: "",
        consultationType: "",
      },
      // 多选tag的菜单配置
      applyDepartmentOptions: [],
      members: [],
    };
  },
  watch: {
    "form.consultationDeptCode": {
      handler(v) {
        this.form.members = [];
        this.getMembers({
          deptCodes: v,
        });
      },
    },
  },
  methods: {
    init() {
      this.form = {
        type: "普通",
        nursingDiagnosis: this.$route.query.diagnosis || "",
        consultationDeptCode: [],
        members: [],
        consultationPurposes: "",
        mainNursingMessage: "",
        consultationType: "",
      };
    },
    open() {
      this.init();
      this.dialogFormVisible = true;
    },
    close() {
      this.dialogFormVisible = false;
    },
    filterData() {
      let user = localStorage.getItem("user");
      if (user && JSON.parse(user)) {
        user = JSON.parse(user);
      }
      const { members, consultationDeptCode, ...others } = this.form;
      let data = {
        nursingConsultation: {
          consultationDeptName:
            this.applyDepartmentOptions.filter(
              (v) => consultationDeptCode.includes(v.code)
            ).map(v => v.name).join(','),
          consultationDeptCode: consultationDeptCode.join(','),
          ...others,

          visitId: this.$route.query.visitId,
          creatorId: user.empNo || "",
          deptCode: this.$route.query.wardCode12,
          consultationObject: this.$route.query.name,
          age: this.$route.query.age,
          bedNo: this.$route.query.bedLabel,
          sex: this.$route.query.sex,
          patientId: this.$route.query.patientId,
          visitId: this.$route.query.visitId,
        },
        members: members.map(v => ({ empNo: v })),
      };
      return data;
    },
    postData(status) {
      // if (status == "暂存") {
      //   this.saveLoading = true;
      // } else {
      // }
      this.postLoading = true;
      addConsultation(this.filterData(status))
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.desc,
            type: "success",
          });
          // if (status == "暂存") {
          //   this.saveLoading = false;
          // } else {
          // }
          this.postLoading = false;
          this.close();
          // 刷新
          this.dialogFormVisible = false;
          this.bus.$emit("consultationListRefresh");
        })
        .catch((res) => {
          // if (status == "暂存") {
          //   this.saveLoading = false;
          // } else {
          // }
          this.postLoading = false;
        });
    },
    getMembers(params) {
      listConsultationNurseNew(params).then((res) => {
        this.members = res.data.data || [];
      });
    },
  },
  created() {
    getAllDept(this.$route.query.wardCode).then((res) => {
      let result = res.data.data.filter((item) => {
        return item.code != this.$route.query.wardCode;
      });
      this.applyDepartmentOptions = result;
    });
    // let route = this.$route.query;
    // patDiag(route.wardCode, route.patientId, route.visitId).then((res) => {
    //   this.diagnosisList = res.data.data;
    // });
  },
};
</script>


<style lang="stylus">
.newFormDialog {
  .form-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #333333;
    border-bottom: 1px dashed #A09D9D;
    padding-bottom: 1em;
  }

  .el {
    &-textarea__inner {
      &::placeholder {
        font-size: 13px; // color: #333333;
      }

      border: 1px solid #CBD5DD;
      border-radius: 4px;
    }

    &-input__icon+.el-input__inner {
      width: 190px;
      height: 30px;
      border: 1px solid #C2CBD2;
      color: #333333;

      &::placeholder {
        font-size: 13px;
      }
    }

    &-dialog--small {
      width: 650px;
      background: #F7FAFA;
      border: 1px solid #CBD5DD;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      border-radius: 4px;
    }

    &-dialog__header {
      font-size: 18px;
      color: #333333;
      text-align: center;
    }

    &-dialog__body {
      padding: 24px 25px 0;
    }

    &-dialog__footer {
      text-align: center;

      .el-button {
        width: 84px;
        border-radius: 2px;
        height: 34px;
        font-size: 12px;
      }
    }

    &-form-item__label {
      font-size: 12px;
      color: #687179;
      text-align: left;
    }

    &-form-item {
      margin: 10px 0;

      &:nth-child(4) {
        padding-bottom: 10px;
        border-bottom: 1px dashed #A09D9D;
      }
    }
  }
  .el-select {
    width: 100%;
    .el-input__inner {
			width: 100%;
		}
  }
}
</style>

