<template>
  <table class="table" ref="table">
    <thead>
      <tr>
        <th @click="log()">病区动态</th>
        <template v-if="['beihairenyi'].includes(HOSPITAL_ID)">
          <th v-for="(col, key) of keys" :key="key">{{ keys[key] }}</th>
        </template>
        <template v-else-if="['huadu'].includes(HOSPITAL_ID)">
          <th v-for="(col, key) of keysHuaDu" :key="key">
            {{ keysHuaDu[key] }}
          </th>
        </template>
        <template v-else-if="['ytll'].includes(HOSPITAL_ID)">
          <th v-for="(col, key) of keysYTLL" :key="key">{{ keysYTLL[key] }}</th>
        </template>
        <template v-else>
          <th v-for="(col, key) of keysZHZXY" :key="key">
            {{ keysZHZXY[key] }}
          </th>
        </template>
      </tr>
      <tr v-for="(shift, index) in columns" :key="index">
        <td v-if="['beihairenyi'].includes(HOSPITAL_ID)">
          {{ columnsKey[index] }}
        </td>
        <td v-else-if="HOSPITAL_ID == 'nfyksdyy'">
          {{ columnsKeyNFYKSDYY[index] }}
        </td>
        <td v-else>{{ columnsKeyZHZXY[index] }}</td>
        <template v-if="['beihairenyi'].includes(HOSPITAL_ID)">
          <td v-for="(col, key) of keys" :key="key">
            <!-- 不可编辑 -->
            <!-- <div v-text="shift[key]"  style="outline:none;" @blur="(e)=>change(e,index,key)"></div> -->
            <!-- 可编辑 -->
            <div
              v-html="shift[key]"
              contenteditable="true"
              style="outline:none;"
              @blur="e => change(e, index, key)"
            ></div>
          </td>
        </template>
        <template v-else-if="['huadu'].includes(HOSPITAL_ID)">
          <td v-for="(col, key) of keysHuaDu" :key="key">
            <div
              v-html="shift[key]"
              contenteditable="true"
              style="outline:none;"
              @blur="e => change(e, index, key)"
            ></div>
          </td>
        </template>
        <template v-else-if="['ytll'].includes(HOSPITAL_ID)">
          <td v-for="(col, key) of keysYTLL" :key="key">
            <div
              v-html="shift[key]"
              contenteditable="true"
              style="outline:none;"
              @blur='e => handleBlur(e)'
              @click="e => handleFocus(index, key)"
            ></div>
          </td>
        </template>
        <template v-else-if="['nfyksdyy'].includes(HOSPITAL_ID)">
          <td v-for="(col, key) of keysZHZXY" :key="key">
            <div v-text="shift[key]" style="outline:none;"></div>
          </td>
        </template>
        <template v-else>
          <td v-for="(col, key) of keysZHZXY" :key="key">
            <div
              v-html="shift[key]"
              contenteditable="true"
              style="outline:none;"
              @blur="e => change(e, index, key)"
            ></div>
          </td>
        </template>
      </tr>
    </thead>
  </table>
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
      &:nth-child(2n)
        background #f4f2f5

      &:hover
        background #e6e6e6

      &.selected
        background #FFF8B1

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
    dynamic:{
      type:Object,
      value:{}
    }
  },
  data() {
    return {
      columnsKey: ["白班", "中班", "夜班"],
      columnsKeyZHZXY: ["A班", "P班", "N班"],
      columnsKeyNFYKSDYY: ["A班", "P班", "N班", "合计"],
      keys: {
        // bedEmpty:'空床',
        patientTotal: "原有",
        outHospitalTotal: "出院",
        transOutTotal: "转出",
        moveout: "迁出",
        // patientNew:'新收',
        patientTransferIn: "转入",
        movein: "迁入",
        patientDead: "死亡",
        inHospitalTotal: "入院",
        nowHospitalTotal: "现有",
        patientOpration: "手术",
        patientBirth: "分娩",
        patientBw: "病危",
        seriousTotal: "病重",
        goout: "外出",
        specialCare: "特护",
        patientYi: "一级护理",
        companions: "陪人数"
      },
      keysHuaDu: {
        patientNumber: "患者总人数",
        hospitalized: "入院",
        changeIn: "转入",
        leaveHospital: "出院",
        changeOut: "转出",
        todaySurgery: "今天手术",
        tomSurgery: "明日手术",
        childbirth: "分娩",
        ill: "病重",
        criticallyIll: "病危",
        death: "死亡",
        patientClass0: "特级护理",
        patientClass1: "一级护理",
        falls: "跌倒高危",
        pressure: "压疮高危",
        thrombus: "血栓高危",
        nutrition: "营养高危",
        aspiration: "误吸高危",
        unplanned: "非计划性拔管高危"
      },
      keysZHZXY: {
        patientNumber: "患者总人数",
        hospitalized: "入院",
        changeIn: "转入",
        leaveHospital: "出院",
        changeOut: "转出",
        todaySurgery: "今天手术",
        tomSurgery: "明日手术",
        childbirth: "分娩",
        ill: "病重",
        criticallyIll: "病危",
        death: "死亡",
        falls: "跌倒高危",
        pressure: "压疮高危",
        thrombus: "血栓高危",
        nutrition: "营养高危",
        aspiration: "误吸高危",
        unplanned: "非计划性拔管高危",
        leave: "外出请假"
      },
      keysYTLL: {
        patientNumber: "总数",
        leaveHospital: "出院",
        changeOut: "转出",
        death: "死亡",
        patientNew: "新入",
        changeIn: "转入",
        criticallyIll: "病危",
        ill: "病重",
        rescue: "抢救",
        todaySurgery: "手术",
        prepareSurgery: "备术",
        childbirth: "分娩",
        nurseClass0: "特护",
        nurseClass1: "一级"
      }
    };
  },
  methods: {
    change(e, index, key) {
      let value = e.currentTarget.innerText;
      this.$emit("changeShiftWithWardcodes", index, key, value);
    },
    handleFocus(index, key){
      console.log(key)
      this.$emit("getShiftWithWardcode", index, key);
    },
    handleBlur(e){
      let value = e.currentTarget.innerText;
      this.$emit("saveShiftWithWardcode", this.dynamic,value);
    },
  },
  created() {
  },
  components: {}
};
</script>
