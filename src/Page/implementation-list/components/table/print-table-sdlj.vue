<template>
  <div class="print-table">
    <div class="header-con">
      <h3>{{ HOSPITAL_NAME_SPACE }}</h3>
      <div>执行单</div>
    </div>
    <u-table
      :data="tableData"
      style="width: 100%"
      border
      :row-class-name="rowcb"
      use-virtual
      :row-height="rowHeight"
      ref="retest"
    >
      <u-table-column
        prop="bedLabel"
        label="床号"
        min-width="50px"
        align="center"
      >
        <template slot-scope="scope">
          <div
            :title="
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.bedLabel
                : ''
            "
          >
            {{
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.bedLabel
                : ""
            }}
          </div>
        </template>
      </u-table-column>

      <u-table-column label="姓名" prop="name" min-width="70px" align="center">
        <template slot-scope="scope">
          <div
            :title="
              scope.row.rowType == 1 || !scope.row.rowType ? scope.row.name : ''
            "
          >
            {{
              scope.row.rowType == 1 || !scope.row.rowType ? scope.row.name : ""
            }}
          </div>
        </template>
      </u-table-column>

      <u-table-column label="医嘱内容" prop="itemName" min-width="250px">
        <template slot-scope="scope">
          <div
            :class="scope.row.rowType && `rowType-${scope.row.rowType}`"
            :title="scope.row.itemName"
          >
            {{ scope.row.itemName }}
          </div>
        </template>
      </u-table-column>

      <u-table-column
        prop="dosage"
        label="单次用量"
        min-width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.dosage">{{ scope.row.dosage }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="dosageUnits"
        label="单位"
        min-width="50px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.dosageUnits">{{
            scope.row.dosageUnits
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="administration"
        label="途径"
        min-width="120px"
        align="center"
        title="administration"
      >
        <template slot-scope="scope">
          <span :title="scope.row.administration">{{
            scope.row.administration
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="realExecuteDateTime"
        label="执行时间"
        min-width="145px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.realExecuteDateTime | ymdhms">{{
            scope.row.realExecuteDateTime | ymdhms
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="executeNurseName"
        title="executeNurseName"
        label="执行护士"
        min-width="80px"
        align="center"
      />

      <u-table-column
        label="结束时间"
        prop="executeEndTime"
        min-width="145px"
        align="center"
      />

      <u-table-column prop="executeEndNurseName" title="executeEndNurseName" label="结束护士" min-width="80px" align="center" />

    </u-table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.print-table {
  // border: 1px solid #000;
  position: absolute;
  z-index: -1;
  top: 50px;
  bottom: 0;
  width: 1250px;

  .header-con {
    padding: 10px 0;
    text-align: center
    font-size: 26px;
    line-height: 32px;
    font-weight: bold;
    font-family: simsun, "Times New Roman", Georgia, Serif !important;
  }

  >>>.el-table {
    border: 0 !important;

    td {
      height: 30px;
    }

    th, td {
      padding: 0px;
      border-color: #000;
    }

    th >.cell, th >div {
      padding: 0px;
      text-align: center;
    }

    th {
      background: #fff;
      .cell {
        height: 100%;
        line-height: 40px;
      }
    }

    .cell {
      padding: 0 10px !important;
      overflow: visible !important;
      font-size: 13px !important;
      white-space: normal !important;

      .yzx {
        color: red;
      }

      .zxz {
        color: blue;
      }
    }

    th .cell {
      padding: 0 0px !important;
    }

    /* * 第一条 */
    .rowType-1 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0px;
        top: 50%;
        bottom: -5px;
      }
    }

    .rowType-2 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0px;
        top: -5px;
        bottom: -5px;
      }

      &:after {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0;
        top: 50%;
      }
    }

    .rowType-3 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-bottom: 1px solid #333;
        left: 0px;
        bottom: 50%;
        top: -5px;
      }
    }

    .myCell {
      .el-checkbox__input {
        display: none;
      }
    }
  }

  >>>.el-table::after, .el-table::before {
    background: #cbd5dd;
    display: none;
  }

  >>>.el-table__row td:first-child .cell, >>>.el-table__row td:last-child .cell {
    padding: 0 5px;
    text-align: center;

    >>>.cell {
      padding: 0px;
      text-align: center;
    }
  }

  >>>.el-table__body-wrapper {
    // overflow-x hidden
  }
}
@media print {
  .print-table {
    >>>.page-box {
      box-sizing: border-box;
      padding-top: 50px !important;

      .el-table {
        border: none !important;

        &::before, &::after {
          height: 0;
        }

        table {
          width: 100% !important;
        }

        th {
          border: none !important;
          border-top: 1px solid #000 !important;
          border-left: 1px solid #000 !important;
          border-bottom: 1px solid #000 !important;
          background-color: transparent !important;

          &:first-of-type {
            border-left: none !important;
          }
        }

        td {
          height: 30px !important;
          border: none !important;
          border-left: 1px solid #000 !important;
          padding: 0 !important;

          &:first-of-type {
            border-left: none !important;
          }
        }

        .cell {
          // padding: 0 !important;
          * {
            color: #000 !important;
          }
        }

        .gutter {
          border: none !important;
        }

        .el-table__body-wrapper {
          tr {
            &:last-of-type {
              td {
                border-bottom: 1px solid #000 !important;
              }
            }
          }
        }

        .el-table__header-wrapper, .el-table__body-wrapper {
          margin-left: 0;
        }

        .el-table__body-wrapper {
          height: auto !important;
        }
      }
    }
  }
}
</style>
<script>
import commonMixin from "@/common/mixin/common.mixin";
import moment from "moment";
export default {
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
  },
  mixins: [commonMixin],
  data() {
    return {
      rowHeight: 30,
    };
  },
  methods: {
    rowcb(obj) {
      // 如果该条执行单是一组多条的 或者该执行单是已完成的隐藏当前多选框
      if (obj.row.rowType > 1 || obj.row.executeFlag == 2) {
        return "myCell";
      }
    },
    handleSelectionChange(selection) {
      this.selectedData = selection;
    },
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm") : "";
    },
    ymdhms(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
  },
  components: {},
};
</script>
