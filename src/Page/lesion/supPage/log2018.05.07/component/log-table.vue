<template>
  <div>
    <table>
      <tr>
        <td colspan="2" style="padding: 8px 15px">
          <span class="info-item">总床位({{data.床位日志.bedTotal}})</span> 
          <span class="info-item active">病人总数({{data.床位日志.patTotal}})</span>  
          <span class="info-item">空床({{data.床位日志.bedEmpty}})</span>  
          <span class="info-item to-wait" @click="toWait">等床({{data.床位日志.patientWait}})</span>
        </td>
      </tr>
      <tr>
        <td class="key">新人({{data.床位日志.patientNew}})</td>
        <td class="value">
          <log-item v-for="item in data.新入病人" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
      <tr>
        <td class="key">转床({{data.床位日志.patientExchange}})</td>
        <td class="value">
          <log-item-inout v-for="item in data.转床病人" :key="item.bedLabelOld" :data="item"></log-item-inout>
        </td>
      </tr>
      <tr>
        <td class="key">出院({{data.床位日志.patientOut}})</td>
        <td class="value">
          <log-item v-for="item in data.出院病人" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
      <tr>
        <td class="key">病危({{data.床位日志.patientBw}})</td>
        <td class="value">
          <log-item v-for="item in data.病危病人" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
      <tr>
        <td class="key">病重({{data.床位日志.patientBz}})</td>
        <td class="value">
          <log-item v-for="item in data.病重病人" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
      <tr>
        <td class="key">手术({{data.床位日志.patientOpration}})</td>
        <td class="value">
          <log-item v-for="item in data.手术病人" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
      <tr>
        <td class="key">转出({{data.床位日志.patientTransferOut}})</td>
        <td class="value">
          <log-item v-for="item in data.转出病人" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
      <tr>
        <td class="key">转入({{data.床位日志.patientTransferIn}})</td>
        <td class="value">
          <log-item v-for="item in data.转入病人" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
      <tr>
        <td class="key">明日手术({{data.床位日志.patientOprationTommorow}})</td>
        <td class="value">
          <log-item v-for="item in data.明日手术" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
      <tr>
        <td class="key">明日出院({{data.床位日志.patientOutTommorow}})</td>
        <td class="value">
          <log-item v-for="item in data.明日出院" :key="item.bedLabel" :data="item"></log-item>
        </td>
      </tr>
    </table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  table,table tr th, table tr td {
    border:1px solid #A09D9D; 
  }
  table { 
    width 100%; 
    background #fff
    text-align: left; 
    border-collapse: collapse;
    border:1px solid #A09D9D;  
    } 
  td {
    height 26px
    vertical-align middle
    font-size: 13px;
    line-height 18px
    word-break break-all
    overflow hidden
  }
.key
  width 108px;
  padding 10px 15px
.value 
  height 50px  
  padding 10px 0 0 15px
.info-item
  margin-right 10px
  padding-bottom 2px
  &.active
    color #4BB08D
    border-bottom 2px solid #4BB08D  
.to-wait
  cursor pointer
  &:hover
    color: #4BB08D    
</style>
<script>
import logItem from './log-item'
import logItemInout from './log-item-inout'
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    methods: {
      toWait() {
        this.$router.push('/wait-bed')
      }
    },
    components: {
      logItem, logItemInout
    }
  }
</script>
