
<template>
<div class="html-box">

    <div v-if="obj.showLight">
      <!-- 图片显示 -->
      <span>
        <img
        :src="lightImg"
        :alt="obj.title"
        :class="obj.class"
        :style="obj.style"
        width="24"
        />
      </span>
      <span class="tip-title">{{obj.title}}</span>
    </div>

    <div v-if="obj.html"
          v-html="obj.html"
          class="html-main"
          :style="obj.style"
          :class="obj.class"></div>
  <!-- </div> -->
</div>
</template>

<script>
import vue from 'vue'
import uuid from 'node-uuid'

export default {
  name:"FormGroupHTML",
  props: {
    obj: Object,
    formObj: Object,
  },
  components: {

  },
  data() {
    return {
      lightImg: "",
    }
  },
  computed:{
    uui(){
      return uuid.v1()
    }
  },
  watch: {
  },
  mounted() {
  },
  created() {
    this.lightImg = require('./image/light.png')
  },
  methods: {
    getUUID(){
      let uuid_ = uuid.v1()
      // console.log(uuid_)
      return uuid_
    }
  },
}
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .group-html-box
    margin 10px 0 20px 0
    font-weight bold
  .group-sub-html-box
    font-size 15px
    text-indent 1.25em
    margin 10px -21px 15px -21px
    border 1px solid #f2f2f2
    background #f2f2f2
    height 20px
    border 1px solid #d7d7d7
    // border-top 1px solid #d7d7d7
    // border-bottom 1px solid #d7d7d7
  .group-html-dashed-box
    border-bottom 1px dashed #d7d7d7
    margin 10px 0

  .html-box
    line-height: 2em;

  .html-main
    line-height: 2em;
    text-indent: 2em;

  .tip-title
    vertical-align: top;
</style>
