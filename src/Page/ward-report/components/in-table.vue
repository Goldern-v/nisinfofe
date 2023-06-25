<template>
  <table class="in-table">
    <colgroup>
      <col width="30px" />
      <col width="150px" />
      <col width="60px" />
      <col width="110px" />
      <col />
    </colgroup>
    <thead>
      <tr>
        <th colspan="5">入院（转入）病人一览表</th>
      </tr>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>床号</th>
        <th>急诊入院（√）</th>
        <th>何科转入</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) of data" :key="item.name">
        <td>{{index + i}}</td>
        <td
          v-if="HOSPITAL_ID !== 'xiegang'"
          @click="item.patientId && toPatientHome(item.patientId, item.visitId)"
          style="cursor: pointer"
        >{{item.name}}</td>
        <td
          v-else 
          @click="item.patientId && toPatientHome(item.patientId, item.visitId)" 
          style="cursor: pointer">{{item.name}}
          <span v-if="item.patientId">/</span>
          {{item.patientId}}
        </td>
        <td>{{item.bedLabel}}</td>
        <td>{{item.isEmergency === '1' ? '√' : ''}}</td>
        <td>{{item.transferFrom}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
export default {
  props: {
    data: Array,
    index: Number
  },
  mixins: [common],
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.in-table {
  height: 100%;
}
</style>
