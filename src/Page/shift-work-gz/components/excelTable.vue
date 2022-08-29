<template>
  <div>
    <table>
      <colgroup>
        <col width="40" v-for="(item, index, key) of columns[0]" :key="key" />
      </colgroup>
      <tbody>
        <tr v-for="(column,index) in columns" :key="index">
          <td class="text-center" v-for="(item,itemIndex) in column" :key="itemIndex" :colspan="item.colspan || 1" :style="{'text-align': item.align || 'left'}">
            <div v-if="!item.editable">{{item.label||data.changeShiftTimes[item.prop]}}</div>
            <div v-else>
              <label>
                <el-input
                  autosize
                  class="textarea"
                  type="textarea"
                  v-model="data.changeShiftTimes[item.prop]"
                  :disabled="!editable"
                  @change="
                    onInputChange(
                      $event,
                      data.changeShiftTimes[item.prop],
                      item.prop
                    )
                  "
                  @keydown.native="
                    onInputKeydown(
                      $event,
                      data.changeShiftTimes[item.prop],
                      item.prop
                    )
                  "
                />
              </label>
            </div>

          </td>
        </tr>
        <tr v-for="(column,index) in data.changeShiftContents" :key="index+13">
          <td class="text-center" :colspan="1" :style="{'text-align':'center'}">
            <div>
              <label>
                <el-input
                  autosize
                  class="textarea"
                  type="textarea"
                  v-model="column.name"
                  :disabled="!editable"
                  @change="onInputChange()"
                  @keydown.native="specialChange"
                />
              </label>
            </div>
          </td>
           <td class="text-center" :colspan="3" :style="{'text-align':'left'}">
            <div>
              <label>
                <el-input
                  autosize
                  class="textarea"
                  type="textarea"
                  v-model="column.content"
                  :disabled="!editable"
                  @change="onInputChange()"
                  @keydown.native="specialChange"
                />
              </label>
            </div>
            <button class="remove-td" @click="removeCurrent(index)"><i class="el-icon-close"></i></button>
          </td>

        </tr>
        <!-- <tr v-for="(item, key) of formData.contents" :key="key">
          <td v-for="(option, colIndex) of item" :key="colIndex" :colspan="5">
             <label>
              <span>{{key}}:</span>
              <el-input
                autosize
                class="textarea"
                type="textarea"
                v-model="data.changeShiftTimes[option]"
                :disabled="!editable"
                @change="
                  onInputChange(
                    $event,
                    data.changeShiftTimes[option],
                    option,
                    key,
                    colIndex
                  )
                "
                @keydown.native="
                  onInputKeydown(
                    $event,
                    data.changeShiftTimes[option],
                    option,
                    key,
                    colIndex
                  )
                "
              />
            </label>
          </td>
        </tr> -->
        <!-- <tr v-for="(item, key) in formList" :key="key">
          <td class="text-center">{{key}}</td>
          <td :colspan="columns[0].length">
            <div v-if="item.format == 'inline'">
              <span v-for="(patItem, index) in item.list" :key="index">
                <span v-if="index !== 0">、</span>
                <span>{{patItem.bedLabel}}床 {{patItem.name}}</span>
              </span>
            </div>
            <div class="edit-area" v-else-if="item.format == 'inline-block'">
              <div
                v-for="(patItem, index) in item.list"
                :key="index"
                :style="index === 0 && {borderTop:'0'}"
                class="inline-block-con"
                @click="openSetInfoModal(patItem, key)"
              >
                <span>
                  {{`${patItem.bedLabel}床 ${patItem.name} ${patItem.remark1 || ''} ${patItem.diagnosis ||
                  ""}`}}
                </span>
              </div>
            </div>
            <div class="edit-area" v-else-if="item.format == 'block'">
              <div
                v-for="(patItem, index) in item.list"
                :key="index"
                :style="index === 0 && {borderTop:'0'}"
                class="block-con"
                @click="openSetInfoModal(patItem, key)"
              >
                <span>
                  {{`${patItem.bedLabel}床 ${patItem.name} ${patItem.diagnosis ||
                  ""}`}}
                </span>
                <div v-if="key && patItem.remark1">
                  <span style="padding-left: 30px"></span>
                  {{`${patItem.remark1 || ""}`}}
                </div>
              </div>
            </div>
          </td>
        </tr> -->
         <!-- <tr class="normal-row">
          <td :colspan="columns[0].length+1" class="special-case-title" data-print-style="border-bottom: none;">
            <span
              class="row-action"
              @click="addDescription"
              data-print-style="display: none;"
            >+添加特殊记录</span>
          </td>
        </tr> -->
        <!-- <tr>
          <td class="text-center">特殊记录</td>
          <td :colspan="15" @click="openSpecialTextModal">
            <pre class="pre edit-area" v-html="specialTxt"></pre>
          </td>
        </tr> -->
        <!-- <tr >
          <td class="text-center">特殊记录</td>
          <td :colspan="columns[0].length">
            <div class="edit-area description">
              <div v-for="(item, index) in changeShiftContents"
                :key="index"
                :style="index === 0 && {borderTop:'0'}"
                class="block-con">
                <i class="el-icon-close" @click="delDescription(item.id)" v-if="index != 0"></i>
                <pre class="pre edit-area" v-html="item.content" @click="openSpecialTextModal(index)"></pre>
              </div>
            </div>
          </td>
        </tr> -->
      </tbody>
    </table>
    <div class="add-special" @click="addSpecial" v-show="!isPrintShiftWork"> + 添加特殊</div>
    <setInfoModal ref="setInfoModal"></setInfoModal>
    <specialTextModal ref="specialTextModal"></specialTextModal>
  </div>
