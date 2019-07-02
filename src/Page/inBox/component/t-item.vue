<template lang="pug">
.th-con(flex="cross:stretch" :class="{isHead: isHead, isIimportant: data.type == 1}" @click="data.id && $router.push(`/mailDetails/${data.id}`)" :style="!data.id && {cursor: 'auto'}")
  .th-1(flex="main:center cross:center" @click.stop="") 
    el-checkbox(v-model="checked")
  .th-2(flex="main:center cross:center") 
    img(src="../img/未收藏.png" v-if="t2 == 0")
    img(src="../img/已收藏.png" v-else)
  .th-3 {{t3}}
  .th-4  {{t4}}
  .th-5(flex-box="1")  {{t5}}
  .th-6  {{t6}}
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.th-con {
  background: #fff;
  height: 37px;
  border-bottom: 1px solid #EAEEF1;
  cursor: pointer;

  &:hover {
    background: #f8f8f8;
  }

  &.isIimportant {
    font-weight: bold;
  }

  &.isHead {
    background: #F7FAFA;
    border-bottom: 1px solid #CBD5DD;
  }

  br(bw) {
    border-right: bw * 1px solid #EAEEF1;
  }

  .th-1 {
    width: 48px;
    br(1);
  }

  .th-2 {
    width: 55px;
    br(1);

    img {
      cursor: pointer;
    }
  }

  thpl(wid, bw) {
    padding-left: 15px;
    box-sizing: border-box;
    font-size: 13px;
    color: #687179;
    line-height: 37px;
    width: wid * 1px;
    br(bw);
  }

  .th-3 {
    thpl(77, 1);
  }

  .th-4 {
    thpl(121, 1);
  }

  .th-5 {
    thpl(0, 1);
  }

  .th-6 {
    thpl(234, 0);
  }
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  props: ['t1', 't2', 't3', 't4', 't5', 't6', 'isHead', 'data'],
  data () {
    return {
      checked: false
    };
  },
  computed: {
    inAllstate () {
      return this.inBox.inAllstate
    },
    ...mapState([
      'inBox'
    ])
  },
  methods: {
    ...mapMutations([
      'addSelectList',
      'delSelectList',
      'upSelectList',
      'addAllList',
      'selectListAll',
      'noSelectListAll',
    ])
  },
  created () {
    if (!this.isHead) {
      this.addAllList(this.data.id)
    }
  },
  watch: {
    checked () {
      if (this.isHead) {
        if (this.checked) {
          this.selectListAll()
        } else {
          this.noSelectListAll()
        }
      }
      else {
        if (this.checked) {
          this.addSelectList(this.data.id)
        } else {
          this.delSelectList(this.data.id)
        }
      }
    },
    inAllstate () {
      if (this.inAllstate) {
        this.checked = true
      } else {
        this.checked = false
      }
    }
  },
  components: {}
};
</script>
