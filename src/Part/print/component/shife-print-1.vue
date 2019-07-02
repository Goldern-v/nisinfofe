<template>
  <div class="print-contain">
    <img src="../../../common/images/his-logo/南医三院骨研院骨科医院logo.png"
         alt=""
         class="logo">
    <div class="title">
      普外科护理单元
    </div>
    <div class="sup-title">
      病房护理交班志
    </div>
    <table>
      <tr class="uniq">
        <td style="width: 2.475%"></td>
        <td style="width: 2.475%"></td>
        <td style="width: 4.125%"></td>
        <td style="width: 4.125%"></td>
        <td style="width: 2%"></td>
        <td style="width: 2%"></td>

        <td style="width: 4.6%"></td>
        <td style="width: 4.6%"></td>
        <td style="width: 3.3%"></td>
        <td style="width: 3.3%"></td>

        <td style="width: 2.475%"></td>
        <td style="width: 2.475%"></td>
        <td style="width: 4.125%"></td>
        <td style="width: 4.125%"></td>
        <td style="width: 2%"></td>
        <td style="width: 2%"></td>

        <td style="width: 4.6%"></td>
        <td style="width: 4.6%"></td>
        <td style="width: 3.3%"></td>
        <td style="width: 3.3%"></td>

        <td style="width: 2.475%"></td>
        <td style="width: 2.475%"></td>
        <td style="width: 4.125%"></td>
        <td style="width: 4.125%"></td>
        <td style="width: 2%"></td>
        <td style="width: 2%"></td>

        <td style="width: 4.6%"></td>
        <td style="width: 4.6%"></td>
        <td style="width: 3.3%"></td>
        <td style="width: 3.3%"></td>

      </tr>
      <tr>
        <td colspan="30"
            class="pt-title"
            style="text-align: left">
          交班日期：{{deliverDate}} {{deliverDate | toWeek}}
        </td>
      </tr>
      <tr>
        <td colspan="10"
            class="pt-title">A</td>
        <td colspan="10"
            class="pt-title">P</td>
        <td colspan="10"
            class="pt-title">N</td>
      </tr>
      <tr>
        <td colspan="10"
            class="pt-title">护理安全质量指标</td>
        <td colspan="10"
            class="pt-title">护理安全质量指标</td>
        <td colspan="10"
            class="pt-title">护理安全质量指标</td>
      </tr>
      <tr>
        <td colspan="6"
            class="pt-type">
          高危药物外渗的发生例次
        </td>
        <td colspan="4"
            class="pt-type">{{A_data.gwDrugNum}}</td>
        <td colspan="6"
            class="pt-type">
          高危药物外渗的发生例次
        </td>
        <td colspan="4"
            class="pt-type">{{P_data.gwDrugNum}}</td>
        <td colspan="6"
            class="pt-type">
          高危药物外渗的发生例次
        </td>
        <td colspan="4"
            class="pt-type">{{N_data.gwDrugNum}}</td>
      </tr>
      <tr>
        <td colspan="6"
            class="pt-type">
          输液反应例次
        </td>
        <td colspan="4"
            class="pt-type">
          {{A_data.syReactionNum}}
        </td>
        <td colspan="6"
            class="pt-type">
          输液反应例次
        </td>
        <td colspan="4"
            class="pt-type">
          {{P_data.syReactionNum}}
        </td>
        <td colspan="6"
            class="pt-type">
          输液反应例次
        </td>
        <td colspan="4"
            class="pt-type">
          {{N_data.syReactionNum}}
        </td>
      </tr>
      <tr>
        <td colspan="6"
            class="pt-type">
          输血反应例次
        </td>
        <td colspan="4"
            class="pt-type">
          {{A_data.sxReactionNum}}
        </td>
        <td colspan="6"
            class="pt-type">
          输血反应例次
        </td>
        <td colspan="4"
            class="pt-type">
          {{P_data.sxReactionNum}}
        </td>
        <td colspan="6"
            class="pt-type">
          输血反应例次
        </td>
        <td colspan="4"
            class="pt-type">
          {{N_data.sxReactionNum}}
        </td>
      </tr>
      <tr>
        <td colspan="2"
            class="pt-type"
            style="padding:0">管道类型</td>
        <td colspan="4"
            class="pt-type">原有置管床号</td>
        <td colspan="2"
            class="pt-type">新增置管床号</td>
        <td colspan="2"
            class="pt-type">UE床号</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">管道类型</td>
        <td colspan="4"
            class="pt-type">原有置管床号</td>
        <td colspan="2"
            class="pt-type">新增置管床号</td>
        <td colspan="2"
            class="pt-type">UE床号</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">管道类型</td>
        <td colspan="4"
            class="pt-type">原有置管床号</td>
        <td colspan="2"
            class="pt-type">新增置管床号</td>
        <td colspan="2"
            class="pt-type">UE床号</td>
      </tr>
      <tr>
        <td colspan="2"
            class="pt-type"
            style="padding:0">胃管</td>
        <td colspan="4"
            class="pt-type">{{A_data.wgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.wgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.wgUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">胃管</td>
        <td colspan="4"
            class="pt-type">{{P_data.wgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.wgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.wgUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">胃管</td>
        <td colspan="4"
            class="pt-type">{{N_data.wgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.wgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.wgUEBed}}</td>
      </tr>
      <tr>
        <td colspan="2"
            class="pt-type"
            style="padding:0">尿管</td>
        <td colspan="4"
            class="pt-type">{{A_data.ngYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.ngXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.ngUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">尿管</td>
        <td colspan="4"
            class="pt-type">{{P_data.ngYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.ngXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.ngUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">尿管</td>
        <td colspan="4"
            class="pt-type">{{N_data.ngYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.ngXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.ngUEBed}}</td>
      </tr>
      <tr>
        <td colspan="2"
            class="pt-type"
            style="padding:0">气管导管</td>
        <td colspan="4"
            class="pt-type">{{A_data.qgdgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.qgdgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.qgdgUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">气管导管</td>
        <td colspan="4"
            class="pt-type">{{P_data.qgdgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.qgdgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.qgdgUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">气管导管</td>
        <td colspan="4"
            class="pt-type">{{N_data.qgdgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.qgdgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.qgdgUEBed}}</td>
      </tr>
      <tr>
        <td colspan="2"
            class="pt-type"
            style="padding:0">深静脉导管</td>
        <td colspan="4"
            class="pt-type">{{A_data.szmdgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.szmdgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.szmdgUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">深静脉导管</td>
        <td colspan="4"
            class="pt-type">{{P_data.szmdgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.szmdgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.szmdgUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">深静脉导管</td>
        <td colspan="4"
            class="pt-type">{{N_data.szmdgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.szmdgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.szmdgUEBed}}</td>
      </tr>
      <tr>
        <td colspan="2"
            class="pt-type"
            style="padding:0">{{A_data.ylgName || '()'}}引流管</td>
        <td colspan="4"
            class="pt-type">{{A_data.ylgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.ylgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{A_data.ylgUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">{{P_data.ylgName || '()'}}引流管</td>
        <td colspan="4"
            class="pt-type">{{P_data.ylgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.ylgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{P_data.ylgUEBed}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">{{N_data.ylgName || '()'}}引流管</td>
        <td colspan="4"
            class="pt-type">{{N_data.ylgYyzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.ylgXzzgBed}}</td>
        <td colspan="2"
            class="pt-type">{{N_data.ylgUEBed}}</td>
      </tr>
      <tr>
        <td colspan="2"
            class="pt-type"
            style="padding:0">总数</td>
        <td colspan="4"
            class="pt-type">{{A_SUM_1}}</td>
        <td colspan="2"
            class="pt-type">{{A_SUM_2}}</td>
        <td colspan="2"
            class="pt-type">{{A_SUM_3}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">总数</td>
        <td colspan="4"
            class="pt-type">{{P_SUM_1}}</td>
        <td colspan="2"
            class="pt-type">{{P_SUM_2}}</td>
        <td colspan="2"
            class="pt-type">{{P_SUM_3}}</td>

        <td colspan="2"
            class="pt-type"
            style="padding:0">总数</td>
        <td colspan="4"
            class="pt-type">{{N_SUM_1}}</td>
        <td colspan="2"
            class="pt-type">{{N_SUM_2}}</td>
        <td colspan="2"
            class="pt-type">{{N_SUM_3}}</td>
      </tr>

      <tr>
        <td colspan="4"
            class="pt-title">压疮指标数据</td>
        <td colspan="2"
            class="pt-title">例数</td>
        <td colspan="4"
            class="pt-title">床号</td>

        <td colspan="4"
            class="pt-title">压疮指标数据</td>
        <td colspan="2"
            class="pt-title">例数</td>
        <td colspan="4"
            class="pt-title">床号</td>

        <td colspan="4"
            class="pt-title">压疮指标数据</td>
        <td colspan="2"
            class="pt-title">例数</td>
        <td colspan="4"
            class="pt-title">床号</td>
      </tr>

      <tr>
        <td colspan="4"
            class="pt-type">入院人数</td>
        <td colspan="2"
            class="pt-type">{{A_data.ryrsNum}}</td>
        <td colspan="4"
            class="pt-type">{{A_data.ryrsBed}}</td>

        <td colspan="4"
            class="pt-type">入院人数</td>
        <td colspan="2"
            class="pt-type">{{P_data.ryrsNum}}</td>
        <td colspan="4"
            class="pt-type">{{P_data.ryrsBed}}</td>

        <td colspan="4"
            class="pt-type">入院人数</td>
        <td colspan="2"
            class="pt-type">{{N_data.ryrsNum}}</td>
        <td colspan="4"
            class="pt-type">{{N_data.ryrsBed}}</td>
      </tr>

      <tr>
        <td colspan="4"
            class="pt-type">入院时已有压疮</td>
        <td colspan="2"
            class="pt-type">{{A_data.ryycNum}}</td>
        <td colspan="4"
            class="pt-type">{{A_data.ryycBed}}</td>

        <td colspan="4"
            class="pt-type">入院时已有压疮</td>
        <td colspan="2"
            class="pt-type">{{P_data.ryycNum}}</td>
        <td colspan="4"
            class="pt-type">{{P_data.ryycBed}}</td>

        <td colspan="4"
            class="pt-type">入院时已有压疮</td>
        <td colspan="2"
            class="pt-type">{{N_data.ryycNum}}</td>
        <td colspan="4"
            class="pt-type">{{N_data.ryycBed}}</td>
      </tr>

      <tr>
        <td colspan="4"
            class="pt-type">入院时属压疮高风险患者</td>
        <td colspan="2"
            class="pt-type">{{A_data.ryycgwNum}}</td>
        <td colspan="4"
            class="pt-type">{{A_data.ryycgwBed}}</td>

        <td colspan="4"
            class="pt-type">入院时属压疮高风险患者</td>
        <td colspan="2"
            class="pt-type">{{P_data.ryycgwNum}}</td>
        <td colspan="4"
            class="pt-type">{{P_data.ryycgwBed}}</td>

        <td colspan="4"
            class="pt-type">入院时属压疮高风险患者</td>
        <td colspan="2"
            class="pt-type">{{N_data.ryycgwNum}}</td>
        <td colspan="4"
            class="pt-type">{{N_data.ryycgwBed}}</td>
      </tr>

      <tr>
        <td colspan="4"
            class="pt-type">实际评估压疮高风险患者</td>
        <td colspan="2"
            class="pt-type">{{A_data.ycgwNum}}</td>
        <td colspan="4"
            class="pt-type">{{A_data.ycgwBed}}</td>

        <td colspan="4"
            class="pt-type">实际评估压疮高风险患者</td>
        <td colspan="2"
            class="pt-type">{{P_data.ycgwNum}}</td>
        <td colspan="4"
            class="pt-type">{{P_data.ycgwBed}}</td>

        <td colspan="4"
            class="pt-type">实际评估压疮高风险患者</td>
        <td colspan="2"
            class="pt-type">{{N_data.ycgwNum}}</td>
        <td colspan="4"
            class="pt-type">{{N_data.ycgwBed}}</td>
      </tr>

      <tr>
        <td colspan="4"
            class="pt-type">已评高风险患者发生的压疮</td>
        <td colspan="2"
            class="pt-type">{{A_data.gwycNum}}</td>
        <td colspan="4"
            class="pt-type">{{A_data.gwycBed}}</td>

        <td colspan="4"
            class="pt-type">已评高风险患者发生的压疮</td>
        <td colspan="2"
            class="pt-type">{{P_data.gwycNum}}</td>
        <td colspan="4"
            class="pt-type">{{P_data.gwycBed}}</td>

        <td colspan="4"
            class="pt-type">已评高风险患者发生的压疮</td>
        <td colspan="2"
            class="pt-type">{{N_data.gwycNum}}</td>
        <td colspan="4"
            class="pt-type">{{N_data.gwycBed}}</td>
      </tr>

      <tr>
        <td colspan="4"
            class="pt-type">住院患者发生压疮</td>
        <td colspan="2"
            class="pt-type">{{A_data.zyycNum}}</td>
        <td colspan="4"
            class="pt-type">{{A_data.zyycBed}}</td>

        <td colspan="4"
            class="pt-type">住院患者发生压疮</td>
        <td colspan="2"
            class="pt-type">{{P_data.zyycNum}}</td>
        <td colspan="4"
            class="pt-type">{{P_data.zyycBed}}</td>

        <td colspan="4"
            class="pt-type">住院患者发生压疮</td>
        <td colspan="2"
            class="pt-type">{{N_data.zyycNum}}</td>
        <td colspan="4"
            class="pt-type">{{N_data.zyycBed}}</td>
      </tr>

    </table>
    <div class="table-footer">
      制表日期：{{c_time}}
      <span style="opacity: 0">空空空</span>制表人：{{author}}
    </div>
    <div class="page-num">
      第 2/3 页
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.print-contain
  min-height 600px
  width 710px
  page-break-after always

  table
    border-collapse collapse
    width 100%
    font-size 12px
    color #000
    border-top 0 !important

    .uniq
      border 0

      td
        border 0

  table, tr, td, th
    border 1px solid #444
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.print-contain
  min-height 600px
  width 710px
  page-break-after always

  table
    border-collapse collapse
    width 100%
    font-size 12px
    color #000
    border-top 0 !important

    .uniq
      border 0

      td
        border 0

  table, tr, td, th
    border 1px solid #444
</style>
<script>
import moment from 'moment'
import bus from 'vue-happy-bus'
export default {
  data () {
    return {
      data: [],
      deliverDate: '',
      c_time: '',
      author: '',
      bus: bus(this)
    }
  },
  created () {
    this.bus.$on('getShiftData', this.getData)
  },
  computed: {
    A_data () {
      return (this.data.filter(item => item.range == 'A') && this.data.filter(item => item.range == 'A')[0]) || {}
    },
    P_data () {
      return (this.data.filter(item => item.range == 'P') && this.data.filter(item => item.range == 'P')[0]) || {}
    },
    N_data () {
      return (this.data.filter(item => item.range == 'N') && this.data.filter(item => item.range == 'N')[0]) || {}
    },
    A_SUM_1 () {
      return (Number(this.A_data.wgYyzgBed) || 0) + (Number(this.A_data.ngYyzgBed) || 0) + (Number(this.A_data.qgdgYyzgBed) || 0) + (Number(this.A_data.szmdgYyzgBed) || 0) + (Number(this.A_data.ylgYyzgBed) || 0)
    },
    P_SUM_1 () {
      return (Number(this.P_data.wgYyzgBed) || 0) + (Number(this.P_data.ngYyzgBed) || 0) + (Number(this.P_data.qgdgYyzgBed) || 0) + (Number(this.P_data.szmdgYyzgBed) || 0) + (Number(this.P_data.ylgYyzgBed) || 0)
    },
    N_SUM_1 () {
      return (Number(this.N_data.wgYyzgBed) || 0) + (Number(this.N_data.ngYyzgBed) || 0) + (Number(this.N_data.qgdgYyzgBed) || 0) + (Number(this.N_data.szmdgYyzgBed) || 0) + (Number(this.N_data.ylgYyzgBed) || 0)
    },
    A_SUM_2 () {
      return (Number(this.A_data.wgXzzgBed) || 0) + (Number(this.A_data.ngXzzgBed) || 0) + (Number(this.A_data.qgdgXzzgBed) || 0) + (Number(this.A_data.szmdgXzzgBed) || 0) + (Number(this.A_data.ylgXzzgBed) || 0)
    },
    P_SUM_2 () {
      return (Number(this.P_data.wgXzzgBed) || 0) + (Number(this.P_data.ngXzzgBed) || 0) + (Number(this.P_data.qgdgXzzgBed) || 0) + (Number(this.P_data.szmdgXzzgBed) || 0) + (Number(this.P_data.ylgXzzgBed) || 0)
    },
    N_SUM_2 () {
      return (Number(this.N_data.wgXzzgBed) || 0) + (Number(this.N_data.ngXzzgBed) || 0) + (Number(this.N_data.qgdgXzzgBed) || 0) + (Number(this.N_data.szmdgXzzgBed) || 0) + (Number(this.N_data.ylgXzzgBed) || 0)
    },
    A_SUM_3 () {
      return (Number(this.A_data.wgUEBed) || 0) + (Number(this.A_data.ngUEBed) || 0) + (Number(this.A_data.qgdgUEBed) || 0) + (Number(this.A_data.szmdgUEBed) || 0) + (Number(this.A_data.ylgUEBed) || 0)
    },
    P_SUM_3 () {
      return (Number(this.P_data.wgUEBed) || 0) + (Number(this.P_data.ngUEBed) || 0) + (Number(this.P_data.qgdgUEBed) || 0) + (Number(this.P_data.szmdgUEBed) || 0) + (Number(this.P_data.ylgUEBed) || 0)
    },
    N_SUM_3 () {
      return (Number(this.N_data.wgUEBed) || 0) + (Number(this.N_data.ngUEBed) || 0) + (Number(this.N_data.qgdgUEBed) || 0) + (Number(this.N_data.szmdgUEBed) || 0) + (Number(this.N_data.ylgUEBed) || 0)
    },
  },
  filters: {
    toWeek (val) {
      return moment(val).format('dddd')
    }
  },
  methods: {
    getData (data, deliverDate) {
      try {
        this.data = data
        this.deliverDate = deliverDate
        this.c_time = new Date().Format('yyyy-MM-dd hh:mm')
        this.author = JSON.parse(localStorage.user).empName
      }
      catch (e) {
        console.log('参数错误')
      }
    }
  },
  components: {}
}
</script>
