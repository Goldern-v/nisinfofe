<template>
  <div>
    <div class="contain" v-loading="pageLoading" :style="{minHeight: minHeight}">
      <!-- <div class="tool-con">
        <el-input class="input" size="small" placeholder="床号\姓名\ID号" icon="search" v-model="searchWord" :on-icon-click="search">
        </el-input>
      </div> -->
      <div class="tip-con" flex="cross:center">
        <span>今日已输液：</span>
        <div class="value">{{excuteToday.infusionTotal}}</div>
        <span>当前输液：</span>
        <div class="value">{{excuteToday.infusionNow}}</div>
      </div>
      <div class="list-con">
        <span @click="getDetail(item)" v-for="item in filterData" :key="item.bedNo" >
          <infuse-item :data="item"></infuse-item>
        </span>
          <null-bg v-show="filterData.length == 0" text="暂时没有输液数据～"></null-bg>
      </div>
    </div>
    <div class="right-con">
      <searchCon @search="search"></searchCon>
    </div>
    <detailsModal ref="detailsModal"></detailsModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  padding 18px 258px 18px 18px;
  position relative
  .tip-con
    position absolute
    top -40px
    left 230px
    z-index 10
    font-size 12px
    color #333
    .value
      margin-right 25px
      background #fff
      height 18px
      line-height 18px
      padding 0 4px
      border: 1px solid #CBD5DD;
      border-radius: 2px;
.right-con
  position fixed
  right 0
  bottom 0
  width 240px
  background #fff
  border-left: 1px solid #D4DADE;  
  z-index 2
  top 62px
</style>

<script>
  import infuseItem from './component/infuse-item'
  import nullBg from '../../../../components/null/null-bg.vue'
  import searchCon from './component/search-con/search-con.vue'
  import detailsModal from './component/modal/details-modal.vue'
  import {
    getExecute,
    detail
  } from '@/api/infuse'
  export default {
    data() {
      return {
        searchWord: '',
        data: {
          list: []
        },
        timer: '',
        pageLoading: true,
        excuteToday: {
          infusionTotal: '',
          infusionNow: ''
        },
      }
    },
    methods: {
      search(val) {
        this.searchWord = val
        
      },
      getData() {
        this.pageLoading = true
        if (this.wardCode) {
          getExecute(this.wardCode).then(res => {
            this.data.list = res.data.data.list
            this.excuteToday = res.data.data.excuteToday
            this.pageLoading = false
          })
        }
      },
      getDetail(data) {
        this.pageLoading = true
        let barCode = data.barCode
        detail(barCode).then(res => {
          this.$refs.detailsModal.open(res.data.data)
          this.pageLoading = false
        })
      }
    },
    watch: {
      wardCode() {
        this.getData()
      }
    },
    created() {
      this.getData()
      this.timer = setInterval(() => {
        this.getData()
      }, 1000 * 15)
    },
    computed: {
      wardCode() {
        return this.$store.state.lesion.deptCode
      },
      wih() {
        return this.$store.state.common.wih
      },
      minHeight() {
        return this.$store.state.common.wih - 98 + 'px'
      },
      filterData() {
        if(this.searchWord) {
          return this.data.list.filter((item) => {
            if (item.bedLabel.indexOf(this.searchWord) > -1 || item.patName.indexOf(this.searchWord) > -1) {
             return true
            }
          })
        } else {
          return this.data.list
        }
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    components: {
      infuseItem, nullBg, searchCon, detailsModal
    }
  }
</script>
