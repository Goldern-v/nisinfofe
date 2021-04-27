<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="修改诊断">
      <!-- <p for="" class="name-title" flex="cross:center main:justify"> -->
        <!-- <span>诊断：</span> -->
      <!-- </p> -->
      <div style="margin: 0 0 10px" class="textarea-con">
        <el-input type="textarea" :rows="2" placeholder="诊断" v-model="diagnosis">
        </el-input>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">修改</el-button>
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
  import {updateBlock} from '../../api/index.js'
  import moment from 'moment'
  import bus from 'vue-happy-bus'
  import sheetInfo from '../config/sheetInfo/index.js'
  import $ from 'jquery'
  export default {
    data() {
      return {
        diagnosis: '',
        id: '',
        bus: bus(this)
      }
    },
    methods: {
      open(patientInfo) {
        this.$refs.modal.open()
        this.diagnosis = patientInfo.diagnosis
        this.id = patientInfo.id
      },
      close() {
        this.$refs.modal.close()
      },
      post() {
       updateBlock({id: this.id, diagnosis: this.diagnosis}).then(res => {
        // this.bus.$emit('saveSheetPage', false)
        this.$message.success('修改诊断成功')

        // this.$store.commit('upPatientInfo', Object.assign({}, this.$store.state.sheet.patientInfo, {blockId: this.id}))
        // this.bus.$emit('getBlockList')
        // $('span.sheet-diagnosis').text(res.data.data.diagnosis)
        // console.log(res.data)
        sheetInfo.selectBlock.diagnosis = res.data.data.diagnosis
        this.close()
       })
      },
    },
    components: {}
  }
</script>
