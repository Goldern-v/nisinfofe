<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" :title="title">
      <div class="form">
        <div flex="cross:center main:center">
          <span class="label">排班日期：</span>
          <el-input class="input-item" disabled v-model="data.hdDate"></el-input>
        </div>
        <div flex="cross:center main:center">
          <span class="label">患者类型：</span>
          <el-radio-group v-model="patientType">
            <el-radio-button label="住院"></el-radio-button>
            <el-radio-button label="门诊"></el-radio-button>
          </el-radio-group>
          <div style="width: 160px"></div>
        </div>

        <div flex="cross:center main:center">
          <span class="label">住院号/ID号：</span>
          <el-input
            class="input-item"
            :disabled="patientType != '住院' "
            v-model="searchText"
            style="margin-right: 7px;"
          ></el-input>
          <div class="select-text" @click="searchPatient">搜索</div>
        </div>

        <div flex="cross:center main:center">
          <span class="label">患者姓名：</span>
          <el-input class="input-item" :disabled="patientType == '住院' " v-model="form.name"></el-input>
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
        </div>、
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
.select-text {
  font-size: 14px;
  color: blue;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
}
</style>
<script>
import { dataModel } from "../components/schecdulingTable/viewModel/dataModel";
import {
  savePatientHDInfo,
  savePatientArrange,
  searchPatient,
  saveTempArrange
} from "../api";
export default {
  data() {
    return {
      dataModel,
      patientType: "住院",
      searchText: "",
      data: {
        hdDate: ""
      },
      form: {
        name: "",
        bedLabel: "",
        color: "",
        hdWay: "",
        freqCounter: "",
        freqInterval: "",
        freqIntervalUnit: ""
      },
      type: "",
      title: "添加临时排班"
    };
  },
  methods: {
    open(data) {
      this.data = data;
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      if (this.patientType == "住院") {
        let obj = { ...this.data, ...this.form };
        obj.timeSlice = obj.hdTimeSlice || obj.timeSlice;
        obj.hdDate = this.data.hdDate;
        savePatientArrange(obj).then(res => {
          dataModel.getPatientArrange();
          this.$message.success("保存成功");
        });
      } else if (this.patientType == "门诊") {
        let obj = { ...this.data, ...this.form };
        obj.timeSlice = obj.hdTimeSlice || obj.timeSlice;
        obj.hdDate = this.data.hdDate;
        saveTempArrange(obj).then(res => {
          dataModel.getPatientArrange();
          this.$message.success("保存成功");
        });
      }

      this.close();
    },
    searchPatient() {
      if (this.patientType != "住院") return;
      searchPatient(this.searchText).then(res => {
        if (res.data.data[0]) {
          this.form = res.data.data[0];
        }
      });
    }
  },
  watch: {
    patientType() {
      if (this.patientType == "门诊") {
        this.form = {
          name: "",
          bedLabel: "",
          color: "",
          hdWay: "",
          freqCounter: "",
          freqInterval: "",
          freqIntervalUnit: ""
        };
        this.searchText = "";
      }
    }
  },
  components: {}
};
</script>
