<template>
  <div flex-box="1" class="table-box blood-sugar-table">
    <table>
      <tr>
       <!--  <th
          style="width: 2%; min-width: 20px"
        >
          序号
        </th> -->
        <th style="width: 24%;">日期</th>
        <th
          style="width: 19%;"
        >
          时间
        </th>
        <th style="width: 19%">
          血氧(%)
        </th>
        <th style="width: 19%">
          心率
          <br />
          (次/分)
        </th>
        <th style="width: 19%">{{ '签名' }}</th>
      </tr>
      <tr
        v-for="(item,index) in renderData"
        :class="{ selected: selected === item }"
        :key="index+'item.sugarValue'"
        @click="onSelect(item)"
        @blur="handleBlur(item)"
      >
        <td>
          <div class="cell">
            <!-- {{ item.date }} -->
            <input type="text" v-model="item.dateStr">
          </div>
        </td>
        <td>
          <div class="cell">
            <input type="text" v-model="item.timeStr" @input="inputTime(item,'timeStr',':')">
          </div>
        </td>
        <td>
          <div class="cell">
            <input type="text" v-model="item.sugarOxygen">
          </div>
        </td>
        <td>
          <div class="cell">
            <input type="text" v-model="item.heartRate">
          </div>
        </td>
        <td>
          <div class="cell noPrint"  @click="openSignModal">{{ item.signerNo }}</div>
          <div :class="['cell','inPrint']">
            <!-- {{item.nurseEmpNo}} -->
            <img
              :src="`/crNursing/api/file/signImage/${item.nurseEmpNo}?${token}`"
              :alt="item.nurse"
              v-if="item.nurseEmpNo"
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.blood-sugar-table {
  &.table-box {
    width: 0;

    table {
      border-collapse: collapse;
      width: 100%;
    }

    td, tr, th {
      border: 1px solid #000;
      text-align: center;
      vertical-align: middle;
    }

    tr {
      &:hover {
        background: #e6e6e6;
      }

      &.selected {
        background: #FFF8B1;
      }
    }

    td {
      height: 29px;
      font-size: 12px;
      padding: 0 1px;

      .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // max-width: 74px;
        input{
          width: 100%;
          border: none;
          background-color: transparent;
          outline: none;
          resize: none;
          text-align: center;
          font-size: 12px;
        }
      }

      img {
        width: 60%;
        height: 100%;
        //object-fit: cover;
        object-fit: contain !important;
        -webkit-object-fit: contain!important;
      }
    }

    th {
      height: 40px;
      font-size: 13px;
      font-weight: bold;
      background: #f4f2f5;
    }
  }
  .noPrint{
    height: 100%;
    line-height: 28px;
  }

  .inPrint {
    display: none;
 
    &.lc {
      height: 29px;
    }
  }
  .liaocheng-img{
    width:55px;
    height:18px;
  }
  .guizhou-img img{
    width: 55px !important;
    height: 25px !important;
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import * as apis from "../api";
export default {
  props: {
    data: Array,
    selected: Object,
    baseIndex:Number,
  },
  mixins: [common],
  data() {
    return {
      msg: "hello vue",
    };
  },
  computed: {
    renderData() {
      if (!this.data) return;
      let renderData = [];
      let firstDate = "";
      console.log('this.data',this.data)
      for (let i = 0; i < this.data.length; i++) {
        let obj = this.data[i];
        let date = this.data[i].md.split(" ")[0];
        let time = this.data[i].md.split(" ")[1];
        if (firstDate != date) {
          obj.date = date;
        } else {
          obj.date = "";
        }
        firstDate = date;
        obj.time = time;
        renderData.push(obj);
      }
      while (renderData.length <= 26) {
        renderData.push({});
      }
      console.log(renderData);
      return renderData;
    },
  },
  watch:{
    renderData:{
      handler(newvla){
        console.log(newvla)
      }
    }
  },
  filters: {
    formatDate(val) {
      return new Date(val).Format("MM-dd");
    },
    formatTime(val) {
      return new Date(val).Format("hh:mm");
    },
  },
  methods: {
    inputTime(rowItem, code, char) {
      if (rowItem[code] && rowItem[code].length>=5) {
        rowItem[code] = rowItem[code].substring(0, 5)
      } else if (
        rowItem[code].length == 2 && 
        rowItem[code].split('')[2] !== char
      ){
        let valueArr = rowItem[code].split('')
        valueArr.splice(2, 0, char)
        rowItem[code] = valueArr.join('')
        console.log(rowItem[code])
        this.$set(rowItem, code, valueArr.join(''))
      } else {
        this.lastValue = rowItem[code]
      }
    },
    onSelect(item) {
      this.$emit("update:selected", item);
      if(!item.dateStr){
        item.dateStr = new Date().Format("MM-dd");
      }
      if(!item.timeStr){
        item.timeStr = new Date().Format("hh:mm");
      }
    },
    handleBlur(item){
      console.log(item,'item')
    },
    onDblClick(item) {
      this.$emit("dblclick", item);
    },
    openSignModal() {
      window.openSignModal((password, empNo) => {
        apis.getUser(password, empNo).then((res) => {
          this.curEmpName = res.data.data.empName;
          this.curEmpNo = res.data.data.empNo;
        });
      });
    },
  },
  components: {},
};
</script>
