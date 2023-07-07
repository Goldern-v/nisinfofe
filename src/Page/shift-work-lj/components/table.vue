<template>
  <div>
    <table class="table fixed-th" v-if="fixedTh">
      <colgroup>
        <col v-for="col of realColumns" :key="col.label" :width="col.width+'%'">
      </colgroup>
      <thead>
        <tr>
          <th v-for="col of columns" :key="col.label" :colspan="getColSpan(col)">{{col.label}}</th>
        </tr>
        <tr v-if="isMultiCol">
          <th v-for="col of realColumns" :key="col.label">{{col.label}}</th>
        </tr>
      </thead>
    </table>
    <table class="table" ref="table">
      <colgroup>
        <col v-for="col of realColumns" :key="col.label" :width="col.width+'%'">
      </colgroup>
      <thead>
        <tr>
          <th v-for="col of columns" :key="col.label" :colspan="getColSpan(col)">{{col.label}}</th>
        </tr>
        <tr v-if="isMultiCol">
          <th v-for="col of realColumns" :key="col.label">{{col.label}}</th>
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
            :style="{'text-align': col.align&&!row[col.prop].includes('借床')&&HOSPITAL_ID=='hengli'?col.align:'left'}"
            @dblclick="onDblClick({row, rowIndex, col, colIndex})"
            @contextmenu.stop.prevent="onContextMenu($event, rowIndex, col)"
          >
            <div class="cell" v-if="col.render" v-html="col.render(row)"/>
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
    //移动至首行
    moveRowFirst(rowIndex = this.selectedRowIndex){
      if (rowIndex !=0 && this.data.length>=2) {
        const [row] = this.data.splice(rowIndex, 1);
        this.data.splice(0, 0, row);
      }
    },
    //移动至末行
    moveRowLast(rowIndex = this.selectedRowIndex){
      //const twoRowId=this.data.length>=2?this.data[2].id:null;//是否只有一行数据（第二行是否有数据）
      if (rowIndex !=this.data.length-1 && this.data.length>=2) {
        const [row] = this.data.splice(rowIndex, 1);
        this.data.splice(this.data.length-1, 0, row);
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
      /*white-space nowrap*/

    tbody tr
      &:nth-child(2n)
        background #f4f2f5

      &:hover
        background #e6e6e6

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
.fixed-th
  position fixed
  top 102px
  width 1040px
  z-index 1
</style>
