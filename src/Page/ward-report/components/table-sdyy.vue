<template>
  <table class="in-table">
    <colgroup>
      <col width="45px" />
      <col width="40px" />
      <col width="60px" />
      <col width="60px" />
      <col width="125px" />
      <col width="90px" />

      <col width="50px"/>
      <col width="40px"/>
      <col width="60px"/>
      <col width="60px"/>
      <col width="120px"/>
      <col width="30px"/>
      <col width="90px"/>
    </colgroup>
    <thead>
      <tr>
        <th colspan="6">入院（转入）病人一览表</th>
        <th colspan="7">出院（转出）病人一览表</th>
      </tr>
      <tr>
        <th>入院时间</th>
        <th>床号</th>
        <th>姓名</th>
        <th>住院号</th>
        <th>诊断</th>
        <th>何科转入</th>

        <th>出院时间</th>
        <th>床号</th>
        <th>姓名</th>
        <th>住院号</th>
        <th>诊断</th>
        <th>死亡</th>
        <th>转往何科</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) of data" :key="item.name">
        <td>{{ item.admissionDateTime }}</td>
        <td>{{ item.bedLabel }}</td>
        <td
          @click="item.patientId && toPatientHome(item.patientId, item.visitId)"
          style="cursor: pointer"
        >{{ item.name }}
        </td>
        <td>{{ item.patientId }}</td>
        <td>{{ item.diagnosis }}</td>
        <td>{{ item.transferFrom }}</td>

        <td>{{ dataOut[index].logDateTime }}</td>
        <td>{{ dataOut[index].bedLabel }}</td>
        <td
          @click="dataOut[index].patientId && toPatientHome(dataOut[index].patientId, dataOut[index].visitId)"
          style="cursor: pointer"
        >{{ dataOut[index].name }}
        </td>
        <td>{{ dataOut[index].patientId }}</td>
        <td>{{ dataOut[index].diagnosis }}</td>
        <td>{{ dataOut[index].deadFlag === '1' ? '√' : ''}}</td>
        <td>{{ dataOut[index].transferTo }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
export default {
  props: {
    data: Array,
    index: Number,
    dataOut: Array,
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
