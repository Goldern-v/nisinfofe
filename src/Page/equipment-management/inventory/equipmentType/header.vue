<template>
  <div class="header">
    <div class="search-item">
      <el-button size="small" type="primary" @click.native.prevent="onAdd()">添加</el-button>
      <el-button size="small" type="primary" @click="handelImprot">导入</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
    </div>
    <ModalAdd ref="modalAdd" />
    <ModalImport ref="modalImport" :url="url" :downloadTemApi='downloadTemApi' />
  </div>
</template>

<script>
import ModalAdd from "./modalAdd"
import { deviceTypeExport, downloadTemplate_Type } from '../../api/equipmentType'
import ModalImport from '../../components/modal/import'

export default {
  components: {
    ModalAdd,
    ModalImport
  },
  props: {
    multipleSelection: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
      url: 'deviceType/importTemplate',
      downloadTemApi: null
    };
  },
  mounted() {
  },
  methods: {
    onAdd(row = null) {
      this.$refs.modalAdd.visible = true
      if (row) {
        this.$refs.modalAdd.title = '修改'
        let newRow = { ...row, isRelated: row.isRelated === '是' ? true : false }
        this.$nextTick(() => {
          this.$refs.modalAdd.form = newRow
        })
      } else {
        this.$refs.modalAdd.title = '添加'
      }
    },
    handelImprot() {
      this.$refs.modalImport.visible = true;
      this.downloadTemApi = downloadTemplate_Type
    },
    async handleExport() {
      try {
        if (this.multipleSelection.length > 0) {
          deviceTypeExport(this.multipleSelection).then(res => {
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
  .header-item{
    display: flex;
    align-items: center;
    overflow-x: auto;
    > div {
      display: flex;
      margin-right: 10px;
    }
    .item{
      min-width: 60px;
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
    width: 225px;
    margin-right: 10px;
  }
}
</style>
