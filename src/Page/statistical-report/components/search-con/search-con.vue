<template>
  <div class="search-contain">
    <div class="search-box">
      <div class="title">护理单元</div>
      <el-select
        placeholder="请选择"
        v-model="data.deptCode"
        filterable
        @change="changeDept(data.deptCode)"
      >
        <el-option value="" label="全部"></el-option>
        <el-option
          v-for="item in deptList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
    </div>
    <div class="search-box">
      <div class="title">起始日期</div>
      <el-date-picker
        v-model="data.startDate"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择起始时间"
      ></el-date-picker>
    </div>
    <div class="search-box">
      <div class="title">结束日期</div>
      <el-date-picker
        v-model="data.endDate"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择结束时间"
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
      @click="handleExport"
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
import moment from "moment";
export default {
  props: {
    tableData: Array
  },
  data() {
    return {
      printing: false,
      deptList: [],
      data: {
        deptCode: "",
        startDate:moment( moment().subtract(1, 'month').format('YYYY-MM-DD')),
        endDate:moment(),
        patientId: "",
        name: "",
        bedLabel: "",
        inpNo: "",
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
    nursingUnit()
      .then(res => {
        this.deptList = res.data.data.deptList;
        this.data.deptCode =
          this.$store.state.lesion.deptCode ||
          res.data.data.defaultDept ||
          res.data.data.deptList[0].code;
        this.$store.commit("upDeptCode", this.data.deptCode);
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
    handleExport() {
      this.$parent.getexportExcel();
    }
  },
  components: {}
};
</script>
