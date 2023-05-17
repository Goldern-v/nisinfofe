<template>
  <el-dialog
    :visible.sync="signListShow"
    custom-class="vital-list-dialog"
    :close-on-click-modal="false"
    @close="close"
    :append-to-body="false"
    modalClass="vital-list-modal"
  >
    <div style="display: flex;margin-bottom: 10px">
      <el-button @click="handleAddRow">添加一行</el-button>
      <el-button style="margin-left: 30px" @click="handleRemove">删除</el-button>
    </div>
    <div class="modal-table" :style="{ height: `${height}px` }">
      <div class="table__header-wrapper" ref="headerRef">
        <table class="table__header">
          <colgroup>
            <col width="38px"/>
            <col width="38px"/>
            <col width="38px"/>
            <col v-for="i in colLength" :key="'th' + i" width="37px"/>
            <col v-if="hasScroll" width="7px"/>
          </colgroup>
          <thead>
            <tr>
              <th rowspan="2"></th>
              <th rowspan="2">日期</th>
              <th rowspan="2">时间</th>
              <th :colspan="baseDictKey.length">生命体征</th>
              <th :colspan="otherDictKey.length">出入量</th>
              <th :colspan="customDictKey.length">自定义项目</th>
              <th v-if="hasScroll" rowspan="2"></th>
            </tr>
            <tr>
              <th v-for="(key, index) in baseDictKey" :key="key + index">
                {{ baseDictMap[key] }}
              </th>
              <th v-for="(key, index) in otherDictKey" :key="key + index">
                {{ otherDictMap[key] }}
              </th>
              <th v-for="(key, index) in customDictKey" :key="key + index" :ref="`th${index}`">
                <textarea
                  v-model="customDictMap[key].fieldCn"
                  style="color: blue"
                  :class="{
                    manyrows: isOverText(customDictMap[key].fieldCn, `th${index}`),
                  }"
                  @click="editCustomTitle(customDictMap[key].fieldCn, key)"
                ></textarea>

              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div ref="bodyRef" class="table__body-wrapper" :style="{ height: `${tableBodyHeight}px` }">
        <table v-if="tableData && tableData.length" class="table__body">
          <colgroup>
            <col width="38px"/>
            <col width="38px"/>
            <col width="38px"/>
            <col v-for="i in colLength" :key="'td' + i" width="37px"/>
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="'tr' + index" v-if="!item.isShow">
              <td><el-checkbox v-model="item.checked"></el-checkbox></td>
              <td>{{ item.recordMonth }}</td>
              <td>{{ item.recordHour }}</td>
              <td
                v-for="(key, tdIndex) in [...baseDictKey, ...otherDictKey, ...customDictKey]"
                :key="key + '-' + tdIndex"
                :ref="`td${index}-${tdIndex}`"
              >

<!--表顶，表底-->
                <div class="el-select" v-if="key =='3'">
                  <div class="el-select-input">
                    <input type="text"  v-model="item.vitals[key]" placeholder="" @click="item.expand1 = !item.expand1 ">
                  </div>
                  <ul v-if="item.expand1"
                      class="el-select-dropdown" >
                    <li v-for="itemLi in topRemarkObj" :key="itemLi+'c'" @click="item.expand1 = !item.expand1 ;item.vitals[key] =itemLi ">{{itemLi}}</li>
                  </ul>
                </div>
                <div class="el-select" v-else-if="key =='31'">
                  <div class="el-select-input">
                    <input type="text"  v-model="item.vitals[key]" placeholder="" @click="item.expand2 = !item.expand2 ">
                  </div>
                  <ul v-if="item.expand2"
                      class="el-select-dropdown" >
                    <li v-for="itemLi in bottomRemarkObj" :key="itemLi+'c'" @click="item.expand2 = !item.expand2 ;item.vitals[key] =itemLi ">{{itemLi}}</li>
                  </ul>
                </div>
                <textarea
                    v-else
                    @blur="handleChangeValue($event,key)"
                    v-model="item.vitals[key]"
                    :class="{
                    manyrows: isOverText(item.vitals[key], `td${index}-${tdIndex}`),
                  }"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <NullBg v-else></NullBg>
      </div>
    </div>
    <span class="footer-btn" slot="footer">
      <el-button @click="signListShow = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="onSave" v-if="tableData.length">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getTemperatureList, saveTemperatureList, savefieldTitleNew } from '../api/api.js';
