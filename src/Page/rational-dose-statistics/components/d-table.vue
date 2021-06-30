<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      :height="wih - 131"
      border
      v-loading="pageLoadng"
      stripe
    >
      <el-table-column prop="index" label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="allNum" label="总数" min-width="120" align="center"></el-table-column>
      <el-table-column prop="rational" label="合理用药" min-width="120" align="center"></el-table-column>
      <el-table-column prop="noRational" label="不合理用药" min-width="120" align="center"></el-table-column>
      <el-table-column prop="type" label="补录" min-width="120" align="center"></el-table-column>
      <el-table-column prop="type" label="补录医嘱占比" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type ? `${(scope.row.type /  scope.row.allNum * 100).toFixed()}` : scope.row.type }}%</span>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../common/mixin/common.mixin";
import qs from "qs";
import moment from "moment";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean
  },
  mixins: [commonMixin],
  data() {
    return {

    };
  },
  methods: {

  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("HH:mm") : "";
    }
  },
  components: {}
};
</script>
