<template>
  <div>
    <table class="table fixed-th" :style="{width: theadW + 'px'}" v-if="fixedTh">
      <colgroup>
        <col v-for="col of realColumns" :key="col.prop ? col.label+col.prop : col.label" :width="col.width">
      </colgroup>
      <thead>
        <tr v-for="(row,index) in tileColumns" :key="index">
          <th v-for="col of row" :key="col.prop ? col.label+col.prop : col.label" :colspan="col.colspan || getColSpan(col)" :rowspan="col.rowspan">
             <div flex="cross:center" class="cell " v-if="col.tileColumns && col.tileColumns.length" style="display: block;">
               <div v-for="(item,itemIndex) in col.tileColumns" :key="item.prop ? item.prop + item.label : item.label" class="cell-item">
                 <span v-html="item.label"></span>
                  <div style="flex: 1;">
                    <el-input
                    v-model="record[item.prop]"
                    v-if="item.editable"
                  />
                  </div>
                  <span v-html="item.suffix"></span>
                   <br v-if="(itemIndex+1)%3 ==0"/>
                  </div>
            </div>
            <div class="cell" v-html="col.label" v-else-if="!col.showInput" />
            <div class="cell" v-else-if="col.render" v-html="col.render(row)"></div>
            <div class="cell" v-else-if="col.editable">
              <el-input
                v-model="record[col.prop]"
              />
            </div>
          </th>
        </tr>
      </thead>
    </table>
    <table class="table" ref="table">
       <colgroup>
        <col v-for="col of realColumns" :key="col.prop ? col.label+col.prop : col.label" :width="col.width">
      </colgroup>
      <thead>
        <tr v-for="(row,index) in tileColumns" :key="index">
          <th v-for="col of row" :key="col.prop ? col.label+col.prop : col.label" :colspan="col.colspan || getColSpan(col)" :rowspan="col.rowspan">
             <div flex="cross:center" class="cell " v-if="col.type == 'inline-block' && col.tileColumns && col.tileColumns.length" style="display: block;">
               <div v-for="(item,itemIndex) in col.tileColumns" :key="item.prop ? item.prop + item.label : item.label" class="cell-item">
                 <span v-html="item.label"></span>
                  <div style="flex: 1;">
                    <el-input
                    v-model="record[item.prop]"
                    v-if="item.editable"
                  />
                  </div>
                  <span v-html="item.suffix"></span>
                   <br v-if="(itemIndex+1)%3 ==0"/>
                  </div>
            </div>
            <div class="cell" v-html="col.label" v-else-if="!col.showInput" />
            <div class="cell" v-else-if="col.render" v-html="col.render(row)"></div>
            <div class="cell" v-else-if="col.editable">
              <el-input
                v-model="record[col.prop]"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="!isprint">
        <tr
          v-for="(row, rowIndex) of data"
          :class="[{selected: row === selectedRow}]"
          :key="row.id + '' + rowIndex"
          @click="onClick(rowIndex)"
        >
          <td
            v-for="(col, colIndex) of realColumns"
            :key="col.prop ? col.label+col.prop : col.label"
            :style="{'text-align': col.align || 'left'}"
            @dblclick="onDblClick({row, rowIndex, col, colIndex})"
            @contextmenu.stop.prevent="onContextMenu($event, rowIndex, col)"
            :colspan="col.colspan"
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
                :name="col.prop"
              />
            </label>
            <div class="cell" v-else>{{row[col.prop]}}</div>
          </td>
        </tr>
        <slot></slot>
      </tbody>
      <!--陵城 打印 -->
      <tbody v-else>
        <tr
          v-for="(row, rowIndex) of isPrintData"
          :class="[{selected: row === selectedRow}]"
          :key="row.id + '' + rowIndex"
          @click="onClick(rowIndex)"
        >
          <td
            v-for="(col, colIndex) of realColumns"
            :key="col.prop ? col.label+col.prop : col.label"
            :style="{'text-align': col.align || 'left'}"
            @dblclick="onDblClick({row, rowIndex, col, colIndex})"
            @contextmenu.stop.prevent="onContextMenu($event, rowIndex, col)"
            :colspan="col.colspan"
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
                :name="col.prop"
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
    theadW: {
      type: Number,
      default: 1860
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
    },
    record: {
      type: Object
    },
    isprint: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    selectedRow: null,
    selectedRowIndex: -1,
    selectedCol: null,
    // isPrintData: []
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
    tileColumns(){
      let arr = [],newArr = [];
      this.columns.map(item=>{
        if(!item.isHide){
          arr.push(item);
        }
        // 针对聊城二院交班志的处理
        // if(item.type == 'block' && item.tileColumns && item.tileColumns.constructor == Array){
        //   item.tileColumns.map(row =>{
        //     newArr.push(row);
        //     if(row[0].addRow){
        //       newArr.push(row.map(item=>{
        //         return {
        //           ...item,
        //           showInput: true
        //         }
        //       }))
        //     }
        //   })
        // }
      })
      newArr.unshift(arr);
      return newArr;
    },
    realColumns() {
      let columns = [];
      if(this.columns && this.columns[0] && this.columns[0].constructor == Array){
        for (const col of this.columns[0]) {
          if (col.columns && col.columns.length) {
            columns = columns.concat(col.columns);
          } else {
            columns.push(col);
          }
        }
      }else {
        for (const col of this.columns) {
          if (col.columns && col.columns.length && !col.isHid) {
            columns = columns.concat(col.columns);
          } else if(!col.isHide){
            columns.push(col);
          }
        }
      }
      return columns;
    },
    isPrintData() {
      let newData = JSON.parse(JSON.stringify(this.data))
      let arr = newData.map((item, index) => {
        return this.beyondPage(newData, item, 430, index)
      })
      return arr
    }
  },
  methods: {
    // 获取字符串中英文字母和数字
    getLetterNum(str) {
      let num = 0
      let letter = str.match(/[0-9a-zA-Z]/g)
      for (let i in letter) {
        num++
      }
      return num
    },

    // newData: 遍历数组, data: 数组里的每一个对象， len: 截取字符串 index：数组下标
    beyondPage(newData, data, len, index) {
      let str1 = 0
      let str2 = 0
      let remark2_str1 = 0
      let remark2_str2 = 0
      let remark3_str1 = 0
      let remark3_str2 = 0
      if (data.remark1 && data.remark1.length > len) {
        let letterNum = this.getLetterNum(data.remark1.substring(0, len))
        str1 = data.remark1.substring(0, len + letterNum)
        str2 = data.remark1.substring(len + letterNum, data.remark1.length)
      }
      if (data.remark2 && data.remark2.length > len) {
        let letterNum = this.getLetterNum(data.remark1.substring(0, len))
        remark2_str1 = data.remark2.substring(0, len + letterNum)
        remark2_str2 = data.remark2.substring(len + letterNum, data.remark2.length)
      }
      if (data.remark3 && data.remark3.length > len) {
        let letterNum = this.getLetterNum(data.remark1.substring(0, len))
        remark3_str1 = data.remark3.substring(0, len + letterNum)
        remark3_str2 = data.remark3.substring(len + letterNum, data.remark3.length)
      }

      Object.assign(data, {...data, remark1: str1 ? str1 : data.remark1, remark2: remark2_str1 ? remark2_str1 : data.remark2, remark3: remark3_str1 ? remark3_str1 : data.remark3})
      if (str1 || str2 || remark2_str1 || remark2_str2 || remark3_str1 || remark3_str2) {
        let obj = {}
        Object.assign(obj, {bedLabel: data.bedLabel, name: data.name, remark1: str2 ? str2 : '', remark2: remark2_str2 ? remark2_str2 : '',  remark3: remark3_str2 ? remark3_str2 : ''})
        newData.splice(index + 1, 0, obj)
      }
      return data
    },
    getColSpan(col) {
      return (col.columns && col.columns.constructor == Array ? col.columns[0].length : (col.columns && col.columns.length)) || 1;
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
      min-width 40px

    tbody tr
      &:nth-child(2n)
        background #f4f2f5

      &:hover
        background #e6e6e6

      &.selected
        background #FFF8B1

    // .cell
    //   padding 2px 4px
    .cell-item
      display inline-flex
      width 33.3%
      float left
      align-items center
      padding 0 5px
      box-sizing border-box

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
      overflow: hidden;

      &:disabled
        color black
        background none
   >>>.el-input
    .el-input__inner
      background-color transparent
      border none
      height 100%
      padding 3px 0
      text-align center
.fixed-th
  position fixed
  top 102px
  width 1040px
  z-index 1
</style>