import bus from "vue-happy-bus";
import moment from 'moment';
import NullBg from '@/components/null/null-bg.vue';
import {onFocusToAutoComplete} from '@/Page/sheet-page/components/sheetTable/components/excel/tool'
export default {
  components: { NullBg },
  props: {
    patientInfo: Object,
  },
  data() {
    return {
      height: 450,
      tableBodyHeight: 0,
      bus: bus(this),
      signListShow: false,
      baseDictMap: {},
      otherDictMap: {},
      customDictMap: {},
      tableData: [],
      patient: {
        patientId: '',
        visitId: '',
        wardCode: '',
      },
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: moment().format("HH:mm"), //录入时间
      },
      patientGroup4Expand3:[{name:'1',value:1}],
      setVitalSignObj:{},
      topRemarkObj:{},
      bottomRemarkObj:{}
    }
  },
  mounted() {
    this.bus.$on('getMultiDict', (data) => {
      this.baseDictMap = data.baseDictMap;
      this.otherDictMap = data.otherDictMap;
      this.customDictMap = data.customDictMap;
      console.log("data===",data)
    })
    this.bus.$on('watchQueryDate', (query) => {
      this.query.entryDate = query.entryDate;
      this.query.entryTime = query.entryTime;
    })
    this.calcTableBodyHeight();
    /*更新保存所需参数*/
    this.bus.$on('setVitalSignObj',(value)=>{
      this.setVitalSignObj =value
    })
    this.bus.$on('topRemark',(value)=>{
      this.topRemarkObj =value
    })
    this.bus.$on('bottomRemark',(value)=>{
      this.bottomRemarkObj =value
    })
  },
  computed: {
    baseDictKey() {
      return Object.keys(this.baseDictMap);
    },
    otherDictKey() {
      return Object.keys(this.otherDictMap);
    },
    customDictKey() {
      return Object.keys(this.customDictMap);
    },
    colLength() {
      return Object.keys(this.baseDictMap).length + Object.keys(this.otherDictMap).length + Object.keys(this.customDictMap).length;
    },
    bodyWrapper() {
      return this.$refs.bodyRef;
    },
    hasScroll() {
      const { bodyRef } = this.$refs;
      return bodyRef ? bodyRef.scrollHeight > bodyRef.clientHeight : false;
    }
  },
  watch: {
    tableData() {
      this.$nextTick(() => {
        this.calcTableBodyHeight();
        this.bindEvent();
      });
    }
  },
  methods: {
    handleAddRow(){
      const myArray =[...this.baseDictKey, ...this.otherDictKey, ...this.customDictKey];
      const myObject = {};
      for (let i = 0; i < myArray.length; i++) {
        myObject[myArray[i]] = '';
      }
      this.tableData.push({
        vitals:myObject,
        expand1:false, //表顶
        expand2:false, //表底
        isShow:false,//是否显示
        recordMonth: moment(new Date).format('MM-DD'),
        recordHour: moment(new Date).format('HH:mm'),
      })
    },
    handleRemove(){
      this.tableData = this.tableData.map((item)=>{
        item.isShow =item.checked
        return item
      })
    },
    handleChangeValue(event,key){
     Object.values(this.setVitalSignObj).map((item)=>{
        if(key == item.vitalCode){
           item.vitalValue = event.target.value
        }
       if (['体温', '口温', '肛温', '耳温'].includes(item.vitalSigns) && item.vitalValue && (item.vitalValue < 35 || item.vitalValue > 42)) {
         return this.$message.error("体温/口温/肛温/耳温数据范围限制35~42");
       }
      })
    },

    async onInit(data) {
      try {
        const res = await getTemperatureList(data);
        if (res.data.data.list && res.data.data.list.length) {
          this.patient = {
            patientId: res.data.data.patientId,
            visitId: res.data.data.visitId,
            wardCode: res.data.data.wardCode,
          }
          this.tableData = res.data.data.list.map(item => {
            return {
              ...item,
              expand1:false, //表顶
              expand2:false, //表底
              checked:false,
              recordMonth: moment(item.recordDate).format('MM-DD'),
              recordHour: moment(item.recordDate).format('HH:mm'),
            }
          });
        } else {
          this.tableData = [];
        }
      } catch (error) {
        console.log(error);
      }
      this.signListShow = true;
    },
    bindEvent() {
      const { headerRef, bodyRef } = this.$refs;
      bodyRef.addEventListener('scroll', function() {
        if (headerRef) headerRef.scrollLeft = this.scrollLeft;
      });
    },
    calcTableBodyHeight() {
      const tableHeaderRef = this.$refs.headerRef;
      if (tableHeaderRef) {
        const headerHeight = tableHeaderRef ? tableHeaderRef.offsetHeight : 0;
        this.tableBodyHeight = this.height - headerHeight;
      }
    },
    open(data) {
      this.onInit(data);
    },
    async onSave() {
      const params = {
        ...this.patient,
        list: this.tableData.map((item)=>{
          if(!item.recordDate){
            item.recordDate =moment(new Date).format('YYYY-MM-DD')+ " "  + item.recordHour + ':00'
          }
          if(item.isShow){
            item.vitals = {}
          }
          return item
        })
      }
      try {
        // 需要把数据更新后传递进行保存
        await saveTemperatureList(params);
        this.signListShow = false;
        this.bus.$emit('refreshSave')
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.signListShow = false;
    },
    isOverText(value, ref) {
      try {
        let inputWidth = this.$refs[ref][0].offsetWidth;
        let textWidth = value.split("").reduce((total, num) => {
          let charCode = num.charCodeAt(0);
          if (charCode >= 0 && charCode <= 128) return total + 5.9;
          else return total + 11.8;
        }, 0);

        if (textWidth > inputWidth) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    editCustomTitle(value, key) {
      window.openSetTextModalNew((text) => {
        const data = {
          patientId: this.patientInfo.patientId,
          visitId: this.patientInfo.visitId,
          wardCode: this.patientInfo.wardCode,
          vitalCode: key,
          fieldCn: text,
          recordDate:
            moment(this.query.entryDate).format("YYYY-MM-DD") + " " +
            this.query.entryTime,
        };
        savefieldTitleNew(data).then((res) => {
          this.customDictMap[key].fieldCn = text;
          this.$message.success(`修改${value}成功`);
        });
      }, value, `修改${value}`);
    }
  }
}
</script>

<style lang="stylus" scoped>
  /deep/.el-dialog__wrapper {
    z-index: 10001!important;
  }
  /deep/ .el-dialog--small {
    width: 80% !important;
  }
  .modal-table {
    height: 450px;
    width: 100%;
    overflow: hidden;
    position: relative;
    .table__header-wrapper {
      width: 100%;
      overflow: hidden;
      .table__header {
        border: 1px solid #444444;
      }
    }
    .table__body-wrapper {
      width: 100%;
      position: relative;
      overflow: auto;
      .table__body {
        border-left: 1px solid #444444;
      }
    }
  }
  table {
    border-collapse: separate;
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    color: #000;
    & thead {
      background: #f4f2f5;
    }
    &, tr, td, th {
      border-right: 1px solid #444444;
      border-bottom: 1px solid #444444;
    }
    td, th {
      height: 30px;
      text-align: center;
      vertical-align: middle;
      line-height: 14px;
      position: relative;
    }
    & tr:nth-child(even) {
      background: #f4f2f5;
    }
    & tr:hover {
      background: #e6e6e6;
    }
    & td, th {
      & textarea {
        overflow: hidden;
        line-height: 29px;
        height: 100% !important;
        width: 100% !important;
        max-height: 27px;
        resize: none;
        position: relative;
        top: 1px;
        border: 0 !important;
        padding: 0;
        box-sizing: border-box !important;
        outline: none !important;
        text-align: center;
        background: transparent;
        color: #000;
        font-size: 12px;

        &:focus {
          // background: #EEF6F5
          background: rgb(228, 241, 240);
        }
        &.manyrows {
          line-height: 30px !important;
        }
      }
    }
  }

  .el-select {
    position: relative;
    display: inline-block;
    font-size: 12px;
  }

  .el-select-input {
    position: relative;
    display: inline-block;
    width: 37px;
    height: 30px;
    /*border: 1px solid #ccc;*/
    /*border-radius: 4px;*/
    cursor: pointer;
    line-height: 30px;
    box-sizing: border-box;
  }

  .el-select-input input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }


  .el-select-dropdown {
    position: absolute;
    top: 60%;
    left: 30px;
    width: 60px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .el-select-dropdown li {
    padding:1px;
    cursor: pointer;
    line-height: 30px;
    box-sizing: border-box;
    font-size: 12px;
  }

  .el-select-dropdown li:hover {
    background-color: #f5f5f5;
  }

</style>
