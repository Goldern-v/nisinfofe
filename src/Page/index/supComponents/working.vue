<template>
  <div>
    <el-row type="flex" justify="space-between" align="bottom" class="user-box">
      <div>
        <div class="user-name">{{userName}}</div>
        <p class="hello">{{helloString}} <span v-if="working.clockState == 'out'">已上班&nbsp;&nbsp;{{hasWordTime}}</span></p>
      </div>
      <!-- <el-button class="cart-btn in" v-show="working.clockState == 'in'" @click="workIn">
        <i class="iconfont icon-daqia1"></i> 上班打卡
      </el-button>
      <el-button :loading="false" class="cart-btn out" v-show="working.clockState == 'out'" @click="workOut">
        <i class="iconfont icon-daqia1"></i> 下班打卡
      </el-button> -->
    </el-row>
    <!--上班打卡成功返回-->
    <!-- <sweet-modal icon="success" ref="modalInSuccsee" size="small" title="打卡成功">
      <div class="modal-text-con">
        <div class="title">
          操作成功
        </div>
        <div class="article">
          打卡班次：{{dataIn.clockRange}}
        </div>
        <div class="article">
          上班时间：{{dataIn.onDutyTime}}
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="$refs.modalInSuccsee.close()">确定</el-button>
      </div>
    </sweet-modal> -->
    <!--下班打卡成功返回-->
    <!-- <sweet-modal icon="success" ref="modalOutSuccsee" size="small" title="打卡成功">
      <div class="modal-text-con">
        <div class="title">
          操作成功
        </div>
        <div class="article">
          打卡班次：{{dataOut.clockRange}}
        </div>
        <div class="article">
          上班时间：{{dataOut.onDutyTime}}
        </div>
        <div class="article">
          下班时间：{{dataOut.offDutyTime}}
        </div>
        <div class="article">
          本次工时间：{{dataOut.workDur}}
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="$refs.modalOutSuccsee.close()">确定</el-button>
      </div>
    </sweet-modal> -->
    <!--确认下班&#45;&#45;time-->
    <!-- <sweet-modal ref="modalOut" size="small" title="请确认下班时间:" class="modal-type-time">
      <el-date-picker v-model="outTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期时间">
      </el-date-picker>
      <div slot="button">
        <el-button class="modal-btn" @click="postOut">下班</el-button>
      </div>
    </sweet-modal> -->
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .user-box
    padding 20px 0;
    border-bottom: 1px solid #E4E8EB;
  .user-name
    font-size: 18px;
    color: #333333;

  .hello
    font-size: 13px;
    color: #687179;
    margin-top 12px

  .cart-btn
    margin-top 15px
    border-radius: 23px;
    width 120px;
    height 37px;
    font-size: 13px;
    color: #FFFFFF !important;
    &.in
      background: #4BB08D;
      border: 1px solid #3D8B72;
    &.out
      background: #EF9371;
      border: 1px solid #D67E58;

  .modal-type-time
    text-align center

  .modal-btn
    background: #4BB08D;
    border-radius: 2px;
    width 60px;
    height 30px;
    color #fff !important;
    padding 0
    &:hover {
      background #5CC6A1
    }
  .modal-text-con
    margin-left 92px;
    text-align left
    .title
      font-size: 16px;
      color: #333;
      letter-spacing: 0;
      margin-top 4px;
      margin-bottom 8px
    .article
      font-size: 14px;
      color: #687179;
</style>

<script>
  import {
    working,
    clockIn,
    clockOut
  } from '@/api/index'
  import {
    SweetModal,
    SweetModalTab
  } from '@/plugin/sweet-modal-vue'
  export default {
    data() {
      return {
        hasWordTime: '',
        timer: '',
        working: {
          clockState: '',
          currentDate: '',
          currentWeek: '',
          onDutyTime: '',
          workedTime: ''
        },
        dataIn: {
          clockRange: '',
          onDutyTime: ''
        },
        dataOut: {
          clockRange: '',
          onDutyTime: '',
          offDutyTime: '',
          workDur: ''
        },
        outTime: '',
      }
    },
    created() {
      this.init()
      this.timer = setInterval(() => {
        this.toHasWordTime()
      })
    },
    computed: {
      userName() {
        if (localStorage['user']) {
          return JSON.parse(localStorage['user']).empName
        } else {
          return ''
        }
      },
      helloString() {
        var d = new Date();
        var h = d.getHours();
        var s = '';
        if (h >= 6 && h < 11) {
          s = '上午好';
        } else if (h >= 11 && h < 13) {
          s = '中午好';
        } else if (h >= 13 && h < 18) {
          s = '下午好';
        } else {
          s = '晚上好'
        }
        return s
      }
    },
    methods: {
      init() {
        working().then((res) => {
          this.working = res.data.data
        })
      },
      workIn() {
        clockIn().then((res) => {
          this.dataIn = res.data.data
          this.working.clockState = 'out'
          this.working.onDutyTime = new Date().Format('yyyy-MM-dd hh:mm')
          this.$refs.modalInSuccsee.open()
        })
      },
      workOut() {
        this.outTime = new Date()
        this.$refs.modalOut.open()
      },
      postOut() {
        clockOut(this.outTime.Format('yyyy-MM-dd hh:mm')).then((res) => {
          this.dataOut = res.data.data
          this.working.clockState = 'in'
          this.$refs.modalOut.close()
          this.$refs.modalOutSuccsee.open()
        })
      },
      toHasWordTime() {
        if (this.working.onDutyTime) {
          var date1 = new Date(this.working.onDutyTime); //开始时间
          var date2 = new Date(); //结束时间
          var date3 = date2.getTime() - date1.getTime() //时间差的毫秒数
          //计算出相差天数
          var days = Math.floor(date3 / (24 * 3600 * 1000))
          //计算出小时数
          var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
          var hours = Math.floor(leave1 / (3600 * 1000))
          //计算相差分钟数
          var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
          var minutes = Math.floor(leave2 / (60 * 1000))
          //计算相差秒数
          var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
          var seconds = Math.round(leave3 / 1000)
        }
        this.hasWordTime = `${hours>=10?hours:'0'+hours}小时${minutes>=10?minutes:'0'+minutes}分钟${seconds>=10?seconds:'0'+seconds}秒`
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    components: {
      SweetModal,
      SweetModalTab
    }
  }
</script>
