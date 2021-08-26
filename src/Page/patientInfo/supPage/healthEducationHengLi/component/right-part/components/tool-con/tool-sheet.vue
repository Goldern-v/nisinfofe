<template>
<div class="tool-bar">
  <div class="tool-contain" flex="cross:center">
    <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('addSheet')">
      <div class="icon-box" style="padding: 0 3px">
        <i class="icon-tianjia iconfont"></i>
      </div>
      <div class="text-con">
        添加
      </div>
    </div>
    <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('editSheet')" :class="{disabled: !sheetId || !(recordSource == 1 || recordSource == 5)}">
      <div class="icon-box">
        <i class="icon-bianji- iconfont" style="color: #568DC9;"></i>
      </div>
      <div class="text-con">
        编辑
      </div>
    </div>
    <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('delSheet')" :class="{disabled: !sheetId}">
      <div class="icon-box">
        <i class="icon-shanchu1 iconfont" style="font-size: 14px; color: #E55E01"></i>
      </div>
      <div class="text-con">
        删除选中行
      </div>
    </div>
    <div class="item-box" flex="cross:center main:center" flex-box="1"  @click="emit('delAllSheet')">
      <div class="icon-box">
        <i class="icon-shanchu1 iconfont" style="font-size: 14px; color: #E55E01"></i>
      </div>
      <div class="text-con">
        删除记录单
      </div>
    </div>
    <div class="item-box" flex="cross:center main:center" flex-box="1"  @click="emit('openDSsheet')">
      <div class="icon-box">
        <i class="icon-churuliang iconfont" style="font-size: 14px; color: #6083B4"></i>
      </div>
      <div class="text-con">
        出入量统计
      </div>
    </div>
    <!-- <div class="item-box" flex="cross:center main:center" flex-box="1" :class="{disabled: tool.indexOf('signSave') == -1}" @click="signSave">
      <div class="icon-box">
        <i class="icon-dianziqianming iconfont"></i>
      </div>
      <div class="text-con">
        责任护士签名
      </div>
    </div> -->
    <!-- <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('syncVitalSignSheet')">
      <div class="icon-box">
        <i class="icon-tongbu iconfont" style="color: #2EC0FF"></i>
      </div>
      <div class="text-con">
        同步体征
      </div>
    </div> -->


    <div class="item-box" flex="cross:center main:center" flex-box="1" @click="emit('printSheet')">
      <div class="icon-box">
        <i class="icon-dayinji- iconfont" style="color: #7196B7"></i>
      </div>
      <div class="text-con">
        打印预览
      </div>
    </div>
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
  <div class="tool-bottom-bar" flex="cross:center">
    <div class="item-box" flex="cross:center main:center" flex-box="1">
      <div class="switch-box">
        <el-switch
          v-model="ThreeTestSheet"
          on-text=""
          off-text=""
          @change="changeThreeTestSheet"
          >
        </el-switch>
      </div>
      <div class="text-con">
        护理体征
      </div>
    </div>

    <div class="item-box" flex="cross:center main:center" flex-box="1">
      <div class="switch-box">
        <el-switch
          v-model="EvaluationRecords"
          on-text=""
          off-text=""
          @change="changeEvaluationRecords">
        </el-switch>
      </div>
      <div class="text-con">
        评估记录
      </div>
    </div>

    <div class="item-box" flex="cross:center main:center" flex-box="1">
      <div class="switch-box">
        <el-switch
          v-model="NursingCarePlan"
          on-text=""
          off-text=""
          @change="changeNursingCarePlan">
        </el-switch>
      </div>
      <div class="text-con">
        护理计划
      </div>
    </div>
  </div>
</div>  
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus"  src="./tool.styl" scoped>
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.tool-bar
  position relative
  z-index 10000
  .tool-bottom-bar
    position absolute
    left 0
    right 0
    bottom -36px
    margin 0 auto
    width 384px
    height 35px
    background: #EBECF0;
    border: 1px solid #BEC3C7;  
    border-top 0
    border-radius: 0 0 20px 20px
    z-index 1000
    font-size: 12px;
    color: #333333
</style>
<script>
import bus from 'vue-happy-bus'
  export default {
    data() {
      return {
        bus: bus(this),
        tool: '',
        ThreeTestSheet: false,
        EvaluationRecords: false,
        NursingCarePlan: false,
        sheetId: '',
        recordSource: ''
      }
    },
    methods: {
      emit(event) {
        this.bus.$emit(event)
      },
      toFullPageRecord() {
        if(this.fullPageRecord) {
           this.$store.commit('closeFullPageRecord')
        } else {
           this.$store.commit('openFullPageRecord')
        }
      },
      changeThreeTestSheet(val) {
        this.$store.commit('changeRecordValue', {
          key: 'ThreeTestSheet',
          value: val
        })
        this.emit('refreshSheet')
      },
      changeEvaluationRecords(val) {
        this.$store.commit('changeRecordValue', {
          key: 'EvaluationRecords',
          value: val
        })
        this.emit('refreshSheet')
      },
      changeNursingCarePlan(val) {
        this.$store.commit('changeRecordValue', {
          key: 'NursingCarePlan',
          value: val
        })
        this.emit('refreshSheet')
      }
    },
    computed: {
      fullPageRecord() {
        return this.$store.state.record.fullPageRecord
      }
    },
    created() {
      this.ThreeTestSheet = this.$store.state.record.ThreeTestSheet
      this.EvaluationRecords = this.$store.state.record.EvaluationRecords
      this.NursingCarePlan = this.$store.state.record.NursingCarePlan
      this.bus.$on('setSheetId', (id) => {
        this.sheetId = id
      })
      this.bus.$on('setSheetRecordSource', (recordSource) => {
        this.recordSource = recordSource
      })
    },
    components: {
    }
  }
</script>
