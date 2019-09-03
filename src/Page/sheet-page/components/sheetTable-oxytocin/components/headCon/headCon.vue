<template>
  <div class="tableCon">
     <table>
       <thead>
         <tr>
           <th :colspan="item.colspan || 1" v-for="item in tableData.thead" :key="item.value">{{item.value}}</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(tr,trIndex) in tableData.tbody" :key="trIndex">
           <td v-for="(td,tdIndex) in tr" :key="tdIndex" :colspan="td.colspan">
             <span v-if="td.type=='text'">{{td.value}}</span>
             <input type="text" v-if="td.type=='input'" v-model="td.value">
           </td>
         </tr>
       </tbody>
      </table> 
    <div class="secondTableTitle">产后（产房）观察记录单</div>
  </div>
</template>

<script>
import {countData} from "./countData";
import sheetInfo from "../../../config/sheetInfo"; 
import commom from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";
export default {
  mixins: [commom],
  data() {
    return {
      sheetInfo,
      bus: bus(this),
      tableData: countData
    };
  },
  methods: {
  },

  created() {
  },
  mounted() {
    console.log(this.tableData);

  },
  computed: {
  },
  watch: {},
  coponents: {}
};
</script>

<style lang='scss'>
.tableCon {
  width: 700px;
  font-family: simsun, "Times New Roman", Georgia, Serif;
  font-size: 12px;
  table {
    width: 100%;
    th,td {
      border: 1px solid #000;
      min-width: 50px;
      padding: 10px 0;
      text-align: center;
      &:first-of-type {
        text-align: left;
      }
    }
  }
  .secondTableTitle {
    margin-bottom: -10px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
