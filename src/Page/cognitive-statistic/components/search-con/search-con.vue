<template>
  <div class="search-contain">
    <div class="search-box">
      <div class="title">护理单元</div>
      <el-select
        placeholder="请选择"
        v-model="data.deptValue"
        filterable
        @change="changeDept(data.deptValue)"
      >
        <el-option :value="0" label="全部"></el-option>
        <el-option
          v-for="item in data.deptList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
    </div>
    <div class="search-box">
      <div class="title">出入院</div>
      <div class="select-box" flex="cross:stretch">
        <div
          class="select-item"
          flex="cross:center main:center"
          flex-box="1"
          style="border-right: 1px solid #C2CBD2"
        >
          <el-radio class="radio" v-model="data.status" label="1" size="small"
            >在院</el-radio
          >
        </div>
        <div class="select-item" flex="cross:center main:center" flex-box="1">
          <el-radio class="radio" v-model="data.status" label="2" size="small"
            >出院</el-radio
          >
        </div>
      </div>
    </div>
    <div class="search-box" v-if="data.status == 1">
      <div class="title">入院起始日期</div>
      <el-date-picker
        v-model="data.admissionDate[0]"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择入院起始时间"
      ></el-date-picker>
    </div>
    <div class="search-box" v-if="data.status == 1">
      <div class="title">入院结束日期</div>
      <el-date-picker
        v-model="data.admissionDate[1]"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择入院结束时间"
      ></el-date-picker>
    </div>
    <div class="search-box" v-if="data.status == 2">
      <div class="title">出院起始时间</div>
      <el-date-picker
        v-model="data.dischargeDate[0]"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择出院起始时间"
      ></el-date-picker>
    </div>
    <div class="search-box" v-if="data.status == 2">
      <div class="title">出院结束时间</div>
      <el-date-picker
        v-model="data.dischargeDate[1]"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择出院结束时间"
      ></el-date-picker>
    </div>
    <div class="search-box">
      <div class="title">病人信息</div>
      <div class="input-con">
        <el-input v-model="data.name" placeholder="请输入病人姓名"></el-input>
      </div>
      <div class="input-con">
        <el-input
          v-model="data.patientId"
          placeholder="请输入病人ID"
        ></el-input>
      </div>
      <div class="input-con">
        <el-input v-model="data.inpNo" placeholder="请输入住院号"></el-input>
      </div>
      <div class="input-con">
        <el-input v-model="data.bedLabel" placeholder="请输入床号"></el-input>
      </div>
    </div>
    <div
      class="search-btn"
      flex="cross:center main:center"
      @click="search"
      v-touch-ripple
    >
      检索
    </div>
    <div
      class="print-btn"
      flex="cross:center main:center"
      @click="onPrint"
      v-touch-ripple
    >
      打印
    </div>
    <div
      class="exportExcel-btn"
      flex="cross:center main:center"
      @click="exportExcel"
      v-touch-ripple
    >
      导出
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-contain {
  padding: 20px 16px 10px;
  box-sizing: border-box;

  .title {
    font-size: 12px;
    color: #000000;
    letter-spacing: 0;
    margin-bottom: 10px;
  }

  >>>.el-select {
    width: 100%;
  }

  >>>.el-date-editor--daterange {
    width: 100%;
  }

  >>>.el-input__inner {
    height: 32px;
    font-size: 12px;
    color: #687179;
  }

  .search-box {
    margin-bottom: 15px;
  }
}

.select-box {
  width: 100%;
  height: 32px;
  background: #FFFFFF;
  border: 1px solid #C2CBD2;
  border-radius: 2px;
}

.select-item {
  width: 0;

  >>>.el-radio__label {
    font-size: 12px;
    color: #687179;
  }

  >>>.el-radio__inner {
    width: 16px;
    height: 16px;
  }
}

.input-con {
  margin-bottom: 10px;
}

.search-btn, .print-btn, .exportExcel-btn {
  height: 34px;
  background: #4BB08D;
  border-radius: 2px;
  font-size: 12px;
  color: #FFFFFF;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    background: #5CC6A1;
  }
}
</style>
<script>
import { nursingUnit } from "@/api/lesion";
import { nursingUnitAll } from "@/api/common";
import { exportExcel } from "../../api/patientStatistics";
import { fileDownload } from "@/utils/fileExport.js";
import moment from "moment";
export default {
  props: {
    tableData: Array
  },
  data() {
    return {
      printing: false,
      data: {
        deptValue: "",
        deptList: [],
        status: "1",
        name: "",
        bedLabel: "",
        inpNo: "",
        patientId: "",
        admissionDate: [moment().subtract(30, "days"), new Date()],
        dischargeDate: [moment().subtract(30, "days"), new Date()]
      }
    };
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    }
  },
  watch: {
    deptCode() {}
  },
  created() {
    let getNursingUnit =
      this.HOSPITAL_ID == "hj" ? nursingUnitAll : nursingUnit;
    getNursingUnit()
      .then(res => {
        this.data.deptList = res.data.data.deptList;
        this.data.deptValue =
          this.$store.state.lesion.deptCode ||
          res.data.data.defaultDept ||
          res.data.data.deptList[0].code;
        this.$store.commit("upDeptCode", this.data.deptValue);
      })
      .then(() => {
        this.$parent.getData();
      });
  },
  methods: {
    changeDept(value) {
      this.$store.commit("upDeptCode", value);
    },
    search() {
      this.$parent.page.pageIndex = 1;
      this.$parent.getData();
    },
    onPrint() {
      this.$emit("print", this.printing);
    },
    exportExcel() {
      let obj = {
        deptCode: this.data.deptValue,
        type: this.data.status == 1 ? "在院" : "出院",
        startDate:
          status == "1"
            ? moment(this.data.admissionDate[0]).format("YYYY-MM-DD HH:mm:ss")
            : moment(this.aaa).format("YYYY-MM-DD HH:mm:ss"),
        endDate:
          status == "1"
            ? moment(this.data.admissionDate[1]).format("YYYY-MM-DD HH:mm:ss")
            : moment(this.data.dischargeDate[1]).format("YYYY-MM-DD HH:mm:ss")
      };
      exportExcel(obj).then(res => {
        fileDownload(res);
      });
    }
  },
  components: {}
};
</script>
