<template>
  <div class="infuse-details-modal">
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <i class="el-icon-close close-btn" @click="dialogVisible = false"></i>
      <div class="bed-label" flex="cross:center main:center" :class="{
                      'label-type-1': data[0].nursingClass == '一级护理',
                      'label-type-2': data[0].nursingClass == '二级护理',
                      'label-type-3': data[0].nursingClass == '三级护理',
                      'label-type-4': data[0].nursingClass == '特级护理'
      }">
        {{data[0] && data[0].bedLabel}} {{data[0].nurseClass}}
      </div>
      <div class="list-con">
        <div class="list-box" flex="cross:center" v-for="item in data" :key="item.orderText">
          <span class="key">{{item.orderText}}</span>
          <span flex-box="1" class="line"></span>
          <span class="value">{{item.dosage}}{{item.dosageUnits}}</span>
        </div>
      </div>
      <div class="info-con" flex="cross:center main:justify">
        <div class="left-part" flex="cross:center">
          <div class="tip">{{data[0].repeatIndicator && data[0].repeatIndicator[0]}}</div>
          <span class="text">{{data[0].frequency}} | {{data[0].administration}} | {{data[0].freqDetail}}</span>
        </div>
        <div class="right-part">
          <img src="../images/水滴.png" alt="" class="icon">
          <span>{{data[0].speed}}滴/分</span>
        </div>
      </div>
      <div class="footer-con">
        <div class="aside">
          距预计输液结束还剩
        </div>
        <div class="time" flex="cross:center main:center">
          <span class="date-item">{{time.hh | zero}}</span>：
          <span class="date-item">{{time.mm | zero}}</span>：
          <span class="date-item">{{time.ss | zero}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.infuse-details-modal
  .el-dialog__header
    display none
  .el-dialog__body  
    padding 0
  .el-dialog
    width 400px  
    background: #FFFFFF;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.50);
    border-radius: 4px;
    overflow hidden
  .bed-label
    position absolute
    top 12px
    left 20px    
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.close-btn
  font-size 12px
  color #333333
  position absolute
  top 5px
  right 10px
  cursor pointer
  padding 10px
  &:hover
    color #000
.bed-label
  height 25px
  width 65px    
  background: #4BB08D;
  border-radius: 2px;
  font-size: 18px;
  color: #FFFFFF;
.list-con
  margin-top 55px  
  padding 0px 20px 5px 36px
  position relative
  &:after
    content ''
    position absolute
    left 22px
    top 6px
    bottom 24px
    width 1px
    background #333333
  .list-box
     margin-bottom 13px
     position relative
     overflow visible 
     &:after
      content ''
      position absolute
      left -13px
      top 0
      bottom 0
      width 8px
      height 1px
      background #333333
      margin auto 0
  .key
    font-size: 13px;
    color: #333333;
  .value
    font-size: 13px;
    color: #284FC2;  
  .line
    border-top 1px dashed #687179  
    margin 0 10px
.footer-con
  height 60px
  overflow hidden
  background: #F7FAFA;    
  border-top: 1px solid #EAEEF1;
  .aside
    font-size: 13px;
    color: #333333;
    text-align center 
    margin-top 8px
    margin-bottom 8px
  .date-item
    width 20px
    height 17px
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px;  
    margin 0 2px 0 0px
    text-align center
    line-height 17px  
.info-con  
  margin 0 35px 17px 40px
.left-part 
  .tip
    background: #CBD5DD;
    border-radius: 1px;   
    width 21px
    height 17px
    text-align center 
    line-height 17px 
    font-size: 13px;
    color: #333333;
  .text
    font-size: 12px;
    color: #687179;
    letter-spacing: 0;  
    margin-left 10px
.right-part
  font-size: 12px;
  color: #687179;    
  .icon
    width 8px
    margin-right 2px

.label-type-1 {
    background: rgb(255,0,0) !important;
  }

.label-type-2 {
    background: rgb(255,255,0) !important;
  }

.label-type-3 {
    background: rgb(0,255,0) !important;
  }

.label-type-4 {
    background: rgb(255, 192, 203) !important;
  }      
</style>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      data: [{}],
      time: {
        hh: "",
        mm: "",
        ss: ""
      },
      timer: ""
    };
  },
  methods: {
    open(data) {
      this.data = data;
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    initTime() {
      if (!this.data[0]) return;
      // let date3 = new Date(this.data[0].expectEndtTime) - new Date()
      let date3 = Number(this.data[0].restTime) * 60 * 1000;
      var days = Math.floor(date3 / (24 * 3600 * 1000));
      var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000);
      this.time.hh = hours;
      this.time.mm = minutes;
      this.time.ss = seconds;
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.initTime();
    }, 1000);
  },
  filters: {
    parse(val) {
      return Number(val).toFixed(1);
    },
    zero(val) {
      if (Number(val) <= 0) {
        return "00";
      } else if (Number(val) < 10) {
        return "0" + val;
      } else {
        return val || "00";
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {}
};
</script>
