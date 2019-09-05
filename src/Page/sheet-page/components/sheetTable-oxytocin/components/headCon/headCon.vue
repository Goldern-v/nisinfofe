<template>
  <div class="tableCon">
     <div class="sum">
        <div class="group">
          BiShop宫颈成熟度评分：<input type="text">
        </div>
        <div class="group">
          累计评分共计：<input type="text" v-model="grade">分
        </div>
     </div>
     <table>
       <thead>
         <tr>
           <th :colspan="item.colspan || 1" v-for="item in tableData.thead" :key="item.value">{{item.value}}</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(tr,trIndex) in tableData.tbody" :key="trIndex">
           <td v-for="(td,tdIndex) in tr" :key="tdIndex" :colspan="td.colspan" :class="td.class" :style="[td.style,td.isChecked && {cursor: 'pointer'}]" @click="isChecked(tr,td,tdIndex)">
             <label v-if="td.prev">{{td.prev}}</label>
             <span v-if="td.type=='text'" @click="sign">{{td.value}}</span>
             <!-- <img
              class="head-sign-img"
              v-if="sheetInfo.selectBlock.relSignInfo.signerNo3"
              :src="`/crNursing/api/file/signImage/${sheetInfo.selectBlock.relSignInfo.signerNo3}?${token}`"
              alt
            > -->
           </td>
         </tr>
       </tbody>
      </table> 
      <div class="info">
        <div class="group">
          催产素静脉点滴情况：<input type="text">
        </div>
        <div class="group">
          静滴催产素指症：<input type="text" style="text-align: center;">分
        </div>
     </div>
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
      tableData: countData,
      grade: '',//累计评分
    };
  },
  methods: {
    // 勾选当前选项
    isChecked(tr,td,tdIndex){
      if(!td.isChecked){
        return;
      }
      // 累计评分
      var allGrade = [null,null,0,null,1,null,2,null,3];
      var currentGrade = Number(allGrade[tdIndex])!=NaN ? Number(allGrade[tdIndex]):0;
      this.grade = this.grade || 0;
      if(!td.value){
        tr.map((item,index) => {
          if(item.name == td.name && item.value && Number(allGrade[index]) != NaN){
            this.grade -= Number(allGrade[index]);
            item.value = '';
          }
        });
        td.value = '√';
        this.grade += currentGrade;
      }else {
        td.value = '';
        this.grade -= currentGrade;
      }
    },
    sign(){

    }
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
  .sum,.info {
    display: flex;
    align-items: center;
    padding: 10px 0;
    div {
      flex: 1;
      &:last-of-type {
        input {
         border-bottom: 1px solid #000;
        }
      }
    }
    input {
      border: none;
      outline: none;
      font-size: 16px;
      width: 80px;
    }
  }
  .sum {
    div {
      &:last-of-type {
        input {
          text-align: center;
        }
      }
    }
  }
  .info {
    padding: 10px 0 0 0;
  }
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
      &.sign {
       padding-top: 0;
       span {
         display: inline-block;
         width: 80px;
         min-height: 24px;
         line-height: 24px;
         cursor: pointer;
         vertical-align: middle;
       }
      }
    }
  }
}
</style>
