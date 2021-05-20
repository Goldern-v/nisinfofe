<template>
  <div class="ward-report" :style="{ height }">
    <div class="left-side">
      <!-- <div @click="www">fff</div> -->
      <div class="header">
        <ElDatePicker
          class="date-picker"
          type="daterange"
          size="small"
          format="yyyy/MM/dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          :picker-options="pickerOptions"
          v-model="dateRange"
        />
      </div>
      <div class="list">
        <router-link
          class="item"
          active-class="active"
          v-for="date of dates"
          :to="{
            name: 'nursingGradeStatistics',
            params: { date: date.dateYMD }
          }"
          :key="date.dateYMD"
          @click="leftClick(date.dateYMD)"
        >
          <!-- <div class="text">{{date.text}} 至（{{date.day}}）</div> -->
          <div class="text">{{ date.text }}</div>
        </router-link>
        <!-- <router-link
          class="item"
          active-class="active"
          v-for="date of dates"
          :to="{name: 'nursingGradeStatistics', params: {date: date}}"
          :key="date"
          @click="leftClick(date)"
        >
          <div class="text">{{date}}</div>
        </router-link>-->
      </div>
    </div>
    <div class="container">
      <router-view :twoDay="twoDay"></router-view>
    </div>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

export default {
  mixins: [common],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange(7));
            }
          },
          {
            text: "最近一个月",
            onClick: picker => {
              picker.$emit("pick", this.getDateRange(30));
            }
          }
        ]
      },
      dateRange: this.getDateRange(7),
      records: [],
      day: ""
    };
  },
  computed: {
    height() {
      return this.wih - 61 + "px";
    },
    dates() {
      const [start, end] = this.dateRange;
      const current = new Date(end);
      const dates = [];

      while (current >= start) {
        dates.push({
          text:
            moment(current).format("YYYY-MM-DD") +
            `（${days[moment(current).weekday()]}）`,
          date: current,
          dateYMD: moment(current).format("YYYY-MM-DD"),
          day: days[current.getDay()]
        });
        current.setDate(current.getDate() - 1);
      }
      return dates;
    },
    endData() {
      if (!this.dateRange[1]) {
        this.dateRange[1] = "";
      }
      return moment(this.dateRange[1]).format("YYYY-MM-DD");
    },
    twoDay() {
      // return this.day +' 至 '+this.endData
      return " 至 " + this.endData;
    }
    //  dates () {
    //   const [start, end] = this.dateRange
    //   const current = new Date(end)
    //   const dates = []
    //   let getTime = this.dateRange
    //   if(!getTime){
    //     getTime= []
    //   }
    //   let intervalTime = moment(getTime[0]).format('YYYY/MM/DD') + '-' + moment(getTime[1]).format('YYYY/MM/DD')
    //   dates.push(intervalTime)
    //   // while (current >= start) {
    //   //   dates.push({text: moment(current).format('YYYY-MM-DD'), date: current, day: days[current.getDay()]})
    //   //   current.setDate(current.getDate() - 1)
    //   // }

    //   return dates
    // }
  },
  methods: {
    getDateRange(diffDays) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * diffDays);
      return [start, end];
    },
    leftClick(day) {
      this.day = day;
      // this.twoDay = day+' 至 '+this.endData
      // console.log(this.twoDay)
    }
    // www(){
    //   console.log(this.dateRange)
    // }
  }
};
</script>

<style lang="stylus" scoped>
.ward-report
  position relative
  padding-left 200px
  height 100%
  background-color #dfdfdf

  .left-side
    position absolute
    top 0
    left 0
    z-index 1
    display flex
    flex-direction column
    height 100%
    width 200px
    border-right 1px solid #CBD5DD
    background white

    .header
      display flex
      align-items center
      height 41px
      padding 0 14px
      background #F7FAFA
      border-bottom 1px solid #EAEEF1

    .list
      padding 10px 14px
      // padding 10px 7px
      flex 1
      overflow auto
      .item
        // padding 0 14px
        padding 0 14px
        display flex
        height 38px
        line-height 38px
        border-radius 3px
        background transparent
        color #687179
        cursor pointer
        text-decoration none

        &:hover
          background #F7F7FA

        &.active
          background #F1F1F5
          .text
            color #333333
            font-weight bold

        .text
          flex 1
          font-size 13px

    .date-picker
      width: 100%
      font-size 12px

  .container
    height 100%
    overflow auto
</style>
