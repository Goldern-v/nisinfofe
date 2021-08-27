<template>
<div>
  <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab" class="ifams-nav">
    <div class="tool-box">
      <span v-show="editableTabs2.length">
            <el-button v-show="toolBox.indexOf('add') > -1" size="small" @click="addForm">添加</el-button>
            <el-button v-show="toolBox.indexOf('update') > -1" size="small" @click="updateForm">查看/修改</el-button>
            <el-button v-show="toolBox.indexOf('print') > -1" size="small" @click="printForm">打印</el-button>
            <el-button v-show="toolBox.indexOf('curve') > -1" size="small" @click="showLineChart">评分曲线</el-button>
            <span v-if="toolBox.indexOf('page') > -1" style="float: right;margin-top: 2px">
                          <el-pagination
                @current-change="handleSizeChange"
                :page-size="parseInt(formPage.numPerPage)"
                :current-page="parseInt(formPage.currentPage)"
                layout="prev, pager, next"
                :total="parseInt(formPage.totalCount)">
                          </el-pagination>
                  </span>
      </span>
    </div>
    <el-tab-pane v-for="item in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
      <iframe :id="item.title" class="iframe-box" :height="height" frameborder=0 name="showHere" scrolling=auto :src="item.url" @load="onload"></iframe>
    </el-tab-pane>
  </el-tabs>
  <scoreChart ref="scoreChart"></scoreChart>
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.iframe-box
  width 100%
.tool-box
  height 40px;
  background #CBD5DD
  padding 1px 13px 0
  line-height 35px
  box-sizing border-box
  .button
    color #fff
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.ifams-nav
  .el-tabs__item
    height 37px
    line-height 37px
    width 222px
    background-image: linear-gradient(-180deg, #F8F9FA 0%, #EBECF0 100%);
    border: 1px solid #CBD5DD !important;
    border-top: 0 !important;
    border-left: 0 !important;
    position relative
    font-size: 13px;
    color: #333333;
    padding-right 26px !important
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    border-radius 0 !important
    &.is-active
      background #fff
  .el-icon-close
    position absolute !important
    top 10px !important
    right 10px !important
  .el-tabs__header
    margin-bottom 0 !important
    border 0 !important
</style>

<script>
import {
  host
} from '@/api/apiConfig'
import {
  initList
} from './form-list/form.list'
import scoreChart from '../modal/score-chart.vue'
export default {
  data() {
    return {
      editableTabsValue2: '1',
      editableTabs2: [],
      tabIndex: 0,
      toolBox: '',
      chartUrl: '',
      formPage: {
        totalCount: 0,
        numPerPage: 0,
        currentPage: 0
      },
      infoList: []
    }
  },
  computed: {
    wih() {
      return this.$store.state.common.wih
    },
    height() {
      return this.wih - 223
    }
  },
  methods: {
    addTab(item) {
      // 表单模版
      let token = window.app.$getCookie('NURSING_USER').split('##')[1]
      let url =
        `${host}/crNursing/api/form/input/${item.formCode}/${this.$route.query.patientId}/${this.$route.query.visitId}/${this.$route.query.name}/${this.$route.query.sex}/${this.$route.query.age}/${this.$route.query.deptCode}/${this.$route.query.bedLabel}/${this.$route.query.inpNo}/${this.$route.query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
      window.openFormBox(url)
    },
    addTabHl(item) {
      let token = window.app.$getCookie('NURSING_USER').split('##')[1]
      let newTabName = ++this.tabIndex + ''
      // 判断是否存在
      let inIndex = 0
      this.editableTabs2.map((option, index) => {
        if (item.name == option.title) {
          inIndex = index + 1
        }
      })
      if (inIndex > 0) {
        this.editableTabsValue2 = inIndex.toString()
      } else {
        // 列表页
        if (item.urlType != 2) {
          this.editableTabs2.push({
            title: item.name,
            name: newTabName,
            url: item.fileUrl
          })
          this.editableTabsValue2 = newTabName
          return
        }
        this.editableTabs2.push({
          title: item.name,
          name: newTabName,
          url: `${host}/crNursing/api${item.fileUrl}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
        })
        this.editableTabsValue2 = newTabName
      }
    },
    onload(e) {
      console.log("初始化列表页", e);
      // 初始化列表页
      try {
        let name = e.target.id
        let wid = e.target.contentWindow
        initList(wid)
        this.toolBox = wid.formApp.controlBtn().join('')
        this.chartUrl = wid.$('#curvePath').val()
        this.formPage = wid.formApp.formPage()
        this.infoList.unshift({
          name: name,
          toolBox: wid.formApp.controlBtn().join(''),
          chartUrl: wid.$('#curvePath').val(),
          formPage: wid.formApp.formPage()
        })
        this.infoList = this.$_.unionBy(this.infoList, 'name')
      } catch (e) {}
    },
    removeTab(targetName) {
      let tabs = this.editableTabs2
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue2 = activeName
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName)
    },
    saveForm() {
      console.log("saveForm", this.editableTabs2);
      document.getElementById(this.editableTabs2[this.editableTabsValue2 - 1].title).contentWindow.formApp.openDialog()
    },
    addForm() {
      document.getElementById(this.editableTabs2[this.editableTabsValue2 - 1].title).contentWindow.formApp.addForm()
    },
    updateForm() {
      document.getElementById(this.editableTabs2[this.editableTabsValue2 - 1].title).contentWindow.formApp.updateForm()
    },
    printForm() {
      document.getElementById(this.editableTabs2[this.editableTabsValue2 - 1].title).contentWindow.formApp.printForm()
    },
    printClick() {
      document.getElementById(this.editableTabs2[this.editableTabsValue2 - 1].title).contentWindow.formApp.printClick()
    },
    handleSizeChange(val) {
      let wid = document.getElementById(this.editableTabs2[this.editableTabsValue2 - 1].title).contentWindow
      let pageNum = wid.$('input[name="pageNum"]').val();
      if (val == pageNum) return
      wid.formApp.formPageBreak(val)
    },
    // 打开评分曲线
    showLineChart() {
      this.$refs.scoreChart.open(this.chartUrl)
    }
  },
  watch: {
    editableTabsValue2() {
      try {
        this.toolBox = ''
        this.formPage = {}
        this.chartUrl = ''
        if (!this.editableTabs2[Number(this.editableTabsValue2) - 1]) return
        for (let item of this.infoList) {
          if (item.name == this.editableTabs2[this.editableTabsValue2 - 1].title) {
            this.toolBox = item.toolBox
            this.formPage = item.formPage
            this.chartUrl = item.chartUrl
          }
        }
      } catch (e) {
        // console.log(e)
      } finally {}
    }
  },
  components: {
    scoreChart
  }
}
</script>
