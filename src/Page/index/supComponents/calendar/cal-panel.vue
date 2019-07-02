<template>
  <div class="cal-wrapper">
    <div class="cal-header" flex="main:center cross:center">
      <div class="l" @click="preMonth">
        <div class="arrow-left icon">&nbsp</div>
      </div>
      <div class="title">{{curYearMonth}}</div>
      <div class="r" @click="nextMonth">
        <div class="arrow-right icon">&nbsp</div>
      </div>
    </div>
    <div class="cal-body">
      <div class="weeks">
        <span
          v-for="(dayName, dayIndex) in i18n[calendar.options.locale].dayNames"
          class="item">
          {{i18n[calendar.options.locale].dayNames[(dayIndex + calendar.options.weekStartOn) % 7]}}
        </span>
      </div>
      <div class="dates">
        <div v-for="date in dayList" class="item"
             :class="{
            clickDay: (clickDay == date.date),
            passDay: compass(today, date.date),
            event: date.status ? (date.title != undefined) : false,
            [calendar.options.className] : (date.date == selectedDay)
          }" @click="getDept(date.date)">
          <p class="date-num"
             @click="handleChangeCurday(date)"
             :style="{color: date.title != undefined ? ((date.date == selectedDay) ? '#fff' : customColor) : 'inherit'}">
          <div class="num">{{date.date.split('-')[2]}}</div>
          <div class="aside">{{work(date.date)}}</div>
          </p>
          <!--<span v-if="date.status ? (today == date.date) : false" class="is-today"-->
          <!--:style="{backgroundColor: customColor }"></span>-->
          <!--<span v-if="date.status ? (date.title != undefined) : false" class="is-event"-->
          <!--:style="{borderColor: customColor, backgroundColor: (date.date == selectedDay) ? customColor : 'inherit'}"></span>-->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .cal-wrapper
    background #fff
  .weeks
    border-right 1px solid #E3E7EA;  
  .cal-header
    height 60px  
    text-align center
    width 100%
    border-bottom: 1px solid #E7EAEC;
    border-right 1px solid #E3E7EA;
    .title
      font-size: 16px;
      color: #333333;
      margin 0 5px
    .icon
      color #666
      position relative
      width: 20px;
      height: 20px;
      cursor pointer
      &:hover
        color #000
  .clickDay
    background: #FFA500 !important;
    .num
      color #fff !important
    .aside
      color #fff !important

  .passDay
    .num
      color #999
    .aside
      color #999

  .num
    text-align center
    font-size: 18px;
    color: #333333;
    margin-top 10px;

  .aside
    text-align center
    font-size: 12px;
    color: #999999;
    margin-top 5px
</style>
<script>
  /* eslint-disable */
  import i18n from './i18n.js'
  import {dateTimeFormatter, isEqualDateStr} from './tools.js'
  import {mySetting, deptSetting} from '@/api/index'
  //  const inBrowser = typeof window !== 'undefined'
  export default {
    name: 'cal-panel',
    data() {
      return {
        i18n,
        clickDay: this.today,
        settingList: new Map(),
        range: {}    //班次
      }
    },
    props: {
      events: {
        type: Array,
        required: true
      },
      calendar: {
        type: Object,
        required: true
      },
      selectedDay: {
        type: String,
        required: false
      },
      today: {
        type: String,
        required: false,
        default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      }
    },
    computed: {
      dayList() {
        let firstDay = new Date(this.calendar.params.curYear, this.calendar.params.curMonth, 1)
        let dayOfWeek = firstDay.getDay()
        // 根据当前日期计算偏移量
        if (this.calendar.options.weekStartOn > dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7
        } else if (this.calendar.options.weekStartOn < dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
        }

        let startDate = new Date(firstDay)
        startDate.setDate(firstDay.getDate() - dayOfWeek)

        let item, status, tempArr = [], tempItem
        for (let i = 0; i < 42; i++) {
          item = new Date(startDate)
          item.setDate(startDate.getDate() + i)

          if (this.calendar.params.curMonth === item.getMonth()) {
            status = 1
          } else {
            status = 0
          }
          tempItem = {
            date: `${item.getFullYear()}-${item.getMonth() + 1}-${item.getDate()}`,
            status: status
          }
          this.events.forEach((event) => {
            if (isEqualDateStr(event.date, tempItem.date)) {
              tempItem.title = event.title
              tempItem.desc = event.desc || ''
            }
          })
          tempArr.push(tempItem)
        }
        return tempArr
      },
      curYearMonth() {
        let tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth + 1}/01`))
        return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
      },
      customColor() {
        return this.calendar.options.color
      }
    },
    methods: {
      nextMonth() {
        this.$EventCalendar.nextMonth()
        this.$emit('month-changed', this.curYearMonth)
        this.getSetting()
      },
      preMonth() {
        this.$EventCalendar.preMonth()
        this.$emit('month-changed', this.curYearMonth)
        this.getSetting()
      },
      handleChangeCurday(date) {
        if (date.status) {
          this.$emit('cur-day-changed', date.date)
        }
      },
      compass(today, date) {
        var y = parseInt(today.split('-')[0]) - parseInt(date.split('-')[0])
        var m = parseInt(today.split('-')[1]) - parseInt(date.split('-')[1])
        var d = parseInt(today.split('-')[2]) - parseInt(date.split('-')[2])
        if (y > 0) {
          return true
        }
        else if (y === 0) {
          if (m > 0) {
            return true
          }
          else if (m === 0) {
            return d > 0
          }
          else {
            return false
          }
        }
        else {
          return false
        }
        return y && m && d
      },
      getDept(date) {
         this.$store.commit('upSelectedTime', date)
        deptSetting(date).then((res) => {
          let uid = res.data.data.myRange
          if (uid === -1) {
            this.$message({
              showClose: true,
              message: '没有今天的排班',
              type: 'warning'
            })
            return
          }
          this.clickDay = date
          let rangeMap = res.data.data.rangeMap
          let deptMap = res.data.data.deptMap
          let userMap = res.data.data.userMap
          this.myDept = rangeMap[uid]
          this.range = res.data.data.rangeMap
          this.$store.commit('upMyDept', rangeMap[uid])
          this.$store.commit('upRange', rangeMap)
          this.$store.commit('upDeptMap', this.toTableData(deptMap, userMap))
          this.$store.commit('upDept', deptMap)
        })
      },
      toTableData(dept, userMap) {
        let key = []
        for (let item in dept) {
          key.push(item)
        }
        var length = 0
        for (let index in dept) {
          length = dept[index].length > length ? dept[index].length : length
        }
        var allResult = []
        for (let option = 0; option < length; option++) {
          var result = {}
          key.forEach((item, index) => {
            result[item] = userMap[dept[item][option]]? userMap[dept[item][option]].empName : ''
          })
          allResult.push(result)
        }
        return allResult
      },
      getSetting() {
        mySetting(this.dayList[0].date, this.dayList[41].date).then((res) => {
          // debugger
          var dateMap = res.data.data.dateMap
          var rangeMap = res.data.data.rangeMap
          var result = new Map()
          for (let index in dateMap) {
            result.set(index, rangeMap[dateMap[index]].name)
          }
          this.settingList = result
        })
      },
      work(date) {
        let d = new Date(date).Format('yyyy-MM-dd')
        return this.settingList.get(d)
      }
    },
    mounted() {
      this.getSetting()
      this.getDept(this.today)
    }
  }
</script>
