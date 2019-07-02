<template>
  <div>
    <BoxScroll icon="📒" title="护士排班" ref="bodyCon">
      <vue-seamless-scroll class="scroll-con" :data="data">
        <div ref="scrollCon" class="123456">
          <div class="mid-bottom-left-contain" v-for="(item, key) in data" :key="key">
            <div class="item-con" flex="">
              <div class="key-con" flex="main:center cross:center">
                {{key}}
              </div>
              <div class="value-con" flex-box="1">
                <span class="name" v-for="option in item" :key="option.userName">{{option.userName}}</span>
              </div>
            </div>
          </div>

        </div>
      </vue-seamless-scroll>
    </BoxScroll>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../style/wb.styl';

.mid-bottom-left-contain {
  padding: tovw(8) tovw(15);

  .item-con {
    // margin-bottom tovw(10)
  }

  .key-con {
    width: tovw(34);
    height: tovw(34);
    border-radius: 50%;
    background: #F7FAFA;
    border: 1px solid #CBD5DD;
    font-size: tovw(15);
    color: #333333;
    overflow: hidden;
    margin-right: tovw(17);
  }

  .value-con {
    width: 0;
    padding-top: tovw(6);
    overflow: hidden;
    box-sizing: border-box;

    .name {
      font-size: tovw(15);
      color: #333333;
      float: left;
      margin: 0 tovw(23) tovw(6) 0;
    }
  }
}

.scroll-con {
  overflow: hidden;
  height: 100%;
}
</style>

<script>
  import BoxScroll from "../../components/box-scroll.vue";
  export default {
    props: {
      data: ''
    },
    data() {
      return {
      
      };
    },
    methods: {
      // move() {
      //   let dh = this.$refs.scrollCon.offsetHeight;
      //   let bh = this.$refs.bodyCon.$el.offsetHeight;
      //   if (dh > bh) {
      //     this.classOption.moveSwitch = false;
      //   } else {
      //     this.classOption.moveSwitch = true;
      //   }
      // }
    },
    // watch: {
    //   data: {
    //     handler() {
    //       this.$nextTick(() => {
    //         this.move();
    //       });
    //     },
    //     deep: true
    //   }
    // },
    components: {
      BoxScroll
    }
  };
</script>
