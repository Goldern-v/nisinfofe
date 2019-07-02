<template>
<div class="label-print">
  <div class="page" v-for="(item,index) in data" :key="index">
    <div class="page-content">
      <table>
        <tr>
          <td colspan="3">
            <p class="name">
              <span>{{item[0].bedLabel}}</span> 
              <span>{{item[0].name}}</span>
            </p>
          </td>
          <td rowspan="2">
            <qriously class="qr-code" :value="item[0].barCode" :size="87"/>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="text-left">
            <p>{{item[0].executeDateTime}} {{item[0].frequency}} {{item[0].administration}}</p>
          </td>
        </tr>
        <tr>
          <td colspan="3">药名</td>
          <td>剂量</td>
        </tr>
        <tr class="drug-name">
          <td colspan="3" class="text-left">
            <p v-for="option in item" :key="option.drugName">{{option.drugName}}</p>
          </td>
          <td><p v-for="option in item" :key="option.dosage">{{option.dosage + option.dosageUnits}}</p></td>
        </tr>
        <tr>
          <td>配液者</td>
          <td width="100"></td>
          <td>时间</td>
          <td>{{item[0].zxsj}}</td>
        </tr>
        <tr>
          <td>校对者</td>
          <td width="100"></td>
          <td>备注</td>
          <td>{{item[0].orderNo}}</td>
        </tr>
      </table>
      <p>{{item[0].inpNo}} 组序 {{item[0].xh}}</p>
    </div>
    <div class="page-break"></div>
  </div>
</div>
  
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    console.log(this.getData)
    window.getData = this.getData;
  },
  methods: {
    getData(data) {
      try {
        this.data = data;
      } catch (e) {
        console.log("参数错误");
      }
    }
  },
  components: {}
};
</script>
<style lang="stylus" scoped>
.label-print
  width 298px
  overflow hidden
  .page-content
    padding 10px 0
    position relative
    height 195px
    > p 
      padding-top 3px
      text-align center
      font-size 12px
      position absolute
      top 190px
      left 0
      width 100%
    table 
      border 2px solid #000
      width 532px
      height 364px
      margin 0 auto
      margin -92px 0 0 -118px
      border-collapse collapse
      font-size 20px
      transform scale(0.5,0.5)
      color #000
      overflow hidden
      tr, td, th 
        text-align center
        vertical-align middle
        border 1px solid #000
        height 24px
        line-height 24px
        overflow hidden
        &.drug-name 
          height 180px
          overflow hidden
          td
            vertical-align top
            padding 0 5px
        &.text-left 
          text-align left
          padding 5px
      .name 
        display flex
        span:first-child 
          width 25px
          text-align center
        span:last-child 
          flex 1
          text-align center
          text-indent -25px
      .qr-code 
        display flex
        align-items center
        justify-content center
        padding 4px 0
@media print
  .page-content 
    height 100%
    padding 0
  .page-break
    page-break-after always
</style>
