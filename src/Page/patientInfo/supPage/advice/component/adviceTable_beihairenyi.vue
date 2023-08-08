<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      :show-header="true"
      style="width: 100%"
      border
      :height="height()"
      class="advice-table"
      v-loading="tableLoading"
    >
      <el-table-column
        label="医嘱号"
        min-width="70px"
        prop="orderNo"
      >
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" min-width="135px">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.startDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="医嘱内容" min-width="150px" prop="orderText">
        <template slot-scope="scope">
          <span :class="type(scope.row.orderStatusName)">{{scope.row.orderText}}</span>
        </template>
      </el-table-column>
      <el-table-column label="剂量" min-width="70px" prop="dosage" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.dosage}}{{scope.row.dosageUnits}}</span>
        </template>
      </el-table-column>
      <el-table-column label="途径" min-width="90px" prop="administration" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.administration}}</span>
        </template>
      </el-table-column>
      <el-table-column label="频次" min-width="60px" prop="frequency" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.frequency}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="执行时间"
        min-width="160px"
        prop="performSchedule"
        v-if="HOSPITAL_ID == 'gy'"
      ></el-table-column>
      <el-table-column label="执行时间" min-width="80px" prop="performSchedule" v-else align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.performSchedule}}</span>
        </template>
      </el-table-column>
      <el-table-column label="医嘱说明" min-width="100px" prop="freqDetail">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.freqDetail}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始医生" min-width="80px" prop="doctor" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.doctor}}</span>
        </template>
      </el-table-column>
      <el-table-column label="校对护士" min-width="80px" prop="nurse" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.nurse}}</span>
        </template>
      </el-table-column>
      <el-table-column label="医嘱状态" min-width="80px" prop="orderStatusName" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.orderStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="停止日期" min-width="135px" prop="stopDate" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.stopDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="停止医生" min-width="80px" prop="stopDoctor" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.stopDoctor}}</span>
        </template>
      </el-table-column>
      <el-table-column label="停止护士" min-width="80px" prop="stopNurse" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.stopNurse}}</span>
        </template>
      </el-table-column>
      <el-table-column label="皮试" min-width="80px" prop="skinWay">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.skinWay}}</span>
        </template>
      </el-table-column>
      <el-table-column label="皮试结果" min-width="80px" prop="skinResult">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.skinResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="皮试时间" min-width="120px">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.skinDate}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
>>>.el-table__header .cell {
  text-align: center;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.table-text-value {
  color: #888;
}

.color-zhixing {
  color: #274FC3;
}

.color-tingzhi {
  color: #E72C2C;
}

.color-xinkai {
  color: #333;
}

.color-tijiao {
  color: #3D8B72;
}

.color-zuofei {
  color: #ACACAC;
}

.color-yszuofei {
  color: #E72C2C;
}

.advice-table {
  .el-table__row td:first-child .cell {
    text-align: center;
    padding: 0 5px;
  }

  .cell {
    padding: 0 8px;
  }

  ::-webkit-scrollbar {
    width: 14px;
    height: 14px;
    background-color: #EAEAEA;
  }
}

.in-hidden {
  display: none;
}
</style>

<script>
export default {
  props: {
    tableData: Array,
    tableLoading: Boolean
  },
  data() {
    return {};
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    }
  },
  methods: {
    height() {
      let height = this.wih - 175;
      return height.toString();
    },
    type(state) {
      if (state === "执行") {
        return "color-zhixing";
      }
      if (state === "停止") {
        return "color-tingzhi";
      }
      if (state === "核实") {
        return "color-xinkai";
      }
      if (state === "撤销") {
        return "color-tijiao";
      }
      if (state === "作废") {
        return "color-zuofei";
      }
      if (state === "医生作废") {
        return "color-yszuofei";
      }
      return "1234566666";
    },
    Number(val) {
      return Number(val);
    }
  },
  components: {}
};
</script>
