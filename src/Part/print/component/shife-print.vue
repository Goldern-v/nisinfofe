<template>
  <div class="print-contain">
    <img src="../../../common/images/his-logo/南医三院骨研院骨科医院logo.png" alt="" class="logo">
    <div class="title">
      {{deptName}}
    </div>
    <div class="sup-title">
      病房护理交班志
    </div>
    <table>
      <tr>
        <td colspan="3" class="pt-title" style="text-align: left">
          交班日期：{{deliverDate}} {{deliverDate | toWeek}}
        </td>
      </tr>
      <tr>
        <td colspan="1" class="pt-type" style="width: 33%">A</td>
        <td colspan="1" class="pt-type" style="width: 33%">P</td>
        <td colspan="1" class="pt-type" style="width: 33%">N</td>
      </tr>
      <tr>
        <td colspan="1" class="pt-num">
          <div flex="" class="pt-list">
            <span flex-box="1">病人数：{{A_data.patientTotal}}</span>
            <span flex-box="1">出院：{{A_data.outHospitalTotal}}</span>
            <span flex-box="1">转入：{{A_data.transInTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">死亡：{{A_data.deathTotal}}</span>
            <span flex-box="1">入院：{{A_data.inHospitalTotal}}</span>
            <span flex-box="1">转出：{{A_data.transOutTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">病危：{{A_data.dangerTotal}}</span>
            <span flex-box="1">病重：{{A_data.seriousTotal}}</span>
            <span flex-box="1">特级：{{A_data.specialGradeTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">手术：{{A_data.operationTotal}}</span>
            <span flex-box="1">分娩：{{A_data.parturitionTotal}}</span>
            <span flex-box="1">预手术：{{A_data.preoperationTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">一级：{{A_data.nursingFirst}}</span>
            <span flex-box="1"></span>
            <span flex-box="1"></span>
          </div>
        </td>
        <td colspan="1" class="pt-num">
          <div flex="" class="pt-list">
            <span flex-box="1">病人数：{{P_data.patientTotal}}</span>
            <span flex-box="1">出院：{{P_data.outHospitalTotal}}</span>
            <span flex-box="1">转入：{{P_data.transInTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">死亡：{{P_data.deathTotal}}</span>
            <span flex-box="1">入院：{{P_data.inHospitalTotal}}</span>
            <span flex-box="1">转出：{{P_data.transOutTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">病危：{{P_data.dangerTotal}}</span>
            <span flex-box="1">病重：{{P_data.seriousTotal}}</span>
            <span flex-box="1">特级：{{P_data.specialGradeTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">手术：{{P_data.operationTotal}}</span>
            <span flex-box="1">分娩：{{P_data.parturitionTotal}}</span>
            <span flex-box="1">预手术：{{P_data.preoperationTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">一级：{{P_data.nursingFirst}}</span>
            <span flex-box="1"></span>
            <span flex-box="1"></span>
          </div>
        </td>
        <td colspan="1" class="pt-num">
          <div flex="" class="pt-list">
            <span flex-box="1">病人数：{{N_data.patientTotal}}</span>
            <span flex-box="1">出院：{{N_data.outHospitalTotal}}</span>
            <span flex-box="1">转入：{{N_data.transInTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">死亡：{{N_data.deathTotal}}</span>
            <span flex-box="1">入院：{{N_data.inHospitalTotal}}</span>
            <span flex-box="1">转出：{{N_data.transOutTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">病危：{{N_data.dangerTotal}}</span>
            <span flex-box="1">病重：{{N_data.seriousTotal}}</span>
            <span flex-box="1">特级：{{N_data.specialGradeTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">手术：{{N_data.operationTotal}}</span>
            <span flex-box="1">分娩：{{N_data.parturitionTotal}}</span>
            <span flex-box="1">预手术：{{N_data.preoperationTotal}}</span>
          </div>
          <div flex="" class="pt-list">
            <span flex-box="1">一级：{{N_data.nursingFirst}}</span>
            <span flex-box="1"></span>
            <span flex-box="1"></span>
          </div>
        </td>
      </tr>
      <tr>
        <td class="pt-auto">
          自动外出：{{A_data.autoOutTotal}}
        </td>
        <td class="pt-auto">
          自动外出：{{P_data.autoOutTotal}}
        </td>
        <td class="pt-auto">
          自动外出：{{N_data.autoOutTotal}}
        </td>
      </tr>
      <tr>
        <td class="pt-record">
          交班记录：
          <textarea v-model="A_data.note" readOnly="true" v-textAutoHeight></textarea>
        </td>
        <td class="pt-record">
          交班记录：
          <textarea v-model="P_data.note" readOnly="true" v-textAutoHeight></textarea>
        </td>
        <td class="pt-record">
          交班记录：
          <textarea v-model="N_data.note" readOnly="true" v-textAutoHeight></textarea>
        </td>
      </tr>
      <tr>
        <td class="pt-auto">
          A班交接班签名：{{A_data.delivererName || '未签名'}} / {{A_data.receiverName || '未签名'}}
        </td>
        <td class="pt-auto">
          P班交接班签名：{{P_data.delivererName || '未签名'}} / {{P_data.receiverName || '未签名'}}
        </td>
        <td class="pt-auto">
          N班交接班签名：{{N_data.delivererName || '未签名'}} / {{N_data.receiverName || '未签名'}}
        </td>
      </tr>
    </table>
    <div class="table-footer">
      制表日期：{{c_time}}
      <span style="opacity: 0">空空空</span>制表人：{{author}}
    </div>
    <!-- <div class="page-num">
        第 1/3 页
      </div> -->
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@media print {
  .print-contain{
    padding 15px 0 !important
    margin 0 !important
  }
  .logo {
    top 0 !important
    left 0 !important
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.print-contain {
  min-height: 600px;
  width: 672px;
  padding: 30px 20px;
  page-break-after: always;
  position: relative;
  overflow: hidden;

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 12px;
    color: #333333;
  }

  table, tr, td, th {
    border: 1px solid #444;
  }

  .pt-title {
    height: 32px;
    vertical-align: middle;
    padding: 0 14px;
    color: #000;
    font-weight: bold;
    padding: 2px 5px;
    text-align: center;
  }

  .pt-type {
    height: 36px;
    vertical-align: middle;
    text-align: center;
    font-size: 12px;
    line-height: 15px;
    padding: 2px 5px;
  }

  .pt-num {
    padding: 10px 8px;

    .pt-list {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    span {
      width: 0;
    }
  }

  .pt-auto {
    height: 38px;
    text-align: left;
    vertical-align: middle;
    padding-left: 12px;
  }

  .pt-record {
    padding: 12px;
    textarea{
      min-height: 527px;
      height 500px
      display block
      width 100%
      border 0
      resize none
      outline none
      margin-top 5px
    }
  }

  .page-num {
    color: #000;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
}

.print-contain {
  margin-bottom 20px
  .logo {
    position: absolute;
    top: 19px;
    left: 16px;
    height: 37px;
  }

  .title {
    font-size: 18px;
    color: #000;
    text-align: center;
    margin-top: 12px;
  }

  .sup-title {
    font-size: 15px;
    color: #000;
    text-align: center;
    margin-top: 6px;
    margin-bottom: 14px;
  }

  .table-footer {
    font-size: 12px;
    color: #000;
    margin: 15px 0 0;
  }
}
</style>

<script>
  // textarea 自适应高度  
  function makeExpandingArea(el) {
    var setStyle = function(el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
      // console.log(el.scrollHeight);  
    }
    var delayedResize = function(el) {
      window.setTimeout(function() {
          setStyle(el)
        },
        0);
    }
    if (el.addEventListener) {
      el.addEventListener('input', function() {
        setStyle(el)
      }, false);
      setStyle(el)
    } else if (el.attachEvent) {
      el.attachEvent('onpropertychange', function() {
        setStyle(el)
      });
      setStyle(el)
    }
    if (window.VBArray && window.addEventListener) { //IE9  
      el.attachEvent("onkeydown", function() {
        var key = window.event.keyCode;
        if (key == 8 || key == 46) delayedResize(el);
      });
      el.attachEvent("oncut", function() {
        delayedResize(el);
      }); //处理粘贴  
    }
  }
  import moment from 'moment'
  import bus from 'vue-happy-bus'
  import {printDir} from '../control/common-print.js'
  export default {
    directives: {
      textAutoHeight: {
        update: (el, bind) => {
          makeExpandingArea(el)
        }
      }
    },
    data() {
      return {
        data: [],
        deliverDate: '',
        c_time: '',
        author: '',
        deptName: '',
        bus: bus(this)
      }
    },
    created() {
      window.getShiftData = (data, date, deptName) => {
        setTimeout(() => {
          this.bus.$emit('getShiftData', data, date, deptName)
        }, 100);
      }
      this.bus.$on('getShiftData', this.getData)
    },
    mounted() {
      printDir('v')
    },
    computed: {
      A_data() {
        return (this.data.filter(item => item.range == 'A') && this.data.filter(item => item.range == 'A')[0]) || {}
      },
      P_data() {
        return (this.data.filter(item => item.range == 'P') && this.data.filter(item => item.range == 'P')[0]) || {}
      },
      N_data() {
        return (this.data.filter(item => item.range == 'N') && this.data.filter(item => item.range == 'N')[0]) || {}
      }
    },
    filters: {
      toWeek(val) {
        return moment(val).format('dddd')
      }
    },
    methods: {
      getData(data, deliverDate, deptName) {
        try {
          this.data = data
          this.deptName = deptName
          this.deliverDate = deliverDate
          this.c_time = new Date().Format('yyyy-MM-dd hh:mm')
          this.author = JSON.parse(localStorage.user).empName
        } catch (e) {
          console.log('参数错误')
        }
      }
    },
    components: {}
  }
</script>
