<template>
<div class="tool-contain" flex="cross:center">
  <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('addAssessment')">
    <div class="icon-box" style="padding: 0 3px">
      <i class="icon-tianjia iconfont"></i>
    </div>
    <div class="text-con">
      添加
    </div>
  </div>
  <div class="item-box" flex="cross:center main:center" flex-box="1" @click="tool.canEdit && emit('editAssessment')" :class="{disabled: !tool.canEdit}">
    <div class="icon-box">
      <i class="icon-bianji- iconfont" style="color: #568DC9"></i>
    </div>
    <div class="text-con">
      编辑
    </div>
  </div>
  <div class="item-box" flex="cross:center main:center" flex-box="1" @click="tool.canEdit && emit('delAssessment')" :class="{disabled: !tool.canEdit}">
    <div class="icon-box">
      <i class="icon-shanchu1 iconfont" style="font-size: 14px;color:#E55E01;"></i>
    </div>
    <div class="text-con">
      删除
    </div>
  </div>
  <div class="item-box" flex="cross:center main:center" flex-box="1" :class="{disabled: tool.status != '0' || tool.formCode==='form_swallowing'}" @click="signSave" id="signSaveBtn">
    <div class="icon-box">
      <i class="icon-dianziqianming iconfont" style="color: #2EC0FF;"></i>
    </div>
    <div class="text-con">
      责任护士签名
    </div>
  </div>
  <div class="item-box" flex="cross:center main:center" flex-box="1" :class="{disabled: tool.status != '1' || tool.formCode==='form_swallowing'}" @click="shenheSign" id="shenheSignBtn">
    <div class="icon-box">
      <i class="icon-dianziqianming iconfont" style="color: #2EC0FF;"></i>
    </div>
    <div class="text-con">
      审核人签名
    </div>
  </div>
  <div class="item-box" flex="cross:center main:center" flex-box="1" @click="curve" :class="{disabled: !showCurve}">
    <div class="icon-box">
      <i class="icon-pingfenquxian iconfont" style="color: #48BBB3;"></i>
    </div>
    <div class="text-con">
      评分曲线
    </div>
  </div>
  <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('printAssessment')">
    <div class="icon-box">
      <i class="icon-dayinji- iconfont" style="color: #7196B7;"></i>
    </div>
    <div class="text-con">
      打印
    </div>
  </div>
  <!-- <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('printAssessmentSingle')">
      <div class="icon-box">
        <i class="icon-dayinji- iconfont" style="color: #7196B7;"></i>
      </div>
      <div class="text-con">
        单张打印
      </div>
    </div> -->
  <!-- <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('printAssessmentMore')" :class="{disabled: !listPrint}">
      <div class="icon-box">
        <i class="icon-dayinji- iconfont" style="color: #7196B7;"></i>
      </div>
      <div class="text-con">
        列表打印
      </div>
    </div> -->
  <div class="item-box" flex="cross:center main:center" flex-box="1" @click="toFullPageRecord">
    <div class="icon-box">
      <i class="icon-quanping iconfont"></i>
    </div>
    <div class="text-con">
      <span v-if="fullPageRecord">关闭全屏</span>
      <span v-else>全屏</span>
    </div>
  </div>
</div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" src="./tool.styl" scoped>

</style>
<script>
import bus from 'vue-happy-bus'
export default {
  data() {
    return {
      bus: bus(this),
      tool: '',
      showCurve: false,
      creator: '',
      listPrint: '',
      user: JSON.parse(localStorage.user)
    }
  },
  methods: {
    emit(todo) {
      this.bus.$emit(todo)
    },
    initAssessmentTool({
      tool,
      creator,
      listPrint
    }) {
      this.tool = tool
      this.creator = creator
      this.listPrint = listPrint
    },
    signSave() {
      if (this.tool.status == '0') {
        this.emit('assessmentSignSave')
      }
    },
    shenheSign() {
      if (this.tool.status == '1') {
        this.emit('assessmentShenheSign')
      }
    },
    curve() {
      if (this.showCurve) {
        this.emit('assessmentOpenScoreChart')
      }
    },
    toFullPageRecord() {
      if (this.fullPageRecord) {
        this.$store.commit('closeFullPageRecord')
      } else {
        this.$store.commit('openFullPageRecord')
      }
    }
  },
  computed: {
    fullPageRecord() {
      return this.$store.state.record.fullPageRecord
    }
  },
  created() {
    this.bus.$on('initAssessmentTool', this.initAssessmentTool)
    this.bus.$on('showCurve', (showCurve) => {
      this.showCurve = showCurve
    })
  },
  components: {}
}
</script>
