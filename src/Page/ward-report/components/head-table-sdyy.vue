<template>
  <table class="head-table">
    <colgroup>
      <col
        v-for="(_, index) in cols"
        :key="'col' + index"
        :width="`${100 / cols}%`"
      />
    </colgroup>
    <thead>
      <tr v-for="(th, index) in tableHead" :key="'tr' + index">
        <td
          v-for="(td, tdIndex) in th"
          :key="'td' + tdIndex"
          :colspan="td.colspan || 1"
          :rowspan="td.rowspan || 1"
          v-html="td.name"
        >
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="(code, index) in tableCode" :key="code + index">
          {{ data[code] }}
          <span v-if="LogBabyNum">/{{ LogBabyNum.bedOrigin }}</span>
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
      tableHead: [
        [
          { name: '原有<br>人数', colspan: 1, rowspan: 2 },
          { name: '入', rowspan: 1, colspan: 4 },
          { name: '出', rowspan: 1, colspan: 5 },
          { name: '现有<br>人数', colspan: 1, rowspan: 2 },
          { name: '手术<br>人数', colspan: 1, rowspan: 2 },
          { name: '分娩<br>人数', colspan: 1, rowspan: 2 },
          { name: '病重', colspan: 1, rowspan: 2 },
          { name: '病危', colspan: 1, rowspan: 2 },
          { name: '特级<br>护理', colspan: 1, rowspan: 2 },
          { name: '一级<br>护理', colspan: 1, rowspan: 2 },
          { name: '二级<br>护理', colspan: 1, rowspan: 2 },
          { name: '三级<br>护理', colspan: 1, rowspan: 2 },
          { name: '陪人数', colspan: 1, rowspan: 2 },
        ],
        [
          { name: '新入' },
          { name: '他科<br>转入' },
          { name: '他区<br>转入' },
          { name: '合计' },
          { name: '出院' },
          { name: '转往<br>他科' },
          { name: '转往<br>他区' },
          { name: '死亡' },
          { name: '合计' },
        ]
      ],
      tableCode: [
        'bedOrigin',
        'patientNew',
        'patientTransferIn',
        'patientOtherTransIn',
        'patientInTotal',
        'patientOut',
        'patientTransferOut',
        'patientOtherTransOut',
        'patientDead',
        'patientOutTotal',
        'bedNow',
        'patientOperation',
        'patientDeliver',
        'patientSerious',
        'patientDanger',
        'patientSuper',
        'patientClass1',
        'patientClass2',
        'patientClass3',
        'patientAccompany'
      ]
    };
  },
  computed: {
    cols() {
      return this.tableHead[0].reduce((prev, curv) => prev + (curv.colspan || 1), 0)
    },
  }
};
</script>

<style lang="stylus">
</style>
