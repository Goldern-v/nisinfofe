<template>
  <div class="diagnosis-box" @click="openselectDiagnosis(data)" v-touch-ripple>
    <div class="title">
      <span v-html="searchWord(data.name)"></span>
      <span style="color: #999" v-if="data.executing">已添加</span>
    </div>
    <div class="aside">{{data.definition}}</div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.diagnosis-box
  // margin-bottom 20px
  padding 10px 0
  overflow hidden
  max-width 820px
  cursor pointer
  &:hover
    background #fafafa
.title
  font-size: 13px;
  color: #0000CC;
.aside
  font-size: 12px;
  color: #333333;
  margin-top 4px;
  white-space nowrap
  width 100%
  overflow hidden
  text-overflow ellipsis
</style>
<script>
export default {
  inject: ["openSlideCon","openSlideContant"],
  props: {
    data: Object,
    word: String
  },
  data() {
    return {
      msg: "hello vue"
    };
  },
  methods: {
    searchWord(val) {
      return val.replace(
        this.word,
        `<span style="color:#E62C2C">${this.word}</span>`
      );
    },
    openselectDiagnosis(item) {
      // if(this.HOSPITAL_ID=='guizhou'||this.HOSPITAL_ID=='huadu'){
        this.openSlideContant({
          id: item.executingId,
          code: item.code,
          name: item.name,
          definition: item.definition
        });
      // }
      this.openSlideCon({
        id: item.executingId,
        code: item.code,
        name: item.name,
        definition: item.definition
      });
      // window.openselectDiagnosis(item);
    }
  },
  components: {}
};
</script>
