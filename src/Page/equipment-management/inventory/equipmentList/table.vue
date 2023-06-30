<template>
  <div class="critical-value">
    <Header @getTableData='getData' ref="header" :query="query" :multipleSelection='multipleSelection' />
    <div class="content">
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="selectionChange"
      >
        <el-table-column
          align="center"
          fixed
          type="selection"
          width="55">
        </el-table-column>
        <!-- <el-table-column fixed align="center" type="index" label="序号" width="60"></el-table-column> -->
        <el-table-column
          v-for="(item, index) in column"
          :key="index + 'column'"
          :prop="item.prop"
          :label="item.label"
          :minWidth="item.minWidth"
          :align="item.align"
          :fixed="item.fixed"
        >
        </el-table-column>

        <el-table-column
          prop="stateId"
          label="状态标识"
          minWidth="80"
          align="center">
          <template slot-scope="scope">
            <span :style="{color: scope.row.stateId === '正常运行' ? '#4bb08d' : 'red'}">{{scope.row.stateId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="equipmentstatus"
          label="设备状态"
          minWidth="80"
          align="center">
          <template slot-scope="scope">
            <span :style="{color: scope.row.equipmentstatus !== '停止' ? '#4bb08d' : 'red'}">{{scope.row.equipmentstatus}}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-for="(item, index) in column2"
          :key="index + 'column2'"
          :prop="item.prop"
          :label="item.label"
          :minWidth="item.minWidth"
          :align="item.align"
          :fixed="item.fixed"
        >
        </el-table-column>

        <el-table-column
          class-name='operate'
          fixed="right"
          label="操作"
          align="center"
          width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag>详情</el-tag>
              </div>
              <el-button
                v-for="item in editPtions"
                :key="item.label"
                :type="item.type"
                @click.native.prevent="editRow(scope.row, item.label)"
                size="small">
                {{item.label}}
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :pageIndex="query.pageIndex"
        :size="query.pageSize"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      ></Pagination>
    </div>
    <ModalPreview ref="modalPreview" />
  </div>
</template>

<script>
import Pagination from "@/components/pagination/pagination.vue";
import Header from './header'
import { column, column2 } from './column'

import ModalPreview from './modal/preview'
// console.log(tableColumn, 6666666666)

export default {
  components: {
    Pagination,
    Header,
    ModalPreview
  },
  data() {
    return {
      column,
      column2,
      tableData: [{id: '111'}, {id: '3', name: '设备', size: '5*8', stateId: '正常运行', equipmentstatus: '停止'}],
      loading: false,
      tableHeight: "",
      query: {
        pageSize: 20,
        pageIndex: 1
      },
      total: 0,
      wardCode: '',
      multipleSelection: [],
      editPtions: [
        { label: '打印二维码', type: 'success' }, 
        { label: '预览二维码', type: 'info' }, 
        { label: '打印状态标识牌', type: 'success' }, 
        { label: '修改', type: 'warning' }, 
        { label: '删除', type: 'danger' }, 
      ],
      editValue: ''
    };
  },
  mounted() {
    this.tableHeight = window.innerHeight - 220;
    // this.$refs.header.getTableData();
  },
  methods: {
    editRow(row, label) {
      if (label === '修改') {
        this.$refs.header.onAdd(row);
      } else if (label === '预览二维码') {
        console.log(this.$refs.header.$refs, 8888)
        // this.$refs.header.print = 'only'
        this.$refs.modalPreview.visible = true;
        this.$refs.modalPreview.information = row
      }
      console.log(row, label, 66666)
    },
    getData(data) {
      let { tableData, total } = data;
      this.tableData = tableData
      this.total = total
    },
    selectionChange(val) {
      this.multipleSelection = val
      console.log(val, 9999999)
    },
    sizeChange(newSize) {
      this.query.pageSize = newSize;
      this.$refs.header.getTableData();
    },
    currentChange(newPage) {
      this.query.pageIndex = newPage;
      this.$refs.header.getTableData();
    },
    
  }
};
</script>

<style lang="scss" scoped>
.critical-value {
  height: calc(100vh - 81px);
  margin: 10px;
  background-color: #fff;
  .content {
    margin: 0px 20px;
  }
}
 /deep/.el-table .cell, /deep/.el-table th > div {
  padding-left: 5px !important;
  padding-right: 5px !important;
}
.operate{
  /deep/.cell {
    display: flex;
  }
}
</style>
