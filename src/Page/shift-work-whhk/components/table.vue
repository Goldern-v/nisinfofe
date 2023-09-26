<template>
  <div>
    <table class="table2 fixed-th"  v-if="fixedTh">
      <colgroup>
        <col width="50px"/>
        <col width="80px"/>
        <col width="150px"/>
        <template v-for="i in 3">
          <col v-for="col in 9" :key="i + 'col' + col" />
        </template>
      </colgroup>
      <tr v-for="(trItem, trIndex) in tableConfig" :key="'tr' + trIndex">
        <template v-if="trIndex === 0">
          <td colspan="3">班次</td>
        </template>
        <template v-if="trIndex === 1">
          <td colspan="3" rowspan="7" class="svg-td">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <line x1="0" y1="0" x2="50" y2="100%" />
              <line x1="0" y1="0" x2="130" y2="100%" />
              <line x1="0" y1="0" x2="279" y2="100%" />
            </svg>
            <span style="left: 5px; top: 80%">床号</span>
            <span style="left: 60px; top: 80%">姓名</span>
            <span style="left: 130px; top: 80%">诊断</span>
            <span style="left: 130px; top: 30%">情况</span>
          </td>
        </template>
        <td
          v-for="(tdItem, tdIndex) in trItem"
          :key="trIndex + '-' + tdIndex"
          :colspan="tdItem.colspan || 1"
          :style="{ width: tdItem.width + 'px' }"
        >
          <template v-if="tdItem.name">
            {{ tdItem.name }}
          </template>
          <template v-else>
            <input v-if="tdItem.type === 'A'" v-model="shiftWithWardcodes.A[tdItem.code]"/>
            <input v-else-if="tdItem.type === 'P'" v-model="shiftWithWardcodes.P[tdItem.code]"/>
            <input v-else v-model="shiftWithWardcodes.N[tdItem.code]"/>
          </template>
        </td>
      </tr>
    </table>

    <table class="table2">
      <colgroup>
        <col width="50px"/>
        <col width="80px"/>
        <col width="150px"/>
        <template v-for="i in 3">
          <col v-for="col in 9" :key="i + 'col' + col" />
        </template>
      </colgroup>
      <tr v-for="(trItem, trIndex) in tableConfig" :key="'tr' + trIndex">
        <template v-if="trIndex === 0">
          <td colspan="3">班次</td>
        </template>
        <template v-if="trIndex === 1">
          <td colspan="3" rowspan="7" class="svg-td">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <line x1="0" y1="0" x2="50" y2="100%" />
              <line x1="0" y1="0" x2="130" y2="100%" />
              <line x1="0" y1="0" x2="279" y2="100%" />
            </svg>
            <span style="left: 5px; top: 80%">床号</span>
            <span style="left: 60px; top: 80%">姓名</span>
            <span style="left: 130px; top: 80%">诊断</span>
            <span style="left: 130px; top: 30%">情况</span>
          </td>
        </template>
        <td
          v-for="(tdItem, tdIndex) in trItem"
          :key="trIndex + '-' + tdIndex"
          :colspan="tdItem.colspan || 1"
          :style="{ width: tdItem.width + 'px' }"
        >
          <template v-if="tdItem.name">
            {{ tdItem.name }}
          </template>
          <template v-else>
            <input v-if="tdItem.type === 'A'" v-model="shiftWithWardcodes.A[tdItem.code]"/>
            <input v-else-if="tdItem.type === 'P'" v-model="shiftWithWardcodes.P[tdItem.code]"/>
            <input v-else v-model="shiftWithWardcodes.N[tdItem.code]"/>
          </template>
        </td>
      </tr>
    </table>
    <table class="table" ref="table">
      <colgroup>
        <col v-for="col of bodyColumns" :key="col.label" :width="col.width">
      </colgroup>

      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ shiftWithWardcodes.A.summary }}</td>
          <td>{{ shiftWithWardcodes.P.summary }}</td>
          <td>{{ shiftWithWardcodes.N.summary }}</td>
        </tr>
        <tr
          v-for="(row, rowIndex) of data"
          :class="[{selected: row === selectedRow}]"
          :key="row.id + '' + rowIndex"
          @click="onClick(rowIndex, row)"
        >
          <td
            v-for="(col, colIndex) of bodyColumns"
            :key="col.label"
            :style="{'text-align': col.align || 'left'}"
            @dblclick="onDblClick({row, rowIndex, col, colIndex})"
          >
            <label>
              <el-input
                autosize
                class="textarea"
                type="textarea"
                v-model="row[col.prop]"
                :readonly="!row[col.editable]"
                @change="onInputChange($event, row[col.prop], col.prop, rowIndex, colIndex)"
                @keydown.native="onInputKeydown($event, row[col.prop], col.prop, rowIndex, colIndex)"
              />
            </label>
          </td>
        </tr>
        <!-- <slot></slot> -->
      </tbody>
    </table>
  </div>
</template>


