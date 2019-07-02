<template>
  <div class="contain">
    <div class="list-item" v-for="item in showData" :key="item.name">
      <div class="item-text" flex="main:justify">
        <span>{{item.name}}（{{item.num}}）</span>
        <span>{{item.percent || 0}}%</span>
      </div>
      <div class="item-chart">
        <div class="num-con" :style="{width: item.percent + '%'}"></div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../style/wb.styl';
.contain
  padding tovw(15) tovw(22)   
.list-item
  margin-bottom tovw(17)
.item-text
  font-size: tovw(15);
  color: #333333;
  margin-bottom tovw(12)
.item-chart 
  background: #E1E5E9;
  box-shadow: inset 0 1px 1px 0 rgba(163,163,163,0.50);
  border-radius: tovw(58);
  height tovw(13)
  position relative
  .num-con
    position absolute
    left 0
    top 0
    bottom 0
    background: #14C4A5;
    border-radius: tovw(58)
    transition all .3s
</style>

<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        value: 20
      };
    },
    created() {
    },
    computed: {
      showData() {
        try {
          let obj = []
          let total = this.data.total
          obj.push({
            name: '病人总数',
            num: total,
            percent: 100
          })
          obj.push({
            name: '特级护理',
            num: this.data.classSpecial,
            percent: Math.round(this.data.classSpecial/total * 100)
          })
          obj.push({
            name: '一级护理',
            num: this.data.classOne,
            percent: Math.round(this.data.classOne/total * 100)
          })
          obj.push({
            name: '二级护理',
            num: this.data.classTwo,
            percent: Math.round(this.data.classTwo/total * 100)
          })
          obj.push({
            name: '三级护理',
            num: this.data.classThree,
            percent: Math.round(this.data.classThree/total * 100)
          })
          return obj
        } catch (e) {
          return []
        }
      }
    },
    components: {}
  };
</script>
