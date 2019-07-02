<template>
  <div>
    <div class="today-bar" flex="main:justify cross:center">
      <span class="text">
          广州 &nbsp; 今天&nbsp;（{{week}}) ：{{date}}
        </span>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.today-bar
  height 40px
  background: #FDFDFD;
  padding 0 22px
  .text
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
</style>

<script>
  export default {
    data() {
      return {
        date: '',
        timer: ''
      }
    },
    created() {
      this.timer = setInterval(() => {
        this.date = new Date().Format('yyyy年  MM月dd日  hh:mm:ss')
      }, 1000)
    },
    computed: {
      week() {
        let week = new Date().getDay();
        let str = ''
        if (week == 0) {
          str = "星期日";
        } else if (week == 1) {
          str = "星期一";
        } else if (week == 2) {
          str = "星期二";
        } else if (week == 3) {
          str = "星期三";
        } else if (week == 4) {
          str = "星期四";
        } else if (week == 5) {
          str = "星期五";
        } else if (week == 6) {
          str = "星期六";
        }
        return str
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    components: {}
  }
</script>
