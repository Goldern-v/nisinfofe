<template>
  <div class="critical-value">
    <Header @getTableData='getData' ref="header" :isNursingMinister='isNursingMinister' :multipleSelection='multipleSelection' />
    <!-- 打印二维码 -->
      <div class="QRcode" ref="printQRcode">
        <QRcode ref="QRcodeRef" :information='information' :printAll='printAll' />
      </div>
      <!-- 打印状态标识 -->
      <div  ref="statusFlagRef" class="statusFlagRef" :style="statusInformation.styleSize">
        <div class="status">
          <div class="border">
            <div :style="{ border: `19px solid ${statusInformation.color}` }">{{statusInformation.statusFlag}}</div>
          </div>
          <div class="border">
            <div :style="{ border: `19px solid ${statusInformation.color}` }">{{statusInformation.date}}</div>
          </div>
        </div>
      </div>
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
          prop="statusFlag"
          label="状态标识"
          minWidth="80"
          align="center">
          <template slot-scope="scope">
            <span :style="{color: getColor(scope.row.statusFlag)}">{{scope.row.statusFlag}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="设备状态"
          minWidth="80"
          align="center">
          <template slot-scope="scope">
            <span :style="{color: getColor(scope.row.status)}">{{scope.row.status}}</span>
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
import bus from "vue-happy-bus";
import moment from "moment";
import printing from "printing";
import Pagination from "@/components/pagination/pagination.vue";
import Header from './header'
import { column, column2 } from './column'
import ModalPreview from './modal/preview'
import { getList, deleteOne, getIsNursingMinister } from '@/Page/equipment-management/api/equipmentList'
import QRcode from './components/QRcode'


export default {
  components: {
    Pagination,
    Header,
    ModalPreview,
    QRcode
  },
  data() {
    return {
      column,
      column2,
      bus: bus(this),
      tableData: [],
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
      editValue: '',
      printAll: '',
      information: {},
      isNursingMinister: false,
      statusInformation: {
        statusFlag: '',
        color: '',
        statusFlagSize: '',
        styleSize: ''
      }
    };
  },
  mounted() {
    this.tableHeight = window.innerHeight - 222;
    this.getData()
    this.getIsNursingMinister()
    this.bus.$on('editSuccess', this.getData)
  },
  methods: {
    // 判断是否为护理部
    getIsNursingMinister() {
      getIsNursingMinister().then(res => {
        if (res.data.code === "200") {
          console.log(res.data, 888888)
          this.isNursingMinister = res.data && res.data.data && res.data.data.isNursingMinister
        }
      });
    },
    getColor(text) {
      if (['故障停用', '闲置中'].includes(text)) return 'red'
      else if (['正常运行', '使用中'].includes(text)) return '#4bb08d'
      else return '#fc9530'
    },
    editRow(row, label) {
      if (label === '修改') {
        if (this.isNursingMinister) this.$refs.header.onAdd(row);
        else this.$message.warning('修改功能仅护理部用户才能操作！')
        
      } else if (label === '预览二维码') {
        this.$refs.modalPreview.visible = true;
        this.$refs.modalPreview.information = row
        this.$nextTick(() => {
          this.$refs.modalPreview.getQRCode(row)
        })
        this.$refs.header.printAll = '' // 清空多选打印的规格
      } else if (label === '删除') {
        if (!this.isNursingMinister) {
          this.$message.warning('删除功能仅护理部用户才能操作！')
          return
        }
        if (row.status === '使用中') {
          this.$message.warning('使用中的设备不能删除！')
          return
        }
        this.deleteRow(row)
      } else if (label === '打印二维码') {
        this.printQcode(row)
      } else if (label === '打印状态标识牌') {
        this.printStatusFlag(row, '打印状态标识牌')
      } 
    },
    printQcode(row) {
      this.printAll = ''
      this.information = row
      this.$refs.QRcodeRef.getQRCode(row, text)
      this.$nextTick(() => {
          printing(this.$refs.printQRcode, {
          direction: "vertical",
          injectGlobalCss: true,
          scanStyles: false,
        })
      })
    },
    printStatusFlag(row, text) {
      // this.printAll = ''
      // this.statusInformation = row
      this.statusInformation = {
        ...row, 
        date: moment().format('YYYY-MM-DD'), 
        color: this.getColor(row.statusFlag), 
        styleSize: this.$refs.QRcodeRef.getSizeStyle(row.statusFlagSize, text)
      }
      let cssStyle = `
          @media print {
            .status {
              color: red !important;
              background-color:red !important;
            }
          }
          `
      // this.$refs.QRcodeRef.getQRCode(row, text)
      this.$nextTick(() => {
          printing(this.$refs.statusFlagRef, {
          direction: "vertical",
          injectGlobalCss: true,
          // scanStyles: true,
          // css: cssStyle
        })
      })
    },
    deleteRow(row) {
      this.$msgbox({
        title: '提示',
        size: 'small',
        message: `确定要删除此设备信息吗？`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            deleteOne(row).then(res => {
              if (res.data.code === "200") {
                this.$message.success(`删除成功！`);
                this.getData();
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
    getData() {
      this.loading = true;
      getList({
        ...{
          ...this.$refs.header.title, 
          type: this.$refs.header.title.type === '全部' ? '' : this.$refs.header.title.type,
          qrCodeSize: this.$refs.header.title.qrCodeSize === '全部' ? '' : this.$refs.header.title.qrCodeSize,
        },
        pageIndex: this.query.pageIndex,
        pageSize: this.query.pageSize,
      }).then(res => {
        this.loading = false;
        if (res.data.code === "200") {
          this.tableData = (res.data && res.data.data && res.data.data.list) || []
          this.total = (res.data && res.data.data && res.data.data.totalCount) || 0
        } else {
          this.$message.error(res.data.desc)
        }
      });
    },
    selectionChange(val) {
      this.multipleSelection = this.getAllQRCode(val || [])
    },
    getAllQRCode(data) {
      return data.map(item => {
        // this.$nextTick(() => {
          console.log(this.$refs)
          item['qrCode'] = this.$refs.QRcodeRef.getQRCode(item)
        // })
        return item
      })
    },
    sizeChange(newSize) {
      this.query.pageSize = newSize;
      this.getData()
    },
    currentChange(newPage) {
      this.query.pageIndex = newPage;
      this.getData()
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
.QRcode{
  position: absolute;
  z-index: -10;
}
.statusFlagRef{
  position: absolute;
  z-index: -20;
  display: flex; 
  justify-content: center; 
  align-items: center
}
.status{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 4cm;
  height: 4cm;
  padding: 0 10px;
  color: #fff;
  font-weight: 800;
  .border {
    border: 3px solid #999;
    &:first-of-type {
      border-bottom-width: 1.5px;
    }
    &:last-of-type {
      border-top-width: 1.5px;
    }
    & > div {
      line-height: 0;
      text-align: center;
    }
  }
}
</style>
