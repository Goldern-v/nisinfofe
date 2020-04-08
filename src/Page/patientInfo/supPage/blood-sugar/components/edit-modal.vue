<template>
  <SweetModal ref="modal" :title="title" :modal-width="450">
    <ElForm
      class="edit-modal-form"
      style="margin-bottom: 20px"
      label-width="100px"
    >
      <ElFormItem label="日期：" required>
        <ElDatePicker v-model="form.recordDate" :clearable="false" />
      </ElFormItem>
      <ElFormItem label="时间：" required>
        <ElTimePicker
          v-model="form.recordTime"
          :clearable="false"
          format="HH:mm"
          value-format="HH:mm"
        />
      </ElFormItem>
      <ElFormItem label="项目：" required>
        <ElSelect v-model="form.sugarItem">
          <ElOption
            v-for="item in typeList"
            :key="item.vitalSign"
            :label="item.vitalSign"
            :value="item.vitalSign"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="血糖值：" required>
        <ElInput v-model="form.sugarValue" />
        <span class="unit">(mmol/L)</span>
      </ElFormItem>
      <ElFormItem label="RI剂量：" required v-if="HOSPITAL_ID != 'gy'">
        <ElInput v-model="form.riValue" />
        <span class="unit">(ü)</span>
      </ElFormItem>
      <ElFormItem label="执行人：" required>
        <span>{{ curEmpName }}</span>
        <span class="btn" @click="openSignModal">切换</span>
      </ElFormItem>
    </ElForm>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" type="primary" @click="onConfirm">保存</ElButton>
  </SweetModal>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import * as apis from "../api";
const defaultForm = {};

export default {
  mixins: [common],
  data: () => ({
    title: "",
    oldRecordDate: "",
    form: {
      recordDate: new Date(),
      recordTime: new Date(),
      sugarItem: "微机血糖",
      sugarValue: 0,
      riValue: 0
    },
    curEmpName: "",
    curEmpNo: "",
    typeList: [
      {
        vitalSign: "空腹"
      },
      {
        vitalSign: "早餐后2H"
      },
      {
        vitalSign: "午餐前"
      },
      {
        vitalSign: "午餐后2H"
      },
      {
        vitalSign: "晚餐前"
      },
      {
        vitalSign: "晚餐后2H"
      },
      {
        vitalSign: "睡前"
      },
      {
        vitalSign: "复测"
      },
      {
        vitalSign: "微机血糖"
      },
      {
        vitalSign: "随机"
      }
    ],
    typeList2: [
      {
        vitalSign: "凌晨"
      },
      {
        vitalSign: "早餐前"
      },
      {
        vitalSign: "早餐后"
      },
      {
        vitalSign: "午餐前"
      },
      {
        vitalSign: "午餐后"
      },
      {
        vitalSign: "晚餐前"
      },
      {
        vitalSign: "晚餐后"
      },
      {
        vitalSign: "睡前"
      },
      {
        vitalSign: "其他1"
      },
      {
        vitalSign: "其他2"
      },
      {
        vitalSign: "其他3"
      },
      {
        vitalSign: "其他21"
      },
      {
        vitalSign: "其他31"
      },
      {
        vitalSign: "备注"
      }
    ] //陵城项目列表
  }),
  methods: {
    open(title, form) {
      this.title = title;
      this.curEmpName = this.userInfo.empName;
      this.curEmpNo = this.userInfo.empNo;
      this.$refs.modal.open();

      let defaultSugarItem = "微机血糖";
      if (this.HOSPITAL_ID == "lingcheng") {
        defaultSugarItem = "凌晨";
      }
      if (form) {
        this.form = {
          recordDate: new Date(form.recordDate || new Date()),
          recordTime: new Date(form.recordDate || new Date()),
          sugarItem: form.sugarItem || defaultSugarItem,
          sugarValue: form.sugarValue || 0,
          riValue: form.riValue || 0,
          recordId: form.recordId || ""
        };
        this.oldRecordDate = form.recordDate;
      } else {
        this.form = {
          recordDate: new Date(),
          recordTime: new Date(),
          sugarItem: defaultSugarItem,
          sugarValue: 0,
          riValue: 0,
          recordId: ""
        };
        this.oldRecordDate = "";
      }
    },
    close() {
      this.$refs.modal.close();
    },
    openSignModal() {
      window.openSignModal((password, empNo) => {
        apis.getUser(password, empNo).then(res => {
          this.curEmpName = res.data.data.empName;
          this.curEmpNo = res.data.data.empNo;
        });
      });
    },
    onClose() {
      this.close();
    },
    onConfirm() {
      const data = { ...this.form, oldRecordDate: this.oldRecordDate };

      data.recordDate.setHours(data.recordTime.getHours());
      data.recordDate.setMinutes(data.recordTime.getMinutes());
      data.recordDate.setSeconds(data.recordTime.getSeconds());
      data.nurse = this.curEmpNo;
      delete data.recordTime;

      this.$emit("confirm", data);
    }
  },
  created() {
    if (this.HOSPITAL_ID == "gy") {
      apis.getTypeList(this.deptCode).then(res => {
        this.typeList = res.data.data;
      });
    } else if (this.HOSPITAL_ID == "lingcheng") {
      this.typeList = [...this.typeList2];
    }
  }
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
</style>

<style lang="stylus">
.el-time-panel {
  z-index: 10002 !important;
}
</style>
