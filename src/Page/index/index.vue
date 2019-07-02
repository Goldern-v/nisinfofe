<template>
  <!-- <div class="main">
    <div class="left-part">
      <working></working>
      <classes></classes>
    </div>
    <div class="right-part">
      <message></message>
    </div>
  </div> -->
  <div flex="">
    <div class="left-part" flex-box="9">
      <today-bar></today-bar>
      <div class="working-con">
        <working></working>
      </div>
      <div class="classes-con">
        <classes></classes>
      </div>
    </div>
    <div class="right-part" flex-box="3">
      <message></message>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  // .main
  //   background #E7EAEC
  //   overflow: hidden
  // .left-part
  //   width 500px
  //   background #f8f8f8
  //   padding 32px 36px 32px 40px
  //   box-sizing border-box
  //   float left
  //   padding-bottom 10000px
  //   margin-bottom -10000px
  // .right-part
  //   margin-left 500px
  //   background #E7EAEC
  //   min-height 100%
.working-con
  padding 0 40px  
.classes-con
  padding 0 40px  
.left-part, .right-part
  width 0  
</style>
<script>
  import working from './supComponents/working'
  import classes from './supComponents/classes'
  import message from './supComponents/message'
  import todayBar from './supComponents/today-bar'
  export default {
    components: {
      working, classes, message, todayBar
    },
    data() {
      return {
        working: {
          clockState: '',
          currentDate: '',
          currentWeek: '',
          onDutyTime: '',
          workedTime: ''
        }
      }
    },
    created() {
      this.init()
    },
    computed: {
      userName() {
        if (localStorage['user']) {
          return JSON.parse(localStorage['user']).empName
        } else {
          return ''
        }
      }
    },
    methods: {
      init() {
//        working().then((res) => {
//          this.working = res.data.data
//        })
      }
    },

  }
</script>
