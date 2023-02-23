<template>
  <div class="nursing-rules">
    <div class="search-topbar">
      <!-- <span class="title">护理制度</span> -->
      <div class="float-left">
        <h3>病床管理</h3>
      </div>
      <div class="float-right">
        <el-button @click="addPatientRoom">添加病房</el-button>
        <el-button @click="delDetail('all')">批量删除</el-button>
        <el-button @click="printAll">批量打印</el-button>
        <span class="search-el">
          <el-input
            placeholder="请输入病房名称|病房编码"
            v-model="query.keyWord"
            prefix-icon="el-icon-search"
          ></el-input>
        </span>
        <el-button @click="handleSearch" type="primary">查询</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <el-table
          :data="data"
          ref="multipleTable"
          :height="tableHeight"
          border
          v-loading="pageLoadng"
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="sortValue"
            label="序号"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="code"
            label="病房编码"
            align="center"
            class-name="rule-name"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="病房名称"
            align="center"
          ></el-table-column>
          <el-table-column prop="fileType" label="床位信息" align="center">
            <template slot-scope="scope">
              <div class="rule-name-content">
                {{ scope.row.bedNoList && scope.row.bedNoList.join(',') }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="catalog" label="状态" align="center">
            <template slot-scope="scope">
              <div class="rule-name-content">
                {{ scope.row.status == 1 ? '启用中' : '停用中' }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="operation"
            width="360"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  v-if="scope.row.status == 1"
                  class="table-botton"
                  @click="editStatus(scope.row, 0)"
                >
                  停用
                </el-button>
                <el-button
                  v-if="scope.row.status != 1"
                  type="text"
                  class="table-botton"
                  @click="editStatus(scope.row, 1)"
                >
                  启用
                </el-button>
                <el-button
                  type="text"
                  class="table-botton"
                  @click="delDetail('single', scope.row)"
                
                >
                  删除
                </el-button>
                <el-button
                  type="text"
                  class="table-botton"
                  @click="edit(scope.row)"
                >
                  修改
                </el-button>
                <el-button
                  type="text"
                  class="table-botton"
                  @click="previewQRcode(scope.row)"
                >
                  二维码预览
                </el-button>
                <el-button
                  type="text"
                  class="table-botton"
                  @click="print(scope.row)"
                >
                  二维码打印
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <customPagination
        :page.sync="query.pageIndex"
        :size.sync="query.pageSize"
        :total="fileTotal"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      />
    </div>

    <editModal ref="editModal"></editModal>
    <QRcodePreview ref="printQrCode"></QRcodePreview>
    <QRcodePrint ref="QRcodePrint"></QRcodePrint>
  </div>
</template>

<script>
import commonMixin from './../../common/mixin/common.mixin'
import customPagination from './components/pagination.vue'
import editModal from './components/edit-modal.vue'
import QRcodePreview from './components/QRcodePreview.vue'
import QRcodePrint from './components/QRcodePrint.vue'

import bus from 'vue-happy-bus'
import printing from 'printing'
import { getList, deletePatientRoom, updatePatientRoom } from './api/api'
export default {
  components: {
    customPagination,
    editModal,
    QRcodePreview,
    QRcodePrint,
  },
  mixins: [commonMixin],
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 20,
        keyWord: '',
      },
      bus: bus(this),
      fileTypeList: [],
      catalogList: [],
      tableHeight: 0,
      fileTotal: 0,
      data: [],
      preview: {
        type: '',
        name: '',
        url: '',
      },
      pdfHeight: window.innerHeight * 0.8,
      pageLoadng: true,
      multipleSelection: [],
      printData: [],
    }
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this)
    this.handelResize()
    window.addEventListener('resize', this.handelResize)
    if (this.deptCode) this.setTableData()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handelResize)
  },
  watch: {
    deptCode(val, oldVal) {
      if (val && oldVal) this.query.page = 1

      if (val) this.setTableData()
    },
  },
  created() {
    this.bus.$on('loadPatientRoomList', () => {
      this.handleSearch()
    })
  },
  methods: {
    handelResize() {
      let tableHeight = document.querySelector('.main-contain .table-contain')
        .offsetHeight
      this.tableHeight = tableHeight
    },
    // deleteFile(){},
    handleSizeChange(newSize) {
      this.query.pageIndex = 1
      this.query.pageSize = newSize
      this.setTableData()
    },
    handleCurrentChange(newPage) {
      this.setTableData()
    },
    handleSearch() {
      this.query.pageIndex = 1
      this.setTableData()
    },
    setTableData() {
      this.pageLoadng = true
      getList({
        ...this.query,
        deptCode: this.deptCode,
      }).then(
        (res) => {
          const data = res.data.data
          this.data = data.list
          this.fileTotal = data.totalCount || 0
          this.pageLoadng = false
        },
        (err) => {
          this.pageLoadng = false
        },
      )
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    edit(data) {
      this.$refs.editModal.open('edit', data)
    },
    previewQRcode(data) {
      this.$refs.printQrCode.open(data, 'previwe')
    },
    print(data) {
      const arr = []
      arr.push(data)
      this.$refs.QRcodePrint.qrCode(arr)
    },
    addPatientRoom() {
      this.$refs.editModal.open('add', {})
    },
   delDetail(type, row) {
     const params = []
     let mess
      if (type == 'all') {
        if (this.multipleSelection.length == 0) {
          return this.$message('未选择勾选删除条目')
        }
        mess=`是否要批量删除记录?`
        this.multipleSelection.map((item) => {
          params.push(item.id)
        })
      } else {
        mess=`是否要删除${row.name + row.code}的记录?`
        params.push(row.id)
      }
      this.$confirm(mess, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deletePatientRoom(params)
            .then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功',
              })
              this.handleSearch()
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '删除失败',
              })
            })
        })
        .catch(() => {
          console.log('删除取消')
        })
    },
    editStatus(data, status) {
      const bedNoList = []
      data.bedNoList.map((item) => {
        bedNoList.push({ bedNo: item })
      })
      let params = {
        code: data.code,
        deptCode: this.deptCode,
        name: data.name,
        status: status,
        id: data.id,
        patientRoomBedNoVoList: bedNoList,
      }
      updatePatientRoom(params).then((res) => {
        const mess = '修改成功！'
        this.$message.success(mess)
        this.bus.$emit('loadPatientRoomList')
      })
    },
    printAll() {
      if (this.multipleSelection.length == 0) {
        return this.$message('未选择勾选打印条目')
      }
      this.$refs.QRcodePrint.qrCode(this.multipleSelection)
    },
  },
}
</script>
<style lang="scss">
.nursing-rules {
  .search-topbar {
    .float-right {
      float: right;
      .type-label {
        font-size: 13px;
        vertical-align: middle;
      }
      .type-content {
        margin-right: 15px;
        input {
          height: 31px;
        }
      }
      .search-el {
        input {
          height: 31px;
        }
      }
    }
  }
  .main-contain {
    div {
      cursor: default;
      .operation-text {
        cursor: pointer;
        color: #4bb08d;
        &:hover {
          font-weight: bold;
        }
      }
    }
    .el-table {
      border: 1px solid #cbd5dd;
      border-bottom: 0;
      td {
        height: 34px;
      }
    }
    .el-table th > div {
      padding: 0;
    }
    .table-botton {
      padding: 0 5px;
      margin-left: 0;
    }
  }
}
.nursing-rules-preview-modal {
  .sweet-modal {
    width: 900px;
  }
  .sweet-content {
    max-height: none;
  }
}
</style>

