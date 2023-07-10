<template>
  <table class="in-table">
    <colgroup>
      <col width="50px" />
      <col width="40px" />
      <col width="60px" />
      <col width="60px" />
      <col width="120px" />
      <col width="90px" />
      <col />
    </colgroup>
    <thead>
      <tr>
        <th colspan="6">入院（转入）病人一览表</th>
      </tr>
      <tr>
        <th>入院时间</th>
        <th>床号</th>
        <th>姓名</th>
        <th>住院号</th>
        <th>诊断</th>
        <th>何科转入</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) of data" :key="item.name">
        <td>{{ item.logDateTime }}</td>
        <td>{{ item.bedLabel }}</td>
        <td
          @click="item.patientId && toPatientHome(item.patientId, item.visitId)"
          style="cursor: pointer"
        >{{ item.name }}
        </td>
        <td>{{ item.patientId }}</td>
        <td>{{ item.diagnosis }}</td>
        <td>{{ item.transferFrom }}</td>
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
