<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="编辑管道信息">
      <div class="form-con" v-loading="loading">
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">拔管日期：</span>
          <masked-input
            type="text"
            class="mask-input input-item"
            :showMask="false"
            v-model="endDate"
            :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar="O"
          ></masked-input>
        </div>

        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">拔管人：</span>
          <el-select class="input-item" v-model="endNurse" placeholder="请选择置管人">
            <el-option
              v-for="item in hsList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">拔管类型：</span>
          <el-select class="input-item" v-model="status" placeholder="请选择拔管类型">
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
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
</style>
<script>
import common from "@/common/mixin/common.mixin";
import { userDictInfo, listItem } from "@/api/common";
import { model } from "../store";
import moment from "moment";
export default {
  mixins: [common],
  data() {
    return {
      endDate: "" /** 置管日期 */,
      hsList: [] /** 本科室护士列表 */,
      endNurse: "" /** 置管人 */,
      statusList: [],
      status: "", // 拔管类型
      loading: false
    };
  },
  methods: {
    validate() {
      if (model.selectedBlock.status == 1) {
        return true;
      } else {
        this.$message.warning("没有可拔的管道");
        return false;
      }
    },
    async init() {
      this.loading = true;
      let res = await userDictInfo(this.deptCode);
      let res1 = await listItem("拔管类型", this.deptCode);
      this.hsList = res.data.data;
      this.statusList = res1.data.data;
      this.loading = false;
      this.endNurse = this.empNo;
      this.status = this.status;
      this.endDate = moment().format("YYYY-MM-DD HH:mm");
    },
    open() {
      if (!this.validate()) return;
      this.init();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let { patientId, visitId } = model.selectedPatient;
      let { orderNo, orderSubNo, startDate } = model.selectedBlock;
      let block = {
        patientId,
        visitId,
        orderNo,
        orderSubNo,
        endDate: this.endDate.replace(/\O/g, 0),
        endNurse: this.endNurse,
        status: this.status,
        startDate
      };
      model.endBlock(block).then(res => {
        this.$message.success("拔管成功");
        // if (this.status == "3") {
        //   this.$confirm("是否上报非计划拔管事件？", "提示").then(_ => {
        //     window.open(
        //       `/crNursing/badEvent/create/1/非计划拔管/非计划拔管事件上报表?bedLabel=${
        //         model.selectedPatient.bedLabel
        //       }`
        //     );
        //   });
        // }
        this.close();
      });
    }
  },
  components: {}
};
</script>
