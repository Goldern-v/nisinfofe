<template>
  <div class="infuse-box" :class="{invw: type == 'vw'}">
    <div class="contain">
      <div class="body" flex="cross:center main:center">
        <div>
          <div class="bow-wapper">
            <div class="bow-box" v-bow="restDosage" :class="{stop: data.executeFlag == '暂停'}"></div>
            <img src="../img/吊瓶刻度@2x.png" alt="" class="bow-bg">
            <div class="restDosage-con" flex="cross:center main:center">
              <div class="restDosage-label">{{data.restDosage | parse}}</div>
              <div class="restDosage-unit">ml</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" flex="cross:center main:center" v-if="data.executeFlag != '暂停'">
        <span>剩余时间：</span>
        <span class="date-item">{{time.hh | zero}}</span>：
        <span class="date-item">{{time.mm | zero}}</span>：
        <span class="date-item">{{time.ss | zero}}</span>
      </div>
      <div class="footer" flex="cross:center main:center" v-else>
        <span>暂停</span>
      </div>
      <div class="bed-label" :class="{
                      'label-type-1': data.nurseClass == '一级护理',
                      'label-type-2': data.nurseClass == '二级护理',
                      'label-type-3': data.nurseClass == '三级护理',
                      'label-type-4': data.nurseClass == '特级护理'
      }" flex="cross:center main:center">
        {{data.bedLabel}}
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../../../../Part/whiteBoard/style/wb.styl'
@media screen and (max-width:1440px){
  .infuse-box{
    width: 20%
  }
}
@media screen and (min-width:1440px){
  .infuse-box{
    width: 16.66%
  }
}
.infuse-box
  float left
  padding 10px  
  box-sizing border-box
.invw.infuse-box   
  padding tovw(14)

.contain
  border: 1px solid #EAEEF1;    
  position relative  
  cursor pointer
  transition: all 0.3s !important;
  top 0
  &:hover {
    transition: all .3s !important;
    position: relative;
    top: -5px;
    box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.1);
  }
.invw .contain:hover
  top 0px
  box-shadow 0 0 0 0
.body
   background #fff;
   height 174px
.invw .body
  height tovw(174)   
.footer
  height 34px;
  background: #F7FAFA;
  border-top: 1px solid #EAEEF1;   
  font-size: 13px;
  color: #333333;
.invw .footer
  height tovw(34);
  font-size: tovw(13);
.bed-label
  position absolute
  width 60px
  height 22px
  background: #4BB08D;
  border-radius: 2px;  
  top -10px
  left 10px
  font-size: 13px;
  color: #FFFFFF;
.invw .bed-label   
  width tovw(60)
  height tovw(22)
  font-size: tovw(13)
.date-item
  width 20px
  height 17px
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;  
  margin 0 2px 0 0px
  text-align center
  line-height 17px
.invw .date-item
  width tovw(20)
  height tovw(17)
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;  
  margin 0 2px 0 0px
  text-align center
  line-height tovw(17)
.bow-wapper
  width 100px
  height 116px  
  border: 1px solid #A09D9D;
  border-radius 5px
  margin-bottom 18px  
  position relative
  &::before
    content ''
    width 16px;
    height 16px;
    position absolute
    border: 1px solid #A09D9D;
    border-top 1px solid #fff;
    border-radius 0 0 3px 3px
    bottom -18px
    margin 0 auto
    left 0 
    z-index 2
    right 0
.invw
  .bow-wapper
    width tovw(100)
    height tovw(116)  
    border-radius tovw(5)
    margin-bottom tovw(18) 
    position relative
    &::before
      width tovw(16)
      height tovw(16)
      bottom tovw(-18) 
.restDosage-con  
  position absolute
  top 50px
  font-size: 13px;
  color: #151515;
  text-align center
  width 100%
  .restDosage-label
    font-size: 18px;
    color: #333333;
    margin-right 4px
.invw
  .restDosage-con  
    top tovw(50)
    font-size: tovw(13)
  .restDosage-label
    font-size: tovw(18)
    margin-right tovw(4)  
.bow-bg
  position absolute
  width 94px
  left 3px
  right 3px
  top 18px    
.invw
  .bow-bg
    width tovw(94)
    left tovw(3)
    right tovw(3)
    top tovw(18)
.bow-box
  position absolute
  left 0;
  right 0
  bottom 0
  height 100px
  border-radius 0 0 3px 3px
  &::before
    content ''
    width 16px;
    height 17px;
    position absolute
    border-radius 0 0 3px 3px
    bottom -17px
    margin 0 auto
    left 0 
    z-index 2
    right 0
  &.type-1
    background #65BAFF
    &::before
      background #65BAFF
  &.type-2
    background #FFC917
    &::before
      background #FFC917
  &.type-3
    background #EB5562  
    &::before
      background #EB5562  
  &.stop
    background #CBD5DD !important
    &::before
      background #CBD5DD !important
.invw
  .bow-box
    height tovw(100)
    &::before
      width tovw(16);
      height tovw(17);
      border-radius 0 0 3px 3px
      bottom tovw(-17)


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

//   &.type-1 {
//   background:rgb(255,0,0)
// }

// &.type-2 {
//   background: rgb(255,255,0)
// }

// &.type-3 {
//   background: rgb(0,255,0)
// }

// &.type-4 {
//   background: rgb(255, 192, 203);
// }    
</style>

<script>
  export default {
    props: {
      data: Object,
      type: {
        type: String,
        default: 'px'
      }
    },
    directives: {
      bow: {
        bind: (el, bind) => {
          el.style.height = `${bind.value}px`
          let type = ''
          if(bind.value > 30) {
            type = 'type-1'
          }
          //  else if(bind.value > 60){
          //   type = 'type-2'
          // }
          else if (bind.value > 0) {
            type = 'type-3'
          }
          el.classList.remove('type-1')
          el.classList.remove('type-3')
          el.classList.add(type)
        },
        update: (el, bind) => {
          el.style.height = `${bind.value}px`
          let type = ''
          if(bind.value > 30) {
            type = 'type-1'
          }
          //  else if(bind.value > 60){
          //   type = 'type-2'
          // }
          else if (bind.value > 0) {
            type = 'type-3'
          }
          el.classList.remove('type-1')
          el.classList.remove('type-3')
          el.classList.add(type)
        }
      }
    },
    data() {
      return {
        time: {
          hh: '',
          mm: '',
          ss: '',
        },
        timer: '',
      }
    },
    computed: {
      restDosage() {
        return Number(this.data.restDosage) / Number(this.data.dosage) * 100
      }
    },
    methods: {
      initTime() {
        // let date3 = new Date(this.data.expectEndTime) - new Date()
        let date3 = Number(this.data.restTime) * 60 * 1000
        var days = Math.floor(date3 / (24 * 3600 * 1000))
        var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数  
        var hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数  
        var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数  
        var minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数  
        var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数  
        var seconds = Math.round(leave3 / 1000)
        this.time.hh = hours 
        this.time.mm = minutes 
        this.time.ss = seconds 
      }
    },
    created() {
      this.timer = setInterval(() => {
        this.initTime()
      }, 1000)
    },
    filters: {
      parse(val) {
        return Number(val).toFixed(1)
      },
      zero(val) {
        if(Number(val) <= 0) {
          return '00'
        }
        else if(Number(val) < 10) {
          return '0' + val
        }
        else {
          return val
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    components: {}
  }
</script>
