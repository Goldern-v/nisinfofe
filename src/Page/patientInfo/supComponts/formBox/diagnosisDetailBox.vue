<template>
  <div>
    <sweet-modal ref="detailModal" size="big-880" title="诊断详情">
      <div class="moadl-contain" flex="">
        <div class="left-part" flex-box="2">
          <h1 class="title">{{`P${data.seqNo}:${data.diagName}`}} {{inStop == '0' ? '(执行中)':'(已停止)' }}</h1>
          <div class="edit-btn-con" v-if="!inStop">
            <el-button class="modal-btn" type="text" round size="small" @click="toEdit" v-show="state == 0">编辑</el-button>
            <el-button class="modal-btn" type="text" round size="small" @click="toEdit" v-show="state == 1">返回</el-button>
          </div>
          <div class="header-con" flex="">
            <p flex-box="1" class="desc">
              {{data.diagElement}}
            </p>
          </div>
          <div class="info-con">
            <span style="float:left;width: 55%" flex="">
                        <span style="width:55px;">开始时间</span>
            <el-input flex-box="1" style="width:0" placeholder="请选择日期" icon="date" size="small" v-model="data.beginTime" readonly>
            </el-input>
            </span>
            <span style="float:right;width: 40%" flex="">
                        <span style="width:45px;">操作员</span>
            <el-input flex-box="1" style="width:0" placeholder="请选择日期" size="small" v-model="data.creatorName" readonly>
            </el-input>
            </span>
          </div>
          <div class="do-box" v-show="state == 1">
            <div class="label">【护理措施】</div>
            <el-checkbox-group v-model="resultList" size="small">
              <div class="m-10" v-for="item in detail.measures" :key="item.code">
                <el-checkbox :label="item.code">{{item.name}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
          <div class="do-box" v-show="state == 0" style="background: #EAEEF1;">
            <div class="label">【护理措施】</div>
            <el-checkbox-group>
              <div class="m-10" v-for="(item, index) in detail.measures" :key="item.id">
                {{item.name}}
              </div>
            </el-checkbox-group>
          </div>
          <div class="do-box" :class="{inStop: inStop}">
            <div class="label">【预期目标】</div>
            <el-checkbox-group>
              <div class="m-10">
                {{detail.target}}
              </div>
            </el-checkbox-group>
          </div>
          <div class="footer-btn-con">
            <div v-show="state == 0">
              <div v-show="isStop == 0 && inStop == 0">
                <el-button v-touch-ripple class="stop-btn" @click="toStop">停止该护理措施</el-button>
              </div>
              <div v-show="isStop == 1 || inStop == 1 " :class="{inStop: inStop}">
                <div class="do-box" :class="{inStop: inStop}">
                  <div class="info-con">
                    <span style="float:left;width: 55%" flex="">
                        <span style="width:55px;">结束时间</span>
                    <el-input flex-box="1" style="width:0" placeholder="请选择日期" icon="date" size="small" v-model="nowDate" readonly>
                    </el-input>
                    </span>
                    <span style="float:right;width: 40%" flex="">
                        <span style="width:45px;">操作员</span>
                    <el-input flex-box="1" style="width:0" placeholder="请选择日期" size="small" v-model="user" readonly>
                    </el-input>
                    </span>
                  </div>
                  <div class="label">【预期目标】</div>
                  <el-radio-group v-model="selectResult" class="select-con">
                    <el-radio label="达到">达到</el-radio>
                    <el-radio label="部分达到">部分达到</el-radio>
                    <el-radio label="未达到">未达到</el-radio>
                  </el-radio-group>
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="输入护理措施评价" v-model="comment">
                  </el-input>
                  <el-popover ref="popover4" placement="top" width="200" v-model="visible1">
                    <div>
                      <p for="" class="name-title">请输入登录密码</p>
                      <form action="" @keyup.13.prevent="stopSave">
                        <el-input size="small" type="password" placeholder="请输入密码" v-model="password"></el-input>
                      </form>
                    </div>
                    <div class="password-btn">
                      <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="stopSave">确定</el-button>
                    </div>
                  </el-popover>
                  <el-button v-show="!inStop" v-touch-ripple class="stop-save-btn" v-popover:popover4 @click="toStopSave" :loading="stopLoad">签名保存</el-button>
                </div>
              </div>
            </div>
            <div v-show="state == 1 && !inStop" style="text-align: center">
              <el-button v-touch-ripple class="list-btn list-btn-cancel" @click="toEdit">取消</el-button>
              <el-button v-touch-ripple class="list-btn list-btn-del">删除诊断</el-button>
              <el-popover ref="popover5" placement="top" width="200" v-model="visible2">
                <div>
                  <p for="" class="name-title">请输入登录密码</p>
                  <form action="" @keyup.13.prevent="save">
                    <el-input size="small" type="password" placeholder="请输入密码" v-model="password"></el-input>
                  </form>
                </div>
                <div class="password-btn">
                  <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="save">确定</el-button>
                </div>
              </el-popover>
              <el-button v-popover:popover5 v-touch-ripple class="list-btn list-btn-save" :loading="saveLoad" @click="toSave">签名保存</el-button>
            </div>
          </div>
        </div>
        <div class="right-part" flex-box="2" ref="rightPart">
          <digsnosisTable :diagId="data.id" v-if="data.id" :tableHeight="tableHeight" :title="inStop == '0' ? '(执行中)':'(已停止)'"></digsnosisTable>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">关闭</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.inStop
  pointer-events none
  background: #EAEEF1 !important;
  textarea
    background: #EAEEF1 !important;
    pointer-events none
  input
    background: #EAEEF1 !important;
    pointer-events none
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.left-part, .right-part
  width 0
  position relative
.desc
  font-size: 13px;
  color: #687179;
  margin-top 10px
.info-con
  font-size: 12px;
  color: #687179;  
  line-height 30px;
  margin 13px 0 13px
  overflow hidden
.title
  font-size: 16px;
  color: #333333;  
  font-weight bold
.edit-btn-con  
  position absolute
  top 0
  right 0
.do-box
    background #ffffff
    box-sizing border-box
    padding 15px 10px  
    border: 1px solid #CBD5DD; 
    box-shadow: inset 0 1px 2px 0 rgba(129,129,129,0.50);
    border-radius: 2px;
    margin-top 20px
    clear both
    .label
      font-size: 13px;
      color: #687179;
      text-align left 
      margin-left -5px
    .m-10
      margin 10px
      font-size: 12px;
      color: #687179;
      letter-spacing: 0;
      line-height: 21px;
      line-height: 21px;  
.footer-btn-con
  margin-top 13px      
.stop-btn
  background: #F45D3F;
  border: 1px solid #F45D3F;
  border-radius: 2px;   
  font-size: 13px;
  color: #FFFFFF;   
  width 100%;
  height 37px
  cursor pointer
.stop-save-btn
  background: #4BB08D;;
  border: 1px solid #4BB08D;;
  border-radius: 2px;   
  font-size: 13px;
  color: #FFFFFF;   
  width 100%;
  height 37px
  cursor pointer
  margin-top 13px
.list-btn
  border-radius: 2px;
  height 37px;
  width 100px 
  font-size: 13px;
  cursor pointer
.list-btn-cancel
  background: #FFFFFF;
  border: 1px solid #C2CBD2;     
  color: #333333;
.list-btn-del
  background: #F45D3F;
  border: 1px solid #F45D3F;  
  color #fff
.list-btn-save
  background: #4BB08D;
  border: 1px solid #4BB08D;  
  color #fff  
.name-title
  font-size 14px;
  margin 5px 0 10px  
  font-weight bold  
.password-btn
  margin-top 10px   
  text-align right
.select-con
  margin 12px 0  
  .el-radio__label
    font-size: 12px;
    color: #333333;
</style>

<script>
  import {
    view,
    update,
    stop
  } from '@/api/home-top'
  import BusFactory from 'vue-happy-bus'
  import digsnosisTable from './list/digsnosisTable.vue'
  export default {
    data() {
      return {
        bus: BusFactory(this),
        tableHeight: 0,
        data: {},
        state: 0, //0, 非编辑模式， 1，编辑模式
        detail: {},
        resultList: [],
        visible1: false,
        visible2: false,
        saveLoad: false,
        password: '',
        isStop: 0,
        inStop: 0,
        selectResult: '',
        comment: '',
        stopLoad: false,
        nowDate: '',
        user: JSON.parse(localStorage.user).empName || ''
      }
    },
    methods: {
      open(item) {
        this.data = item
        this.update()
        this.inStop = item.status == '1' ? 0 : 1
        this.nowDate = new Date().Format('yyyy-MM-dd hh:mm')
        this.selectResult = item.evalType
        this.comment = item.evalContent
        this.$refs.detailModal.open()
      },
      close() {
        this.$refs.detailModal.close()
      },
      toEdit() {
        this.state = this.state == 0 ? 1 : 0
      },
      toSave() {
        this.saveLoad = true
      },
      save() {
        if (!this.password) {
          return this.$message({
            showClose: true,
            message: '请输入密码',
            type: 'warning'
          })
        }
        update(this.password, this.data.id, this.resultList, this.data.diagElement).then(res => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          this.update()
          this.state = 0
          this.saveLoad = false
          this.visible2 = false
        })
      },
      update() {
        view(this.data.id).then(res => {
          this.detail = res.data.data
          this.$nextTick(() => {
            this.tableHeight = this.$refs.rightPart.offsetHeight
          })
        })
        this.resultList = []
        this.isStop = 0
        this.comment = ''
      },
      toStop() {
        this.isStop = this.isStop == 0 ? 1 : 0
        this.nowDate = new Date().Format('yyyy-MM-dd hh:mm')
      },
      toStopSave() {
        this.stopLoad = true
      },
      stopSave() {
        if (!this.password) {
          return this.$message({
            showClose: true,
            message: '请输入密码',
            type: 'warning'
          })
        }
        if (!this.selectResult) {
          return this.$message({
            showClose: true,
            message: '请选择评价类型',
            type: 'warning'
          })
        }
        stop(this.password, this.data.id, this.selectResult, this.comment).then(res => {
          this.$message({
            showClose: true,
            message: '停止成功',
            type: 'success'
          })
          this.bus.$emit('refreshCarePlan')
          this.stopLoad = false
          this.visible1 = false
          this.inStop = 1
        })
      }
    },
    watch: {
      'visible1'(val){
        if(!val) {
          this.stopLoad = false
        }
      },
      'visible2'(val){
        if(!val) {
          this.saveLoad = false
        }
      }
    },
    components: {
      digsnosisTable
    }
  }
</script>
