<template>
  <div>
    <table class="table fixed-th" v-if="fixedTh">
      <colgroup>
        <!-- <col v-for="col of realColumns" :key="col.label" :width="col.width" /> -->
        <col width="50" />
        <col width="80" />
        <col width="150" />
        <col width="200" />
        <col width="200" />
        <col width="200" />
        <col width="200" />
      </colgroup>
      <thead>
        <!-- <tr>
          <th v-for="col of columns" :key="col.label" colspan="3">
            {{col.label}}
            <span v-for="(child,index) in col.children" :key="index">{{child.label}}人</span>
          </th>
        </tr>-->
        <!-- <tr v-if="isMultiCol">
          <th v-for="col of realColumns" :key="col.label">{{col.label}}</th>
        </tr>-->
      </thead>
    </table>
    <table class="table" ref="table">
      <colgroup>
        <!-- <col v-for="col of realColumns" :key="col.label" :width="col.width" /> -->
        <col width="50" />
        <col width="80" />
        <col width="150" />
        <col width="200" />
        <col width="200" />
        <col width="200" />
        <col width="200" />
      </colgroup>
      <thead>
        <tr>
          <th class="name" rowspan="6">
            <div class="cell">床号</div>
          </th>
          <th class="name" rowspan="6">
            <div class="cell">姓名</div>
          </th>
          <th class="name" rowspan="6">
            <div class="cell">诊断</div>
          </th>
          <th>
            <div class="cell">
              出院
              <span>{{record.patientOutA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              病危
              <span>{{record.patientBwA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              出院
              <span>{{record.patientOutN || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              病危
              <span>{{record.patientBwN || 0}}</span> 人
            </div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="cell">
              转出
              <span>{{record.patientTransferOutA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              手术
              <span>{{record.patientOprationA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              转出
              <span>{{record.patientTransferOutN || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              手术
              <span>{{record.patientOprationN || 0}}</span> 人
            </div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="cell">
              死亡
              <span>{{record.patientDeathA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              备术
              <span>{{record.patientRemarkA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              死亡
              <span>{{record.patientDeathN || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              备术
              <span>{{record.patientRemarkN || 0}}</span> 人
            </div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="cell">
              新入
              <span>{{record.patientNewA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              特护
              <span>{{record.patientSpecialA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              新入
              <span>{{record.patientNewN || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              特护
              <span>{{record.patientSpecialN || 0}}</span> 人
            </div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="cell">
              转入
              <span>{{record.patientTransferInA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              一级
              <span>{{record.patientFirstA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              转入
              <span>{{record.patientTransferInN || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              一级
              <span>{{record.patientFirstN || 0}}</span> 人
            </div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="cell">
              病重
              <span>{{record.patientBzA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              总数
              <span>{{record.patientTotalA || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              病重
              <span>{{record.patientBzN || 0}}</span> 人
            </div>
          </th>
          <th>
            <div class="cell">
              总数
              <span>{{record.patientTotalN || 0}}</span> 人
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) of data"
          :class="[{selected: row === selectedRow}]"
          :key="row.id + '' + rowIndex"
          @click="onClick(rowIndex)"
        >
          <td
            v-for="(col, colIndex) of realColumns"
            :key="col.label"
            :style="{'text-align': col.align || 'left'}"
            :colspan="colIndex>2?2:1"
            @dblclick="onDblClick({row, rowIndex, col, colIndex})"
            @contextmenu.stop.prevent="onContextMenu($event, rowIndex, col)"
          >
            <div class="cell" v-if="col.render" v-html="col.render(row)" />
            <label v-else-if="col.editable">
              <el-input
                autosize
                class="textarea"
                type="textarea"
                v-model="row[col.prop]"
                :disabled="!editable"
                @change="onInputChange($event, row[col.prop], col.prop, rowIndex, colIndex)"
                @keydown.native="onInputKeydown($event, row[col.prop], col.prop, rowIndex, colIndex)"
              />
            </label>
            <div class="cell" v-else>{{row[col.prop]}}</div>
          </td>
        </tr>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>


<script>
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
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    record: {
      type: Object,
      default: () => {}
    },
    getContextMenu: {
      type: Function
    },
    editable: {
      type: Boolean
    }
  },
  data: () => ({
    selectedRow: null,
    selectedRowIndex: -1,
    selectedCol: null
  }),
  computed: {
    isMultiCol() {
      for (let col of this.columns) {
        if (col.columns && col.columns.length > 0) {
          return true;
        }
      }
      return false;
    },
    realColumns() {
      let columns = [];

      for (const col of this.columns) {
        if (col.columns && col.columns.length) {
          columns = columns.concat(col.columns);
        } else {
          columns.push(col);
        }
      }

      return columns;
    }
  },
  methods: {
    getColSpan(col) {
      return (col.columns && col.columns.length) || 1;
    },
    onClick(rowIndex) {
      this.selectRow(rowIndex);
    },
    onDblClick(data) {
      this.$emit("dblclick", data);
    },
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
.table {
  width: 100%;
  border-collapse: collapse;

  thead {
    border: 1px solid #444444;
  }

  td, th {
    height: 30px;
    font-size: 12px;
    vertical-align: middle;
    line-height: 14px;
    box-sizing: border-box;
  }

  td {
    border: 1px solid #444444;
  }

  th {
    padding: 2px;
    background: #f4f2f5;
    font-weight: 700;
    text-align: center;
    word-break: keep-all;
    white-space: nowrap;
    height: 24px;

    &.name, &:last-of-type {
      border-right: 1px solid #444444;
    }

    &:nth-last-of-type(2) {
      border-left: 1px solid #444444;
    }

    span {
      padding: 0 10px;
    }
  }

  tbody tr {
    &:nth-child(2n) {
      background: #f4f2f5;
    }

    &:hover {
      background: #e6e6e6;
    }

    &.selected {
      background: #FFF8B1;
    }
  }

  td {
    .cell {
      padding: 6px 4px;
    }
  }

  label {
    display: flex;
    align-items: center;
    // margin-top -4px
    // margin-bottom -4px
    height: 100%;
    width: 100%;
  }

  >>>textarea, >>>pre {
    display: block;
    // padding 8px 4px
    padding: 4px;
    margin: 0;
    width: 100%;
    min-height: 15px;
    box-sizing: border-box;
    border: none !important;
    outline: none !important;
    resize: none;
    background: none !important;
    color: black !important;
    overflow-y: hidden;
    text-align: inherit;
    cursor: auto !important;

    &:disabled {
      color: black;
      background: none;
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
