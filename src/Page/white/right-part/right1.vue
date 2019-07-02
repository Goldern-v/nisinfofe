<template>
  <div>
    <boxBase title="病区统计" :icon="require('../images/病区统计.png')">
      <div class="body-con"
           v-loading="pageLoading"
           slot="body-con">
        <slider v-for="item in list" :data="item" :key="item.name"></slider>
      </div>
    </boxBase>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  margin 12px 10px 12px 20px
  min-height 220px
</style>
<script>
import boxBase from '../base/box-base.vue'
import slider from './slider/slider.vue'
import { getNewPatList } from '../api'
import common from '@/common/mixin/common.mixin.js'
import bus from 'vue-happy-bus'
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      list: []
    }
  },
  created() {
    this.bus.$on('indexGetAllData', this.getData)
  },
  methods: {
    getData() {
      this.pageLoading = true
      getNewPatList(this.deptCode).then(res => {
        this.list = res.data.data
        this.pageLoading = false
      })
    }
  },
  components: {
    boxBase, slider
  }
}
</script>
