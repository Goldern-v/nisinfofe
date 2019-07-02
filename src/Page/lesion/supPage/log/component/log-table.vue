<template>
<div class="log-table">
  <ul class="log-header" ref="logHeader">
    <li>新入<span>{{data.床位日志.patientNew}}</span></li>
    <li>转床<span>{{data.床位日志.patientExchange}}</span></li>
    <li>出院<span>{{data.床位日志.patientOut}}</span></li>
    <li>病危<span>{{data.床位日志.patientBw}}</span></li>
    <li>病重<span>{{data.床位日志.patientBz}}</span></li>
    <li>手术<span>{{data.床位日志.patientOpration}}</span></li>
    <li>转出<span>{{data.床位日志.patientTransferOut}}</span></li>
    <li>转入<span>{{data.床位日志.patientTransferIn}}</span></li>
    <li>明日手术<span>{{data.床位日志.patientOprationTommorow}}</span></li>
    <li>预出院<span>{{data.床位日志.patientOutTommorow}}</span></li>
  </ul>
  <div class="scroll-con" :style="{height: (wih - 110) + 'px'}" ref="scrollCon">
  <ul class="log-content">
    <li>
      <log-item v-for="item in data.新入病人" :key="item.bedLabel" :data="item"></log-item>
    </li>
    <li>
      <log-item-inout v-for="item in data.转床病人" :key="item.bedLabelOld" :data="item"></log-item-inout>
    </li>
    <li>
      <log-item v-for="item in data.出院病人" :key="item.bedLabel" :data="item"></log-item>
    </li>
    <li>
      <log-item v-for="item in data.病危病人" :key="item.bedLabel" :data="item"></log-item>
    </li>
    <li>
      <log-item v-for="item in data.病重病人" :key="item.bedLabel" :data="item"></log-item>
    </li>
    <li>
      <log-item v-for="item in data.手术病人" :key="item.bedLabel" :data="item"></log-item>
    </li>
    <li>
      <log-item v-for="item in data.转出病人" :key="item.bedLabel" :data="item"></log-item>
    </li>
    <li>
      <log-item v-for="item in data.转入病人" :key="item.bedLabel" :data="item"></log-item>
    </li>
    <li>
      <log-item v-for="item in data.明日手术" :key="item.bedLabel" :data="item"></log-item>
    </li>
    <li>
      <log-item v-for="item in data.预出院" :key="item.bedLabel" :data="item"></log-item>
    </li>
  </ul>
  </div>
</div>
</template>
<style lang="stylus" scoped>
.log-table
  margin-left 201px
  height calc(100vh - 62px)
  position relative
.log-header
  width 100%
  display table
  box-sizing border-box
  li
    display table-cell
    background #f7fafa
    padding 0 8px
    width 10%
    height 40px
    line-height 40px
    font-size 13px
    color #6F6F6F
    border-right 1px solid #E0E4E7
    border-bottom 1px solid #E0E4E7
    &:last-child 
      border-right 0
    span 
      float right 
.scroll-con
  overflow auto   
  position relative
.log-content 
  width 100%
  min-height calc(100vh - 110px)
  display table
  poa
  li
    display table-cell
    width 10%
    border-right 1px solid #E0E4E7
    padding 0 8px 20px
    &:last-child 
      border-right 0
</style>
<script>
import logItem from './log-item'
import logItemInout from './log-item-inout'
import commomMixin from '../../../../../common//mixin/common.mixin'
  export default {
    mixins: [commomMixin],
    props: {
      data: Object
    },
    components: {
      logItem, 
      logItemInout
    },
    watch: {
      data() {
        this.$nextTick(() => {
              let el = this.$refs.scrollCon
              if(el.scrollHeight > el.clientHeight) {
                // 如果有滚动条
                this.$refs.logHeader.style.paddingRight = '7px'
              } else {
                this.$refs.logHeader.style.paddingRight = '0px'
              }
            })
      }
    }
  }
</script>
