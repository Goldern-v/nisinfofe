<template>
  <div>
    <div class="my-title">我的排班</div>
    <div flex="">
      <div class="calendar-box">
        <vue-event-calendar :events="demoEvents">
        </vue-event-calendar>
        <!--<calendar :events="demoEvents"></calendar>-->
      </div>
      <div flex-box="1"
           class="date-contain">
        <div class="date-con">
          <div>
            {{selectedTime.week}}
          </div>
          <div style="margin-top: 10px">
            {{selectedTime.day}}
          </div>
        </div>
        <div class="date-right-con">
          <div class="my-classes">
            <div class="classes-title"
                 flex="cross:center">
              我的班次
              <span class="value"
                    v-show="this.$store.state.index.myDept.name">
                {{this.$store.state.index.myDept.name}} {{this.$store.state.index.myDept.startTime}}
                <span v-if="this.$store.state.index.myDept.startTime">-</span> {{this.$store.state.index.myDept.endTime}}
              </span>
              <span class="value"
                    v-show="!this.$store.state.index.myDept.name">暂无排班</span>
              <div class="green-circle"></div>
            </div>
          </div>
          <el-row class="all-classes"
                  type="flex"
                  align="middle">
            <p class="all-classes-text"
               flex="main:justify cross:center">
              <span class="all-classes-title">全班班次</span>
              <span class="value"
                    v-for="(item,key,index) in classesData">{{item.name}}
                <span :class="'text-type-'+(index+1)">{{dept[item.id].length}}</span>
              </span>
            </p>
          </el-row>
          <div class="classes-scroll">
            <div class="classes-content">
              <div class="my-classes-waraper">
                <el-row class="all-classes-header">
                  <div class="calsses-img"
                       v-for="(item,index) in classesData">
                    <img :src="`${assist}${item.icon}.png`" />
                    <aside class="classes-item"
                           :class="`type-${(index%5+1)}`">
                      {{item.name}}
                    </aside>
                  </div>
                </el-row>
              </div>
              <div class="classes-table-con">
                <img src="../img/无排班@2x.png"
                     alt=""
                     class="null-table-bg"
                     v-show="tableData.length == 0">
                <el-table v-show="tableData.length != 0"
                          :show-header="true"
                          :data="tableData"
                          :min-height="37"
                          :stripe="true"
                          class="classes-table">
                  <el-table-column v-for="(item,index) in $store.state.index.range"
                                   key="item.id"
                                   :prop="item.id.toString()"
                                   :label="item.name"
                                   min-width="84px"
                                   :class-name="'index-table-item type-'+ (index%5+1)">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.my-title
  font-size 16px
  color #687179
  margin-top 20px
  margin-bottom 10px

.calendar-box
  width 420px

.date-contain
  background #ffffff
  border 1px solid #EAEEF1
  box-shadow 0 1px 0 0 #DDDDDD
  margin-left -1px

.date-right-con
  margin-left 105px
  border-left 1px solid #E3E7EA
  background #fff
  min-height 460px

  .classes-title
    border-bottom 1px solid #EAEEF1
    height 60px
    padding-left 20px
    font-size 16px
    color #687179
    position relative
    overflow visible

  .green-circle
    position absolute
    width 10px
    height 10px
    border-radius 50%
    background #FFFFFF
    border 2px solid #4BB08D
    left -7px
    bottom -7px

  .value
    font-size 13px
    color #687179
    margin-left 20px

.date-con
  width 105px
  padding 40px 0
  text-align center
  float left
  font-size 16px
  color #4BB08D

.all-classes
  margin-top 13px

  .title
    font-size 16px
    color #687179
    margin-right 20px

  .value
    font-size 13px
    color #687179

    span
      margin 0 5px

.all-classes-text
  padding-left 20px

.all-classes-title
  font-size 16px
  color #687179

