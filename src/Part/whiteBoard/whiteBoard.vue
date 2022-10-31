<template>
  <div class="white-board-con">
    <WBHeader></WBHeader>
    <div class="contain" flex="">
      <div class="swiper-con">
        <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
          <!-- slides -->
          <swiper-slide>
            <page1></page1>
          </swiper-slide>
          <swiper-slide>
            <page2></page2>
          </swiper-slide>
          <swiper-slide>
            <page3></page3>
          </swiper-slide>
          <!-- Optional controls -->
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
          <!-- <div class="swiper-button-next" slot="button-next"></div> -->
          <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>
      </div>
      <div class="right-con" flex="dir:top">
          <right style="height: 100%"></right>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@import './style/wb.styl'
.white-board-con {
  .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    height: 100%;
  }
  .swiper-wrapper {
    height 100% !important
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import './style/wb.styl'
.white-board-con {
  .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    height: 100%;
  }
}
.contain
  height 100%
  position absolute
  width 100%
  height 100%
  left 0
  top 0
  box-sizing border-box
  padding tovw(90) tovw(20) tovw(20) 
.swiper-con
  width 78.9%
.right-con
  width 21.2%   
</style>

<script>
  import WBHeader from "./components/WB-header";
  import page1 from "./page1/page1";
  import right from "./components/right.vue"
  import page2 from './page2/page2.vue'
  import page3 from './page3/page3.vue'
  export default {
    data() {
      return {
        notNextTick: true,
        swiperOption: {
          // swiper options 所有的配置同swiper官方api配置
          autoplay: 60 * 1000,
          // direction: 'horizontal',
          initialSlide: 0,
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          // pagination: ".swiper-pagination",
          paginationClickable: true,
          // prevButton: '.swiper-button-prev',
          // nextButton: '.swiper-button-next',
          // scrollbar: '.swiper-scrollbar',
          observeParents: true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper) {
            // console.log(swiper);
          }
          // more Swiper configs and callbacks...
          // ...
        }
      };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    components: {
      page1,
      WBHeader,
      right,
      page2,
      page3,
    }
  };
</script>
