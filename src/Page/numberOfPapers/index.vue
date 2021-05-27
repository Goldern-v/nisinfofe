<template>
  <div class='number-of-page-wrapper'>
    <div class="search-bar">
      <div style="font-weight: bold; font-size: 20px;">{{ type === 'num' ? '护士文书完成数量统计' : '护士书写文书时间统计' }}</div>
      <div class="right">
        <span class="label">日期:</span>
        <el-date-picker
          v-model="searchForm.date"
          type="datetimerange"
          placeholder="选择时间范围"
          @change="getTableData"
        />
        <span class="label">姓名:</span>
        <el-input
          v-model="searchForm.keyWord"
          placeholder="请输入姓名"
          style="width: 200px;"
          @change="getTableData"
        />
        <span class="label"></span>
        <el-button type="primary" @click="getTableData">查询</el-button>
      </div>
    </div>
    <div class="table-wrapper" ref="table-wrapper">
      <el-table :data="tableData" :height="tableHeight" border v-loading.body="loading">
        <el-table-column v-for="(item,index) in tableConfig" :key="index" v-bind="item"/>
      </el-table>
      <div class="pagination-con">
        <el-pagination
          :pageIndex="searchForm.pageIndex"
          :size="searchForm.pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import config from './config'
import api from './api'

export default {
  name: "index",
  data() {
    return {
      loading: false,
      searchForm: {
        date: [],
        keyWord: '',
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      tableData: [],
      tableHeight: 783,
      tableConfig: []
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    }
  },
  watch: {
    type: {
      handler(nVal) {
        this.tableConfig = nVal === 'num' ? config.numTableConfig : config.timeTableConfig
        this.searchForm.pageIndex = 1
        this.searchForm.pageSize = 10
        this.getTableData()
      },
      immediate: true
    }
  },
  mounted() {
    const wrapperHeight = this.$refs['table-wrapper'].offsetHeight
    this.tableHeight = wrapperHeight - 40 - 50// 40: padding  50: pagination
  },
  methods: {
    async getTableData() {
      const params = {
        keyWord: this.searchForm.keyWord,
        pageIndex: this.searchForm.pageIndex,
        pageSize: this.searchForm.pageSize,
        deptCode: this.$store.state.lesion.deptCode
      }
      if (this.searchForm.date.length > 0) {
        params.startTime = moment(this.searchForm.date[0]).format('YYYY-MM-DD HH:mm:ss')
        params.endTime = moment(this.searchForm.date[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      let res
      this.loading = true
      if (this.type === 'num') {
        res = await api.getNumTableData(params)
      } else {
        res = await api.getTimeTableData(params)
      }
      this.loading = false
      const data = res.data.data
      this.searchForm.pageIndex = data.pageIndex
      this.searchForm.pageSize = data.pageSize
      this.total = data.totalCount
      this.tableData = data.list
    },
    handleSizeChange(pageSize) {
      this.searchForm.pageSize = pageSize
      this.getTableData()
    },
    handleCurrentChange(currentPage) {
      this.searchForm.pageIndex = currentPage
      this.getTableData()
    }
  }
}
</script>

<style lang='scss' scoped>
.number-of-page-wrapper {
  height: calc(100vh - 60px);

  .search-bar {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .right {
      display: flex;
      align-items: center;
    }

    .label {
      margin: 0 10px;
    }
  }

  .table-wrapper {
    box-sizing: border-box;
    height: calc(100% - 60px);
    background: #ffffff;
    padding: 20px 40px;

    .pagination-con {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
