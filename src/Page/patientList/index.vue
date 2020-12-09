<template>
  <div class="patient-list-page-wrapper">
    <!-- 头部查询栏目 -->
    <div class="title-wrapper">
      <span class="title">住院登记表</span>
      <div class="title-select-wrapper">
        <span>登记日期：</span>
        <el-date-picker
            size="small"
            v-model="dateList"
            type="daterange"
            value-format="YYYY-MM-DD"
            range-separator=" - "
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <span style="margin-left: 10px;">登记情况：</span>
        <el-radio-group v-model="registFlag" size="mini">
          <el-radio :label="1">未登记</el-radio>
          <el-radio :label="2">已登记</el-radio>
          <el-radio label="">全部</el-radio>
        </el-radio-group>
        <el-input v-model="name" placeholder="请输入护士姓名、患者姓名等关键词" style="width:300px; margin:0 20px;"
                  size="small"></el-input>
        <el-button type="primary" size="small" @click="getData">查询</el-button>
      </div>
    </div>
    <!-- 表格信息 -->
    <div class="table-wrapper" ref="tableWrapper">
      <Table :tableData="tableData" :tableHeight="tableHeight" @update="handleUpdate"/>
    </div>
    <div class="pagination-wrapper">
      <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"/>
    </div>
    <InpatientRegis ref="inpatientRegis"/>
  </div>
</template>

<script>
import InpatientRegis from '@/components/Inpatient-registration/index'
import Pagination from '@/components/pagination/pagination.vue'
import Table from './components/table'
import {getPatientList} from '@/api/home'
import dayjs from "dayjs";

export default {
  data() {
    return {
      tableHeight: 530,
      dateList: [],
      registFlag: '',
      name: '',
      tableData: [],
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      },
    }
  },
  computed: {
    wardCode() {
      return this.$store.state.lesion.deptCode
    },
  },
  watch: {
    wardCode: {
      handler(nVal) {
        this.getData()
      },
    }
  },
  mounted() {
    const height = this.$refs.tableWrapper.offsetHeight
    this.tableHeight = height - 20 // padding
    this.getData()
  },
  methods: {
    async getData() {
      if (!this.wardCode) return
      const params = {
        wardCode: '041002',//this.wardCode,
        registFlag: this.registFlag,
        registStartDate: this.dateList[0] && dayjs(this.dateList[0]).format('YYYY-MM-DD'),
        registEndDate: this.dateList[1] && dayjs(this.dateList[1]).format('YYYY-MM-DD'),
        name: this.name,
        pageSize: this.page.pageNum,
        pageIndex: this.page.pageIndex,
      }
      const {data} = await getPatientList(params)
      this.tableData = data.data.list
      this.page.pageIndex = data.data.pageIndex
      this.page.pageNum = data.data.pageSize
      this.page.total = data.data.totalCount
    },
    handleUpdate(rows) {
      rows.birthday = rows.dateOfBirth
      this.$refs.inpatientRegis.open(rows)
    },
    handleSizeChange(newSize) {
      this.page.pageNum = newSize
      this.getData()
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage
      this.getData()
    },
  },
  components: {Table, InpatientRegis, Pagination}
}
</script>

<style lang="scss" scoped>
.patient-list-page-wrapper {
  height: calc(100vh - 60px);
  box-sizing: border-box;

  .title-wrapper {
    height: 40px;
    padding: 0 10px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .title-select-wrapper {
      font-size: 16px;
      display: flex;
      align-items: center;
    }
  }

  .table-wrapper {
    box-sizing: border-box;
    height: calc(100% - 100px);
    padding: 15px 15px 5px;
    overflow: hidden;
  }

  .pagination-wrapper {
    box-sizing: border-box;
    height: 50px;
    margin: 5px 15px;
    background: #ffffff;
  }
}
</style>
