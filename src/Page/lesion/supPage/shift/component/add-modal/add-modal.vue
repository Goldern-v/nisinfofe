<template>
  <div>
    <sweet-modal ref="modal" size="so-small" title="请确认要创建的班次信息" :enable-mobile-fullscreen="false">
      <div flex="cross:center">
        <span class="label">交班日期</span>
         <el-date-picker style="width:210px"
           v-model="selectDate"
           type="date"
           placeholder="选择日期"
           format="yyyy-MM-dd"
           >
        </el-date-picker>
      </div>
      <div flex="cross:center" style="margin-top: 10px">
        <span class="label">班<span style="opacity: 0">空格</span>次</span>
         <div class="select-box" flex="cross:stretch">
           <div class="select-item" flex="cross:center main:center" flex-box="1">
              <el-radio class="radio" v-model="radio" label="A" size="small">A</el-radio>
           </div>
           <div class="select-item" flex="cross:center main:center" flex-box="1" style="border-left:1px solid #C2CBD2;border-right: 1px solid #C2CBD2">
             <el-radio class="radio" v-model="radio" label="P" size="small">P</el-radio>
           </div>
           <div class="select-item"  flex="cross:center main:center" flex-box="1">
             <el-radio class="radio" v-model="radio" label="N" size="small">N</el-radio>
           </div>
         </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.label
  font-size: 14px;
  color: #687179;
  margin-right 10px
  margin-left 5px
.select-box
  width 210px
  height 37px
  background: #FFFFFF; 
  border: 1px solid #C2CBD2;
  border-radius: 2px;  
.select-item
  width 0  
  font-size: 14px;
  color: #333333 
</style>
<script>
import {existsRange} from '@/api/shift'
  export default {
    data() {
      return {
        selectDate: '',
        radio: ''
      }
    },
     computed: {
      deptCode() {
        return this.$store.state.lesion.deptCode
      },
    },
    methods: {
      open() {
        this.$refs.modal.open()
        this.selectDate = new Date()
        let h = new Date().getHours()
        if(8 <= h < 16) {
          this.radio = "P"
        } else if (16 <= h < 24) {
          this.radio = "N"
        } else if (0 <= h < 8) {
          this.radio = "A"
        }
      },
      close() {
        this.$refs.modal.close()
      },
      post() {
        if(!this.selectDate) return
        let selectDate = new Date(this.selectDate).Format('yyyy-MM-dd')
        existsRange(this.deptCode,selectDate,this.radio).then(res => {
          if(res.data.data.existsRange) {
            this.$message({
              showClose: true,
              message: '已存在该班次',
              type: 'warning'
             })
          } else {
            this.close()
            let data = {
              deliverDate: new Date(this.selectDate).Format('yyyy-MM-dd'),
              range: this.radio
            }
            this.$parent.$refs.editModal.open(data)
          }
        })
      }
    },
    components: {}
  }
</script>
