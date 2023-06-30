<template>
  <div class="header">
    <div class="search-item">
      <el-button size="small" type="primary" @click.native.prevent="onAdd()">添加</el-button>
      <el-button size="small" type="primary" @click="handelImprot">导入</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
    </div>
    <ModalAdd ref="modalAdd" />
  </div>
</template>

<script>
import ModalAdd from "./modalAdd"
export default {
  components: {
    ModalAdd
  },
  props: {
    multipleSelection: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {
    onAdd(row = null) {
      this.$refs.modalAdd.visible = true
      if (row) {
        this.$refs.modalAdd.title = '修改设备类别信息'
        this.$refs.modalAdd.form = row
      } else {
        this.$refs.modalAdd.title = '添加设备类别'
      }
    },
    handelImprot() {

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
