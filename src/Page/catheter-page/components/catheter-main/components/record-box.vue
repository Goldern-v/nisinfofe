<template>
  <div class="record-box" :style="data.type == '1' && {height: '60px'}">
    <!-- {{data.type}} -->
    <div class="item-content">{{moment(data.recordDate).format('HH:mm')}}</div>
    <div class="item-content">{{data.creatorName}}</div>
    <div class="item-content">
      <type1 :data="data" v-if="data.type == '1'"></type1>
      <type2 :data="data" v-if="data.type == '2'"></type2>
      <type5 :data="data" v-if="data.type == '5'"></type5>
    </div>
    <div class="item-content">
      <span @click="updateRecord">修改</span>
      <span style="padding: 0 4px;">|</span>
      <span @click="delRecord">删除</span>
    </div>
  </div>
</template>

<script>
import type1 from "./items/type1";
import type2 from "./items/type2";
import type5 from "./items/type5";
import moment from "moment";
import { delRecord } from "../../../api";
import { model } from "../../../store";
export default {
  inject: [
    "openEvalModal",
    "openFluidModal",
    "openFluidSumUpModal",
    "openEditFluidSumUpModal"
  ],
  props: {
    data: {
      type: Object,
      defalut: {}
    }
  },
  data() {
    return {
      moment
    };
  },
  methods: {
    updateRecord() {
      if (this.data.type == "1") {
        this.openEvalModal(this.data);
      }
      if (this.data.type == "2") {
        this.openFluidModal(this.data);
      }
      if (this.data.type == "5") {
        this.openEditFluidSumUpModal(this.data);
      }
    },
    delRecord() {
      if (
        this.data.type == "1" ||
        this.data.type == "2" ||
        this.data.type == "5"
      ) {
        this.$confirm("删除后无法找回，是否删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          delRecord(this.data.id).then(res => {
            this.$message.success("删除成功");
            model.getRecordList();
          });
        });
      }
    }
  },
  components: { type1, type2, type5 }
};
</script>

<style lang='scss' scoped>
.record-box {
  height: 45px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px 2px 0px 2px;
  border: 1px solid rgba(203, 213, 221, 1);
  display: flex;
  align-items: stretch;
  margin-bottom: 10px;
  .item-content {
    height: 100%;
    border-right: 1px solid rgba(234, 238, 241, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #333;
    &:nth-child(1) {
      width: 76px;
    }
    &:nth-child(2) {
      width: 82px;
    }
    &:nth-child(3) {
      flex: 1 auto;
    }
    &:nth-child(4) {
      width: 110px;
      border: 0;
      color: #4bb08d;
      & span {
        cursor: pointer;
      }
    }
  }
}
</style>