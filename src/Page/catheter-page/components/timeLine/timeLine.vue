<template>
  <div class="container">
    <div style="width: 100%">
      <div class="date-right">
        <div class="prev-btn" @click="toPrev">
          <i class="icon-Artboard iconfont"></i>
        </div>
        <div class="next-btn" @click="toNext">
          <i class="icon-ArtboardCopy iconfont"></i>
        </div>
        <swiper :options="swiperOption" class="swiper-body" ref="swiperBody">
          <swiper-slide
            :class="[daybg(item.date), activeIndex == index ? 'active':'']"
            :key="index"
            v-for="(item, index) in timeLine"
          >
            <span class="date">{{item.date}}</span>
            <span class="desc">{{item.desc}}</span>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/stylus" type="text/stylus" scoped>
.container {
  margin-top: 10px;
  background: #f7fafa;
  border-left: 0px;
  border-right: 0px;
  height: 46px;
  border: 1px solid rgb(203, 213, 221);
  border-bottom: 0;
}
.swiper-slide {
  width: 12.5%;
  margin: 0;
  border-left: 1px solid #eaeef1;
  box-sizing: border-box;
  font-size: 13px;
  color: #687179;
  text-align: center;
  line-height: 16px;
  height: 46px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &.past {
  }
  &.today {
    background: #fff8b1 !important;
  }
  &.next {
    background: #fff;
  }
  &.active {
    border-top: 4px solid #4bb08d;
    border-bottom: 4px solid transparent;
  }
  .date {
    color: #687179;
    display: block;
  }
  .desc {
    color: #333;
    display: block;
  }
}
.date-right {
  margin: 0;
}
.swiper-body {
  margin: 0 30px;
}

.prev-btn,
.next-btn {
  text-align: center;
  line-height: 46px;
  cursor: pointer;
  height: 46px;
  i {
    color: #4bb08d;
    font-size: 0.4rem;
  }
}

.prev-btn {
  float: left;
  width: 30px;
  border-right: 1px solid #ffeaee;
  background: #fff;
}

.next-btn {
  float: right;
  width: 30px;
  border-left: 0;
  background: #fff;
  border-left: 1px solid #ffeaee;
}
</style>

<script>
import { model, status_strategy } from "../../store";
import moment from "moment";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      today: moment().format("YYYY-MM-DD"),
      activeIndex: "",
      swiperOption: {
        pagination: ".swiper-pagination",
        slidesPerView: 6,
        paginationClickable: true,
        freeMode: true,
        onTap: swiper => {
          if (swiper.clickedIndex > -1) {
            this.activeIndex = swiper.clickedIndex;
            model.selectedDate = this.timeLine[this.activeIndex];
            model.getRecordList();
            this.swiperBody.slideTo(this.activeIndex);
            this.changeDate(swiper.clickedIndex, swiper);
          }
        }
      }
    };
  },
  computed: {
    block() {
      return model.selectedBlock;
    },
    startDate() {
      return model.selectedBlock.startDate;
    },
    endDate() {
      try {
        return this.block[status_strategy[this.block.status].endDate];
      } catch (error) {}
    },
    timeLine() {
      function datedifference(sDate1, sDate2) {
        var dateSpan, tempDate, iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays;
      }
      function getFormatDate(arg) {
        if (arg == undefined || arg == "") {
          return "";
        }
        var re = arg + "";
        if (re.length < 2) {
          re = "0" + re;
        }
        return re;
      }
      function addDate(date, days) {
        if (days == undefined) {
          days = 1;
        }
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return (
          date.getFullYear() +
          "-" +
          getFormatDate(month) +
          "-" +
          getFormatDate(day)
        );
      }
      let num = datedifference(this.startDate, this.endDate) + 1;
      let list = [];
      for (let i = 0; i <= num; i++) {
        list.push({
          date: addDate(this.startDate, i),
          desc: (() => {
            if (i == 0) {
              return "插管日";
            } else if (i == num) {
              return "拔管日";
            } else if (addDate(this.startDate, i) == this.today) {
              return "今天";
            } else {
              return `第${i + 1}天`;
            }
          })()
        });
      }
      return list;
    },
    swiperBody() {
      return this.$refs.swiperBody.swiper;
    }
  },
  methods: {
    daybg(date) {
      let today = Number(this.today.split("-").join(""));
      let _date = Number(date.split("-").join(""));
      if (_date < today) {
        return "past";
      } else if (_date == today) {
        return "today";
      } else {
        return "next";
      }
    },
    initDay() {
      let index = this.timeLine.findIndex(
        item => item.date == moment().format("YYYY-MM-DD")
      );
      if (index > -1) {
        this.activeIndex = index;
      } else {
        this.activeIndex = this.timeLine.length - 1;
      }
      this.$nextTick(() => {
        this.swiperBody.slideTo(this.activeIndex);
      });

      model.selectedDate = this.timeLine[this.activeIndex];
      model.getRecordList();
    },
    toPrev() {
      if (this.activeIndex > 0) {
        this.swiperBody.slidePrev();
      }
    },
    toNext() {
      if (this.activeIndex < this.timeLine.length - 1) {
        this.swiperBody.slideNext();
      }
    },
    changeDate(index, swiper) {
      let mySwiper = this.swiperBody;
      let swiperWidth = mySwiper.container[0].clientWidth;
      let maxTranslate = mySwiper.maxTranslate();
      let maxWidth = -maxTranslate + swiperWidth / 2;
      let slide = swiper.slides[swiper.clickedIndex];
      let slideLeft = slide.offsetLeft;
      let slideWidth = slide.clientWidth;
      let slideCenter = slideLeft + slideWidth / 2;
      // 被点击slide的中心点
      mySwiper.setWrapperTransition(300);
      if (slideCenter < swiperWidth / 2) {
        mySwiper.setWrapperTranslate(0);
      } else if (slideCenter > maxWidth) {
        mySwiper.setWrapperTranslate(maxTranslate);
      } else {
        let nowTlanslate = slideCenter - swiperWidth / 2;
        mySwiper.setWrapperTranslate(-nowTlanslate);
      }
    }
  },
  mounted() {
    this.initDay();
  },
  watch: {
    block: {
      deep: true,
      handler() {
        this.initDay();
      }
    }
  },
  components: {}
};
</script>
