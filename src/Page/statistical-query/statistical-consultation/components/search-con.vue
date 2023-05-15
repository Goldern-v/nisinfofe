<template>
  <div class="search-con">
    <div class="search-con__ctx">
      <div class="search-con__ctx__item">
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
      <div class="search-con__ctx__item">
        类型：
        <ElSelect
          style="width: 120px;"
          size="small"
          :value="formData.type"
          @input="handleQuery({ type: $event })"
          filterable
        >
          <ElOption
            v-for="val in typeList"
            :key="val.name"
            :label="val.name"
            :value="val.value"
          />
        </ElSelect>
      </div>
      <div class="search-con__ctx__item">
        科室：
        <ElSelect
          style="width: 150px;"
          size="small"
          :value="formData.wardCode"
          @input="handleQuery({wardCode: $event})"
          filterable
        >
          <ElOption v-for="val in deptList" :key="val.code" :label="val.name" :value="val.code" />
        </ElSelect>
      </div>
    </div>
    <div class="search-con__btn">
      <el-button type="primary" @click="() => handleQuery()">查询</el-button>
      <el-button @click="handleExport">导出</el-button>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import '../../index.scss';
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
      line-height: 30px;
      font-size: 12px;
      padding-right: 10px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
    .el-date-editor.el-input {
      width: 130px;
      &.el-date-editor--datetime {
        width: 170px;
      }
    }
  }
  /deep/ .el-date-editor--datetime .el-input__inner{
    height: 30px;
  }
}
</style>
<script>
import moment from 'moment';
import { themeNameList, typeList } from './config.js'
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
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      themeNameList,
      typeList,
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
      // deptList: [],
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
    // this.defaultData()
  },
  methods: {
    handleQuery(obj = {}) {
      let copy = { ...obj }
      let timeFormat = ['beginTime', 'endTime']
      timeFormat.map(k => {
        if (copy[k]) {
          copy[k] = moment(copy[k]).format('YYYY-MM-DD HH:mm:ss')
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
    async defaultData() {
      let obj = {}
      // 当天0点的时间格式
      this.formData.beginTime !== undefined && (obj.beginTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
      // 当天23点59分59秒的时间格式
      this.formData.endTime !== undefined && (obj.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
      // await this.getDepList()
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
    },
  },
  components: {}
};
</script>
