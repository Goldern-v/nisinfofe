<template>
  <div>
    <div class="execute-print"
         v-for="(data, index) in dataList"
         :key="index">
      <div class="logo">
        <img src="../images/南医三院骨研院骨科医院logo.png"
             alt=""
             class="logo">
      </div>
      <div class="title">
        <p>东莞市厚街医院</p>
        <p>医嘱执行单列表</p>
      </div>
      <div class="code-time">
        <p>护理单元：普外科护理单元</p>
        <p>打印时间：{{time}}</p>
      </div>
      <table v-for="(item, index) in data"
             :key="index">
        <tr class="head"
            :class="index==0?'':'hidden'">
          <td style="width: 7%">床号</td>
          <td style="width: 10%">姓名</td>
          <td style="width: 8%">执行</td>
          <td style="width: 15%">日期</td>
          <td style="width: 8%">时间点</td>
          <td style="width: 8%">长/临</td>
          <td style="width: 35%">医嘱内容</td>
          <td style="width: 12%">剂量</td>
          <td style="width: 8%">频次</td>
          <td style="width: 11%">途径</td>
          <td style="width: 11%">医生说明</td>
        </tr>
        <tr v-for="(value, key) in item"
            :key="key">
          <td class="bed-no">{{key==0?value.bedLabel: ''}}</td>
          <td class="name">{{key==0?value.name: ''}}</td>
          <td>{{key==0?value.executeFlag: ''}}</td>
          <td>{{key==0?value.executeDateTime.split(' ')[0]: ''}}</td>
          <td>{{key==0?value.zxsj: ''}}</td>
          <td>{{key==0?value.repeatIndicator: ''}}</td>
          <td style="text-align:left">{{value.drugName}}</td>
          <td>{{value.dosage}}{{value.dosageUnits}}</td>
          <td>{{key==0?value.frequency: ''}}</td>
          <td>{{key==0?value.administration: ''}}</td>
          <td>{{key==0?value.freqDetail: ''}}</td>
        </tr>
      </table>
      <div class="page-num">
        第 {{index + 1}} / {{dataList.length}} 页
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [],
      time: []
    }
  },
  created () {
    window.getData = this.getData
  },
  methods: {
    getData (data, time) {
      try {
        this.time = time;
        this.dataList = this.pageArr(data);
        console.log(this.dataList)
        // this.data = data;
      }
      catch (e) {
        console.log(e)
      }
    },
    pageArr (arr) {
      let result = [[]]
      let pagenum = 28
      for (let i = 0; i < arr.length; i++) {
        let lastPage = result[result.length - 1]
        let lastPageLength = this.getArrInArrLength(lastPage)
        if (lastPageLength + (arr[i].length + 1) < pagenum) {
          result[result.length - 1].push(arr[i])
        } else {
          result.push([arr[i]])
        }
      }
      console.log(result)
      return result
    },
    getArrInArrLength (arr) {
      let length = 0
      for (let i = 0; i < arr.length; i++) {
        length += (arr[i].length + 1)
      }
      return length
    },
  }
}
</script>
<style lang="stylus" scoped>
.hidden
  visibility hidden
  border none !important

.hidden td
  border none !important

.execute-print
  width 700px
  color #000
  position relative
  padding 30px 20px
  margin-bottom 20px

  .page-num
    color #000
    font-size 12px
    position absolute
    bottom 0
    left 0
    right 0
    text-align center

  .logo
    position absolute

    img
      width 190px
      height 40px

  .title
    margin-bottom 20px
    padding-top 20px

    p
      text-align center

      &:first-child
        margin-bottom 20px
        font-size 18px
        font-weight bold

    p:last-child
      font-size 15px

  .code-time
    margin-bottom 20px
    display flex
    justify-content space-between
    padding-bottom 10px
    border-bottom 2px solid #444

    p
      font-size 12px

      &:last-child
        padding-right 10px

  table
    width 100%
    border-collapse collapse
    font-size 12px
    color #000
    table-layout fixed

    td
      text-align center
      vertical-align middle
      border 1px solid #444
      padding 5px 2px
      line-height 20px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 12px

    .bed-no, .name
      vertical-align top

@media print
  .execute-print
    height 1000px
    padding 20px 10px !important
    margin 0 !important
    page-break-after always
</style>