<style lang="scss" scoped>
.nursing-rules {
  position: absolute;
  width: 100%;
  top: 60px;
  bottom: 0;
  .search-topbar {
    height: 41px;
    background-image: linear-gradient(-180deg, #f8f8fa 0%, #ebecf0 100%);
    border-bottom: 1px solid #cbd5dd;
    overflow: hidden;
    .title {
      font-size: 20px;
      display: inline-block;
      margin-left: 30px;
      margin-top: 20px;
    }
    .float-left {
      margin-top: 6px;
      margin-left: 10px;
      display: inline-block;
      h3 {
        font-size: 18px;
        line-height: 31px;
      }
    }
    .float-right {
      margin-top: 5px;
      margin-right: 10px;
      .search-el {
        width: 180px;
        display: inline-block;
      }
    }
  }

  .main-contain {
    position: absolute;
    top: 51px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    .table-contain {
      position: absolute;
      top: 0;
      bottom: 41px;
      left: 0;
      right: 0;
    }
    .pagination {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #eaeaea;
      border: 1px solid #cbd5dd;
      padding: 4px 15px;
      background: rgba(0, 0, 0, 0);
      z-index: 1;
    }
  }

  .el-table {
    th > .cell,
    th > div {
      padding: 0px;
      text-align: center;
    }
    td.rule-name {
      position: relative;
      .rule-name-content {
        position: absolute;
        line-height: 34px;
        left: 15px;
        right: 15px;
        top: 0;
        text-align: left;
        bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    td.align-left div {
      text-align: left;
    }
  }
}
</style>
