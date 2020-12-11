<template>
  <SweetModal ref="modal" :title="title" :modal-width="450">
    <ElForm
      class="edit-modal-form"
      style="margin-bottom: 20px"
      label-width="100px"
    >
      <ElFormItem label="年龄：" required>
        <ElInput v-model="form.age" />
      </ElFormItem>
    </ElForm>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" type="primary" @click="onConfirm">保存</ElButton>
  </SweetModal>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import * as apis from "../api";
import costVue from "../../cost/cost.vue";
const defaultForm = {};

export default {
  mixins: [common],
  data: () => ({
    title: "",
    form: {
      recordDate: new Date(),
      recordTime: new Date(),
      // age: this.queryInfo.age,
      age: "",
    },
  }),
  props: {
    sugarItem: Array,
  },
  computed: {
    queryInfo() {
      return this.$route.query;
    },
  },
  mounted() {
    this.getFormHead();
  },
  methods: {
    getFormHead() {
      apis
        .getFormHeadData(this.queryInfo.patientId, this.queryInfo.visitId)
        .then((res) => {
          this.form.age = res.data.data.itemMap.age || this.form.age;
          console.log("this.form.age", this.form.age);
        });
    },
    open(title, form) {
      this.title = title;
      this.curEmpName = this.userInfo.empName;
      this.curEmpNo = this.userInfo.empNo;
      this.$refs.modal.open();
      if (form) {
        this.form = {
          recordDate: new Date(form.recordDate || new Date()),
          recordTime: new Date(form.recordDate || new Date()),
          age: form.age || this.form.age || this.queryInfo.age,
        };
      } else {
        this.form = {
          recordDate: new Date(),
          recordTime: new Date(),
          age: this.form.age || this.queryInfo.age,
        };
      }
    },
    close() {
      this.$refs.modal.close();
    },
    openSignModal() {
      window.openSignModal((password, empNo) => {
        apis.getUser(password, empNo).then((res) => {
          this.curEmpName = res.data.data.empName;
          this.curEmpNo = res.data.data.empNo;
        });
      });
    },
    onClose() {
      this.close();
    },
    onConfirm() {
      const data = { ...this.form };
      data.formCode = "sugar";
      // delete data.age;
      delete data.recordTime;
      data.itemMap = [
        {
          itemCode: "age",
          itemValue: this.form.age + "",
        },
      ];
      console.log("ageData", data);
      this.$emit("confirm", data);
      this.onClose();
    },
    updateTetxInfo(label, autoText) {
      window.openSetTextModal(
        (text) => {
          this.form.sugarItem = text;
        },
        autoText,
        `添加${label}`
      );
    },
  },

  created() {
    if (this.HOSPITAL_ID == "lingcheng") {
      this.typeList = this.sugarItem;
    }
  },
  watch: {
    sugarItem(newVal, oldVal) {
      if (newVal && this.HOSPITAL_ID == "lingcheng") {
        this.typeList = this.sugarItem;
      }
    },
    "form.sugarItem"(newVal, oldVal) {
      if (this.HOSPITAL_ID == "lingcheng" && newVal == "自定义") {
        this.updateTetxInfo("自定义项目");
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.edit-modal-form {
  padding-right: 50px;

  >>>.el-input, >>>.el-select, >>>.el-input-number {
    width: 100%;
  }

  .unit {
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: 5px;
    word-break: keep-all;
  }

  .btn {
    cursor: pointer;
    color: blue;
    margin-left: 5px;
  }
}

>>>.sweet-modal .sweet-content {
  min-height: 55px !important;
}
</style>

<style lang="stylus">
.el-time-panel {
  z-index: 10002 !important;
}
</style>
