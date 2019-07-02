<template>
  <div class="wrapper" :style="layoutModel.wrapperStyle" v-loading="dataModel.tableLoading">
    <table class="schecdu-table">
      <tr v-for="(tr, index) in layoutModel.thead" :key="'thead' + index">
        <th v-for="(th, thIndex) in tr" :key="'th' + thIndex" v-bind="th">{{th.label}}</th>
      </tr>
      <tr v-for="(tb, index) in layoutModel.tbody" :key="'tb' + index">
        <td v-for="(td) in tb" :key="td.position" v-bind="td">
          <span v-if="td.label">{{td.label}}</span>
          <cell v-if="td.type == 'cell'" :obj="td"></cell>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { layoutModel } from "./viewModel/layoutModel";
import { dataModel } from "./viewModel/dataModel";
import cell from "./cell";
export default {
  data() {
    return {
      layoutModel,
      dataModel
    };
  },
  methods: {},

  components: {
    cell
  }
};
</script>

<style lang='scss' scoped>
.wrapper {
  background: #fff;
  margin: 12px 15px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-sizing: border-box;
  min-width: 1075px;
  min-height: 700px;
  .schecdu-table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    border: 1px solid #cccccc;
    th,
    td {
      text-align: center;
      vertical-align: middle;
      border: 1px solid #cccccc;
    }
    th {
      background: #4bb08d;
      color: #fff;
    }
  }
}
</style>