.my-classes-waraper
  margin 25px 0

  .all-classes-header
    padding 0 20px

    .calsses-img
      height 50px
      width 50px
      display inline-block
      padding-left 12px
      display inline-block

      img
        width 46px
        height 46px
        object-fit cover

  .classes-item
    font-size 13px
    color #687179
    position relative
    padding-left 11px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    box-sizing border-box
    margin-top 8px

  item-circle(color)
    content ''
    width 8px
    height 8px
    border-radius 50%
    display inline-block
    position absolute
    left 0
    top 2px
    background color

  .type-1:before
    item-circle(#36BA8E)

  .type-2:before
    item-circle(#DF565A)

  .type-3:before
    item-circle(#4598BC)

  .type-4:before
    item-circle(#24527C)

  .type-5:before
    item-circle(#F0C48D)

.classes-table-con
  position relative
  min-height 200px

.null-table-bg
  width 132px
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  margin auto
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.my-title
  font-size 16px
  color #687179
  margin-top 20px
  margin-bottom 10px

.calendar-box
  width 420px

.date-contain
  background #ffffff
  border 1px solid #EAEEF1
  box-shadow 0 1px 0 0 #DDDDDD
  margin-left -1px

.date-right-con
  margin-left 105px
  border-left 1px solid #E3E7EA
  background #fff
  min-height 460px

  .classes-title
    border-bottom 1px solid #EAEEF1
    height 60px
    padding-left 20px
    font-size 16px
    color #687179
    position relative
    overflow visible

  .green-circle
    position absolute
    width 10px
    height 10px
    border-radius 50%
    background #FFFFFF
    border 2px solid #4BB08D
    left -7px
    bottom -7px

  .value
    font-size 13px
    color #687179
    margin-left 20px

.date-con
  width 105px
  padding 40px 0
  text-align center
  float left
  font-size 16px
  color #4BB08D

.all-classes
  margin-top 13px

  .title
    font-size 16px
    color #687179
    margin-right 20px

  .value
    font-size 13px
    color #687179

    span
      margin 0 5px

.all-classes-text
  padding-left 20px

.all-classes-title
  font-size 16px
  color #687179

.my-classes-waraper
  margin 25px 0

  .all-classes-header
    padding 0 20px

    .calsses-img
      height 50px
      width 50px
      display inline-block
      padding-left 12px
      display inline-block

      img
        width 46px
        height 46px
        object-fit cover

  .classes-item
    font-size 13px
    color #687179
    position relative
    padding-left 11px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    box-sizing border-box
    margin-top 8px

  item-circle(color)
    content ''
    width 8px
    height 8px
    border-radius 50%
    display inline-block
    position absolute
    left 0
    top 2px
    background color

  .type-1:before
    item-circle(#36BA8E)

  .type-2:before
    item-circle(#DF565A)

  .type-3:before
    item-circle(#4598BC)

  .type-4:before
    item-circle(#24527C)

  .type-5:before
    item-circle(#F0C48D)

.classes-table-con
  position relative
  min-height 200px

.null-table-bg
  width 132px
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  margin auto
</style>

<script>
import Vue from 'vue'
import vueEventCalendar from '../supComponents/calendar/index'
var moment = require('moment');

import {
  assist
} from '@/api/apiConfig.js'
Vue.use(vueEventCalendar, {
  locale: 'zh',
  weekStartOn: 1
})
export default {
  data () {
    return {
      demoEvents: [],
      assist: assist
      //        tableData: this.$store.state.index.deptMap
      //        tableData: []
    }
  },
  computed: {
    tableData () {
      return this.$store.state.index.deptMap
    },
    dept () {
      return this.$store.state.index.dept
    },
    classesData () {
      return this.$store.state.index.range
    },
    selectedTime () {
      // return {
      //   week: moment(new Date(this.$store.state.index.selectedTime).Format('yyyyMMdd')).format('dddd'),
      //   day: moment(new Date(this.$store.state.index.selectedTime).Format('yyyyMMdd')).format('M月D日'),
      // }
      return {
        week: moment(this.$store.state.index.selectedTime.split('-')).subtract(1, 'months').format('dddd'),
        day: moment(this.$store.state.index.selectedTime.split('-')).subtract(1, 'months').format('M月D日'),
      }
    }
  },
  components: {}
}
</script>
