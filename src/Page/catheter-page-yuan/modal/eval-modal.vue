<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" :title="title">
      <div class="form-con" v-loading="loading">
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">评估日期：</span>
          <masked-input
            type="text"
            class="mask-input input-item"
            :showMask="false"
            v-model="recordDate"
            :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
            :guide="true"
            placeholderChar="O"
          ></masked-input>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">外露长度：</span>
          <el-input class="input-item" v-model="outLength" placeholder="请填写外露长度"></el-input>
          <span class="unit">cm</span>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">周围敷料：</span>
          <el-select class="input-item" v-model="dressingPeripheral" placeholder="请选择周围敷料">
            <el-option
              v-for="item in dressingPeripheralList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">是否通畅：</span>
          <el-select class="input-item" v-model="catheterUnobstructe" placeholder="请选择是否通畅">
            <el-option
              v-for="item in catheterUnobstructeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">固定情况：</span>
          <el-select class="input-item" v-model="dressingFixed" placeholder="请选择固定情况">
            <el-option
              v-for="item in dressingFixedList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">引流高度：</span>
          <el-select class="input-item" v-model="fluidHeight" placeholder="请选择引流高度">
            <el-option
              v-for="item in fluidHeightList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">流液性状：</span>
          <el-select class="input-item" v-model="fluidCharacter" placeholder="请选择流液性状">
            <el-option
              v-for="item in fluidCharacterList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div flex="cross:center main:center" style="margin-bottom: 15px">
          <span class="label">流液颜色：</span>
          <el-select class="input-item" v-model="fluidColor" placeholder="请选择流液颜色">
            <el-option
              v-for="item in fluidColorList"
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
</style>
<script>
import common from "@/common/mixin/common.mixin";
import { multiDictInfo, setList } from "@/api/common";
import { saveRecord } from "../api";
import { model } from "../store";
import moment from "moment";
export default {
  mixins: [common],
  data() {
    return {
      title: "添加导管评估",
      loading: false,
      isEditRecord: false,
      recordDate: "", //记录时间
      outLength: "", //外露刻度cm
      dressingPeripheral: "", //周围敷料
      catheterUnobstructe: "", // 是否通畅
      dressingFixed: "", // 敷料固定情况
      fluidHeight: "", // 引流高度
      fluidCharacter: "", // 流液性状
      fluidColor: "", // 流液颜色
      dressingPeripheralList: [], //周围敷料列表
      catheterUnobstructeList: [], // 是否通畅列表
      dressingFixedList: [], // 敷料固定情况列表
      fluidHeightList: [], // 引流高度列表
      fluidCharacterList: [], // 流液性状列表
      fluidColorList: [] // 流液颜色列表
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
      let dicList = [
        "周围敷料",
        "是否通畅",
        "固定情况",
        "引流高度",
        "流液性状",
        "流液颜色"
      ];
      await multiDictInfo(dicList, "catheter").then(res => {
        let data = res.data.data;
        setList(this.dressingPeripheralList, "周围敷料", data);
        setList(this.catheterUnobstructeList, "是否通畅", data);
        setList(this.dressingFixedList, "固定情况", data);
        setList(this.fluidHeightList, "引流高度", data);
        setList(this.fluidCharacterList, "流液性状", data);
        setList(this.fluidColorList, "流液颜色", data);
      });

      let dataKeyLsit = [
        "outLength",
        "dressingPeripheral",
        "catheterUnobstructe",
        "dressingFixed",
        "fluidHeight",
        "fluidCharacter",
        "fluidColor"
      ];

      if (this.isEditRecord) {
        /** 编辑状态 */
        this.title = "修改导管评估";
        this.recordDate = record.recordDate;
        for (let key of dataKeyLsit) {
          this[key] = record[key];
        }
      } else {
        this.title = "添加导管评估";
        this.recordDate = moment().format("YYYY-MM-DD HH:mm");
        for (let key of dataKeyLsit) {
          this[key] = "";
        }
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
      let { orderNo, orderSubNo, startDate, id } = model.selectedBlock;
      let record = {
        patientId,
        visitId,
        orderNo,
        orderSubNo,
        blockId: id,
        recordDate: this.recordDate.replace(/\O/g, 0), //时间
        outLength: this.outLength, //外露刻度cm
        dressingPeripheral: this.dressingPeripheral, //周围敷料
        catheterUnobstructe: this.catheterUnobstructe, // 是否通畅
        dressingFixed: this.dressingFixed, // 敷料固定情况
        fluidHeight: this.fluidHeight, // 引流高度
        fluidCharacter: this.fluidCharacter,
        fluidColor: this.fluidColor,
        startDate
      };
      if (this.isEditRecord) {
        saveRecord(Object.assign({}, this.isEditRecord, record)).then(res => {
          this.$message.success("更新评估成功");
          model.getRecordList();
          this.close();
        });
      } else {
        saveRecord(record).then(res => {
          this.$message.success("新建评估成功");
          model.getRecordList();
          this.close();
        });
      }
    }
  },
  components: {}
};
</script>
