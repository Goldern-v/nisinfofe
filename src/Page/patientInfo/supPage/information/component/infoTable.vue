<template>
  <div>
    <el-table :data="tableData" stripe :show-header="false" style="width: 100%">
      <el-table-column prop="data1" label="" min-width="300px">
        <template slot-scope="scope">
                  <span>{{scope.row.data1.key}}:</span>
                  <span class="table-text-value">{{scope.row.data1.value}}</span>
</template>
      </el-table-column>
    <el-table-column
      prop="data2"
      label="姓名"
      min-width="300px">
<template slot-scope="scope">
  <span>{{scope.row.data2.key}}<span v-show="scope.row.data2.key">：</span></span>
  <span class="table-text-value">{{scope.row.data2.value}}</span>
</template>
    </el-table-column>
  </el-table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.table-text-value
  color #888
</style>

<script>
  export default {
    props: {
      tableData: Array
    },
    data() {
      return {
      }
    },
    components: {}
  }
</script>
