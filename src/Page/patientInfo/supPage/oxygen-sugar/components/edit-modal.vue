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
      <ElFormItem label="血氧值：" required>
        <ElInput v-model="form.sugarValue" />
        <span class="unit">%</span>
      </ElFormItem>
      <ElFormItem  label="心率：" required>
        <ElInput v-model="form.sugarItem" />
        <span class="unit">次/分</span>
      </ElFormItem>
      <ElFormItem
        label="备注："
        v-if="HOSPITAL_ID == 'beihairenyi'"
      >
        <!-- <ElInput v-model="form.expand3" /> -->
        <el-input
        resize=none
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  v-model="form.expand3">
</el-input>
      </ElFormItem>
      <!-- <ElFormItem label="血酮值：" required v-if="HOSPITAL_ID == 'liaocheng'">
        <ElInput v-model="form.riValue" />
        <span class="unit">(mmol/L)</span>
      </ElFormItem> -->
      <ElFormItem
        :label="HOSPITAL_ID == 'liaocheng' ? '测量者：' : '签名：'"
        required
      >
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
import {getSugarItemDict} from '../api/index'
import patientInfoVue from "../../../patientInfo.vue";
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
      sugarValue: '',
      riValue: '',
      remarks:'',
      expand3:''
    },
    curEmpName: "",
    curEmpNo: "",
    typeList: [
      {
        vitalSign: "空腹",
      },
      {
        vitalSign: "早餐后2H",
      },
      {
        vitalSign: "午餐前",
      },
      {
        vitalSign: "午餐后2H",
      },
      {
        vitalSign: "晚餐前",
      },
      {
        vitalSign: "晚餐后2H",
      },
      {
        vitalSign: "睡前",
      },
      {
        vitalSign: "复测",
      },
      {
        vitalSign: "微机血糖",
      },
      {
        vitalSign: "随机",
      },
    ],
    huaduTypeList: [
      {
        vitalSign: "指尖血糖",
      },
      {
        vitalSign: "空腹",
      },
      {
        vitalSign: "早餐后2H",
      },
      {
        vitalSign: "午餐前",
      },
      {
        vitalSign: "午餐后2H",
      },
      {
        vitalSign: "晚餐前",
      },
      {
        vitalSign: "晚餐后2H",
      },
      {
        vitalSign: "睡前",
      },
      {
        vitalSign: "复测",
      },
      {
        vitalSign: "随机",
      },
    ],
    quzhouTypeList: [
      {
        vitalSign: "早餐前",
      },
      {
        vitalSign: "早餐后2H",
      },
      {
        vitalSign: "午餐前",
      },
      {
        vitalSign: "午餐后2H",
      },
      {
        vitalSign: "晚餐前",
      },
      {
        vitalSign: "晚餐后2H",
      },
      {
        vitalSign: "睡前",
      },
    ],
    BeiHaiTypeList: [],//用接口返回的字典
  }),
  props: {
    sugarItem: Array,
  },
  computed: {
    patientInfo() {
      return this.$route.query;
    },
  },
  methods: {
    open(title, form) {
      this.title = title;
      this.curEmpName = this.userInfo.empName;
      this.curEmpNo = this.userInfo.empNo;
      this.$refs.modal.open();

      let defaultSugarItem = "微机血糖";
      if (this.HOSPITAL_ID != "hj" && this.HOSPITAL_ID != "huadu") {
        defaultSugarItem = this.typeList ? this.typeList[0].vitalSign : "凌晨";
      }
      if (this.HOSPITAL_ID == "quzhou") {
        defaultSugarItem = this.quzhouTypeList
          ? this.quzhouTypeList[0].vitalSign
          : "凌晨";
      }
      if (this.HOSPITAL_ID == "huadu") {
        defaultSugarItem = this.huaduTypeList
          ? this.huaduTypeList[0].vitalSign
          : "指尖血糖";
      }
      if (this.HOSPITAL_ID == "fuyou") {
        let expand2 = form ? 2 : 1;
        form = form || {};
        this.form = {
          patientId: this.patientInfo.patientId, //--患者id
          visitId: this.patientInfo.visitId, //--住院次数
          name: this.patientInfo.name, //-患者姓名
          bedLabel: this.patientInfo.bedLabel, //--床号
          recordDate: new Date(form.recordDate || new Date()), //--录入时间
          recordTime: new Date(form.recordDate || new Date()),
          sugarItem: form.sugarItem || defaultSugarItem, //--血糖项目名称
          sugarValue: form.sugarValue || 0, //--项目值
          riValue: form.riValue || 0, //--可以传空
          expand3:form.expand3,
          remarks:form.remarks,
          nurseEmpNo: this.curEmpNo, //--护士工号
          nurse: this.curEmpName, //--护士姓名
          expand1: "",
          expand2, //--操作方式，1：添加，2：修改~~~~
          wardCode: this.patientInfo.wardCode || "",
        };
        this.oldRecordDate = form ? form.recordDate : "";
        return;
      }
      if (form) {
        this.form = {
          recordDate: new Date(form.recordDate || new Date()),
          recordTime: new Date(form.recordDate || new Date()),
          sugarItem: form.sugarItem || defaultSugarItem,
          sugarValue: form.sugarValue || 0,
          riValue: form.riValue || 0,
          remarks:form.remarks || '',
          expand3:form.expand3 || '',
          recordId: form.recordId || "",
        };
        this.oldRecordDate = form.recordDate;
      } else {
        this.form = {
          recordDate: new Date(),
          recordTime: new Date(),
          sugarItem: defaultSugarItem,
          sugarValue: 0,
          riValue: 0,
          remarks:'',
          expand3:'',
          recordId: "",
        };
        this.oldRecordDate = "";
      }
      if (this.HOSPITAL_ID == "beihairenyi"||this.HOSPITAL_ID == "liaocheng") {
        this.form.sugarValue = this.form.sugarValue || '';
        this.form.riValue = this.form.riValue || '';
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
      const data = { ...this.form, oldRecordDate: this.oldRecordDate };
      console.log(data);
      data.recordDate.setHours(data.recordTime.getHours());
      data.recordDate.setMinutes(data.recordTime.getMinutes());
      data.recordDate.setSeconds(data.recordTime.getSeconds());
      if (this.HOSPITAL_ID != "fuyou") {
        data.nurse = this.curEmpNo;
      }
      delete data.recordTime;
      // 针对花都血糖项目进行保存
      if (this.HOSPITAL_ID == "huadu") {
        let list = this.huaduTypeList.map((item) => {
          return { name: item.vitalSign, code: item.vitalSign };
        });
        let data = {
          code: this.patientInfo.wardCode + ":指尖血糖测定项目",
          itemList: list,
        };
        apis.saveDictItems(data).then((res) => {
          console.log("调用保存字典的接口", res.data);
          return;
        });
      }
      this.$emit("confirm", data);
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
    /**把新增项加入下拉列表的数组 */
    setNewItem(event) {
      let newItem = { vitalSign: event };
      let hasItem = this.huaduTypeList.map((item, index) => {
        if (item.vitalSign == newItem.vitalSign) {
          return true;
        }
      });
      if (!hasItem.some((el) => el)) {
        this.huaduTypeList.push(newItem);
      }
      console.log(this.huaduTypeList, "============");
    },
  },
  created() {
    if (this.HOSPITAL_ID == "gy") {
      apis.getTypeList(this.deptCode).then((res) => {
        this.typeList = res.data.data;
      });
    }
    if (this.HOSPITAL_ID != "hj" && this.HOSPITAL_ID != "huadu" && this.HOSPITAL_ID != "beihairenyi") {
      
      this.typeList = this.sugarItem;
    }
    if (this.HOSPITAL_ID === "quzhou") {
      this.quzhouTypeList = this.sugarItem;
    }
    if(this.HOSPITAL_ID == "beihairenyi"){
      //北海血糖项目字典接口
       getSugarItemDict().then(res=>{
      this.BeiHaiTypeList=res.data.data
    })
    }
    // 花都项目可编辑
    if (this.HOSPITAL_ID == "huadu") {
      let patientCode = this.patientInfo.wardCode + ":指尖血糖测定项目";
      apis.getDictItems(patientCode).then((res) => {
        if (res.data.data.length) {
          // 做格式转换
          let list = res.data.data;
          this.huaduTypeList = list.map((o) => {
            return { vitalSign: o.name };
          });
        }
        //
      });
    }
  },
  watch: {
    sugarItem(newVal, oldVal) {
      if (newVal && this.HOSPITAL_ID != "hj" && this.HOSPITAL_ID != "huadu" && this.HOSPITAL_ID != "beihairenyi") {
        this.typeList = this.sugarItem;
      }
      if (newVal && this.HOSPITAL_ID == "quzhou") {
        this.quzhouTypeList = this.sugarItem;
      }
    },
    huaduTypeList(newVal, oldVal) {
      if (newVal && this.HOSPITAL_ID == "huadu") {
        this.huaduTypeList = newVal;
        console.log("this.huaduTypeList", newVal);
      }
    },
    "form.sugarItem"(newVal, oldVal) {
      if (
        this.HOSPITAL_ID != "hj" &&
        this.HOSPITAL_ID != "huadu" &&
        newVal == "自定义"
      ) {
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
</style>

<style lang="stylus">
.el-time-panel {
  z-index: 10002 !important;
}
</style>
