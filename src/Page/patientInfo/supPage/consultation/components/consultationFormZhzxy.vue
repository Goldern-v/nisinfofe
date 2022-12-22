<template>
  <div>
    <el-row
      class="consultationForm"
      v-loading="consultation.status == '' || !conId"
    >
      <div class="btn-box" v-show="!isPrinted">
        <el-button
          size="small"
          type="primary"
          :disabled="!allowSave"
          @click="submit"
          >保存</el-button
        >
        <el-button size="small" @click="handlePrint">打印</el-button>
        <el-button size="small" @click="handleDel">删除</el-button>
      </div>
      <h1 class="title">
        {{ consultation.consultationName || "护理会诊单" }}
      </h1>
      <el-form>
        <div class="form-header">
          <span>床号：{{ consultation.bedNo }}</span>
          <span>姓名：{{ consultation.consultationObject }}</span>
          <span>性别：{{ consultation.sex }}</span>
          <span>年龄：{{ consultation.age }}</span>
        </div>

        <div class="draft-con">
          <el-form-item label="会诊类型" :label-width="formLabelWidth">
            <el-select
              v-model="consultation.type"
              placeholder="请选择会诊类型"
              class="form-item"
              :readonly="!allowSave"
              :style="{ 'pointer-events': !allowSave ? 'none' : 'auto' }"
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
              v-model="consultation.nursingDiagnosis"
            />
          </el-form-item>

          <el-form-item label="邀请会诊科室" :label-width="formLabelWidth">
            <el-select
              :disabled="!allowSave"
              v-model="consultation.consultationDeptCode"
              placeholder="请选择"
              filterable
              @change="changeDeptCode"
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
              class="select-multi"
              :disabled="!allowSave"
              multiple
              filterable
              v-model="members"
              placeholder="请选择"
            >
              <el-option
                v-for="item in memberLists"
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
              :readonly="!allowSave"
              v-model="consultation.consultationPurposes"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="主要护理问题" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="2"
              :readonly="!allowSave"
              v-model="consultation.mainNursingMessage"
            />
          </el-form-item>
          <el-form-item label="申请会诊类别" :label-width="formLabelWidth">
            <el-input
              :readonly="!allowSave"
              v-model="consultation.consultationType"
            />
          </el-form-item>
          <el-form-item
            label="护理会诊情况及意见时间"
            :label-width="formLabelWidth"
          >
            <el-date-picker
              type="datetime"
              placeholder="请输入内容"
              v-model="results[0].createTime"
              :readonly="!allowSave"
            />
          </el-form-item>
          <el-form-item
            label="护理会诊情况及意见"
            :label-width="formLabelWidth"
          >
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="results[0].content"
              :readonly="!allowSave"
            />
          </el-form-item>
        </div>
      </el-form>
    </el-row>

    <div id="print" class="print" ref="printRef" v-show="isPrinted">
      <div class="title1">{{ hospitalName }}</div>
      <div class="title2">
        {{ consultation.consultationName || "护理会诊单" }}
      </div>
      <div class="print-header flex flex-1 line--top">
        <span>姓名：{{ consultation.consultationObject }}</span>
        <span>性别：{{ consultation.sex }}</span>
        <span>年龄：{{ consultation.age }}</span>
        <span>病区：{{ patientInfo.deptName }}</span>
        <span>床号：{{ consultation.bedNo }}</span>
        <span>住院号：{{ patientInfo.inpNo }}</span>
      </div>

      <div class="print-content">
        <div class="flex">
          <span>邀请科室：{{ consultation.consultationDeptName }}</span>
          <span>{{ membersName }}</span>
          <span>{{ consultation.type + "会诊" }}</span>
        </div>
        <div class="print-content__box">
          临床诊断：{{ consultation.nursingDiagnosis }}
        </div>
        <div class="print-content__box">
          简要病史：{{ consultation.consultationPurposes }}
        </div>
        <div class="print-content__box">
          主要护理问题：{{ consultation.mainNursingMessage }}
        </div>
        <div class="print-content__box">
          申请会诊类别：{{ consultation.consultationType }}
        </div>
        <div class="flex flex-2">
          <span>申请科室：{{ patientInfo.deptName }}</span>
          <span>申请人：</span>
          <img
            class="sign-img"
            :src="getSignImg(consultation.creatorId)"
            alt=""
          />
          <span
            >日期:
            {{ moment(consultation.createTime).format(formatText) }}</span
          >
        </div>
        <div class="line--top print-content__box1">
          护理会诊意见：{{ results[0].content }}
        </div>
        <div class="flex flex-2">
          <span>会诊科室：{{ consultation.consultationDeptName }}</span>
          <span>会诊护士：</span>
          <img
            v-for="v in members"
            :key="v"
            class="sign-img"
            :src="getSignImg(v)"
            alt=""
          />
          <span
            >日期:
            {{
              results[0] && results[0].createTime
                ? moment(results[0].createTime).format(formatText)
                : "无"
            }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  detailNew,
  getAllDept,
  update,
  listConsultationNurse,
  delConNew,
} from "@/api/consultation";
import BusFactory from "vue-happy-bus";
import print from "printing";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";

