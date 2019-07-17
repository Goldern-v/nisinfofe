<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" :title="title">
      <div class="form">
        <div flex="cross:center main:center">
          <span class="label">床号：</span>
          <el-input class="input-item" disabled v-model="form.bedLabel"></el-input>
        </div>
        <div flex="cross:center main:center">
          <span class="label">患者姓名：</span>
          <el-input class="input-item" disabled v-model="form.name"></el-input>
        </div>
        <div flex="cross:center main:center">
          <span class="label">颜色标记：</span>
          <el-select class="input-item" v-model="form.color">
            <el-option
              v-for="item in dataModel.colorDict"
              :key="item.sortNo"
              :value="item.color"
              :label="item.color"
            ></el-option>
          </el-select>
        </div>
        <div flex="cross:center main:center">
          <span class="label">透析模式：</span>
          <el-select class="input-item" v-model="form.hdWay">
            <el-option
              v-for="item in dataModel.txDict"
              :key="item.sortNo"
              :value="item.way"
              :label="item.way"
            ></el-option>
          </el-select>
        </div>
        <div flex="cross:center main:center" v-if="type == 'info'">
          <span class="label">透析频率：</span>
          <div style="width: 280px">
            <el-input
              class="input-item"
              style="width: 60px; margin-right: 0px"
              v-model="form.freqInterval"
            ></el-input>
            <el-select
              style="width: 90px"
              class="input-item; margin-right: 15px"
              v-model="form.freqIntervalUnit"
            >
              <el-option value="周" label="周"></el-option>
              <el-option value="日" label="日"></el-option>
            </el-select>
            <el-input
              class="input-item"
              style="width: 60px; margin-right: 10px"
              v-model="form.freqCounter"
            ></el-input>
            <span class="uniq">次</span>
          </div>
        </div>
        <div flex="cross:center main:center" v-if="type == 'info'">
          <span class="label">上次透析日期：</span>
          <masked-input
            type="text"
            class="mask-input input-item"
            :showMask="false"
            :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]"
            :guide="true"
            placeholderChar="O"
            v-model="form.hdDate"
          ></masked-input>
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
.form {
  > div {
    margin-bottom: 15px;
  }
}
.label {
  font-size: 14px;
  color: #333333;
  width: 120px;
  text-align: right;
  margin-right: 5px;
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
import { dataModel } from "../components/schecdulingTable/viewModel/dataModel";
import { savePatientHDInfo, savePatientArrange } from "../api";
export default {
  data() {
    return {
      dataModel,
      _form: null,
      form: {
        name: "",
        bedLabel: "",
        color: "",
        hdWay: "",
        freqCounter: "",
        freqInterval: "",
        freqIntervalUnit: "",
        hdDate: ""
      },
      type: "",
      title: ""
    };
  },
  methods: {
    open(data, type) {
      if (type == "arrange") {
        this.title = "修改患者排班信息";
      } else if (type == "info") {
        this.title = "患者血透信息维护";
      }
      this.type = type;
      this._form = data;
      this.form = { ...data };
      console.log(data, "data");
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      if (this.type == "arrange") {
        let obj = { ...this.form };
        obj.timeSlice = obj.hdTimeSlice || obj.timeSlice;
        savePatientArrange(obj).then(res => {
          dataModel.getPatientArrange();
          this.$message.success("保存成功");
        });
      } else if (this.type == "info") {
        let obj = { ...this.form };
        obj.hdDate = this.form.hdDate.replace(/\O/g, 0);
        savePatientHDInfo(obj).then(res => {
          dataModel.getHDPatientList();
          this.$message.success("保存成功");
        });
      }

      this.close();
    }
  },
  components: {}
};
</script>
