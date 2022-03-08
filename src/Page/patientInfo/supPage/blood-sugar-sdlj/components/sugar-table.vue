<template>
  <div flex-box="1" class="table-box blood-sugar-table">
    <table>
      <colgroup>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
        <col width="7.14%"/>
      </colgroup>
      <tr>
        <th rowspan="3">日期</th>
        <th colspan="9">血糖(mmol/L)</th>
        <th colspan="4">胰岛素用量</th>
      </tr>
      <tr>
        <th colspan="3">餐前</th>
        <th colspan="3">餐后2小时</th>
        <th rowspan="2">睡前</th>
        <th colspan='2'>随机血糖</th>
        <th rowspan="2">早</th>
        <th rowspan="2">中</th>
        <th rowspan="2">晚</th>
        <th rowspan="2">睡前</th>
      </tr>
      <tr>
        <th>早</th>
        <th>中</th>
        <th>晚</th>
        <th>早</th>
        <th>中</th>
        <th>晚</th>
        <th>时间</th>
        <th>数值</th>
      </tr>
      <tr
        v-for="(item,index) in renderData"
        :class="{ selected: selected === item }"
        :key="index+'item.sugarValue'"
        @click="onSelect(item,renderData)"
      >
        <td v-for="(items, idx) in tdArr" :key="idx + 'td'">
          <div class="cell noPrint">
            <!-- {{ item.date }} -->
            <input type="text" v-model="item[tdArr[idx]]" v-if="tdArr[idx] === 'timeStr'" @input="inputTime(item,'timeStr',':')" />
            <input type="text" v-model="item[tdArr[idx]]" v-else />
          </div>
          <div :class="['cell','inPrint']">
            {{item[tdArr[idx]]}}
          </div>
        </td>
        <!-- <td>
          <div class="cell noPrint">
            <input type="text" v-model="item.timeStr" @input="inputTime(item,'timeStr',':')" />
          </div>
          <div :class="['cell','inPrint']">
            {{item.timeStr}}
          </div>
        </td> -->

        <!-- <td>
          <div class="cell noPrint">
            <input type="text" v-model="item.sugarOxygen" /> 
          </div>
            <div :class="['cell','inPrint']">
            {{item.sugarOxygen}}
          </div>
        </td>
        <td>
          <div class="cell noPrint">
            <input type="text" v-model="item.heartRate" />
          </div>
            <div :class="['cell','inPrint']">
            {{item.heartRate}}
          </div>
        </td>
        <td>
          <div class="cell noPrint">
            <input type="text" v-model="item.heartRate"/>
          </div>
            <div :class="['cell','inPrint']">
            {{item.heartRate}}
          </div>
        </td> -->
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
    .saveRed{
        border:1px solid red;
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
        width: 65%;
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
import { length } from 'sockjs-client/lib/transport-list';
export default {
  props: {
    data: Array,
    selected: Object,
    baseIndex:Number,
    patientInfo:Object,
    saveParams:Object,
    isToPrint:Boolean,
  },
  mixins: [common],
  data() {
    return {
      // msg: "hello vue",
      tdArr: ['dateStr', '1', '2', '3', '4', '5', '6', '7', 'timeStr', '9', '10', '11', '12', '13']
    };
  },
  computed: {
    renderData() {
      if (!this.data) return;
      let renderData = [];
      let firstDate = "";
      // console.log(this.data,"this.data")
      if(this.data.length == 0){
        while (renderData.length <= 14) {
          renderData.push( {dateStr:'',timeStr:'',sugarOxygen:'',heartRate:'',signerNo :'',patientId:this.patientInfo.patientId,visitId:this.patientInfo.visitId});
        }
      }else{
        // console.log(this.data,"this.data")
        renderData=Array.from({length: 15}, () => {
            return {dateStr:'',timeStr:'',sugarOxygen:'',heartRate:'',signerNo :'',patientId:this.patientInfo.patientId,visitId:this.patientInfo.visitId}
          })
        this.data.map((item,index)=>{
          renderData[index] = item
        })
      }
      return renderData;
    },
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
      console.log(rowItem, code, char, 9998)
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
    onSelect(item,renderData) {
      console.log(renderData)
      this.$emit("renderData",item, renderData);
      this.$emit("update:selected",item);
      if(!item.dateStr){
        console.log(item,1121)
        item.dateStr = new Date().Format("yyyy-MM-dd");
      }
      if(!item.timeStr){
        item.timeStr = new Date().Format("hh:mm");
      }
    },
    onDblClick(item) {
      this.$emit("dblclick", item);
    },
    openSignModal(itemRow) {
      if(!itemRow.signerNo){
          window.openSignModal((password, empNo) => {
            this.saveParams.empNo = empNo;
            this.saveParams.password = password;
            this.saveParams.list = [itemRow];
            let fkformCode = 'sugar_oxygen'
            itemRow.signerNo
              apis.rowSign(this.saveParams,'others',fkformCode).then((res) => {
                // console.log(res)
                if(res.data.code == 200 && res.data.data != null){
                  itemRow = res.data.data[0]
                  this.$message({
                    message: '签名成功',
                    type: 'success'
                  })
                  this.$emit('refresh')
                }
              });
          });
          }else{
            console.log(window.app.$refs,'window')
            /**行数据取消签名 */
            // export const cancelRowSign = (params, formType, formCode) => {
            //   return axios.post(`${apiPath}${formType}/${formCode}/cancelSign`, params)
            // }
             window.openSignModal((password, empNo) => {
            this.saveParams.empNo = empNo;
            this.saveParams.password = password;
            this.saveParams.list = [itemRow];
            let fkformCode = 'sugar_oxygen'
            itemRow.signerNo
              apis.cancelRowSign(this.saveParams,'others',fkformCode).then((res) => {
                // console.log(res)
                if(res.data.code == 200 && res.data.data != null){
                  itemRow = res.data.data[0]
                  this.$message({
                    message: '取消签名成功',
                    type: 'success'
                  })
                  this.$emit('refresh')
                }
              });
          },'取消签名');
           
          }
    },
  },
  components: {},
};
</script>
