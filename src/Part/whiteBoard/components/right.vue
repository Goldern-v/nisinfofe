<template>
  <div flex="dir:top">
    <div style="height: 0" flex-box="1">
    <BoxScroll icon="⏰" title="输液提醒">
        <div class="item" flex="cross:center" v-for="item in message" :key="item.id">{{item.message}}</div>
    </BoxScroll>
    </div>
    <div class="h-20"></div>
    <div style="height: 0" flex-box="1">
    <BoxScroll icon="⏰" title="患者呼叫">
        <div class="item" flex="cross:center" v-for="item in call" :key="item.id">{{item.message}}</div>
    </BoxScroll>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../style/wb.styl'
.item
  height tovw(50)
  padding 0 tovw(10)
  border-bottom: 1px solid #EAEEF1;
  font-size: tovw(15);
  color: #333333
.scroll-con
  overflow hidden
  height 100%  
.h-20
  height tovw(20)  
</style>

<script>
import BoxScroll from "./box-scroll.vue";
import {getNotice} from "@/api/whiteBoard"
export default {
  data() {
    return {
      message: [],
      call: []
    };
  },
  methods: {
    getData() {
      if(this.deptCode) {
        getNotice(this.deptCode).then(res => {
          this.message = res.data.data.data.message
          this.call = res.data.data.data.call
        })
      }
    }
  },
    computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    }
  },
  created() {
    this.getData()
  },
   watch: {
    deptCode() {
      this.getData();
    }
  },
  components: {
    BoxScroll
  }
};
</script>
