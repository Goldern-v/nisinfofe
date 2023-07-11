<template>
  <div class="header">
    <div class="header-item">
      <div>
        <div class="item">设备类别：</div>
        <el-select size="small" style="width: 110px;" @change="getTableData" v-model="title.type" placeholder="请选择">
          <el-option
            v-for="item in [{name: '全部', id: 'all'}, ...deviceType]"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <div class="item">状态标识：</div>
        <el-select size="small" style="width: 90px;" @change="getTableData" v-model="title.statusFlag" placeholder="请选择">
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
        <el-select size="small" style="width: 90px;" @change="getTableData" v-model="title.status" placeholder="请选择">
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
        <el-select size="small" style="width: 90px;" @change="getTableData" v-model="title.qrCodeSize" placeholder="请选择">
          <el-option
            v-for="(item, index) in allQRcodeSize"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search">
        <el-input
          style="width: 210px"
          size="small"
          placeholder="请输入设备名称 | 设备编码"
          icon="search"
          v-model="title.code"
          :on-icon-click="getTableData"
          @change="getTableData"
        >
        </el-input>
      </div>
    </div>
    <div class="search-item">
      <el-button size="small" type="primary" @click="searchClick">查询</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
      <el-button size="small" type="primary" @click="printAllQcode">打印二维码</el-button>
      <el-button size="small" type="primary" v-if='isNursingMinister' @click.native.prevent="onAdd()">添加</el-button>
      <el-button size="small" type="primary" v-if='isNursingMinister' @click="handleImport">导入</el-button>
    </div>
    <!-- 多选打印二维码 -->
    <div class="allQRcode">
      <div ref="allQRcode" v-for="item in multipleSelection" :key="item.id">
        <QRcode ref="QRcode" :information='item' :allSize='title.qrCodeSize' :printAll='printAll' />
      </div>
    </div>
    <ModalAdd :deviceType='deviceType' ref="modalAdd" />
    <ModalPreview ref="modalPreview" :multipleSelection='multipleSelection'/>
    <ModalImport ref="modalImport" :url="url" :downloadTemApi='downloadTemApi' />  
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import printing from "printing";
// import { nursingUnit } from "@/api/lesion"
import ModalAdd from "./modal/add"
import ModalPreview from './modal/preview'
import QRcode from './components/QRcode'
import ModalImport from '../../components/modal/import'
import { deviceExport, downloadTemplate, getAllQrCodeSize } from '@/Page/equipment-management/api/equipmentList'
import { getAllDeviceType } from '@/Page/equipment-management/api/equipmentType'

export default {
  components: {
    ModalAdd,
    ModalPreview,
    ModalImport,
    QRcode
  },
  props: {
    // query: {
    //   default: {}, 
    //   type: Object
    // },
    multipleSelection: {
      default: [],
      type: Array
    },
    isNursingMinister: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      bus: bus(this),
      title: {
        code: '',
        qrCodeSize: '全部',
        status: '',
        statusFlag: '',
        type: '全部',
      },
      stateID: [
        {
          value: "",
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
          value: "",
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
      allQRcodeSize: [],
      printAll: '',
      downloadTemApi: null, // 下载模块
      url: 'device/importTemplate', // 导入接口
      deviceType: [], 
      // isNursingMinister: false
    };
  },
  mounted() {
    this.getAllDeviceType()
    this.getAllQrCodeSize()
    this.bus.$on('getQrCodeSize', this.getAllQrCodeSize)
  },
  methods: {
    getAllQrCodeSize() {
      getAllQrCodeSize().then(res => {
        if (res.data.code === "200") {
          this.allQRcodeSize = ['全部', ...((res.data && res.data.data) || [])]
        }
      });
    },
    getAllDeviceType() {
      getAllDeviceType().then(res => {
        if (res.data.code === "200") {
          this.deviceType = (res.data && res.data.data) || []
        }
      });
    },
    // 导入
    handleImport() {
      this.$refs.modalImport.visible = true;
      this.downloadTemApi = downloadTemplate
    },
    printAllQcode() {
      if (this.multipleSelection.length > 0 && this.title.qrCodeSize !== '全部') {
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
        this.$message.warning('请选择打印二维码条目与请选择打印二维码规格！')
      }
    },
    onAdd(row = null) {
      this.$refs.modalAdd.visible = true
      if (row) {
        this.$refs.modalAdd.title = '修改'
        let newRow = { ...row, qrCodeSize: this.getSize(row.qrCodeSize, 'qrCodeSize'), statusFlagSize: this.getSize(row.statusFlagSize, 'statusFlagSize'), buyTime: new Date(row.buyTime) || '' } 
        this.$nextTick(() => {
          this.$refs.modalAdd.form = newRow
        }) 
      } else {
        this.$refs.modalAdd.title = '添加'
      }
    },
    getSize(size, status) {
      if (size) {
        let w = size.split('*')[0];
        let h = size.split('*')[1];
        if (`${w}*${h}` === '3*5') return 1
        else if(`${w}*${h}` === '6*8') return 2
        else {
          if (status === 'qrCodeSize') {
            this.$refs.modalAdd.qrCodeSizeH = h
            this.$refs.modalAdd.qrCodeSizeW = w
          } else {
            this.$refs.modalAdd.statusFlagSizeH = h
            this.$refs.modalAdd.statusFlagSizeW = w
          }
          return 3
        }
      }
      else return null
    },
    searchClick() {
      this.getTableData()
    },
    getTableData() {
      this.$emit('getTableData')
    },
    async handleExport() {
      try {
        if (this.multipleSelection.length > 0) {
          deviceExport(this.multipleSelection).then(res => {
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
          })
        } else {
          this.$message.warning('未选择导出设备类别条目！')
        }
      } catch (e) {
        console.log(e)
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 12px;
  padding: 0 20px 10px 20px;
  display: flex;
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
