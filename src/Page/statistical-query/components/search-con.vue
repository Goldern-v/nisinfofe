<template>
  <div class="search-con">
    <div class="search-con__ctx">
      <div class="search-con__ctx__item" v-if="formData.beginTime !== undefined && formData.endTime !== undefined">
        日期：
        <el-date-picker
          ref="beginRef"
          :value="formData.beginTime"
          type="datetime"
          placeholder="选择开始时间"
          align="right"
          size="small"
          format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          @input="handleQuery({beginTime: $event})"/>
        -
        <el-date-picker
          ref="endRef"
          :value="formData.endTime"
          type="datetime"
          placeholder="选择结束时间"
          align="right"
          size="small"
          format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          @input="handleQuery({endTime: $event})"/>
      </div>
      <div class="search-con__ctx__item" v-if="formData.type != undefined">
        病区：
        <ElSelect style="width: 120px;" size="small" :value="formData.type" @input="handleQuery({type: $event})">
          <ElOption v-for="val in deptList" :key="val.key" :label="val.label" :value="val.key" />
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
          <ElOption v-for="val in patientStatus" :key="val.key" :label="val.label" :value="val.key" />
        </ElSelect>
      </div>
    </div>
    <div class="search-con__btn">
      <el-button type="primary" @click="handleQuery">查看</el-button>
      <el-button @click="handleExport">导出</el-button>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.search-con {
  display: flex;
  background: #fff;
  padding: 10px;
  padding-bottom: 0px;
  .search-con__ctx {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .search-con__ctx__item {
      font-size: 14px;
      padding-right: 10px;
      padding-bottom: 10px;
    }
  }
  /deep/ .el-date-editor--datetime .el-input__inner{
    height: 30px;
  }
}
</style>
<script>
import moment from 'moment';
import { PATIENT_STATUS } from "../enums";
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
  },
  data() {
    return {
      patientStatus: PATIENT_STATUS,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    };
  },
  mounted() {
  },
  methods: {
    handleQuery(obj = {}) {
      console.log('test-obj', obj)
      let copy = { ...obj }
      let timeFormat = ['beginTime', 'endTime']
      // let keys = Object.keys(copy)
      // keys.map(v => {
      //   if (timeFormat.includes(v)) {
      //     copy[v] = copy[v] ? moment(new Date(v)).format('YYYY-MM-DD HH:mm:ss'): ''
      //   }
      // })

      this.$emit('handleQuery', copy)
    },
    handleExport () {
      this.$emit('handleExport')
    },
  },
  components: {}
};
</script>
