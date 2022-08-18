<template>
  <div flex-box="1" class="table-box blood-sugar-table">
    <table>
      <tr>
        <th style="width: 2%; min-width: 20px">序号</th>
        <th style="width: 23%; min-width: 75px">时间</th>
        <th style="width: 20%">项目</th>
        <th style="width: 23%">血糖值<br />(mmol/L)</th>
        <th style="width: 18%">尿酮值<br/>(mmol/L)</th>
        <th style="width: 14%">执行人</th>
      </tr>
      <tr
        v-for="(item,index) in renderData"
        :class="{ selected: selected === item }"
        :key="item.recordDate"
        @click="onSelect(item)"
        @dblclick="onDblClick(item)"
      >
        <td>
          {{index + baseIndex + 1}}
        </td>
        <td style="padding: 0 4px" @click="setDate(item, index)">
          <div class="cell noPrint">
            <!-- <span>{{ item.date }}</span> -->
            <input type="text" v-model="item.date" :class="{ selected: selected === item }" />
            <!-- <span>
              <span>{{ item.time }}</span>
            </span> -->
          </div>
          <div class="cell inPrint" :title="item.date">
            {{ item.date }}
          </div>
        </td>
        <td>
          <div class="cell noPrint" :title="item.sugarItem">
            <!-- {{ item.sugarItem }} -->
            <ElSelect
              v-model="item.sugarItem"
              placeholder=""
              size="mini"
              :popperClass="selected === item ? 'selected' : ''"
            >
              <ElOption
                v-for="item in sugarItem"
                :key="item.vitalSign"
                :label="item.vitalSign"
                :value="item.vitalSign"
              />
            </ElSelect>
          </div>
          <div class="cell inPrint" :title="item.sugarItem">
            {{ item.sugarItem }}
          </div>
        </td>
        <td>
          <div class="cell noPrint">
            <input :class="{ selected: selected === item }" v-model="item.sugarValue"/>
          </div>
          <div class="cell inPrint">
            {{ item.sugarValue && item.sugarValue !== "0" ? item.sugarValue : "" }}
          </div>
        </td>
        <td>
          <div class="cell noPrint">
            <!-- {{ item.riValue && item.riValue !== "0" ? item.riValue + " ü" : "" }} -->
            <input :class="{ selected: selected === item }" v-model="item.expand1"/>
          </div>
          <div class="cell inPrint">
            {{ item.expand1 && item.expand1 !== "0" ? item.expand1 : "" }}
          </div>
        </td>
        <!-- <td>
          <div class="cell noPrint sign-cell" @click="sign(item)">{{ item.nurse }}</div>
          <div :class="['cell','inPrint']">
            {{item.nurseEmpNo}}
           img
              :src="`/crNursing/api/file/signImage/${item.nurseEmpNo}?${token}`"
              :alt="item.nurse"
              v-if="item.nurseEmpNo"
            />
          </div>
        </td> -->
        <td >
          <div class="cell sign-con" @click="sign(item)">
            <!-- 这里改。-->
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
      &:hover .cell input {
        background: #e6e6e6;
      }
      &:hover .cell >>> .el-input__inner {
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
      .sign-cell {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
      }
      .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // max-width: 74px;
        input {
          width: 100%;
          padding: 2px 0px;
          border: none;
          outline: none;
          font-size: inherit;
          text-align: center;
          &.selected {
            background: #FFF8B1;
          }
        }
      }

      .sign-con {
        max-width: 52px;
      }

      img {
        width: 100%;
        height: 100%;
        //object-fit: cover;
        object-fit: contain !important;
        -webkit-object-fit: contain!important;
      }
      .imgsdlj {
        width: 40px;
        height: 100%;
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

  .inPrint {
    display: none;

    &.lc {
      height: 29px;
    }
  }
  .selected >>> .el-input__inner {
    background: #FFF8B1!important;
  }
  .el-select {
    >>>.el-input__icon {
      display: none;
    }
    >>>.el-input__icon + .el-input__inner {
      padding-right: 0px;
    }
    >>>.el-input__inner {
      padding: 0px;
      padding-right: 0px;
      border: none;
      text-align: center;
      color: #000;
    }
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import moment from 'moment'
import * as apis from "../api";
import {
  saveSugarList,
  getSugarListWithPatientId,
  getPvHomePage,
  removeSugar,
} from "../api/index.js";
export default {
  props: {
    data: Array,
    selected: Object,
    baseIndex:Number,
    sugarItem: Array
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
      // let firstDate = "";
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].md = new Date(this.data[i].recordDate).Format("yyyy-MM-dd hh:mm");
        let obj = this.data[i];
        let date = this.data[i].md.split(" ")[0];
        let time = this.data[i].md.split(" ")[1];
        // if (firstDate != date) {
          obj.date = date;
        // } else {
        //   obj.date = "";
        // }
        // firstDate = date;
        obj.time = time;
        renderData.push(obj);
      }
      while (renderData.length <= 26) {
        renderData.push({});
      }
      // console.log(renderData);
      return renderData;
    },
    patientInfo() {
      return this.$route.query;
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
    onSelect(item) {
      this.$emit("update:selected", item);
    },
    onDblClick(item) {
      this.$emit("dblclick", item);
    },
    openSignModal() {

    },
    setDate(item, index) {
      if(!item.date && !item.time) {
        if(item.expand2 === undefined) {
          const fullTime = moment().format("YYYY-MM-DD HH:mm:ss")
          const date = moment().format("YYYY-MM-DD")
          const time = moment().format("HH:mm")
          item.date = date
          item.time = time
          item.recordDate = fullTime
        } else {
        }
      }
    },
    sign(item){
     window.openSignModal((password, empNo) => {
        apis.getUser(password, empNo).then(async(res) => {
          this.activeEmpNo=res.data.data.empNo
          // 保存逻辑
          if(item.expand2===undefined){
            item.expand2=1
            const a1=item.recordDate.split(" ")
            const a2=a1[1].split(":")
            const time=`${a2[0]}:${a2[1]}`
            if(item.time!==time){
              // 如果不相等就处理时间
              // const newDate=a1[0].split("-")
              item.recordDate=`${a1[0]} ${item.time}`
            }
            // 处理日期
            const a3=a1[0].split("-")
            const rdDate=`${a3[1]}-${a3[2]}`
            if(item.date&&item.date!==rdDate){
              const recordDateArr=item.recordDate.split(" ")
              const dateArr=recordDateArr[0].split("-")
              item.recordDate=`${item.date} ${recordDateArr[1]}`
            }
          }else{
             item.expand2=2
             item.recordId=""
             if(item.date){
              // 存在日期
              const a1=item.recordDate.split(" ")
              const a2=a1[0].split("-")
              const rD=`${item.date} ${item.time}`
              item.oldRecordDate=item.recordDate
             }else{
               item.oldRecordDate=item.recordDate
             }
             //  先删后改
            await removeSugar(item);
            if(item.recordDate){
              const arr= item.oldRecordDate.split(" ")
              const arr1= arr[0].split("-")
              const year=`${arr1[0]}-${arr1[1]}-${arr1[2]}`
              item.recordDate=`${year} ${item.time}:00`
            }
          }
          this.curEmpName = res.data.data.empName;
          // this.empNo = res.data.data.empNo;
          // 执行表单保存逻辑
          item.recordDate =
          moment(item.recordDate).format("YYYY-MM-DD HH:mm") + ":00";
          item.patientId = this.patientInfo.patientId;
          item.visitId = this.patientInfo.visitId;
          item.name = this.patientInfo.name;
          item.bedLabel = this.patientInfo.bedLabel;
          item.wardCode = this.patientInfo.wardCode;
          (item.nurseEmpNo = this.activeEmpNo||this.empNo || ""), //护士工号
          item.nurse= this.activeEmpNo||this.empNo || ""
          await  saveSugarList([item])
          this.load();
          this.isEdit=false
          // 解决报错
          // this.selected = null;
          this.activeEmpNo=""
          this.$emit("update:selected",null);
          this.$emit("uploadList")
          this.$message.success("保存成功");
        });
      });
    },
    async load() {
      this.pageLoading = true;
      const res = await getSugarListWithPatientId(
        this.patientInfo.patientId,
        this.patientInfo.visitId
      );
      this.resAge = res.data.data.age;
      this.pageLoading = false;

      this.hisPatSugarList = res.data.data.hisPatSugarList;
      /** 时间排序 */
      let list = res.data.data.hisPatSugarList.sort(
        (a, b) =>
          new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
      );
      let listMap = [];

      for (let i = 0; i < list.length; i += 54) {
        let obj = {};
        obj.left = list.slice(i, i + 27);
        obj.right = list.slice(i + 27, i + 54);
        listMap.push(obj);
      }
      this.listMap = listMap;

      getPvHomePage(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then((res) => {
        if (res.data.data) {
          this.startPage = res.data.data.indexNo;
        } else {
          this.startPage = 1;
        }
      });
    },
  },
  components: {},
};
</script>
