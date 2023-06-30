<template>
  <div class="header">
    <div class="header-item">
      <div>
        <div class="item">设备类别：</div>
        <el-select size="small" style="width: 90px;" v-model="type" placeholder="请选择">
          <el-option
            v-for="item in equipmentClass"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <div class="item">状态标识：</div>
        <el-select size="small" style="width: 90px;" v-model="type" placeholder="请选择">
          <el-option 
            v-for="item in stateID"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <div class="item">设备状态：</div>
        <el-select size="small" style="width: 90px;" v-model="type" placeholder="请选择">
          <el-option
            v-for="item in equipmentState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <div class="item">二维码规格：</div>
        <el-select size="small" style="width: 90px;" v-model="allSize" placeholder="请选择">
          <el-option
            v-for="item in allQRcode"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search">
        <el-input
          size="small"
          placeholder="请输入设备名称 | 设备编码"
          icon="search"
          v-model="search"
          :on-icon-click="searchIconClick"
        >
        </el-input>
      </div>
    </div>
    <div class="search-item">
      
      <el-button size="small" type="primary" @click="searchClick">查询</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
      <el-button size="small" type="primary" @click="printQcode">打印二维码</el-button>
      <el-button size="small" type="primary" @click.native.prevent="onAdd()">添加</el-button>
      <el-button size="small" type="primary" @click="handleExport">导入</el-button>
    </div>
    <!-- 多选打印 -->
    <div class="allQRcode" ref="allQRcode" v-for="item in multipleSelection" :key="item.id">
      <QRcode :information='item' :allSize='allSize' :printAll='printAll' />
    </div>
    <ModalAdd ref="modalAdd" />
    <ModalPreview ref="modalPreview" :multipleSelection='multipleSelection'/>

  </div>
</template>

<script>
import { getCriticalValue } from "@/api/common";
import moment from 'moment';
import qs from "qs";
import printing from "printing";
import { nursingUnit } from "@/api/lesion"
import ModalAdd from "./modal/add"
import ModalPreview from './modal/preview'
import QRcode from './components/QRcode'

export default {
  components: {
    ModalAdd,
    ModalPreview,
    QRcode
  },
  props: {
    query: {
      default: {}, 
      type: Object
    },
    multipleSelection: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
      type: "检验",
      search: "",
      stateID: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "启用",
          label: "启用"
        },
        {
          value: "停用",
          label: "停用"
        }
      ],
      equipmentState: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "使用中",
          label: "使用中"
        },
        {
          value: "闲置中",
          label: "闲置中"
        }
      ],
      equipmentClass: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "监护仪",
          label: "监护仪"
        },
        {
          value: "呼吸仪",
          label: "呼吸仪"
        },
        {
          value: "呼吸机",
          label: "呼吸机"
        }
      ],
      wardCode: '',
      deptList: [],
      allSize: '5*8',
      allQRcode: ['5*8', '8*7', '10*10', '全部'],
      printAll: ''
    };
  },
  mounted() {
    this.getDepList()
    // this.getTableData();
  },
  methods: {
    printQcode() {
      console.log((this.multipleSelection.length > 0) && (this.allSize  !== '全部'))
      if (this.multipleSelection.length > 0 && this.allSize  !== '全部') {
        this.printAll = 'all'
        this.$nextTick(() => {
          printing(this.$refs.allQRcode, {
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            // css: cssStyle
          })
        })
      } else {
        this.$message.warning('未选择打印二维码条目或者未选择打印二维码规格！')
      }
    },
    onAdd(row = null) {
      console.log(row, 66666);
      this.$refs.modalAdd.visible = true
      if (row) {
        this.$refs.modalAdd.title = '修改'
        this.$refs.modalAdd.form = row
      } else {
        this.$refs.modalAdd.title = '添加'
      }
    },
    async getDepList() {
      try {
        if (this.deptList.length > 0) return
        const res = await nursingUnit()
        this.deptList = res.data.data.deptList || []
        if (this.deptList.length > 0) {
          this.deptList = [
            { code: '', name: '全院' },
            ...this.deptList
          ]
          this.wardCode = res.data.data.defaultDept || ''
        }
      } catch (e) {
      }
    },
    searchClick() {
      this.getTableData()
    },
    searchIconClick() {
      this.getTableData()
    },
    getTableData() {
      this.loading = true;
      let params = {
        patientName: this.search,
        type: this.type,
        beginTime: moment(this.time[0]).format('YYYY-MM-DD') + ' 00:00:00' || "",
        endTime: moment(this.time[1]).format('YYYY-MM-DD') + ' 23:59:59' || "",
        pageIndex: this.query.pageIndex,
        pageSize: this.query.pageSize,
        wardCode: this.wardCode || localStorage.getItem('selectDeptValue')
      };
      getCriticalValue(params).then(res => {
        this.loading = false;
        if (res.data.code === "200") {
          let tableData = (res.data && res.data.data && res.data.data.list) || []
          let total = (res.data && res.data.data && res.data.data.pageCount) || 0
          this.$emit('getTableData', { tableData, total })
        }
      });
    },
    async handleExport() {
      if (this.loading) return

      try {
        this.loading = true
        exportExc({
          // themeName: this.$route.meta.title,
          // ...this.formData,
          // beginTime: this.formData.beginTime.split(' ')[0],
          // endTime: this.formData.endTime.split(' ')[0],
        }).then(res => {

          let fileName = res.headers["content-disposition"]
          ? decodeURIComponent(
            res.headers["content-disposition"].replace("attachment;filename=", "")
          ) : this.$route.meta.title + '.xls';
          let blob = new Blob([res.data], {
            type: res.data.type
          });
          let a = document.createElement('a')
          let href = window.URL.createObjectURL(blob) // 创建链接对象
          a.href = href
          a.download = fileName // 自定义文件名
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(href)
          document.body.removeChild(a) // 移除a元素
          this.loading = false
        })
      } catch (e) {
        this.loading = false
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 12px;
  padding: 0 20px 10px 20px;
  /* display: flex; */
  justify-content: space-between;
  .header-item{
    display: flex;
    align-items: center;
    overflow-x: auto;
    > div {
      display: flex;
      margin-right: 10px;
    }
    .item{
      min-width: 72px;
      line-height:30px;
      text-align: center;
    }
  }
  .header-item::-webkit-scrollbar {
    display:none
  }
  .search-item{
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
  }
  
  .search {
    width: 210px;
    margin-right: 10px;
  }
}
.allQRcode{
  position: absolute;
  z-index: -10;
}
</style>
