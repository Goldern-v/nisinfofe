<template>
  <div>
    <table class="table" ref="table">
      <thead>
        <tr>
          <th>班次</th>
          <th v-for="(col, key) of keys" :key="key">
            {{ keys[key] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shift, index) in columns" :key="index">
          <td>{{ columnsKey[index] }}</td>
          <td v-for="(col, key) of keys" :key="key">
            <!-- <div
              v-html="shift[key]"
              contenteditable="true"
              style="outline:none;"
              @blur="e => change(e, index, key)"
            ></div> -->
            <div v-text="shift[key]" style="outline:none;"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table-two">
      <colgroup>
        <col width="180px" />
        <col width="190px" />
        <col width="190px" />
        <col width="190px" />
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th v-for="(col, key) of columnsKey" :key="key">
            {{ col }}班
          </th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(col, key) of twoKeys"  :key="key">
          <td>{{ col }}</td>
          <td v-for="(shift, index) in columns" :key="index">
            <div
              v-html="shift[key]"
              contenteditable="true"
              style="outline:none;"
              @blur="e => change(e, index, key)"
            ></div>
          </td>
        </tr>
        <tr>
          <td><input type="text" v-model="record.expand1"></td>
          <td v-for="(shift, index) in columns" :key="index">
            <div
              v-html="shift['orders7']"
              contenteditable="true"
              style="outline:none;"
              @blur="e => change(e, index, 'orders7')"
            ></div>
          </td>
        </tr>
        <tr>
          <td><input type="text" v-model="record.expand2"></td>
          <td v-for="(shift, index) in columns" :key="index">
            <div
              v-html="shift['orders8']"
              contenteditable="true"
              style="outline:none;"
              @blur="e => change(e, index, 'orders8')"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="stylus" scoped>
  .table
    width 100%
    border-collapse collapse

    th, td
      text-align center
      height 30px
      border 1px solid #444444
      font-size 12px
      vertical-align middle
      line-height 14px
      box-sizing border-box


    th
      padding 8px 4px
      background #f4f2f5
      font-weight 700
      text-align center
      word-break keep-all
      white-space nowrap

    tbody tr
      td:nth-child(1)
        font-size 16px

      &:hover
        background #e6e6e6

      &.selected
        background #FFF8B1
      input
        resize none
        outline none
        border none
        width 95%
        font-size 16px
        background transparentify
    .cell
      padding 6px 4px

    label
      display flex
      align-items center
      // margin-top -4px
      // margin-bottom -4px
      height 100%
      width 100%

    >>>textarea, >>>pre
      display block
      // padding 8px 4px
      padding 4px;
      margin 0
      width 100%
      min-height 15px
      box-sizing border-box
      border none !important
      outline none !important
      resize none
      background none !important
      color black !important
      overflow-y hidden
      text-align inherit
      cursor auto !important

      &:disabled
        color black
        background none
.table-two
    width 100%
    border-collapse collapse

    th, td
      text-align center
      height 30px
      border 1px solid #444444
      font-size 12px
      vertical-align middle
      line-height 14px
      box-sizing border-box


    th
      padding 8px 4px
      background #f4f2f5
      font-weight 700
      text-align center
      word-break keep-all
      white-space nowrap

    tbody tr
      td:nth-child(1)
        font-size 14px

      &:hover
        background #e6e6e6

      &.selected
        background #FFF8B1
      input
        resize none
        outline none
        border none
        width 95%
        font-size 14px
        background transparent
        text-align center
    .cell
      padding 6px 4px

    label
      display flex
      align-items center
      // margin-top -4px
      // margin-bottom -4px
      height 100%
      width 100%

    >>>textarea, >>>pre
      display block
      // padding 8px 4px
      padding 4px;
      margin 0
      width 100%
      min-height 15px
      box-sizing border-box
      border none !important
      outline none !important
      resize none
      background none !important
      color black !important
      overflow-y hidden
      text-align inherit
      cursor auto !important

      &:disabled
        color black
        background none
.fixed-th
  position fixed
  top 102px
  width 1040px
  z-index 1
</style>
<script>
export default {
  props: {
    columns: {
      type: Array,
      value: []
    },
    record: {
      type: Object,
      value: []
    }
  },
  data() {
    return {
      columnsKey: ["A", "P", "N"],
      keys: {
        original: "原有",
        outHospital: "出院",
        transOut: "转出",
        death: "死亡",
        inHospital: "入科",
        transIn: "转入",
        patientNow: "现有",
        operation: "手术",
        childbirth: "分娩",
        family: "军属",
        patientBw: "病危",
        patientBz: "病重",
        nurseClass0: "特护",
        nurseClass1: "一级护理",
        armyPatient: "部队患者人数"
      },
      twoKeys: {
        orders1 : "未完成输液患者",
        orders2 : "翻身防褥疮护理",
        orders3 : "动静脉置管",
        orders4 : "鼻饲护理",
        orders5 : "吸氧护理",
        orders6 : "留置引流管护理",
      }
    };
  },
  methods: {
    change(e, index, key) {
      let value = e.currentTarget.innerText;
      this.$emit("changeShiftWithWardcodes", index, key, value);
    }
  },
  created() {},
  components: {}
};
</script>