</template>

<script>
function initFormData(data = {}) {
  return {
    // trends: [
    //   ["班别", "A班", "P班", "N班"],
    //   ["原有", data.aOrigin, data.pOrigin, data.nOrigin],
    //   ["出院", data.aDischarge, data.pDischarge, data.nDischarge],
    //   ["转出", data.aTransOut, data.pTransOut, data.nTransOut],
    //   ["死亡", data.aDead, data.pDead, data.nDead],
    //   ["入院", data.aAdmission, data.pAdmission, data.nAdmission],
    //   ["转入", data.aTransIn, data.pTransIn, data.nTransIn],
    //   ["手术", data.aOperation, data.pOperation, data.nOperation],
    //   ["分娩", data.aBorn, data.pBorn, data.nBorn],
    //   ["预手术", data.aPreOperation, data.pPreOperation, data.nPreOperation],
    //   ["病危", data.aDanger, data.pDanger, data.nDanger],
    //   ["病重", data.aSerious, data.pSerious, data.nSerious],
    //   ["特护", data.aSpecial, data.pSpecial, data.nSpecial],
    //   ["一级", data.aFirst, data.pFirst, data.nFirst],
    //   ["现有", data.aNow, data.pNow, data.nNow]
    // ],
    // contents: {
    //   自动外出: [data.aSelfOut, data.pSelfOut, data.nSelfOut],
    //   未完成输液者: [data.aUnfinished, data.pUnfinished, data.nUnfinished],
    //   动静脉置管护理: [data.aVein, data.pVein, data.nVein],
    //   留置引流管护理: [data.aUrine, data.pUrine, data.nUrine],
    //   鼻饲护理: [data.aNose, data.pNose, data.nNose],
    //   吸氧护理: [data.aOxygen, data.pOxygen, data.nOxygen],
    //   其他: [data.aOther, data.pOther, data.nOther]
    // },
    contents: {
      自动外出: ['aSelfOut', 'pSelfOut', 'nSelfOut'],
      未完成输液者: ['aUnfinished', 'pUnfinished', 'nUnfinished'],
      动静脉置管护理: ['aVein', 'pVein', 'nVein'],
      留置引流管护理: ['aUrine', 'pUrine', 'nUrine'],
      鼻饲护理: ['aNose', 'pNose', 'nNose'],
      吸氧护理: ['aOxygen', 'pOxygen', 'nOxygen'],
      其他: ['aOther', 'pOther', 'nOther']
    },
    typeList: {
      病危: data.typeDanger || "",
      病重: data.typeSerious || "",
      出院1: data.typeDischarge || "",
      转出: data.typeTransOut || "",
      入院: data.typeAdmission || "",
      转入: data.typeTransIn || "",
      手术: data.typeOperation || "",
      预手术: data.typePreOperation || ""
    }
  };
}

