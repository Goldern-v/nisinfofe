<template>
  <table class="out-table">
    <colgroup>
      <col width="30px"/>
      <col width="150px"/>
      <col width="60px"/>
      <col width="110px"/>
      <col/>
    </colgroup>
    <thead>
      <tr>
        <th colspan="5">出院（转出）病人一览表</th>
      </tr>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>床号</th>
        <th>死亡（√）</th>
        <th>转往何科</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) of data" :key="item.name">
        <td>{{index + i}}</td>
        <td @click="item.patientId && toPatientHome(item.patientId, item.visitId)" v-if="HOSPITAL_ID !== 'xiegang'" style="cursor: pointer">{{item.name}}</td>
        <td @click="item.patientId && toPatientHome(item.patientId, item.visitId)" v-else style="cursor: pointer">{{item.name}}<span v-if="item.patientId">/</span>{{item.patientId}}</td>
        <td>{{item.bedLabel}}</td>
        <td>{{item.deadFlag === '1' ? '√' : ''}}</td>
        <td>{{item.transferTo}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import common from '@/common/mixin/common.mixin.js'
  export default {
    props: {
      data: Array,
      index: Number,
    },
    mixins: [common],
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .out-table {
    height: 100%;
  }
</style>
