<template>
  <div>
    <sweet-modal ref="modal"
                 :modalWidth="400"
                 title="下载/上传护士排班"
                 :enable-mobile-fullscreen="false">
      <div class="file-con">
        <el-upload class="upload-con"
                   drag
                   ref="upload"
                   name="upfile"
                   :action="`/crNursing/api/whiteboardManage/import/${deptCode}?${token}`"
                   :show-file-list="true"
                   :on-success="onSuccess"
                   >
          <i class="iconfont icon-exceltubiao"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
      <div slot="button">
        <el-button class="modal-btn"
                   type="primary"
                   @click="upload"
                   >本地上传</el-button>
        <a :href="`/crNursing/api/file/downloadFile?${token}`"
           download>
        <el-button class="modal-btn"
                   @click="post">下载模板</el-button>
        </a>           
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.upload-con
  text-align center
  >>>.el-upload-dragger
    border 0
    height 150px
    i 
      font-size 70px
      color #BEBEBE;
    &.active
      color #247647;  
  >>>.el-upload-list__item 
    margin -20px 0 10px    
</style>
<script>
import { saveBoardConfigure } from '../api/index.js'
import common from '@/common/mixin/common.mixin.js'
export default {
  mixins: [common],
  data() {
    return {

    }
  },
  methods: {
    open() {
      this.$refs.upload.clearFiles()
      this.$refs.modal.open()
    },
    close() {
      this.$refs.modal.close()
    },
    post() {
      saveBoardConfigure(this.deptCode, this.checkList.join(','), '1').then(res => {
        this.$message.success('配置修改成功')
        this.$parent.getData()
        this.close()
      })
    },
    upload() {
      this.$refs.upload.$el.querySelector('input').click()
    },
    onSuccess(res) {
      console.log(res, 999)
      if(res.code == '200') {
        this.$message.success(res.data)
        this.$parent.getData()
        this.close()
      } 
      if(res.code == '300') {
        this.$message.error(res.desc)
        this.close()
      } 
    }
  },
  components: {}
}
</script>