function initFormList(list) {
  // let _list = list.sort((a, b) => a.bedLabel - b.bedLabel);
  let formList = {
    // 出院: {
    //   list: [],
    //   format: "inline"
    // },
    // 转出: {
    //   list: [],
    //   format: "inline"
    // },
    // 入院: {
    //   list: [],
    //   format: "inline-block"
    // },
    // 转入: {
    //   list: [],
    //   format: "inline-block"
    // },
    手术患者: {
      list: [],
      format: "block"
    },
    急诊病人: {
      list: [],
      format: "block"
    },
    ICU转入病人: {
      list: [],
      format: "block"
    },
    危急值病人: {
      list: [],
      format: "block"
    }
  };
  for (let item of list) {
    formList[item.status] && formList[item.status].list.push(item);
  }
  return formList;
}

// function initChangeShiftContents(arr){
//  return arr.map(item=>{
//     let str =
//         '<div class="patient-detail">' +
//         item.content.replace(
//           /\n\n/g,
//           '</div><br/><div class="patient-detail">'
//         ) +
//         "</div>";
//       let obj = {...item};
//       obj.content = str.replace(/\n/g, "<br/>");
//       return obj;
//   });
// }

import setInfoModal from "../modal/set-info-modal";
import specialTextModal from "../modal/special-text-modal";
import { delContentById } from "../apis";
import bus from "vue-happy-bus";
export default {
  props: {
    isPrintShiftWork:{
      type:Boolean,
      value:false
    },
    data: {
      type: Object,
      default: {}
    },
    editable: {
      type: Boolean,
    },
  },
  data() {
    let data = this.data;
    return {
      bus: bus(this),
      formData: initFormData(data.changeShiftTimes),
      // formList: initFormList(data.changeShiftPatientLists),
      // changeShiftContents: initChangeShiftContents(data.changeShiftContents),
      // changeShiftContents:[],
      columns: [
        [
          {
            label: "患者总数",
            prop: "allTotal",
            editable: false,
            align: "left",
            width: "40",
            // rowspan: 2,
            // render: (row) => {
            //   return "患者总数";
            // },
          },
          {
            label: "",
            prop: "allTotal",
            editable: false,
            align: "left",
            width: "40",
            // rowspan: 2,
            // render: (row) => {
            //   return "患者总数";
            // },
          },
          {
            label: "新入院患者",
            prop: "patientNew",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientNew",
            editable: false,
            align: "left",
            width: "40"
          }
        ],
        [
          {
            label: "出院患者",
            prop: "patientOut",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientOut",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "一级护理",
            prop: "patientYi",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientYi",
            editable: false,
            align: "left",
            width: "40"
          }
        ],
        [
          {
            label: "病危患者",
            prop: "patientBw",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientBw",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "转出患者",
            prop: "patientTransferOut",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientTransferOut",
            editable: false,
            align: "left",
            width: "40"
          }
        ],
        [
          {
            label: "ICU转入",
            prop: "patientTransferIn",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientTransferIn",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "死亡患者",
            prop: "patientDead",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientDead",
            editable: false,
            align: "left",
            width: "40"
          }
        ],
        [
          {
            label: "输血患者",
            prop: "patientTransfusion",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientTransfusion",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "危急值患者",
            prop: "patientCritical",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "",
            prop: "patientCritical",
            editable: false,
            align: "left",
            width: "40"
          }
        ],
        [
          {
            label: "新入院",
            prop: "remark1",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "新入院",
            prop: "remark1",
            editable: true,
            align: "left",
            width: "40",
            colspan: 3
          }
        ],
        [
          {
            label: "手术",
            prop: "remark2",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "手术",
            prop: "remark2",
            editable: true,
            align: "left",
            width: "40",
            colspan: 3
          }
        ],
        [
          {
            label: "拟今日手术",
            prop: "remark3",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "拟今日手术",
            prop: "remark3",
            editable: true,
            align: "left",
            width: "40",
            colspan: 3
          }
        ],
        [
          {
            label: "危重",
            prop: "remark4",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "危重",
            prop: "remark4",
            editable: true,
            align: "left",
            width: "40",
            colspan: 3
          }
        ],
        [
          {
            label: "死亡",
            prop: "remark5",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "死亡",
            prop: "remark5",
            editable: true,
            align: "left",
            width: "40",
            colspan: 3
          }
        ],
        [
          {
            label: "特殊记录",
            prop: "remark6",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "特殊记录",
            prop: "remark6",
            editable: true,
            align: "left",
            width: "40",
            colspan: 3
          }
        ],
        [
          {
            label: "急救车使用",
            prop: "remark7",
            editable: false,
            align: "left",
            width: "40"
          },
          {
            label: "急救车使用",
            prop: "remark7",
            editable: true,
            align: "left",
            width: "40",
            colspan: 3
          }
        ]
      ]
    };

    //  手术患者: {
    //   list: [],
    //   format: "block"
    // },
    // 急诊病人: {
    //   list: [],
    //   format: "block"
    // },
    // ICU转入病人: {
    //   list: [],
    //   format: "block"
    // },
    // 危急值病人: {
    //   list: [],
    //   format: "block"
    // }
  },
  computed: {
    // specialTxt() {
    //   let str =
    //     '<div class="patient-detail">' +
    //     this.data.changeShiftTimes.specialRecords.replace(
    //       /\n\n/g,
    //       '</div><br/><div class="patient-detail">'
    //     ) +
    //     "</div>";
    //   return str.replace(/\n/g, "<br/>");
    // },
  },
  mounted(){
    //这边进行输血患者，病危患者数据处理 const {patientTransfusion,patientCritical} = changeShiftTimes
    // this.data.changeShiftTimes.patientTransfusion=''

    // 兼容之前填写的数据（把之前填写的数据再次填写到新数组）
    // if(!this.changeShiftContents.length){
    //   let specialRecords = this.data.changeShiftTimes.specialRecords || ''
    //   let str =
    //   '<div class="patient-detail">' +
    //     specialRecords.replace(
    //     /\n\n/g,
    //     '</div><br/><div class="patient-detail">'
    //   ) +
    //   "</div>";
    //   this.changeShiftContents.push(
    //     {
    //       changeShiftTimeId:this.data.changeShiftTimes.id,
    //       content:str.replace(/\n/g, "<br/>"),
    //       sortValue:this.changeShiftContents.length
    //     }
    //   );
    // }
  },
  methods: {
    removeCurrent(index){
      this.data.changeShiftContents.splice(index,1)
    },
    specialChange(e){
      console.log(e);
    },
    // 添加特殊记录事件
    addSpecial(){
      // console.log(this.columns);
      let temp = JSON.parse(JSON.stringify(this.data.changeShiftContents))
      temp.push({"changeShiftTimeId": this.data.changeShiftTimes.id,"name": "","content": "","sortValue": 1})
      this.data.changeShiftContents = [...temp]
    },
    /** 解析病人信息添加数据 */
    openSetInfoModal(item, key) {
      let data = {
        status: item.status,
        pat: `${item.bedLabel}床 ${item.name} ${item.sex} ${item.age}`,
        diagnosis: item.diagnosis
      };
      data.remark = item.remark1;

      this.$refs.setInfoModal.open(data, obj => {
        obj.remark1 = obj.remark;
        // Object.assign(item, obj);
        // this.$emit("save");
      });
    },
    openSpecialTextModal(index) {
      let data = {
        specialRecords: this.data.changeShiftContents[index] ? this.data.changeShiftContents[index].content : index == 0 && this.data.changeShiftTimes.specialRecords ? this.data.changeShiftTimes.specialRecords : ''
      };
      this.$refs.specialTextModal.open(data, obj => {
        if(this.data.changeShiftContents[index]){
          this.data.changeShiftContents[index].content = obj.specialRecords;
        }else {
          // 兼容之前填写的数据（把之前填写的数据再次填写到新数组）
          if(this.data.changeShiftTimes.specialRecords && index != 0){
            this.data.changeShiftContents.push(
              {
                changeShiftTimeId:this.data.changeShiftTimes.id,
                content:this.data.changeShiftTimes.specialRecords,
                sortValue:this.data.changeShiftContents.length
              }
            );
          }
          this.data.changeShiftContents.push(
            {
              changeShiftTimeId:this.data.changeShiftTimes.id,
              content:obj.specialRecords,
              sortValue:this.data.changeShiftContents.length
            }
         );
         this.data.changeShiftTimes.specialRecords = '';
       };
       this.$emit("save");
      });
    },
    addDescription(){
      let obj = {
        changeShiftTimeId:this.data.changeShiftTimes.id,
        content:"",
        sortValue:this.changeShiftContents.length
      };
      this.changeShiftContents.push(obj);
    },
    delDescription(id){
      delContentById(id).then(res=>{
        this.$message.success("删除成功");
        this.bus.$emit("updateTable");
      })
    },
    onInputChange() {
      this.$emit("input-change");
    },
    onInputKeydown(event, value, prop, row, col) {
      this.$emit("input-keydown", { event, value, prop, row, col });
    },
  },
  filters: {},
  components: {
    setInfoModal,
    specialTextModal
  },
  watch:{
    'data.changeShiftContents':{
      handler(newValue,oldValue){},
      deep:true,
      immediate:true,
    }
  },
};
</script>

