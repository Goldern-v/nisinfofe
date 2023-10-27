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
      <div class="search-con__ctx__item" v-if="formData.wardCode != undefined">
        病区：
        <ElSelect style="width: 150px;" size="small" :value="formData.wardCode" @input="handleQuery({wardCode: $event})" filterable>
          <ElOption v-for="val in deptList" :key="val.code" :label="val.name" :value="val.code" />
      </ElSelect>
      </div>
      <div class="search-con__ctx__item" v-else-if="formData.wardCodeList != undefined && deptMultiple">
        病区：
        <el-select
          :value="formData.wardCodeList"
          @input="deptChange"
          placeholder="请选择"
          style="width: 400px;"
          size="small"
          multiple
        >
          <el-checkbox-group v-model="formData.wardCodeList">
            <el-option
              v-for="dept in deptList"
              :key="dept.code"
              :label="dept.name"
              :value="dept.code"
            >
              <el-checkbox
                style="pointer-events: none"
                :label="dept.code"
              > {{ dept.name }}
              </el-checkbox>
            </el-option>
          </el-checkbox-group>
        </el-select>
        <!-- <ElSelect multiple style="width: 150px;" size="small" :value="formData.wardCodeList" @input="deptChange" filterable>
          <ElOption v-for="val in deptList" :key="val.code" :label="val.name" :value="val.code" />
      </ElSelect> -->
      </div>
      <div class="search-con__ctx__item" v-if="formData.recordName != undefined">
        表单：
        <ElSelect style="width: 150px;" size="small" :value="formData.recordName" @input="handleQuery({recordName: $event})">
          <ElOption v-for="val in recordList" :key="val.name" :label="val.name" :value="val.name" />
        </ElSelect>
      </div>
      <div class="search-con__ctx__item" v-if="formData.status != undefined">
        患者状态：
        <ElSelect style="width: 90px;" size="small" :value="formData.status" @input="handleQuery({status: $event})">
          <ElOption v-for="val in patientStatus" :key="val.key" :label="val.label" :value="val.key" />
        </ElSelect>
      </div>
      <div class="search-con__ctx__item" v-if="formData.timing != undefined && !['whsl'].includes(HOSPITAL_ID)">
        时间点：
        <ElSelect style="width: 120px;" size="small" :value="formData.timing" @input="handleQuery({timing: $event})">
          <ElOption v-for="val in timePoint" :key="val.key" :label="val.label" :value="val.key" />
        </ElSelect>
      </div>
      <slot :formData="formData" :handleQuery="handleQuery"/>
    </div>
    <div class="search-con__btn">
      <el-button type="primary" @click="() => handleQuery()">查询</el-button>
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
/deep/ .el-select {
  & .el-select__tags {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & input {
    height: 30px!important;
  }
  .el-tag {
    height: 20px!important;
    line-height: 18px!important;
    padding: 0 6px;
    & .el-icon-close {
      display: none!important;
    }
  }
}
</style>
<script>
import moment from 'moment';
import { PATIENT_STATUS, TIME_POINT, TIME_OUTPUT,NURSING_LEVEL_SDYY } from "../enums";
import { nursingUnit } from "@/api/lesion"
export default {
  props: {
    deptMultiple:{
      type: Boolean,
      default: false,
    },
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
    },
    istype: {
      type: Boolean,
      default: false,
    },
    recordList: {
      type: Array,
      default: () => []
    },
    isItme: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      patientStatus: PATIENT_STATUS,
      timePoint: this.isItme ? TIME_OUTPUT :  TIME_POINT,
      // patientLevelSdyy: NURSING_LEVEL_SDYY,
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
    deptChange(val){
      if(val.length>=2 && val[0]=="") val.shift()
      else if(val.length>=2 && val[val.length-1]=="") val = [""]
      this.handleQuery({wardCodeList:val})
    },
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
      // console.log('formData',this.formData);
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
    // async getDepList() {
    //   try {
    //     this.$emit('update:loading', true)
    //     const res = await nursingUnit()
    //     this.deptList = res.data.data.deptList || []
    //       if (this.deptList.length > 0) {
    //         this.deptList = [
    //           {
    //             code: '',
    //             name: '全院'
    //           },
    //           ...this.deptList
    //         ]
    //       } else {
    //         this.deptList = []
    //       }
    //     this.$emit('update:loading', false)
    //   } catch (e) {
    //     this.$emit('update:loading', false)
    //   }
    // }
  },
  components: {}
};
</script>
