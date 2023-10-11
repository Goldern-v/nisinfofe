<template>
  <div class="search-contain">
    <div class="search-box">
      日期：
      <el-date-picker
          ref="beginRef"
          v-model="data.beginTime"
          type="date"
          placeholder="选择开始时间"
          align="right"
          size="small"
          format='yyyy-MM-dd'/>
        -
        <el-date-picker
          ref="endRef"
          v-model="data.endTime"
          type="date"
          placeholder="选择结束时间"
          align="right"
          size="small"
          format='yyyy-MM-dd' />
    </div>
    <div class="search-box">
      病区：
      <el-select
        v-model="data.wardCode"
        placeholder="请选择"
        style="width: 230px;"
        size="small"
        @change="changeDept(data.wardCode)"
      >
        <el-option
          v-for="dept in deptList"
          :key="dept.code"
          :label="dept.name"
          :value="dept.code"
        >
        </el-option>
      </el-select>
    </div>
    <div class="search-box">
      <span style="width: 100px;">病人id:</span>

      <el-input v-model="data.patientId" ></el-input>
    </div>
    <el-button @click="search" type="primary">搜索</el-button>
    <!-- <div
      class="print-btn"
      flex="cross:center main:center"
      @click="onPrint"
      v-touch-ripple
    >
      打印
    </div> -->
    <!-- <div
      class="exportExcel-btn"
      flex="cross:center main:center"
      @click="handleExport"
      v-touch-ripple
    >
      导出
    </div> -->
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-contain {
  box-sizing: border-box;
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 31px;
  font-weight: bold;

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
    font-size: 12px;
    color: #687179;
    height: 32px;
  }
  .search-box{
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
}

.select-box {
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
  width: 60px;

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
        themeName:'输液巡视统计',
        wardCode: '',
        beginTime: moment().subtract(3, 'days').format('YYYY-MM-DD'),
        endTime:  moment().format('YYYY-MM-DD'),
        patientId: "",
      },
    };
  },
  computed: {
    deptCode() {
      console.log(this.$store.state.lesion.deptCode);
      return this.$store.state.lesion.deptCode;
    },
    format() {
      if (this.datetype === 'date') {
        return 'yyyy-MM-dd'
      }
      return 'yyyy-MM-dd HH:mm:ss'
    }
  },
  created() {
    nursingUnit()
      .then(res => {
        this.deptList = res.data.data.deptList;
        this.data.wardCode =
          this.$store.state.lesion.deptCode ||
          res.data.data.defaultDept ||
          res.data.data.deptList[0].code;
        this.$store.commit("upDeptCode", this.data.wardCode);
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
