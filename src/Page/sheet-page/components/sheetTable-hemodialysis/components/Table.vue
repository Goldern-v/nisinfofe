<template>
  <div>
    <div class="table" v-for="(tbody,index) in table" :key="index">
      <span v-if="index==1">续表</span>
      <slot v-if="index==1"></slot>
      <table border="1px solid #ccc" cellspacing="0">
        <colgroup>
          <col v-for="(col,idx) in cols" :key="idx" :width="col" />
        </colgroup>
        <tbody>
          <tr v-for="(tr,trIndex) in tbody" :key="trIndex">
            <td
              :class="td.class"
              :rowspan="td.rowspan"
              :colspan="td.colspan"
              :key="tdIdx"
              :style="td.style"
              v-for="(td,tdIdx) in tr"
            >
              <RenderItem
                v-for="(item,itemIdx) in td.children"
                :key="itemIdx"
                :item="item"
                :model.sync="model"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="table-footer">第 {{index+1}} 页</div> -->
    </div>
    <!-- <p @click="save">保存</p> -->
  </div>
</template>

<script>
import RenderItem from "./RenderItem";
import tableModel from "../data/dataModel";
import sheetInfo from "../../config/sheetInfo";
export default {
  data() {
    return {
      cols: tableModel.table.cols,
      table: tableModel.table.tbody,
      model: {}
    };
  },
  props: [],
  components: { RenderItem },
  methods: {
    save() {
      console.log(this.model);
      // localStorage.setItem("test", JSON.stringify(this.model));
    }
  },
  created() {
    this.model = {};
    this.$nextTick(() => {
      this.model = sheetInfo.relObj;
    });
  }
};
</script>

<style lang="scss" scoped>
.table {
  padding: 1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
table {
  border-collapse: collapse;
  width: 100%;
  background: #fff;
  td {
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
td,
th {
  border: 1px solid #000;
  line-height: 20px;
  padding: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  span {
    font-size: 13px;
    word-break: break-all;
    vertical-align: middle;
    display: inline-block;
  }
  input {
    vertical-align: middle;
    &[type="checkbox"] {
      vertical-align: middle;
    }
  }
}
.table {
  page-break-after: always;
  &:first-child {
    /* padding-bottom: 120px; */
  }
  &:nth-child(2) {
    padding-top: 50px;
  }
}
.table-footer {
  text-align: center;
  padding-top: 20px;
  margin-top: 0;
}
</style>


