<template>
	<div>
		<div style="width: 100%">
			<div class="date-header">
				<div class="icon-con">
					<i class="icon-riqi iconfont"></i>
				</div>
				<div class="text-con" @click="initDay">
					{{timeLine[timeLine.length - 4]}}
				</div>
			</div>
			<div class="date-right">
				<div class="prev-btn" @click="toPrev">
					<i class="icon-Artboard iconfont"></i>
				</div>
				<div class="next-btn" @click="toNext">
					<i class="icon-ArtboardCopy iconfont"></i>
				</div>
				<swiper :options="swiperOption" class="swiper-body" ref="swiperBody">
					<swiper-slide :class="{active: index == activeIndex}" :key="item" v-for="(item, index) in timeLine">{{item}}</swiper-slide>
				</swiper>
			</div>
		</div>
		<datePart :time="timeLine[activeIndex]" v-if="activeIndex !== ''"></datePart>
	</div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.swiper-container
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-left: 0px
  border-right: 0px
  height 46px
.swiper-slide 
  width 12.5%
  margin 0
  border-left: 1px solid #EAEEF1;
  box-sizing border-box
  font-size: 13px;
  color: #687179;
  text-align center
  line-height 46px
  cursor pointer
  &.active
    background: #FFFFFF;
    border-top 4px solid #4BB08D;
.date-header
  width 178px
  float left
  background: #FFFFFF;
  border 1px solid #CBD5DD;
  border-right  0
  height 46px
  .icon-con
    width 46px
    text-align center
    line-height 46px
    border-right: 1px solid #EAEEF1;
    float left
    i 
      color #687179;
  .text-con
    font-size: 13px;
    color: #687179;
    text-align center
    line-height 46px      
    margin-left 46px
    cursor pointer
.date-right
  margin-left 178px
.swiper-body
  margin 0 30px  
.prev-btn, .next-btn   
  text-align center
  line-height 46px  
  cursor pointer
  i 
    color #4BB08D
    font-size .4rem  
.prev-btn
  float left
  width 30px
  border: 1px solid #EAEEF1;
  border-top: 1px solid #CBD5DD;
  border-bottom: 1px solid #CBD5DD;
  border-right 0
  background #fff
  height 46px
.next-btn    
  float right
  width 30px
  border-top: 1px solid #CBD5DD;
  border-bottom: 1px solid #CBD5DD;
  border-right: 1px solid #CBD5DD;
  border-left 0
  background #fff
  height 46px
  border-left: 1px solid #EAEEF1;
</style>

<script>
	import datePart from './datePart'
	export default {
		data() {
			return {
				activeIndex: '',
				swiperOption: {
					pagination: '.swiper-pagination',
					slidesPerView: 8,
					paginationClickable: true,
					freeMode: true,
					onTap: (swiper) => {
						if (swiper.clickedIndex > -1) {
							this.activeIndex = swiper.clickedIndex
							this.swiperBody.slideTo(this.activeIndex)
							this.changeDate(swiper.clickedIndex, swiper)
						}
					}
				}
			}
		},
		computed: {
			time() {
				return new Date(this.$route.query.admissionDate).Format('yyyy-MM-dd')
			},
			timeLine() {
				function datedifference(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
					var dateSpan,
						tempDate,
						iDays;
					sDate1 = Date.parse(sDate1);
					sDate2 = Date.parse(sDate2);
					dateSpan = sDate2 - sDate1;
					dateSpan = Math.abs(dateSpan);
					iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
					return iDays
				};
				function getFormatDate(arg) {
					if (arg == undefined || arg == '') {
						return '';
					}
					var re = arg + '';
					if (re.length < 2) {
						re = '0' + re;
					}
					return re;
				}
				function addDate(date, days) {
					if (days == undefined || days == '') {
						days = 1;
					}
					var date = new Date(date);
					date.setDate(date.getDate() + days);
					var month = date.getMonth() + 1;
					var day = date.getDate();
					return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
				}
				let num = datedifference(this.time, addDate(new Date().Format('yyyy-MM-dd'), 3))
				let list = []
				for (let i = 0; i <= num; i++) {
					list.push(addDate(this.time, i))
				}
				return list.slice(list.length - 31, list.length)
			},
			swiperBody() {
				return this.$refs.swiperBody.swiper
			}
		},
		methods: {
			initDay() {
				this.activeIndex = this.timeLine.length - 4
				this.swiperBody.slideTo(this.activeIndex)
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
				let mySwiper = this.swiperBody
				let swiperWidth = mySwiper.container[0].clientWidth
				let maxTranslate = mySwiper.maxTranslate();
				let maxWidth = -maxTranslate + swiperWidth / 2
				let slide = swiper.slides[swiper.clickedIndex]
				let slideLeft = slide.offsetLeft
				let slideWidth = slide.clientWidth
				let slideCenter = slideLeft + slideWidth / 2
				// 被点击slide的中心点
				mySwiper.setWrapperTransition(300)
				if (slideCenter < swiperWidth / 2) {
					mySwiper.setWrapperTranslate(0)
				} else if (slideCenter > maxWidth) {
					mySwiper.setWrapperTranslate(maxTranslate)
				} else {
					let nowTlanslate = slideCenter - swiperWidth / 2
					mySwiper.setWrapperTranslate(-nowTlanslate)
				}
			}
		},
		mounted() {
			this.initDay()
		},
		components: {
			datePart
		}
	}
</script>
