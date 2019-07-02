<template>
  <div>
    <el-table
      :data="data"
      v-loading="loading"
      style="width: 100%"
      border
      :height="height()"
      @select-all="selectChange"
      @select="selectChange"
      class="shift-table"
      :row-class-name="tableRowClassName">
      <el-table-column  label=" " min-width="50px" type="selection">
      </el-table-column>

      <el-table-column
        label="床号"
        min-width="50px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.bedLabel}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        min-width="80px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.name}}</span>
        </template>
      </el-table-column>

       <el-table-column
        label="执行"
        min-width="80px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.executeFlag}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="日期"
        min-width="120px">
         <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.executeDateTime.split(' ')[0]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="时间点"
        min-width="80px">
         <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.zxsj.split(':')[0]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="repeatIndicator"
        label="长/临"
        min-width="80px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.repeatIndicator}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="医嘱内容"
        min-width="180px">
        <template slot-scope="scope">
            <span>{{scope.row.drugName}}</span>
        </template>
      </el-table-column>

     <el-table-column
        label="剂量"
        min-width="80px">
        <template slot-scope="scope">
            <span>{{scope.row.dosage}}</span>
        </template>
      </el-table-column>

    <el-table-column
        label="单位"
        min-width="80px">
        <template slot-scope="scope">
            <span>{{scope.row.dosageUnits}}</span>
        </template>
      </el-table-column>

    <el-table-column
        label="频次"
        min-width="50px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.frequency}}</span>
        </template>
      </el-table-column>

    <el-table-column
        label="途径"
        min-width="120px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.administration}}</span>
        </template>
      </el-table-column>

    <el-table-column
        label="医生说明"
        min-width="120px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.receiverName}}</span>
        </template>
      </el-table-column>

    <el-table-column
        label="滴速"
        min-width="50px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.speed}}</span>
        </template>
      </el-table-column>

    <el-table-column
        label="滴速单位"
        min-width="80px">
        <template slot-scope="scope">
            <span v-show="scope.row.isFirst">{{scope.row.speedUnit}}</span>
        </template>
      </el-table-column>

    <el-table-column
        label="执行护士"
        min-width="80px">
        <template slot-scope="scope">
            <span>{{scope.row.executeNurseName}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.do-box
  font-size: 13px;
  color: #4BB08D;
  .do-item
    padding 5px
    cursor pointer
    &:hover
      font-weight bold
.shift-table
  >>>.stripeRow
    background #fafafa!important
  >>>.noFirst .el-checkbox
    display none
</style>

<style lang="stylus">
.shift-table
  border 0 !important
  .el-table__row td:first-child .cell, .el-table__header th:first-child .cell
    text-align center
    padding 0 5px
  .cell
    padding 0 8px
</style>

<script>
import {get, del} from '@/api/shift'
  export default {
    props: {
        // 数据
        data: {
          type: Array,
          required: true
        },
        // 正在加载
        loading: {
          type: Boolean,
          default: true
        },
        // 瓶签打印
        printBarCode: {
          type: Array,
          required: true
        }
    },
    data() {
      return {
      }
    },
    computed: {
      wih() {
        return this.$store.state.common.wih
      }
    },
    methods: {
      height() {
        let height = this.wih - 215
        return height.toString()
      },
      selectChange(selection, row){
        let barCode = selection.map(item => {
          return item.barCode
        })
        this.$emit('update:printBarCode', barCode)
      },
      tableRowClassName(row, index) {
        let classlist = ''
        if(row.stripeRow) {
          classlist += 'stripeRow '
        }
        if(!row.isFirst) {
          classlist += ' noFirst'
        }
        return classlist
      }
    },
    filters: {
      toStatus(val) {
        if(val == 0) {
          return '保存'
        } else if(val == 1) {
          return '交班签名'
        } else if(val == 2) {
          return '接班签名'
        } else {
          return '未知'
        }
      }
    },
    components: {}
  }
</script>
