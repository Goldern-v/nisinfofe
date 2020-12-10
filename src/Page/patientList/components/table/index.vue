<template>
  <div class="table-cmp-wrapper">
    <el-table
        border
        :data="tableData"
        :height="tableHeight"
        style="width: 100%">
      <el-table-column label="序号" type="index" width="40px"/>
      <el-table-column prop="name" label="患者姓名" width="100px"/>
      <el-table-column prop="sex" label="性别" width="60px"/>
      <el-table-column prop="dateOfBirth" label="出生日期" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.dateOfBirth">
            <div>{{ getDateString(scope.row.dateOfBirth, true) }}</div>
            <!--<div>{{ getDateString(scope.row.dateOfBirth) }}</div>-->
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="idNo" label="身份证号" width="160px"/>
      <el-table-column prop="nativePlace" label="籍贯">
        <template slot-scope="scope">
          {{ getAreaByCode(scope.row.nativePlace) }}
        </template>
      </el-table-column>
      <el-table-column prop="birthPlace" label="出生地">
        <template slot-scope="scope">
          {{ getAreaByCode(scope.row.birthPlace) }}
        </template>
      </el-table-column>
      <el-table-column prop="mailingAddressCode" label="户籍地址">
        <template slot-scope="scope">
          {{ getAreaByCode(scope.row.mailingAddressCode) }}
        </template>
      </el-table-column>
      <el-table-column prop="patientArea" label="现住址">
        <template slot-scope="scope">
          {{ getAreaByCode(scope.row.patientArea) }}
        </template>
      </el-table-column>
      <el-table-column prop="registDateTime" label="登记时间" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.registDateTime">
            <div>{{ getDateString(scope.row.registDateTime, true) }}</div>
            <div>{{ getDateString(scope.row.registDateTime) }}</div>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="registOperatorName" label="登记人" width="80px"/>
      <el-table-column prop="address" label="操作" width="80px">
        <template slot-scope="scope">
          <el-button size="mini" type="text" v-if="+scope.row.registFlag === 1" @click="handleUpdate(scope.row)">登记
          </el-button>
          <span v-else>已登记</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getAreaByCode} from '@/utils/area.js'

export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableHeight: {
      type: String | Number,
      default: 530
    }
  },
  methods: {
    handleUpdate(row) {
      this.$emit('update', row)
    },
    getDateString(date, isFirst = false) {
      if (date) {
        if (isFirst) {
          return date.split(' ')[0]
        } else {
          const temp = date.split(' ')[1]
          return temp.split('.0')[0]
        }
      }
    },
    getAreaByCode
  }
}
</script>

<style lang="scss" scoped>
.table-cmp-wrapper {
  width: 100%;
  height: 100%;

  /deep/ .cell {
    padding: 0 5px;
    text-align: center;
  }
}
</style>