<style lang='stylus' scoped>
table {
  border-collapse: collapse;
  width: 100%;

  th, td {
    height: 38px;
    border: 1px solid #444444;
    font-size: 14px;
    vertical-align: middle;
    line-height: 14px;
    box-sizing: border-box;
    color: #000;
    padding: 0 5px;

    &.text-center {
      text-align: center;
    }
    position:relative;
    .remove-td{
      position:absolute;
      top:0;
      right:0;
      margin-top:7px;
    }
  }
  label {
    display: flex;
    align-items: center;
    // margin-top -4px
    // margin-bottom -4px
    height: 100%;
    width: 100%;
    .el-textarea {
      flex: 1;
    }
  }
  >>>textarea, >>>pre {
    display: block;
    // padding 8px 4px
    padding: 4px;
    margin: 0;
    width: 100%;
    min-height: 15px;
    box-sizing: border-box;
    border: none !important;
    outline: none !important;
    resize: none;
    background: none !important;
    color: black !important;
    overflow: hidden;
    text-align: inherit;
    cursor: auto !important;

    &:disabled {
      color: black;
      background: none;
    }
  }
}
.add-special{
  margin-top:10px;
  font-size:13px;
  color:#284fc2;
  text-align:right;
  cursor:pointer;
}
.title-1 {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 14px;
  color: #000;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  letter-spacing: 2px;
  width: 70px;
}