<script>
import {
  tableConfig,
  bodyColumns
} from './config'
export default {
  model: {
    prop: "data",
    event: "input"
  },
  props: {
    fixedTh: Boolean,
    /**
     * {
     *  label: string,
     *  prop?: string,
     *  width?: string,
     *  render?: (row) => string,
     *  columns?: [{
     *    label: string,
     *    prop?: string,
     *    width: string,
     *    render: (row) => string,
     * }]
     * }
     */
    // columns: {
    //   type: Array,
    //   default: () => []
    // },
    data: {
      type: Array,
      default: () => []
    },
    getContextMenu: {
      type: Function
    },
    // editable: {
    //   type: Boolean
    // },
    shiftWithWardcodes: {
      type: Object
    }
  },
  data() {
    return {
      selectedRow: null,
      selectedRowIndex: -1,
      selectedCol: null,
      tableConfig,
      bodyColumns
    }
  },
  computed: {
  },
  methods: {
    onClick(rowIndex, row) {
      this.selectRow(rowIndex);
      this.$router.push({
        name:"shiftWork",
        params:{
          code: this.$route.params.code,
          id: this.$route.params.id,
          patientId: row.patientId,
          visitId: row.visitId,
        }
      })
    },
    onDblClick(data) {
      this.$emit("dblclick", data);
    },
    // 右击的事件操作屏蔽（俺们没有话语权 医院到时候要不要另一回事 方法保留不删）
    async onContextMenu(e, rowIndex, col) {
      this.select(rowIndex, col);

      const data = await this.getContextMenu();

      if (!data) {
        return;
      }

      const style = {
        top: `${Math.min(
          e.clientY - 15,
          window.innerHeight - data.length * 36 - 12
        )}px`,
        left: `${Math.min(e.clientX + 15, window.innerWidth - 180)}px`
      };

      window.openContextMenu({ data, style });
    },
    select(rowIndex, col) {
      if (typeof rowIndex !== "number") {
        rowIndex = this.data.findIndex(r => r === rowIndex);
      }

      this.selectedRow = this.data[rowIndex];
      this.selectedRowIndex = rowIndex;
      this.selectedCol = col;
      this.$emit(
        "select",
        this.selectedRow,
        this.selectedRowIndex,
        this.selectedCol
      );
    },
    selectRow(rowIndex) {
      this.select(rowIndex, null);
    },
    addRow(row = {}) {
      const index = this.data.findIndex(i => !i.bedLabel);
      this.addRowBefore(row, index >= 0 ? index : 0);
    },
    addRowBefore(row = {}, rowIndex = this.selectedRowIndex) {
      this.data.splice(rowIndex, 0, row);
    },
    addRowAfter(row = {}, rowIndex = this.selectedRowIndex) {
      this.data.splice(rowIndex + 1, 0, row);
    },
    updateRow(newRow, rowIndex = this.selectedRowIndex) {
      this.data.splice(rowIndex, 1, newRow);
      this.selectRow(rowIndex);
    },
    removeRow(rowIndex = this.selectedRowIndex) {
      if (~rowIndex) {
        this.data.splice(rowIndex, 1);

        if (this.selectedRowIndex === this.data.length) {
          this.selectRow(this.selectedRowIndex - 1);
        } else {
          this.selectRow(this.selectedRowIndex);
        }
      }
    },
    moveRowUp(rowIndex = this.selectedRowIndex) {
      if (rowIndex > 0) {
        const [row] = this.data.splice(rowIndex, 1);
        this.data.splice(rowIndex - 1, 0, row);
      }
    },
    moveRowDown(rowIndex = this.selectedRowIndex) {
      if (rowIndex < this.data.length - 1) {
        const [row] = this.data.splice(rowIndex, 1);
        this.data.splice(rowIndex + 1, 0, row);
      }
    },
    onInputChange(event, value, prop, row, col) {
      this.$emit("input-change", { event, value, prop, row, col });
    },
    onInputKeydown(event, value, prop, row, col) {
      this.$emit("input-keydown", { event, value, prop, row, col });
    }
  }
};
</script>

<style lang="stylus" scoped>
  .table
    width 100%
    border-collapse collapse

    th, td
      height 30px
      border 1px solid #444444
      font-size 12px
      vertical-align middle
      line-height 14px
      box-sizing border-box

    th
      padding 8px 4px
      background #f4f2f5
      font-weight 700
      text-align center
      word-break keep-all
      white-space nowrap
    tr:nth-child(1)
      td
        border-top none

    tbody tr
      // &:nth-child(2n)
      //   background #f4f2f5

      &:hover
        background #efefef

      &.selected
        background #FFF8B1

    .cell
      padding 6px 4px

    label
      display flex
      align-items center
      // margin-top -4px
      // margin-bottom -4px
      height 100%
      width 100%

    >>>textarea, >>>pre
      display block
      // padding 8px 4px
      padding 4px;
      margin 0
      width 100%
      min-height 15px
      box-sizing border-box
      border none !important
      outline none !important
      resize none
      background none !important
      color black !important
      overflow-y hidden
      text-align inherit
      cursor auto !important

      &:disabled
        color black
        background none
</style>

<style lang="scss" scoped>
  .table2 {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    background: #fff;
    tr {
      td {
        border: 1px solid #000;
        margin: 0;
        padding: 1px;
        height: 16px;
        line-height: 16px;
        &.svg-td {
          position: relative;
          span {
            position: absolute;
          }
          svg {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            line {
              stroke: #3f3f3f;
              stroke-width: 1;
            }
          }
        }
      }
    }
    input {
      width: 100%;
      height: unset;
      color: #333;
      text-align: center;
      border: none;
      outline: none;
      font-size:14px;
      padding: 0;
      // border-bottom: 1px solid black;
      &.border {
        border-bottom: 1px solid black;
      }
    }
  }
  .fixed-th {
    position: fixed;
    top: 102px;
    width: 1040px;
    z-index: 1;
  }
</style>
