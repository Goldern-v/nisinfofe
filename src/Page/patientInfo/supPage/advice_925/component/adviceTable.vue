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
      @cell-dblclick="getOrder"
    >
      <el-table-column fixed label=" " min-width="50px" prop="orderNo">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="开始时间" min-width="160px">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.startDate}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="医嘱内容" min-width="197px" prop="orderText">
        <template slot-scope="scope">
          <span :class="type(scope.row.orderStatusName)">{{scope.row.orderText}}</span>
        </template>
      </el-table-column>
      <el-table-column label="计量" min-width="80px" prop="dosage">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
          >{{scope.row.dosage}}{{scope.row.dosageUnits}}</span>
        </template>
      </el-table-column>
      <el-table-column label="途径" min-width="120px" prop="administration">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.administration}}</span>
        </template>
      </el-table-column>
      <el-table-column label="频次" min-width="60px" prop="frequency">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.frequency}}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行时间" min-width="80px" prop="performSchedule">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.performSchedule}}</span>
        </template>
      </el-table-column>
      <el-table-column label="医嘱说明" min-width="120px" prop="freqDetail">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.freqDetail}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始医生" min-width="80px" prop="doctor">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.doctor}}</span>
        </template>
      </el-table-column>
      <el-table-column label="校对护士" min-width="80px" prop="nurse">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.nurse}}</span>
        </template>
      </el-table-column>
      <el-table-column label="医嘱状态" min-width="80px" prop="orderStatusName">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.orderStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="停止日期" min-width="160px" prop="stopDate">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.stopDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="停止医生" min-width="80px" prop="stopDoctor">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.stopDoctor}}</span>
        </template>
      </el-table-column>
      <el-table-column label="停止护士" min-width="80px" prop="stopNurse">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.stopNurse}}</span>
        </template>
      </el-table-column>
      <el-table-column label="皮试" min-width="80px" prop="skinWay">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.skinWay}}</span>
        </template>
      </el-table-column>
      <el-table-column label="皮试结果" min-width="80px" prop="skinResult">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.skinResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="皮试时间" min-width="120px">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="Number(scope.row.orderSubNo) <= 1"
          >{{scope.row.skinDate}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped></style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus"></style>

<script>
import bus from "vue-happy-bus";
export default {
  props: {
    tableData: Array
  },
  data() {
    return {
      bus: bus(this),
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    }
  },
  methods: {
    height() {
      let height = this.wih - 251;
      return height.toString();
    },
    type(state) {
      if (state === "执行") {
        return "color-zhixing";
      }
      if (state === "停止") {
        return "color-tingzhi";
      }
      if (state === "新开") {
        return "color-xinkai";
      }
      if (state === "提交") {
        return "color-tijiao";
      }
      if (state === "作废") {
        return "color-zuofei";
      }
      return "1234566666";
    },
    Number(val) {
      return Number(val);
    },
    getOrder(obj){
      this.bus.$emit('importOrder',obj.orderText)
    }
  },
  components: {}
};
</script>
