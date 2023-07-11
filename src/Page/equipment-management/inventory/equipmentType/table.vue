<template>
  <div class="critical-value">
    <Header ref="header" :multipleSelection='multipleSelection' />
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
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          v-for="(item, index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :minWidth="item.minWidth"
          :align="item.align"
          :fixed="item.fixed"
        >
        </el-table-column>
        <el-table-column
            class-name='operate'
            label="操作"
            align="center"
            width="150">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click.native.prevent="editRow(scope.row)"
                size="small">
                修改
              </el-button>
              <el-button
                type="danger"
                @click.native.prevent="deleteRow(scope.row)"
                size="small">
                移除
              </el-button>
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
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import Pagination from "@/components/pagination/pagination.vue";
import Header from './header'
import tableColumn from './column'
import { getList, deleteOne } from '../../api/equipmentType'

export default {
  components: {
    Pagination,
    Header
  },
  data() {
    return {
      bus: bus(this),
      tableColumn,
      tableData: [],
      loading: false,
      tableHeight: "",
      query: {
        pageSize: 20,
        pageIndex: 1
      },
      total: 0,
      wardCode: '',
      multipleSelection: []
    };
  },
  mounted() {
    this.tableHeight = window.innerHeight - 220;
    this.getTableData();
    this.bus.$on('editSuccess', this.getTableData)
    this.bus.$on('downloadTemSuccess', this.getTableData)
  },
  methods: {
    editRow(row) {
      this.$refs.header.onAdd(row);
    },
    deleteRow(row) {
      this.$msgbox({
        title: '提示',
        size: 'small',
        message: `确定要删除此设备类别信息吗？`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            deleteOne(row).then(res => {
              if (res.data.code === "200") {
                this.$message.success(`删除成功！`);
                this.getTableData();
              } else {
                this.$message.warning(res.data.desc || `删除失败！`);
              }
            });
            done();
          } else {
            done();
          }
        }
      })
    },
    getTableData() {
      this.loading = true;
      let params = {
        pageIndex: this.query.pageIndex,
        pageSize: this.query.pageSize,
        // wardCode: localStorage.getItem('selectDeptValue')
      };
      getList(params).then(res => {
        this.loading = false;
        if (res.data.code === "200") {
          this.tableData = (res.data && res.data.data && res.data.data.list) || []
          this.total = (res.data && res.data.data && res.data.data.totalCount) || 0
        }
      });
    },
    selectionChange(val) {
      this.multipleSelection = val
      // console.log(val, 9999999)
    },
    sizeChange(newSize) {
      this.query.pageSize = newSize;
      this.getTableData();
    },
    currentChange(newPage) {
      this.query.pageIndex = newPage;
      this.getTableData();
    },
    
  }
};
</script>

<style lang="scss" scoped>
.content {
  margin: 0px 20px;
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
