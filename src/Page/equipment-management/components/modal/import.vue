<template>
  <el-dialog size='tiny' title="导入设备信息" :visible.sync="visible">
    <div style="text-align: center">
      <el-upload
        ref="upload"
        :headers='importHeaders'
        :action="http"
        accept=".xlsx,.xls"
        :limit="1"
        :on-exceed='limitCheck'
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success='success'
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
        <div slot="tip" class="el-upload__tip">*注：仅支持xlsx,xls格式文件，最大5M</div>
      </el-upload>
      <el-button class="download" size="small" type="primary" @click="downloadTem">点击下载模块</el-button>
    </div>
    <div slot="footer" class="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitUpload">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { apiPath } from "@/api/apiConfig";
import {
    $params
} from '@/pages/sheet-print/tool/tool'
import bus from "vue-happy-bus";

export default {
  props: {
    url: {
      default: '',
      type: String
    },
    downloadTemApi: {
      default: () => {},
      type: Function
    }
  },
  data() {
    return {
      bus: bus(this),
      visible: false,
      fileList: [],
      apiPath
    };
  },
  computed:{
    importHeaders(){
      let headers = {}
      headers['App-Token-Nursing'] = $params.appToken || '51e827c9-d80e-40a1-a95a-1edc257596e7'
      headers['Auth-Token-Nursing'] = (window.app && window.app.$getCookie('NURSING_USER').split('##')[1]) || (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token) || $params.token
      return headers
    },
    http() {
      return this.apiPath + this.url
    }
  },
  methods: {
    cancel() {
      this.fileList = []
      this.visible = false
    },
    downloadTem() {
      try {
        this.downloadTemApi().then(res => {
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
      } catch (e) {
        console.log(e)
      }
    },
    beforeUpload(file) {
      // 允许上传的文件格式列表
      let acceptList = ["xlsx", "xls"]
      // 根据文件名获取文件的后缀名
      let fileType = file.name.split('.').pop().toLowerCase()
      // 判断文件格式是否符合要求
      if (acceptList.indexOf(fileType) === -1) {
        this.$message.error('只能上传 xlsx/xls 格式的文件 !');
        return false
      }
      // 判断文件大小是否符合要求
      if (file.size / 1024 / 1024 > 5) {
        this.$message.error('上传文件大小不能超过 5M !');
        return false
      }
    },
    success(response, file, fileList) {
      if (response.code === '200') {
        this.$message.success('导入设备类别信息成功')
        this.bus.$emit('downloadTemSuccess')
      } else {
        this.$message.error(response.desc || '导入设备类别信息失败')
      }
      this.cancel()
    },
    limitCheck() {
      this.$message.warning('每次只能上传一个文件')
    },
    submitUpload() {

      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    fileChange(file, fileList) {
      this.fileList = fileList
    },
  }
};
</script>

<style lang="scss" scoped>
.download{
  margin-top: 20px;
}
</style>