<template>
  <div class="search-con">
    <div class="search-con__ctx">
      <div class="search-con__ctx__item" v-if="formData.beginTime !== undefined && formData.endTime !== undefined">
        日期：
        <el-date-picker
          ref="beginRef"
          :value="formData.beginTime"
          :type="datetype"
          placeholder="选择开始时间"
          align="right"
          size="small"
          :format="format"
          :picker-options="pickerOptions"
          @input="handleQuery({beginTime: $event})"/>
        -
        <el-date-picker
          ref="endRef"
          :value="formData.endTime"
          :type="datetype"
          placeholder="选择结束时间"
          align="right"
          size="small"
          :format="format"
          :picker-options="pickerOptions"
          @input="handleQuery({endTime: $event})"/>
      </div>
      <div class="search-con__ctx__item" v-if="formData.type != undefined">
        病区：
        <ElSelect style="width: 120px;" size="small" :value="formData.type" @input="handleQuery({type: $event})" filterable>
          <ElOption v-for="val in deptList" :key="val.code" :label="val.name" :value="val.code" />
      </ElSelect>
      </div>
      <div class="search-con__ctx__item" v-if="formData.status != undefined">
        患者状态：
        <ElSelect style="width: 120px;" size="small" :value="formData.status" @input="handleQuery({status: $event})">
          <ElOption v-for="val in patientStatus" :key="val.key" :label="val.label" :value="val.key" />
        </ElSelect>
      </div>
      <div class="search-con__ctx__item" v-if="formData.point != undefined">
        时间点：
        <ElSelect style="width: 120px;" size="small" :value="formData.point" @input="handleQuery({point: $event})">
          <ElOption v-for="val in timePoint" :key="val.key" :label="val.label" :value="val.key" />
        </ElSelect>
      </div>
      <slot :formData="formData" :deptList="deptList" :handleQuery="handleQuery"/>
    </div>
    <div class="search-con__btn">
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="handleExport">导出</el-button>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import '../index.scss';
.search-con {
  display: flex;
  background: #fff;
  padding: 10px 15px;
  padding-bottom: 0px;
  .search-con__ctx {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .search-con__ctx__item {
      font-size: 12px;
      padding-right: 10px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
    .el-date-editor.el-input {
      width: 160px;
    }
  }
  /deep/ .el-date-editor--datetime .el-input__inner{
    height: 30px;
  }
}
</style>
<script>
import moment from 'moment';
import { PATIENT_STATUS, TIME_POINT } from "../enums";
export default {
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
    deptList: {
      type: Array,
      default: () => ([]),
    },
    datetype: {
      type: String,
      default: 'date'

    }
  },
  data() {
    return {
      patientStatus: PATIENT_STATUS,
      timePoint: TIME_POINT,
      pickerOptions: {
        shortcuts: [{
          text: '上月',
          onClick: (picker) => {
            // picker.$emit('pick', new Date());
            this.pickerOptClick('last_month')
          }
        }, {
          text: '本月',
          onClick: (picker) => {
            this.pickerOptClick('this_month')
          }
        }, {
          text: '上周',
          onClick: (picker) => {
            this.pickerOptClick('last_week')
          }
        }, {
          text: '本周',
          onClick: (picker) => {
            this.pickerOptClick('this_week')
          }
        }]
      },
    };
  },
  computed: {
    format() {
      if (this.datetype === 'date') {
        return 'yyyy-MM-dd'
      }
      return 'yyyy-MM-dd HH:mm:ss'
    }
  },
  mounted() {
    this.defaultData()
  },
  methods: {
    handleQuery(obj = {}) {
      let copy = { ...obj }
      let timeFormat = ['beginTime', 'endTime']
      let keys = Object.keys(copy)
      keys.map(v => {
        if (timeFormat.includes(v)) {
          copy[v] = copy[v] ? moment(copy[v]).format('YYYY-MM-DD HH:mm:ss'): ''
        }
      })
      if ((copy['beginTime'] || this.formData['beginTime)']) && (copy['endTime'] || this.formData['endTime'])) {
        let time0 = new Date(copy['beginTime'] || this.formData['beginTime)']).getTime()
        let time1 = new Date(copy['endTime'] || this.formData['endTime']).getTime()
        if (time0 > time1) {
          this.$message({
            message: '开始日期不能大于结束日期',
            type: 'warning'
          })
          return
        }
      }
      this.$emit('handleQuery', copy)
    },
    handleExport () {
      this.$emit('handleExport')
    },
    defaultData() {
      let obj = {}
      this.formData.beginTime !== undefined && (obj.beginTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
      // 当天0点的时间格式
      this.formData.endTime !== undefined && (obj.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
      // 当天23点59分59秒的时间格式
      this.$emit('handleQuery', obj)
    },
    pickerOptClick(flag) {
      this.$refs['beginRef'].handleClose()
      this.$refs['endRef'].handleClose()
      this.$nextTick(() => {
        this.$emit('handleQuery', this.formatTime(flag))
      })
    },
    formatTime(flag) {
      let obj = {}
      switch(flag) {
        case 'this_week':
          obj.beginTime = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss')
          obj.endTime = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss')
          return obj
        case 'last_week':
          obj.beginTime = moment().subtract(1,'week').startOf('week').format('YYYY-MM-DD HH:mm:ss')
          obj.endTime = moment().subtract(1,'week').endOf('week').format('YYYY-MM-DD HH:mm:ss')
          return obj
        case 'this_month':
          obj.beginTime = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
          obj.endTime = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
          return obj
        case 'last_month':
          obj.beginTime = moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD HH:mm:ss')
          obj.endTime = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD HH:mm:ss')
          return obj
        default:
          return obj

      }
    }
  },
  components: {}
};
</script>