export default {
  name: "ConsultationForm",
  mixins: [common],
  data() {
    return {
      moment,
      formatText: "YYYY年MM月DD日HH时mm分",
      bus: BusFactory(this),
      dialogFormVisible: false,
      formLabelWidth: "85px",
      conId: "",
      consultation: {
        consultationDeptCode: "",
      },
      // 受邀会诊人列表
      members: [],
      memberLists: [],
      // 护理会诊情况及意见
      results: [
        {
          content: "",
        },
      ],
      isPrinted: false,
      deptList: [],
      applyDepartmentOptions: [],
      pageLoading: false,
      state: {
        inDel: false,
      },
      // 是否第一个
      isInit: true,
    };
  },
  computed: {
    // 允许保存
    allowSave() {
      const isMember = this.members.find((v) => v == this.empNo);
      return (
        this.consultation.status == "1" &&
        (isMember || this.empNo === this.consultation.creatorId)
      );
      return this.consultation.status == "1" && (this.isAuditor || isMember);
    },
    deptName() {
      return (
        (this.deptList.find((v) => v.code == this.consultation.deptCode) || {})
          .name || ""
      );
    },
    patientInfo() {
      return this.$route.query || {};
    },
    membersName() {
      return this.members
        .map(
          (v) =>
            (this.memberLists.find((v1) => v1.empNo === v) || { empName: "" })
              .empName
        )
        .join(",");
    },
  },
  methods: {
    getData(id) {
      detailNew(id)
        .then((res) => {
          this.consultation = res.data.data.nursingConsultation;
          let isMember = false;
          this.members = res.data.data.members.map((v) => {
            if (this.empNo === v.empNo) {
              isMember = true;
            }
            return v.empNo;
          });
          if (this.empNo === this.consultation.creatorId) {
            isMember = true;
          }
          this.results =
            res.data.data.results.map((v) => ({
              ...v,
              createTime: v.createTime ? new Date(v.createTime) : v.createTime,
            })) || [];
          this.results.length === 0 &&
            this.results.push({
              memberId: isMember ? this.empNo : "",
              content: "",
              consultationId: this.conId,
              createTime: "",
            });
        })
        .catch((e) => {
          console.log("test-e", e);
        });
    },
    init(id) {
      this.consultation = {
        status: "",
      };
      this.results = [
        {
          content: "",
        },
      ];
      this.conId = id;
      this.state = {
        inDel: false,
      };
      this.isInit = true;
      this.getData(id);
    },
    refresh() {
      this.init(this.conId);
      this.bus.$emit("consultationListRefresh");
    },
    open(item) {
      this.init(item.consultationId);
    },
    filterData() {
      let data = {
        nursingConsultation: {
          ...this.consultation,
          consultationDeptName:
            this.applyDepartmentOptions.find(
              (v) => v.code == this.consultation.consultationDeptCode
            ).name || "",
        },
        results: this.results.map((v) => ({
              ...v,
              createTime: v.createTime ? moment(v.createTime).format('YYYY-MM-DD HH:mm:ss') : v.createTime,
            })),
        members: this.members.map((v) => ({ empNo: v })),
      };
      return data;
    },
    submit() {
      // this.btnLoading.submit = true;
      update(this.filterData())
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.desc,
            type: "success",
          });
          // 刷新
          this.refresh();
          // this.btnLoading.submit = false;
        })
        .catch((res) => {
          // this.btnLoading.submit = false;
        });
    },
    // 打印
    handlePrint() {
      this.isPrinted = true;
      this.submit()
      this.$nextTick(() => {
        print(this.$refs.printRef, {
          beforePrint: null,
          // direction: "horizontal",
          injectGlobalCss: true,
          scanStyles: false,
          css: `
						body {
							background: #fff !important;
						}
						@page {
							margin: 0mm 10mm;
							size: A4 portrait;
						}
            .print {
              padding: 0 10px;
            }
					`,
        }).then(() => {
          this.isPrinted = false;
        });
      });
    },
    /**
     * 获取会诊护士选项列表
     */
    getMembers(params) {
      listConsultationNurse(params).then((res) => {
        this.memberLists = res.data.data || [];
      });
    },
    changeDeptCode(v) {
      if (!v) return;
      if (this.isInit) {
        this.isInit = false;
      } else {
        this.members = [];
      }
      this.getMembers({
        deptCode: v,
      });
    },
    // 删除申请
    handleDel() {
      delConNew(this.conId)
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.desc,
            type: "success",
          });
          // 刷新
          this.bus.$emit("consultationListRefresh");
        })
        .catch((res) => {});
    },
    // 获取签名图片
    getSignImg(name) {
      return `/crNursing/api/file/signImage/${name}?${this.token}`;
    },
  },
  created() {
    getAllDept(this.$route.query.wardCode)
      .then((res) => {
        let result = res.data.data.filter((item) => {
          return item.code != this.$route.query.wardCode;
        });
        this.applyDepartmentOptions = result;
        this.deptList = res.data.data || [];
      })
      .catch((e) => {});
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  justify-content: flex-end;
}
.title {
  position: relative;
  font-size: 18px;
  color: #333333;
  text-align: center;
  font-weight: 600;
  margin: 16px;
}
.form {
  &-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #333333;
    border-bottom: 1px dashed #a09d9d;
    padding-bottom: 1em;
  }
  &-neck {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 13px;
    span {
      color: #687179;
      &:nth-child(2) {
        margin-left: 30px;
      }
      &:nth-child(3) {
        margin-left: 30px;
      }
    }
  }
}
.print {
  font-size: 16px;
  line-height: 20px;
  .title1,
  .title2 {
    text-align: center;
    font-weight: 900;
  }
  .title1 {
    font-size: 22px;
    line-height: 26px;
    margin: 20px 0 10px;
  }
  .title2 {
    font-size: 20px;
  }
  .print-header {
    padding: 5px 0;
    margin-top: 20px;
  }
  .line--top {
    border-top: 1px solid #000;
  }

  .flex {
    display: flex;
    align-items: center;
    span + span {
      padding-left: 15px;
    }
  }
  .flex-1 {
    justify-content: space-between;
  }
  .flex-2 {
    justify-content: flex-end;
  }
  .print-content {
    border: 1px solid #000;
    padding-top: 5px;
    .print-content__box {
      min-height: 60px;
    }
    .print-content__box1 {
      min-height: 100px;
    }
    .sign-img {
      height: 20px;
      width: auto;
    }
  }
}
</style>

<style lang="scss">
.consultationForm {
  .el {
    &-textarea__inner {
      &::placeholder {
        font-size: 13px;
      }
      border: 1px solid #cbd5dd;
      border-radius: 4px;
    }
    &-input__icon + .el-input__inner {
      width: 190px;
      height: 30px;
      border: 1px solid #c2cbd2;
      color: #333333;
      &::placeholder {
        font-size: 13px;
      }
    }
    &-dialog--small {
      width: 650px;
      background: #f7fafa;
      border: 1px solid #cbd5dd;
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
        font-size: 12px; // &:nth-child(1) {
        // 	background: #48AAEB;
        // 	border-color: #48AAEB;
        // }
        &:nth-child(2) {
          background: #f45d3f;
          border-color: #f45d3f;
        }
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
      }
    }
    &-icon-close::before {
      content: "";
    }
  }
  .el-select {
    width: 100%;
    .el-input__inner {
      width: 100%;
    }
  }
}
@page {
  .btn-box {
    display: none;
  }
  textarea {
    min-height: 54px;
  }
}
</style>
