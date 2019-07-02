<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="420" title="设置起始页码" :enable-mobile-fullscreen="false">
      <div flex="main:center cross:center" style="margin-bottom: 20px">
        <p style="margin-right: 10px">起始页码修改：</p>
        <el-input-number size="large" v-model="startPage" :min="1"></el-input-number>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">保存</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>
<script>
import bus from 'vue-happy-bus'
import {saveHomePage, getHomePage} from '../../api/index.js'
  export default {
    data() {
      return {
        startPage: 1,
        bus: bus(this)
      }
    },
    methods: {
      open() {
        this.$refs.modal.open()
        getHomePage(this.$parent.patientInfo.patientId, this.$parent.patientInfo.visitId).then(res => {
          this.startPage = (res.data.data && res.data.data.indexNo) || 1
        })
      },
      close() {
        this.$refs.modal.close()
      },
      post() {
        saveHomePage(this.$parent.patientInfo.patientId, this.$parent.patientInfo.visitId, this.startPage).then(res => {
          this.$message.success(`起始页设置为 ${ this.startPage } 成功`)
          this.bus.$emit('refrehSheetStartPage')
          setTimeout(() => this.bus.$emit('initSheetPageSize'), 1000)
          setTimeout(() => {
            if(document.querySelectorAll('.sheet-table').length == 0) {
              this.bus.$emit('initSheetPageSize')
            }
          }, 1000)
          this.close()
        })
      }
    },
    components: {}
  }
</script>
