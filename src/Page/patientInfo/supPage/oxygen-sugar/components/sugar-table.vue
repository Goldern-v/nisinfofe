<template>
  <div flex-box="1" class="table-box blood-sugar-table">
    <table>
      <tr>
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
          @click="onSelect(item,renderData,index)"
        >
          <td :style="getStyle(item.signerNo)" @keydown="onKeyDown($event,renderData,index,'dateStr')">
            <div class="cell noPrint">
              <!-- {{ item.date }} -->
              <input type="text" v-model="item.dateStr" :disabled="allowEdit(item.signerNo)" :style="getStyle(item.signerNo)"  :id="`P${pageIndex}-dateStr${index + baseIndex + 1}`" />
            </div>
            <div :class="['cell','inPrint']">
              {{item.dateStr}}
            </div>
          </td>
          <td :style="getStyle(item.signerNo)" @keydown="onKeyDown($event,renderData,index,'timeStr')">
            <div class="cell noPrint">
              <input type="text" v-model="item.timeStr" @input="inputTime(item,'timeStr',':')" :disabled="allowEdit(item.signerNo)" :style="getStyle(item.signerNo)"  :id="`P${pageIndex}-timeStr${index + baseIndex + 1}`"/>
            </div>
            <div :class="['cell','inPrint']">
              {{item.timeStr}}
            </div>
          </td>
          <td :style="getStyle(item.signerNo)" @keydown="onKeyDown($event,renderData,index,'sugarOxygen')">
            <div class="cell noPrint">
              <input type="text" v-model="item.sugarOxygen" :disabled="allowEdit(item.signerNo)" :style="getStyle(item.signerNo)"  :id="`P${pageIndex}-sugarOxygen${index + baseIndex + 1}`"/>
            </div>
             <div :class="['cell','inPrint']">
              {{item.sugarOxygen}}
            </div>
          </td>
          <td :style="getStyle(item.signerNo)" @keydown="onKeyDown($event,renderData,index,'heartRate')">
            <div class="cell noPrint">
              <input type="text" v-model="item.heartRate" :disabled="allowEdit(item.signerNo)" :style="getStyle(item.signerNo)"  :id="`P${pageIndex}-heartRate${index + baseIndex + 1}`"/>
            </div>
             <div :class="['cell','inPrint']">
              {{item.heartRate}}
            </div>
          </td>
          <td>
            <div class="cell noPrint"  @click="openSignModal(item)">
              <img
                style="width: 65%; height: 80%;"
                :src="`/crNursing/api/file/signImage/${item.signerNo}?${token}`"
                :alt="item.signerNo"
                v-if="item.signerNo"
              /></div>
            <div :class="['cell','inPrint']">
              <!-- {{item.nurseEmpNo}} -->
              <img
                style="width: 65%; height: 80%;"
                :src="`/crNursing/api/file/signImage/${item.signerNo}?${token}`"
                :alt="item.signerNo"
                v-if="item.signerNo"
              />
            </div>
          </td>
        </tr>

    </table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
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
      height: 28px;
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
        height: 80%;
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
    // line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inPrint {
    display: none;
    img{
      width: 65%;
      height: 80%;
    }

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
import {getCursortPosition} from '@/Page/sheet-page/components/sheetTable/components/excel/tool.js'

export default {
  props: {
    data: Array,
    selected: Object,
    baseIndex:Number,
    patientInfo:Object,
    saveParams:Object,
    isToPrint:Boolean,
    pageIndex:Number
  },
  mixins: [common],
  data() {
    return {
      msg: "hello vue",
      activeIndex:''
    };
  },
  computed: {
    renderData() {
      if (!this.data) return;
      let renderData = [];
      let firstDate = "";
      // console.log(this.data,"this.data")
      if(this.data.length == 0){
        while (renderData.length <= 26) {
          renderData.push( {dateStr:'',timeStr:'',sugarOxygen:'',heartRate:'',signerNo :'',patientId:this.patientInfo.patientId,visitId:this.patientInfo.visitId});
        }
      }else{
        // console.log(this.data,"this.data")
        renderData=Array.from({length: 27}, () => {
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
    getStyle(sign) {
      if (sign) {
        if (this.HOSPITAL_ID === 'whfk') {
          if (this.isRoleManage) {
            return {}
          }
        }
        return { cursor: 'not-allowed' }
      }
      return {}
    },
    allowEdit(sign) {
      if (sign) {
        if (this.HOSPITAL_ID === 'whfk') {
          if (this.isRoleManage) {
            return false
          }
        }
        return true
      }
      return false
    },
    onKeyDown(e,list,index,type){
      const typeList=['dateStr','timeStr','sugarOxygen','heartRate']
      const nowInput=document.getElementById(`P${this.pageIndex}-${type}${this.activeIndex + this.baseIndex + 1}`)
      const typeIndex = typeList.findIndex(v => v==type)
      if(e.keyCode==38){//上
        if(this.activeIndex==0) return
        this.activeIndex=+this.activeIndex-1
        this.onSelect(list[this.activeIndex])
        document.getElementById(`P${this.pageIndex}-${type}${this.activeIndex + this.baseIndex + 1}`).focus()
      }else if(e.keyCode==40){//下
        if(this.activeIndex==26) return
        this.activeIndex=this.activeIndex+1
        this.onSelect(list[this.activeIndex],list)
        document.getElementById(`P${this.pageIndex}-${type}${this.activeIndex + this.baseIndex + 1}`).focus()
      }else if(e.keyCode==37){// 左
         if(type=='dateStr') return
         if(getCursortPosition(nowInput)<=0){
           e.preventDefault();
           document.getElementById(`P${this.pageIndex}-${typeList[typeIndex-1]}${this.activeIndex + this.baseIndex + 1}`).focus()
         }
      }else if(e.keyCode==39){// 右
         if(type=='heartRate') return
         if (getCursortPosition(nowInput) >= nowInput.value.length) {
          e.preventDefault();
          document.getElementById(`P${this.pageIndex}-${typeList[typeIndex+1]}${this.activeIndex + this.baseIndex + 1}`).focus()
         }
      }
    },
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
    onSelect(item,renderData,index) {
      if(index||index==0){
        this.activeIndex=index
      }
      this.$emit("renderData",item, renderData);
      this.$emit("update:selected",item);
      if(!item.dateStr){
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
            console.log(itemRow.sugarOxygen, 1111);
            if(itemRow.sugarOxygen){
              apis.rowSign(this.saveParams, this.HOSPITAL_ID == 'whfk' ? 'eval' : 'others', fkformCode).then((res) => {
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
            }else{
               this.$message({
                    message: '血氧未填写数据',
                    type: 'warning'
                  })
            }
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
              apis.cancelRowSign(this.saveParams, this.HOSPITAL_ID == 'whfk' ? 'eval' : 'others',fkformCode).then((res) => {
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
