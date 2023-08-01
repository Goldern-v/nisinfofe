<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="出入量统计">
      <p for="" class="name-title">请选择日期区间：</p>
      <div flex="cross:center main:center" style="margin-bottom: 20px">
        <el-date-picker v-model="date[0]" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择开始日期">
        </el-date-picker>
        <span style="margin: 0 15px">至</span>
        <el-date-picker v-model="date[1]" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择结束日期">
        </el-date-picker>
      </div>
      <p for="" class="name-title" flex="cross:center main:justify">
        <span>特殊情况处理：</span>
        <span class="activeText" @click="putGroupCount">分类合计</span>
      </p>
      <div style="margin: 0 15px" class="textarea-con">
        <el-input type="textarea" :rows="2" placeholder="请输入特殊情况处理" v-model="description">
        </el-input>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">计算</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.noTimeCon .el-date-picker__editor-wrap:last-child
  pointer-events none
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title
  font-size 14px;
  margin 0px 0 15px
  font-weight bold
  padding-left 15px
  padding-right 15px
.activeText
  font-size 14px
  color rgb(40, 79, 194)
  cursor pointer
  font-weight normal
.textarea-con
  >>>textarea
    height 120px
</style>

<script>
  import {
    outputSum
  } from '@/api/record'
  import {putGroupCount} from '../../api/index.js'
  import moment from 'moment'
  import bus from 'vue-happy-bus'
  import sheetInfo from '../config/sheetInfo/index.js'
  export default {
    data() {
      return {
        date: [new Date(), new Date()],
        description: '',
        bus: bus(this)
      }
    },
    methods: {
      open() {
        this.$refs.modal.open()
        this.description = ''
        let y = moment().subtract(1, 'days').format('YYYY-MM-DD');
        let t = moment().format('YYYY-MM-DD');
        let yt = new Date(y + ' 7:01')
        let tt = new Date(t + ' 7:00')
        this.date = [yt, tt]
      },
      close() {
        this.$refs.modal.close()
      },
      post() {
        if (this.date[1]) {
          let date = new Date(this.date).Format('yyyy-MM-dd')
          let startTime = new Date(this.date[0]).Format('yyyy-MM-dd hh:mm')
          let endTime = new Date(this.date[1]).Format('yyyy-MM-dd hh:mm')
          let recordCode = sheetInfo.sheetType
          outputSum(this.$parent.patientInfo.patientId, this.$parent.patientInfo.visitId, recordCode, startTime, endTime, this.description).then(res => {
            this.bus.$emit('refreshSheetPage')
            this.$message({
              showClose: true,
              message: '计算成功',
              type: 'success'
            })
            this.close()
          })
        } else {
          this.$message({
            showClose: true,
            message: '请输入正确的时间'
          })
        }
      },
      putGroupCount() {
        let date = new Date(this.date).Format('yyyy-MM-dd')
        let startTime = new Date(this.date[0]).Format('yyyy-MM-dd hh:mm')
        let endTime = new Date(this.date[1]).Format('yyyy-MM-dd hh:mm')
        putGroupCount(this.$parent.patientInfo.patientId, this.$parent.patientInfo.visitId, startTime, endTime).then(res => {
          if(res.data.data.desc) {
            this.description = this.description + res.data.data.desc
          } else {
            this.$message.warning('分类合计为空')
          }
        })
      }
    },
    components: {}
  }
</script>
