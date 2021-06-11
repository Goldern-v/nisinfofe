<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" :title="title">
      <div class="form-con" v-loading="loading">
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">开始时间：</span>
          <masked-input
            type="text"
            class="mask-input input-item readOnly"
            :showMask="false"
            v-model="startDate"
            :readOnly="true"
            :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar="O"
          ></masked-input>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">结束时间：</span>
          <masked-input
            type="text"
            class="mask-input input-item readOnly"
            :readOnly="true"
            :showMask="false"
            v-model="recordDate"
            :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar="O"
          ></masked-input>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">总引流量：</span>
          <el-input class="input-item" v-model="fluidSize" placeholder="请填写总引流量"></el-input>
          <span class="unit">ml</span>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='scss' scoped>
.label {
  font-size: 14px;
  color: #333333;
  width: 100px;
  text-align: right;
}
.input-item {
  width: 250px;
  margin-right: 30px;
  /* & /deep/ input {
    height: 30px;
  } */
}
.unit {
  margin-left: -25px;
  width: 25px;
}
.mask-input {
  height: 37px;
  background: #fff;
  border: 1px solid #c2cbd2;
  border-radius: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgb(191, 217, 210);
  box-sizing: border-box;
  color: rgb(31, 61, 53);
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.readOnly {
  cursor: not-allowed;
}
</style>
<script>
import common from "@/common/mixin/common.mixin";
import { fluidSumUp, saveRecord } from "../api";
import { model } from "../store";
import moment from "moment";
export default {
  mixins: [common],
  data() {
    return {
      title: "添加引流量",
      loading: false,
      isEditRecord: false,
      recordDate: "", //记录时间
      startDate: "",
      fluidSize: ""
    };
  },
  methods: {
    validate() {
      if (model.selectedBlock.status !== undefined) {
        return true;
      } else {
        this.$message.warning("请先选择管道");
        return false;
      }
    },
    async init(record) {
      this.loading = true;
      if (this.isEditRecord) {
        /** 编辑状态 */
        this.title = "修改引流量总结";
        this.recordDate = record.recordDate;
        this.startDate = record.startDate;
        this.fluidSize = record.fluidSize;
      }
      this.loading = false;
    },
    open(record) {
      if (!this.validate()) return;
      this.isEditRecord = record ? record : false;
      this.init(record);
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let { patientId, visitId } = model.selectedPatient;
      let { orderNo, orderSubNo } = model.selectedBlock;
      let record = {
        patientId,
        visitId,
        orderNo,
        orderSubNo,
        recordDate: this.recordDate.replace(/\O/g, 0), //时间
        startDate: this.startDate.replace(/\O/g, 0),
        fluidSize: this.fluidSize
      };
      if (this.isEditRecord) {
        saveRecord(Object.assign({}, this.isEditRecord, record)).then(res => {
          this.$message.success("更新评估成功");
          model.getRecordList();
          this.close();
        });
      }
    }
  },
  components: {}
};
</script>
