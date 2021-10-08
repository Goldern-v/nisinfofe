<template>
  <table class="head-table">
    <colgroup>
      <!-- <col width="160px">
      <col width="160px">
      <col width="160px">
      <col width="80px">
      <col width="80px">
      <col width="80px">
      <col width="160px">
      <col width="160px"> -->
    </colgroup>
    <thead>
      <tr>
        <th rowspan="3">
          原有人数
          <br>（0时）
        </th>
        <th rowspan="3">入院人数</th>
        <th rowspan="3">他科转入人数</th>
        <!-- <th colspan="3">出 院 人 数</th> -->
        <th rowspan="3">出院</th>
        <th rowspan="3">死亡</th>
        <th rowspan="3">转往他科</th>
        <th rowspan="3">
          现有人数
          <br>（0时）
        </th>
      </tr>
      <!-- <tr>
        <th rowspan="2">计</th>
        <th colspan="2">死亡</th>
      </tr>
      <tr>
        <th>计</th>
        <th>24小时</th>
      </tr> -->
    </thead>
    <tbody>
      <!-- <tr>
        <td>（1）</td>
        <td>（2）</td>
        <td>（3）</td>
        <td>（4）</td>
        <td>（5）</td>
        <td>（6）</td>
        <td>（7）</td>
        <td>（8）</td>
      </tr> -->
      <tr>
        <td>
          {{data.bedOrigin}}
          <span v-if="LogBabyNum">/{{LogBabyNum.bedOrigin}}</span>
        </td>
        <td>
          {{data.patientNew}}
          <span v-if="LogBabyNum">/{{LogBabyNum.patientNew}}</span>
        </td>
        <td>
          {{data.patientTransferIn}}
          <span v-if="LogBabyNum">/{{LogBabyNum.patientTransferIn}}</span>
        </td>
        <td>
          {{data.patientOut}}
          <span v-if="LogBabyNum">/{{LogBabyNum.patientOut}}</span>
        </td>
        <!-- <td>
          {{data.patientDead}}
          <span v-if="LogBabyNum">/{{LogBabyNum.patientDead}}</span>
        </td> -->
        <td>
          {{data.patientDead}}
          <span v-if="LogBabyNum">/{{LogBabyNum.patientDead}}</span>
        </td>
        <td>
          {{data.patientTransferOut}}
          <span v-if="LogBabyNum">/{{LogBabyNum.patientTransferOut}}</span>
        </td>
        <td>
          {{data.bedNow}}
          <span v-if="LogBabyNum">/{{LogBabyNum.bedNow}}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: Object,
    LogBabyNum: Object
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="stylus">
</style>
