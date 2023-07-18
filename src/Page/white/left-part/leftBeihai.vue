<template>
  <div>
    <boxBase title="检查预约" :icon="require('../images/检查预约.png')">
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <el-table
          :data="tableFilterList"
          height="400"
          style="width: 100%; font-size:12px;"
          :default-sort="{ prop: 'date', order: 'descending' }"
          :row-class-name="tableRowClassName"
          center
        >
          <template v-for="item in tableColumn">
            <el-table-column
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :sortable="item.sortable"
              :width="item.width"
              v-if="item.prop == 'patientname'"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.patientname +
                    `(${scope.row.sex} ${scope.row.age})`
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :sortable="item.sortable"
              :width="item.width"
              v-else-if="item.prop == 'bookdate'"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.bookdate + `&nbsp;` + `${scope.row.booktime}`
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :sortable="item.sortable"
              :width="item.width"
              v-else
            >
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div slot="head-tool">
        分类：
        <el-select
          v-model="typeValue"
          multiple
          placeholder="请选择"
          style="width: 230px;"
        >
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
    </boxBase>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con {
  margin: 0;
  max-height: 800px;
  overflow: auto;
}

.list-box {
  border-bottom: 1px solid #E3E7EA;
  font-size: 13px;
  color: #333333;

  .col-1, .col-2, .col-3, .col-4 {
    width: 0;
    min-height: 37px;
    box-sizing: border-box;
    padding: 8px 18px;
    line-height: 22px;
  }

  .col-2 {
    border-left: 1px solid #E3E7EA;
    border-right: 1px solid #E3E7EA;
  }

  .col-1 {
    width: 160px;
  }

  .col-3 {
    width: 160px;
  }

  .col-4 {
    width: 250px;
     border-left: 1px solid #E3E7EA;
  }

  &.head {
    background: #F7FAFA;
    font-size: 13px;
    color: #687179;
    font-weight: bold;

    span {
      display: flex;
      align-items: center;
    }
  }
}

</style>
<style lang="scss" scoped>
/deep/ .el-table .warning-row{
  font-weight: bold;
  background: #f6f9eb;
}
</style>

<script>
import boxBase from "../base/box-base.vue";
import { getExamAppointWithWardcode } from "../api";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import moment from "moment";
import { tableColumn } from "./config.js";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      tableData: [],
      tableColumn,
      options: [{ label: "磁共振" }, { label: "CT" }, { label: "超声检查" }],
      typeValue: []
    };
  },
  created() {
    this.bus.$on("indexGetAllData", this.getData);
  },
  computed: {
    tableFilterList() {
      if (!this.tableData.length) return;
      let list = [];
      // 过滤超过时间的内容不做展示
      list = this.tableData.filter(item => {
        let { startTime, endTime } = {
          startTime: item.booktime.split("~")[0],
          endTime: item.booktime.split("~")[1]
        };
        let startDate = moment(item.bookdate + " " + startTime).valueOf();
        let endDate = moment(item.bookdate + " " + endTime).valueOf();
        // item.ative = 
        //   moment(new Date()).valueOf() >= startDate &&
        //   moment(new Date()).valueOf() <= endDate;
        item.ative = moment(item.bookdate).valueOf() > moment(moment(new Date()).format("YYYY-MM-DD")).valueOf()
        return  endDate >=  moment(new Date()).valueOf() ;
      });
      // 检查类别分类过滤
      list = list.filter(item => {
        if (!this.typeValue.length) return true;
        return this.typeValue.includes(item.classtype);
      });

      return list || [];
    }
  },
  methods: {
    getData() {
      this.pageLoading = true;
      getExamAppointWithWardcode(this.deptCode).then(res => {
        let { data } = res.data.data;
        this.tableData = data;
        this.pageLoading = false;
      });
    },
    tableRowClassName(row) {
      if (row.ative) {
        return "warning-row";
      } else {
        return "";
      }
    },
  },
  components: {
    boxBase,
  }
};
</script>