.title-2 {
  position: absolute;
  right: 20px;
  top: 180px;
  font-size: 14px;
  color: #000;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  letter-spacing: 2px;
  width: 40px;
}

.title-3 {
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 14px;
  color: #000;
  font-weight: bold;
  text-align: left;
  line-height: 20px;
  letter-spacing: 2px;
}

.inline-block-con {
  border-top: 1px solid #000;
  margin: 0 -5px;
  min-height: 24px;
  line-height: 24px;
  padding: 5px 5px;
}

.block-con {
  border-top: 1px solid #000;
  margin: 0 -5px;
  // min-height: 30px;
  line-height: 22px;
  padding: 5px 5px;
}

.edit-area {
  .block-con, .inline-block-con {
    &:first-of-type {
      border-top: none;
    }
  }
  &.description {
    .block-con {
      min-height: 38px;
      box-sizing: border-box;
      position: relative;
    }
    .pre {
      padding-right: 44px;
    }
    .el-icon-close {
      padding: 0 15px;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      height: 38px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
  }
}

.pre {
  border: 0;
  outline: 0;
  color: #000;
  font-size: 14px;
  padding: 0;
  line-height: 22px;
  white-space: pre-wrap;
  min-height: 22px;
  flex: 1;
  >>> .patient-detail {
    min-height: 22px;
  }
}
.row-action {
  float: right;
  color: #284fc2;
  cursor: pointer;
}
</style>
