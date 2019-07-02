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
      <tr class="uniq"
          style="text-align: left">
        <td style="width: 13.2%"></td>
        <td style="width: 6.6%"></td>
        <td style="width: 13.2%"></td>
        <td style="width: 13.2%"></td>
        <td style="width: 6.6%"></td>
        <td style="width: 13.2%"></td>
        <td style="width: 13.2%"></td>
        <td style="width: 6.6%"></td>
        <td style="width: 13.2%"></td>
      </tr>
      <tr>
        <td colspan="9"
            class="pt-title"
            style="text-align: left">
          交班日期：{{deliverDate}} {{deliverDate | toWeek}}
        </td>
      </tr>
      <tr>
        <td colspan="3"
            class="pt-title">A</td>
        <td colspan="3"
            class="pt-title">P</td>
        <td colspan="3"
            class="pt-title">N</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-title">其他指标数据</td>
        <td colspan="1"
            class="pt-title">例数</td>
        <td colspan="1"
            class="pt-title">床号</td>
        <td colspan="1"
            class="pt-title">其他指标数据</td>
        <td colspan="1"
            class="pt-title">例数</td>
        <td colspan="1"
            class="pt-title">床号</td>
        <td colspan="1"
            class="pt-title">其他指标数据</td>
        <td colspan="1"
            class="pt-title">例数</td>
        <td colspan="1"
            class="pt-title">床号</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">排便/排尿失禁患者</td>
        <td colspan="1"
            class="pt-type">{{A_data.sjhzNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.sjhzBed}}</td>
        <td colspan="1"
            class="pt-type">排便/排尿失禁患者</td>
        <td colspan="1"
            class="pt-type">{{P_data.sjhzNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.sjhzBed}}</td>
        <td colspan="1"
            class="pt-type">排便/排尿失禁患者</td>
        <td colspan="1"
            class="pt-type">{{N_data.sjhzNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.sjhzBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">失禁患者发生失禁性皮炎</td>
        <td colspan="1"
            class="pt-type">{{A_data.sjpyNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.sjpyBed}}</td>
        <td colspan="1"
            class="pt-type">失禁患者发生失禁性皮炎</td>
        <td colspan="1"
            class="pt-type">{{P_data.sjpyNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.sjpyBed}}</td>
        <td colspan="1"
            class="pt-type">失禁患者发生失禁性皮炎</td>
        <td colspan="1"
            class="pt-type">{{N_data.sjpyNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.sjpyBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">发生足下垂患者</td>
        <td colspan="1"
            class="pt-type">{{A_data.zxcNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.zxcBed}}</td>
        <td colspan="1"
            class="pt-type">发生足下垂患者</td>
        <td colspan="1"
            class="pt-type">{{P_data.zxcNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.zxcBed}}</td>
        <td colspan="1"
            class="pt-type">发生足下垂患者</td>
        <td colspan="1"
            class="pt-type">{{N_data.zxcNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.zxcBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">住院患者的约束人数</td>
        <td colspan="1"
            class="pt-type">{{A_data.zyysNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.zyysBed}}</td>
        <td colspan="1"
            class="pt-type">住院患者的约束人数</td>
        <td colspan="1"
            class="pt-type">{{P_data.zyysNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.zyysBed}}</td>
        <td colspan="1"
            class="pt-type">住院患者的约束人数</td>
        <td colspan="1"
            class="pt-type">{{N_data.zyysNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.zyysBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">误吸高风险住院患者</td>
        <td colspan="1"
            class="pt-type">{{A_data.wxgfxNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.wxgfxBed}}</td>
        <td colspan="1"
            class="pt-type">误吸高风险住院患者</td>
        <td colspan="1"
            class="pt-type">{{P_data.wxgfxNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.wxgfxBed}}</td>
        <td colspan="1"
            class="pt-type">误吸高风险住院患者</td>
        <td colspan="1"
            class="pt-type">{{N_data.wxgfxNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.wxgfxBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">住院患者发生误吸</td>
        <td colspan="1"
            class="pt-type">{{A_data.zywxNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.zywxBed}}</td>
        <td colspan="1"
            class="pt-type">住院患者发生误吸</td>
        <td colspan="1"
            class="pt-type">{{P_data.zywxNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.zywxBed}}</td>
        <td colspan="1"
            class="pt-type">住院患者发生误吸</td>
        <td colspan="1"
            class="pt-type">{{N_data.zywxNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.zywxBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">走失高风险的住院患者</td>
        <td colspan="1"
            class="pt-type">{{A_data.zsgfxNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.zsgfxBed}}</td>
        <td colspan="1"
            class="pt-type">走失高风险的住院患者</td>
        <td colspan="1"
            class="pt-type">{{P_data.zsgfxNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.zsgfxBed}}</td>
        <td colspan="1"
            class="pt-type">走失高风险的住院患者</td>
        <td colspan="1"
            class="pt-type">{{N_data.zsgfxNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.zsgfxBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">住院患者走失</td>
        <td colspan="1"
            class="pt-type">{{A_data.zyzsNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.zyzsBed}}</td>
        <td colspan="1"
            class="pt-type">住院患者走失</td>
        <td colspan="1"
            class="pt-type">{{P_data.zyzsNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.zyzsBed}}</td>
        <td colspan="1"
            class="pt-type">住院患者走失</td>
        <td colspan="1"
            class="pt-type">{{N_data.zyzsNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.zyzsBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">患者使用静脉药物发生错误</td>
        <td colspan="1"
            class="pt-type">{{A_data.jmcwNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.jmcwBed}}</td>
        <td colspan="1"
            class="pt-type">患者使用静脉药物发生错误</td>
        <td colspan="1"
            class="pt-type">{{P_data.jmcwNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.jmcwBed}}</td>
        <td colspan="1"
            class="pt-type">患者使用静脉药物发生错误</td>
        <td colspan="1"
            class="pt-type">{{N_data.jmcwNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.jmcwBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-title">跌倒/坠床指标数据</td>
        <td colspan="1"
            class="pt-title">例数</td>
        <td colspan="1"
            class="pt-title">床号</td>
        <td colspan="1"
            class="pt-title">跌倒/坠床指标数据</td>
        <td colspan="1"
            class="pt-title">例数</td>
        <td colspan="1"
            class="pt-title">床号</td>
        <td colspan="1"
            class="pt-title">跌倒/坠床指标数据</td>
        <td colspan="1"
            class="pt-title">例数</td>
        <td colspan="1"
            class="pt-title">床号</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">入院时属高风险跌倒患者</td>
        <td colspan="1"
            class="pt-type">{{A_data.ryddNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.ryddBed}}</td>
        <td colspan="1"
            class="pt-type">入院时属高风险跌倒患者</td>
        <td colspan="1"
            class="pt-type">{{P_data.ryddNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.ryddBed}}</td>
        <td colspan="1"
            class="pt-type">入院时属高风险跌倒患者</td>
        <td colspan="1"
            class="pt-type">{{N_data.ryddNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.ryddBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">实际评估跌倒/坠床高风险患者</td>
        <td colspan="1"
            class="pt-type">{{A_data.ddNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.ddBed}}</td>
        <td colspan="1"
            class="pt-type">实际评估跌倒/坠床高风险患者</td>
        <td colspan="1"
            class="pt-type">{{P_data.ddNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.ddBed}}</td>
        <td colspan="1"
            class="pt-type">实际评估跌倒/坠床高风险患者</td>
        <td colspan="1"
            class="pt-type">{{N_data.ddNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.ddBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">已评高风险患者发生的跌到</td>
        <td colspan="1"
            class="pt-type">{{A_data.gfxddNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.gfxddBed}}</td>
        <td colspan="1"
            class="pt-type">已评高风险患者发生的跌到</td>
        <td colspan="1"
            class="pt-type">{{P_data.gfxddNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.gfxddBed}}</td>
        <td colspan="1"
            class="pt-type">已评高风险患者发生的跌到</td>
        <td colspan="1"
            class="pt-type">{{N_data.gfxddNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.gfxddBed}}</td>
      </tr>
      <tr>
        <td colspan="1"
            class="pt-type">住院患者发生跌倒</td>
        <td colspan="1"
            class="pt-type">{{A_data.zyddNum}}</td>
        <td colspan="1"
            class="pt-type">{{A_data.zyddBed}}</td>
        <td colspan="1"
            class="pt-type">住院患者发生跌倒</td>
        <td colspan="1"
            class="pt-type">{{P_data.zyddNum}}</td>
        <td colspan="1"
            class="pt-type">{{P_data.zyddBed}}</td>
        <td colspan="1"
            class="pt-type">住院患者发生跌倒</td>
        <td colspan="1"
            class="pt-type">{{N_data.zyddNum}}</td>
        <td colspan="1"
            class="pt-type">{{N_data.zyddBed}}</td>
      </tr>
      <tr>
        <td colspan="3"
            class="pt-type">A班交接班签名：{{A_data.delivererName}} / {{A_data.receiverName}}</td>
        <td colspan="3"
            class="pt-type">P班交接班签名：{{P_data.delivererName}} / {{P_data.receiverName}}</td>
        <td colspan="3"
            class="pt-type">N班交接班签名：{{N_data.delivererName}} / {{N_data.receiverName}}</td>
      </tr>
    </table>
    <div class="table-footer">
      制表日期：{{c_time}}
      <span style="opacity: 0">空空空</span>制表人：{{author}}
    </div>
    <div class="page-num">
      第 3/3 页
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.print-contain {
  min-height: 600px;
  width: 710px;
  page-break-after: always;

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 12px;
    color: #000;
    border-top: 0 !important;

    .uniq {
      border: 0;

      td {
        border: 0;
      }
    }
  }

  table, tr, td, th {
    border: 1px solid #444;
  }
}
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.print-contain {
  min-height: 600px;
  width: 710px;
  page-break-after: always;
  margin-bottom 20px
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 12px;
    color: #000;
    border-top: 0 !important;

    .uniq {
      border: 0;

      td {
        border: 0;
      }
    }
  }

  table, tr, td, th {
    border: 1px solid #444;
  }
}
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
    }
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
