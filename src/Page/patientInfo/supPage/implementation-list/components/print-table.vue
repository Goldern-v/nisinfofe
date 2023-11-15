<template>
  <div class="d-table">
    <table>
      <colgroup>
        <col v-for="(item) in tableList"  :key="item.width" :width="item.width"/>
      </colgroup>
      <thead>
        <tr>
          <th v-for="(item, index) in tableList" :key="index">{{item.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tItem) in tableData" :key="tItem.id">
          <td v-for="(dItem) in tableList" :key="dItem.code" :style="{textAlign: dItem.align}">
            <template v-if="dItem.code == 'expand' || dItem.code == 'expand1'">
              <img
                class="sign-img"
                v-if="tItem[dItem.code] && tItem[dItem.code] != '*' "
                :src="`/crNursing/api/file/signImage/${tItem[dItem.code]}?${token}`"
                alt
              />
            </template>
            <template v-else>
            {{ dItem.code == 'executeDateTime' ? ymdhm(tItem[dItem.code]) : tItem[dItem.code]  }}
            </template>

            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
table{
  border-collapse: collapse; /* 合并边框 */
}
th {
  background-color: #eef6f5; /* 设置表头背景颜色 */
  font-weight: bold; /* 设置表头文字加粗 */
  border: 1px solid #ddd; /* 设置单元格边框 */
  padding: 8px; /* 设置单元格内边距 */
}
td {
  border: 1px solid #ddd; /* 设置单元格边框 */
  text-align: center
}
.sign-img{
  width: 100%;
}
</style>
<script>
import commonMixin from "@/common/mixin/common.mixin";
import moment from "moment";
const tableList = [
  {
    width: '50px',
    title: '床号',
    code: 'bedLabel',
    align: 'center'
  },
  {
    width: '80px',
    title: '执行时间',
    code: 'executeDateTime',
    align: 'center'
  },
  {
    width: '70px',
    title: '姓名',
    code: 'patientName',
    align: 'center'
  },
  {
    width: '320px',
    title: '医嘱内容',
    code: 'orderText',
    align: 'left'
  },
  {
    width: '50px',
    title: '剂量',
    code: 'dosage',
    align: 'right'
  },
  {
    width: '50px',
    title: '单位',
    code: 'dosageUnits',
    align: 'left'
  },
  {
    width: '50px',
    title: '频次',
    code: 'frequency',
    align: 'center'
  },
  {
    width: '100px',
    title: '途径',
    code: 'administration',
    align: 'center'
  },
  {
    width: '80px',
    title: '执行状态',
    code: 'executeFlag',
    align: 'center'
  },
  {
    width: '80px',
    title: '执行人',
    code: 'expand',
    align: 'center'
  },
  {
    width: '200px',
    title: '实际执行时间',
    code: 'realExecuteDateTime',
    align: 'center'
  },
  {
    width: '120px',
    title: '开医嘱时间',
    code: 'startDateTime',
    align: 'center'
  },
  {
    width: '70px',
    title: '长/临',
    code: 'repeatIndicator',
    align: 'center'
  },
  {
    width: '80px',
    title: '校对护士',
    code: 'expand1',
    align: 'center'
  },
  {
    width: '300px',
    title: '补执行的原因',
    code: 'typeReason',
    align: 'center'
  },
]
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean
  },
  mixins: [commonMixin],

  data() {
    return {
      tableList
    };
  },
  filters: {

  },
  methods:{
     ymdhm(val) {
      return val ? moment(val).format("HH:mm") : "";
    }
  },
};
</script>
