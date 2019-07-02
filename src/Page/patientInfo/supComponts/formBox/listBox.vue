<template>
<div>
  <sweet-modal ref="modalList" size="record" :title="`${title}列表页`" :fullBtn="true">
    <div class="iframe-con">
      <iframe class="iframe-list-box" id="iframe-list-box" @load="load" frameborder=0 name="showHere" :src="url"></iframe>
    </div>
    <div slot="button">
      <div class="tool-box">
        <el-button v-show="toolBox.indexOf('save') > -1" size="small" @click="saveForm">保存</el-button>
        <el-button v-show="toolBox.indexOf('add') > -1" size="small" @click="addForm" type="primary">添加</el-button>
        <el-button v-show="toolBox.indexOf('update') > -1" size="small" @click="updateForm" type="info">查看/修改</el-button>
        <el-button v-show="toolBox.indexOf('print') > -1" size="small" @click="printForm">打印</el-button>
        <el-button v-show="toolBox.indexOf('printClick') > -1" size="small" @click="printClick">点击打印</el-button>
        <span v-if="toolBox.indexOf('page') > -1" style="float: right;margin-top: -2px">
                                          <el-pagination
                                @current-change="handleSizeChange"
                                :page-size="parseInt(formPage.numPerPage)"
                                :current-page="parseInt(formPage.currentPage)"
                                layout="prev, pager, next"
                                :total="parseInt(formPage.totalCount)">
                                          </el-pagination>
                                  </span>
      </div>
      <!-- <el-button class="modal-btn" @click="close">取消</el-button>
                                        <el-button class="modal-btn" v-show="controlBtn.indexOf('save') > -1" @click="saveForm">保存</el-button>
                                        <el-button class="modal-btn" v-show="controlBtn.indexOf('printClick') > -1" @click="printClick">打印</el-button> -->
    </div>
  </sweet-modal>
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.iframe-con
  width 100%
  height 100%
.iframe-list-box
  width 100%
  height 100%
.tool-box
  text-align center
  width 100%
  margin-top 5px
</style>

<script>
import {
  initList
} from '../../supPage/record/component/form-list/form.list'
export default {
  data() {
    return {
      url: '',
      toolBox: '',
      title: '',
      formPage: {
        totalCount: 0,
        numPerPage: 0,
        currentPage: 0
      }
    }
  },
  methods: {
    open(url) {
      this.url = ''
      this.toolBox = ''
      this.formPage = {
        totalCount: 0,
        numPerPage: 0,
        currentPage: 0
      }
      this.$refs.modalList.open()
      this.$nextTick(() => {
        let wid = document.getElementById('iframe-list-box').contentWindow
        this.url = url
      })
    },
    close() {
      this.$refs.modalList.close()
    },
    load(e) {
      let wid = e.target.contentWindow
      if (!wid.$) return
      initList(wid)
      this.toolBox = ''
      this.toolBox = wid.formApp.controlBtn().join('')
      if (this.toolBox.indexOf('page') > -1) {
        this.formPage = wid.formApp.formPage()
      }
      this.title = wid.document.title
    },
    saveForm() {
      document.getElementById('iframe-list-box').contentWindow.formApp.openDialog()
    },
    addForm() {
      this.close()
      document.getElementById('iframe-list-box').contentWindow.formApp.addForm()
    },
    updateForm() {
      if (document.getElementById('iframe-list-box').contentWindow.formApp.updateForm()) {
        this.close()
      }
    },
    printForm() {
      this.close()
      document.getElementById('iframe-list-box').contentWindow.formApp.printForm()
    },
    printClick() {
      document.getElementById('iframe-list-box').contentWindow.formApp.printClick()
    },
    handleSizeChange(val) {
      let wid = document.getElementById('iframe-list-box').contentWindow
      initList(wid)
      this.toolBox = ''
      this.toolBox = wid.formApp.controlBtn().join('')
      if (this.toolBox.indexOf('page') > -1) {
        this.formPage = wid.formApp.formPage()
      }
      wid.formApp.formPageBreak(val)
    }
  },
  watch: {
    url() {
      this.$nextTick(() => {
        if (document.getElementById('iframe-list-box')) {
          // let wid = document.getElementById('iframe-list-box').contentWindow
          // // 初始化列表页
          // wid.onload = () => {
          //     alert(123)
          //     initList(wid)
          //     this.toolBox = ''
          //     this.toolBox = wid.formApp.controlBtn().join('')
          //     if (this.toolBox.indexOf('page') > -1) {
          //         this.formPage = wid.formApp.formPage()
          //     }
          // }
        }
      })
    }
  },
  mounted() {},
  components: {}
}
</script>
