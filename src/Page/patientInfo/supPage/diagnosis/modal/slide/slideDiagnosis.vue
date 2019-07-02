<template>
  <div>
    <div class="no-do-bg" v-show="show" @click="close"></div>
    <transition name="el-zoom-in-left">
      <div v-show="show" class="slide-con">
        <h1 class="title">{{data.name}}</h1>
        <div class="close-btn" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <div class="password-box" flex="cross:center">
          <span class="label" for="">登录密码</span>
          <el-input flex-box="1" placeholder="请输入密码" type="password" v-model="password">
          </el-input>
        </div>
        <div class="save-btn" @click="save">
          <div v-touch-ripple>
            签名并保存
          </div>
        </div>
        <div class="contain">
          <div class="do-box" style="margin: 0">
            <div class="label">【相关因素】</div>
            <el-checkbox-group v-model="checkList">
              <div class="m-10">
                <el-input class="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入相关因素" v-model="factor" :readonly="isHistory">
                </el-input>
              </div>
            </el-checkbox-group>
          </div>
          <div class="do-box">
            <div class="label">【护理措施】</div>
            <el-checkbox-group v-model="resultList" size="small">
              <div class="m-10" v-for="item in checkList" :key="item.code">
                <el-checkbox :label="item.code" :disabled="isHistory">{{item.name}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
          <div class="do-box">
            <div class="label">【预期目标】</div>
            <el-checkbox-group v-model="checkList">
              <div class="m-10">
                {{target}}
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box
  .el-checkbox__label
    font-size: 12px;
    color: #687179;
    white-space normal
  textarea
    font-size: 12px;
    color: #687179;  
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.slide-con
  width 500px
  height 100%
  padding 50px 20px 140px;
  box-sizing border-box
  position fixed
  top 0
  bottom 0
  right 0
  background #fff
  box-shadow 0 0 20px rgba(0,0,0,0.4)
  z-index 1000000
  background: #F7FAFA;
  z-index 2002
  .close-btn
    position absolute
    top 15px;
    right 15px;
    font-size 14px;
    cursor pointer
    padding 8px;
    border-radius 50%;
    &:hover
        background #EDF2F3
.no-do-bg
  position fixed;
  top:0;
  bottom:0;
  left: 0;
  right: 0;  
  z-index 2001
.title
    font-size: 16px;  
    color: #333333;
    font-weight bold
    position absolute
    top 20px;
    left 20px;  
.contain
  overflow-y auto
  height 100%
  .do-box
    background #ffffff
    box-sizing border-box
    padding 15px 10px  
    border: 1px solid #CBD5DD; 
    box-shadow: inset 0 1px 2px 0 rgba(129,129,129,0.50);
    border-radius: 2px;
    margin-top 20px
    .label
      font-size: 13px;
      color: #687179;
    .m-10
      margin 10px
      font-size: 12px;
      color: #687179;
      letter-spacing: 0;
      line-height: 21px;
      line-height: 21px;
.save-btn
  background: #4BB08D;
  border-radius: 2px;   
  font-size: 13px;
  color: #FFFFFF;   
  text-align center
  height 35px;
  line-height 35px
  position absolute;
  bottom: 15px;
  left: 20px;
  right: 20px;  
  cursor pointer
.password-box
  position absolute;
  bottom: 70px;
  left: 20px;
  right: 20px;  
  cursor pointer 
  .label
    width 80px
    font-size 14px
</style>

<script>
  import {
    measure
  } from '@/api/form'
  import {
    save
  } from '@/api/home-top'
  import BusFactory from 'vue-happy-bus'
  export default {
    data() {
      return {
        data: {},
        bus: BusFactory(this),
        show: false,
        checkList: [],
        target: '',
        resultList: [],
        factor: '',
        isHistory: false,
        password: ''
      }
    },
    methods: {
      open(item) {
        if (!item.id) {
          this.isHistory = true
        } else {
          this.isHistory = false
        }
        this.show = true
        this.data = item
        this.checkList = [],
          this.resultList = [],
          this.factor = '',
          this.target = ''
        let historyData = this.$_.filter(this.$store.state.form.measure, function(o) {
          return o.code == item.code;
        })
        if (historyData.length) {
          this.factor = historyData[0].factor
          this.resultList = historyData[0].measure
        }
        measure(item.code).then((res) => {
          this.checkList = res.data.data.measures
          this.target = res.data.data.target
        })
      },
      close() {
        this.show = false
      },
      save() {
        let code = this.data.code
        let measure = this.resultList
        let factor = this.factor
        let patientName = this.$route.name
        if (this.password) {
          let data = {
            creator: this.password,
            wardCode: this.$route.query.wardCode,
            patientId: this.$route.query.patientId,
            visitId: this.$route.query.visitId,
            patientName: this.$route.query.patientName,
            bedLabel: this.$route.query.bedLabel,
            patientName: patientName,
            code: code,
            name: this.data.name,
            measures: measure,
            element: factor
          }
          save(data).then(res => {
            this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
            this.close()
            this.bus.$emit('refreshCarePlan')
            window.closeNewDiagnosis()
          })
        } else {
          this.$message({
            showClose: true,
            message: '请输入密码',
            type: 'warning'
          })
        }
      }
    },
    components: {}
  }
</script>
