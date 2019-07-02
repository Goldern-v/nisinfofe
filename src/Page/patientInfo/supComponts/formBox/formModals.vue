<template>
<div class="modal-con">
  <sweet-modal ref="modal" size="small" :title="title" :icon="icon" @close="close">
    <div class="desc">
      <div v-if="!desc">
        <div v-if="icon == 'success'">
          保存成功
        </div>
        <div v-if="icon == 'error'">保存失败</div>
        <div v-if="icon == 'processing'">处理中...</div>
      </div>
      <div>
        {{desc}}
      </div>
    </div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modal.close()" v-if="icon == 'error'">关闭</el-button>
      <el-button class="modal-btn" @click="$refs.modal.close()" v-if="icon == 'success'">确认</el-button>
    </div>
  </sweet-modal>
</div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.desc
  text-align: left;
  margin-left: 100px;
  color #333
  padding 20px 0 10px
  font-size 14px;
  min-height: 65px
.modal-con
  >>>.sweet-buttons
    // background #fff;
    // border-top 0
  >>>.sweet-content
    min-height 70px
</style>
<script>
import {
  initList
} from '../../supPage/record/component/form-list/form.list.js'
import BusFactory from 'vue-happy-bus'
export default {
  data() {
    return {
      bus: BusFactory(this),
      desc: '',
      open: true,
      icon: 'loading',
      title: '正在提交',
      showButtons: true,
    }
  },
  methods: {
    openForm() {
      this.desc = ''
      this.$refs.modal.open()
    },
    closeForm() {
      this.desc = ''
      this.$refs.modal.close()
    },
    loading() {
      this.title = '正在提交'
    },
    success(desc, data) {
      this.desc = desc
      this.icon = 'success'
      this.title = '处理成功'
      // this.showButtons = true;

      if (document.querySelector('#fromBoxClean')) {

      } else {
        window.closePostForm();
        this.bus.$emit('careNoteRefresh')
        this.bus.$emit('refreshTree')
        this.bus.$emit('assessmentRefresh')
        this.bus.$emit('openAssessment', {
          id: data.id,
          formCode: data.formCode,
          showCurve: data.showCurve,
          creator: data.creator,
          pageUrl: data.pageUrl||'',
          nooForm: data.nooForm||'',
          listPrint: data.listPrint
        })
      }
    },
    saveSign(desc, data) {
      this.desc = '正在处理数据中...即将启动签名对话框'
      this.icon = 'processing'
      this.title = '正在提交'
      // window.closePostForm();
      if (document.querySelector('#fromBoxClean')) {

      } else {
        this.bus.$emit('careNoteRefresh')
        this.bus.$emit('refreshTree')
        this.bus.$emit('assessmentRefresh')
        this.bus.$emit('openAssessment', {
          id: data.id,
          formCode: data.formCode,
          showCurve: data.showCurve,
          creator: data.creator,
          listPrint: data.listPrint,
          pageUrl: data.pageUrl||'',
          nooForm: data.nooForm||'',
          showSignSave: true,
        })
      }
      this.$notify({
        title: '提示',
        message: '正在处理数据中...即将启动签名对话框',
        duration: 5000
      });
      // this.showButtons = false;
      // this.$refs.modal.close()
    },
    error(desc) {
      this.desc = desc
      this.icon = 'error'
      this.title = '错误'
    },
    reset() {
      this.$refs.modal.close()
      // window.openModalName()
      if (window.sign = 'signSave') {
        this.bus.$emit('assessmentSignSave')
      }
      if (window.sign = 'shenheSign') {
        this.bus.$emit('assessmentShenheSign')
      }
    },
    close() {
      if (this.icon != 'success' && this.icon != 'processing') return
      if (document.querySelector('#fromBoxClean')) {
        window.closeFormBoxClean()
      } else {
        window.closeFormBox()
      }
    }
  },
  mounted() {
    window.openPostForm = () => {
      this.openForm()
    }
    window.closePostForm = () => {
      this.close() // 关闭 closeFormBox || closeFormBoxClean
    }
    window.closeOKForm = () => {
      this.closeForm() // 关闭 $refs.modal.close()
    }
    window.saveAndSign = (desc, data) => {
      this.saveSign(desc, data) // 保存后 接着 启动签名
    }
    window.loadingPostForm = () => {
      this.loading()
    }
    window.successPostForm = (desc, data) => {
      this.success(desc, data)
    }
    window.errosPostForm = (desc) => {
      this.error(desc)
    }
  },
  components: {}
}
</script>
